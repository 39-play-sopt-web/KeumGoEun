import type { Movie } from '../types/movie';

interface MovieCardProps {
        movie : Movie;
    }

function MovieCard({ movie }:MovieCardProps) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="movie-card">
            <div className="score">
                {movie.vote_average}
            </div>

            <img src={imageUrl} alt="영화 포스터" />

            <h2>{movie.title}</h2>

            <p>{movie.release_date}</p>

            <p>{movie.overview}</p>

            </div>
        
    );
}

export default MovieCard;