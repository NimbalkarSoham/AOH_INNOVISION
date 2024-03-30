import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Card = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="post_card flex flex-col p-3 max-h-[600px]  hover:bg-gray-100 hover:shadow-lg transition duration-300 ">
      <div className="relative  overflow-hidden"> {/* Set a fixed height and hide overflow */}
        <Image
          src={post.image}
          alt="product_image"
          width={1000}
          height={1000}
          className="object-cover product-image w-96 h-52 mb-2 "
        />
      </div>
      <h3 className="font-bold">{post.name}</h3>
      <p className="font-light text-gray-500 leading-5 line-clamp-3">{post.description}</p><br />
      <p className="font-bold text-xs">Rs. {post.price}</p><br />
      <hr />
      <Link href={`/product-details/${post._id}`} className="flex flex-col items-center">
        <button className="bg-green-600 rounded-2xl max-w-fit px-4 py-1 mt-4 text-white transition duration-300 hover:bg-green-700">
          View Deal &rarr;
        </button>
      </Link>
    </div>
  );
};

export default Card;
