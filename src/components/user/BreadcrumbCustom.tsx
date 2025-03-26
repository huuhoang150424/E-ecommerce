import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useBreadcrumbInfo } from "@/hooks/useBreadcrumbInfo";


export default function BreadcrumbCustom() {
  const { breadcrumbName, path } = useBreadcrumbInfo();
  console.log(breadcrumbName)
  return (
    <div className="flex items-center justify-between py-[12px] border-b-[1px] px-[20px] border-gray-200 rounded-[4px]">
      <div>
        <span className="text-[16px] font-[500] text-textColor">{breadcrumbName}</span>
      </div>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={path}>{breadcrumbName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
