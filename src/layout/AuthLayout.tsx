interface Props {
  children: React.ReactNode
}



export default function AuthLayout({children}:Props) {
  return (
    <div className=''>
      {children}
    </div>
  )
}
