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
        <div className=" max-w-screen-xl mx-auto rounded-3xl   mt-4 bg-white p-4 max-h-[510px] overflow-auto">

          {children}

        </div>
      </div>

    </>
  );
}
