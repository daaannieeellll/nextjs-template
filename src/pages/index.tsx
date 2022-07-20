import type { NextPage } from "next";
import { useAuth } from "@/contexts/auth";
import Link from "next/link";

const Home: NextPage = () => {
  const { user } = useAuth();
  return (
    <div className='flex items-center justify-center'>
      <p>{`User ID: ${user ? user.uid : null}`}</p>
      {user ? (
        <button>
          <Link href='/authenticated'>Go to authenticated route</Link>
        </button>
      ) : (
        <button>
          <Link href='/auth/login'>Login</Link>
        </button>
      )}
    </div>
  );
};

export default Home;
