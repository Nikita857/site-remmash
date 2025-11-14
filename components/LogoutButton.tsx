"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/rm-login", // Перенаправляем на страницу логина после выхода
      redirect: true,
    });
  };

  return (
    <Button onClick={handleLogout} variant="outline" className={className}>
      <LogOut className="mr-2 h-4 w-4" />
      Выйти
    </Button>
  );
}
