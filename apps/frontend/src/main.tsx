import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import "./sassStyles/main.scss";
import { CookiesProvider } from "react-cookie";
import { ErrorProvider } from "./app/contexts/ErrorContext";
import { UserProvider } from "./app/contexts/UserContext";
import ReactDOM from "react-dom";

ReactDOM.render(
    <StrictMode>
        <CookiesProvider>
            <ErrorProvider>
                <UserProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </UserProvider>
            </ErrorProvider>
        </CookiesProvider>
    </StrictMode>,
    document.getElementById("root")
);
