import { CharacterData } from './CharacterData';

export interface CharactersData {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: CharacterData[];
}
