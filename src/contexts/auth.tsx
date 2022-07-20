import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "@/firebase/client";
import nookies from "nookies";

interface IAuth {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuth>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
});

interface AuthProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  const router = useRouter();

  // Persisting user
  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        user.getIdToken().then((token) => {
          nookies.set(undefined, "token", token, {});
        });
      } else {
        setUser(null);
        nookies.set(undefined, "token", "", {});
      }
    });
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(false);
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValues = useMemo(
    () => ({
      user,
      error,
      loading,
    }),
    [user, loading, error]
  );
  const value = { ...memoedValues, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: AuthProps) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user && window.location.pathname !== "/auth/login")
    router.push({
      pathname: "/auth/login",
      query: { next: window.location.pathname },
    });

  return <>{children}</>;
};
