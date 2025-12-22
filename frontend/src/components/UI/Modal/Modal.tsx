import { useEffect } from 'react';
import { useUIStore } from '../../../store/uiStore';
import styles from './Modal.module.scss';

export default function Modal() {
  const { modalContent, closeModal } = useUIStore();

  useEffect(() => {
    if (!modalContent) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalContent, closeModal]);

  if (!modalContent) return null;

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
        <button type="button" className={styles.modalClose} onClick={closeModal}>
          ✕
        </button>
        {modalContent}
      </div>
    </div>
  );
}
