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
  gr: {
    error: {
      title: "Etwas ist schief gelaufen",
      description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      retry: "Erneut versuchen",
    },
    notFound: {
      title: "Seite nicht gefunden",
      description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zurück zur Startseite",
    },
  },
  sp: {
    error: {
      title: "Algo salió mal",
      description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      retry: "Intentar de nuevo",
    },
    notFound: {
      title: "Página no encontrada",
      description: "La página que buscas no existe o fue movida.",
      backHome: "Volver al inicio",
    },
  },
  jp: {
    error: {
      title: "エラーが発生しました",
      description: "予期しないエラーが発生しました。もう一度お試しください。",
      retry: "再試行",
    },
    notFound: {
      title: "ページが見つかりません",
      description: "お探しのページは存在しないか、移動されました。",
      backHome: "ホームに戻る",
    },
  },
};

export function getSystemMessages(locale: string): SystemMessages {
  return messages[isLocale(locale) ? locale : defaultLocale];
}
