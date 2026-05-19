'use client'

import { useState } from "react"

import {
    useGetProjectQuery
} from "@/app/services/projectApi"
import { useRouter } from "next/navigation"

export default function ProjectList() {

    const router = useRouter()

    const {
        data: projectData = [],
        isLoading,
    } = useGetProjectQuery()

    const [search, setSearch] =
        useState('')

    const filteredProjects =
        projectData.filter((project: any) => {

            const value =
                search.toLowerCase()

            return (
                project.ofNo
                    ?.toLowerCase()
                    .includes(value)

                ||

                project.customerName
                    ?.toLowerCase()
                    .includes(value)

                ||

                project.jobType
                    ?.toLowerCase()
                    .includes(value)
            )
        })

    if (isLoading) {
        return (
            <div className="p-6">
                Loading...
            </div>
        )
    }

    return (
        <div className="p-6">

            <div className="
                mb-6
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
            ">

                <div>
                    <h1 className="text-2xl font-bold">
                        Project List
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all printing projects
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="
                        Search OF No,
                        Customer,
                        Job Type...
                    "
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        w-full
                        md:w-80
                        rounded-lg
                        border
                        px-4
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-black
                    "
                />

            </div>

            <div className="
                overflow-x-auto
                rounded-xl
                border
                bg-white
            ">

                <table className="min-w-full text-sm">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="
                                px-4
                                py-3
                                text-left
                                font-semibold
                            ">
                                ID
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-left
                                font-semibold
                            ">
                                OF No
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-left
                                font-semibold
                            ">
                                Customer Name
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-left
                                font-semibold
                            ">
                                Delivery Date
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-left
                                font-semibold
                            ">
                                Job Type
                            </th>

                            <th className="
                                px-4
                                py-3
                                text-left
                                font-semibold
                            ">
                                Action
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredProjects.map(
                            (project: any) => (

                                <tr
                                    key={project.id}
                                    className="
                                    border-t
                                    hover:bg-gray-50
                                    transition
                                "
                                >

                                    <td className="px-4 py-3">
                                        {project.id}
                                    </td>

                                    <td className="
                                    px-4
                                    py-3
                                    font-medium
                                ">
                                        {project.ofNo}
                                    </td>

                                    <td className="px-4 py-3">
                                        {project.customerName}
                                    </td>

                                    <td className="px-4 py-3">
                                        {
                                            new Date(
                                                project.deliveryDate
                                            ).toLocaleString()
                                        }
                                    </td>

                                    <td className="px-4 py-3">
                                        {project.jobType}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/project/${project.id}`
                                                    )
                                                }
                                                className="
                rounded-md
                bg-blue-100
                px-3
                py-1
                text-xs
                font-medium
                text-blue-700
                hover:bg-blue-200
            "
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/project/edit/${project.id}`
                                                    )
                                                }
                                                className="
                rounded-md
                bg-yellow-100
                px-3
                py-1
                text-xs
                font-medium
                text-yellow-700
                hover:bg-yellow-200
            "
                                            >
                                                Edit
                                            </button>

                                        </div>
                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}