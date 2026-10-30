import type { Movie } from '../types/movie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface MovieCardProps {
        movie : Movie;
    }

const Card = styled.div`
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    min-width:0;
    border-radius: 12px;
    border: solid 1px #3C3C3C;
    background-color: #262626;

    transition: transform 0.2s ease, box-shadow 0.2s ease;

    color: #D9D9D9;

    &:hover {
        transform: scale(1.02);
    }

    img {
        display: block;
        width: 100%;
        aspect-ratio: 2 / 3;
        object-fit:cover;   

        }

    .overview {
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
        line-clamp:3;
        overflow:hidden;
    
    }

    .score {
        position: absolute;
        top:12px;
        left:12px;
        z-index:1;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size:14px;
        line-height: 1;

        background-color:#0055FF;
        border-radius:8px;
        padding: 6px 8px;
    }

    .movie-info{
        padding: 4px 16px;
    }

    h2{
        font-size:18px;
        color: #FFFFFF;
        margin: 16px 0 6px;
    }

    .release-data{
        color: #ACB4FF;
        margin:0;
        }

    .overview{
        font-size:14px;    
    }
    
    .poster-placeholder {
        width: 100%;
        aspect-ratio: 2 / 3;
        background-color: #333333;
    }


`;

function MovieCard({ movie }:MovieCardProps) {
    const imageUrl = movie.poster_path ?
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`: null;

    return (
        <Link to={`/movie/${movie.id}`}>

            <Card>
                <div className="poster">
                    {imageUrl ? (
                    <img src={imageUrl} alt={`${movie.title} 포스터야미`} />
                ) : (
                    <div className="poster-placeholder" />
                )}
                    <span className='score'>★{movie.vote_average.toFixed(1)}</span>
                </div>

                
                
                <div className='movie-info'>
                    <h2>{movie.title}</h2>

                    <p className='release-data'>{movie.release_date}</p>

                    <p className='overview'>{movie.overview}</p>
                </div>

                </Card>
            </Link>
    );
}

export default MovieCard;