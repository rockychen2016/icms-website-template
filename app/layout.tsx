import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { NextIntlClientProvider } from "next-intl";
import { buildServer } from "./api/services/server";


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const server = await buildServer();
  const site = await server.loadWebsite({showNav:true, showI18NList:true})
  const navs = site.website.websiteNavVOList??[]
  const i18nList = site.i18nSites??[]
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar i18nList={i18nList} navList={navs} />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <a
                  className="flex items-center gap-1 text-current no-underline"
                  href="https://www.icms.xin"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-muted">Powered by</span>
                  <p className="text-accent">iCMS.xin</p>
                </a>
              </footer>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
