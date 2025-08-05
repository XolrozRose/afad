// gifs.js
const gifLinks = [
  "https://files.catbox.moe/kclmpj.gif",
  "https://files.catbox.moe/zsz7uq.gif",
  "https://files.catbox.moe/806mxd.gif",
  "https://files.catbox.moe/2yxtbb.gif",
  "https://files.catbox.moe/7t3672.gif",
  "https://files.catbox.moe/0dtbhd.gif",
  "https://files.catbox.moe/btpekh.gif",
  "https://files.catbox.moe/7nbcm0.gif",
  "https://files.catbox.moe/3sevpn.gif",
  "https://files.catbox.moe/sfyj90.gif",
  "https://files.catbox.moe/9uhl8y.webp",
  "https://files.catbox.moe/kyueot.gif",
  "https://files.catbox.moe/5h5com.gif",
  "https://files.catbox.moe/ja3c1a.webp",
  "https://files.catbox.moe/nrtd39.webp",
  "https://files.catbox.moe/8ldcjc.gif",
  "https://files.catbox.moe/uyv5i2.gif",
  "https://files.catbox.moe/palxyo.gif",
  "https://files.catbox.moe/vsk4mq.gif",
  "https://files.catbox.moe/4664lh.gif"
];
// Build the scrolling banner images dynamically from gifLinks array.
    function buildScrollingBanner() {
      const track = document.getElementById("track");
      track.innerHTML = "";

      // Create img elements for each GIF, then duplicate them for seamless looping
      function createImgs() {
        return gifLinks.map(url => {
          const img = document.createElement("img");
          img.src = url;
          img.alt = "scrolling gif";
          img.draggable = false;
          return img;
        });
      }

      // Append original + duplicate for seamless loop
      const imgs1 = createImgs();
      const imgs2 = createImgs();

      imgs1.forEach(img => track.appendChild(img));
      imgs2.forEach(img => track.appendChild(img.cloneNode()));
    }

    buildScrollingBanner();

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function openWindow(id) {
      document.getElementById(id).style.display = "block";
    }

    function closeWindow(id) {
      document.getElementById(id).style.display = "none";
    }

    function openYouTube() {
      const ytLink = document.getElementById("ytLink").textContent.trim();
      const ytWindow = document.getElementById("ytWindow");
      const ytTitle = document.getElementById("ytTitle");
      const ytFrame = document.getElementById("ytFrame");

      ytTitle.innerHTML = `<img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-5.png" alt="icon" /> ${ytLink}`;

      const win1 = document.getElementById("win1");
      const left = win1.offsetLeft + win1.offsetWidth + 10;
      const top = win1.offsetTop;
      ytWindow.style.left = `${left}px`;
      ytWindow.style.top = `${top}px`;

      ytWindow.style.display = "block";
      ytFrame.src = "https://www.youtube.com/embed/lMEt3RdqB9Y?autoplay=1";
    }

    function closeYouTubeWindow() {
      const ytWindow = document.getElementById("ytWindow");
      const ytFrame = document.getElementById("ytFrame");
      ytWindow.style.display = "none";
      ytFrame.src = "";
    }

    let offsetX, offsetY, dragTarget = null;

    function startDragWindow(e, id) {
      dragTarget = document.getElementById(id);
      offsetX = e.clientX - dragTarget.offsetLeft;
      offsetY = e.clientY - dragTarget.offsetTop;
      document.addEventListener("mousemove", dragMoveWindow);
      document.addEventListener("mouseup", stopDragWindow);
      e.preventDefault();
    }

    function dragMoveWindow(e) {
      if (dragTarget) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const width = dragTarget.offsetWidth;
        const height = dragTarget.offsetHeight;
        const left = clamp(e.clientX - offsetX, 0, viewportWidth - width);
        const top = clamp(e.clientY - offsetY, 0, viewportHeight - height);
        dragTarget.style.left = `${left}px`;
        dragTarget.style.top = `${top}px`;
      }
    }

    function stopDragWindow() {
      document.removeEventListener("mousemove", dragMoveWindow);
      document.removeEventListener("mouseup", stopDragWindow);
      dragTarget = null;
    }

    let iconBeingDragged = null, iconOffsetX = 0, iconOffsetY = 0;
    const icon1 = document.getElementById("icon1");

    icon1.addEventListener("mousedown", function (e) {
      iconBeingDragged = icon1;
      iconOffsetX = e.clientX - icon1.offsetLeft;
      iconOffsetY = e.clientY - icon1.offsetTop;
      document.addEventListener("mousemove", dragIcon);
      document.addEventListener("mouseup", dropIcon);
      e.preventDefault();
    });

    function dragIcon(e) {
      if (iconBeingDragged) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const width = iconBeingDragged.offsetWidth;
        const height = iconBeingDragged.offsetHeight;
        const left = clamp(e.clientX - iconOffsetX, 0, viewportWidth - width);
        const top = clamp(e.clientY - iconOffsetY, 0, viewportHeight - height);
        iconBeingDragged.style.left = `${left}px`;
        iconBeingDragged.style.top = `${top}px`;
      }
    }

    function dropIcon() {
      document.removeEventListener("mousemove", dragIcon);
      document.removeEventListener("mouseup", dropIcon);
      iconBeingDragged = null;
    }
