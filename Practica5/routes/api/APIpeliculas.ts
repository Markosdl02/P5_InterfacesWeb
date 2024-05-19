import { Film } from '../../types.ts';

const API_URL = "https://filmapi.vercel.app/api/films";

export async function fetchFilms(): Promise<Film[]> {
  const response = await fetch(API_URL);
  return await response.json();
}