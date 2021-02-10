import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import { I18nManager } from 'react-native'

import he from '../lang/he'
import en from '../lang/en'

Localization.locale = 'he-IL'

i18n.fallbacks = true
i18n.translations = { he, en }
i18n.locale = Localization.locale.substr(0, 2)
I18nManager.forceRTL(i18n.locale === 'he' || i18n.locale === 'ar')

export default i18n
