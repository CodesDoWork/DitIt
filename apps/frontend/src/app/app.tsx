import { Navigate, Route, Routes } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Profile } from "./components/profile/Profile";
import { useTypedCookies } from "./hooks/useTypedCookies";
import { Page } from "./components/Page";
import { ErrorPage } from "./components/error_page/ErrorPage";
import { StartPage } from "./components/start_page/StartPage";
import { Loading } from "./components/loading/Loading";
import { Login } from "./components/signin_up/Login";
import { Register } from "./components/signin_up/Register";
import { TodoListWrapper } from "./components/todolist/TodoListWrapper";

type Navigation = Record<string, NavigationElement>;
type NavigationElement = { element: JSX.Element; title?: string; access?: PageAccess };
type RouteProps = NavigationElement & { path: string };

enum PageAccess {
    Authorized,
    Unauthorized,
}

const makeNav = (element: JSX.Element, title?: string, access?: PageAccess): NavigationElement => ({
    element,
    title,
    access,
});

export default function App() {
    const [cookies] = useTypedCookies();
    const loggedIn = !!cookies.session;
    const user = useContext(UserContext);

    const navigation: Navigation = {
        "/": { element: <StartPage /> },
        "/login": makeNav(<Login />, "Login", PageAccess.Unauthorized),
        "/register": makeNav(<Register />, "Sign Up", PageAccess.Unauthorized),
        "/dashboard": makeNav(<Dashboard />, "Dashboard", PageAccess.Authorized),
        "/profile": makeNav(<Profile />, user?.username, PageAccess.Authorized),
        "/lists/:name": makeNav(<TodoListWrapper />, "List: {{name}}", PageAccess.Authorized),
        "*": { element: <ErrorPage status={StatusCodes.NOT_FOUND} /> },
    };

    const toRouteElement = ({
        path,
        title,
        element,
        access,
    }: RouteProps): [string, JSX.Element] => {
        let routeElement;
        if (access === PageAccess.Authorized) {
            if (!loggedIn) {
                routeElement = <Navigate to="/login" />;
            } else if (!user) {
                routeElement = <Page title={title} children={<Loading />} />;
            }
        } else if (access === PageAccess.Unauthorized && loggedIn) {
            routeElement = <Navigate to="/dashboard" />;
        }

        if (!routeElement) {
            routeElement = <Page title={title}>{element}</Page>;
        }

        return [path, routeElement];
    };

    return (
        <Routes>
            {Object.entries(navigation)
                .map(([path, element]) => ({ path, ...element }))
                .map(toRouteElement)
                .map(([path, element]) => (
                    <Route key={path} path={path} element={element} />
                ))}
        </Routes>
    );
}
