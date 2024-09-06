import { deleteCategory, getEntities } from "@/app/actions/actions";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import CreateCategoryForm from "@/app/components/CreateCategory";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/app/components/CustomDialog";
import { columns } from "./columns";
export const dynamic = "force-dynamic";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await getEntities("Category", 1, "", true, locale);

  return (
    <MaxWidthWrapper noPadding noPaddingX className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className="self-end">Add Category</Button>}
        title="Add Category"
        content={<CreateCategoryForm />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteCategory} columns={columns} data={data?.data} entity="Category" />
    </MaxWidthWrapper>
  );
};
export default Page;
