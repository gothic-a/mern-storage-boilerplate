import { StyledControls, FilesButton } from './styled'
import filesApi from '../../api/files'

const { download } = filesApi

const Controls = ({isSelected, setIsSelected, downloadAllow, selectedFiles, setSelectedFiles, deleteFilesHandler}) => {
    const downloadHandler = async () => {
        await download(selectedFiles)
        setSelectedFiles([])
    }

    const deleteHandler = async () => {
        await deleteFilesHandler(selectedFiles)
        setSelectedFiles([])
    }

    return (
        <StyledControls>
            <FilesButton 
                onClick={() => setIsSelected(state => !state)}
                isSelected={isSelected}
                size={'l'}
                variant={'success'}
            >
                <i className="fas fa-check-circle"></i>
            </FilesButton>
            <FilesButton 
                size={'l'}
                onClick={downloadHandler}
                disabled={!downloadAllow || !isSelected}
            >
                <i className="fas fa-angle-double-down"></i>
            </FilesButton>
            <FilesButton 
                size={'l'}
                variant={'danger'}
                disabled={!downloadAllow || !isSelected}
                onClick={deleteHandler}
            >
                <i className="fas fa-trash"></i>
            </FilesButton>
        </StyledControls>  
    )
    
}

export default Controls