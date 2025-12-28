import { useEffect, useContext } from 'react';
import { Context } from '../../context';
import worker from '../../assets/worker.jpg';
import './Worker.scss';

export const Worker = () => {
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'COLLECT_MINERALS' });
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="worker">
      <img src={worker} alt="worker" />
      <div className="carried-mineral" />
    </div>
  );
};
