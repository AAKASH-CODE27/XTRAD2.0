document.addEventListener("DOMContentLoaded", function () {

  // ─── HAMBURGER MENU ───

  const hamburgerBtn = document.getElementById("hamburger-btn")
  const navLinks = document.getElementById("nav-links")

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open")
      hamburgerBtn.classList.toggle("open", isOpen)
      hamburgerBtn.setAttribute("aria-expanded", isOpen)
    })

    document.addEventListener("click", (e) => {
      if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open")
        hamburgerBtn.classList.remove("open")
        hamburgerBtn.setAttribute("aria-expanded", "false")
      }
    })
  }

  window.closeMenu = function () {
    if (navLinks && hamburgerBtn) {
      navLinks.classList.remove("open")
      hamburgerBtn.classList.remove("open")
      hamburgerBtn.setAttribute("aria-expanded", "false")
    }
  }

  // ─── SCROLL PROGRESS BAR ───

  const scrollBar = document.querySelector(".scroll-progress")

  window.addEventListener("scroll", () => {
    if (scrollBar) {
      const scrollTop = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      scrollBar.style.width = ((scrollTop / height) * 100) + "%"
    }
  })

  // ─── COUNTDOWN TIMER ───

  const eventStart = new Date("Apr 29, 2026 09:00:00")
  const target = eventStart.getTime()
  const countdown = document.querySelector(".countdown")
  const daysEl = document.getElementById("days")
  const hoursEl = document.getElementById("hours")
  const minutesEl = document.getElementById("minutes")
  const secondsEl = document.getElementById("seconds")

  const timer = setInterval(() => {
    const now = new Date().getTime()
    const diff = target - now

    if (diff < 0) {
      if (countdown) countdown.innerHTML = "<p style='font-size:1.4rem;font-weight:700;color:#c3a263'>&#127881; Event is Live Now!</p>"
      clearInterval(timer)
      return
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((diff % (1000 * 60)) / 1000)

    if (daysEl) daysEl.innerText = String(d).padStart(2, "0")
    if (hoursEl) hoursEl.innerText = String(h).padStart(2, "0")
    if (minutesEl) minutesEl.innerText = String(m).padStart(2, "0")
    if (secondsEl) secondsEl.innerText = String(s).padStart(2, "0")

  }, 1000)


  // ─── REGISTRATION BUTTON STATES ───
  // Window: Mar 30, 2026 – Apr 13, 2026

  const registerBtn = document.getElementById("register-btn")
  const regOpen = new Date("Mar 27, 2026 00:00:00")
  const regClose = new Date("Apr 13, 2026 23:59:59")

  function updateRegisterBtn() {
    if (!registerBtn) return
    const now = new Date()

    if (now >= eventStart) {
      registerBtn.textContent = "Event Live \uD83C\uDF89"
      registerBtn.style.opacity = "0.75"
      registerBtn.style.cursor = "default"
      registerBtn.removeAttribute("href")
    } else if (now > regClose) {
      registerBtn.textContent = "Registration Closed"
      registerBtn.style.opacity = "0.6"
      registerBtn.style.cursor = "default"
      registerBtn.removeAttribute("href")
    } else if (now >= regOpen) {
      registerBtn.textContent = "Register Now"
      registerBtn.style.opacity = "1"
      registerBtn.style.cursor = "pointer"
    } else {
      registerBtn.textContent = "Registration Not Open"
      registerBtn.style.opacity = "0.7"
      registerBtn.style.cursor = "default"
      registerBtn.removeAttribute("href")
    }
  }

  updateRegisterBtn()
  setInterval(updateRegisterBtn, 60000)


  // ─── ALTERNATING TIMELINE ───

  const events = [
    {
      phase: "Phase I",
      title: "Registration Open",
      start: "2026-03-30",
      end: "2026-04-13",
      desc: "Team of 4 members. Submit PPT &amp; Abstract to participate."
    },
    {
      phase: "Phase II",
      title: "Registration Closes",
      start: "2026-04-13",
      end: "2026-04-13",
      desc: "Last date for team registrations and submission of PPT &amp; Abstract."
    },
    {
      phase: "Phase III",
      title: "Results Announcement",
      start: "2026-04-13",
      end: "2026-04-13",
      desc: "Shortlisted teams progressing to the next round will be announced along with an orientation session."
    },
    {
      phase: "Phase IV",
      title: "Mentoring &amp; Onboarding Sessions",
      start: "2026-04-21",
      end: "2026-04-28",
      desc: "Payment closure for shortlisted teams. Two follow-up sessions will be conducted to facilitate onboarding, refine solutions, and monitor progress."
    },
    {
      phase: "Phase V",
      title: "Hackathon Commences",
      start: "2026-04-28",
      end: "2026-04-29",
      desc: "The main hackathon event. Build, present, and compete over two exciting days!"
    }
  ]

  const container = document.getElementById("timeline-container")
  const progressFill = document.querySelector(".timeline-progress-fill")
  const nowDate = new Date()

  if (!container) {
    console.warn("XTARD: #timeline-container not found.")
    return
  }

  let liveIndex = -1
  let completedCount = 0

  events.forEach((event, index) => {
    const start = new Date(event.start)
    const end = new Date(event.end)
    end.setHours(23, 59, 59, 999)

    let status = "upcoming"
    if (nowDate >= start && nowDate <= end) { status = "live"; liveIndex = index }
    if (nowDate > end) { status = "completed"; completedCount++ }

    const side = index % 2 === 0 ? "" : "right"

    // Format display date
    const fmt = (d) => {
      const [y, m, day] = d.split("-")
      return `${day}/${m}/${y}`
    }
    const dateStr = event.start === event.end
      ? fmt(event.start)
      : `${fmt(event.start)} &rarr; ${fmt(event.end)}`

    const div = document.createElement("div")
    div.className = `timeline-item ${side} ${status}`.trim()
    div.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <span class="timeline-phase">${event.phase}</span>
        <h3>${event.title}</h3>
        <p class="timeline-dates">${dateStr}</p>
        <p class="timeline-desc">${event.desc}</p>
      </div>
    `
    container.appendChild(div)
  })

  if (progressFill) {
    const total = events.length - 1
    let fillPercent = 0

    if (liveIndex >= 0) {
      fillPercent = (liveIndex / total) * 100
    } else if (completedCount === events.length) {
      fillPercent = 100
    } else if (completedCount > 0) {
      fillPercent = ((completedCount - 1) / total) * 100
    }

    setTimeout(() => {
      progressFill.style.height = fillPercent + "%"
    }, 300)
  }


  // ─── LOGO MOUSE PARALLAX ───

  const logoContainer = document.getElementById("logo-container")
  const xtardLogo = document.getElementById("xtard-logo")
  const MAX_MOVE = 8

  if (logoContainer && xtardLogo) {

    logoContainer.addEventListener("mousemove", (e) => {
      const rect = logoContainer.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = (e.clientX - cx) / (rect.width / 2)
      const ny = (e.clientY - cy) / (rect.height / 2)
      const tx = -(nx * MAX_MOVE)
      const ty = -(ny * MAX_MOVE)
      xtardLogo.style.transform = `translate(${tx}px, ${ty}px)`
    })

    logoContainer.addEventListener("mouseleave", () => {
      xtardLogo.style.transform = "translate(0px, 0px)"
    })
  }


  // ─── PROBLEM STATEMENTS CAROUSEL ───

  const psTrack = document.getElementById('ps-track')
  const psPrev = document.getElementById('ps-prev')
  const psNext = document.getElementById('ps-next')
  const psDotsEl = document.getElementById('ps-dots')

  if (psTrack && psPrev && psNext) {
    const psCards = psTrack.querySelectorAll('.ps-card')
    const psTotal = psCards.length
    let psCurrent = 0

    // Build dots
    if (psDotsEl) {
      psCards.forEach((_, i) => {
        const dot = document.createElement('span')
        dot.className = 'ps-dot' + (i === 0 ? ' active' : '')
        dot.addEventListener('click', () => goTo(i))
        psDotsEl.appendChild(dot)
      })
    }

    function goTo(index) {
      psCurrent = index
      psTrack.style.transform = `translateX(-${psCurrent * 100}%)`
      psPrev.disabled = psCurrent === 0
      psNext.disabled = psCurrent === psTotal - 1
      if (psDotsEl) {
        psDotsEl.querySelectorAll('.ps-dot').forEach((d, i) => {
          d.classList.toggle('active', i === psCurrent)
        })
      }
    }

    psPrev.addEventListener('click', () => { if (psCurrent > 0) goTo(psCurrent - 1) })
    psNext.addEventListener('click', () => { if (psCurrent < psTotal - 1) goTo(psCurrent + 1) })

    // Swipe support for mobile
    let touchStartX = 0
    psTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX }, { passive: true })
    psTrack.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX
      if (diff > 50 && psCurrent < psTotal - 1) goTo(psCurrent + 1)
      if (diff < -50 && psCurrent > 0) goTo(psCurrent - 1)
    })

    goTo(0) // init
  }

})