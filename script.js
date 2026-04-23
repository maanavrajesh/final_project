const STORAGE_KEYS = {
  profile: "trippyProfile",
  trip: "trippyTrip",
  filters: "trippyFilters",
  selections: "trippySelections",
  chat: "trippyChat",
  mode: "trippyTransportMode"
};

const SEEDED_MATCHES = [
  {
    id: "m1",
    name: "Prof Q",
    school: "Carnegie Mellon",
    year: "Graduate",
    gender: "Woman",
    visibility: "School",
    travelMode: "Uber",
    vibe: "efficient, no detours",
    instagram: "@profq",
    bio: "Heading out after office hours. Splitting an Uber if anyone is going the same direction.",
    destination: "Downtown"
  },
  {
    id: "m2",
    name: "Prof N",
    school: "Carnegie Mellon",
    year: "Graduate",
    gender: "Woman",
    visibility: "School",
    travelMode: "Flexible",
    vibe: "calm, coordinated",
    instagram: "@profn",
    bio: "Open to ride share or bus depending on who is heading the same way after class.",
    destination: "North Campus"
  },
  {
    id: "m3",
    name: "Jorge",
    school: "Carnegie Mellon",
    year: "Graduate",
    gender: "Man",
    visibility: "School",
    travelMode: "Bus",
    vibe: "easygoing",
    instagram: "@jorge.ta",
    bio: "Taking the bus after section. Happy to coordinate with students heading the same direction.",
    destination: "West Side"
  },
  {
    id: "m4",
    name: "Yari",
    school: "Carnegie Mellon",
    year: "Senior",
    gender: "Woman",
    visibility: "Everyone",
    travelMode: "Lyft",
    vibe: "talkative, friendly",
    instagram: "@yari.ta",
    bio: "Splitting a Lyft after TA hours. Always down to coordinate with classmates.",
    destination: "Downtown"
  },
  {
    id: "m5",
    name: "Tommy",
    school: "Carnegie Mellon",
    year: "Junior",
    gender: "Man",
    visibility: "Everyone",
    travelMode: "Flexible",
    vibe: "chill, flexible",
    instagram: "@tommy.trippy",
    bio: "Open to walking or ride share depending on the group. Easy to coordinate with.",
    destination: "North Campus"
  },
  {
    id: "m6",
    name: "Maanav",
    school: "Carnegie Mellon",
    year: "Junior",
    gender: "Man",
    visibility: "School",
    travelMode: "Uber",
    vibe: "fast split",
    instagram: "@maanav.r",
    bio: "Splitting an Uber after late class. Happy to add one or two more if heading the same way.",
    destination: "Downtown"
  },
  {
    id: "m7",
    name: "Jorden",
    school: "Carnegie Mellon",
    year: "Junior",
    gender: "Non-binary",
    visibility: "School",
    travelMode: "Walk",
    vibe: "quiet walk",
    instagram: "@jorden.ux",
    bio: "Prefers a calm walk with a small group. Leaving after studio, no rush.",
    destination: "West Side"
  },
  {
    id: "m8",
    name: "Yash",
    school: "Carnegie Mellon",
    year: "Sophomore",
    gender: "Man",
    visibility: "Everyone",
    travelMode: "Bus",
    vibe: "music and bus",
    instagram: "@yash.trippy",
    bio: "Bus all the way. Looking for classmates heading the same direction.",
    destination: "North Campus"
  }
];

const DEFAULT_PROFILE = {
  name: "Demo Student",
  schoolId: "A1024",
  school: "Purdue",
  year: "Junior",
  gender: "Prefer not to say",
  instagram: "@trippy.demo",
  visibility: "Everyone",
  travelMode: "Flexible",
  matchPreference: "Any",
  vibe: "calm, safe, coordinated",
  bio: "Looking for a reliable group to get home with after late classes and events."
};

const DEFAULT_TRIP = {
  origin: "Memorial Mall",
  destination: "North Campus",
  leaveIn: "10 minutes",
  visibility: "Everyone",
  travelMode: "Flexible",
  groupSize: "4",
  notes: "Open to walking if the group is close, otherwise ride split."
};

const DEFAULT_FILTERS = {
  visibility: "All",
  travelMode: "All",
  year: "All",
  gender: "All",
  keyword: ""
};

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "dashboard", label: "Demo", href: "dashboard.html" },
  { key: "about", label: "Problem", href: "about.html" },
  { key: "strategy", label: "Strategy", href: "strategy.html" },
  { key: "impact", label: "Impact", href: "impact.html" },
  { key: "team", label: "Team", href: "team.html" }
];

function getStored(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeedState() {
  if (!localStorage.getItem(STORAGE_KEYS.profile)) {
    setStored(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  }
  if (!localStorage.getItem(STORAGE_KEYS.trip)) {
    setStored(STORAGE_KEYS.trip, DEFAULT_TRIP);
  }
  if (!localStorage.getItem(STORAGE_KEYS.filters)) {
    setStored(STORAGE_KEYS.filters, DEFAULT_FILTERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.selections)) {
    setStored(STORAGE_KEYS.selections, [SEEDED_MATCHES[0].id, SEEDED_MATCHES[3].id, SEEDED_MATCHES[6].id]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.chat)) {
    setStored(STORAGE_KEYS.chat, [
      { author: "Ava", text: "Can leave in 10. North Campus works for me, heading past the engineering quad.", self: false },
      { author: "Demo Student", text: "I am near Memorial Mall now. Walk or split an Uber, either works.", self: true },
      { author: "Eli", text: "I am coming from the conference center so slightly different direction. Happy to meet at the corner.", self: false },
      { author: "Ava", text: "Corner of State and Grant? Easy to find.", self: false },
      { author: "Demo Student", text: "That works. See you in 10.", self: true }
    ]);
  }
}

function setupNav() {
  const page = document.body.dataset.page || "home";
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  nav.innerHTML = [
    ...NAV_ITEMS.map((item) => (
      `<a href="${item.href}" ${item.key === page ? 'aria-current="page"' : ""}>${item.label}</a>`
    ))
  ].join("");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function summaryItem(label, value) {
  return `<div class="summary-item"><span>${label}</span><strong>${value || "Not set"}</strong></div>`;
}

function renderProfileSummary() {
  const nameEl = document.getElementById("profile-name");
  const summaryEl = document.getElementById("profile-summary");
  if (!summaryEl) return;
  const profile = getStored(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  if (nameEl) nameEl.textContent = profile.name || "Student profile";
  summaryEl.innerHTML = [
    summaryItem("School", profile.school),
    summaryItem("Year", profile.year),
    summaryItem("Visibility", profile.visibility),
    summaryItem("Travel mode", profile.travelMode),
    summaryItem("Instagram", profile.instagram || "Not linked"),
    summaryItem("Vibe", profile.vibe)
  ].join("");
}

function renderTripSummary() {
  const tripEl = document.getElementById("active-trip-summary");
  if (!tripEl) return;
  const trip = getStored(STORAGE_KEYS.trip, DEFAULT_TRIP);
  tripEl.innerHTML = [
    summaryItem("Origin", trip.origin),
    summaryItem("Destination", trip.destination),
    summaryItem("Leave in", trip.leaveIn),
    summaryItem("Visibility", trip.visibility),
    summaryItem("Mode", trip.travelMode),
    summaryItem("Group size", trip.groupSize)
  ].join("");
}

function populateForm(form, data) {
  if (!form) return;
  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) field.value = value;
  });
}

function setupSignup() {
  const form = document.getElementById("signup-form");
  if (!form) return;
  populateForm(form, getStored(STORAGE_KEYS.profile, DEFAULT_PROFILE));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    setStored(STORAGE_KEYS.profile, data);
    window.location.href = "dashboard.html";
  });
}

function setupDashboard() {
  const tripForm = document.getElementById("trip-form");
  const demoButton = document.getElementById("demo-trip-fill");
  if (!tripForm) return;
  populateForm(tripForm, getStored(STORAGE_KEYS.trip, DEFAULT_TRIP));
  renderProfileSummary();
  renderTripSummary();

  tripForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const trip = Object.fromEntries(new FormData(tripForm).entries());
    setStored(STORAGE_KEYS.trip, trip);
    window.location.href = "matches.html";
  });

  demoButton?.addEventListener("click", () => {
    populateForm(tripForm, DEFAULT_TRIP);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function filteredMatches() {
  const profile = getStored(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const trip = getStored(STORAGE_KEYS.trip, DEFAULT_TRIP);
  const filters = getStored(STORAGE_KEYS.filters, DEFAULT_FILTERS);

  return SEEDED_MATCHES.filter((match) => {
    if (filters.visibility !== "All" && match.visibility !== filters.visibility) return false;
    if (filters.travelMode !== "All" && match.travelMode !== filters.travelMode) return false;
    if (filters.year !== "All" && match.year !== filters.year) return false;
    if (filters.gender !== "All" && match.gender !== filters.gender) return false;
    if (filters.keyword) {
      const haystack = `${match.vibe} ${match.bio} ${match.destination}`.toLowerCase();
      if (!haystack.includes(filters.keyword.toLowerCase())) return false;
    }
    if (trip.visibility === "Friends" && match.visibility !== "Friends") return false;
    if (trip.visibility === "School" && match.school !== profile.school) return false;
    if (trip.travelMode !== "Flexible" && match.travelMode !== trip.travelMode && match.travelMode !== "Flexible") return false;
    return true;
  });
}

function renderMatches() {
  const list = document.getElementById("matches-list");
  const banner = document.getElementById("request-banner");
  if (!list || !banner) return;
  const trip = getStored(STORAGE_KEYS.trip, DEFAULT_TRIP);
  const profile = getStored(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const selections = getStored(STORAGE_KEYS.selections, []);
  const matches = filteredMatches();

  banner.innerHTML = `
    <strong>${escapeHtml(profile.name)}</strong> is leaving <strong>${escapeHtml(trip.origin)}</strong>
    for <strong>${escapeHtml(trip.destination)}</strong> in <strong>${escapeHtml(trip.leaveIn)}</strong>
    with visibility set to <strong>${escapeHtml(trip.visibility)}</strong>.
  `;

  if (!matches.length) {
    list.innerHTML = `<div class="match-card"><p>No matches fit the current request and filters. Adjust the request or reset filters.</p></div>`;
    return;
  }

  list.innerHTML = matches.map((match) => {
    const checked = selections.includes(match.id) ? "checked" : "";
    return `
      <article class="match-card">
        <div class="match-top">
          <div>
            <h3 class="match-name">${escapeHtml(match.name)}</h3>
            <div class="match-meta">${escapeHtml(match.year)} · ${escapeHtml(match.school)} · ${escapeHtml(match.instagram)}</div>
          </div>
          <label class="tag match-select">
            <input type="checkbox" data-match-id="${escapeHtml(match.id)}" ${checked}>
            Select
          </label>
        </div>
        <div class="match-tag-row">
          <span class="tag">${escapeHtml(match.gender)}</span>
          <span class="tag">${escapeHtml(match.travelMode)}</span>
          <span class="tag">${escapeHtml(match.visibility)}</span>
          <span class="tag">${escapeHtml(match.destination)}</span>
        </div>
        <p>${escapeHtml(match.bio)}</p>
        <div class="match-meta">Vibe: ${escapeHtml(match.vibe)}</div>
      </article>
    `;
  }).join("");

  list.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selected = new Set(getStored(STORAGE_KEYS.selections, []));
      const id = checkbox.dataset.matchId;
      if (checkbox.checked) {
        selected.add(id);
      } else {
        selected.delete(id);
      }
      setStored(STORAGE_KEYS.selections, Array.from(selected));
    });
  });
}

function setupMatches() {
  const form = document.getElementById("filters-form");
  const reset = document.getElementById("reset-filters");
  const start = document.getElementById("start-trip-button");
  if (!form) return;
  populateForm(form, getStored(STORAGE_KEYS.filters, DEFAULT_FILTERS));
  renderMatches();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const filters = Object.fromEntries(new FormData(form).entries());
    setStored(STORAGE_KEYS.filters, filters);
    renderMatches();
  });

  reset?.addEventListener("click", () => {
    setStored(STORAGE_KEYS.filters, DEFAULT_FILTERS);
    populateForm(form, DEFAULT_FILTERS);
    renderMatches();
  });

  start?.addEventListener("click", () => {
    window.location.href = "trip.html";
  });
}

function renderTripGroup() {
  const group = document.getElementById("trip-group");
  if (!group) return;
  const profile = getStored(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const selections = getStored(STORAGE_KEYS.selections, []);
  const selectedMatches = SEEDED_MATCHES.filter((match) => selections.includes(match.id));
  const people = [{ ...profile, destination: getStored(STORAGE_KEYS.trip, DEFAULT_TRIP).destination }].concat(selectedMatches);

  group.innerHTML = people.map((person) => {
    const initials = (person.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    return `
      <div class="group-member">
        <div class="group-member-avatar">${escapeHtml(initials)}</div>
        <div class="group-member-info">
          <strong>${escapeHtml(person.name)}</strong>
          <span>${escapeHtml(person.school || "Verified school user")} · ${escapeHtml(person.destination || "")}</span>
        </div>
      </div>
    `;
  }).join("");
}

function renderTransportState() {
  const mode = getStored(STORAGE_KEYS.mode, "Not selected");
  const status = document.getElementById("transport-status");
  const detail = document.getElementById("transport-detail");
  if (status) status.textContent = `Mode: ${mode}`;
  if (!detail) return;

  const messages = {
    Uber: "Prototype next step: launch a ride split flow and confirm pickup inside the private room.",
    Lyft: "Prototype next step: generate a shared Lyft option and split the fare with the selected group.",
    Bus: "Prototype next step: surface the nearest route and let the room coordinate which stop to meet at.",
    Walk: "Prototype next step: set a meeting point and keep the group together with in-room coordination.",
    "Not selected": "Choose a transport option to see the next-step behavior for this trip."
  };

  detail.textContent = messages[mode] || messages["Not selected"];
  document.querySelectorAll(".transport-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

function renderChat() {
  const log = document.getElementById("chat-log");
  if (!log) return;
  const chat = getStored(STORAGE_KEYS.chat, []);
  log.innerHTML = chat.map((message) => `
    <div class="chat-message ${message.self ? "self" : ""}">
      <span class="chat-author">${escapeHtml(message.author)}</span>
      <div class="chat-bubble">${escapeHtml(message.text)}</div>
    </div>
  `).join("");
  log.scrollTop = log.scrollHeight;
}

function setupTrip() {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  if (!chatForm) return;
  renderTripGroup();
  renderTransportState();
  renderChat();

  document.querySelectorAll(".transport-button").forEach((button) => {
    button.addEventListener("click", () => {
      setStored(STORAGE_KEYS.mode, button.dataset.mode);
      renderTransportState();
    });
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    const profile = getStored(STORAGE_KEYS.profile, DEFAULT_PROFILE);
    const chat = getStored(STORAGE_KEYS.chat, []);
    chat.push({ author: profile.name, text, self: true });
    setStored(STORAGE_KEYS.chat, chat);
    chatInput.value = "";
    renderChat();
  });
}

function initCityMap() {
  const map = document.getElementById("city-map");
  if (!map) return;

  const tooltip  = document.getElementById("map-tooltip");
  const ttName   = document.getElementById("tt-name");
  const ttDest   = document.getElementById("tt-dest");
  const ttLeaving= document.getElementById("tt-leaving");
  const ttMode   = document.getElementById("tt-mode");
  const container= map.closest(".hero-map");

  const people = [
    { name: "Prof Q",  dest: "Downtown",     leaving: "Leaving in 30 min", mode: "Uber"     },
    { name: "Prof N",  dest: "Oakland",      leaving: "Leaving in 10 min", mode: "Flexible"  },
    { name: "Jorge",   dest: "CMU",          leaving: "Leaving now",       mode: "Walk"      },
    { name: "Yari",    dest: "Shadyside",    leaving: "Leaving in 20 min", mode: "Lyft"      },
    { name: "Tommy",   dest: "Oakland",      leaving: "Leaving in 10 min", mode: "Walk"      },
    { name: "Maanav",  dest: "Downtown",     leaving: "Leaving now",       mode: "Uber"      },
    { name: "Jorden",  dest: "Shadyside",    leaving: "Leaving in 20 min", mode: "Bus"       },
    { name: "Yash",    dest: "North Campus", leaving: "Leaving now",       mode: "Bus"       },
  ];

  document.querySelectorAll(".map-dot").forEach(dot => {
    dot.addEventListener("mouseenter", () => {
      const p      = people[parseInt(dot.dataset.person)];
      const core   = dot.querySelector(".map-dot-core");
      const cRect  = core.getBoundingClientRect();
      const bRect  = container.getBoundingClientRect();

      ttName.textContent    = p.name;
      ttDest.textContent    = "→ " + p.dest;
      ttLeaving.textContent = p.leaving;
      ttMode.textContent    = p.mode;

      const left = cRect.left - bRect.left + cRect.width / 2;
      const top  = cRect.top  - bRect.top;
      tooltip.style.left      = left + "px";
      tooltip.style.top       = top  + "px";
      tooltip.style.transform = "translate(-50%, calc(-100% - 10px))";
      tooltip.classList.add("visible");
    });

    dot.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
  });
}

function init() {
  ensureSeedState();
  setupNav();
  setupSignup();
  setupDashboard();
  setupMatches();
  setupTrip();
  initCityMap();
}

document.addEventListener("DOMContentLoaded", init);
