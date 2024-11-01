import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeProvider';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
interface Props {
  className?: string
}

export default function Header({className}:Props) {
  const user:any=useSelector(selectUser)
  const {theme,toggleTheme}=useTheme();

  const navigate = useNavigate();


  return (
    <header  className={`${cn(' z-10 sticky top-0 flex items-center justify-between px-4 py-3 border-b border-gray-200 transition-all duration-500 ease-linear bg-white dark:bg-colorDarkMode dark:border-borderDarkMode  ', className)}`} >
      <div>
        <span className='font-medium text-sm text-textColor dark:text-white dark:font-[500] '>Overview</span>
      </div>
      <div className='flex items-center gap-[10px] '>
        {/* theme Color */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
              {theme === 'light' ? (
                <i className='fa-regular fa-sun text-textColor text-[1.2rem]'></i>
              ) : (
                <i className='fa-regular fa-moon text-textColor text-[1.2rem]'></i>
              )}
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => toggleTheme('light')}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleTheme('dark')}>Dark</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <img
                className='h-8 w-8 rounded-full object-cover  cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out'
                src={user.avatar} 
                alt='User Avatar'
              />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{user.name}</p>
                <p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
              <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/')}>Thoát</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
