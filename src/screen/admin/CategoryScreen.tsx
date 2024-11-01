import { Tables } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator} from '@/components/ui/dropdown-menu';
import { Label } from "@/components/ui/label";


export default function CategoryScreen() {
  return (
    <div className="">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách mục sản phẩm</h1>
      <div className="flex items-center mb-[15px] justify-between">
        <div className="flex items-center gap-[15px]  ">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm danh mục"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">Thêm danh mục</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tạo mới danh mục sản phẩm</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tên danh mục
                  </Label>
                  <Input
                    className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
                    placeholder="tìm kiếm danh mục"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    mô tả
                  </Label>
                  <Input
                    className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
                    placeholder="tìm kiếm danh mục"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">Lọc</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>satnaing</p>
                  <p className='text-xs leading-none text-muted-foreground'>nguyenhoanghuu15042004@gm...</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
                  <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">View</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>satnaing</p>
                    <p className='text-xs leading-none text-muted-foreground'>nguyenhoanghuu15042004@gm...</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
                    <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                  </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      <div className=" ">
        <Tables className="mb-[100px] border border-gray-200 shadow-none"/>
      </div>
    </div>
  )
}
