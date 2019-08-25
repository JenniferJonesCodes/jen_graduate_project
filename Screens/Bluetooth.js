import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BluetoothClassic from '../Components/Bluetooth/BluetoothClassic';

const Bluetooth = () => (
    <View>
      <Text style={styles.title}>
        Bluetooth Devices
      </Text>
      <BluetoothClassic/>
    </View>
  );
  
  const styles = StyleSheet.create({
      title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 100,
      }
    });
    
    export default Bluetooth;
    