import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Container, Form, Row} from "react-bootstrap";
import JobListPage from "./JobListPage";
import JobsNavBar from "../../components/JobsNavBar";
import BookmarkedJobsPage from "./BookmarkedJobsPage";
import {useNavigate, useParams} from "react-router-dom";
import {JOBS_MAIN_ROUTE} from "../../utils/const";

const JobsMainPage = observer(() => {
    const {page} = useParams()
    const [currentPage, setCurrentPage] = useState(page || 'all')
    const navigate = useNavigate()

    function renderSwitch(param) {
        switch(param) {
            case 'all':
                return <JobListPage/>
            case 'bookmarks':
                return <BookmarkedJobsPage/>
            default:
                return <JobListPage/>
        }
    }

    useEffect( () => {
        if(page === undefined)
            navigate(JOBS_MAIN_ROUTE + '/all')
    },[])

    return (
        <Container>
            <JobsNavBar currentPageUpdate={setCurrentPage} currentPage={currentPage}/>
            {renderSwitch(currentPage)}
        </Container>
    )
})

export default JobsMainPage