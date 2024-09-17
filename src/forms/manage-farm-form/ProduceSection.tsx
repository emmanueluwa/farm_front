import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { produceList } from "@/config/farm-options-config";
import { useFormContext } from "react-hook-form";
import ProduceCheckbox from "./ProduceCheckbox";

const ProduceSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Produce</h2>
        <FormDescription>
          Select the produce that your farm offers
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="produce"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {produceList.map((produceItem) => (
                <ProduceCheckbox produce={produceItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProduceSection;
