import React, { createContext, useReducer, type ReactNode } from 'react';

interface GameState {
  text: string;
  workers: number[];
  minerals: number;
  notification: string;
}

type GameAction =
  | { type: 'UPDATE_TEXT'; payload: string }
  | { type: 'COLLECT_MINERALS' }
  | { type: 'BUILD_WORKER' }
  | { type: 'SELECT'; payload: string }
  | { type: 'SHOW_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATION' };

const initialState: GameState = {
  text: 'Default text...',
  workers: [1, 2, 3, 4],
  minerals: 0,
  notification: '',
};

export const Context = createContext<[GameState, React.Dispatch<GameAction>]>([
  initialState,
  () => {},
]);

interface StoreProps {
  children: ReactNode;
}

export const Store = ({ children }: StoreProps) => {
  const [state, dispatch] = useReducer((state: GameState, action: GameAction): GameState => {
    switch (action.type) {
      case 'UPDATE_TEXT':
        return { ...state, text: action.payload };
      case 'COLLECT_MINERALS':
        return { ...state, minerals: state.minerals + 50 };
      case 'BUILD_WORKER':
        return {
          ...state,
          minerals: state.minerals - 50,
          workers: [...state.workers, state.workers.length + 1],
        };
      case 'SELECT':
        return { ...state, text: action.payload };
      case 'SHOW_NOTIFICATION':
        return { ...state, notification: action.payload };
      case 'CLEAR_NOTIFICATION':
        return { ...state, notification: '' };
      default:
        return state;
    }
  }, initialState);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};
