import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BreadcrumbCustom() {
  return (
    <div className=" flex items-center justify-between py-[12px] border-b-[1px] border-x-[1px] px-[20px] border-gray-200 rounded-[4px] ">
      <div className="">
        <span className="text-[16px] font-[500] text-textColor">Home page</span>
      </div>
      <Breadcrumb >
        <BreadcrumbList className="">
          <BreadcrumbItem className="">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

    </div>
  )
}
