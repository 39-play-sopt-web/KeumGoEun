import { apiClient } from "./client";
import type { PostsResponse, CreatePostRequest, CreatePostResponse, PostDetailResponse, DeletePostResponse, UpdatePostRequest,
UpdatePostResponse,} from "../types/post";

//게시물 목록 불러오기
export async function getPosts(keyword: string = "", cursor?: number) {
  const response = await apiClient.get<PostsResponse>("/api/v1/posts", {
    params: {
      keyword: keyword.trim() || undefined,
      cursor: cursor,
      size: 10,
    },
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}


//서버에 글, 작성자 등의 정보 전달 
export async function createPost(post: CreatePostRequest) {
  const authorizationCode = localStorage.getItem('authorizationCode');

  if (!authorizationCode) {
    throw new Error('먼저 회원 코드를 발급받아 주세요..');
  }

  //인증 토큰으로 작성자 구별 
  const response = await apiClient.post<CreatePostResponse>(
    '/api/v1/posts',
    post,
    {
      headers: {
        Authorization: authorizationCode,
      },
    },
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

//게시글 상세 조회
export async function getPostDetail(postId: number) {
  const response = await apiClient.get<PostDetailResponse>(
    `/api/v1/posts/${postId}`,
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

//게시글 삭제 
export async function deletePost(postId: number) {
  const authorizationCode = localStorage.getItem('authorizationCode');

  if (!authorizationCode) {
    throw new Error('먼저 회원 코드를 발급받아 주세연 !!!!! ');
  }

  const response = await apiClient.delete<DeletePostResponse>(
    `/api/v1/posts/${postId}`,
    {
      headers: {
        Authorization: authorizationCode,
      },
    },
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

//게시글 수정 
export async function updatePost(
  postId: number,
  post: UpdatePostRequest,
) {
  const authorizationCode = localStorage.getItem("authorizationCode");

  if (!authorizationCode) {
    throw new Error("먼저 회원 코드를 발급받아 주세요.");
  }

  const response = await apiClient.put<UpdatePostResponse>(
    `/api/v1/posts/${postId}`,
    post,
    {
      headers: {
        Authorization: authorizationCode,
      },
    },
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}