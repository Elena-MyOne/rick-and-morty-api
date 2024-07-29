import { CharacterData } from './../../types/CharacterData';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharactersData, CharacterData } from '../../types/CharactersData';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharactersList: builder.query<CharactersData, { page: number }>({
      query: ({ page }) => `character?page=${page}`,
    }),
    getCharacterById: builder.query<CharacterData, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersListQuery, useGetCharacterByIdQuery } = apiSlice;
