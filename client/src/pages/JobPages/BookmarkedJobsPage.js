import React, {useContext, useEffect, useState} from 'react';
import {Container, Nav, Navbar, Row, Stack} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {getAllJobs, getBookmarkedJobs} from "../../http/jobAPI";
import JobCard from "../../components/companies/jobComponents/JobCard";
import {Context} from "../../index";
import {ReactComponent as StarIcon} from "../../assets/icons/star.svg";
import {useNavigate} from "react-router-dom";
import {JOB_EDIT_ROUTE, MAIN_ROUTE} from "../../utils/const";
import CompanyInfoPage from "../companyPages/SubPages/CompanyInfoPage";
import CompanyJobsPage from "../companyPages/SubPages/CompanyJobsPage";
import CompanyResponsesPage from "../companyPages/SubPages/CompanyResponsesPage";
import {useTranslation} from "react-i18next";

const BookmarkedJobsPage = observer(() => {
    const {userStorage} = useContext(Context)
    const [jobList, setJobList] = useState([])
    const navigate = useNavigate()
    const {t} = useTranslation()


    useEffect(() =>{

        getBookmarkedJobs().then((data) =>{
            setJobList([])
            setJobList(data)
        })

    },[userStorage.user.bookmarkedJobs])



    return (
        <Container>
            <Row className='d-flex text-center mt-5 mb-4'><h4>{t("BookmarkPage.title")}</h4></Row>

            <div >{jobList.map((job, i) =>
                    <JobCard key={i} job={job}/>
            )}
            </div>

        </Container>
    )
})

export default BookmarkedJobsPage