import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        extension: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        isImage: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('File', fileSchema)