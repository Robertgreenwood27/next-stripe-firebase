import React from "react";
import Login from "../../components/Login";
import { auth } from "../../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../../stripe/createCheckoutSession";
import usePremiumStatus from "../../stripe/usePremiumStatus";

export default function Home() {
  const [user, userLoading] = useAuthState(auth);

  // Pass 'user' as 'null' if it's undefined
  const userIsPremium = usePremiumStatus(user ?? null);

  return (
    <div>
      {!user && userLoading && <h1>Loading...</h1>}
      {!user && !userLoading && <Login />}
      {user && !userLoading && (
        <div>
          <h1>Hello, {user.displayName || user.email || "there"}</h1>
          {!userIsPremium ? (
            <button onClick={() => createCheckoutSession(user.uid)}>
              Upgrade to premium!
            </button>
          ) : (
            <h2>Have a cookie 🍪 Premium customer!</h2>
          )}
        </div>
      )}
    </div>
  );
}
