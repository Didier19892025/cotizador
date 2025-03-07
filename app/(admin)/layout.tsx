import Header from "@/components/Header";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

        <Header />
      <div className=" max-w-screen-lg mx-auto rounded-2xl bg-white mt-4 p-4 ">

        {children}

      </div>

    </>
  );
}
