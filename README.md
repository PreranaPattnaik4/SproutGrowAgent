**Live Demo:** [https://sproutgrowagent.onrender.com/](https://sproutgrowagent.onrender.com/)

# SproutGrow Agent - AI Farming Companion

## 1. Project Overview

SproutGrow Agent is a web-based application designed to act as an "AI Farming Companion." It aims to provide farmers with modern tools to enhance their productivity and decision-making. The application leverages generative AI to offer features like plant disease diagnosis, a unified AI assistant (supporting text, voice, and image inputs), and personalized crop planning.

The application is built on a modern, robust, and scalable technology stack, ensuring a high-quality user experience and a professional, responsive design.

## 2. Application Architecture

SproutGrow Agent is built with a modern, server-centric architecture that leverages the full potential of Next.js for the frontend and Genkit for the AI backend. This separation of concerns creates a secure, scalable, and maintainable application.

### Architectural Diagram


### Component Breakdown

-   **Client-Side (User's Browser):**
    -   The user interacts with a responsive frontend built with **React** and **Next.js**.
    -   **ShadCN UI** components provide the building blocks for the user interface, ensuring a consistent and accessible experience.
    -   User actions, such as uploading an image or sending a chat message, are captured by client-side components.
    -   The browser's native **Web Speech API** is used for voice input, and the **Geolocation API** is used to fetch the user's location.

-   **Web Server (Next.js):**
    -   The **Next.js App Router** handles all routing and renders React Server Components (RSCs), which reduces the amount of JavaScript sent to the client.
    -   The application uses **Next.js Server Actions** to handle communication between the client and the backend. When a user triggers an AI-related action, the client component calls a Server Action, which securely executes on the server.

-   **AI Backend (Genkit Flows):**
    -   All AI logic is encapsulated within **Genkit flows**, which are TypeScript functions that run on the server. This is the core of our AI backend.
    -   These flows are defined in the `src/ai/flows/` directory. Each flow is responsible for a specific task (e.g., diagnosing a plant disease, generating a crop plan, or converting text to speech).
    -   **Zod** is used to define strong schemas for the inputs and outputs of each flow, ensuring data integrity.
    -   Within a flow, we define prompts for the Gemini models, process input data (like converting an image to a data URI), and call the Google AI API through the Genkit framework.
    -   Because all AI interactions happen within these server-side flows, API keys and other sensitive information are never exposed to the client.

-   **Google AI Platform:**
    -   This is the external service that hosts and runs the powerful **Gemini models** (including vision, text, and TTS models).
    -   Genkit abstracts away the complexity of making API calls to this platform, allowing us to simply call our defined prompts and receive structured output.

This architecture ensures that the application is both powerful and secure. The frontend remains lightweight and responsive, while the heavy lifting of AI processing is handled by a robust, server-side backend.

## 3. Technology Stack

### 3.1. Frontend Technologies
- **Framework:** Next.js 14 (with App Router) & React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS with ShadCN UI components for a consistent and professional design system.
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`) and Context API for managing component-level and application-wide state.
- **Form Handling:** React Hook Form with Zod for robust form validation.
- **UI Libraries:**
    - `lucide-react` for icons.
    - `date-fns` for date formatting.

### 3.2. Backend (AI) Technologies
- **AI Framework:** Genkit, an open-source framework from Google, is used to build, manage, and monitor the application's AI capabilities.
- **AI Models:** The application leverages Google's Gemini family of models (including `gemini-2.5-flash` for vision/text and `gemini-2.5-flash-preview-tts` for speech) for all generative AI tasks.
- **Server-Side Logic:** Genkit flows, written in TypeScript and marked with `'use server'`, run on the server side to securely handle AI model interactions and data processing.
- **Data Validation:** Zod is used extensively to define schemas for the inputs and outputs of the Genkit flows, ensuring type safety and data integrity.
- **Audio Processing:** The `wav` library is used to process and format the audio output from the Text-to-Speech model.
- **Deployment:** The application is configured for deployment on Render via Firebase App Hosting, a serverless platform optimized for modern web apps.

## 4. Implemented Features

### 4.1. Image-Based Plant Disease Diagnosis
- **Files:** `src/app/image-diagnosis/page.tsx`, `src/components/features/image-diagnosis-form.tsx`
- **AI Flow:** `src/ai/flows/diagnose-plant-disease-from-image.ts`
- **Description:** Users can upload an image of a plant leaf. The application sends the image to a Genkit AI flow, which analyzes it using a vision model and returns a potential disease diagnosis. The result is displayed to the user in an organized card layout.

### 4.2. Unified AI Assistant
- **Files:** `src/app/ai-assistant/page.tsx`, `src/components/features/unified-assistant.tsx`
- **AI Flows:** 
    - `src/ai/flows/answer-text-query-with-chat-history.ts`
    - `src/ai/flows/text-to-speech.ts`
- **Description:** A comprehensive, multi-modal assistant that supports interaction via text, voice, and image uploads. The AI maintains chat history to provide contextual follow-up answers and delivers spoken responses for voice queries.

### 4.3. AI Crop Planner
- **Files:** `src/app/crop-planner/page.tsx`, `src/components/features/detailed-crop-planner.tsx`
- **AI Flow:** `src/ai/flows/generate-detailed-crop-plan.ts`
- **Description:** A dedicated page where users can get a personalized crop plan. By providing a soil image (optional), location, and planting date, the AI generates a detailed recommendation, a step-by-step planting plan, and additional tips for a successful harvest.

### 4.4. Local Information Hub
- **Files:** `src/app/location-info/page.tsx`, `src/components/features/location-info-display.tsx`
- **Description:** This page uses the browser's geolocation API to fetch the user's current location. It then displays mock data for local weather forecasts, market prices for crops, and relevant government schemes, all presented in a clean, card-based interface.

### 4.5. Digital Solutions & Other Pages
- **Files:** `src/app/digital-solutions/page.tsx`, `src/app/about-us/page.tsx`, `src/app/help/page.tsx`
- **Description:** A collection of informational pages that provide details on other services, the company's mission, and a Help/FAQ section. The Digital Solutions page includes a simplified crop planner for quick recommendations.
