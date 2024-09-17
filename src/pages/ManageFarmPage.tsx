import {
  useCreateMyFarm,
  useGetMyFarm,
  useUpdateMyFarm,
} from "@/api/MyFarmApi";
import ManageFarmForm from "@/forms/manage-farm-form/ManageFarmForm";

const ManageFarmPage = () => {
  const { createFarm, isLoading: isCreateLoading } = useCreateMyFarm();

  const { farm } = useGetMyFarm();

  const { updateFarm, isLoading: isUpdateLoading } = useUpdateMyFarm();

  //truthy value of variable if farm exists => true else false
  const isEditing = !!farm;

  return (
    <ManageFarmForm
      farm={farm}
      onSave={isEditing ? updateFarm : createFarm}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageFarmPage;
