import { createContext } from 'react';

export interface GameState {
  text: string;
  workers: number[];
  minerals: number;
  notification: string;
}

export type GameAction =
  | { type: 'UPDATE_TEXT'; payload: string }
  | { type: 'COLLECT_MINERALS' }
  | { type: 'BUILD_WORKER' }
  | { type: 'SELECT'; payload: string }
  | { type: 'SHOW_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATION' };

export const initialState: GameState = {
  text: 'Default text...',
  workers: [1, 2, 3, 4],
  minerals: 0,
  notification: '',
};

export const Context = createContext<[GameState, React.Dispatch<GameAction>]>([
  initialState,
  () => {},
]);

export default Context;
