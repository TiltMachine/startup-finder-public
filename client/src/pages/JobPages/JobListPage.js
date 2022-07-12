import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Collapse, Container, Nav, Navbar, Row, Stack} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {getAllJobs} from "../../http/jobAPI";
import JobCard from "../../components/companies/jobComponents/JobCard";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import JobFilterPage from "./JobFilterPage";
import {ReactComponent as FilterIcon} from "../../assets/icons/funnel.svg";
import SideTalentFilter from "../talentsPages/SideTalentFilter";
import PersonCard from "../../components/companies/jobComponents/PersonCard";
import {useTranslation} from "react-i18next";
import SideJobFilter from "./SideJobFilter";
import ErrorPopUp from "../../components/Errors/ErrorPopUp";
import SuccessPopUp from "../../components/utils/SuccessPopUp";
import SideFastFilter from "./SideFastFilter";

const JobListPage = observer(() => {
    const {userStorage} = useContext(Context)
    const [jobList, setJobList] = useState([])
    const [filteredJobList, setFilteredJobList] = useState([])
    const [openFilter, setOpenFilter] = useState(false)
    const {t} = useTranslation()

    const navigate = useNavigate()



    useEffect(() =>{
        getAllJobs().then((data)=>{
            setJobList(data)
            setFilteredJobList(data)
        })
    },[userStorage.updateUserStorage])

    return (

        <Container>


            <Row className='d-flex text-center mt-5 mb-4'><h4>{t("JobPage.title")}</h4></Row>
            <Row className='d-flex justify-content-center'>
                <Col md={4} lg={4} xl={3} className='side-filter mb-3'>
                    <SideJobFilter jobs={jobList} filteredJobs={setFilteredJobList}/>
                </Col>
                <Col md={8} lg={8} xl={7}>
                    <div>
                        <div>{filteredJobList.map((job, i) =>
                            <JobCard key={i} job={job}/>
                        )}
                        </div>
                    </div>
                </Col>
                <Col md={4} lg={4} xl={2} className='side-filter mb-3'>
                    <SideFastFilter/>
                </Col>
            </Row>

            {/*<JobFilterPage jobs={jobList} filteredJobs={setFilteredJobList}/>*/}

        </Container>
    )
})

export default JobListPage