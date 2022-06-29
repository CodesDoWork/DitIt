import React from "react";
import { Header } from "./header/Header";
import { appName } from "../constants";
import { Footer } from "./footer/Footer";
import { ErrorToast } from "./error_toast/ErrorToast";
import { useParams } from "react-router";

type TitledPageProps = React.PropsWithChildren<{
    title?: string;
}>;

export const Page = ({ title, children }: TitledPageProps) => {
    const params = useParams();
    let docTitle = title ? `${title} - ${appName}` : appName;
    let match = /(?<={{)\w+(?=}})/.exec(docTitle);
    while (match) {
        docTitle = docTitle.replace(`{{${match[0]}}}`, params[match[0]] || "");
        match = /{{\w+}}/.exec(docTitle);
    }

    document.title = docTitle;
    return (
        <>
            <Header />
            {children}
            <Footer />
            <ErrorToast />
        </>
    );
};
