import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Appbar, Menu, Divider, Portal, Dialog, RadioButton } from 'react-native-paper'

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
          onPress={() => {
            closeMenu()
            logout(props.route.params.authToken)
              .then(() => props.navigation.replace('LOGIN'))
              .catch(() => {})
          }}
          icon="logout"
          title={t('menu.logout')}
        />
        {config.langs.length > 1 && (
          <>
            <Menu.Item
              onPress={() => {
                closeMenu()
                setShowLanguageDialog(true)
              }}
              icon="translate"
              title={t('menu.language')}
            />
            <Divider />
          </>
        )}
        <Menu.Item
          onPress={() => {
            closeMenu()
            props.navigation.navigate('INFO')
          }}
          icon="information-outline"
          title={t('menu.info')}
        />
      </Menu>
      <Portal>
        <Dialog visible={showLanguageDialog} onDismiss={() => setShowLanguageDialog(false)}>
          <Dialog.Title>{t('menu.select_language')}</Dialog.Title>
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
