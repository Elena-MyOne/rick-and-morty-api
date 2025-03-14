import { CharacterData } from './../../types/CharacterData';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharactersData } from '../../types/CharactersData';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharactersList: builder.query<CharactersData, { page?: number; name?: string }>({
      query: ({ page, name }) => {
        let queryString = 'character';
        if (page) {
          queryString = `character?page=${page}`;
        }
        if (name && page) {
          queryString = `character?page=${page}&name=${name}`;
        }
        return queryString;
      },
    }),
    getCharacterById: builder.query<CharacterData, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersListQuery, useGetCharacterByIdQuery } = apiSlice;
