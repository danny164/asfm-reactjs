import moment from 'moment';
import 'moment/locale/vi';

export const dateToFromNowDaily = (date) => {
    const convertDate = moment.unix(date);

    return moment(convertDate).calendar(null, {
        lastDay: '[Hôm qua,] HH:mm',
        sameDay: '[Hôm nay,] HH:mm',
        nextDay: '[Ngày mai,] HH:mm',
        lastWeek: 'HH:mm, DD/MM/YYYY',
        nextWeek: 'HH:mm, DD/MM/YYYY',
        sameElse: function () {
            return 'HH:mm, DD/MM/YYYY';
        },
    });
};
