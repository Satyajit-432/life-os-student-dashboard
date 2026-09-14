const state = JSON.parse(localStorage.getItem('lifeOS') || '{"tasks":[],"studyMinutes":0,"habitStreak":0}');
let seconds = 25 * 60;
let timerId = null;

const $ = (id) => document.getElementById(id);

function save() {
  localStorage.setItem('lifeOS', JSON.stringify(state));
}

function renderTasks() {
  const list = $('taskList');
  list.innerHTML = '';
  state.tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = `task${task.done ? ' done' : ''}`;
    item.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''} aria-label="Mark task complete"><span></span><button type="button" aria-label="Delete task">Delete</button>`;
    item.querySelector('span').textContent = task.text;
    item.querySelector('input').addEventListener('change', () => { task.done = !task.done; save(); render(); });
    item.querySelector('button').addEventListener('click', () => { state.tasks.splice(index, 1); save(); render(); });
    list.appendChild(item);
  });
}

function render() {
  renderTasks();
  $('studyMinutes').textContent = state.studyMinutes;
  $('tasksDone').textContent = state.tasks.filter(t => t.done).length;
  $('habitStreak').textContent = state.habitStreak;
}

function updateClock() {
  const now = new Date();
  $('today').textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  $('clock').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showTimer() {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  $('timer').textContent = `${mins}:${secs}`;
}

$('taskForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const text = $('taskInput').value.trim();
  if (!text) return;
  state.tasks.push({ text, done: false });
  $('taskInput').value = '';
  save();
  render();
});

$('clearDone').addEventListener('click', () => {
  state.tasks = state.tasks.filter(task => !task.done);
  save();
  render();
});

$('startTimer').addEventListener('click', () => {
  if (timerId) return;
  $('startTimer').textContent = 'Running…';
  timerId = setInterval(() => {
    seconds -= 1;
    showTimer();
    if (seconds <= 0) {
      clearInterval(timerId);
      timerId = null;
      seconds = 25 * 60;
      state.studyMinutes += 25;
      save();
      render();
      $('startTimer').textContent = 'Start';
      showTimer();
    }
  }, 1000);
});

$('resetTimer').addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  seconds = 25 * 60;
  $('startTimer').textContent = 'Start';
  showTimer();
});

updateClock();
setInterval(updateClock, 1000);
showTimer();
render();
