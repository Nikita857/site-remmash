"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import ContactsHero from "./components/ContactsHero";
import ContactInfo from "./components/ContactInfo";
import ContactMap from "./components/ContactMap";
import ManagementInfo from "./components/ManagementInfo";

export default function ContactsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <ContactsHero />
        <ContactInfo />
        <ContactMap />
        <ManagementInfo />
      </main>
      <Footer />
    </div>
  );
}
