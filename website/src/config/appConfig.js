/**
 * Centralized Application & APK Configuration
 *
 * This configuration controls app metadata, APK download URLs,
 * versioning, and environment-driven releases.
 *
 * To connect a real APK:
 * 1. Define VITE_APK_URL in your .env or hosting environment variables:
 *    VITE_APK_URL=https://github.com/user/wallet-RN/releases/download/v1.0.0/wallet-v1.0.0.apk
 * 2. OR place the compiled APK in website/public/downloads/wallet-v1.0.0.apk
 *    and set VITE_APK_URL=/downloads/wallet-v1.0.0.apk
 */

export const appConfig = {
  // Brand & App Identity
  appName: "Wallet",
  appTagline: "Your Money. Your Control.",
  appDescription:
    "A clean, modern mobile expense tracker to record transactions, monitor balances, and take control of your financial health on Android.",

  // Version & Release Information (matches mobile/app.json)
  appVersion: "1.0.0",
  releaseDate: "October 2026",
  minAndroidVersion: "Android 8.0 (API 26) or later",
  packageName: "com.shreeeeeyash.mobile",
  apkFileName: "wallet-v1.0.0.apk",
  
  // APK File Size (estimated or exact when known)
  apkSize: "~28 MB",

  // Download Target
  // If VITE_APK_URL is provided, it takes precedence.
  // Otherwise, default to empty string so the UI can provide clear setup instructions.
  apkUrl: import.meta.env.VITE_APK_URL || "",

  // Optional Checksum (SHA-256) for release verification
  apkSha256: import.meta.env.VITE_APK_SHA256 || "",

  // Contact & Social Links
  contactEmail: "shreyashpatil.dev@gmail.com", // Editable contact email placeholder
  githubRepoUrl: "https://github.com/Shreyashpatil2605/wallet-RN",

  // Verification helper
  isApkConfigured() {
    return Boolean(this.apkUrl && this.apkUrl.trim().length > 0);
  },

  // Resolve download URL (handles relative or external URLs)
  getDownloadUrl() {
    if (!this.isApkConfigured()) return null;
    return this.apkUrl.trim();
  }
};

export default appConfig;
