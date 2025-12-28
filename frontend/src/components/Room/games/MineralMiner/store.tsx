import { useReducer, type ReactNode } from 'react';
import Context, { type GameAction, type GameState, initialState } from './context';

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
