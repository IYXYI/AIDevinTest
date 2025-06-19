# Countdown Clock Web App 🕐

A simple, interactive countdown clock web application with a winner popup and confetti effect.

## Features

- ⏰ **1-minute countdown timer** with real-time display
- 🎯 **Interactive button** that becomes enabled when countdown finishes
- 🎉 **Winner popup** with confetti animation
- 📱 **Responsive design** that works on all devices
- ✨ **Modern UI** with gradient backgrounds and smooth animations

## How It Works

1. The page loads with a 1-minute countdown timer (01:00)
2. The "Click me" button is initially disabled
3. When the countdown reaches 00:00:
   - The button becomes enabled and changes to "CLICK ME TO WIN!"
   - The countdown display turns green with a pulsing animation
4. Click the enabled button to see the winner popup with confetti! 🎊

## Files Structure

```
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # JavaScript functionality
└── .github/workflows/
    └── build.yml       # CI/CD pipeline
```

## Local Development

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Or serve it locally:
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

## CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that:

- ✅ **Runs automated tests** using Playwright
- ✅ **Validates HTML structure** and JavaScript syntax
- ✅ **Tests all functionality** (countdown, button states, popup)
- 🚀 **Deploys to GitHub Pages** automatically

## GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy on every push to main

## Testing

The app includes comprehensive tests that verify:
- Page loads correctly with all elements
- Countdown timer updates properly
- Button is disabled initially and enabled after countdown
- Winner popup appears when button is clicked after countdown
- Popup can be closed properly

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox, gradients, and animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **GitHub Actions** - CI/CD pipeline
- **Playwright** - End-to-end testing

## Browser Support

Works in all modern browsers including:
- Chrome/Chromium
- Firefox
- Safari
- Edge

---

🎮 **Try it live**: [GitHub Pages URL will be available after Pages is enabled]