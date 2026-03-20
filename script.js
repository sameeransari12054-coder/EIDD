(function() {
  // ------------------------------
  // DOM elements
  const lockContainer = document.getElementById('lockScreenContainer');
  const eidPage = document.getElementById('eidMainPage');
  const unlockBtn = document.getElementById('unlockBtn');
  const passwordInput = document.getElementById('passwordInput');
  const hintBtn = document.getElementById('hintBtn');
  const errorDiv = document.getElementById('errorMsg');
  
  // Password (case-sensitive as per requirement: "Sameer")
  const CORRECT_PASSWORD = "Sameer";
  
  // Photo handling
  const photoInput = document.getElementById('photoInput');
  const displayImage = document.getElementById('displayImage');
  
  // Audio handling
  const audioPlayer = document.getElementById('audioPlayer');
  const uploadAudioBtn = document.getElementById('uploadAudioBtn');
  const audioFileInput = document.getElementById('audioFileInput');
  
  // ----- UNLOCK FUNCTION -----
  function unlockPage() {
    const enteredPassword = passwordInput.value.trim();
    if (enteredPassword === CORRECT_PASSWORD) {
      // correct password: hide lock screen, show eid page
      lockContainer.style.display = 'none';
      eidPage.style.display = 'block';
      // add a tiny animation on body
      document.body.style.background = "linear-gradient(145deg, #ffb7c5, #ffa5bc)";
      errorDiv.innerHTML = ""; // clear any error
    } else {
      errorDiv.innerHTML = '<div class="error-msg">💔 Wrong password, sweetheart! Try again 💔</div>';
      // shake effect on lock container
      lockContainer.style.transform = "translateX(4px)";
      setTimeout(() => { lockContainer.style.transform = ""; }, 150);
      passwordInput.value = "";
      passwordInput.focus();
    }
  }
  
  // Hint display: alert with clue
  function showHint() {
    alert("✨ Hint: The password is my name as you call me with love ✨\n💖 It starts with 'S' and ends with 'r' ... Sameer 💖");
  }
  
  // Add event listeners for unlock
  unlockBtn.addEventListener('click', unlockPage);
  passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      unlockPage();
    }
  });
  hintBtn.addEventListener('click', showHint);
  
  // ----- PHOTO UPLOAD (any photo from girlfriend's choice) -----
  photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        displayImage.src = e.target.result;
        // add small sweet animation effect
        const frame = document.querySelector('.photo-frame');
        frame.style.transform = "scale(0.98)";
        setTimeout(() => { frame.style.transform = ""; }, 200);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Please select an image file (jpg, png, etc) 🌸");
    }
  });
  
  // ----- AUDIO UPLOAD (any custom audio) -----
  uploadAudioBtn.addEventListener('click', function() {
    audioFileInput.click();
  });
  
  audioFileInput.addEventListener('change', function(event) {
    const audioFile = event.target.files[0];
    if (audioFile && audioFile.type.startsWith('audio/')) {
      const audioUrl = URL.createObjectURL(audioFile);
      audioPlayer.src = audioUrl;
      audioPlayer.load();
      // Show little message
      const msgDiv = document.createElement('div');
      msgDiv.textContent = "🎵 New audio loaded! Tap play to enjoy 🎵";
      msgDiv.style.fontSize = "0.7rem";
      msgDiv.style.color = "#c94f7c";
      msgDiv.style.marginTop = "6px";
      const audioContainer = document.querySelector('.audio-player');
      let oldMsg = audioContainer.querySelector('.audio-notify');
      if(oldMsg) oldMsg.remove();
      msgDiv.classList.add('audio-notify');
      audioContainer.appendChild(msgDiv);
      setTimeout(() => { msgDiv.remove(); }, 3000);
    } else if (audioFile) {
      alert("Please select an audio file (mp3, wav, etc) 🎶");
    }
  });
  
  // set initial beautiful placeholder
  const defaultImgData = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFC0CB'/%3E%3Ctext x='50%25' y='45%25' font-size='24' fill='%23b13b6b' text-anchor='middle' font-family='monospace'%3E🌙✨❤️%3C/text%3E%3Ctext x='50%25' y='65%25' font-size='18' fill='%23994d6e' text-anchor='middle'%3EUpload Your Eid Photo%3C/text%3E%3C/svg%3E";
  displayImage.src = defaultImgData;
  
  // Extra Animations on Eid page (dynamic floating elements)
  function addFloatingEmojis() {
    const eidDiv = eidPage;
    if(!eidDiv) return;
    setInterval(() => {
      if(eidDiv.style.display === 'block') {
        const emojiSpan = document.createElement('div');
        const emojis = ['🌙', '✨', '💖', '🌸', '🕌', '⭐', '🌹', '🎉'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emojiSpan.innerText = randomEmoji;
        emojiSpan.style.position = 'fixed';
        emojiSpan.style.bottom = '-20px';
        emojiSpan.style.left = Math.random() * 90 + '%';
        emojiSpan.style.fontSize = Math.random() * 20 + 20 + 'px';
        emojiSpan.style.opacity = '0.7';
        emojiSpan.style.pointerEvents = 'none';
        emojiSpan.style.zIndex = '999';
        emojiSpan.style.animation = 'floatUp 4s forwards';
        document.body.appendChild(emojiSpan);
        setTimeout(() => { emojiSpan.remove(); }, 4000);
      }
    }, 1800);
  }
  
  addFloatingEmojis();
  
  // Additional feature: when eid page is visible, change title and background
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mut) {
      if (eidPage.style.display === 'block') {
        document.title = "✨ Eid Mubarak My Love ✨";
        document.body.style.background = "linear-gradient(145deg, #ffb7c2, #ff9bb0)";
      } else if (lockContainer.style.display !== 'none') {
        document.title = "🔒 Eid Surprise Locked 🔒";
        document.body.style.background = "linear-gradient(145deg, #ffc0cb, #ffb6c1)";
      }
    });
  });
  observer.observe(eidPage, { attributes: true, attributeFilter: ['style'] });
  observer.observe(lockContainer, { attributes: true, attributeFilter: ['style'] });
  
  // For seamless first load: ensure lock screen visible, eid page hidden
  lockContainer.style.display = 'flex';
  eidPage.style.display = 'none';
  
  // Creating a little love easter egg: if someone double clicks on lock icon or eid greeting.
  const lockIconDiv = document.querySelector('.lock-icon');
  if(lockIconDiv) {
    lockIconDiv.addEventListener('dblclick', function() {
      alert("💗 Missing you already! Eid Mubarak, my everything 💗");
    });
  }
  
  // on eid page, double click on greeting text shows special message
  const greetingElem = document.querySelector('.greeting-text');
  if(greetingElem) {
    greetingElem.addEventListener('dblclick', function() {
      alert("🌙 You're the moon of my Eid! So grateful for you 🌙");
    });
  }
  
  // Add an option to reset any leftover error on focus
  passwordInput.addEventListener('focus', () => {
    errorDiv.innerHTML = "";
  });
  
  // Style audio player controls with pinkish
  const audioElem = document.querySelector('audio');
  if(audioElem) {
    audioElem.style.backgroundColor = "#ffe0eb";
    audioElem.style.borderRadius = "50px";
  }
  
  // Add some floating interactive hearts on eid page when clicking love note
  const loveNoteDiv = document.querySelector('.love-note');
  if(loveNoteDiv) {
    loveNoteDiv.addEventListener('click', function() {
      const heartSpan = document.createElement('span');
      heartSpan.innerHTML = '💖';
      heartSpan.style.position = 'absolute';
      heartSpan.style.left = '50%';
      heartSpan.style.top = '50%';
      heartSpan.style.fontSize = '40px';
      heartSpan.style.pointerEvents = 'none';
      heartSpan.style.animation = 'floatUp 1.2s forwards';
      heartSpan.style.zIndex = '999';
      document.body.appendChild(heartSpan);
      setTimeout(() => heartSpan.remove(), 1200);
    });
  }
  
  console.log("Eid Mubarak! All ready for my love 💕");
})();