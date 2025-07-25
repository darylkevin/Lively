<img src="public/logo/lively-brand.png" alt="Lively Image" width="200" />

Thank you for checking out Lively! If you are interested to know more about this project, you have come to the right place.
Below is a quick overview on how to run Lively locally. Contributions and feedback are welcome!
See the project live here:

<div className="flex gap-4">
  <video width="320" height="240" controls className="flex-1">
    <source src="public/demo/landing-page.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <video width="320" height="240" controls className="flex-1">
    <source src="public/demo/lively-demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

**[Live Demo](https://lively-one.vercel.app/)**

---

## ✨ Features

- **Real-time Speech Recognition and Translation**: Transcribe and translate audio accurately.
- **All-in-One Solution**: Solo, Converse and Present. Lively supports them all.
- **Broad Language Coverage**: Supports over 50 languages.
- **Text-to-Speech**: Listen to translated text spoken aloud.
- **Usage Tracking**: Optional backend integration with Supabase for logging and feedback.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript
- **AI Services**: Azure AI for Translation & Speech Recognition
- **Backend (Optional)**: Supabase for usage calculation, logs, and feedback.
- **Speech Synthesis**: `react-speech-kit` (utilizes browser-native capabilities)

---

## 🚀 Getting Started

You can deploy Lively locally for development or personal use.

### Prerequisites

- Node.js (v18 or later)
- `pnpm` (or `npm`/`yarn`)
- **Azure Account**: API keys for Translation and Speech services.
- **Supabase Account (Optional)**: A project for the database backend.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/lively.git](https://github.com/your-username/lively.git)
    cd lively
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the project and add the following keys.

    ```env
    # Azure AI Services for Translation & general AI
    AZURE_ENDPOINT=YOUR_AZURE_ENDPOINT
    AZURE_LOCATION=YOUR_AZURE_LOCATION
    AZURE_API_KEY=YOUR_AZURE_TRANSLATOR_API_KEY

    # Azure AI Services for Speech Recognition
    AZURE_SPEECH_KEY=YOUR_AZURE_SPEECH_KEY
    AZURE_SPEECH_REGION=YOUR_AZURE_SPEECH_REGION

    # Supabase (Optional: for logging, feedback, and usage stats)
    # You can opt-out of the backend if you don't need this functionality.
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    # Usage Limits (Optional)
    NEXT_PUBLIC_MAX_LOCAL_CHARS_PER_DAY=10000
    NEXT_PUBLIC_MAX_GLOBAL_CHARS_PER_DAY=100000
    ```

---

## ⚙️ Usage

- **Run the development server:**

  ```bash
  pnpm run dev
  ```

- **Build for production:**

  ```bash
  pnpm build
  pnpm start
  ```

- **Format the code:**
  ```bash
  pnpm exec prettier --write .
  ```

---

## 🔧 Customization

- **Text & UI**: Most user-facing text descriptions are defined in `src/lib/definitions.ts`.
- **Languages**: The list of supported languages is located in `src/lib/languages.ts`. You can find the full list of languages supported by Azure here:
  - [Translator Language Support](https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support)
  - [Speech Service Language Support](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=stt)

### A Note on Speech Synthesis

The text-to-speech (TTS) functionality is currently handled by `react-speech-kit`, which relies on the Web Speech API. This means voice availability and quality depend on the user's browser. For the best experience, **Microsoft Edge** is recommended, followed by Chrome and Safari.

---

## 🙌 Contributing & Feedback

Contributions are welcome! Please feel free to open an issue to report bugs or suggest features.

If you have any specific feedback or wish to get in touch privately, you can reach me at **xx@xx.com**.

Cheers!
