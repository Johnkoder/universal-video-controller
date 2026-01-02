# 2x Video Speed Toggle - Brave/Chrome Extension

A simple browser extension that toggles video playback speed between **2x** and **normal (1x)** with a single keypress. Works on any website including YouTube, LinkedIn Learning, Vimeo, and more.

## Features

- 🎬 Works on **any website** with video content
- ⌨️ Press **X** to toggle between 2x and normal speed
- 🔔 Visual notification shows current speed
- 🔄 Automatically applies to dynamically loaded videos (YouTube, SPAs)
- 🎯 Smart detection - won't trigger while typing in input fields
- 📺 Works with iframes and embedded videos

## Installation

### For Brave Browser:
1. Open Brave and go to `brave://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select this extension folder
5. Done! The extension is now active

### For Chrome:
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select this extension folder
5. Done!

## Usage

1. Go to any website with a video (YouTube, LinkedIn Learning, etc.)
2. Press **X** on your keyboard to toggle 2x speed
3. Press **X** again to return to normal speed
4. A notification will appear showing the current speed

## Customization

To change the toggle key, edit `content.js` and modify this line:

```javascript
const TOGGLE_KEY = 'x'; // Change to any key you prefer
```

To change the fast speed, modify:

```javascript
const FAST_SPEED = 2.0; // Change to 1.5, 2.5, 3.0, etc.
```

## Notes

- The toggle key won't work while typing in text inputs or textareas
- Speed persists until you toggle it back or refresh the page
- Works with videos loaded after page load (e.g., YouTube's infinite scroll)

## License

MIT License - Feel free to modify and share!