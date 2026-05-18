'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children,}:{children:React.ReactNode}){
    const router = useRouter()
    const handleLogout=async()=>{
        await fetch('http://localhost:4001/auth/logout',
            {
                method:'POST',
                credentials:'include',
            },
        )
        router.replace('/login')
    }
return(
    <main className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 overflow-y-auto bg-black text-white">
        <div className="border-b border-slate-800 p-6">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>

        <nav className="space-y-2 p-4">
          <Link
            href="/dashboard"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/Project"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Projects
          </Link>

          <Link
            href="/dashboard/prepress"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Prepress
          </Link>

          <Link
            href="/dashboard/press"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Press
          </Link>

          <Link
            href="/dashboard/postpress"
            className="block rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Postpress
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <section className="flex flex-1 flex-col overflow-hidden bg-slate-100">
        {/* TOPBAR */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
          <h1 className="text-lg font-semibold">
            Raja Offset
          </h1>

          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* PAGE */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </section>
    </main>
)}