import toast from 'react-hot-toast';

import {
  type PayloadAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { type ICharacter } from '@/shared/types';
import { type IFilters } from '@/shared/types/filters';

const API_URL = 'https://rickandmortyapi.com/api/character';

interface CharactersState {
  characters: ICharacter[];
  selectedCharacter: ICharacter | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  filters: IFilters;
  nextPage: string | null;
  notFound: boolean;
}

const initialFiltersState: IFilters = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

export const initialState: CharactersState = {
  characters: [],
  selectedCharacter: null,
  loading: 'idle',
  error: null,
  filters: initialFiltersState,
  nextPage: null,
  notFound: false
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (
    params: {
      name?: string;
      status?: string;
      species?: string;
      gender?: string;
      url?: string;
      isLoadMore?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const { name, status, species, gender, url, isLoadMore } = params;

      let requestUrl = url || API_URL;
      if (!url) {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append('name', name);
        if (status) queryParams.append('status', status);
        if (species) queryParams.append('species', species);
        if (gender) queryParams.append('gender', gender);
        requestUrl = `${API_URL}?${queryParams.toString()}`;
      }

      const response = await axios.get(requestUrl);
      const { info, results } = response.data;
      const transformedCharacters = results.map(
        (character: { status: string }) => ({
          ...character,
          status: character.status.toLowerCase()
        })
      );

      return {
        characters: transformedCharacters,
        nextPage: info.next,
        isLoadMore
      };
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        return rejectWithValue('notFound');
      }
      const errorMessage = 'Не удалось загрузить список персонажей!';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<ICharacter>(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage = 'Не удалось загрузить данные о персонаже!';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
      throw err;
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ field: keyof IFilters; value: string }>
    ) => {
      state.filters[action.payload.field] = action.payload.value;
    },
    resetFilters: (state) => {
      state.filters = initialFiltersState;
    },
    updateCharacter: (state, action: PayloadAction<ICharacter>) => {
      const updatedCharacter = action.payload;
      const index = state.characters.findIndex(
        (char) => char.id === updatedCharacter.id
      );
      if (index !== -1) {
        state.characters[index] = updatedCharacter;
      }
      if (state.selectedCharacter?.id === updatedCharacter.id) {
        state.selectedCharacter = updatedCharacter;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCharacters.pending,
        (state, action: ReturnType<typeof fetchCharacters.pending>) => {
          state.error = null;
          if (!action.meta.arg.isLoadMore) {
            state.loading = 'pending';
            state.notFound = false;
            state.characters = [];
          }
        }
      )
      .addCase(
        fetchCharacters.fulfilled,
        (
          state,
          action: PayloadAction<{
            characters: ICharacter[];
            nextPage: string | null;
            isLoadMore?: boolean;
          }>
        ) => {
          state.loading = 'succeeded';
          if (action.payload.isLoadMore) {
            state.characters.push(...action.payload.characters);
          } else {
            state.characters = action.payload.characters;
          }
          state.nextPage = action.payload.nextPage;
        }
      )
      .addCase(fetchCharacters.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = 'failed';
        state.nextPage = null;
        if (action.payload === 'notFound') {
          state.notFound = true;
          state.characters = [];
          state.error = null;
        } else {
          state.error = action.payload as string;
        }
      })
      .addCase(fetchCharacterById.pending, (state) => {
        state.selectedCharacter = null;
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        fetchCharacterById.fulfilled,
        (state, action: PayloadAction<ICharacter>) => {
          state.loading = 'succeeded';
          state.selectedCharacter = action.payload;
        }
      )
      .addCase(
        fetchCharacterById.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = 'failed';
          state.error = action.payload as string;
          state.selectedCharacter = null;
        }
      );
  }
});

export const { setFilter, resetFilters, updateCharacter } =
  charactersSlice.actions;

export default charactersSlice.reducer;
