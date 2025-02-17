"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      router.replace("/chat/new"); 
    } else {
      router.replace("/login");
    }
  }, []);

  return null; 
}