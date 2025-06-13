const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // 확장자 추출
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
});

const upload = multer({storage});

module.exports = upload;