import React, { useState, useEffect } from "react";
import RootLayout from "@/components/Layout/layout";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from "next/router";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function FinalPage() {
    const router = useRouter();
    const { locale } = useRouter();
    const { t } = useTranslation('common')
    const data = router.query.slug

    const [lang, setLang] = useState("")

    useEffect(() => {

        setLang(locale)

    }, [locale])

    useEffect(() => {

        router.push({ pathname: `/final/${data[0]}/${data[1]}/${data[2]}/${data[3]}` }, "", { locale: lang })

    }, [lang])



    return (
        <RootLayout>
            <div className="h-96 w-96 bg-white p-2">
                <h1 className="m-4 font-bold">Final Page</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select
                        value={lang}
                        label="Language"
                        onChange={(e) => setLang(e.target.value)}
                    >
                        <MenuItem value="en">EN</MenuItem>
                        <MenuItem value="bm">BM</MenuItem>
                    </Select>
                </FormControl>
                <div className="m-4">
                    <div className="flex"><p className="font-bold basis-1/2">{t("name")} : </p> {data[0]}</div>
                    <div className="flex"><p className="font-bold basis-1/2">{t("email")} : </p> {data[1]}</div>
                    <div className="flex"><p className="font-bold basis-1/2">{t("age")} : </p> {data[2]}</div>
                    <div className="flex"><p className="font-bold basis-1/2">{t("phone")} : </p> {data[3]}</div>
                </div>


            </div>
        </RootLayout>
    );
}
export const getServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
};








