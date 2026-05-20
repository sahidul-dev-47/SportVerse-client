import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ManageFacilitiesClient from "./ManageFacilitiesClient";

async function getOwnerEmail() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session?.user?.email ?? null;
}

export default async function ManageFacilitiesPage() {
  const ownerEmail = await getOwnerEmail();

  if (!ownerEmail) {
    redirect("/signin");
  }

  let facilities = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities?ownerEmail=${encodeURIComponent(ownerEmail)}`,
      { 
        cache: "no-store",
        next: { revalidate: 0 }
      }
    );
    if (res.ok) {
      facilities = await res.json();
    }
  } catch {
    facilities = [];
  }

  return (
    <ManageFacilitiesClient
      facilities={facilities}
      ownerEmail={ownerEmail}
    />
  );
}