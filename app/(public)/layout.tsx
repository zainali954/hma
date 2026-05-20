import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>

      {/* Map */}
      <section className="w-full h-64 sm:h-80 lg:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14442.133287304514!2d55.264875!3d25.185231!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6995238ece35%3A0xacd81ba0a3887e30!2sHMA%20Auditing%20of%20Accounts!5e0!3m2!1sen!2sus!4v1779300022413!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HMA Auditing of Accounts location"
        />
      </section>

      <Footer />
    </>
  );
}
