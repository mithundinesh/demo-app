import React, { useState, useEffect } from "react";
import RootLayout from "@/app/layout";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import PropTypes from "prop-types";

export default function FinalPage({ data }) {
  const router = useRouter();
  // const { locale } = useRouter();
  const { locale } = router.query;
  const { t, i18n } = useTranslation("common");

  const [lang, setLang] = useState("");

  useEffect(() => {
    if (lang)
      router.push({ pathname: `/${lang}/final` }, "", {
        locale: lang === "english" ? "en" : "bm",
      });
    else setLang(locale);
  }, [locale, lang]);

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
            <MenuItem value="english">EN</MenuItem>
            <MenuItem value="bambara">BM</MenuItem>
          </Select>
        </FormControl>
        <div className="m-4">
          <div className="flex">
            <p className="font-bold basis-1/2">{t("name")} : </p> {data.name}
          </div>
          <div className="flex">
            <p className="font-bold basis-1/2">{t("email")} : </p> {data.email}
          </div>
          <div className="flex">
            <p className="font-bold basis-1/2">{t("age")} : </p> {data.age}
          </div>
          <div className="flex">
            <p className="font-bold basis-1/2">{t("phone")} : </p> {data.phone}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

FinalPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const getServerSideProps = async ({ locale }) => {
  const response = await axios.get("http://localhost:3000/api/data");
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      data: JSON.parse(response.data),
    },
  };
};
