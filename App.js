import React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Linking from 'expo-linking'
import { Provider as PaperProvider } from 'react-native-paper'

import WelcomeScreen from './components/welcome_screen'
import Teams from './components/teams'
import PreInstructor from './components/pre_inst'
import VideroInstructor from './components/video_instructor'
import ThankyouScreen from './components/thankyou_screen'

const prefix = Linking.makeUrl('/')

const Stack = createStackNavigator()

export default function App() {
  const linking = {
    prefixes: [prefix]
  }
  return (
    <PaperProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="HOME" headerMode={false}>
          <Stack.Screen name="HOME" component={WelcomeScreen} />
          <Stack.Screen name="TEAMS" component={Teams} />
          <Stack.Screen name="PRE_INST" component={PreInstructor} />
          <Stack.Screen name="INST" component={VideroInstructor} />
          <Stack.Screen name="TNK_YOU" component={ThankyouScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = {}
