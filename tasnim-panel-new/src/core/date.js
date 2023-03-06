import moment from 'moment'
import i18n from 'i18next'
import persianDate from 'persian-date'
persianDate.toLocale('en')

export function persianDateAndTime(myDate) {
    let currentDate = new Date(myDate)
    const dateString = currentDate.toLocaleDateString('en-US', {
        timeZone: 'Asia/Tehran',
        hour12: false,
    })
    const timeString = currentDate.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tehran',
        hour12: false,
    })
    let datePersian = new persianDate(new Date(dateString)).format('l')
    return {time: timeString, date: datePersian}
}
export function getDate(input) {
    let date = {
        normal: moment(input).format('DD.MM.YYYY'),
        monthNamed: input !== '' || input !== null ? moment(input).locale('fa').format('LL') : '',
        time: moment(input).format('HH:mm:ss'),
        relative: moment(input).fromNow(),
        year: input !== '' && input ? moment(input).format('YYYY') : '',
    }
    return date
}

export function getMonths() {
    moment.locale(i18n.language)
    return moment.months()
}
