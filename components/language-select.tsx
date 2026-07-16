'use client'
import { FC, useEffect, useMemo, useState } from "react"
import { ICmsSelect } from "./ui/icms-select"
import { I18NWebsite } from "icms-api"
import { useRouter } from "next/navigation";
import { setLocale } from "@/i18n/service";
import { useAppStore } from "@/stores/app.store";
import { useShallow } from "zustand/shallow";

export interface LanguageSelectProps {
    locale?: string,
    languageData: Array<I18NWebsite>
}

export const LanguageSelect: FC<LanguageSelectProps> = ({ locale, languageData }) => {
    const { setLang, lang } = useAppStore(useShallow((state) => ({
        setLang: state.setLocale,
        lang: state.locale
    })))
    const [selectKey, setSelectKey] = useState<string>(lang ?? locale ?? 'zh-CN');
    const router = useRouter();
    const items = useMemo(() => {
        return languageData.map(item => ({
            ...item,
            id: item.code
        }))
    }, [languageData])

    useEffect(()=>{
        if(lang && lang!==locale){
            const website = languageData.find(item => item.code === lang);
            if(website){
                setLocale(website).then(()=>{
                    setLang(website.code);
                    setSelectKey(website.code);
                    router.refresh();
                })
            }
        }
    },[lang, locale, languageData, router])


    if (!selectKey) {
        return null
    }

    return (
        <ICmsSelect
            data={items}
            value={selectKey}
            onRenderItem={(item) => {
                return <div className="flex items-center text-sm">
                    {item.name}
                </div>
            }}
            onChange={async (key) => {
                const website = languageData.find(item => item.code === key);
                if (website) {
                    await setLocale(website);
                    setLang(website.code);
                    setSelectKey(website.code);
                    router.refresh();
                }
            }}
        />
    );
}