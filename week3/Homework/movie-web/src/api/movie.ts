import { api } from './client'
import type { MovieResponse } from '../types/movie'

export const getMovies = async (): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>(
        '/discover/movie',
    );

    return response.data;
}