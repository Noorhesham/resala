import {  deleteEntity, getEntities } from "@/app/actions/actions";
import CreateCommentForm from "@/app/components/CreateComment";
import CustomDialog from "@/app/components/CustomDialog";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { commentColumns } from "./columns";

const page = async ({ params: { id, locale } }: { params: { id: string; locale: string } }) => {
  const { data } = await getEntities("Comment", 1, { courseId: id }, true); // Fetch comments based on dynamic courseId

  console.log(data);
  return (
    <MaxWidthWrapper noPadding noPaddingX className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className="self-end">Add Comment</Button>}
        title="Add Comment"
        content={<CreateCommentForm courseId={id} />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteEntity} entity="Comment" columns={commentColumns} data={data?.data} />
    </MaxWidthWrapper>
  );
};
export default page;
