import React from 'react';
import minerals from '../../../../assets/minerals.jpg';
import './MineralField.scss';

export const MineralField = () => {
  const mineralCount = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="mineral-field">
      {mineralCount.map(i => (
        <div className="mineral-patch" key={i}>
          <img src={minerals} alt="minerals" />
        </div>
      ))}
    </div>
  );
};
