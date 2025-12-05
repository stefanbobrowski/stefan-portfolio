import { useUIStore } from '../../../store/uiStore';
import styles from './Tooltip.module.scss';

export default function Tooltip() {
  const { tooltip } = useUIStore();

  if (!tooltip.visible) return null;

  return (
    <div
      className={styles.tooltip}
      style={{
        left: tooltip.x,
        top: tooltip.y,
      }}
    >
      {tooltip.text}
    </div>
  );
}
