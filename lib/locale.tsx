import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

const loadLocaleMessages = async (locale: string) => {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error("Failed to load locale messages:", error);
    return {};
  }
};

interface LocaleProviderProps {
  children: ReactNode;
} 

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const currentLocale = Cookies.get("locale") || "en";
    setLocale(currentLocale);

    loadLocaleMessages(currentLocale).then((loadedMessages) => {
      setMessages(loadedMessages);
    });
  }, []);

  if (!Object.keys(messages).length) {
    return <div>Loading...</div>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
