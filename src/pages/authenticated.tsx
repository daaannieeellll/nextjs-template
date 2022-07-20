import { verifyIdToken } from "@/utils/auth";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import nookies from "nookies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = nookies.get(context);
  const token = await verifyIdToken(cookies.token);
  if (token) {
    const { uid, email } = token;
    return { props: { uid, email } };
  } else {
    context.res.writeHead(302, { location: "/auth/login" });
    context.res.end();
    return { props: {} };
  }
};

const Authenticated = ({ uid, email }: { uid: string; email: string }) => {
  return (
    <>
      <div>
        uid: {uid}, email: {email}
      </div>
      <button>
        <Link href='auth/logout'>Logout</Link>
      </button>
    </>
  );
};

export default Authenticated;
