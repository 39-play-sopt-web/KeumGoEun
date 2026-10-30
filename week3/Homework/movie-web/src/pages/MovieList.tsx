import { useEffect, useState, useRef } from 'react';
import { getMovies } from '../api/movie';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  width: 100%;
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;

  h1 {
    font-size: 32px;
    color: #FFFFFF;
    margin: 0 0 24px;
  }
`;

const RatingFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;

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

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError('');

      try {
        const filter = ratingFilters[selectedFilter];
        const data = await getMovies(filter.min, filter.max,page);

        if (!ignore) {
            setTotalPages(data.total_pages);

            if (page === 1){
                setMovies(data.results);
            } else {
                setMovies((prev) => {
                    const newMovies = data.results.filter(
                    (movie) => !prev.some((existing) => existing.id === movie.id)
                );

                 return [...prev, ...newMovies];
                });
            }
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

    void fetchMovies();

    return () => {
      ignore = true;
    };
  }, [selectedFilter,page]);

  useEffect(() => {
  const target = loaderRef.current;

  if (!target || loading || error || page >= totalPages) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        setPage((prev) => prev + 1);
      }
    },
    {
      rootMargin: '200px',
    }
  );

  observer.observe(target);

  return () => {
    observer.disconnect();
  };
}, [loading, error, page, totalPages]);

return (
  <PageContainer>
    <h1>영화 둘러보기</h1>

    <RatingFilters>
      {ratingFilters.map((filter, index) => (
        <button
          key={filter.label}
          className={selectedFilter === index ? 'active' : ''}
          onClick={() => {
            setMovies([]);
            setSelectedFilter(index);
            setPage(1);
          }}
        >
          {filter.label}
        </button>
      ))}
    </RatingFilters>

    {error ? (
      <p>{error}</p>
    ) : (
      <>
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieGrid>

        {loading && <p>영화를 불러오는 중...</p>}

        {!loading && page < totalPages && (
          <div ref={loaderRef} />
        )}
      </>
    )}
  </PageContainer>
);

 

}

export default MovieList;