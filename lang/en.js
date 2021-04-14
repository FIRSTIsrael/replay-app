export default {
  loading: 'Loading...',
  welcome: {
    headline: 'Welcome to FIRST Israel Remote Matches App!',
    intro: 'אנחנו כבר לא יכולים לחכות לראות את הדברים עליהם עבדתם בעונה זו!'
  },
  login: 'Login',
  hello_user: 'Hello, %{name}!',
  select_team: 'Teams',
  match_status: {
    UNSUBMITTED: 'Unsubmitted',
    SUBMITTED: 'Submitted'
  },
  pre_instructor: {
    title: 'Start %{match_name}',
    welcome_team: 'Team #%{number}, Welcome!',
    description:
      'קבוצת #%{team}, אנו שמחים מאוד שהצטרפתם אלינו ל%{event}, כעת נצלם את ה%{match}. מקמו את הטלפון כך שיהיה בזיוות המתאימה לצילום הזירה ועקבו אחר הנחיות הצילום המלאות המופיעות במפת המשאבים באתר FIRST. התכוננו לתחילת המקצה.',
    start: 'We Are Ready',
    exit: 'Not now, Exit'
  },
  rotate_phone: {
    title: 'Please Rotate Your Device',
    helper_android: 'Make sure Auto-rotate is enabled in your device settings.',
    helper_ios: 'Make sure Portrait Orientation Lock is disabled in the Control Center.'
  },
  overwrite_warning: {
    title: '%{match} has already been submitted',
    description:
      'You are about to delete the existing match and upload this new match instead. Are you sure you want to continue?',
    overwrite: 'Resubmit',
    cancel: 'Cancel'
  },
  permissions: {
    permission_required: 'Permission Required',
    settings: 'Settings',
    cam_access_android:
      'To record this match, allow FIRST access to your camera. Tap Settings > Permissions, and turn Camera on.',
    cam_access_ios:
      'To record this match, allow FIRST access to your camera. Tap Settings, and turn Camera on.',
    mic_access_android:
      'To record this match, allow FIRST access to your microphone. Tap Settings > Permissions, and turn Microphone on.',
    mic_access_ios:
      'To record this match, allow FIRST access to your microphone. Tap Settings, and turn Microphone on.'
  },
  processing: {
    title: 'Just a moment',
    text:
      'Please wait while we process the video and upload it to the FIRST Servers. This may take a few minutes, do not close the app.'
  },
  post_match: {
    title: '%{match} Submitted Successfully!'
  },
  start: 'Start',
  next: 'Next',
  close: 'Close',

  shoot_another: 'לחצו כאן לצילום סרטון נוסף',
  exit: 'לא, תודה. סיימנו לעכשיו',
  thank_you: 'תודה לכם על השתתפות בתחרות FLL Replay!',

  team_name: 'Team #%{number}',
  team_name_long: 'Team #%{number} - %{affiliation}',
  deadline: 'Submission Deadline: %{date}',
  datetime_formats: {
    short: 'MMM D, HH:mm',
    long: 'dddd, MMM D, HH:mm to %{endTime}',
    datespan: '%{date1} to %{date2}'
  },
  logout: 'Logout',
  language: 'Language',
  select_language: 'Select Language',
  help: 'Help',
  about: 'About',
  errors: {
    title: 'Oops, looks like something went wrong',
    failed_connect: 'Failed to connect to FIRST Servers',
    retry: 'Retry',
    close: 'Close'
  }
}
