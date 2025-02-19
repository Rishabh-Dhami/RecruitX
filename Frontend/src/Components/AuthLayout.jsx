import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      navigate("/login");
    }
    setLoader(false);
  }, [navigate, authentication, authstatus]);

  return loader ? <h1>Loading.....</h1> : children;
}

export default AuthLayout;
