import React from 'react'
import 'react-native-gesture-handler'

import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// import { Navigator, Page } from './components/navigation'

import WelcomeScreen from './components/welcome_screen'
import QRAutentication from './components/qr_authentication'
import PreInstructor from './components/pre_instructor'
import VideroInstructor from './components/video_instructor'
import ThankyouScreen from './components/thankyou_screen'

const Stack = createStackNavigator()

export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='HOME' headerMode={false}>
      <Stack.Screen name='HOME' component={WelcomeScreen} />
      <Stack.Screen name='QR' component={QRAutentication} />
      <Stack.Screen name='PRE_INST' component={PreInstructor} />
      <Stack.Screen name='INST' component={VideroInstructor} />
      <Stack.Screen name='TNK_YOU' component={ThankyouScreen} />
    </Stack.Navigator>
  </NavigationContainer>);
}
  // return <Navigator home='HOME'>
  // 	<Page name='INST' component={VideroInstructor} />
  // 	<Page name='HOME' component={WelcomeScreen} />
  // 	<Page name='QR' component={QRAutentication} />
  // 	<Page name='PRE_INST' component={PreInstructor} />
  // 	<Page name='TNK_YOU' component={ThankyouScreen} />
  // </Navigator>