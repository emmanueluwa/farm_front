import {
  useCreateMyFarm,
  useGetMyFarm,
  useGetMyFarmOrders,
  useUpdateMyFarm,
} from "@/api/MyFarmApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageFarmForm from "@/forms/manage-farm-form/ManageFarmForm";

const ManageFarmPage = () => {
  const { createFarm, isLoading: isCreateLoading } = useCreateMyFarm();

  const { farm } = useGetMyFarm();

  const { updateFarm, isLoading: isUpdateLoading } = useUpdateMyFarm();

  const { orders } = useGetMyFarmOrders();

  //truthy value of variable if farm exists => true else false
  const isEditing = !!farm;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-farm">Manage Farm</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-farm">
        <ManageFarmForm
          farm={farm}
          onSave={isEditing ? updateFarm : createFarm}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageFarmPage;
