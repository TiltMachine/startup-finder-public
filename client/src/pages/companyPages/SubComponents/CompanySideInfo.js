import React from 'react';
import {Button, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../../utils/const";

const CompanySideInfo = (props) => {
    const company = props.company
    console.log(company)
    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <Container>

            <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>
                {company.employeesNumber &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{t("CompanyPage.emp")}: &nbsp; <div className='block_answer'>{company.employeesNumber} {t("CompanyPage.people")}</div></div>
                    {/*<div className='block_answer'>{company.employeesNumber} {t("CompanyPage.people")}</div>*/}
                </div>
                }
                {company.country &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{t("ProfilePage.country")}: &nbsp; </div>
                    <div className='block_answer'>{company.country}</div>
                </div>
                }
                {company.city &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{t("ProfilePage.city")}: &nbsp; </div>
                    <div className='block_answer'>{company.city}</div>
                </div>
                }
                {company.jobs && company.jobs.length > 0 &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{t("CompanyPage.jobs")}: &nbsp; </div>
                    <div className='block_answer'>{company.jobs.length}</div>
                </div>
                }
                <hr/>
                <div className='d-flex mb-1'>
                    <div className='block_title cursor_pointer fw-bold' onClick={()=> navigate(PROFILE_ROUTE+'/'+ company.owner._id)}>
                        {t("CompanyPage.contact_person")}</div>
                </div>


                {/*{company.skills && company.skills.length > 0 &&*/}
                {/*    <div>*/}
                {/*    <div className='block_title mt-2'>{t("ProfilePage.skills")}:</div>*/}
                {/*        <Stack direction="horizontal" gap={2} className='job_info skillsProfile'>*/}
                {/*                {company.skills.map((skill, i) =>*/}
                {/*                    <Stack key={i} direction="horizontal" gap={1} className='job_info_item'>*/}
                {/*                        <CircleIcon width="10" height="10" alt="svg"*/}
                {/*                                    fill={skill.color}/>*/}
                {/*                        <div>*/}
                {/*                            {skill.name}*/}
                {/*                        </div>*/}
                {/*                    </Stack>*/}
                {/*                )}*/}
                {/*        </Stack>*/}
                {/*    </div>*/}
                {/*}*/}

            </div>




        </Container>
    );
};

export default CompanySideInfo;