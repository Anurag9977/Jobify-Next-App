import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

function dashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main>
      <section className="bg-muted">
        <div className="align-section-center h-16">
          <Navbar />
        </div>
      </section>
      <section className="lg:grid lg:grid-cols-[16rem,1fr] xl:grid-cols-[18rem,1fr]">
        <div className="hidden lg:block min-h-[calc(100dvh-4rem)] h-full bg-muted py-8">
          <Sidebar />
        </div>
        <div className="align-section-center py-8">{children}</div>
      </section>
    </main>
  );
}
export default dashboardLayout;
