import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type IFilters } from '@/features/filterCharacters/model/types';
import { API_URL } from '@/shared/api';

import { type ICharacter, type ICharactersResponse } from '../model';

type IGetCharactersQueryArgs = IFilters & { page?: number };

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<ICharactersResponse, IGetCharactersQueryArgs>({
      query: (filters) => ({
        url: 'character',
        params: filters
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Character' as const,
                id
              })),
              { type: 'Character' as const, id: 'LIST' }
            ]
          : [{ type: 'Character' as const, id: 'LIST' }]
    }),
    getCharacterById: builder.query<ICharacter, number>({
      query: (id) => `character/${id}`,
      providesTags: (result, error, id) => [{ type: 'Character' as const, id }]
    })
  })
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
