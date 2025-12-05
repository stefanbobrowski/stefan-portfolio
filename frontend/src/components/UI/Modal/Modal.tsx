import { useUIStore } from '../../../store/uiStore';
import styles from './Modal.module.scss';

export default function Modal() {
  const { modalContent, closeModal } = useUIStore();

  if (!modalContent) return null;

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={closeModal}>
          ✕
        </button>

        {modalContent}
      </div>
    </div>
  );
}
