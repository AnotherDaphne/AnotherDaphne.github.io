const targetDates = [
  new Date("August 4, 2026 14:45:00").getTime(),
  new Date("August 28, 2026 15:30:00").getTime(),
];

const updateCountdownState = () => {
   const isMobile = window.matchMedia('(max-width: 768px)').matches;
   const countdown = document.getElementById('countdown');

   if (countdown) {
      countdown.style.transform = isMobile ? 'scale(0.6)' : 'scale(1)';
      countdown.style.transformOrigin = 'center center';
      countdown.style.display = 'flex';
   }
};

updateCountdownState();
window.addEventListener('resize', updateCountdownState);

setInterval(() => {
  const now = Date.now();

  // Find the first date in the list that hasn't passed yet
  const nextTarget = targetDates.find(t => t > now);

  if (!nextTarget) {
    document.getElementById("countdown").innerHTML = "<h1>🎉 Yay :D</h1>";
    return;
  }

  const sec = Math.floor((nextTarget - now) / 1000);

  document.getElementById("days").textContent = Math.floor(sec / 86400);
  document.getElementById("hours").textContent = Math.floor(sec / 3600) % 24;
  document.getElementById("minutes").textContent = Math.floor(sec / 60) % 60;
  document.getElementById("seconds").textContent = sec % 60;
}, 1000);


// ######################################
document.addEventListener("mousemove", (e) => {
   const dot = document.createElement("div");
   dot.className = "trail";
   // dot.textContent = "☆";
   dot.style.left = e.clientX + "px";
   dot.style.top = e.clientY + "px";

   document.body.appendChild(dot);

   setTimeout(() => {
         dot.remove();
   }, 800);
   });


// ######################################
const colors = ['#fff8e7', '#6b6a68', '#5c6099', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
let confettiInterval = null;

function spawnConfettiPiece() {
   let container = document.getElementById('confetti');
   if (!container) {
      container = document.createElement('div');
      container.id = 'confetti';
      document.body.appendChild(container);
   }

   const piece = document.createElement('span');
   piece.style.left = Math.random() * 100 + '%';
   piece.style.background = colors[Math.floor(Math.random() * colors.length)];
   piece.style.animationDuration = (2 + Math.random() * 2) + 's';
   container.appendChild(piece);

   setTimeout(() => piece.remove(), 4000);
}

function startConfetti() {
   if (confettiInterval) return; // already running
   confettiInterval = setInterval(spawnConfettiPiece, 80);
}

function stopConfetti() {
   clearInterval(confettiInterval);
   confettiInterval = null;
   document.getElementById('confetti')?.remove();
}

// On every page load, check if the party is currently active
if (localStorage.getItem('partyActive') === 'true') {
   startConfetti();
}


// Party button only exists on the main page
const partyButton = document.getElementById('partyButton');
if (partyButton) {
   const updatePartyButtonState = () => {
      const isActive = localStorage.getItem('partyActive') === 'true';
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      partyButton.classList.toggle('is-active', isActive);
      partyButton.setAttribute('aria-pressed', String(isActive));
      partyButton.style.display = isMobile ? 'none' : 'inline-block';
   };

   partyButton.addEventListener('click', () => {
      const isActive = localStorage.getItem('partyActive') === 'true';
      const nextActive = !isActive;

      localStorage.setItem('partyActive', String(nextActive));
      updatePartyButtonState();

      if (nextActive) {
         startConfetti();
      } else {
         stopConfetti();
      }
   });

   updatePartyButtonState();
   window.addEventListener('resize', updatePartyButtonState);
}




// Disable mobile-unfriendly links on phones and small screens
const mobileDisabledLinks = Array.from(document.querySelectorAll('a[data-mobile-disabled="true"]'));

function updateMobileDisabledLinks() {
   const isMobile = window.matchMedia('(max-width: 768px)').matches;

   mobileDisabledLinks.forEach((link) => {
      const shouldDisable = isMobile;
      link.classList.toggle('is-disabled', shouldDisable);
      link.setAttribute('aria-disabled', String(shouldDisable));

      link.addEventListener('click', (event) => {
         if (shouldDisable) {
            event.preventDefault();
         }
      }, { once: true });
   });
}

if (mobileDisabledLinks.length > 0) {
   updateMobileDisabledLinks();
   window.addEventListener('resize', updateMobileDisabledLinks);
}