import { lazy, Suspense } from "react";
interface Props {
  type?:String;
  closeDialog: boolean;
  onCloseDialog: ()=>void;
  element?: any
}
const CreateCategoryModal = lazy(() => import('./create-user'));
const UpdateUserModal = lazy(() => import('./update-user'));
const DeleteUserModal = lazy(() => import('./delete-user'));
export default function Modal({type='create',closeDialog,onCloseDialog,element}:Props) {
  return (
    <Suspense >
      {type==='create' && <CreateCategoryModal close={closeDialog} onClose={onCloseDialog}/>}
      {type==='delete' && <DeleteUserModal close={closeDialog} onClose={onCloseDialog} id={element.id} />}
      {type==='update' && <UpdateUserModal close={closeDialog} onClose={onCloseDialog} user={element} />}
    </Suspense>
  )
}
