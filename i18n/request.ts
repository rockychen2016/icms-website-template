import { getRequestConfig, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { defaultLocale } from './config';
import { getLocale } from './service';
export default getRequestConfig(async () => {
  const locale = await getLocale();
  let msg;
  try {
    msg = (await import(`./lang/${locale}.json`)).default;
  } catch (e) {
    msg = (await import(`./lang/${defaultLocale}.json`)).default;
  }
  return {
    locale,
    messages: msg
  };
});

export const MetaData = async (ns: string, subns?: string): Promise<Metadata> => {
  const t = await getTranslations(ns);
  const title = subns ? (t('title') + t(`${subns}.title`)) : t('title');
  const description = subns ? t(`${subns}.description`) : t('description');
  return {
    title: title,
    description: description,
  }
}

export const MetaDataDynamic = async (ns: string, name: string): Promise<Metadata> => {
  const t = await getTranslations(ns);
  return {
    title: t('title', { "name": name }),
    description: t('description'),
  }
}

export const GetI18n = async (ns: string, key: string): Promise<string> => {
  const t = await getTranslations(ns);
  return t(key);
}
