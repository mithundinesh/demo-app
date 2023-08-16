import React, { useState, useEffect } from "react";

import RootLayout from "@/app/layout";

import Router from "next/router";

export default function Index() {
  useEffect(() => {
    Router.push({ pathname: "/bambara/first" }, "", {
      locale: "bm",
    });
  }, []);
  return (
    <RootLayout>
      <div></div>
    </RootLayout>
  );
}
