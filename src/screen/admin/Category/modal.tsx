import { lazy, Suspense } from "react";
interface Props {
  type?:String;
  closeDialog: boolean;
  onCloseDialog: ()=>void;
  element?: any
}
const CreateCategoryModal = lazy(() => import('./create-category'));
const UpdateCategoryModal = lazy(() => import('./update-category'));
const DeleteCategoryModal = lazy(() => import('./delete-category'));
export default function Modal({type='create',closeDialog,onCloseDialog,element}:Props) {
  return (
    <Suspense >
      {type==='create' && <CreateCategoryModal close={closeDialog} onClose={onCloseDialog}/>}
      {type==='delete' && <DeleteCategoryModal close={closeDialog} onClose={onCloseDialog} id={element.id} />}
      {type==='update' && <UpdateCategoryModal close={closeDialog} onClose={onCloseDialog} category={element} />}
    </Suspense>
  )
}
