"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { checkCertificate } from "../actions/actions";
import { CheckCircle, XCircleIcon } from "lucide-react";
import { useLocale } from "next-intl";

const CertificateVerify = () => {
  const [code, setCode] = React.useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const locale = useLocale();
  const handelClick = async () => {
    startTransition(async () => {
      const res = await checkCertificate(code, locale);
      console.log(res);
      if (res.error) setError(res.error);
      if (res.success) setSuccess(res.success);
    });
  };
  return (
    <div className=" flex w-full   max-w-sm  flex-col">
      <h1 className=" mb-2 font-semibold">Enter Certificate Code: </h1>
      <div className="flex w-full items-center space-x-2">
        <Input
          disabled={isPending}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder="enter certificate code"
        />
        <Button disabled={isPending} onClick={handelClick} type="submit">
          Check
        </Button>
      </div>
      {error && (
        <p className=" flex text-sm items-center gap-2 text-red-600 mt-3">
          {error} <XCircleIcon />
        </p>
      )}
      {success && (
        <p className=" flex text-sm items-center gap-2 text-green-600 mt-3">
          {success} <CheckCircle />
        </p>
      )}
    </div>
  );
};

export default CertificateVerify;
