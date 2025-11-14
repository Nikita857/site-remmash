"use client";

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Sidebar, StatsOverview } from "./common";
import ProductsPageContent from "./ProductsPageContent";
import UsersPageContent from "./UsersPageContent";
import ContactRequestsPageContent from "./ContactRequestsPageContent";

interface AdminDashboardLayoutProps {
  isAdmin: boolean;
}

export default function AdminDashboardLayout({
  isAdmin,
}: AdminDashboardLayoutProps) {
  const [activeView, setActiveView] = useState<
    "dashboard" | "products" | "users" | "certificates" | "requests"
  >("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isAdmin={isAdmin}
      />

      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? "240px" : "60px" }}
      >
        <div className="p-6">
          {activeView === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StatsOverview />
            </motion.div>
          )}

          {activeView === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductsPageContent />
            </motion.div>
          )}

          {activeView === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isAdmin ? (
                <UsersPageContent />
              ) : (
                <div className="p-6">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Доступ запрещен:</strong> У вас нет прав для
                    просмотра этой страницы. Только администраторы имеют доступ
                    к управлению пользователями.
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeView === "certificates" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* <CertificatesTable /> */}
            </motion.div>
          )}

          {activeView === "requests" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContactRequestsPageContent />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
