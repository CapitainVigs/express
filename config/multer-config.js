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
 
    const name = req.body.id_users+ '_'+'PROFILE';
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name  + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');