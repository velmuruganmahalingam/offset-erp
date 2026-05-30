import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List, MonitorCog, Printer } from "lucide-react"
import Link from "next/link"
const setMakeFlow = [
    {
        title: "Merge Jobs",
        href: "/dashboard/Prepress/job-flow/jobs/set-make/smake",
        icon: MonitorCog,
        iconColor: 'text-blue-600',
        bgColor: "bg-blue-100"
    },
    {
        title: "Job-List",
        href: "",
        icon: Printer,
        iconColor: 'text-blue-600',
        bgColor: "bg-green-100"
    },
]
export default function Page() {

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>

                <h1 className="text-2xl font-bold">
                    Set Make
                </h1>

                <p className="text-sm text-muted-foreground">
                    Set make and assign job list
                </p>

            </div>

            <div className="
                 grid 
                 grid-cols-1 
                 gap-6 
                 md:grid-cols-1 
                 xl:grid-cols-2"
            >
                {setMakeFlow.map((flow) => {
                    const Icon = flow.icon
                    return (
                        <Link
                            key={flow.title}
                            href={flow.href}
                        >
                            <Card className="
                                cursor-pointer
                                transition-all
                                hover:-translae-y-1
                                hover:border-black
                                hover:shadow-x1
                                ">
                                <CardHeader className="
                                     flex
                                     flex-row
                                     item-center
                                     justify-between
                                    ">
                                    <CardTitle className="text-lg">
                                        {flow.title}
                                    </CardTitle>

                                    <div className={`rounded-xl
                                        p-3
                                        ${flow.bgColor}
                                        `}>
                                        <Icon
                                            className={`
                                            h-7 
                                            w-7 
                                            ${flow.iconColor}
                                            `}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="
                                       text-sm
                                       text-muted-foreground">
                                        Open {flow.title}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}