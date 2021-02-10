import React from 'react'
import { Text } from 'react-native-paper'

export default {
  uploading: 'מעלה את הסרטון שלכם עכשיו. זה יכול לקחת מעט זמן.',
  loading: 'טוען...',
  welcome: (
    <>
      Welcome to <Text style={{ fontFamily: 'Roboto_900Black_Italic' }}>FIRST</Text> Israel Remote
      Matches App!
    </>
  ),
  login: 'Login',
  hello_user: 'Hello, %{name}!',
  pre_instructor: {
    welcome_team: 'קבוצת #%{number}, ברוכים הבאים!',
    description: 'אנו שמחים מאוד שהצטרפתם אלינו ל%{event}. טקסט הסבר רץ כאן.',
    start: 'We Are Ready',
    exit: 'Not now, Exit'
  },
  rotate_phone: {
    title: 'Please Rotate Your Device',
    helper_android: 'Make sure Auto-rotate is enabled in your device settings.',
    helper_ios: 'Make sure Portrait Orientation Lock is disabled in the Control Center.'
  },
  start: 'Start',
  next: 'Next',
  needs_camera_permissions: 'אנחנו צריכים גישה למצלמה. אנא שנו את הגישה בהגדרות האפליקציה.',

  shoot_another: 'לחצו כאן לצילום סרטון נוסף',
  exit: 'לא, תודה. סיימנו לעכשיו',
  thank_you: 'תודה לכם על השתתפות בתחרות FLL Replay!',

  team_name: 'Team #%{number} - %{affiliation}',
  datetime_formats: {
    short: 'D בMMM בשעה HH:mm',
    long: 'יום dd׳, D בMMMM, בשעה HH:mm עד %{endTime}',
    '2dates': '%{date1} עד ה־%{date2}'
  }
}
