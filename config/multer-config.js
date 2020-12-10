const multer = require('multer');
var upload = multer({ dest: 'images/' })

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images');
    console.log('Dossier creerupload')
  },
  filename: (req, file, callback) => {
    console.log(req.params.id_user)
    const name = req.params.id_user+'_'+'profile';
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name  + '_'+ Date.now()+'.' + extension);
  },limits: { fieldSize: 5 * 1024 * 1024 }
});

module.exports = multer({storage: storage}).single('image');