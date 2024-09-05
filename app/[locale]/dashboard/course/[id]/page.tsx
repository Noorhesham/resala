import { deleteComment } from "@/app/actions/actions";
import CreateCommentForm from "@/app/components/CreateComment";
import CustomDialog from "@/app/components/CustomDialog";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Comment } from "@/app/models/Comment";
import { Button } from "@/components/ui/button";
import connect from "@/lib/clientPromise";
import { commentColumns } from "./columns";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  await connect();

  const comments = await Comment.find({ courseId: id }).lean(); // Fetch comments based on dynamic courseId
  console.log(comments);
  return (
    <MaxWidthWrapper noPadding noPaddingX  className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className="self-end">Add Comment</Button>}
        title="Add Comment"
        content={<CreateCommentForm courseId={id} />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteComment} columns={commentColumns} data={comments} />
    </MaxWidthWrapper>
  );
};
export default page;
