"use client";
import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(console.error);

      // optional: log ketika terpasang
      window.addEventListener("appinstalled", () => {
        console.log("PWA installed");
      });
    }
  }, []);
  return null;
}
