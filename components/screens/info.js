import React from 'react'
import { Image, View, Platform, ScrollView, Linking } from 'react-native'
import { Card, Text, List } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import Constants from 'expo-constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

import PageTemplate from '../ui/page-template'
import { useLocalization } from '../../lib/i18n'
import useOrientation from '../../lib/use-orientation'
import useScreenSize from '../../lib/use-screen-size'
import FIRST from '../ui/FIRST'
import AppIcon from '../../assets/icons/icon-rounded.png'

const platformName = {
  ios: 'iOS',
  android: 'Android',
  windows: 'Windows',
  macos: 'macOS',
  web: 'Web'
}

export default function InfoScreen({ route, navigation }) {
  useOrientation('PORTRAIT')
  const { t } = useLocalization()
  const screenSize = useScreenSize()

  const appVersion = Constants.manifest.version
  const platform = `${platformName[Platform.OS] || Platform.os} ${Platform.Version}`

  return (
    <PageTemplate>
      <ScrollView>
        <View style={{ ...styles.container, width: screenSize.width }}>
          <Image style={styles.app_icon} source={AppIcon} resizeMode="contain" />
          <Text style={styles.app_name}>Remote Matches</Text>
          <Text style={styles.app_version}>
            {t('app_info.app_version', { version: appVersion })}
          </Text>
          <Text style={styles.platform}>{platform}</Text>

          <View>
            <Card style={styles.support.wrapper}>
              <TouchableOpacity onPress={() => Linking.openURL('mailto:fll@firstisrael.org.il')}>
                <List.Item
                  title={<FIRST>{t('app_info.contact.title')}</FIRST>}
                  description={<FIRST>{t('app_info.contact.description')}</FIRST>}
                  left={props => <List.Icon {...props} icon="forum-outline" />}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:support@firstisrael.org.il')}
              >
                <List.Item
                  title={<FIRST>{t('app_info.support.title')}</FIRST>}
                  description={<FIRST>{t('app_info.support.description')}</FIRST>}
                  left={props => <List.Icon {...props} icon="email-outline" />}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:flltech@firstisrael.org.il')}
              >
                <List.Item
                  title={<FIRST>{t('app_info.flltech.title')}</FIRST>}
                  description={<FIRST>{t('app_info.flltech.description')}</FIRST>}
                  left={props => <List.Icon {...props} icon="text-box-multiple-outline" />}
                />
              </TouchableOpacity>
            </Card>
            <Card style={styles.copyright.wrapper}>
              <Text style={styles.copyright.text}>
                <FIRST>
                  FIRST®, the FIRST® logo, FIRST® Robotics Competition, FIRST® Tech Challenge,
                  INFINITE RECHARGE℠, ULTIMATE GOAL℠, and FIRST® GAME CHANGERS℠ are trademarks of
                  For Inspiration and Recognition of Science and Technology (FIRST®). LEGO® is a
                  registered trademark of the LEGO Group. FIRST® LEGO® League, RePLAY℠, and
                  PLAYMAKERS℠ are jointly held trademark of FIRST and the LEGO Group.
                </FIRST>
              </Text>
              <Text style={styles.copyright.text}>
                <FIRST>Copyright © 2021 FIRST Israel. All rights reserved.</FIRST>
              </Text>
              <Text style={styles.copyright.text}>© &amp; ™ 2020 Lucasfilm Ltd.</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </PageTemplate>
  )
}

const styles = {
  container: {
    paddingHorizontal: RFValue(16)
  },
  app_icon: {
    height: RFValue(72),
    width: '100%',
    marginTop: RFValue(32)
  },
  app_name: {
    fontSize: RFValue(24),
    fontFamily: 'Heebo_700Bold',
    textAlign: 'center',
    paddingTop: RFValue(12),
    paddingBottom: RFValue(0)
  },
  app_version: {
    color: '#555',
    fontSize: RFValue(14),
    textAlign: 'center'
  },
  platform: {
    color: '#555',
    fontSize: RFValue(12),
    textAlign: 'center'
  },
  support: {
    wrapper: {
      marginTop: RFValue(32),
      paddingVertical: RFValue(6)
    }
  },
  copyright: {
    wrapper: {
      padding: RFValue(12),
      marginTop: RFValue(24)
    },
    text: {
      color: '#555',
      direction: 'ltr',
      fontSize: RFValue(10),
      paddingTop: RFValue(4),
      paddingBottom: RFValue(4)
    }
  }
}
