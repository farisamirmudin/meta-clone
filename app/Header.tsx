import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

function Header() {
  const session = true
  if (session) {
    return (
      <header className='sticky top-0 p-10 bg-white shadow-sm flex items-center space-x-2 justify-between'>
          <div className='flex space-x-2'>
            <Image src='https://links.papareact.com/jne' height={10} width={50} alt='Logo' className='rounded-full object-contain' />
            <div>
              <p className='text-blue-500'>Logged as:</p>
              <p className='font-semibold'>Faris</p>
            </div>
          </div>
          <LogoutButton />
      </header>
    )
  }
  return (
    <header>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2 items-center">
          <div>
            <Image src='https://links.papareact.com/jne' height={10} width={50} alt='Logo' />
          </div>
          <p className='text-blue-400'>Welcome to the Messenger</p>
        </div>
        <Link href='/auth/login' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Sign in</Link>
      </div>
    </header>
  )
}

export default Header