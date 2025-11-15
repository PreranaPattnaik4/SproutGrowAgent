export type Translation = {
  // Navigation
  navHome: string;
  navImageDiagnosis: string;
  navVoiceAssistant: string;
  navTextChat: string;
  navLocationInfo: string;
  navDigitalSolutions: string;
  navAboutUs: string;
  navLanguage: string;
  // Page Titles
  titleHome: string;
  titleImageDiagnosis: string;
  titleVoiceAssistant: string;
  titleTextChat: string;
  titleLocationInfo: string;
  // Common
  appName: string;
  // Home Page
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeFeature1Title: string;
  homeFeature1Desc: string;
  homeFeature2Title: string;
  homeFeature2Desc: string;
  homeFeature3Title: string;
  homeFeature3Desc: string;
  // Image Diagnosis
  imageUploadTitle: string;
  imageUploadDesc: string;
  imageUploadButton: string;
  imageUploading: string;
  imageDiagnosisResult: string;
};

export const translations: { [key: string]: Translation } = {
  en: {
    navHome: 'Home',
    navImageDiagnosis: 'Image Diagnosis',
    navVoiceAssistant: 'Voice Assistant',
    navTextChat: 'Text Chat',
    navLocationInfo: 'Location Info',
    navDigitalSolutions: 'Digital Solutions',
    navAboutUs: 'About Us',
    navLanguage: 'Language',
    titleHome: 'Dashboard',
    titleImageDiagnosis: 'Plant Disease Diagnosis',
    titleVoiceAssistant: 'Voice Assistant',
    titleTextChat: 'AI Chat Assistant',
    titleLocationInfo: 'Local Information',
    appName: 'SproutGrow Agent',
    homeHeroTitle: 'Your AI Farming Companion',
    homeHeroSubtitle:
      'Instant crop disease diagnosis, voice assistance, and localized market data to empower your farming.',
    homeFeature1Title: 'Snap & Diagnose',
    homeFeature1Desc:
      'Upload a photo of a plant leaf and get an instant AI-powered disease diagnosis.',
    homeFeature2Title: 'Speak & Advise',
    homeFeature2Desc:
      'Use your voice to ask for farming advice, weather updates, and more.',
    homeFeature3Title: 'Market Insights',
    homeFeature3Desc:
      'Get real-time market prices and government scheme information for your location.',
    imageUploadTitle: 'Diagnose Plant Disease',
    imageUploadDesc:
      'Upload an image of an affected plant leaf to get a diagnosis.',
    imageUploadButton: 'Select Image',
    imageUploading: 'Analyzing image...',
    imageDiagnosisResult: 'Diagnosis Result',
  },
};
