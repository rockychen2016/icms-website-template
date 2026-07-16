
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  Logo,
} from "@/components/icons";
import { LanguageSelect } from "./language-select";
import { getLocale } from "next-intl/server";
import { I18NWebsite, WebsiteNavVO } from "icms-api";
import { GetI18n } from "@/i18n/request";

export const Navbar = async ({ navList, i18nList }: Readonly<{
  navList: Array<WebsiteNavVO>,
  i18nList: Array<I18NWebsite>
}>) => {
  const locale = await getLocale();
  const home = await GetI18n('nav','home')
  //const i18nlist = await (await buildServer()).loadI18nList();
  // const searchInput = (
  //   <TextField aria-label="Search" type="search">
  //     <InputGroup>
  //       <InputGroup.Prefix>
  //         <SearchIcon className="text-base text-muted pointer-events-none flex-shrink-0" />
  //       </InputGroup.Prefix>
  //       <InputGroup.Input className="text-sm" placeholder="Search..." />
  //       <InputGroup.Suffix>
  //         <Kbd className="hidden lg:inline-flex">
  //           <Kbd.Abbr keyValue="command" />
  //           <Kbd.Content>K</Kbd.Content>
  //         </Kbd>
  //       </InputGroup.Suffix>
  //     </InputGroup>
  //   </TextField>
  // );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-4">
          <NextLink className="flex items-center gap-1" href="/">
            <Logo />
          </NextLink>
          <ul className="hidden lg:flex gap-6 ml-2">
            <NextLink
              className={clsx(
                "text-foreground hover:text-accent transition-colors",
                "data-[active=true]:text-accent data-[active=true]:font-medium",
              )}
              href="/"
            >
              {home}
            </NextLink>
            {navList.map((item) => (
              <li key={item.id}>
                <NextLink
                  className={clsx(
                    "text-foreground hover:text-accent transition-colors",
                    "data-[active=true]:text-accent data-[active=true]:font-medium",
                  )}
                  href={`${item.jumpUrl ? item.jumpUrl : item.uri}`}
                  target={item.jumpUrl ? '_blank' : '_self'}
                >
                  {item.jumpText ? item.jumpText : item.name}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {/* <div className="hidden lg:flex">{searchInput}</div> */}
          <ThemeSwitch />
          <div className="hidden md:flex">
            <LanguageSelect languageData={i18nList} locale={locale} />
          </div>
        </div>
      </header>
    </nav>
  );
};
