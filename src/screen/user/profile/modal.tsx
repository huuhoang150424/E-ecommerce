import { lazy, Suspense } from "react";


interface Props {
  type?:String;
  closeDialog?: boolean;
  onCloseDialog?: ()=>void;
  element?: any
}

const ChangePassword = lazy(() => import('./change-password'));
const ChangePhone = lazy(() => import('./change-phone'));
const Address = lazy(() => import('./address'));

export default function Modal({type='create',closeDialog,onCloseDialog}:Props) {
  return (
    <Suspense >
      {type==='change-password' && <ChangePassword close={closeDialog} onClose={onCloseDialog}/>}
      {type==='change-phone' && <ChangePhone close={closeDialog} onClose={onCloseDialog}/>}
      {type==='address' && <Address close={closeDialog} onClose={onCloseDialog}  />}
    </Suspense>
  )
}
