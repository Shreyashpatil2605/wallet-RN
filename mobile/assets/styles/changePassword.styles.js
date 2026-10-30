// assets/styles/changePassword.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
  },
  headerPlaceholder: {
    width: 36,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  introIconContainer: {
    marginTop: 2,
  },
  introTextContainer: {
    flex: 1,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  introDescription: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  inputWrapperError: {
    borderColor: COLORS.expense,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
  },
  eyeButton: {
    padding: 6,
    marginLeft: 6,
  },
  // Banners
  errorBox: {
    backgroundColor: "#FFE5E5",
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.expense,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  successBox: {
    backgroundColor: "#E8F8F0",
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.income,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  successText: {
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  // Requirements helper list
  requirementsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
  },
  requirementText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  requirementTextMet: {
    color: COLORS.income,
    fontWeight: "500",
  },
  // Action buttons
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  cancelButtonText: {
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: "600",
  },
});
