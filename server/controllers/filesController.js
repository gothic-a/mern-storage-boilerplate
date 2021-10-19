import path from 'path'
import fs from 'fs'
import File from '../models/fileModel.js'
import archiver from 'archiver'
import mime from 'mime'

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
                const archivePath = `${path.resolve('uploads')}/archive.zip`
                const output = fs.createWriteStream(archivePath)
                const archive = archiver('zip', {
                    zlib: { level: 9 }
                })
                
                archive.pipe(output)

                paths.forEach((p, idx) => {
                    archive.append(fs.createReadStream(p), { name: fileNames[idx] })
                })
                
                archive.finalize()

                output.on('close', () => {
                    res.download(archivePath, () => {
                        fs.unlink(archivePath, (e) => e && console.log(e))
                    })
                })
            }
        } catch(e) {
            console.log(e.message)
            res.status(404).send('file not found')
        }
        
    }
}

export default new FilesController()