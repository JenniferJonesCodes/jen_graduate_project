
import btoa from './btoa';

const packetTypes = {
    NIBP: '3',
    spo2: '4',
    temperature: '5',
}

function hex2Number(str) {
    return parseInt(str, 16);
}

//opposite of packet types
const packetTranslation = Object.entries(packetTypes).reduce((acc, [value, key]) => ({ ...acc, [key]: value }), {})

function parseNIBP(data){
    const [status, cuff, sys, mean, dia] = data;
    console.log("TCL: parseNIBP -> data", data)

    return{
        status: status,
        data: {
            cuff: hex2Number(cuff)*2,
            sys: hex2Number(sys),
            //mean: hex2Number(mean),
            dia: hex2Number(dia),
        }
    }
}

function parseSpo2(data) {
    const [status, saturation, pulse] = data;
    // console.log("TCL: data", data)
    // console.log("TCL: parseSpo2 -> pulse", pulse)
    // console.log("TCL: parseSpo2 -> saturation", saturation)
    // console.log("TCL: parseSpo2 -> status", status)
    const statuses = {
        0: 'normal',
        1: 'sensor off',
        2: 'no finger inserted',
        3: 'searching for pulse',
        4: 'searching for pulse timed out'
    }

    return {
        status: statuses[status],
        data: {
            saturation: saturation == '7f' ? null : hex2Number(saturation),
            pulseRate: pulse == 'ff' ? null : hex2Number(pulse),
        }
    }
}

function parseTemperature(data) {
    const [status, integral, decimal] = data;
    // console.log("TCL: parseTemperature -> data", data)
    // console.log("TCL: parseTemperature -> decimal", decimal)
    // console.log("TCL: parseTemperature -> integral", integral)
    // console.log("TCL: parseTemperature -> status", status)

    const statuses = {
        0: 'normal',
        1: 'off'
    }
    // console.log('parsing Temperature');

    return {
        status: statuses[status],
        data: `${hex2Number(integral)}.${hex2Number(decimal)}`
    }
}

//passes data to data specific functions for processing
function parsePacket(type, data) {
    switch (type) {
        case packetTypes.spo2:
            return parseSpo2(data);
        case packetTypes.temperature:
            return parseTemperature(data);
        case packetTypes.NIBP:
            return parseNIBP(data);
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

//takes data packet and pulls first index off which is packet type
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
    
    //turns string into an array of strings
    const split = str.split('');

    //turns strings to represent hexadecimal
    const hexString = stringArray2HexArray(split);
    //console.log("TCL: convertStringToByteArray -> hexString", hexString)

    if(hexString[2] ==='3'){
        console.log('nibp');
        console.log("TCL: convertStringToByteArray -> str", str)  
        console.log("TCL: convertStringToByteArray -> split", split)  
        console.log("TCL: convertStringToByteArray -> hexString", hexString)
    }

    //takes data packet and pulls first index off which is packet type
    const [type, data] = definePacketType(hexString);
    
    if(hexString[2] ==='3'){
        console.log("TCL: convertStringToByteArray -> data", data)    
    }

    //passes data to data specific functions for processing
    const parsedData = parsePacket(type, data);

    if (!parsedData) return [null, {}];
    //returns to handleDataIn passed to state through hooks
    return [packetTranslation[type], parsedData];
}


