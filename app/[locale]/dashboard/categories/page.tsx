import { deleteCategory } from "@/app/actions/actions";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Category from "@/app/models/Category";
import connect from "@/lib/clientPromise";
import { categoryColumns } from "../course/[id]/columns";
import CreateCategoryForm from "@/app/components/CreateCategory";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/app/components/CustomDialog";

const page = async () => {
  await connect();

  const categoreis = await Category.find().lean();

  return (
    <MaxWidthWrapper noPadding noPaddingX className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className="self-end">Add Category</Button>}
        title="Add Category"
        content={<CreateCategoryForm />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteCategory} columns={categoryColumns} data={categoreis} />
    </MaxWidthWrapper>
  );
};
export default page;
