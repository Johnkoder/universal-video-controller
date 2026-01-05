// 2x Video Speed Toggle Extension
// Press 'X' to toggle between 2x speed and normal speed

(function() {
  'use strict';

  let isDoubleSpeed = false;
  const TOGGLE_KEY = 'x'; // Change this to any key you prefer
  const PAUSE_KEY = 'z'; // Press 'Z' to pause/play
  const FAST_SPEED = 2.0;
  const NORMAL_SPEED = 1.0;

  // Get all videos on the page (including dynamically added ones)
  function getAllVideos() {
    // Get regular video elements
    const videos = Array.from(document.querySelectorAll('video'));
    
    // Also check shadow DOMs (some sites like YouTube use them)
    const shadowHosts = document.querySelectorAll('*');
    shadowHosts.forEach(host => {
      if (host.shadowRoot) {
        const shadowVideos = host.shadowRoot.querySelectorAll('video');
        videos.push(...shadowVideos);
      }
    });
    
    return videos;
  }

  // Set speed for all videos
  function setAllVideosSpeed(speed) {
    const videos = getAllVideos();
    videos.forEach(video => {
      video.playbackRate = speed;
    });
    return videos.length;
  }

  // Toggle speed between 2x and normal
  function toggleSpeed() {
    isDoubleSpeed = !isDoubleSpeed;
    const newSpeed = isDoubleSpeed ? FAST_SPEED : NORMAL_SPEED;
    const videoCount = setAllVideosSpeed(newSpeed);
    
    // Show visual feedback
    showNotification(newSpeed, videoCount);
    
    console.log(`[2x Toggle] Speed set to ${newSpeed}x (${videoCount} video(s) affected)`);
  }

  // Toggle pause/play for all videos
  function togglePause() {
    const videos = getAllVideos();
    let pausedCount = 0;
    let playedCount = 0;
    
    videos.forEach(video => {
      if (video.paused) {
        video.play();
        playedCount++;
      } else {
        video.pause();
        pausedCount++;
      }
    });
    
    const isPaused = pausedCount > playedCount;
    showPauseNotification(isPaused, videos.length);
    
    console.log(`[2x Toggle] ${isPaused ? 'Paused' : 'Playing'} (${videos.length} video(s) affected)`);
  }

  // Create and show pause notification
  function showPauseNotification(isPaused, videoCount) {
    const existing = document.getElementById('speed-toggle-notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'speed-toggle-notification';
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px;">${isPaused ? '⏸️' : '▶️'}</span>
        <div>
          <div style="font-weight: bold;">${isPaused ? 'Paused' : 'Playing'}</div>
          <div style="font-size: 12px; opacity: 0.8;">${videoCount} video(s)</div>
        </div>
      </div>
    `;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: isPaused ? '#9c27b0' : '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      zIndex: '2147483647',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'opacity 0.3s ease',
      opacity: '1'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 1500);
  }

  // Create and show notification
  function showNotification(speed, videoCount) {
    // Remove existing notification if any
    const existing = document.getElementById('speed-toggle-notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'speed-toggle-notification';
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px;">${speed === FAST_SPEED ? '⏩' : '▶️'}</span>
        <div>
          <div style="font-weight: bold;">${speed}x Speed</div>
          <div style="font-size: 12px; opacity: 0.8;">${videoCount} video(s)</div>
        </div>
      </div>
    `;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: speed === FAST_SPEED ? '#ff6b35' : '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      zIndex: '2147483647',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'opacity 0.3s ease',
      opacity: '1'
    });

    document.body.appendChild(notification);

    // Fade out and remove after 1.5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 1500);
  }

  // Listen for keypress
  document.addEventListener('keydown', (event) => {
    // Don't trigger if user is typing in an input field
    const activeElement = document.activeElement;
    const isTyping = activeElement.tagName === 'INPUT' || 
                     activeElement.tagName === 'TEXTAREA' || 
                     activeElement.isContentEditable ||
                     activeElement.getAttribute('contenteditable') === 'true';
    
    if (isTyping) {
      return;
    }

    // Check if the toggle key was pressed (without modifiers for clean toggle)
    if (event.key.toLowerCase() === TOGGLE_KEY && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      toggleSpeed();
    }
    
    // Check if the pause key was pressed
    if (event.key.toLowerCase() === PAUSE_KEY && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      togglePause();
    }
  }, true);

  // Handle dynamically loaded videos (for SPAs like YouTube)
  const observer = new MutationObserver((mutations) => {
    if (isDoubleSpeed) {
      // If we're in double speed mode, ensure new videos also get the speed
      setAllVideosSpeed(FAST_SPEED);
    }
  });

  // Start observing for new videos
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also handle videos that might load later via other means
  document.addEventListener('play', (event) => {
    if (event.target.tagName === 'VIDEO' && isDoubleSpeed) {
      event.target.playbackRate = FAST_SPEED;
    }
  }, true);

  console.log('[2x Toggle] Extension loaded. Press "X" to toggle video speed, "Z" to pause/play.');
})();
