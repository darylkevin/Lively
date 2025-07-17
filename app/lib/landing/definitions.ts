export const navs = [
  {
    href: "/start/solo",
    alt: "Main App",
    label: "Main App",
  },
  {
    href: "/feedback",
    alt: "Feedback",
    label: "Feedback",
  },
];

export const links = [
  {
    href: "google.com",
    imageSrc: "/links/linkedin.png",
    alt: "LinkedIn",
  },
  {
    href: "google.com",
    imageSrc: "/links/github.png",
    alt: "GitHub",
  },
  {
    href: "google.com",
    imageSrc: "/links/email.png",
    alt: "Email",
  },
];

export const cards = [
  {
    title: "Voice Recognition",
    description:
      "Speak naturally and get seamless, hands-free translations—just like having a conversation.",
    imageSrc: "/cards/placeholder.webp",
    alt: "Voice Recognition",
  },
  {
    title: "Privacy First",
    description:
      "Your words, your privacy. Nothing is ever stored—not even your translations.",
    imageSrc: "/cards/placeholder.webp",
    alt: "Privacy First",
  },
  {
    title: "Instant Feedback",
    description:
      "See and hear your translations appear in real time. Keep your conversation flowing.",
    imageSrc: "/cards/placeholder.webp",
    alt: "Instant Feedback",
  },
  {
    title: "Multi-Mode Support",
    description:
      "Whether you're chatting, presenting, or just exploring, Lively has you covered.",
    imageSrc: "/cards/placeholder.webp",
    alt: "Multi-Mode Support",
  },
];

export const features = [
  {
    imageSrc: "/features/placeholder.webp",
    alt: "Feature: Solo Translate",
    subtitle: "Swift Translation",
    title: "Solo",
    description1:
      "Break the language barrier on the go. Instantly translate your voice into up to 10 languages at once — perfect for exploring, learning, or meeting new friends anywhere.",
    description2:
      "Just start talking and watch your words pop up in multiple languages, all at lightning speed. No need to repeat yourself or fiddle with settings.",
  },
  {
    imageSrc: "/features/placeholder.webp",
    alt: "Feature: Conversational",
    subtitle: "Real-time Conversation",
    title: "Converse",
    description1:
      "Your personal interpreter, ready whenever you are. Chat easily with anyone — even if you don’t share a language.",
    description2:
      "Simply tap to switch speakers and enjoy smooth, live translations that keep your conversations going strong.",
  },
  {
    imageSrc: "/features/placeholder.webp",
    alt: "Feature: Live Presentation",
    subtitle: "Pitch Ideas, Internationally",
    title: "Present",
    description1:
      "Captivate any crowd with Present Mode. Show off your pitch, teach, or tell your story while your words are translated live, side by side with your slides.",
    description2:
      "Just speak and your audience sees instant translations — perfect for making your ideas shine, anywhere in the world.",
  },
];

export const faq = [
  {
    question: "Which browser is best for using Lively?",
    answer:
      "On desktop: Edge (recommended for speech synthesis), Chrome, Firefox, and Safari. On mobile: Safari (iOS) or Chrome (Android, Low compatibility).",
  },
  {
    question: "What are Local Quota and Global Quota?",
    answer:
      "Local quota refers to the amount of translation you can perform based on your network IP address. Global quota is the total translation capacity available across all users.",
  },
  {
    question: "What should I do if my local or global quota is insufficient?",
    answer:
      "For local quota issues, try switching to a different network or IP address. Global quota is reset daily, so you can try again later.",
  },
  {
    question: "Why are there quota limits?",
    answer:
      "The current limits are due to Azure's Translation AI character restrictions under the Free Tier (F0). You can remove these limits by cloning the project and using your own Azure Translator API key.",
  },
  {
    question: "Why does translation speed vary?",
    answer:
      "The translation service is currently hosted in East Asia. Performance may vary depending on your geographic location.",
  },
  {
    question: "How can I fix mic access error?",
    answer:
      "Ensure you have granted microphone permissions to your browser. Then, refresh the page and try again.",
  },
  {
    question: "Is the codebase available on GitHub?",
    answer:
      "Yes! You can clone or contribute to the project on GitHub (links are available in the navbar and footer).",
  },
  {
    question: "How to share a feedback or report a bug?",
    answer:
      "You can share feedback or report bugs through the feedback form available in the app or by clicking the feedback link or emailing me directly (see footer).",
  }
];

export const footer = {
  appName: "Lively 1.0",
  description: " — Made with NextJS, Supabase and Azure.",
  emailHref: "mailto:mikael_daryl77@yahoo.com",
  email: "mikael_daryl77@yahoo.com",
  githubHref: "https://github.com/darylkevin/Lively",
  github: "github.com/darylkevin/Lively",
  copyright: `© ${new Date().getFullYear()} Daryl Kevin. All rights reserved.`,
}
