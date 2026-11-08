import type { PostsResponse } from "../types/post";
import { apiClient } from "./client";

export async function getPosts(keyword: string = "", cursor?: number,) {
  const response = await apiClient.get<PostsResponse>("/api/v1/posts", {
    params: {
      keyword: keyword.trim() || undefined,
      cursor: cursor,
      size:10,
    },
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}
