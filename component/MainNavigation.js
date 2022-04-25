import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './Navbar'
import Search from '../screens/Search';

const Stack = createNativeStackNavigator(); 

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode = {'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            // headerShown : false,
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navbar navigation={navigation} />,
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            // headerShown : false,
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation}  />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
