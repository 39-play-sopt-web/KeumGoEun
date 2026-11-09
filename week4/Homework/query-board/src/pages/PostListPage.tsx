import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import PostCard from "../components/PostCard";
import styled from "styled-components";

function PostListPage() {
  //검색어 상태 저장
  const [keyword, setKeyword] = useState("");

  //서버 검색에 적용할 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  //게시물 목록 가져오기
  const postsQuery = usePosts(searchKeyword);

  const posts = postsQuery.data?.pages.flatMap((page) => page.posts) ?? [];

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: postsQuery.hasNextPage,
    isFetching: postsQuery.isFetching,
    isFetchNextPageError: postsQuery.isFetchNextPageError,
    fetchNextPage: postsQuery.fetchNextPage,
  });

  function handleSearch() {
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword.length < 2 || trimmedKeyword.length > 50) {
      alert("검색어는 2-50자로 입력해주세요;");
      return;
    }

    setSearchKeyword(trimmedKeyword);
  }

  return (
    <PageContainer>
        <SearchBox>
          <input
            type="search"
            aria-label="게시판 글 검색"
            placeholder="제목으로 검색"
            value={keyword}
            onChange={(event) => {
              const value = event.target.value;

              setKeyword(value);

              if (value.trim() === "") {
                setSearchKeyword("");
              }
            }}
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={keyword.trim() === ""}
          >
            검색
          </button>
        </SearchBox>

        {postsQuery.isPending && <p>게시글을 불러오는 중...</p>}

        {postsQuery.isError && <p>게시글을 불러오지 못했습니다.</p>}

        {postsQuery.data &&
          (posts.length === 0 ? (
            <p>조회된 게시글이 없습니다.</p>
          ) : (
            <PostList>
              {posts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </PostList>
          ))}

        <div ref={loadMoreRef} style={{ height: 1 }} />

        {postsQuery.isFetchingNextPage && <p>게시글을 더 불러오는 중...</p>}
    </PageContainer>
  );
}

export default PostListPage;

const PageContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 16px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;

  input {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }

  input:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }

  button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    transition: background-color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  button:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;
