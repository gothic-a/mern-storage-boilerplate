import { useState } from 'react'
import File from './File'
import Controls from './Controls'
import { StyledList } from "./styled"

const FilesList = ({files}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])

    return (
        <StyledList>
            <Controls 
                setIsSelected={setIsSelected}
                isSelected={isSelected}
                downloadAllow={selectedFiles.length > 0}
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