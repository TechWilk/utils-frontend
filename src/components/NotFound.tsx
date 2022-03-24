import React, { FC } from 'react';
import Page from './Page';

const NotFound: FC = () => {
   
    return (
        <Page
            title="404 Page Not Found"
        >
            <p>Unable to fine the page you requested</p>
        </Page>
    );
}

export default NotFound;