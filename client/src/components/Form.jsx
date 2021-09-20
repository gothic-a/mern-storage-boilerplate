import { useState } from 'react'
import axios from 'axios'

const config = {
    'Content-Type': 'multipart/form-data',
}

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

        try {
            const res = await axios.post('/api/upload', formData, config) 

            setFiles(...res.data)
            
            e.target.reset()
            setFormFiles([])
        } catch(e) {
            console.log(e.message)
        }
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