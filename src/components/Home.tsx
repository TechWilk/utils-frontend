import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Page from './Page';

const PhpClassGenerator: FC = () => {
   
    return (
        <Page
            title="utils.sh"
        >
            <ul>
                <li>
                    <Link to="/php/class/generate">PHP Setter/Getter Generator</Link>
                </li>
                <li>
                    <Link to="/qrcode/website">QR Code Generator for websites</Link>
                </li>
                <li>
                    <Link to="/qrcode/wifi">QR Code Generator for WiFi</Link>
                </li>
            </ul>
        </Page>
    );
}

export default PhpClassGenerator;