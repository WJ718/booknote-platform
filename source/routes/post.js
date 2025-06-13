const express = require('express');
const upload = require('../middlewares/multer');
const {renderPost, posting, removing, updating, updatePost} = require('../controllers/post');
const router = express.Router();

router.get('/write', renderPost);

// multer 미들웨어를 통해 이미지 업로드
router.post('/upload', upload.single('img'), posting);
router.post('/delete/:postid', removing);

router.get('/edit/:postid', updating);
router.post('/edit/:postid', updatePost);

module.exports = router;