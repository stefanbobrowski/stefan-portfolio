import Lottie from 'lottie-react';
import botAnimation from '../../../assets/ai_idle.json';

export default function BotAvatar() {
  return (
    <Lottie
      animationData={botAnimation}
      loop
      autoplay
      style={{
        // width: 200,
        // height: 200,
        minWidth: 100,
        minHeight: 100,
        filter: 'drop-shadow(0 0 10px #00eaff50)',
      }}
    />
  );
}
