import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyCompanyNavBar from "../../components/MyCompanyNavBar";
import {getCompany} from "../../http/companyAPI";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import SkillsTypeAhead from "../../components/utils/SkillsTypeAhead";
import CompanyInfoPage from "./SubPages/CompanyInfoPage";
import CompanyJobsPage from "./SubPages/CompanyJobsPage";
import CompanyResponsesPage from "./SubPages/CompanyResponsesPage";
import {COMPANY_MAIN_ROUTE} from "../../utils/const";

const CompanyMainPage = observer(() => {
    const {url, page} = useParams()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(page || 'info')
    const {userStorage,companyStorage} = useContext(Context)
    const [company, setCompany] = useState()
    const [owner, setOwner] = useState(null)
    const [jobList, setJobList] = useState([])

    useEffect( () => {
        if(page === undefined)
            navigate(COMPANY_MAIN_ROUTE + '/' + url + '/info')
        // else {
        //     console.log("tttt")
            getCompany(url).then(data => {
                console.log("useEffect called in CompanyPage:", data)
                setCompany(data)
                setOwner(data.owner)
                setJobList(data.jobs)
            }).catch((error) => {
                console.log("error getting smth", error)
            })
        // }
    },[url, userStorage.updateUserStorage])

    // useEffect(()=>{
    //     console.log(currentPage)
    // },[currentPage])
    function renderSwitch(param) {
        switch(param) {
            case 'info':
                return <CompanyInfoPage company={company}/>
            case 'jobs':
                return <CompanyJobsPage company={company}/>
            case 'responses':
                return <CompanyResponsesPage company={company}/>
            default:
                return <CompanyInfoPage company={company}/>
        }
    }
    return (
        <div>
            {/*<MyCompanyNavBar currentPageUpdate={setCurrentPage} currentPage={currentPage} url={url} />*/}
            { company &&
                renderSwitch(currentPage)
            }

        </div>
    )
})

export default CompanyMainPage