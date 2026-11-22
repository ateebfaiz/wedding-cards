import QRCode from 'qrcode';

export async function generateQRCodeSVG(text: string): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#342C26', // Dark espresso matching stationery typography
        light: '#F8F5EE', // Ivory ground
      },
      errorCorrectionLevel: 'M',
    });
  } catch (err) {
    console.error('Failed to generate QR code SVG', err);
    return '';
  }
}

export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      margin: 2,
      width: 400,
      color: {
        dark: '#342C26',
        light: '#F8F5EE',
      },
      errorCorrectionLevel: 'M',
    });
  } catch (err) {
    console.error('Failed to generate QR code data URL', err);
    return '';
  }
}
