import { deleteEntity, getEntities } from "@/app/actions/actions";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { commentColumns } from "./[id]/columns";
export const dynamic = "force-dynamic";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await getEntities("Comment", 1, "", true, locale);

  return (
    <MaxWidthWrapper noPadding noPaddingX className="flex flex-col mt-5">
      {/*@ts-ignore*/}
      <DataTable entity="Comment" handleDeleteAll={deleteEntity} columns={commentColumns} data={data?.data} />
    </MaxWidthWrapper>
  );
};
export default Page;
/*
languages 
deailed page 
send email 

*/
