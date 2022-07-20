import { auth } from "@/firebase/server";

export const verifyIdToken = (token: string) => {
  return auth.verifyIdToken(token).catch(() => null);
};
