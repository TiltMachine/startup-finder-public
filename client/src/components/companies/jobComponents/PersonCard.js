import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";
// import Logo from '../../../assets/img/aperture.png';
import Logo from '../../../assets/img/dwayne-the-rock2.png';
import {ReactComponent as LocationIcon} from '../../../assets/icons/JobCard/geo-alt-fill.svg';
import {ReactComponent as ResumeIcon} from '../../../assets/icons/PersonCard/file-earmark-person.svg';
import {ReactComponent as GithubIcon} from '../../../assets/icons/PersonCard/github.svg';
import {ReactComponent as CircleIcon} from '../../../assets/icons/circle-fill.svg';
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";
import {deleteFromResponses,
    deleteJob} from "../../../http/jobAPI";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import SuccessPopUp from "../../utils/SuccessPopUp";
import ContactPopUp from "../../utils/ContactPopUp";




const PersonCard = observer((props) => {
    // console.log(userData, jobData)
    const user = props.userData
    const job = props.jobData
    const {userStorage} = useContext(Context)
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [modalShow, setModalShow] = useState(false);

    function remFromResponses() {
        deleteFromResponses(user._id, job).then(()=>{
            console.log('deleted from responses')
            userStorage.updateUserStorage = Date.now()
        })
    }

    function ContactApplicant() {
        setModalShow(true)
    }

    return (
        <Container>
            <ContactPopUp  show={modalShow}
                           onHide={() => setModalShow(false)}
            />
            <div className="d-flex mb-3">
                <Card className="personCard">
                    <Card.Body>

                        <Row>
                            {/*--------------- АВАТАРКА ---------------*/}
                            <Stack direction="horizontal" gap={3}>
                                <div style={{paddingLeft:'10px'}}>
                                    <Image className="avatar" src={process.env.REACT_APP_API_URL + user.avatar}/>
                                </div>

                                <div style={{marginLeft:'-10px'}}>

                                    {/*--------------- ФАМИЛИЯ ИМЯ ---------------*/}
                                    {(user.firstName || user.lastName) ?
                                        <Row className='user_name'
                                             style={{paddingLeft: '12px'}}>{user.firstName} {user.lastName}</Row>
                                        :
                                        <Row className='user_name'
                                             style={{paddingLeft: '12px'}}>{user.email}</Row>
                                    }
                                    {/*--------------- ОПЫТ + СТРАНА ---------------*/}

                                    <Row>
                                        <Stack direction="horizontal" gap={2} className='location_and_exp'>

                                            {/*--------------- ОПЫТ ---------------*/}
                                            {user.experienceYears &&
                                            <div>
                                                {user.experienceYears > 1 ?
                                                    <div>{user.experienceYears} {t("PersonCard.2y")}</div>
                                                    :
                                                    <div>{user.experienceYears} {t("PersonCard.1y")}</div>
                                                }
                                            </div>
                                            }
                                            {/*--------------- ЛОКАЦИЯ ---------------*/}
                                            {user.country &&
                                            <Stack direction="horizontal" gap={1}>
                                                <LocationIcon width="12" height="12" alt="svg"/>
                                                <div>{user.country}</div>
                                            </Stack>
                                            }
                                        </Stack>
                                    </Row>
                                </div>
                            </Stack>
                        </Row>

                        <div className='mt-3'>
                            <Stack direction="horizontal" gap={2} className='person_info mt-2'>

                                {/*--------------- РЕЗЮМЕ ---------------*/}

                                    <Stack direction="horizontal" gap={1} className='person_info_item link_resumeCV cursor_pointer'
                                           onClick={() => {
                                        window.open(process.env.REACT_APP_API_URL + user.resumeCV)
                                    }}>
                                        <ResumeIcon width="12" height="12" alt="svg"/>
                                        <div>{t("PersonCard.resume")}</div>
                                    </Stack>


                                {/*--------------- ГИТХАБ ---------------*/}
                                {user.githubLink &&
                                    <Stack  direction="horizontal" gap={1} className='person_info_item cursor_pointer link_resumeCV'
                                           onClick={() => {
                                               window.open(user.githubLink)
                                           }}>
                                        <GithubIcon width="12" height="12" alt="svg"/>
                                        <div>Github</div>
                                    </Stack>
                                }
                            </Stack>
                        </div>
                        <div className='mt-3'>
                            <div className='block_title'>{t("PersonCard.exp")}</div>
                            <div className='mt-1'>
                                <div className='company_name'>Google</div>
                                <div className='prev_vacancy_name text-nowrap text-start'>
                                    <Stack direction="horizontal" gap={1} style={{paddingLeft:'0px'}}>
                                        <div>Senior FullStack Engineer - </div>
                                        <div className='accent_color'>2 years</div>
                                    </Stack>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <div className='company_name'>Amazon</div>
                                <div className='prev_vacancy_name text-nowrap text-start'>
                                    <Stack direction="horizontal" gap={1} style={{paddingLeft:'0px'}}>
                                        <div>Senior FrontEnd Glek - </div>
                                        <div className='accent_color'>1 year 5 months</div>
                                    </Stack>
                                </div>
                            </div>
                        </div>

                        {/*--------------- НАВЫКИ ---------------*/}
                        {user.skills && user.skills.length > 0 &&
                        <div>
                            <div className='block_title mt-2'>{t("PersonCard.skills")}</div>
                            <Row>
                                <Col className='align-self-end'>
                                    <Stack direction="horizontal" gap={2} className='job_info'>
                                        {user.skills && user.skills.length > 0 ?
                                            <Stack direction="horizontal" gap={1} className='job_info_item'>
                                                <CircleIcon width="10" height="10" alt="svg"
                                                            fill={user.skills[0].color}/>
                                                <div>
                                                    {user.skills[0].name}
                                                </div>
                                            </Stack>
                                            :
                                            ""
                                        }
                                        {user.skills && user.skills.length > 1 ?
                                            <Stack direction="horizontal" gap={1} className='job_info_item'>
                                                <CircleIcon width="10" height="10" alt="svg"
                                                            fill={user.skills[1].color}/>
                                                <div>
                                                    {user.skills[1].name}
                                                </div>
                                            </Stack>
                                            :
                                            ""
                                        }
                                        {user.skills && user.skills.length > 2 ?
                                            <Stack direction="horizontal" gap={1} className='job_info_item'>
                                                <CircleIcon width="10" height="10" alt="svg"
                                                            fill={user.skills[2].color}/>
                                                <div>
                                                    {user.skills[2].name}
                                                </div>
                                            </Stack>
                                            :
                                            ""
                                        }
                                        <div className='job_info_item'>{
                                            user.skills && user.skills.length - 3 > 0 ?
                                                `+${user.skills.length - 3}`
                                                :
                                                ""

                                        }</div>
                                    </Stack>
                                </Col>
                            </Row>
                        </div>
                        }
                        <Stack direction="horizontal" gap={2} className='d-flex'>
                        {user.desiredSalary &&
                            <div xs={5}>
                                <div className='block_title mt-2'>
                                    {t("PersonCard.desiredS")}
                                </div>

                                <div>

                                    {/*--------------- ЗАРПЛАТА ДЕНЬГИ ---------------*/}

                                    <Stack direction="horizontal" gap={1}>
                                        <div className='accent_color'>От {user.desiredSalary} </div>
                                        <div className='accent_color'>{user.desiredCurrency}</div>
                                    </Stack>
                                    {/*}*/}

                                </div>
                            </div>
                        }
                            {job &&
                            <div xs={7}
                                 className='text-center button-storage d-flex align-items-center align-self-end justify-content-end ms-auto'>
                                <Row>
                                    <Col>
                                        <Button className='btn-red' onClick={() => remFromResponses()}>{t("PersonCard.decline")}</Button>
                                    </Col>
                                    <Col>
                                        <Button className='btn-green'
                                                onClick={() => ContactApplicant()}>{t("PersonCard.contact")}</Button>
                                    </Col>
                                </Row>
                            </div>
                            }

                        </Stack>
                        {job &&
                        <div
                             className='text-center d-flex align-items-center justify-content-center ms-auto'>
                            <Row>
                                <Col>
                                    <Button className='btn-red' onClick={() => remFromResponses()}>{t("PersonCard.decline")}</Button>
                                </Col>
                                <Col>
                                    <Button className='btn-green'
                                            onClick={() => ContactApplicant()}>{t("PersonCard.contact")}</Button>
                                </Col>
                            </Row>
                        </div>
                        }
                    </Card.Body>
                </Card>
            </div>


        </Container>
    )
})

export default PersonCard;