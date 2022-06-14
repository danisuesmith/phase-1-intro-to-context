// // Employees always check in and check out.
// Employees always check in and out on the hour.
// The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world.
// When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300".
// Employees will never work across days, e.g., in at 2200 and out at 0400 the next day.

function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  // converts each nested array into an employee record and turns into a new array
  return employees.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, event) {
  let [date, hour] = event.split(" ");
  let eventObj = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  };
  employee.timeInEvents.push(eventObj);
  return employee;
}

function createTimeOutEvent(employee, event) {
  let [date, hour] = event.split(" ");
  let eventObj = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  };
  employee.timeOutEvents.push(eventObj);
  return employee;
}

function hoursWorkedOnDate(date) {
  return (date.timeOutEvents[0].hour - date.timeInEvents[0].hour) / 100;
}

function wagesEarnedOnDate(date) {
  return date.payPerHour * hoursWorkedOnDate(date);
}

function allWagesFor(employee, date) {
  const payableDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  return payableDates;
}

function calculatePayroll(employeeRecords) {
  return employeeRecords
    .map((employee) => allWagesFor.call(employee))
    .reduce((currentValue, total) => currentValue + total);
}
