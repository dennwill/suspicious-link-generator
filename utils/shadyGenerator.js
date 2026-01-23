const suspiciousNouns = [
  'free-iphone', 'hot-singles', 'bank-of-america', 'paypal-login', 
  'irs-tax-refund', 'webcam-recording', 'cryptowallet', 'password-dump'
];

const suspiciousVerbs = [
  'download', 'verify', 'confirm', 'install', 'unzip', 'execute'
];

const scaryExtensions = [
  '.exe', '.vbs', '.bat', '.cmd', '.scr', '.dll'
];

export function generateShadyLink(originalUrl, baseUrl) {
    let encoded = btoa(originalUrl)

    encoded = encoded.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '~');

    let noun = suspiciousNouns[Math.floor(Math.random() * suspiciousNouns.length)]
    let verb = suspiciousVerbs[Math.floor(Math.random() * suspiciousVerbs.length)]
    let extension = scaryExtensions[Math.floor(Math.random() * scaryExtensions.length)]
    
    return `${baseUrl}/${verb}/${noun}/${encoded}/${extension}`
}