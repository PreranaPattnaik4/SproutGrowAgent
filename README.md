**Live Demo:** [https://sproutgrowagent.onrender.com/](https://sproutgrowagent.onrender.com/)

# SproutGrow Agent - AI Farming Companion

## 1. Project Overview

SproutGrow Agent is a web-based application designed to act as an "AI Farming Companion." It aims to provide farmers with modern tools to enhance their productivity and decision-making. The application leverages generative AI to offer features like plant disease diagnosis, a unified AI assistant (supporting text, voice, and image inputs), and access to localized farming information.

The application is built on a modern, robust, and scalable technology stack, ensuring a high-quality user experience and a professional, responsive design.

## 2. Technology Stack

### 2.1. Frontend Technologies
- **Framework:** Next.js (with App Router) & React
- **Language:** TypeScript
- **Styling:** Tailwind CSS with ShadCN UI components for a consistent and professional design system.
- **State Management:** React Hooks and Context API for managing component-level and application-wide state.

### 2.2. Backend (AI) Technologies
- **AI Framework:** Genkit, an open-source framework from Google, is used to build, manage, and monitor the application's AI capabilities.
- **AI Models:** The application leverages Google's Gemini family of models (including vision and text models) for all generative AI tasks, such as image analysis and conversational chat.
- **Server-Side Logic:** Genkit flows, written in TypeScript and marked with `'use server'`, run on the server side to securely handle AI model interactions and data processing.

## 3. Application Architecture

SproutGrow Agent is built with a modern, server-centric architecture that leverages the full potential of Next.js and Genkit.

- **Client-Side (Browser):** The frontend is composed of interactive React components. These components are responsible for capturing user input (text, images, voice), managing UI state, and displaying results. They communicate with the server via Next.js Server Actions.
- **Web Server (Next.js):** The Next.js server handles routing, renders React Server Components, and serves static assets. When a user interacts with an AI feature, the client-side component calls a Server Action.
- **AI Backend (Genkit Flows):** The Server Actions directly invoke Genkit flows. These flows are server-side TypeScript functions that define the logic for interacting with the Gemini models. They handle prompt engineering, data formatting (e.g., preparing an image for analysis), and calling the Google AI API. This ensures that all AI processing and API key management happen securely on the server.
- **Google AI Platform:** This is the external service that hosts the powerful Gemini models. Genkit handles the communication with this platform, sending the prepared prompts and receiving the generated responses.

This architecture ensures a secure, scalable, and efficient application. By keeping all AI logic on the server, we protect sensitive API keys and can perform complex data processing without slowing down the user's browser.

## 4. Implemented Features

As of the current version, the following key features have been successfully implemented and are accessible through a responsive header and mobile-friendly sidebar navigation.

### 4.1. Homepage
- **File:** `src/app/page.tsx`
- **Description:** A welcoming landing page that provides an overview of the application's core features. It includes a dynamic hero section, quick-access cards to navigate to the main functionalities (Image Diagnosis, AI Assistant), and links to explore digital solutions and learn more about the company's mission. It also features a location bar that shows the user's current coordinates and mock weather data.

### 4.2. Image-Based Plant Disease Diagnosis
- **File:** `src/app/image-diagnosis/page.tsx`, `src/components/features/image-diagnosis-form.tsx`
- **AI Flow:** `src/ai/flows/diagnose-plant-disease-from-image.ts`
- **Description:** Users can upload an image of a plant leaf. The application sends the image to a Genkit AI flow, which analyzes it using a vision model and returns a potential disease diagnosis. The result is displayed to the user in an organized card layout.

### 4.3. Unified AI Assistant
- **File:** `src/app/ai-assistant/page.tsx`, `src/components/features/unified-assistant.tsx`
- **AI Flow:** `src/ai/flows/answer-text-query-with-chat-history.ts`
- **Description:** A comprehensive, multi-modal assistant that supports interaction via text, voice, and image uploads. The AI maintains chat history to provide contextual follow-up answers. It also includes features to download the conversation history and share the latest AI response on WhatsApp.

### 4.4. AI Crop Planner
- **File:** `src/app/crop-planner/page.tsx`, `src/components/features/detailed-crop-planner.tsx`
- **AI Flow:** `src/ai/flows/generate-detailed-crop-plan.ts`
- **Description:** A dedicated page where users can get a personalized crop plan. By providing a soil image (optional), location, and planting date, the AI generates a detailed recommendation, a step-by-step planting plan, and additional tips for a successful harvest.

### 4.5. Local Information Hub
- **File:** `src/app/location-info/page.tsx`, `src/components/features/location-info-display.tsx`
- **Description:** This page uses the browser's geolocation API to fetch the user's current location. It then displays mock data for local weather forecasts, market prices for crops, and relevant government schemes, all presented in a clean, card-based interface.

### 4.6. Digital Solutions
- **File:** `src/app/digital-solutions/page.tsx`
- **Description:** An informational page that lists various digital services available to farmers, such as Soil Testing, Crop Insurance, and Market Linkage. It features an interactive accordion layout. It also contains a simplified version of the crop planner for quick, high-level plans.

### 4.7. About Us & Informational Pages
- **File:** `src/app/about-us/page.tsx`, `src/app/help/page.tsx`, `src/app/privacy-policy/page.tsx`
- **Description:** A set of pages detailing the mission of SproutGrow Agent, a Help/FAQ section to guide users, and a standard Privacy Policy.

### 4.8. User Authentication
- **File:** `src/components/features/auth-dialog.tsx`
- **Description:** A dialog-based authentication flow has been implemented, providing a placeholder for mobile number and OTP verification. This sets the foundation for future integration with Firebase Authentication.
