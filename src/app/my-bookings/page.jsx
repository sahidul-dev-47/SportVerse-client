"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyBookingCard from "@/components/MyBookingCard";
import { authClient } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!userEmail) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?userEmail=${encodeURIComponent(userEmail)}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${tokenData?.token || ""}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setBookings(Array.isArray(data) ? data : []);
        } else {
          console.error("Bookings fetch failed:", res.status);
          setBookings([]);
        }
      } catch (err) {
        console.error("Bookings fetch error:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your bookings…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <MyBookingCard
      bookings={bookings}
      userEmail={userEmail}
    />
  );
}