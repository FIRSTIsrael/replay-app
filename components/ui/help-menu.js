import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Appbar, Menu, Divider, Portal, Dialog, RadioButton } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'

import { useLocalization } from '../../lib/i18n'
import config from '../../config'
import { logout } from '../../lib/auth'

export default function HelpMenu(props) {
  const { t, locale, setLocale } = useLocalization()
  const [visible, setVisible] = useState(false)
  const [showLanguageDialog, setShowLanguageDialog] = useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="cog-outline" color="white" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() =>
            logout(props.route.params.authToken)
              .then(() => closeMenu())
              .then(() => props.navigation.replace('LOGIN'))
              .catch(() => {})
          }
          icon="logout"
          title={t('logout')}
        />
        <Menu.Item
          onPress={() => setShowLanguageDialog(true)}
          icon="translate"
          title={t('language')}
        />
        <Divider />
        <Menu.Item
          onPress={async () => await WebBrowser.openBrowserAsync(config.menu.helpMailUri)}
          icon="help-circle-outline"
          title={t('help')}
        />
        <Menu.Item
          onPress={async () => await WebBrowser.openBrowserAsync(config.menu.infoUri)}
          icon="information-outline"
          title={t('about')}
        />
      </Menu>
      <Portal>
        <Dialog visible={showLanguageDialog} onDismiss={() => setShowLanguageDialog(false)}>
          <Dialog.Title>{t('select_language')}</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: 170, paddingHorizontal: 0 }}>
            <ScrollView>
              <View>
                {config.langs.map(lang => (
                  <RadioButton.Item
                    key={lang.locale}
                    value={lang.locale}
                    label={lang.title}
                    status={locale === lang.locale ? 'checked' : 'unchecked'}
                    onPress={() => setLocale(lang.locale)}
                  />
                ))}
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  )
}
