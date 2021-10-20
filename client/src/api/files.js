import axios from 'axios'

class Files {
    static uploadConfig = {
        'Content-Type': 'multipart/form-data',
    }

    async get() {
        try {
            const res = await axios.get('/api/files')

            return res.data
        } catch(e) {
            console.log(e.message)
        }
    }

    async upload(formData) {
        try {
            const res = await axios.post('/api/files/upload', formData, Files.uploadConfig) 

            return res.data
        } catch(e) {
            console.log(e.message)
        }
    }

    download = async () => {

    }
}

export default new Files()