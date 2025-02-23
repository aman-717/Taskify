import React from "react";
import "./PageNotFound.css"; // Import the CSS file

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="error-code">404</div>
      <div className="error-message">Page Not Found</div>
      <a href="/" className="back-home">
        Go Back to Home
      </a>
    </div>
  );
}

export default PageNotFound;
