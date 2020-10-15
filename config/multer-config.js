const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
    console.log('Dossier creerupload')
  },
  filename: (req, file, callback) => {
 
    const name = 'PROFILE';
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name  + '_'+ Date.now()+'.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');