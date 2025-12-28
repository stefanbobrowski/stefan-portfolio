import { Store } from './store';
import { GameContainer } from './components/GameContainer/GameContainer';
import './MineralMiner.scss';

const MineralMiner = () => {
  return (
    <div className="project-page mineral-miner-project">
      <Store>
        <GameContainer />
      </Store>
    </div>
  );
};

export default MineralMiner;
