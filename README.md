### booknote-platform
Node.js 기반 도서 감상 공유 웹 애플리케이션
- 사용자가 읽은 책의 정보를 입력하고 감상문을 등록하여 다른 사람들과 공유할 수 있습니다.  

### 기술 스택
- Backend: Node.js, Express.js
- Frontend: EJS (Embedded JavaScript Templates)
- ORM: Sequelize
- Database: MySQL
- Auth: express-session (세션 로그인 방식)
- File Upload: Multer (책 이미지 업로드 지원)

### 주요 기능
| 기능 | 설명 |
|------|------|
| **도서 감상문 작성** | 책 제목, 저자, 출판사 정보를 입력하고 감상문을 작성하며 이미지도 첨부 가능 |
| **회원가입 및 로그인** | 사용자는 ID와 비밀번호로 회원가입 후 세션 기반 로그인 가능 |
| **닉네임 및 비밀번호 변경** | 사용자 설정 페이지에서 닉네임 및 비밀번호 변경 가능 |
| **게시글 업로드** | 감상문을 작성하여 데이터베이스에 저장하고 메인 페이지에 공유 |
| **게시글 목록 보기** | 메인 페이지에서 모든 사용자들의 감상문 확인 가능 |
| **내 게시글 관리** | 작성한 게시글만 필터링하여 수정 또는 삭제 가능 (권한 체크 포함) |
| **이미지 업로드** | 책 표지 이미지 등 사용자 첨부 이미지 파일 업로드 지원 (Multer 사용) |

### 화면 구성
- 메인 페이지
  <img src="./images/main.png"/>
  
- 프로필 확인 페이지
  <img src="./images/profile.png"/>
  
- 업로드 페이지
  <img src="./images/upload.png"/>

- 게시글 확인 페이지
  <img src="./images/my-posts.png"/>

