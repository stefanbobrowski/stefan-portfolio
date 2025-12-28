import { useStopwatch } from 'react-timer-hook';

export const MyStopwatch = () => {
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  const formatTime = (time: number) => {
    return String(time).padStart(2, '0');
  };

  return (
    <div className="timer">
      <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
    </div>
  );
};
