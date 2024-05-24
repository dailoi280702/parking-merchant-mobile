import dayjs from "dayjs";

const DateTimeHelper = {
  formatDate: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
  formatTime: (time: Date) => dayjs(time).format("HH:mm"),
  getRoundUpDate: (minutes: number, d = new Date()) => {
    const ms = 1000 * 60 * minutes;
    const roundedDate = new Date(Math.ceil(d.getTime() / ms) * ms);
    return roundedDate;
  },
  convertToHour: (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hour = minutes / 60;
    return hour > 1 ? `${hour} hours` : `${hour} hour`;
  },
  convertToHourMinute: (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

    let hoursText;
    let minutesText;

    if (hours === 0) {
      hoursText = "";
    } else if (hours === 1) {
      hoursText = `${hours} hour`;
    } else {
      hoursText = `${hours} hours`;
    }

    if (remainingMinutes === 0) {
      minutesText = "";
    } else if (remainingMinutes === 1) {
      minutesText = `${formattedMinutes} minute`;
    } else {
      minutesText = `${formattedMinutes} minutes`;
    }

    const timeComponents = [hoursText, minutesText].filter(Boolean).join(" ");

    return timeComponents.trim();
  },
};

export default DateTimeHelper;
