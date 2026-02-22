import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocaleContextType {
  country: string;
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  setCountry: (country: string) => void;
  formatPrice: (usdPrice: number) => string;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.login": "Login",
    "nav.getStarted": "Get Started",
    "nav.dashboard": "Dashboard",
    "hero.badge": "AI-Powered Growth Platform",
    "hero.title1": "Make the algorithm",
    "hero.title2": "work for you.",
    "hero.desc": "AI analyzes your content and tells you exactly how to get more views, followers, and sales.",
    "hero.cta": "Start for free",
    "hero.secondary": "See how it works",
    "hero.trust": "Trusted by",
    "hero.trustEnd": "creators worldwide",
    "pricing.title": "Simple, transparent pricing",
    "pricing.subtitle": "Start free. Upgrade when you're ready.",
    "pricing.monthly": "Monthly",
    "pricing.annual": "Annual",
    "pricing.save": "Save 20%",
    "pricing.mo": "/month",
    "pricing.yr": "/year",
    "pricing.free": "Free",
    "pricing.popular": "Most Popular",
    "pricing.cta": "Get Started",
    "pricing.current": "Current Plan",
    "growth.title": "Growth Plan",
    "growth.desc": "Your personalized weekly content strategy",
    "growth.regenerate": "Regenerate Ideas",
    "growth.edit": "Edit Strategy",
    "growth.save": "Save Changes",
    "metrics.title": "Metrics",
    "metrics.desc": "Connect your social accounts to track performance",
    "metrics.connect": "Connect Account",
    "metrics.connected": "Connected",
    "metrics.followers": "Followers",
    "metrics.engagement": "Engagement",
    "metrics.views": "Views",
    "metrics.growth": "Growth",
    "billing.title": "Billing",
    "billing.desc": "Manage your subscription and payment history",
    "footer.rights": "All rights reserved.",
  },
  pt: {
    "nav.features": "Recursos",
    "nav.pricing": "Preços",
    "nav.faq": "FAQ",
    "nav.login": "Entrar",
    "nav.getStarted": "Começar",
    "nav.dashboard": "Painel",
    "hero.badge": "Plataforma de Crescimento com IA",
    "hero.title1": "Faça o algoritmo",
    "hero.title2": "trabalhar para você.",
    "hero.desc": "IA analisa seu conteúdo e diz exatamente como obter mais views, seguidores e vendas.",
    "hero.cta": "Comece grátis",
    "hero.secondary": "Veja como funciona",
    "hero.trust": "Confiado por",
    "hero.trustEnd": "criadores no mundo",
    "pricing.title": "Preços simples e transparentes",
    "pricing.subtitle": "Comece grátis. Faça upgrade quando quiser.",
    "pricing.monthly": "Mensal",
    "pricing.annual": "Anual",
    "pricing.save": "Economize 20%",
    "pricing.mo": "/mês",
    "pricing.yr": "/ano",
    "pricing.free": "Grátis",
    "pricing.popular": "Mais Popular",
    "pricing.cta": "Começar",
    "pricing.current": "Plano Atual",
    "growth.title": "Plano de Crescimento",
    "growth.desc": "Sua estratégia de conteúdo semanal personalizada",
    "growth.regenerate": "Regenerar Ideias",
    "growth.edit": "Editar Estratégia",
    "growth.save": "Salvar Alterações",
    "metrics.title": "Métricas",
    "metrics.desc": "Conecte suas contas sociais para acompanhar o desempenho",
    "metrics.connect": "Conectar Conta",
    "metrics.connected": "Conectado",
    "metrics.followers": "Seguidores",
    "metrics.engagement": "Engajamento",
    "metrics.views": "Visualizações",
    "metrics.growth": "Crescimento",
    "billing.title": "Faturamento",
    "billing.desc": "Gerencie sua assinatura e histórico de pagamentos",
    "footer.rights": "Todos os direitos reservados.",
  },
  es: {
    "nav.features": "Características",
    "nav.pricing": "Precios",
    "nav.faq": "FAQ",
    "nav.login": "Iniciar sesión",
    "nav.getStarted": "Empezar",
    "nav.dashboard": "Panel",
    "hero.badge": "Plataforma de Crecimiento con IA",
    "hero.title1": "Haz que el algoritmo",
    "hero.title2": "trabaje para ti.",
    "hero.desc": "La IA analiza tu contenido y te dice exactamente cómo obtener más vistas, seguidores y ventas.",
    "hero.cta": "Empieza gratis",
    "hero.secondary": "Mira cómo funciona",
    "hero.trust": "Confiado por",
    "hero.trustEnd": "creadores en el mundo",
    "pricing.title": "Precios simples y transparentes",
    "pricing.subtitle": "Empieza gratis. Mejora cuando estés listo.",
    "pricing.monthly": "Mensual",
    "pricing.annual": "Anual",
    "pricing.save": "Ahorra 20%",
    "pricing.mo": "/mes",
    "pricing.yr": "/año",
    "pricing.free": "Gratis",
    "pricing.popular": "Más Popular",
    "pricing.cta": "Empezar",
    "pricing.current": "Plan Actual",
    "growth.title": "Plan de Crecimiento",
    "growth.desc": "Tu estrategia de contenido semanal personalizada",
    "growth.regenerate": "Regenerar Ideas",
    "growth.edit": "Editar Estrategia",
    "growth.save": "Guardar Cambios",
    "metrics.title": "Métricas",
    "metrics.desc": "Conecta tus cuentas sociales para seguir el rendimiento",
    "metrics.connect": "Conectar Cuenta",
    "metrics.connected": "Conectado",
    "metrics.followers": "Seguidores",
    "metrics.engagement": "Interacción",
    "metrics.views": "Vistas",
    "metrics.growth": "Crecimiento",
    "billing.title": "Facturación",
    "billing.desc": "Gestiona tu suscripción e historial de pagos",
    "footer.rights": "Todos los derechos reservados.",
  },
};

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  BRL: { symbol: "R$", rate: 5.1 },
  GBP: { symbol: "£", rate: 0.79 },
  MXN: { symbol: "MX$", rate: 17.2 },
  ARS: { symbol: "AR$", rate: 890 },
  COP: { symbol: "COP$", rate: 3950 },
  CLP: { symbol: "CLP$", rate: 930 },
};

const countryToLang: Record<string, string> = {
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  US: "en", GB: "en", CA: "en", AU: "en",
};

const countryToCurrency: Record<string, string> = {
  BR: "BRL", PT: "EUR", US: "USD", GB: "GBP", MX: "MXN",
  AR: "ARS", CO: "COP", CL: "CLP", ES: "EUR", FR: "EUR", DE: "EUR",
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState("US");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    // Auto-detect country via free API
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data.country_code) {
          const cc = data.country_code;
          setCountry(cc);
          setLanguage(countryToLang[cc] || "en");
          setCurrency(countryToCurrency[cc] || "USD");
        }
      })
      .catch(() => {
        // fallback: try browser language
        const browserLang = navigator.language.split("-")[0];
        if (translations[browserLang]) {
          setLanguage(browserLang);
        }
      });
  }, []);

  const formatPrice = (usdPrice: number) => {
    const curr = currencyRates[currency] || currencyRates.USD;
    const converted = Math.round(usdPrice * curr.rate);
    if (currency === "USD") return `$${usdPrice}`;
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LocaleContext.Provider value={{ country, language, currency, setLanguage, setCurrency, setCountry, formatPrice, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export const availableLanguages = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
];

export const availableCurrencies = Object.keys(currencyRates).map((code) => ({
  code,
  symbol: currencyRates[code].symbol,
}));
