"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const user = Cookies.get("user")!;

export const UserContext = createContext<User>(user ? JSON.parse(user!)! : "");

export const ContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [User, setUser] = useState<User>(JSON.parse(user!));

  useEffect(() => {
    const rawUser = Cookies.get("user");
    if (rawUser) {
      setUser(JSON.parse(rawUser)!);
    }
  }, []);

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
};
