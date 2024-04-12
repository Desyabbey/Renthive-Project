import type { Metadata } from "next";
import "./globals.css";

import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";

import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
// import Modal from "./components/modals/Modal";

const font = Nunito({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Renthive",
  description: "Renthive Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        {/* <Modal isOpen/> */}
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        <div className="
          pb-20
          pt-28
        "
        >
        {children}
        </div>
        </body>
    </html>
  );
}
