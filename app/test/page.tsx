'use client';

import { useEffect, useState } from "react";
import { registerUser } from "../lib/auth/AuthService";
import { UserAuth } from "../lib/schema/UserAuth";

export default function TestPage() {
  const [user, setUser] = useState<UserAuth | null>(null);

  useEffect(() => {
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Test Page</h1>
      {user && (
        <div>
          <p>Usuario registrado:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
