import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import ProduceSection from "./ProduceSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  farmName: z.string({
    required_error: "farm name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "must be valid number",
  }),
  produce: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});

type FarmFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (farmFormData: FormData) => void;
  isLoading: boolean;
};

const ManageFarmForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<FarmFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produce: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  //data passed all zod checks
  const onSubmit = (formDataJson: FarmFormData) => {
    //convert formdatajson to formdataobject
    const formData = new FormData();

    formData.append("farmName", formDataJson.farmName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    //convert price to lowest currency denomination for stripe => 1gbp = 100p
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );

    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.produce.forEach((produce, index) => {
      formData.append(`produce[${index}]`, produce);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    formData.append(`imageFile`, formDataJson.imageFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <ProduceSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageFarmForm;
