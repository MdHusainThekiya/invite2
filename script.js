// ===== Edit the invitation details here =====
const CONFIG = {
  elders: [
    { name: "Late Haji Abdul Gaffar Sidique Fasi", relation: "Grandfather" },
    { name: "Late Haji Sharifa Abdul Gaffar Fasi", relation: "Grandmother" },
  ],
  couples: [
    {
      first: { name: "Afzal", parents: "S/O Mr & Mrs Shabana Shakil Memon" },
      second: { name: "Huda", parents: "D/O Mr & Mrs ____" }, // TODO: Huda's parents
      line: "A Sunnah fulfilled, a blessed chapter unfolds.",
    },
    {
      first: { name: "Alisha", parents: "D/O Mr & Mrs Shabana Shakil Memon" },
      second: { name: "Husain", parents: "S/O Mr & Mrs Khairunnisa Abdul Habib Thekiya" },
      line: "A moment of Qubool Hai, a lifetime of togetherness.",
    },
  ],
  events: [
    {
      id: "nikah",
      title: "Barkat-e-Nikah",
      intro: "Scratch the circles gently to discover the date",
      start: "2027-01-02T19:00:00+05:30", // Mumbai time (IST +05:30)
      hours: 4, // length, for calendar entries
      scratch: "circles", // "circles" = one circle per entry in reveal; "heart" = one heart
      reveal: ["02", "Jan", "2027"],
      weekday: "Saturday",
      timeText: "7:00 PM onwards",
      venue: "Baig Mohammad Hall",
      city: "Mumbai",
      mapUrl: "https://share.google/dLmMFAW1HQ3yvKJXS",
      // Text for the embedded map. Left empty: Google's guess for "Baig Mohammad Hall,
      // Mumbai" lands on a different hall. Put the hall's full address here to show the map.
      mapQuery: "",
    },
    {
      id: "walima",
      title: "Barkat-e-Walima",
      intro: "The auspicious day · scratch the card gently to discover the date",
      start: "2027-01-03T13:00:00+05:30",
      hours: 4,
      scratch: "heart",
      reveal: ["03", "January", "2027"], // shown as three lines inside the heart
      weekday: "Sunday",
      timeText: "1:00 PM onwards",
      venue: "Kutchi Memon Hall",
      city: "Mumbai",
      // TODO: replace with the hall's real Google Maps link
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Kutchi+Memon+Hall+Mumbai",
      mapQuery: "Kutchi Memon Hall, Mumbai",
    },
  ],
  closing:
    "Your esteemed presence will be our greatest joy. We humbly seek your duas and blessings as the couples begin their journey together ♡",
  family: "The Memon Family",
  contacts: [{ name: "Shalik Memon", phone: "9272842324" }],
};

// ===== Small helpers =====
const $ = (s, root = document) => root.querySelector(s);
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};
const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;
const divider = () => '<svg class="divider reveal" aria-hidden="true"><use href="#divider"/></svg>';
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const dateLong = (d) =>
  d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

// ===== Fill the page =====
const eldersList = $("#elders");
CONFIG.elders.forEach(({ name, relation }) => {
  const li = el("li");
  li.append(el("span", "elder", name), el("span", "elder-rel", relation));
  eldersList.append(li);
});

const couplesBox = $("#couples");
CONFIG.couples.forEach((c, i) => {
  const s = el("section", i % 2 ? "couple sand" : "couple"); // ivory / sand alternate
  s.innerHTML = `
    <img class="corner tl" src="assets/floral-corner.webp" alt="" aria-hidden="true" loading="lazy" />
    <img class="corner br" src="assets/floral-corner.webp" alt="" aria-hidden="true" loading="lazy" />
    <p class="caps small reveal">In the name of Allah, the Most Compassionate, the Most Merciful</p>
    <div class="arch reveal">
      <img class="arch-img" src="assets/arch.webp" alt="" aria-hidden="true" loading="lazy" width="720" height="964" />
      <div class="arch-inner">
        <h2 class="script name"></h2>
        <p class="parents"></p>
        <p class="script amp">&amp;</p>
        <h2 class="script name"></h2>
        <p class="parents"></p>
      </div>
    </div>
    <p class="couple-line reveal"></p>
    <p class="ar inshallah reveal" lang="ar" dir="rtl">إِنْ شَاءَ ٱللَّٰهُ</p>`;
  const [n1, n2] = s.querySelectorAll(".name");
  const [p1, p2] = s.querySelectorAll(".parents");
  n1.textContent = c.first.name;
  p1.textContent = c.first.parents;
  n2.textContent = c.second.name;
  p2.textContent = c.second.parents;
  $(".couple-line", s).textContent = c.line;
  couplesBox.append(s);
});

const eventsBox = $("#events");
CONFIG.events.forEach((ev) => {
  const d = new Date(ev.start);
  const s = el("section", `panel event${ev.id === "walima" ? " sand" : ""}`);
  s.id = ev.id;
  s.innerHTML = `
    <img class="corner tr" src="assets/floral-corner.webp" alt="" aria-hidden="true" loading="lazy" />
    <h2 class="script title reveal"></h2>
    ${divider()}
    <p class="intro reveal"></p>
    <div class="scratch-row reveal" role="group" aria-label="Scratch to reveal the date"></div>
    <p class="weekday" aria-live="polite"></p>
    <button type="button" class="reveal-all">Tap here to reveal instead</button>
    <ul class="details reveal">
      <li>${icon("i-clock")}<span class="time"></span></li>
      <li>${icon("i-pin")}<span class="place"></span></li>
    </ul>
    <div class="actions reveal">
      <button type="button" class="btn cal-btn">${icon("i-plus")}Save the Date</button>
      <a class="btn btn-ghost map-btn" target="_blank" rel="noopener">${icon("i-map")}Open in Maps</a>
    </div>`;
  $(".title", s).textContent = ev.title;
  $(".intro", s).textContent = ev.intro;
  $(".time", s).textContent = ev.timeText;
  $(".place", s).textContent = `${ev.venue}, ${ev.city}`;
  $(".map-btn", s).href = ev.mapUrl;
  $(".cal-btn", s).addEventListener("click", () => openCalendar(ev));
  const row = $(".scratch-row", s);
  if (ev.scratch === "heart") {
    const c = el("div", "scratch heart");
    c.innerHTML = `<span class="under"></span><canvas aria-hidden="true"></canvas>`;
    ev.reveal.forEach((txt) => $(".under", c).append(el("span", null, txt)));
    row.append(c);
  } else {
    ev.reveal.forEach((txt) => {
      const c = el("div", "scratch");
      c.innerHTML = `<span class="under"></span><canvas aria-hidden="true"></canvas>`;
      $(".under", c).textContent = txt;
      row.append(c);
    });
  }
  row.setAttribute("aria-label", `Date: ${dateLong(d)}. Scratch to reveal.`);
  s.dataset.weekday = ev.weekday;
  eventsBox.append(s);
});

// Timeline
const timeline = $("#timeline");
CONFIG.events.forEach((ev) => {
  const d = new Date(ev.start);
  const li = el("li", "reveal");
  li.innerHTML = `<p class="tl-date"></p><div class="tl-row"><span class="tl-time"></span><div><p class="tl-title"></p><p class="tl-place"></p></div></div>`;
  $(".tl-date", li).textContent = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  $(".tl-time", li).textContent = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
  $(".tl-title", li).textContent = ev.title;
  $(".tl-place", li).textContent = ev.venue;
  timeline.append(li);
});

// Venues (map embeds load only when scrolled near)
const venues = $("#venues");
CONFIG.events.forEach((ev) => {
  const card = el("div", "venue reveal");
  card.innerHTML = `
    <p class="caps small"></p>
    <h3 class="venue-name"></h3>
    <p class="venue-city"></p>
    <div class="map-frame"><iframe title="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <a class="btn btn-ghost" target="_blank" rel="noopener">${icon("i-map")}Open in Google Maps</a>`;
  $(".caps", card).textContent = ev.title;
  $(".venue-name", card).textContent = ev.venue;
  $(".venue-city", card).textContent = ev.city;
  const f = $("iframe", card);
  if (ev.mapQuery) {
    f.title = `Map: ${ev.venue}`;
    f.src = `https://maps.google.com/maps?q=${encodeURIComponent(ev.mapQuery)}&z=15&output=embed`;
  } else {
    $(".map-frame", card).remove();
  }
  $("a", card).href = ev.mapUrl;
  venues.append(card);
});

// Closing
$("#closingMsg").textContent = CONFIG.closing;
$("#family").textContent = CONFIG.family;
const PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';
const WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07 4.8 4.8 0 0 0 1 2.56 11 11 0 0 0 4.24 3.74c1.58.68 2.2.74 2.99.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.29Z"/></svg>';
CONFIG.contacts.forEach(({ name, phone }) => {
  const digits = phone.replace(/\D/g, "").slice(-10);
  const row = el("div", "contact");
  row.append(el("p", "caps small", "For any queries"), el("p", "contact-name", name));
  const acts = el("div", "contact-actions");
  [["Call", `tel:+91${digits}`, PHONE], ["WhatsApp", `https://wa.me/91${digits}`, WA]].forEach(([label, href, svg]) => {
    const a = el("a", "btn btn-ghost");
    a.href = href;
    if (href.startsWith("https:")) { a.target = "_blank"; a.rel = "noopener"; }
    a.innerHTML = `${svg}<span>${label}</span>`;
    a.setAttribute("aria-label", `${label} ${name}`);
    acts.append(a);
  });
  row.append(acts);
  $("#contacts").append(row);
});

// ===== Reveal on scroll =====
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }),
  { rootMargin: "0px 0px -8% 0px" }
);
const watchReveals = () => document.querySelectorAll(".reveal:not(.in)").forEach((r) => io.observe(r));

// ===== Envelope =====
// Every opening starts at the top of the invitation.
// "instant" overrides the CSS smooth scrolling, which would otherwise animate.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
toTop();
window.addEventListener("load", () => { if (!opened) toTop(); });
// Back/forward cache (e.g. returning from WhatsApp or Maps) would show the
// already-opened page mid-scroll: reload so the guest gets the envelope again
window.addEventListener("pageshow", (e) => { if (e.persisted) location.reload(); });
const envelope = $("#envelope");
const music = $("#music");
const musicBtn = $("#musicBtn");
let opened = false;

function openEnvelope() {
  if (opened) return;
  opened = true;
  toTop();
  music.play().then(() => (musicBtn.hidden = false)).catch(() => {
    if (music.error) return; // no music file
    musicBtn.hidden = false;
    setMuted(true);
  });
  envelope.classList.add("opening");
  setTimeout(() => envelope.classList.add("open"), 650);
  setTimeout(() => {
    document.body.classList.remove("locked");
    toTop(); // unlocking can let the browser jump back to an old position
    watchReveals();
    startPetals();
  }, 1300);
  setTimeout(() => envelope.classList.add("gone"), 2300);
}
envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
});

// ===== Music =====
let userMuted = false;
function setMuted(m) {
  musicBtn.classList.toggle("muted", m);
  musicBtn.setAttribute("aria-pressed", String(m));
  musicBtn.setAttribute("aria-label", m ? "Play music" : "Mute music");
}
musicBtn.addEventListener("click", () => {
  if (music.paused) { userMuted = false; music.play().catch(() => {}); setMuted(false); }
  else { userMuted = true; music.pause(); setMuted(true); }
});
// Pause when the guest leaves the tab / locks the phone, resume on return
document.addEventListener("visibilitychange", () => {
  if (!opened || userMuted) return;
  if (document.hidden) music.pause();
  else music.play().then(() => setMuted(false)).catch(() => {});
});

$("#scrollCue").addEventListener("click", () => couplesBox.firstElementChild?.scrollIntoView({ behavior: "smooth" }));

// ===== Falling petals =====
function startPetals() {
  if (reduceMotion) return;
  const box = $("#petals");
  const count = window.innerWidth < 600 ? 7 : 12;
  for (let i = 0; i < count; i++) {
    const p = el("img", "petal");
    p.src = `assets/petal-${(i % 6) + 1}.webp`;
    p.alt = "";
    const size = 14 + Math.random() * 16;
    p.style.cssText = `--x:${Math.random() * 100}vw;--drift:${(Math.random() * 30 - 15).toFixed(1)}vw;--size:${size.toFixed(0)}px;--dur:${(11 + Math.random() * 9).toFixed(1)}s;--delay:${(-Math.random() * 18).toFixed(1)}s;--spin:${Math.random() > 0.5 ? 1 : -1}`;
    box.append(p);
  }
  document.addEventListener("visibilitychange", () => box.classList.toggle("paused", document.hidden));
}

// ===== Scratch to reveal =====
// Touch handlers are registered as NON-passive and call preventDefault so a
// horizontal swipe on the card can never become the browser's "back" gesture.
const foil = new Image();
foil.src = "assets/foil.jpg";
// Heart outline in a 100 x 92 box; the same shape is the CSS mask in style.css
const HEART = new Path2D("M50 89C21 68 3 52 3 29 3 14 15 3 29 3c9 0 17 5 21 13 4-8 12-13 21-13 14 0 26 11 26 26 0 23-18 39-47 60Z");
const hitCtx = document.createElement("canvas").getContext("2d");

function setupScratch(card) {
  const canvas = $("canvas", card);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const isHeart = card.classList.contains("heart");
  let done = false, drawing = false, last = null, strokes = 0;
  let samples = null; // pixel indexes that lie inside the visible shape

  const paint = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const w = r.width, h = r.height;
    if (foil.complete && foil.naturalWidth) ctx.drawImage(foil, 0, 0, w, h);
    else { ctx.fillStyle = "#8a9470"; ctx.fillRect(0, 0, w, h); }
    // soft sheen + a small ornament so it reads as "scratch me"
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(255,255,255,.35)"); g.addColorStop(.5, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,255,255,.2)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    if (!isHeart) {
      ctx.fillStyle = "rgba(255,255,255,.85)";
      ctx.font = `${Math.round(w * 0.3)}px "Pinyon Script", cursive`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("♡", w / 2, h / 2 + 2);
    }
    // Only count pixels inside the visible shape (circle or heart) when
    // measuring how much has been scratched; the corners are hidden anyway
    samples = [];
    const cw = canvas.width, ch = canvas.height, step = 6;
    for (let y = step / 2; y < ch; y += step) {
      for (let x = step / 2; x < cw; x += step) {
        const inside = isHeart
          ? hitCtx.isPointInPath(HEART, (x / cw) * 100, (y / ch) * 92)
          : (x / cw - 0.5) ** 2 + (y / ch - 0.5) ** 2 < 0.25;
        if (inside) samples.push((Math.floor(y) * cw + Math.floor(x)) * 4 + 3);
      }
    }
  };

  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  };
  const scratch = (p) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = canvas.getBoundingClientRect().width * (isHeart ? 0.16 : 0.28);
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo((last || p).x, (last || p).y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
    if (++strokes % 6 === 0) check();
  };
  const check = () => {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (const i of samples) if (data[i] < 40) clear++;
    if (clear / samples.length > (isHeart ? 0.55 : 0.5)) finish();
  };
  const finish = () => {
    if (done) return;
    done = true;
    card.classList.add("done");
    card.dispatchEvent(new CustomEvent("revealed", { bubbles: true }));
  };
  const start = (e) => { if (done) return; e.preventDefault(); drawing = true; last = null; scratch(pos(e)); };
  const move = (e) => { if (!drawing || done) return; e.preventDefault(); scratch(pos(e)); };
  const end = () => { drawing = false; last = null; if (!done) check(); };

  // The heart is cut out with a CSS mask, and browsers ignore touches on the
  // masked-away corners, so a swipe that starts just beside the heart would be
  // lost. Listen on the heart's (unmasked) row instead; circles use the canvas.
  const surface = isHeart ? card.parentElement : canvas;
  surface.addEventListener("touchstart", start, { passive: false });
  surface.addEventListener("touchmove", move, { passive: false });
  surface.addEventListener("touchend", end);
  surface.addEventListener("mousedown", start);
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);

  paint();
  foil.addEventListener("load", () => { if (!done) paint(); }, { once: true });
  document.fonts.ready.then(() => { if (!done && strokes === 0) paint(); });
  card.finish = finish;
}

document.querySelectorAll(".event").forEach((section) => {
  const cards = [...section.querySelectorAll(".scratch")];
  cards.forEach(setupScratch);
  const weekday = $(".weekday", section);
  const fallback = $(".reveal-all", section);
  section.addEventListener("revealed", () => {
    if (cards.every((c) => c.classList.contains("done"))) {
      weekday.textContent = section.dataset.weekday;
      section.classList.add("all-revealed");
      burst(section.querySelector(".scratch-row"));
    }
  });
  fallback.addEventListener("click", () => cards.forEach((c) => c.finish()));
});

// Small petal burst when a date is fully revealed
function burst(anchor) {
  if (reduceMotion) return;
  const r = anchor.getBoundingClientRect();
  for (let i = 0; i < 14; i++) {
    const p = el("img", "burst");
    p.src = `assets/petal-${(i % 6) + 1}.webp`;
    p.alt = "";
    const a = (Math.PI * 2 * i) / 14, dist = 80 + Math.random() * 70;
    p.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;--tx:${Math.cos(a) * dist}px;--ty:${Math.sin(a) * dist - 40}px;--rot:${Math.random() * 360}deg`;
    document.body.append(p);
    setTimeout(() => p.remove(), 1600);
  }
}

// ===== Countdown (Nikah, then Walima, then a closing note) =====
const cd = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
const cdLabel = $("#countdownLabel");
function tick() {
  const now = Date.now();
  const next = CONFIG.events.find((ev) => new Date(ev.start).getTime() > now);
  if (!next) {
    $("#countdown").hidden = true;
    cdLabel.textContent = "Alhamdulillah. Thank you for celebrating with us.";
    return;
  }
  let t = Math.floor((new Date(next.start).getTime() - now) / 1000);
  const d = Math.floor(t / 86400); t -= d * 86400;
  const h = Math.floor(t / 3600); t -= h * 3600;
  const m = Math.floor(t / 60); const s = t - m * 60;
  cd.d.textContent = d;
  cd.h.textContent = String(h).padStart(2, "0");
  cd.m.textContent = String(m).padStart(2, "0");
  cd.s.textContent = String(s).padStart(2, "0");
  cdLabel.textContent = `until the ${next.title}`;
}
tick();
setInterval(tick, 1000);

// ===== Add to calendar =====
const sheet = $("#calSheet");
let calEvent = null;
const icsDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
function calTimes(ev) {
  const s = new Date(ev.start);
  return { s, e: new Date(s.getTime() + ev.hours * 3600e3) };
}
function openCalendar(ev) {
  calEvent = ev;
  const { s, e } = calTimes(ev);
  const title = `${ev.title} · The Memon Family`;
  const where = `${ev.venue}, ${ev.city}`;
  $("#calGoogle").href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${icsDate(s)}/${icsDate(e)}&location=${encodeURIComponent(where)}&details=${encodeURIComponent(ev.mapUrl)}`;
  $("#calOutlook").href = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${s.toISOString()}&enddt=${e.toISOString()}&location=${encodeURIComponent(where)}`;
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add("show"));
  $("#calGoogle").focus();
}
function closeCalendar() {
  sheet.classList.remove("show");
  setTimeout(() => (sheet.hidden = true), 250);
}
$("#calClose").addEventListener("click", closeCalendar);
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeCalendar(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) closeCalendar(); });
$("#calIcs").addEventListener("click", () => {
  const ev = calEvent;
  const { s, e } = calTimes(ev);
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Memon Family//Invite//EN", "BEGIN:VEVENT",
    `UID:${ev.id}-${icsDate(s)}@memon-invite`, `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(s)}`, `DTEND:${icsDate(e)}`,
    `SUMMARY:${ev.title} · The Memon Family`, `LOCATION:${ev.venue}\\, ${ev.city}`, `URL:${ev.mapUrl}`,
    "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", `DESCRIPTION:${ev.title} tomorrow`, "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = el("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = `${ev.id}.ics`;
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  closeCalendar();
});
