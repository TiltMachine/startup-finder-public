import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const ContactPopUp = (props) => {
    const {t} = useTranslation()

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Контакты для связи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<h4>{props.errorTitle}</h4>*/}
                <div className='block_title'>Телефон: </div>
                <div>+79501234567</div>
                <hr/>
                <div className='block_title'>Email: </div>
                <div>borov@gmail.com</div>
                <hr/>
                <div className='block_title'>telegram: </div>
                <div>@example</div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-green' onClick={props.onHide}>{t('Errors.close')}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ContactPopUp;