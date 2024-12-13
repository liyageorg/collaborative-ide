//client\src\pages\SignIn.tsx
import React, { useEffect } from "react";
import { SignIn as ClerkSignIn, useUser } from "@clerk/clerk-react";
import axios from "axios";

const SignInPage = () => {
  const { user } = useUser(); // Clerk hook to access authenticated user data

  const saveUserData = async () => {
    if (user) {
      try {
        const email = user.emailAddresses[0]?.emailAddress || "No email provided";
        const userData = {
          clerkId: user.id,
          email,
          username: user.username || "No username",
          firstName: user.firstName || "No firstName",
          lastName: user.lastName || "No lastName"
      
        };

        // POST request to backend
        const response = await axios.post("http://localhost:3000/api/saveUser", userData);
        console.log(response.data.message);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      saveUserData();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <ClerkSignIn
          path="/sign-in"
          routing="path"
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",
              formFieldInput: "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500",
              formButtonSubmit: "w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700",
              socialButtonsBlock: "flex flex-col space-y-4",
              socialButtonsBlockButton: "w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
            },
            layout: { socialButtonsPlacement: "top" },
          }}
        />
      </div>
    </div>
  );
};

export default SignInPage;