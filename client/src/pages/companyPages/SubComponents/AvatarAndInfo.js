import React, {useContext} from 'react';
import {Button, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ReactComponent as GithubIcon} from "../../../assets/icons/PersonCard/github.svg";
import {deleteCompany} from "../../../http/companyAPI";
import {MAIN_ROUTE} from "../../../utils/const";
import {Context} from "../../../index";
const AvatarAndInfo = (props) => {
    const company = props.company
    const isOwner = props.isOwner
    const {companyStorage} = useContext(Context)
    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <Container>

            <div className='whiteBox text-center mt-4'>
                <div>
                    <Image className="profilePageAvatar" src={process.env.REACT_APP_API_URL + company.logo}/>
                </div>
                <h3>{company.name}</h3>

                <div className='block_title pe-3 ps-3 pb-2 pt-1'>{company.oneLinePitch}</div>

                <div className='cursor_pointer link_resumeCV fw-bold'  onClick={() => {
                    window.open("https://"+company.website)
                }}>{company.website}</div>

                { isOwner &&
                    <div className='mt-3'>
                        <Button className='btn-yellow me-2'>{t("CompanyPage.edit")}</Button>
                        <Button className='btn-red' onClick={()=>{
                            deleteCompany(props.company).then(data => {
                                console.log("delete called:", data)
                            }).catch(err =>{
                                console.log(err)
                            }).finally(()=>{
                                companyStorage.removeCompany(props.company._id)
                                navigate(MAIN_ROUTE)
                            })
                        }}>
                            {t("CompanyPage.del")}</Button>
                    </div>
                }

            </div>


        </Container>
    );
};

export default AvatarAndInfo;