import { useEffect, useState } from 'react';
import { getMovies } from './api/movie';
import type { Movie } from './types/movie';
import MovieCard from './components/MovieCard';
import styled from 'styled-components';

const MovieGrid = styled.div`
  box-sizing: border-box;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  width: 100%;
  max-width:1400px;
  margin: 0 auto;
  padding:24px

`;

const RatingFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 24px;

  button {
    border: none;
    border-radius: 999px;
    padding: 10px 16px;
    background-color: #333333;
    color: #d9d9d9;
    cursor: pointer;
  }

  button.active {
    background-color: #0055FF;
    color: #FFFFFF;
    font-weight: bold;
  }
`;

const ratingFilters = [
  { label: '전체', min: 0, max: 10 },
  { label: '9점 이상', min: 9, max: 10 },
  { label: '8 ~ 9점', min: 8, max: 9 },
  { label: '7 ~ 8점', min: 7, max: 8 },
  { label: '6 ~ 7점', min: 6, max: 7 },
  { label: '6점 미만', min: 0, max: 6 },
];

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(0);



  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      
      try{
        const filter = ratingFilters[selectedFilter];
        const data = await getMovies(filter.min, filter.max);
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

  },[selectedFilter]);

  {loading ? (
      <p>영화 불러오는 중...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
)}

  return (
    <div>
      <h1>영화 둘러보기</h1>

      <RatingFilters>
          {ratingFilters.map((filter, index) => (
          <button
            key={filter.label}
            className={selectedFilter === index ? 'active' : ''}
            onClick={() => setSelectedFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </RatingFilters>

     

      <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      </MovieGrid>
    </div>
  );
}

export default App;
