import FullDeck from "@/components/FullDeck";
import { auth, signOut } from "app/auth";

export default async function ProtectedPage() {
  let session = await auth();

  return (
    <div className="flex min-h-screen bg-black p-4">
      <div className="w-screen h-full flex flex-col space-y-5 justify-center items-center text-white">
        {/* You are logged in as {session?.user?.email} */}
        <FullDeck />
        <SignOut />
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="bg-red-600 px-4 mb-8 rounded-2xl h-8 text-center"
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
}
