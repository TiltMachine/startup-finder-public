import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Button, Col, Container, Row, Stack, Table} from "react-bootstrap";
import {getUserResponses} from "../http/jobAPI";
import JobCard from "../components/companies/jobComponents/JobCard";
import {COMPANY_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import SideTalentFilter from "./talentsPages/SideTalentFilter";
import PersonCard from "../components/companies/jobComponents/PersonCard";
import AvatarAndMainInfo from "./ProfilePages/AvatarAndMainInfo";
import {getUserInfo} from "../http/userAPI";
import UserJobInfo from "./ProfilePages/UserJobInfo";
import {ReactComponent as CircleIcon} from "../assets/icons/circle-fill.svg";
import {useTranslation} from "react-i18next";
import ResponsesTable from "./ProfilePages/ResponsesTable";

const MyProfilePage = () => {
    const {userStorage} = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [myResponses, setMyResponses] = useState([])
    const {t} = useTranslation()

    console.log(user)

    useEffect(()=>{
        getUserInfo().then((data) =>{
            setUser(data)
        })
        getUserResponses().then((data)=>{
            setMyResponses(data)
        })
    },[])
    return(
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col md={4} lg={4} xl={4} className='mb-3'>
                    <AvatarAndMainInfo user={user} isOwner={true} />
                    <UserJobInfo user={user}/>
                </Col>
                <Col md={8} lg={8} xl={7}>
                    <ResponsesTable responses={myResponses}/>
                </Col>
            </Row>
        </Container>
    )
}

export default MyProfilePage