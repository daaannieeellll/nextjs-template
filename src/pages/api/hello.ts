// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyIdToken } from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

interface Data {
  email: string;
}
interface Error {
  error: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const cookies = nookies.get({ req });
  console.log(cookies);
  verifyIdToken(cookies.token).then((token) => {
    if (token) {
      const email = token.email || "";
      res.status(200).json({ email });
    } else {
      res.status(403).json({ error: "Not authorized" });
    }
  });
}
