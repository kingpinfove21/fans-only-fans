import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Order placed successfully!
      </h1>
      <p className="text-gray-600 mb-8">
        We've received your order and will process it shortly. A confirmation
        email will arrive soon.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/orders"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          View my orders
        </Link>
        <Link
          href="/"
          className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}