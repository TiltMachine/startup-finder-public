import React from 'react';
import {Alert} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const ErrorAlert = (props) => {
    const {t} = useTranslation()
    return (
        <Alert variant="danger" show={props.show} onClose={props.onClose} dismissible>
            {/*<div>{t('Errors.error')}</div>*/}
               <div style={{'fontSize': '13px'}}>{props.errorMessage}</div>
        </Alert>

    )
}

export default ErrorAlert