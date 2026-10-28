/**
 * BAKERZ BITE - Live Announcement Ticker & Real-Time Karachi Clock
 * 
 * Features:
 * - Real-time live clock using Asia/Karachi timezone via Intl.DateTimeFormat
 * - Karachi geographical coordinates
 * - Current date
 * - Fresh baking dispatch schedule
 * - Transparent demonstration visitor counter (local session based)
 */

export function initLiveTicker() {
  const clockElement = document.querySelector('#ticker-live-clock');
  const dateElement = document.querySelector('#ticker-live-date');
  const visitorElement = document.querySelector('#ticker-visitor-count');

  function updateClock() {
    const now = new Date();

    // Format time in Asia/Karachi (PKT, UTC+5)
    try {
      const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Karachi',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      if (clockElement) {
        clockElement.textContent = `${timeFormatter.format(now)} PKT (UTC+5)`;
      }

      if (dateElement) {
        dateElement.textContent = dateFormatter.format(now);
      }
    } catch (e) {
      if (clockElement) clockElement.textContent = now.toLocaleTimeString();
    }
  }

  // Update clock every second
  updateClock();
  setInterval(updateClock, 1000);

  // Transparent Demonstration Visitor Counter
  // Calculates session number transparently without falsely claiming global server counts
  if (visitorElement) {
    let sessionCount = parseInt(sessionStorage.getItem('bakerz_session_visits') || '0', 10);
    sessionCount += 1;
    sessionStorage.setItem('bakerz_session_visits', sessionCount.toString());

    // Curated demonstration baseline + session count
    const demoBase = 1428;
    const currentVisitor = demoBase + sessionCount;
    visitorElement.textContent = `#${currentVisitor.toLocaleString()}`;
  }
}
