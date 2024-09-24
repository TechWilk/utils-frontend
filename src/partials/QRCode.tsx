import React, { ReactElement } from 'react';

type Props = {
    dataUrl: string
    url: string
}

const QRCode = ({ dataUrl, url }: Props): ReactElement => {

    return (
        <>
            <img src={dataUrl} width={500} height={500} />

            <p>{url}</p>
            <p>Right click on the QR Code, and choose "save as image"</p>
        </>
    );
}

export default QRCode;
