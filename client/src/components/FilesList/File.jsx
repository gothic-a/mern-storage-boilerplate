import { 
    StyledFile, 
    FileInfo, 
    FileControls, 
    FileInfoUnit, 
    FilesSelect,
    FilesButton
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
        <StyledFile>
            <FileInfo checked={selectedFiles.includes(file._id)}>
                <FilesSelect 
                    id={file._id}
                    disabled={!isSelected}
                    checked={selectedFiles.includes(file._id)}
                    value={file._id}
                    onChange={(e) => toggleFile(e)}
                    visible={isSelected}
                    variant={'success'}
                    type={'checkbox'}
                />
                <FileInfoUnit children={file.extension} />
                <FileInfoUnit children={file.name} width={40}/>
                <FileInfoUnit children={file.size}/>
                <FileInfoUnit children={file.createdAt.split('T')[0]}/>
            </FileInfo>
            <FileControls>
                <FilesButton
                    data-id={file._id}
                >
                    <i className="fas fa-angle-double-down"></i>
                </FilesButton>
                <FilesButton 
                    data-id={file._id}
                    variant={'danger'}
                >
                    <i className="fas fa-trash"></i>
                </FilesButton>
            </FileControls>
        </StyledFile>
    )
}

export default File