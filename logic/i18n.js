import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import he from '../lang/he'
import en from '../lang/en'

i18n.translations = { he, en }

i18n.locale = Localization.locale.substr(0, 2)

export default i18n
