import Header from "@/components/Header";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <Header />
      <div className="px-4">
        <div className=" max-w-screen-2xl rounded-3xl mx-auto mt-4 bg-white p-4 pb-2">

          {children}

        </div>
      </div>

    </>
  );
}
