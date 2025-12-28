import { useContext } from 'react';
import { Context } from '../../../../context';
import { Worker } from '../../../Worker/Worker';
import commandCenter from '../../../../assets/command-center.png';

import './CommandCenter.scss';

export const CommandCenter = () => {
  const [state] = useContext(Context);

  return (
    <div className="command-center-container">
      <div className="command-center">
        <img src={commandCenter} alt="command center" />
      </div>
      <div className="cc-border" />
      <div className="workers-container">
        {state.workers.map((_worker, i) => (
          <Worker key={i} />
        ))}
      </div>
    </div>
  );
};
