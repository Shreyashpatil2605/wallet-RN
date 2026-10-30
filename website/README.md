# Wallet — Android Mobile Application Landing Page 🚀

Production-grade, high-conversion landing website for the **Wallet** mobile application for Android.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons** following modern fintech aesthetics (dark navy theme, glowing emerald & violet accents, responsive glass cards, and realistic mobile interface previews).

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler & Dev Server**: Vite 5
- **Styling**: Tailwind CSS 3 with custom gradients and glassmorphism utilities
- **Icons**: Lucide React
- **Animations**: CSS transitions + accessible `prefers-reduced-motion` compliance

---

## 📁 Project Structure

```
website/
├── public/
│   ├── assets/              # Authentic Wallet app branding (logo.png, icon.png, etc.)
│   ├── downloads/           # Optional local APK release folder
│   │   └── README.md
│   └── _redirects           # Netlify SPA redirect rules
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky nav with mobile drawer & quick download button
│   │   ├── Hero.jsx             # Headline, CTAs, Android badges & phone mockup
│   │   ├── Features.jsx         # 6 feature cards matching real app code + category demo
│   │   ├── AppPreview.jsx       # Interactive smartphone preview (Home, Create, Manage, Auth)
│   │   ├── HowToInstall.jsx     # 3-step installation walkthrough + security notice
│   │   ├── DownloadSection.jsx  # Primary download CTA, version info, specs & validation
│   │   ├── ConfigGuideModal.jsx # Guidance modal shown when APK URL is being configured
│   │   ├── PrivacyModal.jsx     # Editable privacy policy template with maintainer notes
│   │   └── Footer.jsx           # Brand, dynamic copyright, social & privacy links
│   ├── config/
│   │   └── appConfig.js         # Single source of truth for app metadata & download URLs
│   ├── data/
│   │   ├── featuresData.js      # App features and sample transactions
│   │   └── installStepsData.js  # Steps and security notices
│   ├── App.jsx                  # Main application composition
│   ├── index.css                # Tailwind directives, custom scrollbars & glassmorphism
│   └── main.jsx                 # React root mount
├── .env.example                 # Template for environment variables
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Theme configuration
├── vercel.json                  # Vercel SPA routing configuration
└── vite.config.js               # Vite bundler configuration
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd website
npm install
```

*(Or from the repository root: `npm --prefix website install`)*

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
The compiled, optimized static assets will be output to `website/dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 📲 Connecting the Real APK Download URL

The download button uses the centralized configuration in `src/config/appConfig.js`.

### Option A: Public CDN / GitHub Releases (Recommended)
1. Upload your signed Android APK to GitHub Releases, AWS S3, Cloudflare R2, or Firebase Storage.
2. Create a `.env` file inside `website/`:
   ```env
   VITE_APK_URL=https://github.com/Shreyashpatil2605/wallet-RN/releases/download/v1.0.0/wallet-v1.0.0.apk
   VITE_APK_SHA256=optional_sha256_checksum_here
   ```
3. Rebuild or restart the dev server: `npm run build`

### Option B: Local Static APK File
1. Place your compiled APK into:
   ```
   website/public/downloads/wallet-v1.0.0.apk
   ```
2. Create or update `website/.env`:
   ```env
   VITE_APK_URL=/downloads/wallet-v1.0.0.apk
   ```

> **Note**: If `VITE_APK_URL` is omitted or left empty, clicking the download button displays an informative configuration guide modal rather than attempting a fake or broken download.

---

## 🔄 Updating App Version & Replacing the APK

When you release an update:
1. Open `src/config/appConfig.js`.
2. Update the version details:
   ```javascript
   appVersion: "1.1.0",
   releaseDate: "November 2026",
   apkFileName: "wallet-v1.1.0.apk",
   apkSize: "~29.1 MB",
   ```
3. Update `VITE_APK_URL` in `.env` (or in your hosting provider's dashboard) with the new link.
4. Run `npm run build` and redeploy.

---

## 🚀 Deployment Guide

### Deploying to Vercel
1. Import your GitHub repository into Vercel.
2. In the Project Settings:
   - **Root Directory**: `website`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Under **Environment Variables**, add:
   - `VITE_APK_URL` = your live APK URL
4. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository on Netlify.
2. Configure build settings:
   - **Base directory**: `website`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add the `VITE_APK_URL` environment variable under Site Configuration.
4. Click **Deploy Site**. The `website/public/_redirects` file handles SPA routing automatically.

---

## 🔒 Security & Privacy Notes

- **No Fake Claims**: The website strictly highlights features verified in the actual mobile codebase (Clerk email authentication, live balance calculation, categorized income/expense creation, and transaction deletion).
- **Google Play Warning Transparency**: Clear, honest installation steps explain Android's standard installation prompt without telling users to disable Google Play Protect.
- **Privacy Policy**: Includes an editable privacy policy template highlighting data handling and contact points.
