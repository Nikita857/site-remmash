"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { ArrowRight, Shield, Users, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@/config";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section
      id="about"
      className="relative bg-linear-to-br from-black via-gray-900 to-[rgb(0,91,137)] text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgb(0,91,137)] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-[rgb(0,91,137)]/10 to-blue-500/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="#Пока без фоты#"
          alt="Промышленное оборудование"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[rgb(0,91,137)]/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[rgb(0,91,137)]/50">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">
                C {SITE_CONFIG.company.foundedYear} года на рынке
              </span>
            </div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Производство{" "}
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                теплообменного
              </span>{" "}
              оборудования
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Высококачественное оборудование для нефтегазовой промышленности.
              Надежные решения для крупнейших предприятий отрасли.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white w-full sm:w-auto px-8 py-6 text-lg"
                >
                  Связаться с нами
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => router.push("/products")}
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-black backdrop-blur-sm w-full sm:w-auto px-8 py-6 text-lg"
                >
                  Наша продукция
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[rgb(0,91,137)]/30 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {SITE_CONFIG.projects}+
                </div>
                <div className="text-xs text-gray-300 mt-1">Проектов</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[rgb(0,91,137)]/30 rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {SITE_CONFIG.company.experience}+
                </div>
                <div className="text-xs text-gray-300 mt-1">Лет опыта</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[rgb(0,91,137)]/30 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold">98%</div>
                <div className="text-xs text-gray-300 mt-1">
                  Удовлетворенности
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="assets/b54253f5b9299a630abf1e0b46c302d9.jpg"
                alt="Наши производственные мощности"
                className="w-full h-96 md:h-[500px] object-cover"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 rounded-2xl shadow-xl flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-center p-4">
                  <div className="text-2xl font-bold">ISO</div>
                  <div className="text-xs">9001</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-xl flex items-center justify-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="text-center p-4">
                  <div className="text-2xl font-bold">2005</div>
                  <div className="text-xs ms-3">Год основания</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
