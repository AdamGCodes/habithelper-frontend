import React, { useState } from 'react';
import styles from './SiteModal.module.scss'



const SiteModal = ({children, onClose, onCancel}) => {
    
    return (
        <div className={styles.modalContainer} onClick={(e) => { 
            if (e.target.className === "modalContainer") {
                onClose(); }}}>
            <div className={styles.modal}>
                {children}
                <p className={styles.close} onClick={ () => onClose("The close button was clicked") }>&times;</p>
                {/* <button type='submit'>{'Create'} Timer</button>
                <button onClick={() => onCancel()} >Cancel</button> */}
            </div>
            
        </div>
    )
}

export default SiteModal;