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
        <div className=" max-w-screen-2xl mx-auto rounded-2xl mt-4 bg-white p-4">

          {children}

        </div>
      </div>

    </>
  );
}
