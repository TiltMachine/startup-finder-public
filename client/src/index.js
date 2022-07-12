import React, {createContext, Suspense} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './styles/utils.css';
import './styles/jobCard.css';
import './styles/personCard.css';
import './styles/auth.css';
import './styles/profilePage.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStorage from "./storage/UserStorage";
import CompanyStorage from "./storage/CompanyStorage";

import './utils/translation/i18next';

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        userStorage: new UserStorage(),
        companyStorage: new CompanyStorage(),
    }}>
        <Suspense fallback={<div>Loading ... </div>}>
            <App />
        </Suspense>

    </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
