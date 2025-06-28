import React from 'react';
import styles from './SiteModal.module.scss';

const SiteModal = ({ children, onClose }) => {
    return (
        <div
            className={styles.modalContainer}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={styles.modal}>
                <button className={styles.close} onClick={() => onClose("Close clicked")}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default SiteModal;
