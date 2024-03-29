import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Folder = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'folder'
  }
}, { timestamps: true })

const ModelClass = mongoose.model('folder', Folder)

module.exports = ModelClass