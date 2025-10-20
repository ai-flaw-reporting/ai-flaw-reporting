import type { PropsWithChildren } from "react";

import Header from "./_components/header";
import Footer from "./_components/footer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
