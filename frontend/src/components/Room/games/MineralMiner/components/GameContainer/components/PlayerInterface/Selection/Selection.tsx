import { useState } from 'react';
import ccOutline from '../../../../../assets/cc-outline.png';
import armored from '../../../../../assets/armored.png';
import './Selection.scss';

export const Selection = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="selection">
      <div className="selection-container">
        <div className="selection-image">
          <img src={ccOutline} alt="Command Center" title="" />
        </div>
        <p className="hitpoints">1500/1500</p>
      </div>
      <div className="selection-details">
        <h5>Command Center</h5>
        <div
          className="armored-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img src={armored} alt="" title="" />
        </div>
        {showTooltip && (
          <div className="tooltip">
            <p className="tooltip-title">Terran Building Plating</p>
            <p>Armor: 1</p>
          </div>
        )}
        <span>Armored - Mechanical - Structure</span>
      </div>
    </div>
  );
};
