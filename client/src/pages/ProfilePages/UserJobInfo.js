import React from 'react';
import {Button, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {COMPANY_ROUTE, PROFILE_SETTINGS_ROUTE} from "../../utils/const";
import AvatarAndMainInfo from "./AvatarAndMainInfo";
import {ReactComponent as CircleIcon} from "../../assets/icons/circle-fill.svg";

const UserJobInfo = (props) => {
    const user = props.user
    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <Container>

            <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>
                {user.experienceYears &&
                    <div className='mb-1'>
                        {user.experienceYears === 1 &&
                            <div className='d-flex mb-1'>
                                <div className='block_title'>{t("ProfilePage.exp")}: &nbsp; </div>
                                <div className='block_answer'>{user.experienceYears} {t("ProfilePage.year1")}</div>
                            </div>
                        }
                        {user.experienceYears === 2 || user.experienceYears === 3 &&
                        <div className='d-flex mb-1'>
                            <div className='block_title'>{t("ProfilePage.exp")}: &nbsp; </div>
                            <div className='block_answer'>{user.experienceYears} {t("ProfilePage.year2")}</div>
                        </div>                        }
                        {user.experienceYears === 4 &&
                        <div className='d-flex mb-1'>
                            <div className='block_title'>{t("ProfilePage.exp")}: &nbsp; </div>
                            <div className='block_answer'>{user.experienceYears} {t("ProfilePage.year3")}</div>
                        </div>                        }
                    </div>
                }
                {user.country &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{t("ProfilePage.country")}: &nbsp; </div>
                    <div className='block_answer'>{user.country}</div>
                </div>
                }
                {user.city &&
                <div className='d-flex mb-1'>
                    <div className='block_title'>{t("ProfilePage.city")}: &nbsp; </div>
                    <div className='block_answer'>{user.city}</div>
                </div>
                }

                {user.skills && user.skills.length > 0 &&
                    <div>
                    <div className='block_title mt-2'>{t("ProfilePage.skills")}:</div>
                        <Stack direction="horizontal" gap={2} className='job_info skillsProfile'>
                                {user.skills.map((skill, i) =>
                                    <Stack key={i} direction="horizontal" gap={1} className='job_info_item'>
                                        <CircleIcon width="10" height="10" alt="svg"
                                                    fill={skill.color}/>
                                        <div>
                                            {skill.name}
                                        </div>
                                    </Stack>
                                )}
                        </Stack>
                    </div>
                }

            </div>




        </Container>
    );
};

export default UserJobInfo;