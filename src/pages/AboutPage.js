import React from "react";

function AboutPage() {
    return <>
        <h1>About</h1>
        <p>Pers My-taste app</p>
        <p>App version: {process.env.REACT_APP_VERSION}</p>
    </>;
}

export default AboutPage;
