"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          Prepress Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage prepress workflow and job flow
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <Link href="/dashboard/Prepress/job-flow">

          <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-black">

            <CardHeader>
              <CardTitle>
                Jobs
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and manage active prepress jobs
              </p>
            </CardContent>

          </Card>

        </Link>

        <Link href="/dashboard/Prepress/flow-list">

          <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-black">

            <CardHeader>
              <CardTitle>
                Job List
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track project workflow and production flow
              </p>
            </CardContent>

          </Card>

        </Link>

      </div>

    </div>
  );
}