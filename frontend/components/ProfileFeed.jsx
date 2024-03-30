import React from 'react'
import Card from './Card'
import Link from 'next/link'

const ProfileFeed = ({data,handleEdit,handleDelete}) => {
  return (
    <section className='w-full'>
      <div className="available">
        <h1>Products in the market</h1>
        <div className='mt-16 mx-10 prompt_layout'>
          {data?.map((post) => (post.status == "verified"?(
          <>
            <Card
              key={post._id}
              post={post}
              handleEdit={()=> handleEdit && handleEdit(post)}
              handleDelete={()=>handleDelete && handleDelete(post)}
            />
          </>):(
          <></>))
          )}
        </div>
      </div>
      <div className="sold">
        <h1>Products out on Rent</h1>
        <div className='mt-16 mx-10 prompt_layout'>
          {data?.map((post) => (post.status == "soldOut!"?(
            <>
              <Card
                key={post._id}
                post={post}
                handleEdit={()=> handleEdit && handleEdit(post)}
                handleDelete={()=>handleDelete && handleDelete(post)}
              />
            </>):(<></>)
            
          ))}
        </div>
      </div>
      
    </section>
  )
}

export default ProfileFeed