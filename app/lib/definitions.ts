export const metas = {
  title: "Lively",
  description: "Live translations on the go, making your conversations lively.",
};

export const menu = [
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

export const navs = [
  {
    href: "/start/solo",
    imageSrc: "/shapes/nav-blue.png",
    alt: "solo",
    label: "Solo",
  },
  {
    href: "/start/converse",
    imageSrc: "/shapes/nav-lightblue.png",
    alt: "converse",
    label: "Converse",
  },
  {
    href: "/start/present",
    imageSrc: "/shapes/nav-lime.png",
    alt: "present",
    label: "Present",
  },
];

export const hero = {
  name: "Lorem Ipsu",
  title: "Consectetur adipisicing",
};

export const links = [
  {
    href: "https://linkedin.com/in/daryl-kevin",
    imageSrc: "/links/linkedin.png",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/darylkevin/Lively",
    imageSrc: "/links/github.png",
    alt: "GitHub",
  },
  {
    href: "mailto:dkevin77@connect.hku.hk",
    imageSrc: "/links/email.png",
    alt: "Email",
  },
];

export const cards = [
  {
    title: "Platform Agnostic",
    description:
      "Lively works on any browser, any devices. Internet connection is all you need.",
    imageSrc: "/cards/platform-agnostic.jpg",
    alt: "Platform Agnostic",
  },
  {
    title: "Broad Language Coverage",
    description:
      "With over 50 languages supported, Lively welcomes international interactions.",
    imageSrc: "/cards/broad-language.webp",
    alt: "Broad Language Coverage",
  },
  {
    title: "Instant Feedback",
    description:
      "See and hear your translations appear in real time. Keep your conversation flowing.",
    imageSrc: "/cards/instant-feedback.webp",
    alt: "Instant Feedback",
  },
  {
    title: "All-in-One Solution",
    description:
      "Whether you're chatting, presenting, or just exploring, Lively got you covered.",
    imageSrc: "/cards/all-in-one.webp",
    alt: "All-in-One Solution",
  },
];

export const features = [
  {
    imageSrc: "/features/solo.webp",
    alt: "Feature: Solo Translate",
    subtitle: "Solo Mode",
    title: "Swift Translation",
    description1:
      "Break the language barrier on the go. Instantly translate your voice into up to 10 languages at once — perfect for exploring, learning, or meeting new friends anywhere.",
    description2:
      "Just start talking and watch your words accurately transcribed and translated in multiple languages, all at a glimpse. No complicated setup required.",
  },
  {
    imageSrc: "/features/converse.webp",
    alt: "Feature: Conversational",
    subtitle: "Converse Mode",
    title: "Focused Conversation",
    description1:
      "Your personal interpreter, ready whenever you are. Chat with whoever you meet — even if you don’t share a language.",
    description2:
      "Simply tap to switch speakers and enjoy smooth, live translations that keep your conversations going strong.",
  },
  {
    imageSrc: "/features/present.webp",
    alt: "Feature: Live Presentation",
    subtitle: "Present Mode",
    title: "Pitch Without Borders",
    description1:
      "Captivate any crowd with Present Mode. Show off your pitch, teach, or tell your story while your words are translated live, side by side with your slides.",
    description2:
      "Just speak and your audience sees instant translations — perfect for making your ideas shine, anywhere in the world.",
  },
];

export const faq = [
  {
    question: "Which browser supports Lively?",
    answer:
      "All of them! Lively works on any modern browser, including Chrome, Firefox, Safari, and Edge.",
  },
  {
    question: "What are Local Quota and Global Quota?",
    answer:
      "Local quota refers to the amount of translation you can perform based on your network IP address. Global quota is the total translation capacity available across all users.",
  },
  {
    question: "What should I do if my local or global quota is insufficient?",
    answer:
      "For local quota issues, try switching to a different network or IP address. Global quota is reset daily, so you can try again the next day.",
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
      "Yes! You can clone or contribute to the project on GitHub (links are available in the navbar and footer). If you wish to deploy locally, you will need to get your own API keys for Azure Translator, Speech Recognition and Supabase.",
  },
  {
    question: "How to share a feedback or report a bug?",
    answer:
      "You can share feedback or report bugs through the feedback form available in the app or by clicking the feedback link or emailing me directly (see footer).",
  },
];

export const feedback = {
  paragraph1:
    "Whoever you are, I would like to sincerely thank you for trying out Lively. It all begins when I joined KubeCon earlier in 2024, where they had live translations for many of their sessions. I figured that this should not be too difficult to implement, but at the same time there are not a lot of open source projects that do this. Therefore, I decided to build a one-stop solution for live translations, focusing solely on translating conversations, whether it is for your own use, conversations, and presentations.",
  paragraph2:
    "If you have anything to share (your experiences, suggestions, bugs discovered), or simply want to say hi, please do not hesitate to type your message or email me below. Thanks, and I hope you have a great day!",
  author: "Daryl",
  email: "dkevin77@connect.hku.hk",
};

export const footer = {
  appName: "Lively 1.0",
  description: " — Made with NextJS, Supabase and Azure.",
  emailHref: "mailto:dkevin77@connect.hku.hk",
  email: "dkevin77@connect.hku.hk",
  githubHref: "https://github.com/darylkevin/Lively",
  github: "github.com/darylkevin/Lively",
  copyright: `© ${new Date().getFullYear()} Daryl Kevin. All rights reserved.`,
};
