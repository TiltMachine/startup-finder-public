import React, {useContext, useEffect, useState} from 'react'
import {Button, Col, Collapse, Container, Row, Stack} from "react-bootstrap";
import {ReactComponent as FilterIcon} from "../../assets/icons/funnel.svg";
import JobFilterPage from "../JobPages/JobFilterPage";
import JobCard from "../../components/companies/jobComponents/JobCard";
import {getAllJobs} from "../../http/jobAPI";
import {getAllTalents} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import PersonCard from "../../components/companies/jobComponents/PersonCard";
import SideTalentFilter from "./SideTalentFilter";
import {useTranslation} from "react-i18next";
import SideJobFilter from "../JobPages/SideJobFilter";

const TalentsListPage = observer(() => {
    const {t} = useTranslation()
    const {userStorage} = useContext(Context)
    const [talentList, setTalentList] = useState([])
    const [filteredTalentList, setFilteredTalentList] = useState([])
    useEffect(() =>{
        getAllTalents().then((data)=>{
            setTalentList(data)
            setFilteredTalentList(data)
        })
    },[userStorage.updateUserStorage])

    return (
        <Container className='mt-4'>

            <Row className='d-flex text-center mt-5 mb-4'><h4>{t("TalentsPage.title")}</h4></Row>
            <Row className='d-flex justify-content-center'>
                <Col md={4} lg={4} xl={3} className='side-filter mb-3'>
                    <SideTalentFilter talents={talentList} filteredTalents={setFilteredTalentList}/>
                </Col>
                <Col md={8} lg={8} xl={7}><div>
                    <div>{filteredTalentList.map((talent, i) =>
                        <PersonCard key={i} userData={talent}/>
                    )}
                    </div>
                </div></Col>
            </Row>


        </Container>
    )
})

export default TalentsListPage