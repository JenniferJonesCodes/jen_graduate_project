import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from './Screens/Profile';
import Search from './Screens/Search';
import Vitals from './Screens/Vitals';
//import Profile from './Screens/Profile';

let screen = Dimensions.get('window');

// export const Tabs = TabNavigator({
//   'Login': {
//     screen: Login,
//     navigationOptions: {
//       tabBarLabel: 'Login',
//       tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
//     },
//   },
//   'Search': {
//     screen: Search,
//     navigationOptions: {
//       tabBarLabel: 'Search',
//       tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
//     },
//   },
//   'Vitals': {
//     screen: Vitals,
//     navigationOptions: {
//       tabBarLabel: 'Vitals',
//       tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
//     },
//   },
// });

// export const rootNavigator = () => {
//   return StackNavigator(
//     {
//       Tabs: {
//         screen: Tabs,
//         navigationOptions: {
//           gesturesEnabled: false
//         }
//       }
//     },
//   );
// };

const TabNavigator = createBottomTabNavigator({
  Profile,
  Search,
  Vitals
});


export default createAppContainer(TabNavigator)