import React from 'react';
import {Button, Col, Container, Image, Row, Stack, Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {COMPANY_ROUTE, PROFILE_SETTINGS_ROUTE} from "../../utils/const";
import {ReactComponent as ResumeIcon} from "../../assets/icons/PersonCard/file-earmark-person.svg";
import {ReactComponent as GithubIcon} from "../../assets/icons/PersonCard/github.svg";
import {ReactComponent as CircleIcon} from "../../assets/icons/circle-fill.svg";

const ResponsesTable = (props) => {
    const responses = props.responses
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <Container>
            <div className='whiteBox ps-4 pt-3 mt-4 pe-4'>

                <h5>{t('ProfilePage.hist')}</h5>

            {responses && responses.length > 0 &&
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>{t('ProfilePage.company')}</th>
                    <th>{t('ProfilePage.position')}</th>
                    <th>{t('ProfilePage.status')}</th>
                </tr>
                </thead>
                <tbody>
                {responses.map((job, i) =>
                    <tr key={i} onClick={()=>{
                        navigate(COMPANY_ROUTE+"/"+job.companyAffiliation.url)
                    }}>
                        <td>{i}</td>
                        <td>{job.companyAffiliation.name}</td>
                        <td>{job.qualification} {job.position}</td>
                        <td>
                            <Stack key={i} direction="horizontal" gap={1} className='job_info_item'>
                                <CircleIcon width="10" height="10" alt="svg"
                                            fill={'#cea508'}/>
                                <div>
                                    {t('ProfilePage.rev')}
                                </div>
                            </Stack>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            }
            </div>
        </Container>
    );
};

export default ResponsesTable;