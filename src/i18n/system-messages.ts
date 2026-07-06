import { type Locale, defaultLocale, isLocale } from "./config";

/**
 * Client-safe strings for the error and not-found boundaries. These live
 * separately from the server-only dictionaries so client components (error.tsx)
 * can render localized copy without hardcoding text.
 */
type SystemMessages = {
  error: { title: string; description: string; retry: string };
  notFound: { title: string; description: string; backHome: string };
};

const messages: Record<Locale, SystemMessages> = {
  en: {
    error: {
      title: "Something went wrong",
      description: "An unexpected error occurred. Please try again.",
      retry: "Try again",
    },
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist or was moved.",
      backHome: "Back to home",
    },
  },
  fr: {
    error: {
      title: "Une erreur est survenue",
      description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
      retry: "Réessayer",
    },
    notFound: {
      title: "Page introuvable",
      description: "La page que vous cherchez n'existe pas ou a été déplacée.",
      backHome: "Retour à l'accueil",
    },
  },
  ar: {
    error: {
      title: "حدث خطأ ما",
      description: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
      retry: "أعد المحاولة",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      backHome: "العودة إلى الرئيسية",
    },
  },
  hi: {
    error: {
      title: "कुछ गलत हो गया",
      description: "एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।",
      retry: "पुनः प्रयास करें",
    },
    notFound: {
      title: "पेज नहीं मिला",
      description: "आप जो पेज खोज रहे हैं वह मौजूद नहीं है या हटा दिया गया है।",
      backHome: "होम पर वापस जाएँ",
    },
  },
  te: {
    error: {
      title: "ఏదో తప్పు జరిగింది",
      description: "ఊహించని లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
      retry: "మళ్లీ ప్రయత్నించండి",
    },
    notFound: {
      title: "పేజీ కనబడలేదు",
      description: "మీరు వెతుకుతున్న పేజీ లేదు లేదా తరలించబడింది.",
      backHome: "హోమ్‌కు తిరిగి వెళ్లండి",
    },
  },
};

export function getSystemMessages(locale: string): SystemMessages {
  return messages[isLocale(locale) ? locale : defaultLocale];
}
