import React from 'react'
import { Text } from 'react-native-paper'

export default {
  uploading: 'מעלה את הסרטון שלכם עכשיו. זה יכול לקחת מעט זמן.',
  loading: 'טוען...',
  welcome: (
    <>
      ברוכים הבאים לאפליקציית <Text style={{ fontFamily: 'Roboto_900Black' }}>Remote Matches</Text>{' '}
      של <Text style={{ fontFamily: 'Roboto_900Black_Italic' }}>FIRST</Text> ישראל!
    </>
  ),
  login: 'התחברות',
  hello_user: 'שלום, %{name}!',
  pre_instructor: {
    welcome_team: 'קבוצת #%{number}, ברוכים הבאים!',
    description: 'אנו שמחים מאוד שהצטרפתם אלינו ל%{event}. טקסט הסבר רץ כאן.',
    start: 'אנחנו מוכנים',
    exit: 'לא כרגע, יציאה'
  },
  rotate_phone: {
    title: 'אנא הפכו את המסך למצב מאוזן',
    helper_android: 'ודאו כי אפשרות הסיבוב האוטומטית מופעלת במכשירכם.',
    helper_ios: 'ודאו כי אפשרות ״נעילת התצוגה לאורך״ כבויה במרכז הבקרה.'
  },
  start: 'התחלה',
  next: 'לשלב הבא',
  needs_camera_permissions: 'אנחנו צריכים גישה למצלמה. אנא שנו את הגישה בהגדרות האפליקציה.',

  shoot_another: 'לחצו כאן לצילום סרטון נוסף',
  exit: 'לא, תודה. סיימנו לעכשיו',
  thank_you: 'תודה לכם על השתתפות בתחרות FLL Replay!',

  team_name: 'קבוצת #%{number} - %{affiliation}',
  datetime_formats: {
    short: 'D בMMM בשעה HH:mm',
    long: 'יום dd׳, D בMMMM, בשעה HH:mm עד %{endTime}',
    '2dates': '%{date1} עד ה־%{date2}'
  }
}