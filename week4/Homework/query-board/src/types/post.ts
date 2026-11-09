// 검색 조회 응답 
export type PostsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    posts: Post[];
    nextCursor: number | null;
    hasNext: boolean;
  };
};

//게시물 하나
export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

//작성한 글, 글쓴이 서버에 
export type CreatePostRequest = {
  title: string;
  content: string;
  author: string;
};

//잘됐나 서버 대답
export type CreatePostResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: Post;
};

//작성 글 상세 조회
export type PostDetailResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: Post;
};

//삭제 서버 대답  
export type DeletePostResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: string;
};

//게시글 수정
export type UpdatePostRequest = {
  title: string;
  content: string;
};

//수정에 대한 응답 
export type UpdatePostResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: Post;
}; 
