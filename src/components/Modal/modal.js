import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import './modal.scss';


const Modal = (props) => {

    const { handleClose } = props;
    
    return (
        <section className='modal__section'>

            <div className='modal'>

                <p>Employee Created!</p>
                <div className='modal__close'>
                    <FontAwesomeIcon icon={faClose} onClick={handleClose}></FontAwesomeIcon>
                </div>

            </div>

        </section>
    )
}

export default Modal