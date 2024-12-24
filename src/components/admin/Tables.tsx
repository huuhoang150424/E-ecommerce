import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
interface Props {
  className: string;
  data?: any;
  nameCol?: string[];
  renderRow?: any;
  handleDelete?: any;
  handleUpdate?: any;
  isUpdate?: boolean;
  isAction?:boolean;
  renderSelect?: any
}
export default function Tables({ className, data, nameCol,renderRow,handleDelete ,handleUpdate,isUpdate=false,isAction=true,renderSelect}: Props) {




  return (
    <div className={`${cn('overflow-x-auto shadow-md rounded-lg w-full', className)}`}>
      <table className="w-full text-sm text-gray-500 table-fixed">
        <thead className="text-xs bg-gray-200 text-gray-700 uppercase">
          <tr className="flex">
            <th className="w-12 py-4 px-2 flex items-center justify-center">
              <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer" />
            </th>
            <th className="w-full flex items-center">
              {nameCol?.map((name, index) => (
                <div key={index} className="flex-1 py-4 text-left">
                  <span className="ml-[20px] ">{name}</span>
                </div>
              ))}
            </th>
            <th className="w-[120px] flex items-center justify-center  ">
              <span className="text-center "> Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row:any, index:number) => (
            <tr key={index} className="flex hover:bg-gray-100 transition-all duration-300 ease-in-out border-gray-200 border-b-[1px]">
              <td className="w-12 py-3 px-2 flex items-center justify-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer " />
              </td>
              {renderRow(row)}
              {
                isAction ?(<td className="w-[120px] flex items-center justify-center ">
                  {
                    isUpdate ? (
                    <Link to={`/admin/editProduct/${row?.slug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer ">Edit</Link>) : 
                    (<span onClick={() => handleUpdate(row)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer ">Edit</span>)
                  }
                  <span onClick={()=>handleDelete(row)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3 cursor-pointer ">Remove</span>
                </td>) :(renderSelect(row))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
