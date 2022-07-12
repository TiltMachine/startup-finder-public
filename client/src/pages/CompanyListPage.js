import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Container, Row, Stack, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {getAllCompanies} from "../http/companyAPI";
import {COMPANY_ROUTE} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CompanyPage =  observer(() => {
    const {companyStorage} = useContext(Context)
    const navigate = useNavigate()
    const [companyList, setCompanyList] = useState([])
    const {t} = useTranslation()

    useEffect(() =>{
        getAllCompanies().then(data =>
            setCompanyList(data)
        )
    },[])

    return (
        <Container>

            <Row className='d-flex text-center mt-5 mb-4'><h4>{t("CompanyListPage.title")}</h4></Row>

            {/*{companyList.map((company, i) =>*/}
            {/*    <div className='CompanyItem d-flex align-items-center' key={company.url} onClick={()=>{*/}
            {/*        navigate(COMPANY_ROUTE+"/"+company.url)*/}
            {/*    }}>*/}
            {/*        <Stack direction="horizontal" gap={3}>*/}
            {/*            <div>{i}</div>*/}
            {/*            <div>{company.name}</div>*/}
            {/*            <div>{company.website}</div>*/}
            {/*            <div>{company.country}</div>*/}
            {/*        </Stack>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*<div className='CompanyItem d-flex align-items-center'>*/}
            {/*    <Stack direction="horizontal" gap={3}>*/}
            {/*        <div>{i}</div>*/}
            {/*        <div>{company.name}</div>*/}
            {/*        <div>{company.website}</div>*/}
            {/*        <div>{company.country}</div>*/}
            {/*    </Stack>*/}
            {/*</div>*/}
            <div className='side-filter p-3'>
                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Company name</th>
                            <th>Website</th>
                            <th>Country</th>
                        </tr>
                    </thead>

                    <tbody className='cursor_pointer'>
                    {companyList.map((company, i) =>
                        <tr key={company.url} onClick={()=>{
                            navigate(COMPANY_ROUTE+"/"+company.url)
                        }}>
                            <td>{i}</td>
                            <td>{company.name}</td>
                            <td>{company.website}</td>
                            <td>{company.country}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
            {/*<CompanyList/>*/}
        </Container>
    )
})

export default CompanyPage;