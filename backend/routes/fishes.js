const express = require('express');
const router = express.Router();
const fishController = require('../controllers/fishes');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/add-fish', verifyToken, upload.single('image'), fishController.addFish);
router.get('/fishes', fishController.getAllFishes);
router.get('/fish/:fishId', fishController.getOneFish);

module.exports = router;
