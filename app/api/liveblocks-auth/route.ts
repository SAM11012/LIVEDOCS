import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_iLIKz46ww0PezAXbuHrK4J5PCFoVwog89AfjxkcFvh3I9rDK8mXodaYg0YYRPyEz",
});

export async function POST(request: Request) {
  // Get the current user from your database
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: [], // Optional
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
