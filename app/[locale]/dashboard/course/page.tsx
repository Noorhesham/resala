import { deleteComment } from "@/app/actions/actions";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Comment } from "@/app/models/Comment";
import connect from "@/lib/clientPromise";
import { commentColumns } from "./[id]/columns";
export const dynamic = "force-dynamic";

const page = async () => {
  await connect();

  const comments = await Comment.find().lean(); // Fetch comments based on dynamic courseId

  return (
    <MaxWidthWrapper noPadding noPaddingX className="flex flex-col mt-5">
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteComment} columns={commentColumns} data={comments} />
    </MaxWidthWrapper>
  );
};
export default page;
