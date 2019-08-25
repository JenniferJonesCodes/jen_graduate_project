
import btoa from './btoa';

//takes array of data and changes it to represent hexadecimal
export function string2Hex(str) {
    const arrHex = str.map(splitItem => {
        return splitItem.charCodeAt(0).toString(16)
    })
    return (arrHex);

}

//hex to string for sending commands to monitor
export function hexToString(str) {
    const split = str.split('');

    const acsii = str.map(strItem => {
        return strItem.toString(16).charCodeAt(0)
    });
    return (acsii);
}

export function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

//takes data from monitor
export function convertStringToByteArray(str) {
    const split = str.split('');

    const hexString = string2Hex(split);

    //const buffer = new ArrayBuffer(256);
    //const view = Uint16Array.of(...split);
    //const asArray = Array.from(view);

    return hexString;
}

export function filterResults(data) {
    const [_a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, ...rest] = data;
    rest.pop();
    if (rest[rest.length - 1] === 'aa') {
        rest.pop();
    }
    if (rest[rest.length - 1] === '55') {
        rest.pop();
    }
    return rest.map(value => `0x${value.padStart(2, '0')}`)
}
