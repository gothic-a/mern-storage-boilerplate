import express from 'express'
import multer from 'multer'
import path from 'path'
import FilesController from '../controllers/filesController.js'

const { get, upload, download, deleteFiles } = FilesController

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${path.resolve()}/uploads`),
    filename: (req, file, cb) => cb(null, file.originalname)
})
const dest = multer({storage})

const router = express.Router()

router.route('/').get(get)
router.route('/upload').post(dest.array('files', 15), upload)
router.route('/download').get(download)
router.route('/delete').delete(deleteFiles)

export default router