import React, { useEffect } from "react";
import Page from "../components/Page";

function Home({ setShowSidebar }) {
  useEffect(() => {
    setShowSidebar(true);
  });

  return <Page title={"My Home Page"}>Home Page</Page>;
}

export default Home;
