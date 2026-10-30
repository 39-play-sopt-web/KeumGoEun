import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/movie';
import type { Movie } from '../types/movie';
import styled from 'styled-components';

const DetailContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
  color: #ffffff;
`;

const MovieHeader = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
  align-items: flex-start;

  img {
    width: 200px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 12px;
  }
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

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
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

  return (
    <DetailContainer>
      <Link to="/">← 목록으로 돌아가기</Link>

    
    <MovieHeader>
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
    </MovieHeader>

      <h2>줄거리</h2>
      <p>{movie.overview || '등록된 줄거리가 없습니다.'}</p>
    </DetailContainer>
  );
}

export default MovieDetail;
