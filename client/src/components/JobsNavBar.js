import React, {useState} from 'react';
import {Col, Collapse, Container, Form, Nav, Navbar, Row, Stack} from "react-bootstrap";
import {BOOKMARKED_JOBS_ROUTE, COMPANY_MAIN_ROUTE, JOBS_MAIN_ROUTE} from "../utils/const";
import {ReactComponent as StarIcon} from "../assets/icons/star.svg";
import {ReactComponent as FilterIcon} from "../assets/icons/funnel.svg";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const JobsNavBar = (props) => {
    const navigate = useNavigate()
    const [openFilter, setOpenFilter] = useState(false)
    const {t} = useTranslation()

    return (
        <div>
            <Navbar className="mt-2">
                <Container>
                    <Nav className="me-auto">
                        <Stack>
                            <Stack direction="horizontal" gap={1}>
                                <Stack direction="horizontal" gap={1} className='bordered_info' onClick={()=>{
                                    props.currentPageUpdate('bookmarks')
                                    navigate(JOBS_MAIN_ROUTE + '/' + 'bookmarks')
                                }}>
                                    <StarIcon width="14" height="14" alt="svg"/>
                                    <div>{t("JobsPages.bookmarks")}</div>
                                </Stack>

                                <div className="vr"/>

                                <div className='bordered_info' onClick={()=> {
                                    props.currentPageUpdate('all')
                                    navigate(JOBS_MAIN_ROUTE + '/' + 'all')
                                }}>
                                    {t("JobsPages.all")}
                                </div>
                            </Stack>
                            {/*<div>*/}
                            {/*    <Stack direction="horizontal" gap={1} className='bordered_info' onClick={() => setOpenFilter(!openFilter)}*/}
                            {/*           aria-controls="collapse-filter"*/}
                            {/*           aria-expanded={openFilter}>*/}
                            {/*        <FilterIcon width="14" height="14" alt="svg"/>*/}
                            {/*        <div>Filter</div>*/}
                            {/*    </Stack>*/}
                            {/*    <Collapse in={openFilter}>*/}
                            {/*        <div>hui</div>*/}
                            {/*    </Collapse>*/}
                            {/*</div>*/}
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>
            {/*<Container>*/}
            {/*    <Row xs="auto">*/}





            {/*        <Col><Stack direction="horizontal" gap={1} className='bordered_info' onClick={()=>{*/}
            {/*            props.currentPageUpdate('bookmarks')*/}
            {/*            navigate(JOBS_MAIN_ROUTE + '/' + 'bookmarks')*/}
            {/*        }}>*/}
            {/*            <StarIcon width="14" height="14" alt="svg"/>*/}
            {/*            <div>Bookmarks</div>*/}
            {/*        </Stack></Col>*/}
            {/*        <Col><div className="vr"/></Col>*/}
            {/*        <Col><div className='bordered_info' onClick={()=> {*/}
            {/*            props.currentPageUpdate('all')*/}
            {/*            navigate(JOBS_MAIN_ROUTE + '/' + 'all')*/}
            {/*        }}>*/}
            {/*            All*/}
            {/*        </div></Col>*/}
            {/*    </Row>*/}
            {/*    <Stack direction="horizontal" gap={2}>*/}
            {/*        <Stack direction="horizontal" gap={1} className='bordered_info' onClick={()=>{*/}
            {/*            props.currentPageUpdate('bookmarks')*/}
            {/*            navigate(JOBS_MAIN_ROUTE + '/' + 'bookmarks')*/}
            {/*        }}>*/}
            {/*            <StarIcon width="14" height="14" alt="svg"/>*/}
            {/*            <div>Bookmarks</div>*/}
            {/*        </Stack>*/}

            {/*        <div className="vr"/>*/}

            {/*        <div className='bordered_info' onClick={()=> {*/}
            {/*            props.currentPageUpdate('all')*/}
            {/*            navigate(JOBS_MAIN_ROUTE + '/' + 'all')*/}
            {/*        }}>*/}
            {/*            All*/}
            {/*        </div>*/}
            {/*    </Stack>*/}
            {/*</Container>*/}
        </div>
    )
}

export default JobsNavBar