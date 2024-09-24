import React, { FC, useState } from 'react';
import Page from './Page';
import Button from '../patterns/Button';
import TextInput from '../patterns/TextInput';
import QRCode from 'qrcode';
import QRCodeBlock from '../partials/QRCode';

const QRCodeWiFi: FC = () => {
    const [wifiSSID, setWifiSSID] = useState("");
    const [wifiKey, setWifiKey] = useState("");
    const [wifiType, setWifiType] = useState("WPA");
    const [qrCodeQuality, setQRCodeQuality] = useState(500);
    const [generatedQRCodeDataUrl, setGeneratedQRCodeDataUrl] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');

    return (
        <Page
            title="QR Code Generator for WiFi"
            strapline={<>QR Codes for <del>lazy</del> <em>efficient</em> network administrators.</>}
        >
            {generatedQRCodeDataUrl.length == 0 ? (
                <>
                    <label>
                        <div>
                            WiFi Network Name (SSID)
                        </div>
                        <TextInput
                            type='text'
                            value={wifiSSID}
                            onChange={(text) => setWifiSSID(text)}
                        />
                    </label>
                    <label>
                        <div>
                            WiFi Password (Key)
                        </div>
                        <TextInput
                            type='text'
                            value={wifiKey}
                            onChange={(text) => setWifiKey(text)}
                        />
                    </label>
                    <label>
                        <div>
                            WiFi Encryption (you probably want "WPA")
                        </div>
                        <TextInput
                            type='text'
                            value={wifiType}
                            onChange={(text) => setWifiType(text)}
                        />
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
                                if (wifiSSID.length === 0) {
                                    return;
                                }
                                const url = `WIFI:S:${wifiSSID};T:${wifiType};P:${wifiKey};;`
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

export default QRCodeWiFi;
