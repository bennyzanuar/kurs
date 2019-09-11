import React from 'react';

const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.NotFoundPage = true;
    return <h1>Ooops, route not found.</h1>
}

export default NotFoundPage