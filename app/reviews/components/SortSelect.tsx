"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SortSelectProps {
  sortOption: "newest" | "rating";
  setSortOption: (option: "newest" | "rating") => void;
}

export default function SortSelect({
  sortOption,
  setSortOption,
}: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "newest", label: "Сначала новые" },
    { value: "rating", label: "По рейтингу" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (value: "newest" | "rating") => {
    setSortOption(value);
    setIsOpen(false);
  };

  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-white border-2 border-[rgb(0,91,137)] text-[rgb(0,91,137)] px-4 py-2 rounded-lg flex items-center justify-between min-w-[200px] hover:bg-gray-50 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{options.find((opt) => opt.value === sortOption)?.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 ml-2" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {options
              .filter((option) => option.value !== sortOption)
              .map((option) => (
                <li key={option.value}>
                  <button
                    onClick={() =>
                      selectOption(option.value as "newest" | "rating")
                    }
                    className="w-full text-left px-4 py-2 hover:bg-[rgb(0,91,137)] hover:text-white transition-colors"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
