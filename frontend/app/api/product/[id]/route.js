import Product from "@/models/product";
import { connectToDb } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDb();

    const product = await Product.findById(params.id);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
export const POST = async (request, { params }) => {
  try {
    await connectToDb();

    const product = await Product.findById(params.id);
    if (!product) return new Response("Product Not Found", { status: 404 });

    // Extract the review text from the request body
    const { reviewText } = await request.json();

    // Add the new review to the 'reviews' array in the product schema
    product.type.push(reviewText);

    // Save the updated product with the new review
    await product.save();

    // Respond with a success message or the updated product data
    return new Response("Review added successfully", { status: 200 });
  } catch (error) {
    console.error("Error adding review:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { status } = await request.json();

  try {
    await connectToDb();
    const product = await Product.findById(params.id);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    product.status = status;
    await product.save();

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Could not update product", { status: 500 });
  }
};
// only for verification
export const PATCH = async (request, { params }) => {
  const { price } = await request.json();
  try {
    await connectToDb();
    const product = await Product.findById(params.id);
    console.log(product);
    if (!product) return new Response("Product not found", { status: 404 });

    product.status = "verified";
    product.brand = price;

    await product.save();

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Could not update prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();

    await Product.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Prompt could not be deleted", { status: 500 });
  }
};


