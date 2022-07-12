import React, {useContext, useState} from "react"
import {Button, Card, Form} from "react-bootstrap"
import {checkForAuthentication, login, loginGoogle, registration} from "../http/userAPI";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { GoogleLogin } from 'react-google-login'
import ErrorAlert from "../components/Errors/ErrorAlert";

const AuthPage = observer(() => {
    
    const {userStorage} = useContext(Context)
    const currentLocation = useLocation()

    const loginLocation = currentLocation.pathname === LOGIN_ROUTE


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [modalShow, setModalShow] = useState(false);

    const clickRequest = async () =>{
        try {
            setError('')

            if (loginLocation) {
                await login(email, password)
            } else {
                await registration(email, password)
            }
            afterLogin()

        } catch (e) {
            setModalShow(true)
            setError(e.response.data.message)
            console.log(e.response.data.message)
        }
    }

    const responseGoogle_ok = async (response) => {
        await loginGoogle(response.getAuthResponse().id_token).then((data)=>{
            // console.log(data)
        })
        afterLogin()
    }

    const afterLogin = () =>{
        checkForAuthentication().then(data =>{
            userStorage.user = data
            userStorage.isAuthenticated = true

            console.log("user in auth: ", data)
        }).catch((e)=>{
            console.log(e)
        })
        userStorage.updateUserStorage = Date.now()
        navigate(MAIN_ROUTE)
    }

    const responseGoogle_err = (error) => {
        setModalShow(true)
        setError(error.error)
        console.log(error)
    }

    return(

        <div className="row d-flex justify-content-center flex-nowrap">
            <Card border="success" style={{ width: '25rem', borderRadius: '30px', padding: '10px' }} className='register_card'>
                <Card.Header className='text-center reg-log'>{loginLocation? "Авторизация" : "Регистрация"}</Card.Header>
                {/*<div>{loginLocation? "Авторизация" : "Регистрация"}</div>*/}
                <Card.Body>
                    <Card.Title className='text-center'>Startup Finder</Card.Title>

                    { loginLocation ?
                        <div >
                            <div className="mt-2" >
                                <GoogleLogin className='width100'
                                    clientId="..."
                                    buttonText="Войти с помощью Google"
                                    onSuccess={responseGoogle_ok}
                                    onFailure={responseGoogle_err}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                        :
                        <div>
                            <div className="mt-2">
                                <GoogleLogin className='width100'
                                    clientId="..."
                                    buttonText="Зарегестрироваться с помощью Google"
                                    onSuccess={responseGoogle_ok}
                                    onFailure={responseGoogle_err}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>

                    }

                    <div className="d-flex align-items-center mt-3 mb-2 justify-content-center">
                        <div className='line'/>
                        <div className='small-text text-nowrap'> или войти через Email</div>
                        <div className='line'/>
                    </div>

                    <Form>

                        <ErrorAlert show={modalShow} onClose={() => setModalShow(false)} errorMessage={error}/>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" className='height42'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль" className='height42'
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                            />

                        </Form.Group>


                    </Form>
                    {   loginLocation ?
                        <div className='text-center'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='me-2'>Нет аккаунта?</div>
                            <div><Link to={REGISTER_ROUTE} className='link-text'>Регистрация</Link></div>
                        </div>
                            <div className='mt-2'>
                                <Button className='btn-green' onClick={clickRequest}>Войти</Button>
                            </div>
                        </div>
                        :
                        <div className='text-center'>
                            <div className='d-flex align-items-center justify-content-center '>
                                <div className='me-2'>Есть аккаунт?</div>
                                <div><Link to={LOGIN_ROUTE} className='link-text '>Войти</Link></div>
                            </div>
                            <div className='mt-2'>
                                <Button className='btn-green' onClick={clickRequest}>Зарегестрироваться</Button>
                            </div>
                        </div>
                    }
                </Card.Body>
            </Card>
        </div>

    )
})
export default AuthPage