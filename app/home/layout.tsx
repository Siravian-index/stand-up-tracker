

import { validateAuthSessionServer } from '@/lib/auth';
import Navbar from './components/Navbar';


interface Props {
  children: React.ReactNode
}

const HomeLayout = async ({ children }: Props) => {
  await validateAuthSessionServer({redirectTo: "/"})
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}


export default HomeLayout