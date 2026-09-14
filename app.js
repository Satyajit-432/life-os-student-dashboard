const defaultHabits = ['Review notes', 'Drink water', 'Practice coding'];
const saved = JSON.parse(localStorage.getItem('lifeOS') || 'null');
const state = saved || { tasks: [], studyMinutes: 0, habits: defaultHabits.map(text => ({ text, done: false })) };
state.habits = Array.isArray(state.habits) ? state.habits : defaultHabits.map(text => ({ text, done: false }));
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

function renderHabits() {
  const list = $('habitList');
  list.innerHTML = '';
  state.habits.forEach((habit, index) => {
    const row = document.createElement('label');
    row.className = 'habit';
    row.innerHTML = `<input type="checkbox" ${habit.done ? 'checked' : ''}><span></span>`;
    row.querySelector('span').textContent = habit.text;
    row.querySelector('input').addEventListener('change', () => { state.habits[index].done = !state.habits[index].done; save(); render(); });
    list.appendChild(row);
  });
}

function render() {
  renderTasks();
  renderHabits();
  $('studyMinutes').textContent = state.studyMinutes;
  $('tasksDone').textContent = state.tasks.filter(t => t.done).length;
  $('habitsDone').textContent = state.habits.filter(h => h.done).length;
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

$('exportData').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'life-os-backup.json';
  link.click();
  URL.revokeObjectURL(url);
});

$('importData').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.tasks) || !Array.isArray(imported.habits)) throw new Error('Invalid backup');
    state.tasks = imported.tasks;
    state.habits = imported.habits;
    state.studyMinutes = Number(imported.studyMinutes) || 0;
    save();
    render();
  } catch {
    alert('That file is not a valid Life OS backup.');
  }
  event.target.value = '';
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement.tagName !== 'INPUT') {
    event.preventDefault();
    $('taskInput').focus();
  }
  if (event.key.toLowerCase() === 'r' && document.activeElement.tagName !== 'INPUT') {
    $('resetTimer').click();
  }
});

updateClock();
setInterval(updateClock, 1000);
showTimer();
render();
