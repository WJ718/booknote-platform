const {Post, Book, User} = require('../models');

exports.findPostById = async (postid) => {
  return await Post.findOne({
    where: { id: postid },
    include: [Book, User]
  });
};

exports.postingService = async (title, author, publisher, content, img, userId) => {
    try {
        const [book, created] = await Book.findOrCreate({
            where: {title, author, publisher}
        });

        await Post.create({
            content,
            img,
            // 대문자 주의 : belongsTo()로 생성한 외래키는 대상모델명 + Id
            BookId: book.id,
            UserId: userId
        });  
        
        console.log('book:', book);
        console.log('book.id:', book.id);

    } catch(err) {
        const e = new Error('포스트 업로드 에러 발생');
        throw e;
    }
}

exports.removingService = async (postid) => {
    try {
        await Post.destroy({ where: { id: postid } });
    } catch(err) {
        const e = new Error("포스트 삭제 에러 발생");
        throw e;
    }
}

exports.updatePostById = async (postid, title, author, publisher, content) => {
  const post = await Post.findOne({ where: { id: postid }, include: [Book] });

  if (!post) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  // 책 정보 업데이트
  await Book.update(
    { title, author, publisher },
    { where: { id: post.BookId } }
  );

  // 게시글 내용 업데이트
  await Post.update(
    { content },
    { where: { id: postid } }
  );
};