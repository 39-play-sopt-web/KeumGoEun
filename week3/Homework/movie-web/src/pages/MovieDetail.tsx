import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movie";
import type { MovieDetail as MovieDetailTYpe } from "../types/movie";
import styled from "styled-components";

const DetailContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h1 {
    font-size: 28px;
    margin: 0;
  }

  p {
    margin: 0;
    color: #d9d9d9;
  }
`;

const DetailScore = styled.span`
  display: inline-flex;
  align-items: center;

  width: fit-content;
  padding: 6px 10px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};

  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
`;

const MovieHero = styled.div<{ $backdrop: string }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  padding: 32px;
  margin-top: 24px;
  min-height: 280px;

  border-radius: 16px;
  overflow: hidden;

  background-image:
    linear-gradient(
      to top,
      rgba(26, 27, 36, 1) 0%,
      rgba(26, 27, 36, 0.73) 60%,
      rgba(26, 27, 36, 1) 100%
    ),
    url(${({ $backdrop }) => $backdrop});

  background-size: cover;
  background-position: center;

  img,
  .backdrop-placeholder {
    width: 200px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 12px;
    flex-shrink: 0;
  }

  .backdrop-placeholder {
    background-color: #333333;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoCard = styled.div`
  background-color: #333333;
  border-radius: 8px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    font-size: 12px;
    color: #999999;
  }

  .value {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const GenreTag = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`;

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<MovieDetailTYpe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      setError("영화 ID가 없습니다.");
      return;
    }

    let ignore = false;

    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const data = await getMovieDetail(movieId);

        if (!ignore) {
          setMovie(data);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setError("영화 정보를 불러오지 못했어요.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchMovie();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  if (loading) {
    return <p>영화 불러오는 중이요...</p>;
  }

  if (error) {
    return (
      <div>
        <Link to="/">← 목록으로 돌아가기</Link>
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return <p>영화 정보가 없습니다.</p>;
  }

  const movieInfo = [
    { label: "원제", value: movie.original_title },
    { label: "언어", value: movie.original_language },
    {
      label: "제작 국가",
      value: movie.production_countries
        .map((country) => country.name)
        .join(", "),
    },
    {
      label: "상영 언어",
      value: movie.spoken_languages
        .map((language) => language.english_name)
        .join(", "),
    },
    {
      label: "예산",
      value:
        movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "정보 없음",
    },
    {
      label: "수익",
      value:
        movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "정보 없음",
    },
  ];

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <DetailContainer>
      <Link to="/">← 목록으로 돌아가기</Link>

      <MovieHero $backdrop={backdropUrl}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="backdrop-placeholder" />
        )}

        <MovieInfo>
          <h1>{movie.title}</h1>

          <DetailScore>★ {movie.vote_average.toFixed(1)}</DetailScore>

          <p>
            개봉일: {movie.release_date} · 상영 시간:{" "}
            {movie.runtime ? `${movie.runtime}분`: "정보 없음"} · 평가{" "}
            {movie.vote_count.toLocaleString()}명
          </p>

          <p>상태: {movie.status}</p>

          <GenreList>
            {movie.genres.map((genre) => (
              <GenreTag key={genre.id}>{genre.name}</GenreTag>
            ))}
          </GenreList>
        </MovieInfo>
      </MovieHero>

      <h2>줄거리</h2>
      <p>{movie.overview || "등록된 줄거리가 없습니다."}</p>

      <h2>기본 정보</h2>

      <InfoGrid>
        {movieInfo.map((info) => (
          <InfoCard key={info.label}>
            <span className="label">{info.label}</span>
            <span className="value">{info.value}</span>
          </InfoCard>
        ))}
      </InfoGrid>
    </DetailContainer>
  );
}

export default MovieDetail;
