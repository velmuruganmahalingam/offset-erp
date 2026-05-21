'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";

interface CustomerStepProps {
    formData: any;

    setFormData: React.Dispatch<
        React.SetStateAction<any>
    >;

    nextStep: () => void;
}

const jobTypes = [
    "Invitation",
    "Cover",
    "Notice",
    "Brochure",
    "Monthly Calendar",
    "Picture",
    "Certificate",
    "Book",
    "Receipt Book",
    "Label",
    "Book Wrapper",
    "Journal",
    "Magazine",
    "Letter Pad",
    "Poster",
];

const processTypes = [
    "Multicolor",
    "Cutcolor",
];

export default function CustomerStep({
    formData,
    setFormData,
    nextStep,
}: CustomerStepProps) {
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        setFormData((prev: any) => ({
            ...prev,

            [e.target.name]: e.target.value,
        }));
    };

    const getPrefix = (processType: string) => {

        switch (processType) {

            case 'Multicolor':
                return 'ROMC'

            case 'Cutcolor':
                return 'ROCC'

            default:
                return ''
        }
    }

    return (
        <Card>
            <CardContent className="space-y-6 p-6">
                <h2 className="text-xl font-semibold">
                    Customer Details
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Order Date
                        </label><br />

                        <DatePicker
                            selected={
                                formData.orderDate
                                    ? new Date(formData.orderDate)
                                    : null
                            }
                            onChange={(date: any) =>
                                setFormData({
                                    ...formData,
                                    orderDate: date?.toISOString() || '',
                                })
                            }
                            showTimeSelect
                            timeFormat="hh:mm aa"
                            timeIntervals={5}
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            placeholderText="Select Order Date"
                            className="w-full rounded-lg border bg-white px-3 py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Proof Date
                        </label><br />

                        <DatePicker
                            selected={
                                formData.proofDate
                                    ? new Date(formData.proofDate)
                                    : null
                            }
                            onChange={(date: any) =>
                                setFormData({
                                    ...formData,
                                    proofDate: date?.toISOString() || '',
                                })
                            }
                            showTimeSelect
                            timeFormat="hh:mm aa"
                            timeIntervals={5}
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            placeholderText="Select Proof Date"
                            className="w-full rounded-lg border bg-white px-3 py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Delivery Date
                        </label><br />

                        <DatePicker
                            selected={
                                formData.deliveryDate
                                    ? new Date(formData.deliveryDate)
                                    : null
                            }

                            onChange={(date: any) =>
                                setFormData({
                                    ...formData,
                                    deliveryDate: date?.toISOString() || ''
                                })

                            }
                            showTimeSelect
                            timeFormat="hh:mm aa"
                            timeIntervals={5}
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            placeholderText="Select Delivery Date"
                            className="w-full rounded-lg border bg-white px-3 py-2"
                        />

                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            OF Number
                        </label>
                        <div className="flex">

                            <div
                                className="
            flex
            items-center
            rounded-l-md
            border
            border-r-0
            bg-gray-100
            px-3
            text-sm
            font-medium
            text-gray-700
        "
                            >
                                {getPrefix(formData.processType)}
                            </div>

                            <Input
                                placeholder="Enter Number"
                                value={
                                    formData.ofNo.replace(
                                        getPrefix(formData.processType),
                                        ''
                                    )
                                }
                                onChange={(e) => {

                                    const number =
                                        e.target.value.replace(/\D/g, '')

                                    setFormData({
                                        ...formData,

                                        ofNo:
                                            `${getPrefix(formData.processType)}${number}`
                                    })
                                }}
                                className="rounded-l-none"
                            />

                        </div>
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Customer Name
                        </label>
                        <Input
                            placeholder="Customer Name"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Mobile No
                        </label>
                        <Input
                            placeholder="Mobile Number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Location
                        </label>
                        <Input
                            placeholder="Place"
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Order Taken By
                        </label>
                        <Input
                            placeholder="Order Taken By"
                            name="orderTakenBy"
                            value={formData.orderTakenBy}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Job Type
                        </label>

                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                        >
                            <option value="">
                                Select Job Type
                            </option>

                            {jobTypes.map((job) => (
                                <option
                                    key={job}
                                    value={job}
                                >
                                    {job}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Process Type
                    </label>

                    <div className="flex gap-6">
                        {processTypes.map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="radio"
                                    name="processType"
                                    value={type}
                                    checked={
                                        formData.processType === type
                                    }
                                    onChange={handleChange}
                                />

                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
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