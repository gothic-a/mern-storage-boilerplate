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

    async deleteFiles(id) {
        const query = Array.isArray(id) ? id.join('~') : id

        try { 
            const res = await axios.delete(`/api/files/delete?files=${query}`)
            return res.data
        } catch(e) {
            console.log(e.message)
        }
    }

    async download(id) {
        const query = Array.isArray(id) ? id.join('~') : id
        
        try {
            const res = await axios.get(`/api/files/download?files=${query}`, { responseType: 'blob' }) 
            const downloadUrl = window.URL.createObjectURL(new Blob([res.data]))

            const fileName = res.headers['x-file-name']

            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = decodeURI(fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch(e) {
            console.log(e.message)
        }
    }
}

export default new Files()