import moment from 'moment'
import 'moment/locale/he'
import 'moment-timezone'

import i18n from './i18n'

export const formatDates = event => {
  const start = moment(event.start)
  const end = moment(event.end)

  const sameDay = start.isSame(end, 'day')
  if (sameDay) {
    const endTime = end.format('HH:mm')
    return start.format(i18n.t('datetime_formats.long', { endTime }))
  } else {
    const date1 = start.format(i18n.t('datetime_formats.short'))
    const date2 = end.format(i18n.t('datetime_formats.short'))
    return i18n.t('datetime_formats.datespan', { date1, date2 })
  }
}

export default moment
