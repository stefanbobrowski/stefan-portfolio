import React from 'react';
import { MiniMap } from './MiniMap/MiniMap';
import { Selection } from './Selection/Selection';
import { Portrait } from './Portrait/Portrait';
import { Controller } from './Controller/Controller';
import './PlayerInterface.scss';

export const PlayerInterface = () => {
  return (
    <div className="player-interface">
      <MiniMap />
      <Selection />
      <Portrait />
      <Controller />
    </div>
  );
};
