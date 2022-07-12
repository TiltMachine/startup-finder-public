import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const ErrorPopUp = (props) => {
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
                    {t('Errors.error')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.errorTitle}</h4>
                <p>
                    {props.errorMessage}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-red' onClick={props.onHide}>{t('Errors.close')}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorPopUp