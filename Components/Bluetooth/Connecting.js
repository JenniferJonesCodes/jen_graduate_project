import React from 'react';
import {
    Text,
    View,
  } from 'react-native'

export default function Connecting({ device }) {
    return (
        <View>
            <Text>Connecting to...</Text>
            <Text>{device && device.name}</Text>
            <Text>{device.id}</Text>
        </View>
    )
}