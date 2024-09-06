"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { checkCertificate } from "../actions/actions";
import { CheckCircle, XCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CertificateVerify = () => {
  const [code, setCode] = React.useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const t = useTranslations("certificate");

  const handelClick = async () => {
    startTransition(async () => {
      const res = await checkCertificate(code);
      console.log(res);
      if (res.error) setError(t("errorMessage"));
      if (res.success) setSuccess(t("successMessage"));
    });
  };

  return (
    <div className="flex w-full md:max-w-md flex-col">
      <h1 className="mb-2 font-semibold">{t("enterCode")}</h1>
      <div className="flex w-full items-center space-x-2">
        <Input
          disabled={isPending}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder={t("placeholder")}
        />
        <Button disabled={isPending} onClick={handelClick} type="submit">
          {t("check")}
        </Button>
      </div>
      <div className="w-full mt-5 relative h-80">
        <Image src="/4043721.jpg" className="object-cover" alt="certificate" fill />
      </div>
      {error && (
        <p className="flex text-sm items-center gap-2 text-red-600 mt-3">
          {error} <XCircleIcon />
        </p>
      )}
      {success && (
        <p className="flex text-sm items-center gap-2 text-green-600 mt-3">
          {success} <CheckCircle />
        </p>
      )}
    </div>
  );
};

export default CertificateVerify;
