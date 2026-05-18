'use client'
import {useRouter} from "next/navigation"

export default function ProjectPage(){
    const router = useRouter()
    return(
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Project Module
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div
                    onClick={() =>
                        router.push('/dashboard/Project/create')
                    }
                    className="
                        cursor-pointer
                        rounded-xl
                        border
                        p-6
                        hover:shadow-md
                        transition
                    "
                >
                    <h2 className="text-lg font-semibold">
                        Create Project
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Create new printing project
                    </p>
                </div>

                <div
                    onClick={() =>
                        router.push('/dashboard/Project/list')
                    }
                    className="
                        cursor-pointer
                        rounded-xl
                        border
                        p-6
                        hover:shadow-md
                        transition
                    "
                >
                    <h2 className="text-lg font-semibold">
                        Project List
                    </h2>

                    <p className="text-gray-500 mt-2">
                        View all created projects
                    </p>
                </div>

            </div>

        </div>
    )
}