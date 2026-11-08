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