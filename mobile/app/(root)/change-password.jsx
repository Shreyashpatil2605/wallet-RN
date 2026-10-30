import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { styles } from "../../assets/styles/changePassword.styles";
import {
  validatePasswordChange,
  getClerkPasswordErrorMessage,
} from "../../lib/passwordValidation";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isPasswordEnabled = user?.passwordEnabled ?? true;

  // Real-time helper indicators
  const hasMinLength = newPassword.length >= 8;
  const isDifferent =
    Boolean(newPassword) &&
    Boolean(currentPassword) &&
    newPassword !== currentPassword;
  const isMatching =
    Boolean(newPassword) &&
    Boolean(confirmPassword) &&
    newPassword === confirmPassword;

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!isLoaded || !user) {
      setError("User session is not loaded. Please wait and try again.");
      return;
    }

    const validation = validatePasswordChange({
      currentPassword,
      newPassword,
      confirmPassword,
      passwordEnabled: isPasswordEnabled,
    });

    if (!validation.isValid) {
      setError(validation.error || "Please check your inputs.");
      return;
    }

    setIsLoading(true);

    try {
      // Use Clerk's official updatePassword API
      await user.updatePassword({
        currentPassword: isPasswordEnabled ? currentPassword : "",
        newPassword,
        signOutOfOtherSessions: false,
      });

      // Clear password state immediately after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Your password has been changed successfully!");

      Alert.alert(
        "Password Updated",
        "Your password has been changed successfully.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err) {
      const friendlyMessage = getClerkPasswordErrorMessage(err);
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isLoading}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.introIconContainer}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>Account Security</Text>
            <Text style={styles.introDescription}>
              Update your password to keep your wallet and financial
              transactions protected.
            </Text>
          </View>
        </View>

        {/* Error Banner */}
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              onPress={() => setError("")}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Success Banner */}
        {success ? (
          <View style={styles.successBox}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={COLORS.income}
            />
            <Text style={styles.successText}>{success}</Text>
          </View>
        ) : null}

        {/* Current Password Field */}
        {isPasswordEnabled && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Current Password</Text>
            <View
              style={[
                styles.inputWrapper,
                error && !currentPassword ? styles.inputWrapperError : null,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.textLight}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor={COLORS.textLight}
                secureTextEntry={!showCurrent}
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                  if (error) setError("");
                }}
                editable={!isLoading}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrent(!showCurrent)}
                disabled={isLoading}
                accessibilityLabel={
                  showCurrent
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                <Ionicons
                  name={showCurrent ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* New Password Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password</Text>
          <View
            style={[
              styles.inputWrapper,
              error && !newPassword ? styles.inputWrapperError : null,
            ]}
          >
            <Ionicons
              name="key-outline"
              size={20}
              color={COLORS.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter new password (min. 8 characters)"
              placeholderTextColor={COLORS.textLight}
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                if (error) setError("");
              }}
              editable={!isLoading}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowNew(!showNew)}
              disabled={isLoading}
              accessibilityLabel={
                showNew ? "Hide new password" : "Show new password"
              }
            >
              <Ionicons
                name={showNew ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm New Password Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View
            style={[
              styles.inputWrapper,
              error && !confirmPassword ? styles.inputWrapperError : null,
            ]}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={COLORS.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor={COLORS.textLight}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (error) setError("");
              }}
              editable={!isLoading}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirm(!showConfirm)}
              disabled={isLoading}
              accessibilityLabel={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
            >
              <Ionicons
                name={showConfirm ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Requirements Checklist */}
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Password Requirements</Text>
          <View style={styles.requirementRow}>
            <Ionicons
              name={
                hasMinLength
                  ? "checkmark-circle"
                  : "radio-button-off-outline"
              }
              size={16}
              color={hasMinLength ? COLORS.income : COLORS.textLight}
            />
            <Text
              style={[
                styles.requirementText,
                hasMinLength && styles.requirementTextMet,
              ]}
            >
              At least 8 characters long
            </Text>
          </View>
          {isPasswordEnabled && (
            <View style={styles.requirementRow}>
              <Ionicons
                name={
                  isDifferent
                    ? "checkmark-circle"
                    : "radio-button-off-outline"
                }
                size={16}
                color={isDifferent ? COLORS.income : COLORS.textLight}
              />
              <Text
                style={[
                  styles.requirementText,
                  isDifferent && styles.requirementTextMet,
                ]}
              >
                Different from current password
              </Text>
            </View>
          )}
          <View style={styles.requirementRow}>
            <Ionicons
              name={
                isMatching
                  ? "checkmark-circle"
                  : "radio-button-off-outline"
              }
              size={16}
              color={isMatching ? COLORS.income : COLORS.textLight}
            />
            <Text
              style={[
                styles.requirementText,
                isMatching && styles.requirementTextMet,
              ]}
            >
              Passwords match
            </Text>
          </View>
        </View>

        {/* Change Password Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color={COLORS.white} />
              <Text style={styles.submitButtonText}>Updating...</Text>
            </>
          ) : (
            <>
              <Ionicons name="lock-closed" size={18} color={COLORS.white} />
              <Text style={styles.submitButtonText}>Change Password</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
