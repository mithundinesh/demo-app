import React, { useState, useEffect } from "react";
import RootLayout from "@/components/Layout/layout";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from "next/router";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function FinalPage() {
    const router = useRouter();

    const [lang, setLang] = useState("en")
    const [locale, setLocale] = useState({})

    useEffect(() => {

        setLang(router.query.slug[4])

    }, [router.query.slug])

    useEffect(() => {

        const localeTemp = require("../../locales/" + lang + "/common.json")
        setLocale(localeTemp)

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
                    <div className="flex"><p className="font-bold basis-1/2">{locale.name} : </p> {router.query.slug[0]}</div>
                    <div className="flex"><p className="font-bold basis-1/2">{locale.email} : </p> {router.query.slug[1]}</div>
                    <div className="flex"><p className="font-bold basis-1/2">{locale.age} : </p> {router.query.slug[2]}</div>
                    <div className="flex"><p className="font-bold basis-1/2">{locale.phone} : </p> {router.query.slug[3]}</div>
                </div>


            </div>
        </RootLayout>
    );
}






