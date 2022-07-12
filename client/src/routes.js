import {
    ADMIN_ROUTE, COMPANY_CREATION_ROUTE, COMPANY_LIST_ROUTE,
    COMPANY_ROUTE, JOB_CREATION_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE, PROFILE_ROUTE, JOBS_MAIN_ROUTE,
    // JOB_ROUTE,
    REGISTER_ROUTE,
    SKILL_ROUTE, PROFILE_SETTINGS_ROUTE, JOB_EDIT_ROUTE, BOOKMARKED_JOBS_ROUTE, COMPANY_MAIN_ROUTE, TALENTS_LIST_ROUTE
} from "./utils/const";
import AdminPage from "./pages/AdminPage";
import SkillPage from "./pages/SkillPage";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
// import ProjectPage from "./pages/ProjectPage";
import JobListPage from "./pages/JobPages/JobListPage";
import CompanyListPage from "./pages/CompanyListPage";
import ProfilePage from "./pages/ProfilePage";
import CompanyCreationPage from "./pages/CompanyCreationPage";
import MyProfilePage from "./pages/MyProfilePage";
import JobCreationPage from "./pages/JobCreationPage";
import ProfileSettings from "./pages/ProfileSettings";
import JobEditPage from "./pages/JobEditPage";
import BookmarkedJobsPage from "./pages/JobPages/BookmarkedJobsPage";
import JobsMainPage from "./pages/JobPages/JobsMainPage";
import CompanyMainPage from "./pages/companyPages/CompanyMainPage";
import TalentsListPage from "./pages/talentsPages/TalentsListPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <AdminPage/>
    },
    {
        path: SKILL_ROUTE,
        element: <SkillPage/>
    },
    {
        path: PROFILE_ROUTE,
        element: <MyProfilePage/>
    },
    {
        path: PROFILE_SETTINGS_ROUTE,
        element: <ProfileSettings/>
    },
    {
        path: COMPANY_CREATION_ROUTE,
        element: <CompanyCreationPage/>
    },
    {
        path: JOB_CREATION_ROUTE,
        element: <JobCreationPage/>
    },
    {
        path: JOB_EDIT_ROUTE,
        element: <JobEditPage/>
    },
    {
        path: BOOKMARKED_JOBS_ROUTE,
        element: <BookmarkedJobsPage/>
    }

]
export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        element: <MainPage/>
    },
    {
        path: LOGIN_ROUTE,
        element: <AuthPage/>
    },
    {
        path: REGISTER_ROUTE,
        element: <AuthPage/>
    },
    {
        path: JOBS_MAIN_ROUTE,
        element: <JobsMainPage/>
    },
    {
        path: JOBS_MAIN_ROUTE + '/:page',
        element: <JobsMainPage/>
    },
    {
        path: COMPANY_ROUTE + '/:url',
        element: <CompanyMainPage/>
    },
    {
        path: COMPANY_MAIN_ROUTE + '/:url' + '/:page',
        element: <CompanyMainPage/>
    },
    {
        path: COMPANY_LIST_ROUTE,
        element: <CompanyListPage/>
    },
    {
        path: PROFILE_ROUTE + '/:id',
        element: <ProfilePage/>
    },
    {
        path: TALENTS_LIST_ROUTE,
        element: <TalentsListPage/>
    }

]