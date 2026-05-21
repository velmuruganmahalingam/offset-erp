'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useRecoverWorkflowMutation } from "../services/projectApi";
import ConfirmDialog from "@/components/common/confirmDialogBox";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [
    recoverWorkflow,
    { isLoading }
  ] = useRecoverWorkflowMutation()

  const handleLogout = async () => {

    await fetch(
      'http://localhost:4001/auth/logout',
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    router.replace('/login');
  };

  const handleRecover =
    async () => {

      try {

        await recoverWorkflow(undefined)
          .unwrap();

        setDialogOpen(false);

      } catch (err) {

        console.error(err);

      }
    };

  return (

    <main className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <aside className="
        w-72
        shrink-0
        overflow-y-auto
        bg-black
        text-white
      ">

        <div className="
          border-b
          border-slate-800
          p-6
        ">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>

        <nav className="space-y-2 p-4">

          <Link href="/dashboard"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Dashboard
          </Link>

          <Link href="/dashboard/Project"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Projects
          </Link>

          <Link href="/dashboard/Prepress"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Prepress
          </Link>

          <Link href="/dashboard/Prepress"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Press
          </Link>

          <Link href="/dashboard/Prepress"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Postpress
          </Link>
        </nav>

      </aside>

      {/* CONTENT */}
      <section className="
        flex flex-1 flex-col overflow-hidden bg-slate-100
      ">

        {/* TOPBAR */}
        <header className="
          flex h-16 items-center justify-between border-b bg-white px-6
        ">

          <h1 className="text-lg font-semibold">
            Raja Offset
          </h1>

          {/* DROPDOWN */}
          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button variant="outline">
                Settings
              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  setDialogOpen(true)
                }
              >
                Recover Workflows
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </header>

        {/* PAGE */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </section>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog

        open={dialogOpen}

        onOpenChange={setDialogOpen}

        title="Recover Workflows"

        description="
          Are you sure you want to recover
          deleted jobs and workflows?
        "

        confirmText="Yes, Recover"

        cancelText="No"

        loading={isLoading}

        onConfirm={handleRecover}

      />

    </main>
  );
}