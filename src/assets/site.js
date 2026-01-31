(function () {
  var __yves95_currentAudio = null;

  function stopAllAudio() {
    try {
      if (__yves95_currentAudio) {
        __yves95_currentAudio.pause();
        __yves95_currentAudio.currentTime = 0;
      }
    } catch (e) {}
    __yves95_currentAudio = null;
  }

  function initCounter() {
    var el = document.getElementById("visitorCounter");
    if (!el) return;
    var key = "yves95_hits_v1";
    var n = parseInt(localStorage.getItem(key) || "0", 10);
    n = n + 1;
    localStorage.setItem(key, String(n));
    el.textContent = String(n);
  }

  function initEasterEgg() {
    var buf = "";
    var target = "E=MC2";
    document.addEventListener("keydown", function (e) {
      var ch = (e.key || "").toUpperCase();
      if (ch.length !== 1) return;
      buf = (buf + ch).slice(-target.length);
      if (buf === target) {
        stopAllAudio();
        window.location.href = "index-90s-banana-nl.html";
      }
    });
  }

  function initDialIn() {
    var btn = document.getElementById("playDial");
    if (!btn) return;
    var status = document.getElementById("dialStatus");
    function setStatus(t) { if (status) status.textContent = t; }

    btn.addEventListener("click", function () {
      stopAllAudio();
      setStatus("CONNECTING...");
      __yves95_currentAudio = new Audio("assets/retrosounds/the-sound-of-dial-up-internet-6240.wav");
      __yves95_currentAudio.loop = false;
      __yves95_currentAudio.preload = "auto";
      __yves95_currentAudio.play().then(function () {
        setTimeout(function () { setStatus("AUTH OK"); }, 1800);
      }).catch(function () {
        setStatus("AUDIO BLOCKED");
        alert("Audio blocked. Klik opnieuw of check je browser-instellingen.");
      });
    });
  }

  function initArcadeRandom() {
    var big = document.getElementById("arcadeBtn");
    var label = document.getElementById("retroLabel");
    if (!big) return;

    var sounds = ["assets/retrosounds/demo.wav", "assets/retrosounds/duke_nukem_time_to_kick_ass.wav", "assets/retrosounds/icq-uh-oh.wav", "assets/retrosounds/lemmings-lets-go.wav", "assets/retrosounds/msn-sound_1.wav", "assets/retrosounds/the-sound-of-dial-up-internet-6240.wav", "assets/retrosounds/windows-95-error-sound-effect.wav", "assets/retrosounds/yougotmail.wav"];
    function pick() { return sounds[Math.floor(Math.random() * sounds.length)]; }

    big.addEventListener("click", function () {
      if (!sounds.length) {
        if (label) label.textContent = "Geen sounds gevonden in assets/retrosounds/";
        return;
      }
      stopAllAudio();
      var current = pick();
      __yves95_currentAudio = new Audio(current);
      __yves95_currentAudio.loop = false;
      __yves95_currentAudio.preload = "auto";
      __yves95_currentAudio.play().then(function () {
        if (label) label.innerHTML = "Arcade: <b>" + current.split("/").pop() + "</b>";
      }).catch(function () {
        if (label) label.textContent = "AUDIO BLOCKED (klik opnieuw)";
        alert("Audio blocked. Klik opnieuw of check je browser-instellingen.");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCounter();
    initEasterEgg();
    initDialIn();
    initArcadeRandom();

    // ultra-netjes: stop sounds on navigation
    window.addEventListener("beforeunload", stopAllAudio);
    window.addEventListener("pagehide", stopAllAudio);

    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
      links[i].addEventListener("click", stopAllAudio);
    }
  });
})();
