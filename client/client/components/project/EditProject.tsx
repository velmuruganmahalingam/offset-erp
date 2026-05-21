"use client"
import { useCreateProjectMutation, useGetProjectByIdQuery, useUpdateProjectByIdMutation } from "@/app/services/projectApi";
import ProjectContainer from "@/components/project/projectContainer";
import Stepper from "@/components/project/stepper";
import CoverStep from "@/components/project/steps/cover-step";
import CustomerStep from "@/components/project/steps/customer-step";
import PaymentStep from "@/components/project/steps/payment-step";
import ProjectStep from "@/components/project/steps/project-step";

type props={
    id:string
}

export default function EditProject({ id }:props) {
    const { data } = useGetProjectByIdQuery(id,{refetchOnMountOrArgChange: true});

    const [updateProject] = useUpdateProjectByIdMutation();
    const [createProject] = useCreateProjectMutation();

    return (
        <ProjectContainer
            mode="edit"
            id={id}
            initialData={data}
            onCreate={createProject}
            onUpdate={updateProject}
        >
            {({
                formData,
                setFormData,
                step,
                nextStep,
                prevStep,
                handleSubmit,
            }) => (
                <div>
                    <Stepper currentStep={step} />

                    {step === 1 && (
                        <CustomerStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                        />
                    )}

                    {step === 2 && (
                        <ProjectStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 3 && (
                        <CoverStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 4 && (
                        <PaymentStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </div>
            )}
        </ProjectContainer>
    )
}