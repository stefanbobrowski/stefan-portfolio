import React, { useContext, useRef } from 'react';
import { Context } from '../../context';
import { Status } from './components/Status/Status';
import { CommandCenter } from './components/CommandCenter/CommandCenter';
import { PlayerInterface } from './components/PlayerInterface/PlayerInterface';
import { MineralField } from './components/MineralField/MineralField';
import './GameContainer.scss';

export const GameContainer = () => {
  const [state, dispatch] = useContext(Context);
  const floorRef = useRef<HTMLDivElement>(null);

  const handleFloorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SELECT', payload: '' });
    }
  };

  return (
    <div className="game-container" ref={floorRef} onClick={handleFloorClick}>
      <Status />
      <MineralField />
      <CommandCenter />
      {state.notification && (
        <div
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(139, 0, 0, 0.9)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '2px solid #ff0000',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          {state.notification}
        </div>
      )}
      <PlayerInterface />
    </div>
  );
};
