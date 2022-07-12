import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Alert, Button, Col, Container, Dropdown, Image, Nav, Navbar, Row} from "react-bootstrap";
import {
    ADMIN_ROUTE, COMPANY_CREATION_ROUTE,
    COMPANY_LIST_ROUTE, COMPANY_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    JOBS_MAIN_ROUTE, ROLE_ADMIN, PROFILE_SETTINGS_ROUTE, SKILL_ROUTE, TALENTS_LIST_ROUTE, REGISTER_ROUTE
} from "../utils/const";
import {observer} from "mobx-react-lite";
import {Link, NavLink, useNavigate} from "react-router-dom";
import personIcon from '../assets/icons/personIcon.svg'
import Logo from "../assets/img/my_logo2.png";
// import i18next from "i18next";
// import './utils/translation/i18next';
// import i18next from "i18next";
import {useTranslation} from "react-i18next";
import ErrorPopUp from "./Errors/ErrorPopUp";
import ErrorAlert from "./Errors/ErrorAlert";
// import {getMyCompanies} from "../http/companyAPI";

const NavBar = observer(() => {

    const {userStorage} = useContext(Context)
    const {companyStorage} = useContext(Context)
    const tmp = "DA"
    const navigate = useNavigate()

    const {t, i18n} = useTranslation()


    const logOut = async () =>{
        userStorage.user = {}
        userStorage.isAuthenticated = false
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)

    }
    const changeLanguage = (lang) =>{
        i18n.changeLanguage(lang)
    }
    // const [modalShow, setModalShow] = useState(false);
    return (
        <Navbar collapseOnSelect expand="md" className="main_navbar">
            {/*<ErrorPopUp  show={modalShow}*/}
            {/*             onHide={() => setModalShow(false)}*/}
            {/*             errorMessage="ohhhhhhhhhhhh dog"*/}
            {/*             errorTitle="Cringe"*/}
            {/*/>*/}
            {/*<ErrorAlert show={modalShow} onClose={() => setModalShow(false)} />*/}
            <Container fluid style={{marginLeft: "2%", marginRight: "2%"}}>
                <Navbar.Brand onClick={()=>navigate(MAIN_ROUTE)}>
                    <Image className="mainLogo" src={Logo}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto navbar_items">
                        <NavLink style={({ isActive }) => isActive ? {color: "var(--accent)", fontWeight: '500'} : {color: "black"}} to={JOBS_MAIN_ROUTE}>{t('NavBar.jobs')}</NavLink>
                        <NavLink style={({ isActive }) => isActive ? {color: "var(--accent)", fontWeight: '500'} : {color: "black"}} to={TALENTS_LIST_ROUTE}>{t('NavBar.workers')}</NavLink>
                        <NavLink style={({ isActive }) => isActive ? {color: "var(--accent)", fontWeight: '500'} : {color: "black"}} to={COMPANY_LIST_ROUTE}>{t('NavBar.companies')}</NavLink>
                        {/*<NavLink style={({ isActive }) => isActive ? {textDecoration: "underline"} : {color: "black"}} to={COMPANY_LIST_ROUTE}>Новости</NavLink>*/}
                        {/*<NavLink style={({ isActive }) => isActive ? {textDecoration: "underline"} : {color: "black"}} to={COMPANY_LIST_ROUTE}>Поддержка</NavLink>*/}
                        {userStorage.user.role === "ADMIN" &&
                        <NavLink style={({isActive}) => isActive ? {color: "var(--accent)", fontWeight: '500'} : {color: "black"}}
                                 to={SKILL_ROUTE}>Скиллы</NavLink>
                        }
                    </Nav>

                {/*</div>*/}
                {userStorage.isAuthenticated ?
                        <Nav className="navbar_margin">
                            {/*<Button variant='outline-success' onClick={() => navigate(ADMIN_ROUTE)}>Админ</Button>*/}
                            <Dropdown className="text-center">
                                <Dropdown.Toggle  variant="secondary custom_dd" >
                                    <Row>
                                        <Col>
                                            <img src={personIcon}  width="24" height="24" alt="avatar"/>
                                        </Col>
                                        <Col>{userStorage.user.email}</Col>
                                    </Row>
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark custom_dd" style={{'width': '100%'}}>
                                    <Dropdown.Item onClick={() => navigate(PROFILE_ROUTE)}>{t("NavBar.profile")}</Dropdown.Item>
                                    <Dropdown.Item onClick={()=> navigate(PROFILE_SETTINGS_ROUTE)}>{t("NavBar.settings")}</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Header className="nav-bar_dropdown_titles text-secondary">{t("NavBar.my_companies")}</Dropdown.Header>
                                    {companyStorage.myCompanies.map(company =>
                                        <Dropdown.Item key={company.url} onClick={()=>{
                                            navigate(COMPANY_ROUTE+"/"+company.url)
                                        }}>{company.name}</Dropdown.Item>
                                    )}
                                    <Dropdown.Item className="nav-bar_dropdown_titles text-secondary" onClick={() => navigate(COMPANY_CREATION_ROUTE)}>{t("NavBar.create_company")}</Dropdown.Item>
                                    <Dropdown.Divider />
                                    {userStorage.user.role === ROLE_ADMIN &&
                                        <div>
                                            <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>{t("NavBar.admin_panel")}</Dropdown.Item>
                                            <Dropdown.Divider />
                                        </div>
                                    }
                                    <Dropdown.Item onClick={logOut}>
                                        {t('NavBar.exit')}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Header className="nav-bar_dropdown_titles text-secondary">
                                        {t("NavBar.language")}
                                    </Dropdown.Header>
                                    <Dropdown.Item className="text-center">

                                        <Button variant="outline-success customb" style={{marginLeft: 0}} onClick={()=> changeLanguage("ru")}>RU</Button>
                                        <Button variant="outline-success customb" style={{marginLeft: 20}} onClick={()=> changeLanguage("eng")}>ENG</Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>

                    :
                    <Nav className="text-center">
                        <Link to={LOGIN_ROUTE}>
                            <Button className='b-outline'>{t("NavBar.log_in")}</Button>
                        </Link>
                    </Nav>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;