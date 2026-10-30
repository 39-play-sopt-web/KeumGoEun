import { useEffect, useState } from 'react';
import { getMovies } from './api/movie';
import type { Movie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchMovies = async () => {
      try{
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
        setError(
          !import.meta.env.VITE_API_BASE_URL || !import.meta.env.VITE_API_KEY
            ? '.env에 VITE_API_BASE_URL과 VITE_API_KEY를 설정한 뒤 개발 서버를 다시 시작해 주세요.'
            : '영화 정보를 불러오지 못했어요.',
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchMovies();

  },[]);

  if (loading) return <p>영화 불러오는 중...</p>;

  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>영화 둘러보기</h1>

      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>평점: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
