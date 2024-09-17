import { useCreateMyFarm } from "@/api/MyFarmApi";
import ManageFarmForm from "@/forms/manage-farm-form/ManageFarmForm";

const ManageFarmPage = () => {
  const { createFarm, isLoading } = useCreateMyFarm();

  return <ManageFarmForm onSave={createFarm} isLoading={isLoading} />;
};

export default ManageFarmPage;
