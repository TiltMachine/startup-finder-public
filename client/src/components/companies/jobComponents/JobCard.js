import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";
import Logo from '../../../assets/img/aperture.png';
import {ReactComponent as BookMarkIcon} from '../../../assets/icons/JobCard/bookmark-plus.svg';
import {ReactComponent as BookMarkCheckedIcon} from '../../../assets/icons/JobCard/bookmark-check-fill.svg';
import {ReactComponent as LocationIcon} from '../../../assets/icons/JobCard/geo-alt-fill.svg';
import {ReactComponent as PeopleIcon} from '../../../assets/icons/JobCard/people-fill.svg';
import {ReactComponent as DisplayIcon} from '../../../assets/icons/JobCard/display.svg';
import {ReactComponent as CaseIcon} from '../../../assets/icons/JobCard/briefcase.svg';
import {ReactComponent as ClockIcon} from '../../../assets/icons/JobCard/clock-history.svg';
import {ReactComponent as CircleIcon} from '../../../assets/icons/circle-fill.svg';
import {Context} from "../../../index";
import {JOB_CREATION_ROUTE, JOB_EDIT_ROUTE} from "../../../utils/const";
import {useNavigate} from "react-router-dom";
import {
    addJobToBookmark,
    addToResponses,
    deleteJob,
    deleteJobFromBookmark,
    getBookmarkedJobs
} from "../../../http/jobAPI";
import {observer} from "mobx-react-lite";
import SuccessPopUp from "../../utils/SuccessPopUp";
import {useTranslation} from "react-i18next";




const JobCard = observer((jobData) => {

    const {userStorage} = useContext(Context)
    const navigate = useNavigate()
    const [isBookmarked, setIsBookmarked] = useState(false)
    const job = jobData.job
    const [modalShow, setModalShow] = useState(false);
    const {t} = useTranslation()

    useEffect(()=>{
        if(job.bookmarkedBy.includes(userStorage.user.id)){
            setIsBookmarked(true)
        }
    },[])

    const deleteThisJob = () =>{
        deleteJob(job).then(()=>{
            console.log("job deleted")
            userStorage.updateUserStorage = Date.now()
        })
    }

    function addToBookmark() {
        addJobToBookmark(job).then((data)=>{
            // setIsBookmarked(true)

        })

    }
    function deleteBookmark() {
        deleteJobFromBookmark(job).then((data)=>{
            // setIsBookmarked(false)

        })
    }
    function addRemBookmark() {
        if(isBookmarked)
            deleteBookmark()
        else
            addToBookmark()

        getBookmarkedJobs().then(data => {

            userStorage.user.bookmarkedJobs = data
            setIsBookmarked(!isBookmarked)
        }).catch(err =>{
            console.log(err)
        })


    }

    function addToResponsesAction() {
        addToResponses(job).then(data =>{
            console.log(data)
            setModalShow(true)
        })
    }

    function calculateDate() {
        const date1 = new Date(job.creationDate);
        const date2 = new Date(Date.now());

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        // if(diffInDays > 30)
        let num = Math.floor(diffInDays/30)
        if (num === 0){
            if (diffInDays === 0)
                return `${t("JobCard.today")}`
            if (diffInDays === 1)
                return `${diffInDays} ${t("JobCard.1ago")}`
            if (diffInDays === 2 || diffInDays === 3 || diffInDays === 4 || diffInDays === 22 || diffInDays === 23)
                return `${diffInDays} ${t("JobCard.2-4ago")}`
            if (diffInDays === 21 )
                return `${diffInDays} ${t("JobCard.21ago")}`
            return `${diffInDays} ${t("JobCard.5+ago")}`
        }
        if (num === 1)
            return `${num} ${t("JobCard.mago")}`
        return `${num} ${t("JobCard.2mago")}`
    }

    function translateEmpType(employmentType) {
        if (employmentType === "Полный рабочий день")
            return `${t("JobCard.fullday")}`
        if (employmentType === "Неполный рабочий день")
            return `${t("JobCard.parttime")}`
        if (employmentType === "Стажировка")
            return `${t("JobCard.inter")}`
        if (employmentType === "Контракт")
            return `${t("JobCard.contract")}`
        if (employmentType === "Сооснователь")
            return `${t("JobCard.coFund")}`
    }

    function translateRemJob(remoteJob) {
        if (remoteJob === "В офисе")
            return `${t("JobCard.inOffice")}`
        if (remoteJob === "Возможно удаленно")
            return `${t("JobCard.remPos")}`
        if (remoteJob === "Полностью удаленно")
            return `${t("JobCard.remPerm")}`
    }

    function translateExp(experience) {
        if (experience === "от 1 года")
            return `${t("JobCard.1y")}`
        if (experience === "от 2 лет")
            return `${t("JobCard.2y")}`
        if (experience === "от 3 лет")
            return `${t("JobCard.3y")}`
        if (experience === "от 4+ лет")
            return `${t("JobCard.4y")}`
    }

    return (
        <Container>

            <SuccessPopUp  show={modalShow}
                           onHide={() => setModalShow(false)}
            />

            <div className="d-flex justify-content-center mb-3">
                <Card className="jobCard">
                    <Card.Body>

                        <Row>
                            {/*--------------- АВАТАРКА ---------------*/}
                            <Stack direction="horizontal" gap={3}>


                            <div>
                                <Image className="avatar" src={process.env.REACT_APP_API_URL + job.companyAffiliation.logo}/>

                            </div>

                            <div className='near_avatar'>

                                {/*--------------- НАЗВАНИЕ КОМПАНИИ ---------------*/}

                                <Row className='company_name'>{job.companyAffiliation.name}</Row>

                                {/*--------------- НАЗВАНИЕ ВАКАНСИИ ---------------*/}

                                <Row className='vacancy_name text-nowrap text-start'>
                                    <Stack direction="horizontal" gap={1} style={{paddingLeft:'0px'}}>
                                        <div>{job.position}</div>

                                {/*--------------- КВАЛИФИКАЦИЯ ---------------*/}

                                        {job.qualification &&
                                        <Stack direction="horizontal" gap={1}>
                                            <div> | </div>
                                            <div className='accent_color'>{job.qualification}</div>
                                        </Stack>
                                        }
                                    </Stack>
                                </Row>
                            </div>

                            {/*--------------- ДАТА ---------------*/}
                            <div className='ms-auto text-nowrap'>
                                <Stack direction="horizontal" gap={3}>
                            <div  className='days_ago text-end text-nowrap'>{calculateDate()}</div>

                            {/*--------------- ЗАКЛАДКА ---------------*/}
                            {job.companyAffiliation.owner !== userStorage.user.id ? (
                                    <div className='bookmark accent_color text-end'>

                                        {isBookmarked ? (
                                            <BookMarkCheckedIcon width="30" height="30" alt="svg" className='bookmark-icon'
                                                          onClick={() => addRemBookmark()}/>
                                        )
                                        :
                                            <BookMarkIcon width="30" height="30" alt="svg" className='bookmark-icon'
                                                          onClick={() => addRemBookmark()}/>
                                        }

                                    </div>


                                ) :
                                ""
                            }
                                </Stack>
                            </div>
                            </Stack>
                        </Row>

                        <Row>
                            <Stack direction="horizontal" gap={3} className='location_and_people'>

                                {/*--------------- ЛОКАЦИЯ ---------------*/}

                                <Stack direction="horizontal" gap={1}>
                                    <LocationIcon width="12" height="12" alt="svg"/>
                                    <div>{job.location}</div>
                                </Stack>

                                {/*--------------- КОЛИЧЕСТВО РАБОТНИКОВ ---------------*/}

                                <Stack direction="horizontal" gap={1}>
                                    <PeopleIcon  width="12" height="12" alt="svg"/>
                                    <div>{job.companyAffiliation.employeesNumber} {t("JobCard.emp")}</div>
                                </Stack>
                            </Stack>
                        </Row>
                        <div>
                            <Stack direction="horizontal" gap={2} className='job_info mt-2'>

                                {/*--------------- ТИП РАБОТЫ ---------------*/}
                                {job.employmentType ?
                                    <Stack direction="horizontal" gap={1} className='job_info_item'>
                                        <ClockIcon width="10" height="10" alt="svg"/>
                                        <div>{translateEmpType(job.employmentType)}</div>
                                    </Stack>
                                    :
                                    ""
                                }

                                {/*--------------- УДАЛЕНКА ---------------*/}
                                {job.remoteJob ?
                                    <Stack direction="horizontal" gap={1} className='job_info_item'>
                                        <DisplayIcon width="10" height="10" alt="svg"/>
                                        <div>{translateRemJob(job.remoteJob)}</div>
                                    </Stack>
                                    :
                                    ""
                                }
                                {/*--------------- ОПЫТ РАБОТЫ ---------------*/}
                                { job.experience ?
                                    <Stack direction="horizontal" gap={1} className='job_info_item'>

                                        <CaseIcon width="10" height="10" alt="svg"/>
                                        <div>{translateExp(job.experience)}</div>
                                    </Stack>
                                    :
                                    ""
                                }
                            </Stack>
                        </div>
                        <Row>
                            <div className='salary_share'>

                                {/*--------------- ЗАРПЛАТА ДЕНЬГИ ---------------*/}

                                {job.salaryMin && job.salaryMax &&
                                <Stack direction="horizontal" gap={1}>
                                    <div>{t("JobCard.salary")}</div>
                                    <div className='accent_color'>{job.salaryMin} - {job.salaryMax}</div>
                                    <div className='accent_color'>{job.currency}</div>
                                </Stack>
                                }

                                {/*--------------- ДОЛЯ В КОМПАНИИ ---------------*/}

                                { job.shareMin && job.shareMax &&
                                <Stack direction="horizontal" gap={1}>
                                    <div>{t("JobCard.share")}</div>
                                    <div className='accent_color'>{job.shareMin} - {job.shareMax}%</div>
                                </Stack>
                                }
                            </div>
                        </Row>
                        <Stack direction="horizontal" gap={2} className='d-flex'>
                            {/*--------------- НАВЫКИ ---------------*/}
                            <div  className='align-self-end'>
                                <Stack direction="horizontal" gap={2} className='job_info'>
                                    {job.requiredSkills && job.requiredSkills.length > 0 ?
                                        <Stack direction="horizontal" gap={1} className='job_info_item'>
                                            <CircleIcon width="10" height="10" alt="svg" fill={job.requiredSkills[0].color}/>
                                            <div>
                                                {job.requiredSkills[0].name}
                                            </div>
                                        </Stack>
                                        :
                                        ""
                                    }
                                    {job.requiredSkills && job.requiredSkills.length > 1 ?
                                        <Stack direction="horizontal" gap={1} className='job_info_item'>
                                            <CircleIcon width="10" height="10" alt="svg" fill={job.requiredSkills[1].color}/>
                                            <div>
                                                {job.requiredSkills[1].name}
                                            </div>
                                        </Stack>
                                        :
                                        ""
                                    }
                                    {job.requiredSkills && job.requiredSkills.length > 2 ?
                                        <Stack direction="horizontal" gap={1} className='job_info_item'>
                                            <CircleIcon width="10" height="10" alt="svg" fill={job.requiredSkills[2].color}/>
                                            <div>
                                                {job.requiredSkills[2].name}
                                            </div>
                                        </Stack>
                                        :
                                        ""
                                    }
                                    <div className='job_info_item'>{
                                        job.requiredSkills && job.requiredSkills.length - 3 > 0 ?
                                            `+${job.requiredSkills.length - 3 }`
                                            :
                                            ""

                                    }</div>
                                </Stack>
                            </div>

                            {job.companyAffiliation.owner !== userStorage.user.id ? (
                                <div md={2} className='text-center button-storage ms-auto' >
                                    <Button className='button-blue bookmark-btn' onClick={() => addRemBookmark()}>{t("JobCard.bookmark")}</Button>
                                    <Button className='btn-green' onClick={() => addToResponsesAction()}>{t("JobCard.apply")}</Button>
                                </div>
                                ) : (
                                    <div md={4} className='text-center button-storage ms-auto'>
                                        <Button  className='btn-yellow me-2' onClick={()=> navigate(JOB_EDIT_ROUTE, {state: job})}>{t("JobCard.edit")}</Button>
                                        <Button  className='btn-red' onClick={()=> deleteThisJob()}>{t("JobCard.delete")}</Button>
                                    </div>
                            )}
                        </Stack>
                    </Card.Body>
                </Card>
            </div>


        </Container>
    )
})

export default JobCard;