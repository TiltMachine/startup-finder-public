import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {MAIN_ROUTE, ROLE_ADMIN} from "../utils/const";
import {useNavigate} from "react-router-dom";

const AdminPage = () => {
    const {userStorage} = useContext(Context)
    const navigate = useNavigate()
    useEffect(()=>{
        console.log('checking')
        if(userStorage.user.role !== ROLE_ADMIN)
            navigate(MAIN_ROUTE)
    })
    return (
        <div>
            Admin
        </div>
    );
};

export default AdminPage;