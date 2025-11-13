// "use client";

// import { motion, AnimatePresence } from "motion/react";
// import { X } from "lucide-react";
// import { useOrderForm } from "@/hooks/useOrderForm";


// interface OrderModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
//   const {
//     formData,
//     errors,
//     loading,
//     success,
//     error,
//     handleChange,
//     validateForm,
//     submitOrder,
//     resetForm
//   } = useOrderForm();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       const result = await submitOrder();
      
//       if (result.success) {
//         // Успешная отправка - через 3 секунды сбросим форму и закроем модальное окно
//         setTimeout(() => {
//           resetForm();
//           onClose();
//         }, 3000);
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {success ? "Заявка отправлена!" : "Заказать оборудование"}
//                 </h3>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-500 hover:text-gray-700"
//                   disabled={loading || success}
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {success ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="py-8 text-center"
//                 >
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                       <div className="w-4 h-4 bg-white rounded-full"></div>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-2">Спасибо за вашу заявку!</p>
//                   <p className="text-gray-600 text-sm">
//                     Наш специалист свяжется с вами в ближайшее время
//                   </p>
//                 </motion.div>
//               ) : (
//                 <>
//                   {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//                       {error}
//                     </div>
//                   )}
//                   <form onSubmit={handleSubmit}>
//                     <div className="space-y-4">
//                       <div>
//                         <label
//                           htmlFor="fullName"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           ФИО
//                         </label>
//                         <input
//                           type="text"
//                           id="fullName"
//                           name="fullName"
//                           value={formData.fullName}
//                           onChange={(e) => handleChange('fullName', e.target.value)}
//                           className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[rgb(0,91,137)] focus:border-transparent ${
//                             errors.fullName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Иванов Иван Иванович"
//                         />
//                         {errors.fullName && (
//                           <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Телефон
//                         </label>
//                         <input
//                           type="tel"
//                           id="phone"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={(e) => handleChange('phone', e.target.value)}
//                           className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[rgb(0,91,137)] focus:border-transparent ${
//                             errors.phone ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="+7 (___) ___-__-__"
//                         />
//                         {errors.phone && (
//                           <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="mt-8 flex flex-col sm:flex-row gap-3">
//                       <button
//                         type="button"
//                         onClick={onClose}
//                         className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                         disabled={loading}
//                       >
//                         Отмена
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="flex-1 py-3 px-4 bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                       >
//                         {loading ? (
//                           <>
//                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Отправка...
//                           </>
//                         ) : (
//                           "Отправить заявку"
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
