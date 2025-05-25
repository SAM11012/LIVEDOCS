import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import AddDocumentButton from "@/components/AddDocumentButton";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";

export default async function Home() {
  const ClerkUser = await currentUser();
  if (!ClerkUser) redirect("/sign-in");
  const documents = await getDocuments({
    email: ClerkUser.emailAddresses[0].emailAddress,
  });
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.data.length > 0 ? (
        <div className="flex flex-col items-center mb-10 w-full gap-10 px-5">
          <div className="max-w-[730px] items-end flex w-full justify-between">
            <h3 className="text-[28px] font-semibold">All Documents </h3>
            <AddDocumentButton
              userId={ClerkUser?.id}
              email={ClerkUser?.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="flex w-full max-w-[730px] flex-col gap-5">
            {documents.data.map(({ id, metadata, createdAt }: any) => (
              <li
                key={id}
                className="flex items-center justify-between gap-4 rounded-lg bg-blue-950 bg-cover p-5 shadow-xl"
              >
                <Link
                  className="flex flex-1 items-center gap-4"
                  href={`/documents/${id}`}
                >
                  <div className="hidden rounded-md bg-dark-100 p-2 sm:block ">
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="document"
                      width={40}
                      height={40}
                      className="mx-auto"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">
                      Create about {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
                <DeleteModal roomId={id}/>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rounded-lg bg-blue-950 px-10 py-8">
          <Image
            src="/assets/icons/doc.svg"
            alt="document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentButton
            userId={ClerkUser?.id}
            email={ClerkUser?.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
}
