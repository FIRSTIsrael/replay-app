import React from 'react'
import { Image, View, Text } from 'react-native'
import { Appbar, Menu, Divider } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'

import i18n from '../../lib/i18n'
import config from '../../config'
import { logout } from '../../lib/auth'

export default function HelpMenu (props) {
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false)
  const toggleLanguageMenu = () => setShowLanguageMenu(!showLanguageMenu)

  const setLanguage = locale => {
    i18n.local = locale
    if (props.setLanguage) {
      props.setLanguage(locale)
      alert(locale)
    }
  }

  return <Menu
    visible={visible}
    onDismiss={closeMenu}
    anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
      <Menu.Item onPress={() => logout(props.route.params.authToken).then(() => closeMenu()).then(() => props.navigation.replace('LOGIN'))} icon="logout" title={i18n.t('logout')} />
      <Menu.Item onPress={toggleLanguageMenu} icon="translate" title={i18n.t('language')} />
      <Divider />
      {showLanguageMenu && config.langs.map(lang => <Menu.Item key={lang.locale} onPress={() => setLanguage(lang.locale)} title={lang.title}/>).concat([<Divider />])}
      <Menu.Item onPress={async () => await WebBrowser.openBrowserAsync(config.menu.helpMailUri)} icon="help-circle-outline" title={i18n.t('help')} />
      <Menu.Item onPress={async () => await WebBrowser.openBrowserAsync(config.menu.infoUri)} icon="information-outline" title={i18n.t('about')} />
  </Menu>
}