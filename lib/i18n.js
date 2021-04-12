import { createContext, useContext } from 'react'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import { I18nManager } from 'react-native'
import * as Updates from 'expo-updates'

import he from '../lang/he'
import en from '../lang/en'

I18nManager.allowRTL(true)

i18n.fallbacks = true
i18n.translations = { he, en }

export const LocalizationContext = createContext()

export const useLocalization = () => {
  return useContext(LocalizationContext)
}

export const handleLocaleChange = locale => {
  const isLocaleRTL = locale === 'he' || locale === 'ar'
  Localization.locale = locale
  i18n.locale = locale

  if (I18nManager.isRTL !== isLocaleRTL) {
    I18nManager.forceRTL(isLocaleRTL)
    Updates.reloadAsync()
  }
}

export default i18n
