import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import GeneralSettings from "./ProfileSettings/GeneralSettings";
import JobProfileSettings from "./ProfileSettings/JobProfileSettings";
import SecuritySettings from "./ProfileSettings/SecuritySettings";
import {getUserInfo} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

// TODO: сделать /settings/:param
const ProfileSettings = observer(() => {
    const [user, setUser] = useState({})

    const [currentSettingsPage, setCurrentSettingsPage] = useState()
    const [activeSideButton, setActiveSideButton] = useState(1)
    const {userStorage} = useContext(Context)


    useEffect(() => {
        getUserInfo().then(data => {
            console.log("user data from getUserInfo: ", data)
            setUser(data)
            setCurrentSettingsPage(<GeneralSettings user={data}/>)
        })
    }, [userStorage.user.id])
    return (

        <div>
            <Container>
                {user &&
                <Row>
                    <Col sm={2}>
                        <div className='mt-4'>
                            <ListGroup defaultActiveKey="#general" style={{borderRadius: '30px'}}>
                                <ListGroup.Item href="#general" className='settingsMenu settingsItem'  action onClick={() => {
                                    setActiveSideButton(1)
                                    setCurrentSettingsPage(<GeneralSettings user={user}/>)
                                }}>
                                    Основные
                                </ListGroup.Item>
                                <ListGroup.Item href="#jobprofile" className='settingsMenu settingsItem' action
                                                onClick={() => {
                                                    setActiveSideButton(2)
                                                    setCurrentSettingsPage(<JobProfileSettings user={user}/>)
                                                }}>
                                    Специализация
                                </ListGroup.Item>
                                <ListGroup.Item href="#security" className='settingsMenu settingsItem' action
                                                onClick={() => {
                                                    setActiveSideButton(3)
                                                    setCurrentSettingsPage(<SecuritySettings user={user}/>)
                                                }}>
                                    Безопасность
                                </ListGroup.Item>
                                <ListGroup.Item href="#contacts" className='settingsMenu' action
                                                onClick={() => {
                                                    setActiveSideButton(4)
                                                    setCurrentSettingsPage(<SecuritySettings user={user}/>)
                                                }}>
                                    Контакты
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm={10} >
                        <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>
                            {currentSettingsPage}
                        </div>
                    </Col>
                </Row>
                }
            </Container>
            <div>

            </div>
            <div>

            </div>

        </div>


    );
})

export default ProfileSettings;