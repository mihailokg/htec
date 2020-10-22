export function formatDate(publishedAt) {
  // publishedAt
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  let dateStr = publishedAt || '';
  let date = dateStr;
  if (dateStr)
  {
    date = new Date(dateStr); // date.replace(/T/ig, ' ');
    date = days[date.getDay()] + ' ' + (date.getMonth() - 1 + 2) + '/' + date.getDate() + '/' + date.getFullYear() + ' | ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()); //Current Date
  }

  return date;
}

export function capitalizeFirst(str) {
  return (str.toLowerCase()).charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAllWords(str) {
  return (str.toLowerCase()).replace(/\b\w/g, function (l) {
    return l.toUpperCase();
  });
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 10000) + 1;
}