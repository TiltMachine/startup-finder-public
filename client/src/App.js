import React, {useContext, useEffect, useState} from 'react'
import 'bootstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {checkForAuthentication} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {getAllCompanies, getMyCompanies} from "./http/companyAPI";
import {getBookmarkedJobs} from "./http/jobAPI";
const App = observer(() => {
    const {userStorage, companyStorage} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        checkForAuthentication().then(data =>{
            userStorage.user = data
            userStorage.isAuthenticated = true
        }).catch((e)=>{
            console.log(e)
        }).finally(()=> {
            setIsLoading(false)
        })

        getMyCompanies().then(data => {
            companyStorage.myCompanies = data
        }).catch(err =>{
            console.log(err)
        })
        getBookmarkedJobs().then(data => {
            userStorage.user.bookmarkedJobs = data
        }).catch(err =>{
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userStorage, userStorage.updateUserStorage])


    //Анимация ожидания (загрузки) на клиенте
    if(isLoading){
        return <Spinner animation="border"/>
    }

  return (
      <Router>
          <NavBar/>
          <AppRouter/>
      </Router>
  )
})

export default App;
