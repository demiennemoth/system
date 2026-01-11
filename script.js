const actionsEl = document.getElementById("actions");
const logEl = document.getElementById("log");
const activityNameEl = document.getElementById("activity-name");
const activityLeftEl = document.getElementById("activity-left");
const activityBarEl = document.getElementById("activity-bar");

const ACTIONS = [
  { name: "Поесть", dur: 0.3, lines: ["Не получается.", "Больно.", "Теперь можно."] },
  { name: "Лечь на колени", dur: 0.5, lines: ["Ты тёплая.", "Можно полежать?"] },
  { name: "Лечь спать на подушку", dur: 1.0, lines: ["Я здесь.", "Я сторожу сон."] },
  { name: "Погладить", dur: 0.2, lines: ["Мне больно, но хорошо.", "Я помню руки."] }
];

let current = null;

function log(t) {
  const d = document.createElement("div");
  d.textContent = t;
  logEl.appendChild(d);
  logEl.scrollTop = logEl.scrollHeight;
}

function startAction(a) {
  if (current) return;
  current = { ...a, left: a.dur };
  activityNameEl.textContent = a.name;
  tick();
}

function tick() {
  if (!current) return;
  current.left -= 0.05;
  activityLeftEl.textContent = current.left.toFixed(2);
  activityBarEl.style.width = ((1 - current.left / current.dur) * 100) + "%";
  if (current.left <= 0) {
    log(current.lines[Math.floor(Math.random() * current.lines.length)]);
    current = null;
    activityNameEl.textContent = "—";
    activityLeftEl.textContent = "—";
    activityBarEl.style.width = "0%";
  } else setTimeout(tick, 500);
}

ACTIONS.forEach(a => {
  const b = document.createElement("button");
  b.textContent = a.name;
  b.onclick = () => startAction(a);
  actionsEl.appendChild(b);
});
