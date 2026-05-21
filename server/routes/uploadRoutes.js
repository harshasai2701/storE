import path from 'path';
import express from 'express';
import multer from 'multer';
import Image from '../models/ImageModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Store files in memory buffer
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload an image file
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload an image file' });
    }
    
    const image = new Image({
      name: `${path.parse(req.file.originalname).name}-${Date.now()}${path.extname(req.file.originalname)}`,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    
    const createdImage = await image.save();
    res.send(`/api/upload/${createdImage._id}`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// @desc    Get an image file by ID
// @route   GET /api/upload/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    if (image) {
      res.set('Content-Type', image.contentType);
      res.send(image.data);
    } else {
      res.status(404).send({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;

