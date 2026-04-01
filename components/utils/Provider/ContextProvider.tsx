"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

type UserContextType = User | null;

export const UserContext = createContext<UserContextType>(null);

export const ContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [user, setUser] = useState<UserContextType>(null);

  useEffect(() => {
    const rawUser = Cookies.get("user");
    if (!rawUser) {
      setUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser) as User;
      setUser(parsedUser);
    } catch (error) {
      console.warn("Invalid user cookie, resetting user context:", error);
      setUser(null);
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
