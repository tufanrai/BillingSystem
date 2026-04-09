"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function HoC<T>(Component: React.ComponentType<T>) {
  return function Authorised(props: any) {
    const navigate = useRouter();
    const [decoded, setDecoded] = useState<JwtPayload | null>(null);
    useEffect(() => {
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Please login first");
        navigate.replace("/auth/login");
        return;
      }

      if (token) {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      }

      // Verify the expiry date
      if (decoded?.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        toast.error("Token expired: Please login");
        navigate.replace("/auth/login");
      }
      console.log(decoded);
    }, []);

    return <Component {...props} />;
  };
}

export default HoC;
