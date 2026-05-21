"use client";
import { useGetOptionBySizeQuery, useGetSizesQuery } from "@/app/services/paperApi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

interface ProjectStepProps {
    formData: any;

    setFormData: React.Dispatch<
        React.SetStateAction<any>
    >;

    nextStep: () => void;

    prevStep: () => void;
}

const openStyles = [
    "None",
    "GG",
    "GB",
    "Single"
];

const noOfColors = [
    'None',
    'Multicolor',
    'Multicolor-3'
]

const wetThermalOptions = [
    "Pop B",
    "Matt",
    "3D",
];

const uvOptions = [
    "Glass",
    "Matt",
];

const extraColours = [
    "Gold",
    "Silver",
    "None",
];

const specialEffects = [
    "Knurling",
    "Foil",
    "Spot UV",
    "Die-Emboss",
    "Die-Cutting",
    "None",
];

const laminations = [
    "Wet",
    "Thermal",
    "UV",
    "None",
];

export default function ProjectStep({
    formData,
    setFormData,
    nextStep,
    prevStep,
}: ProjectStepProps) {
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null)

    const { data: sizes = [] } = useGetSizesQuery();

    const { data: paperOption = [] } = useGetOptionBySizeQuery(
        selectedSizeId ?? skipToken
    )
    useEffect(() => {
        if (formData.size && sizes.length > 0) {

            const matchedSize = sizes.find(
                (item: any) =>
                    item.name === formData.size
            );

            if (matchedSize) {
                setSelectedSizeId(matchedSize.id);
            }
        }
    }, [formData.size, sizes]);
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } =
            e.target;

        setFormData((prev: any) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement)
                        .checked
                    : value,
        }));
    };

    const toggleSpecialEffect = (
        effect: string
    ) => {
        const exists =
            formData.specialEffects.includes(
                effect
            );

        if (exists) {
            setFormData((prev: any) => ({
                ...prev,

                specialEffects:
                    prev.specialEffects.filter(
                        (item: string) =>
                            item !== effect
                    ),
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,

                specialEffects: [
                    ...prev.specialEffects,
                    effect,
                ],
            }));
        }
    };

    return (
        <Card>
            <CardContent className="space-y-8 p-6">
                <h2 className="text-xl font-semibold">
                    Project Details
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Size
                        </label>

                        <select
                            name="size"
                            value={selectedSizeId ?? ''}
                            onChange={(e) => {
                                const sizeId = Number(e.target.value)
                                setSelectedSizeId(sizeId)
                                const selectedSize = sizes.find((item: any) => item.id == sizeId)
                                setFormData({
                                    ...formData,
                                    size: selectedSize?.name || '',
                                    gsm: '',
                                });
                            }}
                            className="h-10 w-full rounded-md border px-3"
                        >
                            <option value="">
                                Select Size
                            </option>

                            {sizes?.map((size: any) => (
                                <option
                                    key={size.id}
                                    value={size.id}
                                >
                                    {size.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            GSM
                        </label>

                        <select
                            name="gsm"
                            value={formData.gsm}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gsm: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">
                                Select GSM
                            </option>

                            {paperOption.map((option: any) => (

                                <option
                                    key={option.id}
                                    value={
                                        `${option.gsm.value} GSM ${option.paperType.name}`
                                    }
                                >

                                    {option.gsm.value} GSM
                                    {' '}
                                    {option.paperType.name}

                                </option>

                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            No.of Copies
                        </label>

                        <Input
                            placeholder="Number Of Copies"
                            name="numberOfCopies"
                            value={
                                formData.numberOfCopies
                            }
                            onChange={handleChange}
                        />

                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Layout as instructed
                        </label>

                        <Input
                            placeholder="Layout as instructed"
                            name="layout"
                            value={formData.layout}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Designed By
                    </label>

                    <div className="flex gap-6">
                        {["Self", "Party"].map(
                            (option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="radio"
                                        name="designBy"
                                        value={option}
                                        checked={
                                            formData.designBy ===
                                            option
                                        }
                                        onChange={handleChange}
                                    />

                                    {option}
                                </label>
                            )
                        )}
                    </div>
                </div>

                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        name="rawMaterialByParty"
                        checked={
                            formData.rawMaterialByParty
                        }
                        onChange={handleChange}
                    />

                    Raw Material Supplied By Party
                </label>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Open Style
                        </label>

                        <select
                            name="openStyle"
                            value={formData.openStyle}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border px-3"
                        >
                            <option value="">
                                Select Open Style
                            </option>

                            {openStyles.map((style) => (
                                <option
                                    key={style}
                                    value={style}
                                >
                                    {style}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            No.of Colors
                        </label>
                        <select
                            name="nofcolors"
                            value={formData.nofcolors}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border px-3">
                            <option value="">Select Colors</option>
                            {noOfColors.map((colors) => (
                                <option
                                    key={colors}
                                    value={colors}>
                                    {colors}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Extra Colours
                    </label>

                    <div className="flex flex-wrap gap-6">
                        {extraColours.map((colour) => (
                            <label
                                key={colour}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="radio"
                                    name="extraColour"
                                    value={colour}
                                    checked={
                                        formData.extraColour ===
                                        colour
                                    }
                                    onChange={handleChange}
                                />

                                {colour}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Special Effect
                    </label>

                    <div className="flex flex-wrap gap-6">
                        {specialEffects.map(
                            (effect) => (
                                <label
                                    key={effect}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.specialEffects.includes(
                                            effect
                                        )}
                                        onChange={() =>
                                            toggleSpecialEffect(
                                                effect
                                            )
                                        }
                                    />

                                    {effect}
                                </label>
                            )
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Lamination
                    </label>

                    <div className="flex flex-wrap gap-6">
                        {laminations.map((item) => (
                            <label
                                key={item}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="radio"
                                    name="lamination"
                                    value={item}
                                    checked={
                                        formData.lamination ===
                                        item
                                    }
                                    onChange={handleChange}
                                />

                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {["Wet", "Thermal"].includes(
                    formData.lamination
                ) && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium">
                                Lamination Finish
                            </label>

                            <div className="flex gap-6">
                                {wetThermalOptions.map(
                                    (option) => (
                                        <label
                                            key={option}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="radio"
                                                name="laminationFinish"
                                                value={option}
                                                checked={
                                                    formData.laminationFinish ===
                                                    option
                                                }
                                                onChange={handleChange}
                                            />

                                            {option}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                {formData.lamination === "UV" && (
                    <div className="space-y-3">
                        <label className="text-sm font-medium">
                            UV Finish
                        </label>

                        <div className="flex gap-6">
                            {uvOptions.map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="radio"
                                        name="laminationFinish"
                                        value={option}
                                        checked={
                                            formData.laminationFinish ===
                                            option
                                        }
                                        onChange={handleChange}
                                    />

                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        name="creasing"
                        checked={formData.creasing}
                        onChange={handleChange}
                    />

                    Creasing
                </label>

                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        name="pasting"
                        checked={formData.pasting}
                        onChange={handleChange}
                    />

                    Pasting
                </label>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Design Details
                    </label>

                    <textarea
                        name="designDetails"
                        value={formData.designDetails}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,

                                designDetails:
                                    e.target.value,
                            }))
                        }
                        className="min-h-[120px] w-full rounded-md border p-3"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Original Material Received
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            placeholder="Number Of Papers"
                            name="numberOfPapers"
                            value={
                                formData.numberOfPapers
                            }
                            onChange={handleChange}
                        />

                        <Input
                            placeholder="Number Of Pages"
                            name="numberOfPages"
                            value={
                                formData.numberOfPages
                            }
                            onChange={handleChange}
                        />

                        <Input
                            placeholder="Number Of Plates"
                            name="numberOfPlates"
                            value={
                                formData.numberOfPlates
                            }
                            onChange={handleChange}
                        />

                        <Input
                            placeholder="Number Of Drawings"
                            name="numberOfDrawings"
                            value={
                                formData.numberOfDrawings
                            }
                            onChange={handleChange}
                        />

                        <Input
                            placeholder="Number Of Positive"
                            name="numberOfPositive"
                            value={
                                formData.numberOfPositive
                            }
                            onChange={handleChange}
                        />

                        <Input
                            placeholder="Number Of CD"
                            name="numberOfCD"
                            value={formData.numberOfCD}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={prevStep}
                        className="rounded-lg border px-6 py-2 text-sm"
                    >
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        className="rounded-lg bg-black px-6 py-2 text-sm text-white"
                    >
                        Next
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}