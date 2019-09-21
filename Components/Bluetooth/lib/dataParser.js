
import { parseECGParams } from './ECG';
import { parseNIBP } from './NIBP';
import { parseSpo2 } from './spO2';
import { parseTemp } from './temp';
import { defaultDataHandler } from './defaultData';

export function dataParser({data}){
    //encoded is an array of strings representing hexadecimals
    const encoded = filterResults(convertStringToByteArray(data));
    //console.log("encoded", encoded);
    const [pkgtype, ...rest] = encoded;

    switch(pkgtype){
    //     case "0x01":
    //         return parseECGWave(rest);
        case "2":
            return parseECGParams(rest);
        case "3":
            return parseNIBP(rest);
        case "4":
            return parseSpo2(rest);
        case "5":
            return parseTemp(rest);
        // case "0xfc":
        //     return parseSWVersion(rest);
        // case "0xfd":
        //     return parseHWVersion(rest);
        // case "0xfe":
        //     return parseSpo2Wave(rest);
        default:
            return defaultDataHandler(encoded);
    }
    // if (encoded.length) {
    //     dispatch(dataReceived(encoded));
    //     console.log("TCL: encoded", encoded)
    // }

    //return an array element with a key 
}

//takes raw data from monitor
// function convertStringToByteArray(str) {
//     const split = str.split('');

//     const hexString = string2Hex(split);

//     //const buffer = new ArrayBuffer(256);
//     //const view = Uint16Array.of(...split);
//     //const asArray = Array.from(view);

//     return hexString;
// }

//takes array of data and changes it to represent hexadecimal
function string2Hex(str) {
    const arrHex = str.map(splitItem => {
        return splitItem.charCodeAt(0).toString(16)
    })
    return (arrHex);

}

//remove package header and make readable
function filterResults(data) {
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
