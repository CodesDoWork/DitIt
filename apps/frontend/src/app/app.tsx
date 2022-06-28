import { Navigate, Route, Routes } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { Login, Register } from "./components/signin_up/LoginSignUp";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Profile } from "./components/profile/Profile";
import { useTypedCookies } from "./hooks/useTypedCookies";
import { TodoList } from "./components/todolist/TodoList";
import { Page } from "./components/Page";
import { ErrorPage } from "./components/error_page/ErrorPage";
import { StartPage } from "./components/start_page/StartPage";

type Navigation = Record<string, NavigationElement>;
type NavigationElement = { title?: string; element: JSX.Element };

export default function App() {
    const [cookies] = useTypedCookies();
    const loggedIn = +!!cookies.session;
    const user = useContext(UserContext);

    const login = <Navigate to="/login" />;
    const dashboard = <Navigate to="/dashboard" />;

    const navigation: Navigation = {
        "/": { element: <StartPage /> },
        "/login": { title: "Login", element: [<Login />, dashboard][loggedIn] },
        "/register": { title: "Sign Up", element: [<Register />, dashboard][loggedIn] },
        "/dashboard": { title: "Dashboard", element: [login, <Dashboard />][loggedIn] },
        "/profile": { title: user?.username, element: [login, <Profile />][loggedIn] },
        "/lists/:name": { title: "List: {{name}}", element: [login, <TodoList />][loggedIn] },
        "*": { element: <ErrorPage status={StatusCodes.NOT_FOUND} /> },
    };

    return (
        <Routes>
            {Object.entries(navigation)
                .map(([path, element]) => ({ path, ...element }))
                .map(toRoute)}
        </Routes>
    );
}

const toRoute = ({ path, title, element }: NavigationElement & { path: string }) => (
    <Route path={path} element={<Page title={title}>{element}</Page>} />
);
