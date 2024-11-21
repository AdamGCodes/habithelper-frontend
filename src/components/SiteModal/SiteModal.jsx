import React, { useState } from 'react';
import styles from './SiteModal.module.scss'



const SiteModal = ({children, onSubmit, onClose, onCancel}) => {
    
    return (
        <div className={styles.modalContainer} 
        onClick={(e) => { 
            if (e.target.className === "modalContainer") {
                onClose("The modal was closed");
            }}}>
            <div>
                <p className={styles.close} onClick={ () => onClose("The close button was clicked") }>&times;</p>
            </div>

            <div>
                {children}
            </div>
            <button onClick={() => onSubmit("The submit button was clicked") }>Submit</button>
            <button onClick={() => onCancel("The cancel button was clicked") } >Cancel</button>
        </div>
    )
}

export default SiteModal;