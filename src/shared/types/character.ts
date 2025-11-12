import { type Status } from '@/shared/types';

export interface ICharacter {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
