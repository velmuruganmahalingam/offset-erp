'use Client'
import { useGetProjectByIdQuery } from "@/app/services/projectApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProject(){
    const param = useParams()

    const id = Number(param.id)

    const {data} = useGetProjectByIdQuery(id)

    const [formData, setFormData] = useState<any>(null)

    useEffect(()=>{
        if(data){
            setFormData(data)
        }
    },[data])
}