const config = {
  INSTRUCTIONS: {
    'FIRST LEGO League Challenge': [
      { text: "הצגיו את עצמכם (שם ומספר הקבוצה, מאיפה אתם, וכו'...", end: 'button' },
      { text: 'הציגו את הרובוט שלכם: האם יש לו שם?הראו את המנועים והחיישנים שלו.', end: 'button' },
      { text: 'עברו על המשימות אותן תרצו לבצע', end: 'button' },
      {
        text: 'עמדו בפינת המגרש ותהיו מוכנים להתחלת המקצה',
        end: 'button',
        buttonText: 'להתחיל את המקצה'
      },
      { text: 'אנחנו מתחילים בעוד', end: 'timer', time: 3 },
      {
        text: 'המקצה רץ. צלמו באופן יציב.',
        end: 'timer',
        time: 150,
        sounds: {
          start: 'start',
          end: 'end',
          '30secs': 'end-game'
        }
      },
      {
        text: 'אל תגעו במגרש! תעברו על המשימות וספרו לנו מה עשיתם.',
        end: 'button',
        buttonText: 'סיימנו'
      }
    ]
  },
  auth: {
    issuer: 'https://login.firstisrael.org.il/connect',
    clientId: 'remotematches_prod',
    redirectUri: 'https://api.firstisrael.org.il/_private/auth/remote/auth',
    logoutUri: 'https://login.firstisrael.org.il/connect/session/end'
  },
  apiBaseUrl: 'https://api.firstisrael.org.il/_private/auth/remote',
  programColors: {
    'FIRST LEGO League Discover': '#662D91',
    'FIRST LEGO League Explore': '#00A651',
    'FIRST LEGO League Challenge': '#ED1C24',
    'FIRST Tech Challenge': '#F57E25',
    'FIRST Robotics Competition': '#009CD7'
  },
  menu: {
    helpMailURL: 'mailto:flltech@firstisrael.org.il',
    infoURL: 'https://firstisrael.org.il/fll/challenge'
  },
  langs: [
    { locale: 'en', title: 'english' },
    { locale: 'he', title: 'עברית' },
    { locale: 'ar', title: 'عربى' }
  ]
}

export default config
