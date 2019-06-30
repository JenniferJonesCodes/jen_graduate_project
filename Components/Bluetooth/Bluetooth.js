import React, {Component}  from 'react';

export default class Bluetooth extends Component{
  componentWillMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        this.setState({ isEnabled, devices, devicesFormatted });
      }
    );
    
    BluetoothSerial.on("bluetoothEnabled", () =>
      console.log("Bluetooth enabled")
    );
    
    BluetoothSerial.on("bluetoothDisabled", () =>
      console.log("Bluetooth disabled")
    );
    
    BluetoothSerial.on("error", err => {
      console.log("error", err);
    });
    
    BluetoothSerial.on("connectionLost", () => {
      if (this.state.device) {
        this.connect(this.state.device)
        .then(res => {})
        .catch(err => {
          console.log("error", err);
        });
      }
    });
  }

    toggleBluetooth (value) {
      if (value === true) {
          this.enable()
      } else {
          this.disable()
      }
    }

    enable () {
      BluetoothSerial.enable()
      .then((res) => this.setState({ isEnabled: true }))
      .catch((err) => console.log(err.message))
    }

    disable () {
      BluetoothSerial.disable()
      .then((res) => this.setState({ isEnabled: false }))
      .catch((err) => console.log(err.message))
    }

    discoverUnpaired () {
      if (this.state.discovering) {
        return false
      } else {
        this.setState({ discovering: true })
        BluetoothSerial.discoverUnpairedDevices()
        .then((unpairedDevices) => {
          this.setState({ unpairedDevices, discovering: false })
        })
        .catch((err) => console.log(err.message))
      }
    }

    pairDevice (device) {
      BluetoothSerial.pairDevice(device.id)
      .then((paired) => {
        if (paired) {
          console.log(`Device ${device.name} paired successfully`)
          const devices = this.state.devices
          devices.push(device)
          this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) })
        } else {
          console.log(`Device ${device.name} pairing failed`)
        }
      })
      .catch((err) => console.log(err.message))
    }

    cancelDiscovery () {
      if (this.state.discovering) {
        BluetoothSerial.cancelDiscovery()
        .then(() => {
          this.setState({ discovering: false })
        })
        .catch((err) => console.log(err.message))
      }
    }

    connect (device) {
      this.setState({ connecting: true })
      BluetoothSerial.connect(device.id)
      .then((res) => {
        Toast.showShortBottom(`Connected to device ${device.name}`)
        this.setState({ device, connected: true, connecting: false })
      })
      .catch((err) => console.log(err.message))
    }

    disconnect () {
      BluetoothSerial.disconnect()
      .then(() => this.setState({ connected: false }))
      .catch((err) => console.log(err.message))
    }

    toggleConnect (value) {
      if (value === true && this.state.device) {
        this.connect(this.state.device)
      } else {
        this.disconnect()
      }
    }
}