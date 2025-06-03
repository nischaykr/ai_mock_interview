import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewsByUserId } from '@/lib/actions/auth.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Page = async () => {
    const user = await getCurrentUser();
    const userInterviews = await getInterviewsByUserId(user?.id!)

    const hasPastInterviews = userInterviews?.length > 0
  return (
    <>
        <section className='card-cta'>
            <div className='flex flex-col gap-6 max-w-lg'>
                <h2>Get Interview Ready with AI-Powered Practice</h2>
                <p className='text-lg'>
                    Practice job interview with AI to improve your skills and land your dream job.
                </p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
            </div>
            <Image src="/robot.png" alt="robot" width={400} height={400} className='max-sm:hidden'/>
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Your Interviews</h2>
            <div className='interviews-section'>
                {
                  hasPastInterviews?(
                    userInterviews?.map((interview)=>(
                        <InterviewCard {...interview} key={interview.id} />
                    ))):(
                        <p>You haven&apos;t taken any interviews</p>
                    )
                }
            </div>
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Take an Interview</h2>
            <div className='interviews-section'>
            {dummyInterviews.map((interview) =>
                    <InterviewCard {...interview} key={interview.id}/>
                )}
            </div>
        </section>
    </>
  )
}

export default Page