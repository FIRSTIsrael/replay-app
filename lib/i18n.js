import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import he from '../lang/he'
import en from '../lang/en'
import { I18nManager } from 'react-native'

Localization.locale = 'he'
I18nManager.forceRTL(Localization.isRTL)

i18n.fallbacks = true
i18n.translations = { he, en }
i18n.locale = Localization.locale.substr(0, 2)

export default i18n
