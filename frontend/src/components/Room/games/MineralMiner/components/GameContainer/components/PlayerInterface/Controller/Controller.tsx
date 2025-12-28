import { useState, useContext } from 'react';
import { Context } from '../../../../../context';
import worker from '../../../../../assets/worker.jpg';
import minerals from '../../../../../assets/minerals.jpg';
import './Controller.scss';

export const Controller = () => {
  const [state, dispatch] = useContext(Context);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleBuildWorker = () => {
    if (state.minerals >= 50) {
      dispatch({ type: 'BUILD_WORKER' });
    } else {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: 'Not enough Minerals!' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 2000);
    }
  };

  return (
    <div className="controller">
      {showTooltip && (
        <div className="tooltip">
          <p className="tooltip-title">Train Worker</p>
          <p className="tooltip-cost">
            <i className="tooltip-icon">
              <img src={minerals} alt="Minerals" title="Minerals" />
            </i>
            <span>50</span>
            <i className="tooltip-icon">
              <img src={worker} alt="Supply" title="Supply" />
            </i>
            <span>1</span>
          </p>
          <p>Basic worker unit. Can gather resources.</p>
        </div>
      )}
      <div className="controller-grid">
        <div className="grid-item">
          <button
            type="button"
            className="build-worker-button"
            onClick={handleBuildWorker}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img src={worker} alt="Build worker" title="Build worker" />
          </button>
        </div>
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
        <div className="grid-item" />
      </div>
    </div>
  );
};
