import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getAllCompanyResponses} from "../../../http/companyAPI";
import {Container} from "react-bootstrap";
import {COMPANY_ROUTE, PROFILE_ROUTE} from "../../../utils/const";
import {useNavigate} from "react-router-dom";
import PersonCard from "../../../components/companies/jobComponents/PersonCard";
import {useTranslation} from "react-i18next";

const CompanyResponsesPage = (props) => {
    let currentJob = {}
    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <Container>
            <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>
                <h4>{t('CompanyPage.resp')}</h4>
                {props.company.jobs.map((job, i) => {
                    currentJob = job
                    return <div key={i}>
                        <h5 className='job_info_item cust' key={i}>{job.qualification} {job.position}</h5>
                        {job.responses.map((resp,j) =>{
                            return <PersonCard key={j} userData={resp} jobData={job}/>
                            // <div key={j}>
                            //     <h4 key={j} className="cursor_pointer" onClick={()=>{
                            //         navigate(PROFILE_ROUTE+'/'+ resp._id)
                            //     }}>{resp.email}</h4>
                            // </div>
                        })}
                    </div>

                })}
            </div>
        </Container>
    )
}

export default CompanyResponsesPage