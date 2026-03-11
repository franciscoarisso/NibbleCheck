import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { StatusBar } from "expo-status-bar";
import { CameraView, useCameraPermissions } from "expo-camera";
import type { BarcodeScanningResult } from "expo-camera";

import {
  classifyImageAsync,
  resolveTextAsync,
  checkBarcodeAsync,
} from "./src/api";
import { ClassifyItem, Verdict } from "./src/types";
import { styles } from "./styles";

type EntryMode = "image" | "barcode" | "text";
type ResultSource = "image" | "barcode" | "text" | null;

export default function App() {
  // Which input method the user is using right now
  const [activeMode, setActiveMode] = useState<EntryMode>("image");

  // Simple dark mode toggle for the UI
  const [isDark, setIsDark] = useState(false);

  // Image selected from gallery or camera
  const [imgUri, setImgUri] = useState<string | null>(null);

  // Text typed into the manual search input
  const [textQuery, setTextQuery] = useState("");

  // Final results shown to the user
  const [results, setResults] = useState<ClassifyItem[] | null>(null);

  // Lets me label where the current results came from
  const [resultSource, setResultSource] = useState<ResultSource>(null);

  // Shared loading + error states across all three flows
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controls the barcode scanner modal
  const [scannerVisible, setScannerVisible] = useState(false);

  // expo-camera permission hook used for barcode scanning
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  // Clears old results/errors before a new check starts
  const resetFeedback = () => {
    setError(null);
    setResults(null);
    setResultSource(null);
  };

  // Opens the user’s photo library and stores the chosen image URI
  const pickImage = async () => {
    resetFeedback();

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== "granted") {
      setError("Gallery permission is required to pick a photo.");
      return;
    }

    const sel = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (sel.canceled) return;
    setImgUri(sel.assets[0].uri);
  };

  // Opens the device camera and stores the captured image URI
  const takePhoto = async () => {
    resetFeedback();

    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (perm.status !== "granted") {
      setError("Camera permission is required to take a photo.");
      return;
    }

    const cap = await ImagePicker.launchCameraAsync({ quality: 1 });

    if (cap.canceled) return;
    setImgUri(cap.assets[0].uri);
  };

  // Resizes/compresses the image first, then sends it to the backend
  const runImageCheck = async () => {
    if (!imgUri) return;

    setLoading(true);
    resetFeedback();

    try {
      // I shrink the image before upload so requests are faster and lighter
      const manipResult = await ImageManipulator.manipulateAsync(
        imgUri,
        [{ resize: { width: 600 } }],
        {
          compress: 0.5,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const out = await classifyImageAsync(manipResult.uri);
      setResults(out);
      setResultSource("image");
    } catch (e: any) {
      console.error("Photo check error:", e);
      setError(
        e?.message || "We couldn’t check this photo. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Sends a typed food or ingredient query to the backend and
  // reshapes the response into the same item format used by image results
  const runTextCheck = async () => {
    const trimmed = textQuery.trim();
    if (!trimmed) return;

    setLoading(true);
    resetFeedback();

    try {
      const out = await resolveTextAsync(trimmed);

      const items: ClassifyItem[] = out.hits.map((h: any) => ({
        label: h.token,
        name: h.name,
        final_status: h.status as Verdict,
        rationale: h.notes ?? undefined,
        sources: h.sources ?? [],
        det_conf:
          typeof h.db_score === "number" ? (h.db_score as number) : undefined,
      }));

      setResults(items);
      setResultSource("text");
    } catch (e: any) {
      console.error("Text check error:", e);
      setError(
        e?.message || "We couldn’t check that text. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Makes sure camera permission exists before showing the scanner modal
  const requestAndOpenScanner = async () => {
    resetFeedback();

    if (cameraPermission?.granted) {
      setScannerVisible(true);
      return;
    }

    const perm = await requestCameraPermission?.();
    if (!perm || !perm.granted) {
      setError("Camera permission is required to scan barcodes.");
      return;
    }

    setScannerVisible(true);
  };

  // Called automatically by expo-camera when a barcode is detected
  const handleBarCodeScanned = async (scan: BarcodeScanningResult) => {
    // Close the scanner first so the camera does not keep firing scans
    setScannerVisible(false);

    setLoading(true);
    resetFeedback();

    try {
      const barcode = scan.data;
      console.log("Scanned barcode:", barcode);

      const items = await checkBarcodeAsync(barcode);
      setResults(items);
      setResultSource("barcode");
    } catch (e: any) {
      console.error("Barcode check error:", e);
      const errorMsg =
        e?.message || "We couldn't look up that barcode. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, isDark && styles.rootDark]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexOne}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerRow}>
            <View style={styles.flexOne}>
              <Text style={[styles.appTitle, isDark && styles.appTitleDark]}>
                NibbleCheck
              </Text>
              <Text
                style={[styles.appSubtitle, isDark && styles.appSubtitleDark]}
              >
                Check if foods are safe before your dog takes a bite.
              </Text>
            </View>

            <ThemeToggle
              isDark={isDark}
              onToggle={() => setIsDark((prev) => !prev)}
            />
          </View>

          <View style={styles.entryColumn}>
            <EntryCard
              label="Scan / Upload Food Image"
              description="Use your camera or gallery to scan snacks and leftovers."
              icon="📷"
              active={activeMode === "image"}
              isDark={isDark}
              onPress={() => setActiveMode("image")}
            />
            <EntryCard
              label="Scan Barcode"
              description="Point at packaged food labels to scan UPC / EAN codes."
              icon="🧾"
              active={activeMode === "barcode"}
              isDark={isDark}
              onPress={() => setActiveMode("barcode")}
            />
            <EntryCard
              label="Type a Food or Ingredient Name"
              description='Search directly by food or ingredient, like "grapes" or "xylitol gum".'
              icon="⌨️"
              active={activeMode === "text"}
              isDark={isDark}
              onPress={() => setActiveMode("text")}
            />
          </View>

          {activeMode === "image" && (
            <ImagePanel
              imgUri={imgUri}
              loading={loading}
              onPick={pickImage}
              onSnap={takePhoto}
              onCheck={runImageCheck}
              isDark={isDark}
            />
          )}

          {activeMode === "barcode" && (
            <BarcodePanel
              loading={loading}
              onStartScan={requestAndOpenScanner}
              isDark={isDark}
            />
          )}

          {activeMode === "text" && (
            <TextPanel
              query={textQuery}
              onChangeQuery={setTextQuery}
              onSubmit={runTextCheck}
              loading={loading}
              isDark={isDark}
            />
          )}

          {loading && (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={isDark ? "#E5E7EB" : undefined} />
              <Text
                style={[styles.loadingText, isDark && styles.loadingTextDark]}
              >
                Checking safety…
              </Text>
            </View>
          )}

          {!!error && (
            <View style={[styles.errorBubble, isDark && styles.errorBubbleDark]}>
              <View style={styles.errorBubbleHeader}>
                <Text style={styles.errorBubbleIcon}>⚠️</Text>
                <Text
                  style={[
                    styles.errorBubbleTitle,
                    isDark && styles.errorBubbleTitleDark,
                  ]}
                >
                  Something went wrong
                </Text>
              </View>
              <Text
                style={[
                  styles.errorBubbleText,
                  isDark && styles.errorBubbleTextDark,
                ]}
              >
                {error}
              </Text>
            </View>
          )}

          {!!results?.length && (
            <View style={styles.resultsSection}>
              <Text
                style={[styles.resultsTitle, isDark && styles.resultsTitleDark]}
              >
                Results
              </Text>

              {resultSource && (
                <Text
                  style={[
                    styles.resultsSubtitle,
                    isDark && styles.resultsSubtitleDark,
                  ]}
                >
                  Source:{" "}
                  {resultSource === "image"
                    ? "image scan"
                    : resultSource === "text"
                      ? "text search"
                      : "barcode scan"}
                </Text>
              )}

              {results.map((item, idx) => (
                <ResultCard
                  key={`${item.name ?? item.label}-${idx}`}
                  item={item}
                  isDark={isDark}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={scannerVisible} animationType="slide" transparent>
        <View style={styles.scannerOverlay}>
          <View style={[styles.scannerCard, isDark && styles.scannerCardDark]}>
            <Text
              style={[styles.scannerTitle, isDark && styles.scannerTitleDark]}
            >
              Scan Barcode
            </Text>
            <Text
              style={[
                styles.scannerSubtitle,
                isDark && styles.scannerSubtitleDark,
              ]}
            >
              Align the barcode inside the frame. We’ll scan it automatically.
            </Text>

            <View
              style={[
                styles.scannerWindowOuter,
                isDark && styles.scannerWindowOuterDark,
              ]}
            >
              <View style={styles.scannerWindowInner}>
                <CameraView
                  style={StyleSheet.absoluteFillObject}
                  facing="back"
                  onBarcodeScanned={handleBarCodeScanned}
                />
              </View>
            </View>

            <Pressable
              style={styles.scannerCancelButton}
              onPress={() => setScannerVisible(false)}
            >
              <Text
                style={[
                  styles.scannerCancelText,
                  isDark && styles.scannerCancelTextDark,
                ]}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable style={styles.themeToggle} onPress={onToggle}>
      <View
        style={[
          styles.themeToggleSegment,
          !isDark && styles.themeToggleSegmentActive,
        ]}
      >
        <Text
          style={[
            styles.themeToggleIcon,
            !isDark && styles.themeToggleIconActive,
          ]}
        >
          ☀️
        </Text>
      </View>

      <View
        style={[
          styles.themeToggleSegment,
          isDark && styles.themeToggleSegmentActive,
        ]}
      >
        <Text
          style={[
            styles.themeToggleIcon,
            isDark && styles.themeToggleIconActive,
          ]}
        >
          🌙
        </Text>
      </View>
    </Pressable>
  );
}

function EntryCard(props: {
  label: string;
  description: string;
  icon: string;
  active?: boolean;
  isDark: boolean;
  onPress: () => void;
}) {
  const { label, description, icon, active, isDark, onPress } = props;

  return (
    <Pressable
      style={[
        styles.entryCard,
        active && styles.entryCardActive,
        isDark && styles.entryCardDark,
        isDark && active && styles.entryCardActiveDark,
      ]}
      onPress={onPress}
    >
      <View
        style={[styles.entryIconBubble, isDark && styles.entryIconBubbleDark]}
      >
        <Text style={styles.entryIcon}>{icon}</Text>
      </View>

      <View style={styles.flexOne}>
        <Text style={[styles.entryLabel, isDark && styles.entryLabelDark]}>
          {label}
        </Text>
        <Text
          style={[
            styles.entryDescription,
            isDark && styles.entryDescriptionDark,
          ]}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
}

function ImagePanel(props: {
  imgUri: string | null;
  loading: boolean;
  onPick: () => void;
  onSnap: () => void;
  onCheck: () => void;
  isDark: boolean;
}) {
  const { imgUri, loading, onPick, onSnap, onCheck, isDark } = props;

  return (
    <View style={[styles.panel, isDark && styles.panelDark]}>
      <Text style={[styles.panelTitle, isDark && styles.panelTitleDark]}>
        Scan or Upload a Food Image
      </Text>
      <Text style={[styles.panelSubtitle, isDark && styles.panelSubtitleDark]}>
        Take a picture of your dog’s snack or upload from your gallery.
      </Text>

      <View style={styles.panelButtonRow}>
        <Pressable
          style={[styles.secondaryButton, isDark && styles.secondaryButtonDark]}
          onPress={onPick}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              isDark && styles.secondaryButtonTextDark,
            ]}
          >
            Upload from Gallery
          </Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryButton, isDark && styles.secondaryButtonDark]}
          onPress={onSnap}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              isDark && styles.secondaryButtonTextDark,
            ]}
          >
            Take a Photo
          </Text>
        </Pressable>
      </View>

      {imgUri && (
        <View
          style={[
            styles.imagePreviewContainer,
            isDark && styles.imagePreviewContainerDark,
          ]}
        >
          <Image source={{ uri: imgUri }} style={styles.imagePreview} />
        </View>
      )}

      <Pressable
        style={[
          styles.primaryButton,
          (!imgUri || loading) && styles.primaryButtonDisabled,
        ]}
        disabled={!imgUri || loading}
        onPress={onCheck}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Checking…" : "Check Photo Safety"}
        </Text>
      </Pressable>
    </View>
  );
}

function BarcodePanel(props: {
  loading: boolean;
  onStartScan: () => void;
  isDark: boolean;
}) {
  const { loading, onStartScan, isDark } = props;

  return (
    <View style={[styles.panel, isDark && styles.panelDark]}>
      <Text style={[styles.panelTitle, isDark && styles.panelTitleDark]}>
        Scan a Package Barcode
      </Text>
      <Text style={[styles.panelSubtitle, isDark && styles.panelSubtitleDark]}>
        We’ll look up the product, read its ingredients, and check each one
        against our database.
      </Text>

      <Pressable
        style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
        disabled={loading}
        onPress={onStartScan}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Opening scanner…" : "Start Barcode Scan"}
        </Text>
      </Pressable>
    </View>
  );
}

function TextPanel(props: {
  query: string;
  onChangeQuery: (s: string) => void;
  onSubmit: () => void;
  loading: boolean;
  isDark: boolean;
}) {
  const { query, onChangeQuery, onSubmit, loading, isDark } = props;

  return (
    <View style={[styles.panel, isDark && styles.panelDark]}>
      <Text style={[styles.panelTitle, isDark && styles.panelTitleDark]}>
        Type a Food or Ingredient Name
      </Text>
      <Text style={[styles.panelSubtitle, isDark && styles.panelSubtitleDark]}>
        Example: "grapes", "xylitol", "peanut butter with xylitol".
      </Text>

      <TextInput
        style={[styles.textInput, isDark && styles.textInputDark]}
        value={query}
        onChangeText={onChangeQuery}
        placeholder="Type a food name…"
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />

      <Pressable
        style={[
          styles.primaryButton,
          (!query.trim() || loading) && styles.primaryButtonDisabled,
        ]}
        disabled={!query.trim() || loading}
        onPress={onSubmit}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Checking…" : "Check Safety"}
        </Text>
      </Pressable>
    </View>
  );
}

function ResultCard({ item, isDark }: { item: ClassifyItem; isDark: boolean }) {
  const canonicalName = item.name || item.label || "Unknown item";

  // Some responses use notes, others use rationale, so I support both
  const notes: string | undefined =
    (item as any).notes ?? item.rationale ?? undefined;

  const sources = item.sources ?? [];
  const hasSources = Array.isArray(sources) && sources.length > 0;

  // Product cards always show the sources block because they come from ingredient matching
  const showSourcesSection = hasSources || item.isProduct;

  return (
    <View
      style={[
        styles.resultCard,
        isDark && styles.resultCardDark,
        item.isProduct && styles.resultCardProduct,
        item.isProduct && isDark && styles.resultCardProductDark,
      ]}
    >
      {item.isProduct && (
        <View style={styles.resultProductHeaderRow}>
          <Text
            style={[
              styles.resultProductTag,
              isDark && styles.resultProductTagDark,
            ]}
          >
            Overall product safety
          </Text>
          <Text
            style={[
              styles.resultProductSubtag,
              isDark && styles.resultProductSubtagDark,
            ]}
          >
            Rated from its ingredients
          </Text>
        </View>
      )}

      <View style={styles.resultHeaderRow}>
        <Text style={[styles.resultTitle, isDark && styles.resultTitleDark]}>
          {canonicalName}
        </Text>
        <StatusBadge status={item.final_status} />
      </View>

      {typeof item.det_conf === "number" && !item.isProduct && (
        <Text style={[styles.resultMeta, isDark && styles.resultMetaDark]}>
          Match confidence: {(item.det_conf * 100).toFixed(0)}%
        </Text>
      )}

      {notes && (
        <Text style={[styles.resultNotes, isDark && styles.resultNotesDark]}>
          {notes}
        </Text>
      )}

      {showSourcesSection && (
        <View style={styles.sourcesContainer}>
          <Text
            style={[styles.sourcesLabel, isDark && styles.sourcesLabelDark]}
          >
            Sources
          </Text>

          {item.isProduct && (
            <Text
              style={[
                styles.sourceItem,
                styles.sourceItemMuted,
                isDark && styles.sourceItemDark,
              ]}
            >
              • Ingredients pulled from OpenFoodFacts.org
            </Text>
          )}

          {sources.map((s, idx) => (
            <Text
              key={idx}
              style={[styles.sourceItem, isDark && styles.sourceItemDark]}
            >
              • {s}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function StatusBadge({ status }: { status: Verdict }) {
  const bg =
    status === "SAFE" ? "#22C55E" : status === "CAUTION" ? "#EAB308" : "#EF4444";

  const label =
    status === "SAFE" ? "SAFE" : status === "CAUTION" ? "CAUTION" : "UNSAFE";

  return (
    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
      <Text style={styles.statusBadgeText}>{label}</Text>
    </View>
  );
}