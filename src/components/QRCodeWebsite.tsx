import React, { FC, useState } from 'react';
import Page from './Page';
import Button from '../patterns/Button';
import TextInput from '../patterns/TextInput';
import QRCode from 'qrcode';
import QRCodeBlock from '../partials/QRCode';


const QRCodeWebsite: FC = () => {
    const [websiteUrl, setWebsiteUrl] = useState("");

    const [qrCodeQuality, setQRCodeQuality] = useState(500);
    const [generatedQRCodeDataUrl, setGeneratedQRCodeDataUrl] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');

    return (
        <Page
            title="QR Code Generator for Websites"
            strapline={<>QR Codes for <del>lazy</del> <em>efficient</em> designers.</>}
        >
            {generatedQRCodeDataUrl.length === 0 ? (
                <>
                    <label>
                        <div>
                            Website address (URL)
                        </div>
                        <TextInput
                            type='text'
                            value={websiteUrl}
                            onChange={(text) => setWebsiteUrl(text)}
                            placeholder={`https://...`} />
                    </label>

                    <label>
                        <div>
                            QR Code Image Size
                        </div>
                        <select
                            value={qrCodeQuality}
                            onChange={e => setQRCodeQuality(parseInt(e.target.value))}
                        >
                            <option value={200}>Low Quality (200px x 200px)</option>
                            <option value={500}>Good Quality (500px x 500px)</option>
                            <option value={1000}>High Quality (1000px x 1000px)</option>
                            <option value={2000}>Extreme Quality (2000px x 2000px)</option>
                        </select>
                    </label>

                    <Button
                        primary={true}
                        onClick={async () => {
                            try {
                                if (websiteUrl.length === 0) {
                                    return;
                                }
                                const url = websiteUrl.startsWith('https://)') || websiteUrl.startsWith('http://)') ? websiteUrl : 'https://' + websiteUrl;
                                const data = await QRCode.toDataURL(url, { type: 'image/png', width: qrCodeQuality });
                                setGeneratedQRCodeDataUrl(data);
                                setGeneratedUrl(url);
                            } catch (err) {
                                console.error(err);
                            }
                        } }
                    >
                        Generate QR Code
                    </Button>
                </>
            ) : (
                <>
                    <QRCodeBlock dataUrl={generatedQRCodeDataUrl} url={generatedUrl} />

                    <Button
                        primary={true}
                        onClick={async () => {
                            setGeneratedQRCodeDataUrl('');
                            setGeneratedUrl('');
                        } }
                    >
                        Generate another
                    </Button>
                </>
            )}

        </Page>
    );
}

export default QRCodeWebsite;
