import Bluetooth from 'react-native-bluetooth-serial';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {ListItem} from 'react-native-elements';
const {Buffer} = require('buffer');

function DeviceList({devices, onSelect}){
  if(Array.isArray(devices) && devices.length > 0){
    return (
      <>
        { 
          devices.map(
            device => (
              <ListItem
                key={device.id}
                title={device.name}
                subtitle={device.id}
                onPress={() => onSelect(device)}
              />
            ),
          )
        }
      </>
    );
  } else {
    return <Text>No devices found</Text>
  }
}

function Connecting({device}){
  return (
    <View>
      <Text>Connecting to...</Text>
      <Text>{device.name}</Text>
      <Text>{device.id}</Text>
    </View>
  )
}

class BluetoothClassic extends React.Component {
  state = {
    enabled: true,
    devices: [],
    selectedDevice: null,
    connected: false,
    error: false,
  }

  async componentDidMount(){
    console.log('componentDidMount')

    const enabled = await Bluetooth.isEnabled();
    console.log('enabled', enabled);

    if(enabled){
      const devices = await Bluetooth.list();
      this.setState({devices});
      console.log('devices', devices);
    } else{
      this.setState({enabled: false});
      console.log('bluetooth is not enabled');
    }
  }

  connect = async (device) => {
    console.log('clicked device', device);
    this.setState({selectedDevice: device, error: false});
    console.log(Buffer);
    try{
      const connected = await Bluetooth.connect(device.id);
      console.log('connected', connected);
      this.setState({connected: true});
      // Bluetooth.on('read', (...args) => console.log('read', args))
      Bluetooth.withDelimiter('\r').then((res)=>{
        console.log("delimiter setup",res);
        Bluetooth.on('read',(data)=>{
        console.log('read',data);
        })
        })
      const didWriteFullFrom = await Bluetooth.write(Buffer.from('0x55 0xAA 0x04 0x04 0x01 0xF6'));
      const didWrite = await Bluetooth.write('0x01');
      const didWriteFrom = await Bluetooth.write(Buffer.from('0x01'));
      console.log('didWrite', didWrite);
      console.log('didWriteFullFrom', didWriteFullFrom);
      console.log('didWriteFrom', didWriteFrom);

      setTimeout(async () => {
        const result = await Bluetooth.readFromDevice();
        console.log('read result', Buffer.from(result.toString));
      },
      5000,
      )
    } catch(error) {
      this.setState({selectedDevice: null, error: true});
      console.log(error);
    }
  }

  render(){
    const {enabled, devices, selectedDevice, error, connected} = this.state;

    return(
      <View>
        {
          !enabled && (
            <Text style={styles.title}>
              Please enable bluetooth and pair with the device to continue
            </Text>
          )
        }
        {
          error && <Text>There was an error connecting</Text>
        }
        {
          enabled && devices && !selectedDevice && <DeviceList onSelect={this.connect} devices={devices} />
        }
        {
          enabled && selectedDevice && !connected && <Connecting device={selectedDevice} />
        }
        {
          connected && <Text>Connected to {selectedDevice.name}</Text>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default BluetoothClassic;
