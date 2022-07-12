import React, {useState} from 'react';
import {Container, Nav, Navbar, Stack} from "react-bootstrap";
import {BOOKMARKED_JOBS_ROUTE, COMPANY_MAIN_ROUTE, MAIN_ROUTE} from "../utils/const";
import {ReactComponent as StarIcon} from "../assets/icons/star.svg";
import {useNavigate} from "react-router-dom";

const MyCompanyNavBar = (props) => {
    const navigate = useNavigate()
    return (
        <div>
            <Navbar className="mt-2">
                <Container>
                    <Nav className="me-auto">
                        <div className='bordered_info' onClick={()=> {
                            props.currentPageUpdate('info')
                            navigate(COMPANY_MAIN_ROUTE + '/' + props.url + '/info')
                        }}>
                            Info
                        </div>
                        <div className='bordered_info' onClick={()=> {
                            props.currentPageUpdate('jobs')
                            navigate(COMPANY_MAIN_ROUTE + '/' + props.url + '/jobs')
                        }}>
                            Jobs
                        </div>
                        <div className='bordered_info' onClick={()=> {
                            props.currentPageUpdate('responses')
                            navigate(COMPANY_MAIN_ROUTE + '/' + props.url + '/responses')
                        }}>
                            Responses
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default MyCompanyNavBar