import { useState } from 'react'
import filesApi from '../../api/files'

const { upload } = filesApi

const Form = ({setFiles}) => {
    const [formFiles, setFormFiles] = useState([])

    const uploadHandler = (file) => {
        setFormFiles(state => [...state, ...file])
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formFiles.forEach(f => {
            formData.append('files', f, f.name)
        })

        const res = await upload(formData)

        setFiles(res)
            
        e.target.reset()
        setFormFiles([])
    }

    return (
        <>
            <form 
                onSubmit={submitHandler}
                encType="multipart/form-data"
            >
                <input 
                    type="file"
                    onChange={e => uploadHandler(e.target.files)}
                    multiple
                />
                <button 
                    type="submit" 
                    disabled={!formFiles.length}
                >
                    submit
                </button>
            </form>
        </>
    )
}

export default Form