import express from 'express'
import path from 'path'
import fs from 'fs'
import mime from 'mime'

const router = express.Router()

const downloadFile = async (req, res) => {
    if(!req.query.files) res.status(400).send('empty query')

    const fileNames = req.query.files.split('~')
    const paths = fileNames.map(name => path.resolve(path.resolve(), 'uploads', name))

    if(paths.length === 1) {
        // const type = mime.getType(file)
        // const name = path.basename(file)

        // res.set({
        //     'Content-Type': type,
        //     'Content-Disposition': `attachment"`
        // })

        // fs.createReadStream(file).pipe(res)

        // fs.readFile(file, (err, content) => res.end(content))

        res.download(paths[0])
    } else {
        res.status(404).send('File not found')
    }
}

router.route('/').get(downloadFile)

export default router