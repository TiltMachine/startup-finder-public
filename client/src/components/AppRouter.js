import React, {useContext} from 'react';
import { Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {userStorage} = useContext(Context)
    // console.log(user)
    return (
        <Routes>
            {
                userStorage.isAuthenticated && authRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>)
            }
            {
                publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>)
            }
        </Routes>
    )
})

export default AppRouter;