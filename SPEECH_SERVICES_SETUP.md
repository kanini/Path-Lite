# Speech Services Setup Guide

This guide covers the implementation of native Text-to-Speech (TTS) and Speech-to-Text (STT) services using device-native libraries.

## Libraries Used

- **Text-to-Speech**: `react-native-tts` v4.1.1 (device-native)
- **Speech-to-Text**: `@react-native-voice/voice` v3.2.0 (device-native)

Both libraries are already installed in `package.json`.

## Platform Configuration

### Android Setup

#### 1. Permissions (android/app/src/main/AndroidManifest.xml)

Add the following permissions:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

#### 2. Microphone Permission Request

The app will automatically request microphone permission at runtime when STT is first used.

### iOS Setup

#### 1. Permissions (ios/PathLite/Info.plist)

Add the following keys:

```xml
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app needs access to speech recognition to convert your voice to text</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to your microphone to record audio for speech recognition</string>
```

#### 2. Install Pods

```bash
cd ios
pod install
cd ..
```

## Implementation

### Services Created

1. **`src/services/speech/TTSService.ts`** - Text-to-Speech service (already existed)
2. **`src/services/speech/STTService.ts`** - Speech-to-Text service (newly created)
3. **`src/services/adapters/STTServiceAdapter.ts`** - Updated to use native implementation
4. **`src/hooks/useSpeechServices.ts`** - React hook for easy integration

### Types Extended

Added to `src/types/speech.ts`:
- `STTError` - Error types for speech recognition
- `RecognitionStatus` - Status enum for STT
- `STTResult` - Result interface with transcript and confidence
- `STTConfig` - Configuration interface for STT

## Usage Example

### Using the Custom Hook (Recommended)

```typescript
import React from 'react';
import {View, Button, Text} from 'react-native';
import {useSpeechServices} from '../hooks/useSpeechServices';

const SpeechExample = () => {
  const {
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    isSpeaking,
    isListening,
    partialTranscript,
    finalTranscript,
    audioLevel,
    error,
  } = useSpeechServices();

  return (
    <View>
      {/* Text-to-Speech */}
      <Button
        title={isSpeaking ? 'Stop Speaking' : 'Speak'}
        onPress={() =>
          isSpeaking
            ? stopSpeaking()
            : speak('Hello, this is a test message')
        }
      />

      {/* Speech-to-Text */}
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={() =>
          isListening ? stopListening() : startListening()
        }
      />

      {/* Display Results */}
      {partialTranscript && (
        <Text>Partial: {partialTranscript}</Text>
      )}
      {finalTranscript && (
        <Text>Final: {finalTranscript}</Text>
      )}
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      
      {/* Audio Level Indicator */}
      {isListening && (
        <View style={{height: 20, backgroundColor: 'lightgray'}}>
          <View
            style={{
              height: 20,
              width: `${audioLevel * 100}%`,
              backgroundColor: 'green',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SpeechExample;
```

### Using Services Directly

#### Text-to-Speech

```typescript
import {TTSService} from './services/speech/TTSService';
import {SpeechStatus, TTSError} from './types/speech';

// Set up callbacks
TTSService.setCallbacks({
  onStart: () => console.log('Started speaking'),
  onDone: () => console.log('Finished speaking'),
  onError: (error: TTSError, message: string) => {
    console.error('TTS Error:', error, message);
  },
  onStatusChange: (status: SpeechStatus) => {
    console.log('Status:', status);
  },
});

// Speak text
await TTSService.speak('Hello World');

// Configure voice
TTSService.setSpeechRate(0.8); // 0.5 to 2.0
TTSService.setPitch(1.2); // 0.5 to 2.0

// Control playback
await TTSService.pause();
await TTSService.resume();
await TTSService.stop();

// Queue multiple messages
TTSService.queueSpeech('First message');
TTSService.queueSpeech('Second message');
```

#### Speech-to-Text

```typescript
import {STTService} from './services/speech/STTService';
import {RecognitionStatus, STTError, STTResult} from './types/speech';

// Set up callbacks
STTService.setCallbacks({
  onStart: () => console.log('Started listening'),
  onResult: (result: STTResult) => {
    if (result.isFinal) {
      console.log('Final:', result.transcript);
    } else {
      console.log('Partial:', result.transcript);
    }
  },
  onEnd: (transcript: string) => {
    console.log('Ended with:', transcript);
  },
  onError: (error: STTError, message: string) => {
    console.error('STT Error:', error, message);
  },
  onStatusChange: (status: RecognitionStatus) => {
    console.log('Status:', status);
  },
  onVolumeChange: (volume: number) => {
    console.log('Volume:', volume);
  },
});

// Start listening
await STTService.startListening();

// Configure language
STTService.setConfig({
  language: 'en-US',
  continuous: false,
  interimResults: true,
});

// Stop and get transcript
const transcript = await STTService.stopListening();

// Cancel listening
await STTService.cancelListening();

// Check status
const isListening = STTService.isListening();
const status = STTService.getStatus();
```

## Features

### Text-to-Speech (TTSService)
- ✅ Device-native speech synthesis
- ✅ Configurable speech rate and pitch
- ✅ Voice type selection (male/female)
- ✅ Queue management for multiple messages
- ✅ Pause/resume/stop controls
- ✅ Volume state detection
- ✅ Event callbacks for lifecycle
- ✅ Audit logging

### Speech-to-Text (STTService)
- ✅ Device-native speech recognition
- ✅ Real-time partial results
- ✅ Final transcript with confidence
- ✅ Volume level monitoring
- ✅ Configurable language support
- ✅ Error handling with specific error types
- ✅ Start/stop/cancel controls
- ✅ Event callbacks for lifecycle
- ✅ Audit logging

## Error Handling

### TTS Errors
- `SYNTHESIS_FAILED` - Speech synthesis failed
- `INTERRUPTED` - Speech was interrupted
- `MUTED_DEVICE` - Device is muted

### STT Errors
- `PERMISSION_DENIED` - Microphone permission denied
- `RECOGNITION_FAILED` - Speech recognition failed
- `NO_MATCH` - No speech detected
- `NETWORK_ERROR` - Network error occurred
- `SERVICE_NOT_AVAILABLE` - Speech recognition service unavailable

## Testing

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

## Troubleshooting

### Android
- Ensure microphone permission is granted in device settings
- Check that Google Speech Recognition is installed
- Verify internet connection for cloud-based recognition

### iOS
- Ensure microphone and speech recognition permissions are granted
- Check device language settings match configured language
- Verify iOS version supports speech recognition (iOS 10+)

### Common Issues

1. **"Permission Denied" Error**
   - Check AndroidManifest.xml/Info.plist permissions
   - Request runtime permissions before using STT
   - Verify device settings allow microphone access

2. **"Service Not Available" Error**
   - Check internet connection
   - Verify speech recognition service is available on device
   - Try restarting the app

3. **No Audio Output (TTS)**
   - Check device volume settings
   - Verify device is not muted
   - Check audio output routing

## Next Steps

1. Request microphone permissions at appropriate time in your app flow
2. Integrate the `useSpeechServices` hook into your components
3. Add UI feedback for listening/speaking states
4. Implement error handling UI
5. Test on physical devices (both Android and iOS)
6. Consider adding language selection UI
7. Add accessibility features for users with disabilities
