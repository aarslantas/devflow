import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const session = await auth();
  console.log("session", session);
  return (
    <>
      <h1 className="h1-bold">Welcome to Nextjs 15 </h1>
      <h1 className="h1-bold font-space-grotesk">Welcome to Nextjs 15 </h1>

      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit" className="bg-red-300">
          Log out
        </Button>
      </form>
    </>
  );
}
