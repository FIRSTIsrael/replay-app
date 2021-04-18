import React, { useState, useMemo, useEffect } from 'react'
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
import {
  Roboto_400Regular_Italic,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'

import LoginScreen from './components/screens/login'
import HomeScreen from './components/screens/home'
import InfoScreen from './components/screens/info'
import TeamScreen from './components/screens/team'
import PreMatchScreen from './components/screens/pre-match'
import MatchScreen from './components/screens/match'
import PostMatchScreen from './components/screens/post-match'
import { handleLocaleChange, LocalizationContext } from './lib/i18n'

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
  const [locale, setLocale] = useState(null)
  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale: locale => {
        setLocale(locale)
        handleLocaleChange(locale)
      }
    }),
    [locale]
  )
  const [fontsLoaded] = useFonts({
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
    Heebo_900Black,
    Roboto_400Regular_Italic,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic
  })

  useEffect(() => {
    if (locale) {
      AsyncStorage.setItem('fi-locale', locale)
    } else {
      AsyncStorage.getItem('fi-locale').then(locale =>
        localizationContext.setLocale(locale || Localization.locale.substr(0, 2) || 'he')
      )
    }
  }, [locale, setLocale])

  if (!fontsLoaded || !locale) return <AppLoading />

  const linking = { prefixes: [prefix] }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <LocalizationContext.Provider value={localizationContext}>
          <Stack.Navigator initialRouteName="LOGIN" headerMode={false}>
            <Stack.Screen name="LOGIN" component={LoginScreen} />
            <Stack.Screen name="HOME" component={HomeScreen} />
            <Stack.Screen name="INFO" component={InfoScreen} />
            <Stack.Screen name="TEAM" component={TeamScreen} />
            <Stack.Screen name="PRE_MATCH" component={PreMatchScreen} />
            <Stack.Screen name="MATCH" component={MatchScreen} />
            <Stack.Screen name="POST_MATCH" component={PostMatchScreen} />
          </Stack.Navigator>
        </LocalizationContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = {}
