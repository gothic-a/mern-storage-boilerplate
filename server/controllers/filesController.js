import path from 'path'
import fs from 'fs'
import File from '../models/fileModel.js'
import archiver from 'archiver'

class FilesController {
    async get(req, res) {
        try {   
            const files = await File.find({})

            res.json(files)
        } catch(e) {
            res.status(500)
            res.json(e.message)
        }
    }

    async upload(req, res) {
        try {
            const files = req.files.map(f => ({
                name: f.originalname,
                mimetype: f.mimetype,
                path: f.path,
                size: f.size,
                extension: path.extname(f.originalname).toLowerCase(),
                isImage: f.mimetype.split('/')[0] === 'image'
            }))

            const response = await File.create(files)

            res.json(response)
        } catch(e) {
            res.status(500)
            res.send(e.message)
        }
    }

    async deleteFiles(req, res) {
        if(!req.query.files) return res.status(400).send('empty query')
        
        try {
            const ids = req.query.files.split('~')
            const files = await File.find({_id: { $in: ids }}, {name: 1})
            const fileNames = files.map(f => f.name)

            const paths = fileNames.map(name => path.resolve(path.resolve(), 'uploads', name))

            paths.forEach(p => { 
                if(!fs.existsSync(p)) {
                    throw new Error('file not found') 
                } else {
                    fs.unlink(p, (e) => e && console.log(e))
                }
            })

            await File.deleteMany({_id: { $in: ids }}, {name: 1})

            const filesId = files.map(f => f._id)
            const filesName = files.map(f => f.name)

            res.json({names: filesName, ids: filesId})
        } catch(e) {
            console.log(e.message)
            return res.status(404).json('file not found')
        }
    }

    async download(req, res)  {
        if(!req.query.files) return res.status(400).send('empty query')

        try {
            const ids = req.query.files.split('~')
            const files = await File.find({_id: { $in: ids }}, {name: 1, _id: 0})
            const fileNames = files.map(f => f.name)

            const paths = fileNames.map(name => path.resolve(path.resolve(), 'uploads', name))

            paths.forEach(p => { if(!fs.existsSync(p)) throw new Error('file not found') })

            if(paths.length === 1) {
                const fileName = encodeURI(fileNames[0])
                res.set('x-file-name', fileName)
                res.download(paths[0])
            } else {
                const archiveName = `Archive-${Date.now()}.zip`
                const archivePath = `${path.resolve('uploads')}/${archiveName}`
                const output = fs.createWriteStream(archivePath)
                const archive = archiver('zip', {
                    zlib: { level: 1 }
                })
                
                archive.pipe(output)

                paths.forEach((p, idx) => {
                    archive.append(fs.createReadStream(p), { name: fileNames[idx] })
                })
                
                archive.finalize()

                output.on('close', () => {
                    res.set('x-file-name', archiveName)
                    res.download(archivePath, (e) => {
                        if(e) console.log('download error', e)
                        fs.unlink(archivePath, (e) => e && console.log(e))
                    })
                })
            }
        } catch(e) {
            console.log(e.message)
            return res.status(404).json('file not found')
        }
    }
}

export default new FilesController()