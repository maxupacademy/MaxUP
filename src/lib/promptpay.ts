import QRCode from 'qrcode';

/**
 * Standard PromptPay EMVCo QR Code generator
 * Supports Thai Mobile Numbers (10 digits) and National ID cards (13 digits)
 */

function formatField(id: string, value: string): string {
  const len = String(value.length).padStart(2, '0');
  return `${id}${len}${value}`;
}

function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function generatePromptPayPayload(target: string, amount?: number): string {
  // Clean target digits
  const cleanTarget = target.replace(/[^0-9]/g, '');

  let targetField = '';
  if (cleanTarget.length === 10) {
    // Mobile number: format as 0066 + 9 digits (exclude leading 0)
    const mobileFormatted = '0066' + cleanTarget.slice(1);
    targetField = formatField('01', mobileFormatted);
  } else if (cleanTarget.length === 13) {
    // National ID card
    targetField = formatField('02', cleanTarget);
  } else {
    // Fallback: format as mobile
    const mobileFormatted = '0066' + (cleanTarget.startsWith('0') ? cleanTarget.slice(1) : cleanTarget);
    targetField = formatField('01', mobileFormatted);
  }

  // Merchant Account Info - PromptPay AID
  const aidField = formatField('00', 'A000000677010111');
  const merchantInfo = formatField('29', aidField + targetField);

  // Point of Initiation Method: 12 (Dynamic with amount) or 11 (Static without amount)
  const pointOfInitiation = amount !== undefined && amount > 0 ? formatField('01', '12') : formatField('01', '11');

  let raw = formatField('00', '01') + pointOfInitiation + merchantInfo + formatField('53', '764');

  if (amount !== undefined && amount > 0) {
    const formattedAmount = amount.toFixed(2);
    raw += formatField('54', formattedAmount);
  }

  raw += formatField('58', 'TH');
  raw += '6304';

  const checksum = crc16(raw);
  return raw + checksum;
}

export async function generatePromptPayQrDataUrl(
  promptPayNumber: string,
  amount?: number
): Promise<string> {
  try {
    const payload = generatePromptPayPayload(promptPayNumber, amount);
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 400,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Failed to generate PromptPay QR data url:', err);
    // Fallback using public promptpay image service if local fails
    const clean = promptPayNumber.replace(/[^0-9]/g, '');
    const amtStr = amount ? `/${amount}` : '';
    return `https://promptpay.io/${clean}${amtStr}.png`;
  }
}
