const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
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
function initCalendar() {
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
    for (let i = 1; i <= lastDate; i++) {
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class="day today active">${i}</div>`;
        } else {
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
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//next months
function nextMonth() {
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



todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener('keypress', (e) => {
    //only number inputs are allowed
    dateInput.value = dateInput.value.replace(/[^0-9\/]/g, "");
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 2 && dateInput.value.charAt(1) === '/') {
            // If backspace is hit at the slash, remove the slash
            dateInput.value = dateInput.value.slice(0, 1);
        }
    }

    
    if (dateInput.value.length === 2 && !dateInput.value.includes("/")) {
        dateInput.value = dateInput.value + "/";
        // Move the cursor to the end of the input field
        dateInput.setSelectionRange(dateInput.value.length, dateInput.value.length);
    }
    
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
});

gotoBtn.addEventListener("click",()=>{
    gotoDate();
    clearInput();
});

function clearInput() {
    document.getElementById('inputDate').value = '';
}

function gotoDate(){
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
        alert("Invalid Date!");
    }
}


const   addTaskBtn = document.querySelector(".add-task"),
        addTaskContainer = document.querySelector(".add-task-wrapper"),
        addTaskCloseBtn = document.querySelector(".close"),
        addTaskName = document.querySelector(".task-name"),
        addTaskFrom = document.querySelector(".task-time-from"),
        addTaskTo = document.querySelector(".task-time-to");

addTaskBtn.addEventListener("click", () => {
    addTaskContainer.classList.toggle("active");
});
addTaskCloseBtn.addEventListener("click", () => {
    addTaskContainer.classList.remove("active");
});
document.addEventListener("click" , (e) => {
    if(e.target !== addTaskBtn && !addTaskContainer.contains(e.target)) {
        addTaskContainer.classList.remove("active");
    }
});

//50 characters only on title

addTaskName.addEventListener("input", (e) => {
    addTaskName.value = addTaskName.value.slice(0, 50);
});

addTaskFrom.addEventListener("input", (e) => {
    addTaskFrom.value = addTaskFrom.value.replace(/[^0-9:]/g, "");
    if (addTaskFrom.value.length == 2) {
        addTaskFrom.value += ":";
    }
    if (addTaskFrom.value.length > 5) {
        addTaskFrom.value = addTaskFrom.value.slice(0, 5);
    }
});