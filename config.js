const config = {
  INSTRUCTIONS: {
    'FIRST LEGO League Challenge': [
      {
        text: 'התכוננו לתחילת המקצה',
        end: 'start',
        buttonText: 'התחלת הצילום'
      },
      { text: 'סרקו את כל סידור המגרש, כולל את אזור הבית', end: 'button' },
      { text: 'הראו את המנועים והחיישנים של הרובוט', end: 'button' },
      { text: 'הדגימו כיצד כל הציוד שלכם נכנס לגמרי לאזור הביקורת הקטן או הגדול', end: 'button' },
      {
        text: 'אם יש לכם דגם M01 של פרויקט החדשנות שלכם, הציגו אותו',
        end: 'button',
        buttonText: 'התחלת המקצה'
      },
      { text: 'אנחנו מתחילים בעוד', end: 'timer', time: 3 },
      {
        text: 'המקצה רץ, צלמו באופן יציב',
        end: 'timer',
        time: 150,
        sounds: {
          start: 'start',
          end: 'end',
          '30secs': 'end-game'
        }
      },
      {
        text: 'אל תגעו במגרש, עברו על המשימות וספרו לנו מה עשיתם',
        end: 'button',
        buttonText: 'סיימנו'
      }
    ]
  },
  auth: {
    issuer: 'https://login.firstisrael.org.il/connect',
    clientId: 'remotematches_prod',
    redirectUri: 'https://api.firstisrael.org.il/_private/auth/remote/auth'
  },
  apiBaseUrl: 'https://api.firstisrael.org.il/_private/auth/remote',
  programColors: {
    'FIRST LEGO League Discover': '#662D91',
    'FIRST LEGO League Explore': '#00A651',
    'FIRST LEGO League Challenge': '#ED1C24',
    'FIRST Tech Challenge': '#F57E25',
    'FIRST Robotics Competition': '#009CD7'
  },
  langs: [
    { locale: 'he', title: 'עברית' }
    // { locale: 'en', title: 'English' },
    // { locale: 'ar', title: 'عربى' }
  ],
  timezone: 'Asia/Jerusalem'
}

export default config
