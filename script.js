const projectData = {
  "project-ev": {
    title: "Smart EV Battery Health Monitoring and Thermal Safety System",
    status: "PROPOSED CONCEPT · PROTOTYPE AND TESTING PENDING",
    description: "A proposed monitoring concept for an electric-scooter battery that observes voltage, current, and temperature, presents measurements in a dashboard, and flags readings that cross configured thresholds. This is an independent learning concept, not an official Ather product.",
    focus: "EV monitoring · Embedded systems · Dashboard concept",
    tech: "Proposed: ESP32, suitable sensors, Python, Streamlit, Plotly",
    points: ["Define monitoring requirements and safe low-voltage test conditions.", "Plan sensor inputs, controller data flow, and dashboard states.", "Design configurable warning thresholds and historical trend views.", "Validate using simulated data or an appropriately safe bench setup before claiming hardware results."],
    note: "Status: proposed only. No prototype, accuracy, battery-health prediction, or safety certification is claimed. Never connect this concept to a traction battery without qualified engineering approval."
  },
  "project-drone": {
    title: "AI-Enabled Hybrid Drone System",
    status: "SCHOOL-ERA PROJECT · DETAILS TO VERIFY",
    description: "A school-era project associated with team-leadership experience in Std. XII. This portfolio entry is a starting point for documenting the actual problem, team contribution, system design, and lessons learned.",
    focus: "Aerial systems · Team coordination · Engineering concept",
    tech: "Hardware, software, AI approach, and specifications: to be confirmed",
    points: ["Add the original problem statement and intended use case.", "Document the actual airframe, electronics, and software used, if applicable.", "Describe your personal role and team responsibilities accurately.", "Add authentic project photographs, test evidence, and outcomes when available."],
    note: "Technical specifications and implementation details have not yet been verified. The stated project funding should be documented with its source and context before publication."
  },
  "project-security": {
    title: "Wi-Fi & Bluetooth Security Analysis Tool Using ESP32 Marauder",
    status: "RESUME PROJECT · AUGUST–OCTOBER 2025",
    description: "A portable embedded wireless-security learning tool described in the resume as supporting wireless network scanning, device discovery, and security analysis. Use it only on systems and networks where testing is authorised.",
    focus: "Embedded systems · Wireless discovery · Ethical security",
    tech: "ESP32 Marauder, wireless interfaces, TFT display, embedded firmware",
    points: ["Explain the hardware platform and interface at a high level.", "Document scanning workflows and functions you personally implemented or verified.", "Include authentic device photographs or screenshots, if available.", "Discuss consent, privacy, and responsible testing boundaries."],
    note: "Do not publish credentials, private network details, or unverified vulnerability claims. Add only functions and results you can substantiate."
  },
  "project-reaction": {
    title: "App-Controlled Smart Reaction Light for Hand Rehabilitation",
    status: "RESUME PROJECT · JANUARY–FEBRUARY 2026",
    description: "A rehabilitation-oriented system described in the resume using wireless reaction pods, sensors, and a mobile application to monitor response time, accuracy, and task performance.",
    focus: "Embedded electronics · Human-centred design · Wireless devices",
    tech: "Microcontroller, sensors, wireless reaction pods, mobile application",
    points: ["Show the actual system workflow and cue-response sequence.", "Add a block diagram of the pods, controller, and app.", "Document only measurements and functions that were genuinely implemented.", "Explain limitations and distinguish a project prototype from a clinically validated device."],
    note: "No clinical validation, medical certification, or proven rehabilitation outcomes are claimed."
  },
  "project-touch": {
    title: "Arduino-Based Touch Sensor System with Real-Time LCD Display",
    status: "RESUME PROJECT · SEPTEMBER–OCTOBER 2024",
    description: "An Arduino-based touch-input system described in the resume using touch sensor modules, LEDs, and a 16×2 LCD for real-time feedback.",
    focus: "Sensor interfacing · Microcontroller fundamentals · Display output",
    tech: "Arduino UNO, touch sensor modules, 16×2 LCD, LEDs, breadboard",
    points: ["Describe touch input and the controller's response.", "Add a labelled circuit or system block diagram.", "Show the actual LCD output and hardware photographs if available.", "Summarise any debugging or integration lessons from the build."],
    note: "Add code, circuit details, and test results only if you have the original material or can verify them."
  },
  "project-quake": {
    title: "IoT-Based Earthquake Detection Alarm",
    status: "RESUME PROJECT · AUGUST–SEPTEMBER 2024",
    description: "A sensor-based project described in the resume that combines vibration input with local buzzer/visual alerts and cloud monitoring.",
    focus: "IoT · Sensor input · Alerting and monitoring",
    tech: "Arduino, vibration sensor, buzzer, visual indicators, ThingSpeak/Blynk",
    points: ["Explain the sensor-to-alert workflow.", "Show how cloud monitoring was configured, if verified.", "Describe test conditions and known limitations.", "Clarify that a student prototype is not a certified earthquake early-warning system."],
    note: "Do not claim certified seismic detection, warning lead time, or real-world reliability without evidence."
  }
};

const modal = document.getElementById("caseModal");
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
document.querySelectorAll(".project-card > a").forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href").slice(1);
    if (!projectData[id]) return;
    event.preventDefault();
    const p = projectData[id];
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalStatus").textContent = p.status;
    document.getElementById("modalDescription").textContent = p.description;
    document.getElementById("modalFocus").textContent = p.focus;
    document.getElementById("modalTech").textContent = p.tech;
    document.getElementById("modalNote").textContent = p.note;
    const list = document.getElementById("modalPoints");
    list.replaceChildren(...p.points.map(point => { const li = document.createElement("li"); li.textContent = point; return li; }));
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
    document.querySelector(".modal-close").focus();
  });
});
modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.textContent = "☰"; }));

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.filter;
  document.querySelectorAll(".project-card").forEach(card => {
    card.hidden = filter !== "all" && !card.dataset.category.split(" ").includes(filter);
  });
}));

const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}, {passive:true});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), {threshold:.08});
document.querySelectorAll(".section-heading, .project-card, .experience-row, .education-layout, .skills-grid article, .about-copy").forEach(el => { el.classList.add("reveal"); observer.observe(el); });
