import { lazy, Suspense } from "react";
interface Props {
  type?:String;
  closeDialog: boolean;
  onCloseDialog: ()=>void;
  element?: any
}
const CreateAttributeModal = lazy(() => import('./create-attribute'));
const UpdateAttributeModal = lazy(() => import('./update-attribute'));
const DeleteAttributeModal = lazy(() => import('./delete-attribute'));
export default function Modal({type='create',closeDialog,onCloseDialog,element}:Props) {
  return (
    <Suspense >
      {type==='create' && <CreateAttributeModal close={closeDialog} onClose={onCloseDialog}/>}
      {type==='delete' && <DeleteAttributeModal close={closeDialog} onClose={onCloseDialog} id={element.id} />}
      {type==='update' && <UpdateAttributeModal close={closeDialog} onClose={onCloseDialog} attribute={element} />}
    </Suspense>
  )
}
