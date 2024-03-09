import Link from "next/link";

const NotFound = () => {
  return (
    <section className="bg-white w-screen h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-orange-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-gray-900">
            Something missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-700">
            Sorry, we can not find that page. You will find lots to explore on
            the home page.
          </p>
          <Link
            href="/"
            className="inline-flex text-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 bg-orange-900"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
