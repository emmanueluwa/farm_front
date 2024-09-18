import { produceList } from "@/config/farm-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (produce: string[]) => void;
  selectedProduce: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const ProduceFilter = ({
  onChange,
  selectedProduce,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleProduceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedProduce = event.target.value;

    const isChecked = event.target.checked;

    const newProduceList = isChecked
      ? [...selectedProduce, clickedProduce]
      : selectedProduce.filter((produce) => produce !== clickedProduce);

    onChange(newProduceList);
  };

  const handleProduceReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Produce</div>
        <div
          onClick={handleProduceReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {produceList
          .slice(0, isExpanded ? produceList.length : 7)
          .map((produce) => {
            const isSelected = selectedProduce.includes(produce);
            return (
              <div className="flex">
                <input
                  id={`produce_${produce}`}
                  type="checkbox"
                  className="hidden"
                  value={produce}
                  checked={isSelected}
                  onChange={handleProduceChange}
                />
                <Label
                  htmlFor={`produce_${produce}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-orange-600 text-orange-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {produce}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View more <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default ProduceFilter;
