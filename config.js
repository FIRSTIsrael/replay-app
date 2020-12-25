export const INSTRUCTIONS = [
  { text: 'הצגיו את עצמכם (שם ומספר הקבוצה, מאיפה אתם, וכו\'...', end: 'button' },
  { text: 'הציגו את הרובוט שלכם: האם יש לו שם?הראו את המנועים והחיישנים שלו.', end: 'button' },
  { text: 'עברו על המשימות אותן תרצו לבצע', end: 'button' },
  { text: 'עמדו בפינת המגרש ותהיו מוכנים להתחלת המקצה', end: 'button', buttonText: 'להתחיל את המקצה' },
  { text: 'המקצה רץ. צלמו באופן יציב.', end: 'timer', time: 50, countdown: 3 },
  { text: 'אל תגעו במגרש! תעברו על המשימות וספרו לנו מה עשיתם.', end: 'button', buttonText: 'סיימנו' }
]

export const HEB = {
	UPLOADING: 'מעלה את הסרטון שלכם עכשיו. זה יכול לקחת מעט זמן.',
	LOADING: 'טוען...',

	WELCOME: 'ברוכים הבאים לתחרות FLL Replay!',
	LOGIN: 'כניסה',

	QR: 'סרקו את קוד ה-QR שלכם',
	
	PRE_INST: 'שלום קבוצה',
	START: 'בואו נתחיל',
	NOT_US: 'זה לא אנחנו',
	FLIP: 'בבקשה הפכו את המסך למצב מאוזן',

	NEXT: 'לשלב הבא',

	SHOOT_ANOTHER: 'לחצו כאן לצילום סרטון נוסף',
	THANK_YOU: 'תודה לכם על השתתפות בתחרות FLL Replay!'
}

export const TEAM_JSON = {
	REQUIRED_FIELDS: ['team', 'upload-url']
}