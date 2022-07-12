import React, {useContext} from 'react';
import JobCard from "../../../components/companies/jobComponents/JobCard";
import {Button, Container} from "react-bootstrap";
import {JOB_CREATION_ROUTE, MAIN_ROUTE} from "../../../utils/const";
import {deleteCompany} from "../../../http/companyAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CompanyJobsPage = observer((props) => {
    const {userStorage,companyStorage} = useContext(Context)
    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <Container>

            <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>
            <h4 className='mb-3'>{t('CompanyPage.jobs2')}</h4>
            <div>{props.company.jobs.map((job, i) =>
                    <JobCard key={i} job={job}/>
            )}
            </div>

            {userStorage.isAuthenticated && userStorage.user.companies.includes(props.company._id) &&
            <div>
                <Button className='btn-green' onClick={()=> navigate(JOB_CREATION_ROUTE, { state: props.company})}>Создать вакансию</Button>

            </div>
            }
            </div>
        </Container>
    )
})

export default CompanyJobsPage