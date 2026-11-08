//Calendar
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
console.log(year, month);

const daysInMonth = new Date(year, month + 1, 0).getDate();

const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
console.log(daysInMonth, firstDay);
const daysContainer = document.querySelector(".days");

for (let i = 0; i < firstDay; i++) {
  const item = document.createElement("span");
  daysContainer.append(item);
}
for (let i = 1; i <= daysInMonth; i++) {
  const number = document.createElement("span");
  number.textContent = i;
  if (i === currentDate.getDate()) {
    number.classList.add("today");
  }
  daysContainer.append(number);
}

const nameMonth = document.querySelector(".calendar-header h2");
nameMonth.textContent = `${currentDate.toLocaleDateString("en-US", { month: "long" })} ${year}`;

//Timer
const timeEl = document.querySelector(".time");
const startBtn = document.querySelector(".start-btn");
const startSeconds = 1500;
let remaining = startSeconds;
let intervalId = null;
const ringEl = document.querySelector(".timer-ring");

function updateDisplay() {
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  timeEl.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  const percent = ((startSeconds - remaining) / startSeconds) * 100;
  ringEl.style.setProperty("--progress", `${percent}%`);
}
updateDisplay();

startBtn.addEventListener("click", () => {
  if (intervalId === null) {
    if (remaining <= 0) {
      remaining = startSeconds;
      updateDisplay();
    }
    intervalId = setInterval(() => {
      remaining--;
      updateDisplay();
      if (remaining === 0) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
    intervalId = null;
  }
});
