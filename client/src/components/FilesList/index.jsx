import { useState } from 'react'
import File from './File'
import Controls from './Controls'
import { StyledList } from "./styled"
import filesApi from '../../api/files'

const { download, deleteFiles } = filesApi

const FilesList = ({files, setFiles}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])

    const deleteFilesHandler = async (id) => {
        const res = await deleteFiles(id)
        const newFiles = files.filter(f => !res.ids.includes(f._id))
        setFiles(newFiles)
    }

    const filesListClickHandler = async (e) => {
        const downloadTarget = e.target.closest('button[data-download_id]')
        const deleteTarget = e.target.closest('button[data-delete_id]')

        if(downloadTarget) {
            download(downloadTarget.dataset.download_id)
            return
        }
        if(deleteTarget) {
            deleteFilesHandler(deleteTarget.dataset.delete_id)
            return
        }
    }

    return (
        <StyledList
            onClick={(e) => filesListClickHandler(e)}
        >
            <Controls 
                setIsSelected={setIsSelected}
                isSelected={isSelected}
                downloadAllow={selectedFiles.length > 0}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                deleteFilesHandler={deleteFilesHandler}
            />
            {
                files.map(file => (
                    <File 
                        key={file._id} 
                        file={file} 
                        isSelected={isSelected}
                        setSelectedFiles={setSelectedFiles}
                        selectedFiles={selectedFiles}
                    />
                ))
            }
        </StyledList>
    )
}

export default FilesList