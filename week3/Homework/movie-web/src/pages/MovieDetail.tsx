import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/movie';
import type { MovieDetail as MovieDetailTYpe } from '../types/movie';
import styled from 'styled-components';

const DetailContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
  color: #ffffff;
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

  background-color: #0055FF;
  color: #FFFFFF;

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

  img {
    width: 200px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 12px;
    flex-shrink: 0;
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
    color: #ffffff;
    font-weight: 500;
  }
`;




function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<MovieDetailTYpe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      setError('영화 ID가 없습니다.');
      return;
    }

    let ignore = false;

    const fetchMovie = async () => {
      setLoading(true);
      setError('');
      setMovie(null);

      try {
        const data = await getMovieDetail(movieId);

        if (!ignore) {
          setMovie(data);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setError('영화 정보를 불러오지 못했어요.');
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

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  return (
    <DetailContainer>
      <Link to="/">← 목록으로 돌아가기</Link>

    
    <MovieHero $backdrop={backdropUrl}>
        <img src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-image.png'
        }
        alt={movie.title}
      />

      <MovieInfo>
        <h1>{movie.title}</h1>

        <DetailScore>★{movie.vote_average.toFixed(1)}</DetailScore>

        <p>개봉일: {movie.release_date}</p>

      </MovieInfo>
    </MovieHero>

      <h2>줄거리</h2>
      <p>{movie.overview || '등록된 줄거리가 없습니다.'}</p>

      <h2>기본 정보</h2>

        <InfoGrid>
        <InfoCard>
            <span className="label">원제</span>
            <span className="value">{movie.original_title}</span>
        </InfoCard>

        <InfoCard>
            <span className="label">언어</span>
            <span className="value">{movie.original_language}</span>
        </InfoCard>

        <InfoCard>
            <span className="label">제작 국가</span>
            <span className="value">
            {movie.production_countries.map((country) => country.name).join(', ')}
            </span>
        </InfoCard>

        <InfoCard>
            <span className="label">상영 언어</span>
            <span className="value">
            {movie.spoken_languages.map((language) => language.english_name).join(', ')}
            </span>
        </InfoCard>

        <InfoCard>
            <span className="label">예산</span>
            <span className="value">
            {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : '정보 없음'}
            </span>
        </InfoCard>

        <InfoCard>
            <span className="label">수익</span>
            <span className="value">
            {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : '정보 없음'}
            </span>
        </InfoCard>
        </InfoGrid>
    </DetailContainer>
  );
}

export default MovieDetail;
