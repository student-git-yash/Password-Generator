# Password-Generator
---

## 🔑 Password Generator - Extension

A modern, and secure extension designed for fast and customizable password generation directly inside your browser popup. Built strictly to **Manifest V3** standards.

---
## 🚀 Features

* **Adjustable Length**: Set your preferred password length between **8 and 12 characters** using a dynamic range slider.


* **Reordered Character Sets**: Quickly toggle options for **Uppercase**, **Numbers**, **Lowercase**, and **Symbols** to fit specific requirements.


* **Real-time Strength Indicator**: Displays dynamic visual feedback and strength ratings (Weak/Medium/Strong) as settings change.


* **One-Click Copy**: Includes a custom SVG vector button for copying generated passwords to the clipboard with temporary feedback notifications.


* **Persistent Preferences**: Automatically saves your selected options via `chrome.storage.local` so your settings are remembered.
---
## 📁 Project Structure

```text
password-generator/
├── manifest.json   # Extension metadata and permissions (Manifest V3)
├── popup.html      # Popup UI structure with inline SVG icon
├── popup.css       # Clean layout styling and theme variables
└── popup.js        # Logic for generator, strength calculation, and storage

```

---

## 📥 Installation & Setup

Follow these steps to load the unpacked extension directly into Google Chrome:

1. **Download/Prepare Files**:
Create a folder named `password-generator` on your computer and place `manifest.json`, `popup.html`, `popup.css`, and `popup.js` inside it.


2. **Open Extensions Page**:
Open Google Chrome, navigate to `chrome://extensions` in the address bar, and press Enter.


3. **Enable Developer Mode**:
Toggle the **Developer mode** switch in the top-right corner to **ON**.


4. **Load Unpacked Extension**:
Click the **Load unpacked** button in the top-left toolbar and select your `password-generator` folder.


5. **Pin and Use**:
Click the **puzzle piece icon** next to the address bar, locate **Password Generator**, and click the Pin icon for quick access.
---
