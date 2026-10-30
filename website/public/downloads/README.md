# Local APK Directory

If you prefer to distribute your Android APK directly through this website rather than an external CDN or GitHub Releases:

1. Build your release APK in your mobile project:
   ```bash
   cd mobile
   npx eas-cli build --platform android --profile preview
   # or local gradle build:
   cd android && ./gradlew assembleRelease
   ```

2. Copy the resulting `.apk` file into this directory:
   `website/public/downloads/wallet-v1.0.0.apk`

3. In your `website/.env` file, set:
   ```env
   VITE_APK_URL=/downloads/wallet-v1.0.0.apk
   ```

> **Note**: For large APK files (> 50MB), it is recommended to host the APK on GitHub Releases or a cloud CDN (such as Cloudflare R2 or AWS S3) to keep your web repository lightweight.
