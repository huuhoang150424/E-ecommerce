import { lazy, Suspense } from "react";


interface Props {
  type?:String;
  closeDialog?: boolean;
  onCloseDialog?: ()=>void;
  element?: any
}

const ChangePassword = lazy(() => import('./change-password'));
const ChangePhone = lazy(() => import('./change-phone'));


export default function Modal({type='create',closeDialog,onCloseDialog,element}:Props) {
  return (
    <Suspense >
      {type==='change-password' && <ChangePassword close={closeDialog} onClose={onCloseDialog}/>}
      {type==='change-phone' && <ChangePhone close={closeDialog} onClose={onCloseDialog}/>}
      {/* {type==='update' && <UpdateCategoryModal close={closeDialog} onClose={onCloseDialog} category={element} />} */}
    </Suspense>
  )
}
