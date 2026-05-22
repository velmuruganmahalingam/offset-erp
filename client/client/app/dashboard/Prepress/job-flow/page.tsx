"use client";

import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    MonitorCog,
    FileCheck,
    Printer,
    Layers3,
} from "lucide-react";

const jobs = [
    {
        title: "System Assign",
        href: "/dashboard/Prepress/job-flow/jobs/system-assign",
        icon: MonitorCog,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
    },

    {
        title: "Proof",
        href: "/dashboard/Prepress/job-flow/jobs/proof",
        icon: FileCheck,
        iconColor: "text-green-600",
        bgColor: "bg-green-100",
    },

    {
        title: "Master Make",
        href: "/dashboard/prepress/jobs/master-make",
        icon: Printer,
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100",
    },

    {
        title: "Set Make",
        href: "/dashboard/prepress/jobs/set-make",
        icon: Layers3,
        iconColor: "text-orange-600",
        bgColor: "bg-orange-100",
    },
];

export default function PrepressJobsPage() {

    return (
        <div className="space-y-6 p-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Prepress Jobs
                </h1>

                <p className="text-sm text-muted-foreground">
                    Manage prepress production stages
                </p>

            </div>

            <div className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      ">

                {jobs.map((job) => {

                    const Icon = job.icon;

                    return (

                        <Link
                            key={job.title}
                            href={job.href}
                        >

                            <Card className="
                                cursor-pointer
                                transition-all
                                hover:-translate-y-1
                                hover:border-black
                                hover:shadow-xl
                            ">

                                <CardHeader className="
                                    flex
                                    flex-row
                                    items-center
                                    justify-between
                                    ">

                                    <CardTitle className="text-lg">
                                        {job.title}
                                    </CardTitle>

                                    <div
                                        className={`
                                        rounded-xl
                                        p-3
                                        ${job.bgColor}
                                    `}
                                    >

                                        <Icon
                                            className={`
                                            h-7
                                            w-7
                                            ${job.iconColor}
                                            `}
                                        />

                                    </div>

                                </CardHeader>

                                <CardContent>

                                    <p className="
                                        text-sm
                                        text-muted-foreground
                                    ">
                                        Open {job.title} jobs
                                    </p>

                                </CardContent>

                            </Card>

                        </Link>

                    );
                })}

            </div>

        </div>
    );
}