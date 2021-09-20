import path from 'path'
import fs from 'fs'
import File from '../models/fileModel.js'

class FilesController {
    async get(req, res) {
        res.send('sdf')
    }

    async upload(req, res) {
        try {
            // UPLOAD TO MONGO
    
            const files = req.files.map(f => ({
                name: f.originalname,
                mimetype: f.mimetype,
                path: f.path,
                size: f.size,
                extension: path.extname(f.originalname).toLowerCase(),
                isImage: f.mimetype.split('/')[0] === 'image'
            }))
    
            // UPLOAD TO MONGO
    
            res.json(files)
        } catch(e) {
            res.status(500)
            res.send(e.message)
        }
    }

    async download(req, res)  {
        if(!req.query.files) return res.status(400).send('empty query')

        try {
            const fileNames = req.query.files.split('~')
            const paths = fileNames.map(name => path.resolve(path.resolve(), 'uploads', name))

            paths.forEach(p => { if(!fs.existsSync(p)) throw new Error('file not found') })

            if(paths.length === 1) {
                res.download(paths[0])
            } else {

            }

        } catch(e) {
            console.log(e.message)
            res.status(404).send('file not found')
        }
        
    }
}

export default new FilesController()