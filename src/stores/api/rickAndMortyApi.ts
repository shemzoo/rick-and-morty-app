import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/api';
import {
  type ICharacter,
  type ICharactersResponse,
  type IFilters
} from '@/shared/types';

type IGetCharactersQueryArgs = IFilters & { page?: number };

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ICharactersResponse, IGetCharactersQueryArgs>({
      query: (filters) => ({
        url: 'character',
        params: filters
      })
    }),
    getCharacterById: builder.query<ICharacter, number>({
      query: (id) => `character/${id}`
    })
  })
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
