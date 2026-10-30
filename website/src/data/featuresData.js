import {
  Wallet,
  ArrowUpDown,
  PieChart,
  ShieldCheck,
  Smartphone,
  Trash2,
  RefreshCw,
  Tag,
  TrendingUp,
  Receipt
} from 'lucide-react';

export const featuresData = [
  {
    id: 'balance-summary',
    icon: Wallet,
    title: 'Real-Time Balance Overview',
    description:
      'View your total net balance updated instantly with clear, side-by-side breakdowns for total income and total expenses.',
    badge: 'Core Metric',
    color: 'emerald',
    details: [
      'Instant net balance calculation',
      'Dedicated green income and red expense trackers',
      'Smooth pull-to-refresh data sync'
    ]
  },
  {
    id: 'categorization',
    icon: Tag,
    title: 'Intuitive Categorization',
    description:
      'Organize your money across structured categories including Food & Drinks, Shopping, Bills, Transport, and Entertainment.',
    badge: 'Organized',
    color: 'purple',
    details: [
      'Standardized categories with identifiable icons',
      'Quick single-tap category selection',
      'Clear transaction classification'
    ]
  },
  {
    id: 'quick-logging',
    icon: ArrowUpDown,
    title: 'Rapid Transaction Logging',
    description:
      'Log expenses or income in seconds. Toggle between transaction types, enter the amount, assign a label, and save immediately.',
    badge: 'Fast',
    color: 'cyan',
    details: [
      'One-tap switch between Income and Expense',
      'Real-time input validation',
      'Immediate reflection in your home balance'
    ]
  },
  {
    id: 'history-management',
    icon: Trash2,
    title: 'Transaction Management',
    description:
      'Keep full control over your financial records. Easily review past entries and delete outdated or erroneous transactions with automatic balance adjustments.',
    badge: 'Control',
    color: 'indigo',
    details: [
      'Chronological activity list',
      'Safe deletion with confirmation modal',
      'Instant balance recalculation upon removal'
    ]
  },
  {
    id: 'secure-auth',
    icon: ShieldCheck,
    title: 'Email & Passcode Authentication',
    description:
      'Secure email-based account sign-in and registration powered by Clerk with verification codes for peace of mind.',
    badge: 'Account Security',
    color: 'emerald',
    details: [
      'Clerk-powered email authentication flow',
      '6-digit verification code security',
      'Fast session restoration and safe sign-out'
    ]
  },
  {
    id: 'android-native',
    icon: Smartphone,
    title: 'Native Android Performance',
    description:
      'Engineered with modern React Native and Expo for a lightweight, fluid experience on Android devices running Android 8.0 and above.',
    badge: 'Optimized',
    color: 'purple',
    details: [
      'Lightweight bundle with minimal device overhead',
      'Native gestures and responsive UI components',
      'Edge-to-edge layout support'
    ]
  }
];

export const previewCategories = [
  { name: 'Food & Drinks', icon: '🍽️', count: '14 items', sum: '-₹3,420' },
  { name: 'Shopping', icon: '🛍️', count: '6 items', sum: '-₹6,800' },
  { name: 'Bills', icon: '📄', count: '4 items', sum: '-₹4,250' },
  { name: 'Transportation', icon: '🚗', count: '12 items', sum: '-₹1,680' },
  { name: 'Entertainment', icon: '🎬', count: '3 items', sum: '-₹1,200' },
  { name: 'Income', icon: '💰', count: '2 items', sum: '+₹45,000' }
];

export const sampleTransactions = [
  {
    id: 1,
    title: 'Monthly Salary',
    category: 'Income',
    amount: '+₹45,000.00',
    type: 'income',
    date: 'Yesterday, 5:30 PM',
    icon: 'TrendingUp'
  },
  {
    id: 2,
    title: 'Grocery Supermart',
    category: 'Food & Drinks',
    amount: '-₹2,450.00',
    type: 'expense',
    date: 'Today, 2:15 PM',
    icon: 'Receipt'
  },
  {
    id: 3,
    title: 'Electricity & Internet Bill',
    category: 'Bills',
    amount: '-₹1,850.00',
    type: 'expense',
    date: 'Oct 26, 11:20 AM',
    icon: 'Receipt'
  },
  {
    id: 4,
    title: 'Weekend Dining Out',
    category: 'Food & Drinks',
    amount: '-₹1,200.00',
    type: 'expense',
    date: 'Oct 24, 8:45 PM',
    icon: 'Receipt'
  }
];
