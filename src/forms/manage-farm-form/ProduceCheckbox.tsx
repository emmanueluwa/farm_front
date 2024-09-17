import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  produce: string;
  field: ControllerRenderProps<FieldValues, "produce">;
};

const ProduceCheckbox = ({ produce, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(produce)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, produce]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== produce)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{produce}</FormLabel>
    </FormItem>
  );
};

export default ProduceCheckbox;
