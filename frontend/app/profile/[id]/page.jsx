"use client";
import ProfileFeed from '@components/ProfileFeed';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Profile = ({ params }) => {

    const {data:session}=useSession();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchProfile = async() => {
          debugger;


          const postReq = await fetch(`/api/users/${params.id}/posts`,{
              method: 'GET',
          });
          const post = await postReq.json();

          const userReq = await fetch(`/api/users/${params.id}`);
          const user = await userReq.json();

          setPosts(post);
          setProfile(user);
        }
      if(params.id) fetchProfile();
    }, [params.id])
    

    const handleVerification = async() => {
      const response  = await fetch(`/api/users/${profile._id}`,{
        method: 'PATCH',
      })
      if(response.ok){
        router.push('/');
      }
    }
    const handleDelete = () => {}
    const handleEdit = () => {}

  return (
    <div className='flex flex-col items-center'>
        {profile &&(
            // TODO: Now display all data using the posts and profile hooks.
            <div className="profilecard flex flex-col items-center gap-7">
              <p className='desc text-left text-4xl font-bold'>Welcome to your personalized Profile page</p>
              <div className='flex flex-row gap-10 bg-slate-300 rounded-md p-6'>
                <div className="img">
                  <Image src={profile.AadharCard} width={300} height={300} alt='img'/>
                </div>
                <div className="details flex flex-col gap-2">
                  <p className='text-lg font-extralight'><span className='text-lg font-bold'>Name:</span> {profile.name}</p>
                  <p className='text-lg font-extralight'><span className='text-lg font-bold'>Contact:</span> {profile.phone}</p>
                  <p className='text-lg font-extralight'><span className='text-lg font-bold'>Address:</span> {profile.street}</p>
                  <p className='text-lg font-extralight'><span className='text-lg font-bold'>Aadhar No:</span> {profile.AadharNo}</p>
                  <p className='text-lg font-extralight'><span className='text-lg font-bold'>Status:</span> {profile.isVerified}</p>
                  {session?.user.email == "2021.soham.nimbalkar@ves.ac.in" ? (
                    <button
                      id="verify-btn"
                      onClick={()=>{handleVerification()}}
                      className="btn explore_btn"
                    >
                      Verify
                    </button>
                  ) : (<>
                      {
                        (profile?.isVerified == "verified" && profile.email == session?.user.email)?(
                          <Link href={"/add-product"} className='outline_btn mx-12 '>Add Product</Link>
                        ):(
                          <>
                          </>
                        )
                      }
                  </>)
                  }
                </div>
              </div>
            </div>
        )}

        
        <ProfileFeed
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
    </div>  
  )
}

export default Profile