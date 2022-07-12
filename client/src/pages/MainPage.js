import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {JOBS_MAIN_ROUTE} from "../utils/const";


const MainPage = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate(JOBS_MAIN_ROUTE)
    })
    return (
        <div>
          <h1>Main Page</h1>
        </div>
    );
};

export default MainPage;