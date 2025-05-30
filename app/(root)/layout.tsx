import { isAuthenticated } from '@/lib/actions/auth.actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const rootLayout = async({children}:{children:ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();

    if(!isUserAuthenticated) redirect("/sign-in");
  return (
    <div className='root-layout'>
        <nav>
            <Link href="/">
                <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                <h2 className='text-primary-100'>PrepWise</h2>
            </Link>
        </nav>
        {children}
    </div>
  )
}

export default rootLayout