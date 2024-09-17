import { useCreateMyFarm, useGetMyFarm } from "@/api/MyFarmApi";
import ManageFarmForm from "@/forms/manage-farm-form/ManageFarmForm";

const ManageFarmPage = () => {
  const { createFarm, isLoading } = useCreateMyFarm();
  const { farm } = useGetMyFarm();

  return (
    <ManageFarmForm farm={farm} onSave={createFarm} isLoading={isLoading} />
  );
};

export default ManageFarmPage;
