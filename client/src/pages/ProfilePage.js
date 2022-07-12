import React, {useContext, useEffect, useState} from "react";
import {getUserById} from "../http/userAPI";
import {useNavigate, useParams} from "react-router-dom";
import AvatarAndMainInfo from "./ProfilePages/AvatarAndMainInfo";
import UserJobInfo from "./ProfilePages/UserJobInfo";
import {Col, Container, Row} from "react-bootstrap";
import ResponsesTable from "./ProfilePages/ResponsesTable";
import {Context} from "../index";
import {MAIN_ROUTE, PROFILE_ROUTE} from "../utils/const";

const ProfilePage = () => {
    const {id} = useParams()
    const {userStorage} = useContext(Context)
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    useEffect( () => {
        getUserById(id).then( data => {
            setUser(data)
            console.log("useEffect called in ProfilePage:",data)
            if(data._id === userStorage.user.id)
                navigate(PROFILE_ROUTE)
        })

        // console.log(owner)
    },[id])

    return(
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col md={4} lg={4} xl={4} className='mb-3'>
                        <AvatarAndMainInfo user={user} isOwner={true} />
                        <UserJobInfo user={user}/>
                    </Col>
                    <Col md={8} lg={8} xl={7}>
                        {/*<ResponsesTable responses={myResponses}/>*/}
                    </Col>
                </Row>
            </Container>
    )
}

export default ProfilePage