import React, {useContext} from 'react';
import JobCard from "../../../components/companies/jobComponents/JobCard";
import {Button, Col, Container, Row} from "react-bootstrap";
import {JOB_CREATION_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../../../utils/const";
import {deleteCompany} from "../../../http/companyAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import AvatarAndInfo from "../SubComponents/AvatarAndInfo";
import AvatarAndMainInfo from "../../ProfilePages/AvatarAndMainInfo";
import UserJobInfo from "../../ProfilePages/UserJobInfo";
import ResponsesTable from "../../ProfilePages/ResponsesTable";
import CompanySideInfo from "../SubComponents/CompanySideInfo";
import CompanyMainInfo from "../SubComponents/CompanyMainInfo";
import CompanyJobsPage from "./CompanyJobsPage";
import CompanyResponsesPage from "./CompanyResponsesPage";
import {Context} from "../../../index";

const CompanyInfoPage = (props) => {
    const navigate = useNavigate()
    const {userStorage} = useContext(Context)

    function goToProfile() {
        navigate(PROFILE_ROUTE+'/'+ props.company.owner._id)
    }

    return (
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col md={4} lg={4} xl={4} className='mb-3'>
                    <AvatarAndInfo company={props.company} isOwner={props.company.owner._id === userStorage.user.id}/>
                    <CompanySideInfo company={props.company}/>
                </Col>
                <Col md={8} lg={8} xl={7}>
                    <CompanyMainInfo company={props.company}/>
                    <CompanyJobsPage company={props.company}/>
                    <CompanyResponsesPage company={props.company}/>
                </Col>
            </Row>
        </Container>
    )
}

export default CompanyInfoPage