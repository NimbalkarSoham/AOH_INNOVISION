import Link from "next/link";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  handleImageChange,
  handleOwnershipDocChange
}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <div className="form-card bg-white p-8 rounded-md shadow-md">
        <div className="product-nav mb-4">
          <button
            type="button"
            className="close-button bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={handleGoBack}
          >
            X
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{type} Product</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 w-full max-w-2xl flex flex-col gap-6"
        >
          <label className="mb-4">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Name
            </span>
            <input
              value={post.name}
              onChange={(e) => setPost({ ...post, name: e.target.value })}
              placeholder="Product name"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>

          <label className="mb-4">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Product Description
            </span>
            <textarea
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              placeholder="Write your product info here.."
              required
              className="form_textarea mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>

          <label className="mb-4">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Price
            </span>
            <input
              type="Number"
              value={post.price}
              onChange={(e) => setPost({ ...post, price: e.target.value })}
              placeholder="Price"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-4 flex flex-col">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Ownership Document
            </span>
            <input
              type="file"
              name="ownershipDocFile"
              id="ownershipDoc"
              accept="image/*"
              onChange={handleOwnershipDocChange}
              placeholder="Ownership Document"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-4">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Model
            </span>
            <input
              value={post.model}
              onChange={(e) => setPost({ ...post, model: e.target.value })}
              placeholder="Product model"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-4">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Type
            </span>
            <input
              value={post.type}
              onChange={(e) => setPost({ ...post, type: e.target.value })}
              placeholder="Product location"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="mb-4">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Location
            </span>
            <input
              value={post.location}
              onChange={(e) => setPost({ ...post, location: e.target.value })}
              placeholder="Product location"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>

          <label className="mb-4 flex flex-col">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Image
            </span>
            <input
              type="file"
              name="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Image"
              required
              className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>

          <div className="flex justify-end gap-4">
            <Link href="/" className="text-gray-500 text-sm hover:underline">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className={`px-5 py-2 text-base rounded-md ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
