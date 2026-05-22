function isLoggedIn() {
  return localStorage.getItem("demo_logged_in") === "1";
}
function getUser() {
  const raw = localStorage.getItem("demo_user");
  return raw ? JSON.parse(raw) : null;
}
function setUser(user) {
  localStorage.setItem("demo_user", JSON.stringify(user));
}
function loginDemo(email, name) {
  localStorage.setItem("demo_logged_in", "1");
  setUser({ email: email || "demo@example.com", name: name || "Demo 使用者" });
}
function logoutDemo() {
  localStorage.removeItem("demo_logged_in");
  localStorage.removeItem("demo_user");
}

function getGoals() {
  const raw = localStorage.getItem("demo_goals");
  return raw ? JSON.parse(raw) : {
    goalType: "減脂",
    kcal: 1800,
    protein: 120,
    fat: 60,
    carbs: 200
  };
}
function setGoals(goals) {
  localStorage.setItem("demo_goals", JSON.stringify(goals));
}

function renderAuthUI() {
  const slot = document.querySelector("[data-auth-slot]");
  if (!slot) return;

  if (isLoggedIn()) {
    const u = getUser();
    slot.innerHTML = `
      <span class="badge ok">已登入</span>
      <span class="muted">${u?.name || "使用者"}（${u?.email || ""}）</span>
      <a class="btn" href="${resolveRootPath()}member.html">會員專區</a>
      <button class="btn" type="button" id="btnLogout">登出</button>
    `;
    slot.querySelector("#btnLogout").addEventListener("click", () => {
      logoutDemo();
      alert("已登出（示範）");
      location.href = resolveRootPath() + "index.html";
    });
  } else {
    slot.innerHTML = `
      <span class="badge warn">未登入</span>
      <a class="btn primary" href="${resolveRootPath()}login.html">登入</a>
      <a class="btn" href="${resolveRootPath()}register.html">註冊</a>
    `;
  }
}

// 根目錄相對路徑處理（讓子資料夾也能用同一支 JS）
function resolveRootPath(){
  // 若目前在 /food/ /log/ /advice/ 底下就回上一層
  const path = location.pathname;
  if (path.includes("/food/") || path.includes("/log/") || path.includes("/advice/")) return "../";
  return "./";
}

function setActiveByHref() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a[data-active]").forEach(a => {
    if (a.getAttribute("data-active") === current) {
      a.setAttribute("aria-current", "page");
    }
  });
}

function requireLoginHere() {
  if (!isLoggedIn()) {
    alert("此頁需登入（示範），將導向登入頁。");
    location.href = resolveRootPath() + "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveByHref();
  renderAuthUI();
});