export const unixToDate = (unixDate) => {
  let parseDate = new Date(unixDate * 1000)
  let month = parseDate.toLocaleString('en-us', { month: 'long' });
  let date = month + " " + parseDate.getDate() + ", " + parseDate.getFullYear();

  return date;
}   

export const unixDateToTime = (unixDate) => {
  let date = new Date(unixDate * 1000)
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();

  return convert24HourTime(hours, minutes.substr(-2))
}

function convert24HourTime(hours, minutes) {
  if (hours > 12) {
    return (hours - 12) + ":" + minutes + " PM"
  } else {
    return hours + ":" + minutes + " AM"
  }
}

export const hoursToUnixTime = (hourString, selectedDate) => {
  let trimTime = hourString.replace(/ /g,'');
  let count = trimTime.length;
  let halfDay = trimTime.slice(-2).toLowerCase();
  let minutes = parseInt(trimTime.slice(count-4, count-2));
  let hours = convertHours(trimTime, count, halfDay);
  // let unixTime = (Date.parse(defaultDate()) /1000 ) + (hours * 3600) + ( minutes * 60);
  let unixTime = selectedDate + (hours * 3600) + ( minutes * 60);

  return unixTime;
}

function convertHours(trimTime, count, halfDay) {
  let hours = 0
  if (count === 6) {
    hours = parseInt(trimTime.slice(0,1));
    }
  else if (count === 7) {
    hours = parseInt(trimTime.slice(0,2));
  }
  if (halfDay === "pm") hours = hours + 12;

  return hours
}
