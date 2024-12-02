"use client";
import { AuthProvider } from "@/components/context/AuthContext";
import { ChatsProvider } from "@/components/context/ChatsContext";
import Main from "@/components/Mian";


export default function Home() {
  return (
    <AuthProvider>
      <ChatsProvider>
        <Main />
      </ChatsProvider>
    </AuthProvider>

  );
}
