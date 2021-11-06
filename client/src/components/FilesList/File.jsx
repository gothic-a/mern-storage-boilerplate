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

    const getSize = (initialSize) => {
        const measure = {
            0: 'B',
            1: 'KB',
            2: 'MB',
            3: 'GB',
            4: 'TB'
        }

        let iterations = 0

        const convertSize = (convertableSize) => {

            if(convertableSize / 1024 < 1) {
                return {iterations, convertableSize: convertableSize.toFixed(2)}
            }

            iterations += 1

            return convertSize(convertableSize / 1024)
        }

        let { iterations: i, convertableSize: size } = convertSize(initialSize)
        
        return `${size} ${measure[i]}`
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
                <FileInfoUnit children={file.extension}/>
                <FileInfoUnit children={file.name} width={40}/>
                <FileInfoUnit children={getSize(file.size)}/>
                <FileInfoUnit children={file.createdAt.split('T')[0]}/>
            </FileInfo>
            <FileControls>
                <FilesButton
                    data-download_id={file._id}
                >
                    <i className="fas fa-angle-double-down"></i>
                </FilesButton>
                <FilesButton 
                    variant={'danger'}
                    data-delete_id={file._id}
                >
                    <i className="fas fa-trash"></i>
                </FilesButton>
            </FileControls>
        </StyledFile>
    )
}

export default File