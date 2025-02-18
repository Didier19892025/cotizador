import Navigation from "@/components/Navigation";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
      <div className=" flex">
        <Navigation />
       <main className="flex-1">
       {children}
       </main>
      </div>
      </>
  );
}
