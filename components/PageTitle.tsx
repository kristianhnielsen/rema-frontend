export default async function PageTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="text-3xl font-semibold text-gray-900 mb-6 border-b-4">
      {children}
    </h1>
  );
}
