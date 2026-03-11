import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  root: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  rootDark: {
    backgroundColor: "#020617",
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  appTitle: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  appTitleDark: {
    color: "#F9FAFB",
  },
  appSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 16,
  },
  appSubtitleDark: {
    color: "#9CA3AF",
  },

  entryColumn: {
    gap: 10,
    marginBottom: 24,
  },
  entryCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  entryCardActive: {
    borderColor: "#2563EB",
    shadowOpacity: 0.09,
    elevation: 3,
  },
  entryCardDark: {
    backgroundColor: "#020617",
    borderColor: "#1F2937",
    shadowOpacity: 0.4,
  },
  entryCardActiveDark: {
    borderColor: "#3B82F6",
  },
  entryIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  entryIconBubbleDark: {
    backgroundColor: "#1E293B",
  },
  entryIcon: {
    fontSize: 22,
  },
  entryLabel: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 2,
  },
  entryLabelDark: {
    color: "#E5E7EB",
  },
  entryDescription: {
    color: "#6B7280",
    fontSize: 12,
  },
  entryDescriptionDark: {
    color: "#9CA3AF",
  },

  panel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  panelDark: {
    backgroundColor: "#020617",
    borderColor: "#1F2937",
  },
  panelTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  panelTitleDark: {
    color: "#F9FAFB",
  },
  panelSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 12,
  },
  panelSubtitleDark: {
    color: "#9CA3AF",
  },
  panelButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  primaryButton: {
    marginTop: 8,
    backgroundColor: "#2563EB",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryButtonDark: {
    backgroundColor: "#0F172A",
    borderColor: "#1F2937",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 13,
  },
  secondaryButtonTextDark: {
    color: "#E5E7EB",
  },

  imagePreviewContainer: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  imagePreviewContainerDark: {
    borderColor: "#1F2937",
  },
  imagePreview: {
    width: "100%",
    height: 220,
  },

  textInput: {
    marginTop: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    fontSize: 14,
  },
  textInputDark: {
    backgroundColor: "#020617",
    borderColor: "#1F2937",
    color: "#F9FAFB",
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  loadingText: {
    color: "#6B7280",
    fontSize: 13,
  },
  loadingTextDark: {
    color: "#9CA3AF",
  },

  errorBubble: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorBubbleDark: {
    backgroundColor: "#2B1213",
    borderColor: "#FCA5A5",
  },
  errorBubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  errorBubbleIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  errorBubbleTitle: {
    color: "#991B1B",
    fontSize: 13,
    fontWeight: "700",
  },
  errorBubbleTitleDark: {
    color: "#FECACA",
  },
  errorBubbleText: {
    color: "#7F1D1D",
    fontSize: 13,
  },
  errorBubbleTextDark: {
    color: "#FECACA",
  },

  resultsSection: {
    marginTop: 18,
  },
  resultsTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  resultsTitleDark: {
    color: "#F9FAFB",
  },
  resultsSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 10,
  },
  resultsSubtitleDark: {
    color: "#9CA3AF",
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  resultCardDark: {
    backgroundColor: "#020617",
    borderColor: "#1F2937",
  },
  resultHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  resultTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    flexShrink: 1,
  },
  resultTitleDark: {
    color: "#F9FAFB",
  },
  resultMeta: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 6,
  },
  resultMetaDark: {
    color: "#9CA3AF",
  },
  resultNotes: {
    color: "#111827",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
  resultNotesDark: {
    color: "#E5E7EB",
  },

  sourcesContainer: {
    marginTop: 10,
  },
  sourcesLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  sourcesLabelDark: {
    color: "#9CA3AF",
  },
  sourceItem: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 2,
  },
  sourceItemDark: {
    color: "#9CA3AF",
  },
  sourceItemMuted: {
    opacity: 0.9,
  },

  resultCardProduct: {
    borderColor: "#4F46E5",
    backgroundColor: "#EEF2FF",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  resultCardProductDark: {
    borderColor: "#6366F1",
    backgroundColor: "#020617",
    shadowColor: "#6366F1",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  resultProductHeaderRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  resultProductTag: {
    color: "#4F46E5",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  resultProductTagDark: {
    color: "#A5B4FC",
  },
  resultProductSubtag: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "500",
  },
  resultProductSubtagDark: {
    color: "#9CA3AF",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  themeToggle: {
    flexDirection: "row",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    marginLeft: 12,
    backgroundColor: "#F3F4F6",
  },
  themeToggleSegment: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  themeToggleSegmentActive: {
    backgroundColor: "#2563EB",
  },
  themeToggleIcon: {
    fontSize: 16,
    color: "#4B5563",
  },
  themeToggleIconActive: {
    color: "#FFFFFF",
  },

  scannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  scannerCard: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  scannerCardDark: {
    backgroundColor: "#020617",
    borderColor: "#1F2937",
  },
  scannerTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  scannerTitleDark: {
    color: "#F9FAFB",
  },
  scannerSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 12,
  },
  scannerSubtitleDark: {
    color: "#9CA3AF",
  },
  scannerWindowOuter: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#2563EB",
    backgroundColor: "#000000",
  },
  scannerWindowOuterDark: {
    borderColor: "#3B82F6",
  },
  scannerWindowInner: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  scannerCancelButton: {
    marginTop: 12,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  scannerCancelText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "600",
  },
  scannerCancelTextDark: {
    color: "#E5E7EB",
  },
});