import React from 'react';
import {Button, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../../utils/const";

const CompanyMainInfo = (props) => {
    const company = props.company
    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <Container>

            <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>
                <h4>{t('CompanyPage.about')}</h4>
                {company.companyDescription &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{company.companyDescription}</div>
                </div>
                }
            </div>


        </Container>
    );
};

export default CompanyMainInfo;