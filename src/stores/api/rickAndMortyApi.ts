import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/api';
import { isStatus } from '@/shared/helpers';
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
      }),
      transformResponse: (response: ICharactersResponse) => ({
        ...response,
        results: response.results.map((character) => {
          const lowercasedStatus = character.status.toLowerCase();
          return {
            ...character,
            status: isStatus(lowercasedStatus) ? lowercasedStatus : 'unknown'
          };
        })
      })
    }),
    getCharacterById: builder.query<ICharacter, number>({
      query: (id) => `character/${id}`,
      transformResponse: (character: ICharacter) => {
        const lowercasedStatus = character.status.toLowerCase();
        return {
          ...character,
          status: isStatus(lowercasedStatus) ? lowercasedStatus : 'unknown'
        };
      }
    })
  })
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
