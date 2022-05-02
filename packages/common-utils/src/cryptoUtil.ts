import CryptoJS from 'crypto-js';

const CRYPTO_KEY = 'c841daae-b608-48fa-ab5b-c3d29d229c31';

export default class cryptoUtil {
  static encrypt = (text: string, keyString?: string) => {
    // console.log('cryptoUtil.encrypt()\n', text);
    // console.log('------------ keyString', keyString);

    const salt = CryptoJS.lib.WordArray.random(20);
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.PBKDF2(keyString || CRYPTO_KEY!, salt, {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA256,
    });

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // console.log('salt -----------------', salt.toString());
    // console.log('iv -------------------', iv.toString());
    // console.log('encrypted.ciphertext -', encrypted.ciphertext.toString());

    const wordArray = CryptoJS.lib.WordArray.create([
      ...salt.words,
      ...iv.words,
      ...encrypted.ciphertext.words,
    ]);

    const base64String = CryptoJS.enc.Base64.stringify(wordArray);

    return base64String;
  };

  static decrypt = (text: string, keyString?: string) => {
    // console.log('cryptoUtil.decrypt()\n', text);
    // console.log('------------ keyString', keyString);

    const encData = CryptoJS.enc.Base64.parse(text);

    // console.log('encData.words --------', encData.words);
    // console.log('encrypted.ciphertext -', encData.toString());

    const salt = CryptoJS.lib.WordArray.create(encData.words.slice(0, 5));
    const iv = CryptoJS.lib.WordArray.create(encData.words.slice(5, 9));
    const data = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.lib.WordArray.create(encData.words.slice(9, encData.words.length)),
    });

    // console.log('----------------- salt', salt.toString());
    // console.log('------------------- iv', iv.toString());
    // console.log('----------------- data', data.ciphertext.toString());

    const key = CryptoJS.PBKDF2(keyString || CRYPTO_KEY!, salt, {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA256,
    });

    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

    // console.log('decrypted -----------\n', decrypted.toString());
    // console.log('decrypted text ------\n', decryptedText);

    return decryptedText;
  };
}
