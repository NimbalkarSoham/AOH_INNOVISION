import React from 'react';
import Card from './Card';
import Link from 'next/link';

const ProfileFeed = ({ data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <div className="available">
        <h1 className="text-2xl font-bold">Products in the market</h1>
        <div className='mt-16 mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {data?.map((post) => (
            post.status === "verified" && (
              <Card
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            )
          ))}
        </div>
      </div>
      <div className="sold">
        <h1 className="text-2xl font-bold">Products out on Rent</h1>
        <div className='mt-16 mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {data?.map((post) => (
            post.status === "soldOut!" && (
              <Card
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileFeed;
