const dateInput = document.querySelector("#date");
const timeSelect = document.querySelector("#time");
const bookingNote = document.querySelector("#booking-note");
const bookingForm = document.querySelector(".booking-form");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

const weekdayTimes = [
  "10.00",
  "10.30",
  "11.00",
  "11.30",
  "12.00",
  "12.30",
  "13.00",
  "13.30",
  "14.00",
  "14.30",
  "15.00",
  "15.30"
];

const setMinDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${year}-${month}-${day}`;
};

const setOptions = (options) => {
  timeSelect.innerHTML = "";

  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    timeSelect.append(option);
  });
};

const updateTimes = () => {
  if (!dateInput.value) {
    setOptions(["Vælg dato først"]);
    bookingNote.textContent = "Vælg en dato for at se mulige tider.";
    return;
  }

  const selectedDay = new Date(`${dateInput.value}T12:00:00`).getDay();

  if (selectedDay === 0) {
    setOptions(["Lukket"]);
    bookingNote.textContent = "Klinikken holder lukket søndag. Vælg gerne en anden dato.";
    return;
  }

  if (selectedDay === 6) {
    setOptions(["Efter aftale"]);
    bookingNote.textContent = "Lørdag er efter aftale. Send en forespørgsel, så finder vi en tid.";
    return;
  }

  setOptions(weekdayTimes);
  bookingNote.textContent = "Åbent mandag til fredag kl. 10-16.";
};

dateInput?.addEventListener("change", updateTimes);

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingNote.textContent = "Tak. Din bookingforespørgsel er klar til at blive sendt.";
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menu?.classList.toggle("is-open", !isOpen);
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  });
});

const setPricePanel = (toggle, open) => {
  const card = toggle.closest(".detail-card");
  toggle.setAttribute("aria-expanded", String(open));
  card?.classList.toggle("is-open", open);
};

document.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-price-toggle]");

  if (toggle) {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setPricePanel(toggle, !isOpen);
  }
});

if (window.location.hash === "#negle") {
  const nailsToggle = document.querySelector("#negle [data-price-toggle]");
  nailsToggle && setPricePanel(nailsToggle, true);
}

if (dateInput && timeSelect) {
  setMinDate();
  updateTimes();
}
