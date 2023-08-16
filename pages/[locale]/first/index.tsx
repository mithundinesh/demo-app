import React, { useState, useEffect } from "react";
import RootLayout from "@/app/layout";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Router from "next/router";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { locale } = router.query;
  const { t, i18n } = useTranslation("common");

  const [lang, setLang] = useState("");

  const nextHandler = async () => {
    try {
      if (name && email) {
        const res = await axios.post("/api/data", { name, email });
        router.push({ pathname: `/${lang}/details` }, "", {
          locale: lang === "english" ? "en" : "bm",
        });
      } else {
        setError("Please fill input fields");
      }
    } catch (e) {
      // error
    }
  };

  useEffect(() => {
    if (lang)
      router.push({ pathname: `/${lang}/first` }, "", {
        locale: lang === "english" ? "en" : "bm",
      });
    else setLang(locale);
  }, [locale, lang]);

  return (
    <RootLayout>
      <div className="h-96 w-96 bg-white p-2">
        <h1 className="font-bold">Step 1 : </h1>
        <h1 className="mb-4 font-bold">Tell Us More About You </h1>
        <div className="flex flex-col">
          <FormControl className="m-2" variant="standard">
            <InputLabel htmlFor="component-helper">{t("name")}</InputLabel>
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
            <InputLabel htmlFor="component-helper">{t("email")}</InputLabel>
            <Input
              id="email-iput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          {error && <div className="text-red-600">{error}</div>}
          <Button onClick={nextHandler} variant="outlined">
            Next
          </Button>
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
