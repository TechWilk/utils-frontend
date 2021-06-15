import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Page from './Page';

const PhpClassGenerator: FC = () => {
   
    return (
        <Page
            title="utils.sh"
        >
            <Link to="/php/class/generate">PHP Setter/Getter Generator</Link>
        </Page>
    );
}

export default PhpClassGenerator;