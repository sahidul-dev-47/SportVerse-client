import { auth } from "@/lib/auth";
import FacilityDetailsClient from "./FacilityDetailsClient";
import { headers } from "next/headers";

export default async function Page({ params }) {
  const { id } = await params;
  const token = await auth.api.getToken({
    headers: await headers()
  })

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
    headers:{
     authorization: `Bearer ${token}`
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 min-h-screen bg-gray-950 flex items-center justify-center">Error loading facility!</div>;
  }

  const facilityData = await res.json();

  if (!facilityData) {
    return <div className="text-white min-h-screen bg-gray-950 flex items-center justify-center">Facility not found!</div>;
  }

  return <FacilityDetailsClient facility={facilityData} />;
}