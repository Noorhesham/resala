// pages/certificates/index.js
import React from "react";
import CustomDialog from "@/app/components/CustomDialog";
import connect from "@/lib/clientPromise";
import Certificate from "@/app/models/Certificate";
import Course from "@/app/models/Course";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import CreateCertificateForm from "@/app/components/CertificateCreation";
import { DataTable } from "@/app/components/DataTable";
import { deleteCertificate, getCourses } from "@/app/actions/actions";
import { columns } from "./columns";
export const dynamic = "force-dynamic";

const page = async () => {
  await connect();
  const certificates = await Certificate.find({}).populate("course").lean();
  const res = await getCourses(1, "");
  console.log(res);
  return (
    <MaxWidthWrapper className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className="self-end">Add Certificate</Button>}
        title="Add Certificate"
        content={<CreateCertificateForm courses={res.data?.courses} />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteCertificate} columns={columns} data={certificates} />
    </MaxWidthWrapper>
  );
};

export default page;
