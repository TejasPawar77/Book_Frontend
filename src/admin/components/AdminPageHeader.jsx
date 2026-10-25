export default function AdminPageHeader({ username }) {
  return (
    <div className="hidden lg:flex items-center justify-between mb-8 border-b-4 border-black pb-5">
      <div>
        <p className="text-sm font-black text-purple-700">
          BOOK RECOMMENDER / ADMIN
        </p>

        <h2 className="text-3xl font-black mt-1">
          Management Dashboard
        </h2>
      </div>

      <div className="border-2 border-black bg-white px-4 py-3 font-bold shadow-[4px_4px_0px_#000]">
        Welcome, {username || 'Admin'}
      </div>
    </div>
  );
}