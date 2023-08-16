import React, { useState } from "react";
import RootLayout from "@/app/layout";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import PropTypes from "prop-types";

export default function LanguagePage({ data }) {
  const router = useRouter();
  const [lang, setLang] = useState("english");
  const { pathname, asPath, query } = router;
  console.log({ pathname, asPath, query });
  const submitHandler = () => {
    router.push({ pathname: `/${lang}/final` }, "", {
      locale: lang === "bambara" ? "bm" : "en",
    });
  };
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
            <MenuItem value="english">EN</MenuItem>
            <MenuItem value="bambara">BM</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={submitHandler} variant="outlined">
          Submit
        </Button>
      </div>
    </RootLayout>
  );
}

LanguagePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export async function getServerSideProps({ params, query, req, res }) {
  const response = await axios.get("http://localhost:3000/api/data");

  return { props: { data: JSON.parse(response.data) } };
}
