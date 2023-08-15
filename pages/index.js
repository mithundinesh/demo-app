import React, { useState, useEffect } from "react";
import RootLayout from "@/components/Layout/layout";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Router from "next/router";
import axios from "axios";

export default function Index() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    const nextHandler = async () => {
        try {
            if (name && email) {
                const res = await axios.post("/api/data", { name, email, })
                if (res.status === 200) {
                    Router.push("/details")
                }
            } else {
                setError("Please fill input fields")
            }
        }
        catch (e) {
            // error
        }

    }
    return (
        <RootLayout>
            <div className="h-96 w-96 bg-white p-2">
                <h1 className="font-bold">Step 1 : </h1>
                <h1 className="mb-4 font-bold">Tell Us More About You </h1>
                <div className="flex flex-col">
                    <FormControl className="m-2" variant="standard">
                        <InputLabel htmlFor="component-helper">Name</InputLabel>
                        <Input
                            id="name-iput"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{ maxLength: 10 }}

                        />
                        <FormHelperText id="component-helper-text">
                            {10 - name.length} characters remaining
                        </FormHelperText>
                    </FormControl>
                    <FormControl className="m-2" variant="standard">
                        <InputLabel htmlFor="component-helper">Email</InputLabel>
                        <Input
                            id="email-iput"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    {error && <div className="text-red-600">{error}</div>}
                    <Button onClick={nextHandler} variant="outlined">Next</Button>
                </div>
            </div>
        </RootLayout >
    );
}
