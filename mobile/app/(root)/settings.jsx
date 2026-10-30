import { useUser, useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { styles } from "../../assets/styles/settings.styles";

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const email = user?.emailAddresses?.[0]?.emailAddress || "user@example.com";
  const initial = email.charAt(0).toUpperCase();

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account & Settings</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.profileName}>
            {user?.fullName || user?.firstName || "Wallet User"}
          </Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <View style={styles.badge}>
            <Ionicons
              name="shield-checkmark"
              size={14}
              color={COLORS.income}
            />
            <Text style={styles.badgeText}>Clerk Authenticated</Text>
          </View>
        </View>

        {/* Security Section */}
        <Text style={styles.sectionHeader}>Security</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={[styles.settingRow, styles.settingRowLast]}
            onPress={() => router.push("/change-password")}
            accessibilityLabel="Change Password"
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Change Password</Text>
              <Text style={styles.settingSubtitle}>
                Update your login password securely
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textLight}
            />
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <Text style={styles.sectionHeader}>Preferences & Info</Text>
        <View style={styles.sectionCard}>
          <View style={styles.settingRow}>
            <View style={styles.iconWrapper}>
              <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Currency</Text>
              <Text style={styles.settingSubtitle}>Default transaction unit</Text>
            </View>
            <Text style={styles.settingValue}>INR (₹)</Text>
          </View>

          <View style={[styles.settingRow, styles.settingRowLast]}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>App Version</Text>
              <Text style={styles.settingSubtitle}>Wallet Release</Text>
            </View>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          accessibilityLabel="Log Out"
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.expense} />
          <Text style={styles.signOutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
