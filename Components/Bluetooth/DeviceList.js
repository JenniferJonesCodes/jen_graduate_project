import React from 'react';
import {
  Text,
} from 'react-native'
import { ListItem } from 'react-native-elements';

export default function DeviceList({ devices, onSelect }) {
  if (Array.isArray(devices) && devices.length > 0) {
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