export default {
  loading: 'טוען...',
  welcome: {
    headline: 'ברוכים הבאים לאפליקציית Remote Matches של FIRST ישראל!',
    intro: 'אנחנו כבר לא יכולים לחכות לראות את הדברים עליהם עבדתם בעונה זו!'
  },
  login: 'התחברות',
  hello_user: 'שלום, %{name}!',
  select_team: 'בחרו קבוצה',
  match_status: {
    UNSUBMITTED: 'לא הוגש',
    SUBMITTED: 'הוגש'
  },
  team_page: {
    open_remote_event_hub: {
      title: 'FIRST Remote Event Hub',
      description: 'התחברות למערכת התחרות'
    },
    report_concern: 'דיווח על תקרית',
    judging_complaint: 'דיווח על מקרה חריג בחדר השיפוט'
  },
  pre_match: {
    title: 'צילום %{match_name}',
    welcome_team: 'קבוצת #%{number}, ברוכים הבאים!',
    description:
      'קבוצת #%{team}, אנו שמחים מאוד שהצטרפתם אלינו ל%{event}! מקמו את הטלפון כך שיהיה בזיוות המתאימה לצילום הזירה ועקבו אחר הנחיות הצילום המלאות המופיעות במפת המשאבים באתר FIRST. התכוננו לתחילת המקצה.',
    start: 'אנחנו מוכנים',
    exit: 'לא כרגע, יציאה'
  },
  overwrite_warning: {
    title: '%{match} כבר הוגש',
    description:
      'אתם עומדים למחוק את המקצה הקיים במערכת ולהעלות מקצה חדש במקום. האם אתם בטוחים שאתם רוצים להמשיך?',
    overwrite: 'הגשה מחדש',
    cancel: 'ביטול'
  },
  deadline: {
    date: 'מועד אחרון להגשה: %{date}',
    title: 'חלון ההגשה נסגר',
    description: 'מצטערים, המועד האחרון להגשת %{stage} עבר.',
    close: 'סגירה'
  },
  rotate_phone: {
    title: 'אנא הפכו את המסך למצב מאוזן',
    helper_android: 'ודאו כי אפשרות הסיבוב האוטומטית מופעלת במכשירכם.',
    helper_ios: 'ודאו כי אפשרות ״נעילת התצוגה לאורך״ כבויה במרכז הבקרה.'
  },
  permissions: {
    permission_required: 'נדרשת גישה',
    settings: 'הגדרות',
    cam_access_android:
      'כדי לצלם את המשחק, יש לאפשר ל-FIRST גישה למצלמה. הקשו על הגדרות > הרשאות, והפעילו את המצלמה.',
    cam_access_ios:
      'כדי לצלם את המשחק, יש לאפשר ל-FIRST גישה למצלמה. הקשו על הגדרות, והפעילו את המצלמה.',
    mic_access_android:
      'כדי לצלם את המשחק, יש לאפשר ל-FIRST גישה למיקרופון. הקשו על הגדרות > הרשאות, והפעילו את המיקרופון.',
    mic_access_ios:
      'כדי לצלם את המשחק, יש לאפשר ל-FIRST גישה למיקרופון. הקשו על הגדרות, והפעילו את המיקרופון.',
    storage_access_android:
      'כדי לצלם את המשחק, יש לאפשר ל-FIRST גישה לשמירת מדיה במכשיר. הקשו על הגדרות > הרשאות, והפעילו את האחסון.',
    storage_access_ios:
      'כדי לצלם את המשחק, יש לאפשר ל-FIRST גישה לשמירת מדיה במכשיר. הקשו על הגדרות, והפעילו את התמונות.'
  },
  processing: {
    title: 'רק רגע',
    wait_processing:
      'אנא המתינו בזמן שאנו מעבדים את הסרטון. יתכן וזה יקח מספר שניות, אל תסגרו את האפליקציה.',
    wait_uploading:
      'אנא המתינו בזמן שאנו מעבדים את הסרטון ומעלים אותו לשרתי FIRST. יתכן וזה יקח מספר דקות, אל תסגרו את האפליקציה.'
  },
  post_match: {
    title: '%{match} נשלח בהצלחה!'
  },
  start: 'התחלה',
  next: 'לשלב הבא',
  close: 'סגירה',
  cancel: 'ביטול',

  team_name: 'קבוצת #%{number}',
  team_name_long: 'קבוצת #%{number} - %{affiliation}',
  datetime_formats: {
    short: 'D בMMM בשעה HH:mm',
    long: 'יום dd׳, D בMMMM, בשעה HH:mm עד %{endTime}',
    datespan: '%{date1} עד ה־%{date2}'
  },
  menu: {
    logout: 'יציאה',
    language: 'שפה',
    select_language: 'בחרו שפה',
    info: 'מידע ותמיכה'
  },
  errors: {
    title: 'משהו לא מסתדר לנו',
    failed_connect: 'החיבור לשרתי FIRST נכשל',
    retry: 'נסו שנית',
    close: 'סגירה'
  },
  no_data: {
    title: 'אופס, אין נתונים',
    teams: 'לא נמצאו קבוצות בחשבונך',
    matches: 'לא נמצאו מקצים עבור הקבוצה באירוע זה, פנו לתמיכה למידע נוסף'
  },
  app_info: {
    app_version: 'גרסה %{version}',
    open_remote_event_hub: {
      title: 'FIRST Remote Event Hub',
      description: 'התחברות למערכת התחרויות'
    },
    contact: {
      title: 'שאלות כלליות',
      description: 'פנייה לצוות FIRST'
    },
    support: {
      title: 'תמיכה טכנית',
      description: 'פנייה לצוות התמיכה של FIRST'
    },
    flltech: {
      title: 'פנייה לצוות הטכני של FIRST LEGO League',
      description: 'שאלות לגבי החוקים וצילום המקצים'
    }
  }
}
