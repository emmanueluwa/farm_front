import { useGetFarm } from "@/api/FarmApi";
import FarmInfo from "@/components/FarmInfo";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { farmId } = useParams();
  const { farm, isLoading } = useGetFarm(farmId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  if (isLoading || !farm) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={farm.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <FarmInfo farm={farm} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {farm.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary farm={farm} cartItems={cartItems} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
