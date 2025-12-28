import { MyStopwatch } from './MyTimer';
import './MiniMap.scss';

export const MiniMap = () => {
  return (
    <div className="mini-map">
      <MyStopwatch />
      <div className="visible-area">
        <div className="view-box" />
        <div className="player-base" />
      </div>
    </div>
  );
};
