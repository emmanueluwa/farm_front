import { Farm } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  farm: Farm;
};

const FarmInfo = ({ farm }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {farm.farmName}
        </CardTitle>
        <CardDescription>
          {farm.city}, {farm.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex">
        {farm.produce.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < farm.produce.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default FarmInfo;
