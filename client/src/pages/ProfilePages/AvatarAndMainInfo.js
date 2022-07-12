import React from 'react';
import {Button, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {PROFILE_SETTINGS_ROUTE} from "../../utils/const";
import {ReactComponent as ResumeIcon} from "../../assets/icons/PersonCard/file-earmark-person.svg";
import {ReactComponent as GithubIcon} from "../../assets/icons/PersonCard/github.svg";

const AvatarAndMainInfo = (props) => {
    const user = props.user
    const isOwner = props.isOwner

    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <Container>

            <div className='whiteBox text-center mt-4'>
                <div>
                    <Image className="profilePageAvatar" src={process.env.REACT_APP_API_URL + user.avatar}/>
                </div>
                <h3>{user.firstName} {user.lastName}</h3>

                <Stack direction="horizontal" gap={2} className='person_info mt-2 d-flex justify-content-center mb-2'>

                    {/*--------------- РЕЗЮМЕ ---------------*/}
                    {user.resumeCV &&
                    <Stack direction="horizontal" gap={1} className='person_info_item link_resumeCV cursor_pointer '
                           onClick={() => {
                               window.open(process.env.REACT_APP_API_URL + user.resumeCV)
                           }}>
                        <ResumeIcon width="12" height="12" alt="svg"/>
                        <div>Резюме</div>
                    </Stack>
                    }


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


                {user.desiredSalary &&
                <div className='d-flex justify-content-center accent_color salary'>
                    <div>{t("ProfilePage.salary")} {user.desiredSalary} {user.desiredCurrency}</div>
                </div>
                }
                <div className='mt-2'>
                {isOwner ?

                    <Button className='btn-green' onClick={()=> navigate(PROFILE_SETTINGS_ROUTE)}>{t("ProfilePage.settings")}</Button>
                    :
                    <Button className='btn-green'>{t("ProfilePage.contact")}</Button>

                }
                </div>
            </div>


        </Container>
    );
};

export default AvatarAndMainInfo;