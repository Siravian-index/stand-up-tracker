

import { useServerAuthSession } from '@/lib/auth';
import Navbar from './components/Navbar';


interface Props {
  children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {
  // useServerAuthSession()
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}


export default HomeLayout