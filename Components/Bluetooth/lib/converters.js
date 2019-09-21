
import btoa from './btoa';

const packetTypes = {
    temperature: '5',
    spo2: '4',
}

const packetTranslation = Object.entries(packetTypes).reduce((acc, [value, key]) => ({ ...acc, [key]: value }), {})

function parseSpo2(data) {
    const [status, saturation, pulse] = data;

    return {
            status,
            data: {
                saturation,
                pulseRate: pulse,
            }
        }
}

function parseTemperature(data) {
    const [status, integral, decimal] = data;

    console.log('parsing Temperature');

    return {
        status,
        data: `${integral}.${decimal}`
    }
}

function parsePacket(type, data) {
    switch (type) {
        case packetTypes.spo2:
            return parseSpo2(data);
        case packetTypes.temperature:
            return parseTemperature(data);
        default: return null;
    }
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

//takes array of data and changes it to represent hexadecimal
function stringArray2HexArray(str) {
    const arrHex = str.map(splitItem => {
        return splitItem.charCodeAt(0).toString(16)
    })
    return (arrHex);

}

function definePacketType(data) {
    const [_, ...packet] = data;

    if (packet && packet.length) {
        const [length, type, ...rest] = packet;
        if (rest) {
            const packetContents = rest.slice(0, length);
            return [type, packetContents];
        }
    }

    return [null, []];
}

export function convertStringToByteArray(str) {
    const split = str.split('\n')[0].split('');

    const hexString = stringArray2HexArray(split);

    //const buffer = new ArrayBuffer(256);
    //const view = Uint16Array.of(...split);
    //const asArray = Array.from(view);

    const [type, data] = definePacketType(hexString);

    const parsedData = parsePacket(type, data);

    if (!parsedData) return [null, {}];

    return [packetTranslation[type], parsedData];
    // return hexString;
}


