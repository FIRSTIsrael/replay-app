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
  pre_match: {
    title: 'Start %{match_name}',
    welcome_team: 'Team #%{number}, Welcome!',
    description:
      "Team #%{team}, we are glad you joined us for %{event}, we'll now record the %{match}. Choose your camera position and follow the full Robot Game Video Recording document on the resource library on FIRST website. Get ready for the starting of the match.",
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
  deadline: {
    date: 'Submission Deadline: %{date}',
    title: 'Submission window has closed',
    description: 'Sorry, the deadline for submitting %{stage} has passed.',
    close: 'Close'
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

  team_name: 'Team #%{number}',
  team_name_long: 'Team #%{number} - %{affiliation}',
  datetime_formats: {
    short: 'MMM D, HH:mm',
    long: 'dddd, MMM D, HH:mm to %{endTime}',
    datespan: '%{date1} to %{date2}'
  },
  menu: {
    logout: 'Logout',
    language: 'Language',
    select_language: 'Select Language',
    info: 'Info and Support'
  },
  errors: {
    title: 'Oops, looks like something went wrong',
    failed_connect: 'Failed to connect to FIRST Servers',
    retry: 'Retry',
    close: 'Close'
  },
  no_data: {
    title: 'Oops, No Data Found',
    teams: 'No teams found in your account',
    matches:
      'No matches found for the team at this event, please contact support for more information'
  },
  app_info: {
    app_version: 'Version %{version}',
    contact: {
      title: 'General Questions',
      description: 'Contact FIRST'
    },
    support: {
      title: 'Support',
      description: 'Contact the FIRST Support Team'
    },
    flltech: {
      title: 'Contact FIRST LEGO League Tech Team',
      description: 'Questions about the rulebook and robot game video recording'
    }
  }
}
