import React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Linking from 'expo-linking'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import {
  useFonts,
  Heebo_300Light,
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_700Bold,
  Heebo_900Black
} from '@expo-google-fonts/heebo'
import { Roboto_900Black, Roboto_900Black_Italic } from '@expo-google-fonts/roboto'

import LoginScreen from './screens/login'
import HomeScreen from './screens/home'
import PreInstructorScreen from './screens/pre-instructor'
import VideoInstructorScreen from './screens/video-instructor'
import PostMatchScreen from './screens/post-match'
import { View } from 'react-native'

const prefix = Linking.makeUrl('/')
const Stack = createStackNavigator()

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Heebo_400Regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Heebo_500Medium',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Heebo_300Light',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'Heebo_100Thin',
      fontWeight: 'normal'
    }
  }
}
fontConfig.ios = fontConfig.default
fontConfig.android = fontConfig.default

const theme = {
  ...DefaultTheme,
  roundness: 6,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066B3'
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_900Black,
    Roboto_900Black,
    Roboto_900Black_Italic
  })

  if (!fontsLoaded) return <View />

  const linking = { prefixes: [prefix] }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="LOGIN" headerMode={false}>
          <Stack.Screen name="LOGIN" component={LoginScreen} />
          <Stack.Screen name="HOME" component={HomeScreen} />
          <Stack.Screen name="PRE_INST" component={PreInstructorScreen} />
          <Stack.Screen name="INST" component={VideoInstructorScreen} />
          <Stack.Screen name="TNK_YOU" component={PostMatchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = {}
