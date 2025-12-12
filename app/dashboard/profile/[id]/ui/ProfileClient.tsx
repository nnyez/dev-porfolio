"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { AppUser } from "@/app/lib/types";
import FormProfile from "../../ui/FormProfile";
import { useEffect, useState } from "react";
import { getUserData } from "@/app/lib/firebaseRepository";
import AvailabilityScheduler from "../../../standard-applications/ui/AvailabilityScheduler";

export default function ProfileClient({ userId }: { userId: string }) {
  const [userD, setUserD] = useState<AppUser | null>(null);
  const { userData } = useAuth();

  useEffect(() => {
    const data = getUserData(userId);
    const subscription = data.subscribe({
      next: (data) => setUserD(data as AppUser),
      error: (err) => console.error("Error fetching user data:", err),
    });
    return () => subscription.unsubscribe();
  }, [userId]);

  return (
    <section className="bg-secondary m-10 mt-10   grid grid-cols-2 items-center justify-center p-10 ">
      {userD ? (
        <>
          <div>
            <h1 className="mb-6 text-4xl font-bold">User Profile</h1>
            <div className="bg-alt relative mb-6 aspect-square w-72 overflow-hidden rounded-full">
              <Image
                src={userD?.photoURL || "/profile.svg"}
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            <FormProfile userData={userD} canEdit={userData?.uid === userId} />
          </div>
          <AvailabilityScheduler onlyView={userData?.uid !== userId} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
