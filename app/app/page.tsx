import Test from "@/components/test";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";

const Page = async () => {
  const s = await getServerSession();

  return (
    <div className="w-full max-w-5xl grid grid-cols-3 gap-10 p-10 mx-auto">
      {JSON.stringify(s)}
      
      <Test />
    </div>
  );
};

export default Page;
