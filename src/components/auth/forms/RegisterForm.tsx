"use client";
import AuthPhoneForm from "./AuthPhoneForm";

export default function RegisterForm() {
  // defaultType bisa diubah ke "lembaga" kalau mau preselect tab lembaga
  return <AuthPhoneForm mode="register" defaultType="individu" />;
}
