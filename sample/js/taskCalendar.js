const app = document.getElementById('app');
const calendar = document.getElementById('calendar');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentMonthDisplay = document.getElementById('currentMonth');

let currentDate = new Date();

function createCalendar() {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // clear the previous calendar.
  calendar.innerHTML = '';

  // display the current month.
  currentMonthDisplay.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // display days
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('text-gray-400');
    calendar.appendChild(emptyDay);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    day.classList.add('text-center', 'h-20', 'p-2', 'bg-white', 'rounded', 'cursor-pointer', 'hover:bg-blue-200');
    calendar.appendChild(day);

    // need to add function to display current task display of the clicked day
    // Event: click to view task on this day
    day.addEventListener('click', () => {
      console.log(`Clicked on ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`);
    });
  }
}

createCalendar();

// Event listeners for changing months
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  createCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  createCalendar();
});
