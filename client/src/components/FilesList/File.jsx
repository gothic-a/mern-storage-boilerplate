import { 
    StyledFile, 
    FileInfo, 
    FileControls, 
    FileInfoUnit, 
    Select,
    Button
} from "./styled"

const File = ({ file, isSelected, setSelectedFiles, selectedFiles }) => {
    
    const toggleFile = (e) => {
        const value = e.target.value

        setSelectedFiles(state => {
            const idx = state.findIndex(f => f === value)
            if(idx === -1) {
                return [
                    ...state,
                    value
                ]
            } else {
                return [
                    ...state.slice(0, idx),
                    ...state.slice(idx+1)
                ]
            }
        })
    }

    return (
        <StyledFile data-id={file._id} >
            <Select 
                type="checkbox"
                disabled={!isSelected}
                checked={selectedFiles.includes(file._id)}
                value={file._id}
                onChange={(e) => toggleFile(e)}
                visible={isSelected}
            />
            <FileInfo>
                <FileInfoUnit children={file.extension} />
                <FileInfoUnit children={file.name} width={40}/>
                <FileInfoUnit children={file.size}/>
                <FileInfoUnit children={file.createdAt.split('T')[0]}/>
            </FileInfo>
            <FileControls>
                <Button>Download</Button>
                <Button>Delete</Button>
            </FileControls>
        </StyledFile>
    )
}

export default File