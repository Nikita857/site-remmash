"use client";

import { Menu, X, ChevronDown, Mail, Phone, MapPin, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import { useRouter } from "next/navigation";
import OrderModal from "@/components/OrderModal";
import { useSession, signOut } from "next-auth/react";
import { SITE_CONFIG } from "@/config";
import { Button } from "./ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const navigation = [
    { name: "О компании", href: "#about" },
    { name: "Производство", href: "#production" },
    { name: "Контакты", href: "/contacts" },
    { name: "Сертификаты", href: "/certificates" },
  ];

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/rm-login", // Перенаправляем на страницу логина после выхода
      redirect: true,
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Contact info bar */}
      <div className="bg-[rgb(0,91,137)] text-white text-sm py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {SITE_CONFIG.contact.address.replace("Россия, ", "")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{SITE_CONFIG.contact.email}</span>
            </div>
            {/* Кнопка панели администратора - показывается только при аутентификации */}
            <div className="flex items-center gap-2">
              {status === "authenticated" && (
                <motion.a
                  href="/admin"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors relative group text-xs whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  Панель администратора
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              )}

              {status === "authenticated" && (
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors relative group text-xs whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ y: -2 }}
                >
                  <User className="w-4 h-4 mr-1 flex-shrink-0" />
                  Выйти
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="shrink-0">
              <a href="#" className="flex items-center gap-3">
                <motion.div
                  className="w-32 h-32 rounded flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ImageWithFallback
                    src="/logo.png"
                    alt="Логотип ООО Реммаш"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onClick={() => router.push("/")}
                  />
                </motion.div>
              </a>
            </div>
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {/* Products dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductDropdownOpen(true)}
                onMouseLeave={() => setProductDropdownOpen(false)}
              >
                <motion.button
                  className="text-black hover:text-[rgb(0,91,137)] px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  Продукция
                  <motion.div
                    animate={{ rotate: productDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {productDropdownOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {SITE_CONFIG.products.map((product, index) => (
                        <motion.a
                          key={product.name}
                          href={product.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(0,91,137)] transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          {product.name}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-black hover:text-[rgb(0,91,137)] px-3 py-2 rounded-md transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(0,91,137)]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setOrderModalOpen(true)}
                  className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap"
                >
                  Заказать оборудование
                </button>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-black hover:bg-gray-50 block px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Mobile products dropdown */}
              <div>
                <motion.button
                  className="text-black hover:bg-gray-50 w-full text-left px-3 py-2 rounded-md flex items-center justify-between"
                  onClick={() => setMobileProductOpen(!mobileProductOpen)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Продукция
                  <motion.div
                    animate={{ rotate: mobileProductOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {mobileProductOpen && (
                    <motion.div
                      className="ml-4 mt-1"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {SITE_CONFIG.products.map((product, index) => (
                        <motion.a
                          key={product.name}
                          href={product.href}
                          className="text-gray-600 hover:bg-gray-50 hover:text-[rgb(0,91,137)] block px-3 py-2 rounded-md text-sm"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProductOpen(false);
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {product.name}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Кнопки для мобильной версии - только при аутентификации */}
              {status === "authenticated" && (
                <motion.a
                  href="/admin"
                  className="text-black hover:bg-gray-50 hover:text-[rgb(0,91,137)] block px-3 py-2 rounded-md font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Панель администратора
                </motion.a>
              )}

              {status === "authenticated" && (
                <motion.button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-black hover:bg-gray-50 hover:text-[rgb(0,91,137)] block px-3 py-2 rounded-md font-medium transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Выйти
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </header>
  );
}
