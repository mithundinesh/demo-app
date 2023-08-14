import React, { useState } from "react";
import RootLayout from "@/components/Layout/layout";
import FormControl from '@mui/material/FormControl';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useRouter } from "next/router";


export default function DetailsPage({ data }) {

    const router = useRouter()

    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null)

    const nextHandler = () => {
        if (age && phone)
            router.push({ pathname: "/language", query: { name: data?.name, email: data?.email, age, phone } })
        else setError("Please fill input fields")
    }

    return (
        <RootLayout>
            <div className="h-96 w-96 bg-white p-2">
                <h1 className="font-bold">Step 1 : </h1>
                <h1 className="mb-4 font-bold">Tell Us More About You </h1>

                <div className="flex flex-col">
                    <FormControl className="m-2" variant="standard">
                        <InputLabel htmlFor="component-helper">Age</InputLabel>
                        <Input
                            id="age-iput"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}


                        />

                    </FormControl>
                    <FormControl className="m-2" variant="standard">
                        <InputLabel htmlFor="component-helper">Phone</InputLabel>
                        <Input
                            id="phone-iput"
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FormControl>

                    {error && <div className="text-red-600 m-2">{error}</div>}
                    <Button onClick={nextHandler} variant="outlined">Next</Button>
                </div>
            </div>
        </RootLayout>
    );
}

export async function getServerSideProps({ params, query, req, res }) {

    return { props: { data: query ?? 0 } }
}
