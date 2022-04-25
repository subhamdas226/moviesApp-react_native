import React , {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import Home from './screens/Home';
import Detail from './screens/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './component/Navbar'
import MainNavigation from './component/MainNavigation';

const Stack = createNativeStackNavigator(); 

const App = () => {
  
  return (

    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>

    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}>
    //   <Home></Home>
    // </View>
  );
}

export default App;