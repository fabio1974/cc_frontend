import React from "react";
import "./Footer.css";
function Footer({ user, toggleSidebar, showSidebar }) {
  return (
    <footer className={showSidebar ? "footer active" : "footer"}>
      <span className="text-muted">© 2021 Company, Inc</span>
    </footer>
  );
}

export default Footer;
