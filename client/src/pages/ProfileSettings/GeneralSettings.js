import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Image, Navbar, Row} from "react-bootstrap";
import {Context} from "../../index";
import {saveProfileSettingsChanges, uploadImg} from "../../http/userAPI";
import Logo from "../../assets/img/dwayne-the-rock2.png";
import ErrorPopUp from "../../components/Errors/ErrorPopUp";
const GeneralSettings = (userData) => {
    const {userStorage} = useContext(Context)
    const [newEmail, setNewEmail] = useState(userStorage.user.email)
    const [newFirstName, setNewFirstName] = useState(userData.user.firstName === undefined ? '' : userData.user.firstName)
    const [newLastName, setNewLastName] = useState(userData.user.lastName === undefined ? '' : userData.user.lastName)
    const [newCountry, setNewCountry] = useState(userData.user.country === undefined ? '' : userData.user.country)
    const [newCity, setNewCity] = useState(userData.user.city === undefined ? '' : userData.user.city)
    const [selectedFile, setSelectedFile] = useState(null)
    const [currentAvatarPath, setCurrentAvatarPath] = useState(process.env.REACT_APP_API_URL + userData.user.avatar)

    const [modalShow, setModalShow] = useState(false);

    const handleSaveChanges = () => {
        if(selectedFile){
            const fileData = new FormData()
            fileData.append('avatar', selectedFile)
            uploadImg(fileData).then( data =>{
                if (data.status === 200)
                    setCurrentAvatarPath(process.env.REACT_APP_API_URL + data.file.path)
                else
                    setModalShow(true)

            })
        }

        const newData = {
            email: newEmail,
            firstName: newFirstName,
            lastName: newLastName,
            country: newCountry,
            city: newCity
        }
        saveProfileSettingsChanges(userStorage.user, newData).then(data => {
            userStorage.updateUserStorage = Date.now()
            console.log(data.path)
        })
    }

    return (
        <Container>
        <div className='menuPage'>
            <Form>
                <ErrorPopUp  show={modalShow}
                             onHide={() => setModalShow(false)}
                             errorMessage="Изображение пользователя поддерживает форматы: jpg, jpeg, png."
                             errorTitle="Неверный формат файла"
                />
                <h5>Основные настройки</h5>
                <hr/>
                <div className='block_title mb-2'>Изображение профиля</div>
                <Image className="avatarSettings mb-2" src={currentAvatarPath}/>

                <Form.Group as={Row} controlId="formFileLg" className="mb-3">
                    <Form.Label column sm={2}>Изображение</Form.Label>
                    <Col sm={5}>
                    <Form.Control type="file" size="sm" onChange={e=> setSelectedFile(e.target.files[0])} />
                    <div style={{fontSize: '14px'}} className='mt-1'>Поддерживаемые форматы: jpg, jpeg, png.</div>
                    </Col>
                </Form.Group>

                <hr/>

                {/*---------------------EMAIL---------------------*/}

                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                                      placeholder="Email"/>
                    </Col>
                </Form.Group>

                <hr/>

                {/*---------------------NAME---------------------*/}

                <Form.Group as={Row} className="mb-3" controlId="name">
                    <Form.Label column sm={2}>
                        Имя
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control value={newFirstName} onChange={e => setNewFirstName(e.target.value)} type="text"
                                      placeholder="Name"/>
                    </Col>
                </Form.Group>

                {/*---------------------SURNAME---------------------*/}

                <Form.Group as={Row} className="mb-3" controlId="surname">
                    <Form.Label column sm={2}>
                        Фамиилия
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control value={newLastName} onChange={e => setNewLastName(e.target.value)} type="text"
                                      placeholder="Surname"/>
                    </Col>
                </Form.Group>



                <hr/>

                {/*---------------------COUNTRY---------------------*/}

                <Form.Group as={Row} className="mb-3" controlId="country">
                    <Form.Label column sm={2}>
                        Страна
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control value={newCountry} onChange={e => setNewCountry(e.target.value)} type="text"
                                      placeholder="Country"/>
                    </Col>
                </Form.Group>

                {/*---------------------CITY---------------------*/}

                <Form.Group as={Row} className="mb-3" controlId="city">
                    <Form.Label column sm={2}>
                        Город
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control value={newCity} onChange={e => setNewCity(e.target.value)} type="text"
                                      placeholder="City"/>
                    </Col>
                </Form.Group>

                {/*---------------------SAVE BUTTON---------------------*/}

                <Row>
                    <Col>
                        <Button className='btn-green' onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Col>
                </Row>

            </Form>
        </div>
        </Container>
    );
};

export default GeneralSettings;