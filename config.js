export const INSTRUCTIONS = [
  { text: 'הצגיו את עצמכם (שם ומספר הקבוצה, מאיפה אתם, וכו\'...', end: 'button' },
  { text: 'הציגו את הרובוט שלכם: האם יש לו שם?הראו את המנועים והחיישנים שלו.', end: 'button' },
  { text: 'עברו על המשימות אותן תרצו לבצע', end: 'button' },
  { text: 'עמדו בפינת המגרש ותהיו מוכנים להתחלת המקצה', end: 'button', buttonText: 'להתחיל את המקצה' },
  { text: 'אנחנו מתחילים בעוד', end: 'timer', time: 3 },
  { text: 'המקצה רץ. צלמו באופן יציב.', end: 'timer', time: 150,
  	sounds: {
	  	start: 'start',
	  	end :'end',
	  	'30secs': 'end-game'
	  }
  },
  { text: 'אל תגעו במגרש! תעברו על המשימות וספרו לנו מה עשיתם.', end: 'button', buttonText: 'סיימנו' }
]

export const TEAM_JSON = {
	REQUIRED_FIELDS: ['team', 'upload-url']
}