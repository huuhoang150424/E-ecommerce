import { cn } from "@/lib/utils";

interface Props {
  className?: string
}

function Header({className}:Props) {
  return <div className={`${cn('',className)}`}>Header</div>;
}

Header.displayName='Header';

export default Header