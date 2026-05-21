import EditProject from "@/components/project/EditProject";

export default async function Page({params}:{params:Promise<{id:string}>}){
    const { id } = await params;
    return <EditProject id={id} />
}