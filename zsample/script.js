const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months =[
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemebr",
    "December"
];


//a function to add days  
function initCalendar(){
    const firstDay = new Date(year, month, 1); 
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //sync date header: MM/YYYY
    date.innerHTML = months[month] + " " + year;


    //adding days inside the DOM
    let days = "";

    //previous month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
    }

    //current days
    for (let i = 1; i <= lastDate; i++){
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class="day today">${i}</div>`;
        }
        else{
            days += `<div class="day">${i}</div>`;
        }
    }

    //next month's days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;      
    }

    daysContainer.innerHTML = days;
}

initCalendar();


//previous months
function prevMonth(){
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//next months
function nextMonth(){
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//event listener for arrows

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);