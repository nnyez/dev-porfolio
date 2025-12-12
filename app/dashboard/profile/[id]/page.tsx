"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { AppUser } from "@/app/lib/types";
import FormProfile from "../ui/FormProfile";
import { use, useEffect, useState } from "react";
import { getUserData } from "@/app/lib/firebaseRepository";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [userD, setUserD] = useState<AppUser | null>(null);
  const { userData } = useAuth();
  const user = userData as AppUser;

  useEffect(() => {
    const data = getUserData(id);
    const subscription = data.subscribe({
      next: (data) => setUserD(data as AppUser),
      error: (err) => console.error("Error fetching user data:", err),
    });
    return () => subscription.unsubscribe();
  }, [id]);
  return (
    <section className="bg-secondary m-10 mt-10 flex w-3/4 flex-col items-center justify-center p-10">
      {userD ? (
        <>
          <h1 className="mb-6 text-4xl font-bold">User Profile</h1>
          <div className="bg-alt relative mb-6 aspect-square w-72 overflow-hidden rounded-full">
            <Image
              src={userD?.photoURL || "/profile.svg"}
              alt="User Profile"
              fill
              className="object-cover"
            />
          </div>
          <FormProfile userData={userD} canEdit={userData?.uid === id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
