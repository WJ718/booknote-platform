const postService = require('../services/postService');

exports.renderPost = async (req,res) => {
    if (!req.session.user) {
        return res.redirect('/');  // 로그인되지 않은 사용자는 접근 제한
    }

    res.render('post', {
        user: req.session.user
    });
}

exports.posting = async (req,res) => {
    const {title, author, publisher, content} = req.body;

    // 사용자가 이미지를 첨부했는지 판별
    const img = req.file ? req.file.filename : null;
    const userId = req.session.user.id;

    try {
        await postService.postingService(title, author, publisher, content, img, userId);
        console.log(`${req.session.user.id} - 포스트 업로드 요청 성공`);
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        next(err);
    }
}

exports.removing = async (req,res) => {
    const postid = req.params.postid;

    try {
        await postService.removingService(postid);

        res.redirect('/');
    } catch(err) {
        console.error(err);
        next(err);
    }
}

exports.updating = async (req, res, next) => {
  const postid = req.params.postid;

  try {
    const post = await postService.findPostById(postid);

    if (!post) {
      const error = new Error("게시글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    if (req.session.user.id !== post.UserId) {
      const error = new Error("수정 권한이 없습니다.");
      error.status = 403;
      throw error;
    }

    res.render('edit-post', {
      user: req.session.user,
      post
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const postid = req.params.postid;
  const { title, author, publisher, content } = req.body;

  try {
    await postService.updatePostById(postid, title, author, publisher, content);
    res.redirect('/user/my-posts');
  } catch (err) {
    next(err);
  }
};