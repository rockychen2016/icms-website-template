'use server';

import { cookies, headers } from 'next/headers';
import { defaultLocale, locales } from './config';
import { I18NWebsite } from 'icms-api';
import { COOKIE_NAMES } from "@rock.chen/icms-http-client"
const COOKIE_LOCALE_NAME = COOKIE_NAMES.IBOOT_LANG;
const COOKIE_WEBSITE_ID = COOKIE_NAMES.IBOOT_WEBSITE_ID;
const COOKIE_WEBSITE_NO = COOKIE_NAMES.IBOOT_WEBSITE_NO;

export async function getLocale() {
  const locale = (await cookies()).get(COOKIE_LOCALE_NAME)?.value
  if (locale) return locale
  const acceptLanguage = (await headers()).get('accept-language')
  const parsedLocale = acceptLanguage?.split(',')[0].split('-')[0] ?? ''
  const lang = locales.includes(parsedLocale) ? parsedLocale : defaultLocale;
  return lang;
}

export async function setLocale(website:I18NWebsite) {
  const cookie = await cookies();
  cookie.set(COOKIE_LOCALE_NAME, website.code);
  cookie.set(COOKIE_WEBSITE_ID, website.websiteId);
  cookie.set(COOKIE_WEBSITE_NO, website.websiteNo);
}