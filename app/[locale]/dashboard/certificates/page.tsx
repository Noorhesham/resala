import React from "react";
import CustomDialog from "@/app/components/CustomDialog";
import connect from "@/lib/clientPromise";
import Certificate from "@/app/models/Certificate";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import CreateCertificateForm from "@/app/components/CertificateCreation";
import { DataTable } from "@/app/components/DataTable";
import { deleteEntity, getCourses, getEntities } from "@/app/actions/actions";
import { columns } from "./columns";
export const dynamic = "force-dynamic";

const page = async () => {
  await connect();
  const res = await Certificate.find({}).populate("course").lean();
  console.log(res);
  return (
    <MaxWidthWrapper className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className="self-end">Add Certificate</Button>}
        title="Add Certificate"
        content={<CreateCertificateForm />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteEntity} columns={columns} data={res} />
    </MaxWidthWrapper>
  );
};

export default page;
