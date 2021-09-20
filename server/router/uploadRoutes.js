import express from 'express'
import multer from 'multer'
import path from 'path'
import mime from 'mime'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${path.resolve()}/uploads`),
    filename: (req, file, cb) => cb(null, file.originalname)
})

const dest = multer({storage})

const uploadController = async (req, res) => {
    try {

        // UPLOAD TO MONGO

        const files = req.files.map(f => ({
            name: f.originalname,
            mimetype: f.mimetype,
            path: f.path,
            size: f.size,
            extension: path.extname(f.originalname).toLowerCase()
        }))

        // UPLOAD TO MONGO

        res.json(files)
    } catch(e) {
        res.status(500)
        throw new Error(e.message)
    }
}

router.route('/').post(dest.array('files', 15), uploadController)

export default router