import React, { useState, useEffect } from "react";
import RootLayout from "@/app/layout";
import FormControl from "@mui/material/FormControl";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PropTypes from "prop-types";

function DetailsPage({ data }) {
  const router = useRouter();

  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const { locale } = router.query;
  const { t, i18n } = useTranslation("common");

  const [lang, setLang] = useState("");

  const nextHandler = async () => {
    try {
      if (age && phone) {
        const res = await axios.post("/api/data", {
          name: data.name,
          email: data.email,
          age,
          phone,
        });
        if (res.status === 200) {
          router.push({ pathname: `/${lang}/language` }, "", {
            locale: lang === "english" ? "en" : "bm",
          });
        }
      } else {
        setError("Please fill input fields");
      }
    } catch (e) {
      // error
    }
  };

  useEffect(() => {
    if (lang)
      router.push({ pathname: `/${lang}/details` }, "", {
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
            <InputLabel htmlFor="component-helper">{t("age")}</InputLabel>
            <Input
              id="age-iput"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>
          <FormControl className="m-2" variant="standard">
            <InputLabel htmlFor="component-helper">{t("phone")}</InputLabel>
            <Input
              id="phone-iput"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          {error && <div className="text-red-600 m-2">{error}</div>}
          <Button onClick={nextHandler} variant="outlined">
            Next
          </Button>
        </div>
      </div>
    </RootLayout>
  );
}

DetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export async function getServerSideProps({ params, query, req, res, locale }) {
  const response = await axios.get("http://localhost:3000/api/data");
  console.log({ req });
  return {
    props: {
      data: JSON.parse(response.data),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default DetailsPage;
