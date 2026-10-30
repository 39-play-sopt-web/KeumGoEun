import { api } from './client';
import type { MovieDetail, MovieResponse } from '../types/movie';

export const getMovies = async (
    minRating: number = 0,
    maxRating: number = 10,
    page: number = 1,
): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>(
        '/discover/movie',
        {
            params: {
                'vote_average.gte': minRating,
                'vote_average.lte': maxRating,
                 page: page,
            },
        },
    );

    return response.data;
};

export const getMovieDetail = async (movieId: string) : Promise<MovieDetail> => {
    const response = await api.get<MovieDetail>(`/movie/${movieId}`);

    return response.data;
};