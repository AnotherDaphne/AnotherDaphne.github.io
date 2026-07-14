const targetDate = new Date("August 4, 2026 14:45:00").getTime();
   setInterval(() => {
   let diff = targetDate - Date.now();

   if (diff <= 0) {
      document.getElementById("countdown").innerHTML = "<h1>🎉 Yay :D</h1>";
      return;
   }
   const sec = Math.floor(diff / 1000);

   document.getElementById("days").textContent = Math.floor(sec / 86400);
   document.getElementById("hours").textContent = Math.floor(sec / 3600) % 24;
   document.getElementById("minutes").textContent = Math.floor(sec / 60) % 60;
   document.getElementById("seconds").textContent = sec % 60;
   }, 1000);


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
      partyButton.classList.toggle('is-active', isActive);
      partyButton.setAttribute('aria-pressed', String(isActive));
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
}