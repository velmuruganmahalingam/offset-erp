import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CoverStepProps {
  formData: any;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;

  nextStep: () => void;

  prevStep: () => void;
}

const coverProcesses = [
  "Multi-Colour",
  "Cut-Colour",
  "Readymade",
  "None",
];

const coverSizes = [
  "A4",
  "A5",
  "1/8",
  "1/4",
];

const openStyles = [
  "Center Pinning",
  "Perfect Binding",
  "Spiral",
];

const paperQualities = [
  "100 GSM",
  "170 GSM",
  "300 GSM",
];

const laminations = [
  "Wet",
  "Thermal",
  "UV",
  "None",
];

const wetThermalOptions = [
  "Pop B",
  "Matt",
  "3D",
];

const uvOptions = [
  "Glass",
  "Matt",
];

const specialEffects = [
  "Knurling",
  "Foil",
  "Spot UV",
  "Die-Emboss",
  "Die-Cutting",
  "Gold",
  "Silver",
  "None",
];

const printTypes = [
  "None",
  "Print",
  "Master",
];

export default function CoverStep({
  formData,
  setFormData,
  nextStep,
  prevStep,
}: CoverStepProps) {
  const coverDetails =
    formData.coverDetails || {};

  const updateCoverDetails = (
    key: string,
    value: any
  ) => {
    setFormData((prev: any) => ({
      ...prev,

      coverDetails: {
        ...prev.coverDetails,

        [key]: value,
      },
    }));
  };

  const toggleSpecialEffect = (
    effect: string
  ) => {
    const current =
      coverDetails.specialEffects || [];

    if (current.includes(effect)) {
      updateCoverDetails(
        "specialEffects",

        current.filter(
          (item: string) =>
            item !== effect
        )
      );
    } else {
      updateCoverDetails(
        "specialEffects",

        [...current, effect]
      );
    }
  };

  const process =
    coverDetails.process;

  return (
    <Card>
      <CardContent className="space-y-8 p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Cover Details
          </h2>

          <div className="space-y-3">
            <label className="text-sm font-medium">
              Cover Process
            </label>

            <div className="flex flex-wrap gap-6">
              {coverProcesses.map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="coverProcess"
                      value={item}
                      checked={
                        process === item
                      }
                      onChange={() =>
                        updateCoverDetails(
                          "process",
                          item
                        )
                      }
                    />

                    {item}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {(process ===
          "Multi-Colour" ||
          process ===
          "Cut-Colour") && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Cover Size
                  </label>

                  <select
                    value={
                      coverDetails.coverSize ||
                      ""
                    }
                    onChange={(e) =>
                      updateCoverDetails(
                        "coverSize",
                        e.target.value
                      )
                    }
                    className="h-10 w-full rounded-md border px-3"
                  >
                    <option value="">
                      Select
                    </option>

                    {coverSizes.map(
                      (size) => (
                        <option
                          key={size}
                          value={size}
                        >
                          {size}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    No.Of Covers
                  </label>
                  <Input
                    placeholder="Total Number Of Covers"
                    value={
                      coverDetails.totalNumberOfCovers ||
                      ""
                    }
                    onChange={(e) =>
                      updateCoverDetails(
                        "totalNumberOfCovers",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Layout Size
                  </label>
                  <Input
                    placeholder="Layout Size"
                    value={
                      coverDetails.layoutSize ||
                      ""
                    }
                    onChange={(e) =>
                      updateCoverDetails(
                        "layoutSize",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Paper Quality
                  </label>

                  <select
                    value={
                      coverDetails.paperQuality ||
                      ""
                    }
                    onChange={(e) =>
                      updateCoverDetails(
                        "paperQuality",
                        e.target.value
                      )
                    }
                    className="h-10 w-full rounded-md border px-3"
                  >
                    <option value="">
                      Select
                    </option>

                    {paperQualities.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Type Of Open
                  </label>

                  <select
                    value={
                      coverDetails.typeOfOpen ||
                      ""
                    }
                    onChange={(e) =>
                      updateCoverDetails(
                        "typeOfOpen",
                        e.target.value
                      )
                    }
                    className="h-10 w-full rounded-md border px-3"
                  >
                    <option value="">
                      None
                    </option>

                    {openStyles.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    No.of Cover Address
                  </label>
                  <Input
                    placeholder="Number Of Cover Address"
                    value={
                      coverDetails.numberOfCoverAddress ||
                      ""
                    }
                    onChange={(e) =>
                      updateCoverDetails(
                        "numberOfCoverAddress",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </>
          )}

        {process ===
          "Cut-Colour" && (
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Type Of Print
              </label>

              <div className="flex gap-6">
                {printTypes.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      value={item}
                      checked={
                        coverDetails.typeOfPrint ===
                        item
                      }
                      onChange={() =>
                        updateCoverDetails(
                          "typeOfPrint",
                          item
                        )
                      }
                    />

                    {item}
                  </label>
                ))}
              </div>
            </div>
          )}

        {process ===
          "Multi-Colour" && (
            <>
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Lamination
                </label>

                <div className="flex flex-wrap gap-6">
                  {laminations.map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="radio"
                          value={item}
                          checked={
                            coverDetails.lamination ===
                            item
                          }
                          onChange={() =>
                            updateCoverDetails(
                              "lamination",
                              item
                            )
                          }
                        />

                        {item}
                      </label>
                    )
                  )}
                </div>
              </div>

              {["Wet", "Thermal"].includes(
                coverDetails.lamination
              ) && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Lamination Type
                    </label>

                    <div className="flex gap-6">
                      {wetThermalOptions.map(
                        (item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="radio"
                              value={item}
                              checked={
                                coverDetails.laminationType ===
                                item
                              }
                              onChange={() =>
                                updateCoverDetails(
                                  "laminationType",
                                  item
                                )
                              }
                            />

                            {item}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}

              {coverDetails.lamination ===
                "UV" && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      UV Finish
                    </label>

                    <div className="flex gap-6">
                      {uvOptions.map(
                        (item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="radio"
                              value={item}
                              checked={
                                coverDetails.laminationType ===
                                item
                              }
                              onChange={() =>
                                updateCoverDetails(
                                  "laminationType",
                                  item
                                )
                              }
                            />

                            {item}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Special Effects
                </label>

                <div className="flex flex-wrap gap-6">
                  {specialEffects.map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={(
                            coverDetails.specialEffects ||
                            []
                          ).includes(item)}
                          onChange={() =>
                            toggleSpecialEffect(
                              item
                            )
                          }
                        />

                        {item}
                      </label>
                    )
                  )}
                </div>
              </div>
            </>
          )}

        {process ===
          "Readymade" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Open Style
                </label>

                <select
                  value={
                    coverDetails.openStyle ||
                    ""
                  }
                  onChange={(e) =>
                    updateCoverDetails(
                      "openStyle",
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-md border px-3"
                >
                  <option value="">
                    Select
                  </option>

                  {openStyles.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              <Input
                placeholder="Number Of Covers"
                value={
                  coverDetails.numberOfCovers ||
                  ""
                }
                onChange={(e) =>
                  updateCoverDetails(
                    "numberOfCovers",
                    e.target.value
                  )
                }
              />

              <Input
                placeholder="Number Of Cover Address"
                value={
                  coverDetails.numberOfCoverAddress ||
                  ""
                }
                onChange={(e) =>
                  updateCoverDetails(
                    "numberOfCoverAddress",
                    e.target.value
                  )
                }
              />
            </div>
          )}

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