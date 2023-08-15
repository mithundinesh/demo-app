import React, { useState } from "react";
import RootLayout from "@/components/Layout/layout";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from "axios";


export default function LanguagePage({ data }) {
    const router = useRouter()
    const [lang, setLang] = useState("en")
    const submitHandler = () => {
        const params = { data, lang }
        if (lang === "en")
            router.push({ pathname: `/final/${data.name}/${data.email}/${data.age}/${data.phone}` }, "", { locale: lang })
        else
            router.push({ pathname: `bm/${data.name}/${data.email}/${data.age}/${data.phone}` }, "", { locale: lang })

    }
    return (
        <RootLayout>
            <div className="h-96 w-96 bg-white p-2">
                <h1 className="font-bold">Step 2 : </h1>
                <h1 className="mb-4 font-bold">Select Language </h1>
                <FormControl className="my-2" fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                        value={lang}
                        label="Language"
                        onChange={(e) => setLang(e.target.value)}
                    >
                        <MenuItem value="en">EN</MenuItem>
                        <MenuItem value="bm">BM</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={submitHandler} variant="outlined">Submit</Button>
            </div>
        </RootLayout>
    );
}

export async function getServerSideProps({ params, query, req, res }) {

    const response = await axios.get("http://localhost:3000/api/data");


    return { props: { data: JSON.parse(response.data) } }
}

