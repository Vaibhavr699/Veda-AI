'use client';

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    checkIfNewUser();
  }, [user]);

  const checkIfNewUser = async () => {
    try {
      const resp = await axios.post("/api/create-user", { user });
      console.log("User creation response:", resp.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
