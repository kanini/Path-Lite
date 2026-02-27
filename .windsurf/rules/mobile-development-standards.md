---
trigger: glob
globs: "**/*.swift, **/*.dart, **/android/**/*.xml, **/android/**/*.gradle, **/android/**/*.gradle.kts, **/android/**/*.kt, **/android/**/*.java, **/ios/**/*.swift, **/ios/**/*.m, **/ios/**/*.mm, **/ios/**/*.h, **/ios/**/*.plist, **/ios/**/*.pbxproj, **/Podfile, **/pubspec.yaml, **/app.json, **/eas.json, **/metro.config.*, **/react-native.config.*"
---

# Mobile Development Standards

Cross-platform and native mobile: architecture, lifecycle, navigation, build verification, performance, security.

## Platform Organization
- Platform-specific code via `.ios.ts`/`.android.ts` (RN), `Platform.select()` (RN), `/ios` `/android` dirs (native), conditional imports (`kIsWeb` in Flutter)
- Shared business logic in platform-agnostic modules; platform bridges for native APIs only
- Feature-based folder structure mirroring navigation graph
- One entry point per platform; shared app shell where possible

## Frameworks
- **React Native**: Hermes engine mandatory; New Architecture (Fabric/TurboModules) for performance; Expo for managed workflows when native modules allow
- **Flutter**: Dart-first; platform channels for native interop; widget composition over inheritance; BuildContext only in widget tree
- **Kotlin Multiplatform**: Shared module for business logic; expect/actual for platform APIs; Compose Multiplatform for shared UI where mature
- **SwiftUI/Jetpack Compose**: Declarative UI; state-driven rendering; preview-based development

## Native Modules
- Isolate native bridge calls behind a service interface
- Version-lock native SDKs to known-stable releases
- Validate native module linking on BOTH platforms after every dependency change
- Document required native setup (Podfile entries, Gradle dependencies, manifest permissions, Info.plist keys)

## Lifecycle
- Handle all states: active, inactive, background, terminated (iOS); onCreate through onDestroy (Android)
- Persist unsaved user state before background transition
- Cancel or defer network requests on background entry
- Resume gracefully: rehydrate state, refresh stale data, re-establish connections
- Distinguish cold start vs warm start vs hot start

## Navigation
- Stack-based navigation as primary pattern (React Navigation, Navigator 2.0, Jetpack Navigation)
- Tab navigation for top-level sections (max 5 tabs)
- Deep link support: every navigable screen MUST have a URI scheme
- Navigation state persistence across app restarts
- Handle platform back behavior (Android back button, iOS swipe-back gesture)

## Permissions
- Request permissions lazily at point of use, not at app launch
- Show purpose explanation before system prompt (pre-permission dialog)
- Handle denial gracefully: degrade functionality, never crash
- Handle permanent denial ("Don't ask again" on Android, restricted on iOS)
- Audit AndroidManifest.xml and Info.plist for unused permissions before release

## Design Compliance
- iOS: Follow Human Interface Guidelines; system fonts (SF Pro), standard navigation bars, tab bars
- Android: Follow Material Design 3; Material components, dynamic color, predictive back gesture
- Touch targets: minimum 44x44pt (iOS HIG) / 48x48dp (Material Design)
- Respect safe area insets: notch, dynamic island, home indicator, navigation bar, status bar

## Performance Targets
- 60fps sustained (120fps on ProMotion/high-refresh); <3 dropped frames per scroll gesture
- Cold start <2s, warm start <1s (to first meaningful paint)
- Memory <200MB resident for typical usage; no unbounded growth
- Binary <50MB initial download; use on-demand resources for large assets
- Note: These are design targets measured via device profiling, not agent-verifiable

## Assets
- Density-specific images: @1x/@2x/@3x (iOS), mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi (Android), 1.0x/2.0x/3.0x (Flutter)
- Vector assets (SVG/PDF) preferred over raster where possible
- Native splash/launch screen implementation (not JS/Dart render)
- Font embedding: include only used weights and subsets

## Security
- Secure storage: Keychain (iOS), EncryptedSharedPreferences/Keystore (Android)
- Certificate pinning for API endpoints (pin leaf or intermediate)
- Code obfuscation: ProGuard/R8 (Android), Bitcode (iOS)
- Transport security: ATS enabled (iOS), cleartext traffic disabled (Android)
- Never log PII; clear clipboard on background; mask sensitive input fields

## Build Verification
Headless-verifiable commands (no device/simulator required):
- React Native: `npx react-native bundle --platform android/ios`, `tsc --noEmit`, `eslint`
- Flutter: `flutter build apk --debug`, `dart analyze`
- Android native: `./gradlew assembleDebug`, `ktlint`
- iOS native: `xcodebuild build` (macOS only), `swiftlint`
- Dependency resolution: `npm install`, `pod install` (macOS), `flutter pub get`, `gradle dependencies`
- iOS builds require macOS; on Windows/Linux, iOS compilation is CI-only

## Testing
- Unit (headless): Jest + @testing-library/react-native (RN), flutter_test (Flutter), XCTest (iOS), JUnit + Robolectric (Android)
- E2E (device required): Detox (RN), integration_test (Flutter), XCUITest (iOS), Espresso (Android)
- Test on real devices for release validation; simulators/emulators for development
- Golden/snapshot testing for visual regression (headless)

## Anti-Patterns
- Excessive bridge/channel calls without batching
- Large assets bundled in binary (stream or lazy-load instead)
- Missing platform fallbacks for platform-specific imports
- Leaked event listeners, timers, or subscriptions across lifecycle
- Applying web patterns (CSS, DOM, window) in native context

## Review Checklist
- Headless compilation passes for target platforms
- Permission manifests match actual code usage (no unused permissions)
- App lifecycle transitions handled (background/foreground/terminated)
- No leaked listeners, timers, or subscriptions
- Native module dependencies linked and version-locked
- Platform design guidelines followed (HIG / Material Design 3)
