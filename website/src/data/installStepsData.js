export const installStepsData = [
  {
    stepNumber: '01',
    title: 'Download the Wallet APK',
    description:
      'Tap the "Download APK" button on this website to save the verified application package to your Android device.',
    tip: 'The APK is downloaded directly from our official release source.'
  },
  {
    stepNumber: '02',
    title: 'Open the Downloaded APK',
    description:
      'When the download completes, tap the notification in your status bar, or open your device’s "Downloads" folder and select the file.',
    tip: 'File name will resemble wallet-v1.0.0.apk.'
  },
  {
    stepNumber: '03',
    title: 'Allow Installation from this Source',
    description:
      'If prompted with "Install unknown apps", tap Settings, turn on the toggle for your browser or file manager, return to the installer, and tap Install.',
    tip: 'This permission is granted only for your chosen app source.'
  }
];

export const securityNote = {
  title: 'Standard Android Installation Notice',
  content:
    'Android displays a routine prompt when installing applications outside of Google Play Store. This is an expected security notice designed to confirm user consent. Wallet runs without requesting root access or invasive device permissions. You do not need to disable Google Play Protect.',
  bulletPoints: [
    'Direct release package directly from the project repository',
    'No invasive system permissions required',
    'Keep Google Play Protect enabled at all times'
  ]
};
