"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, ChevronRight, Calculator, Clock, Users, DollarSign } from "lucide-react";
import { submitControlQualifyLead } from "@/actions/leads";

interface ControlQualifyModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export default function ControlQualifyModal({ isOpen, onClose }: ControlQualifyModalProps) {
 const t = useTranslations("ControlQualify");
 const [step, setStep] = useState(0); // 0-intro, 1..4-form, 100-success

 // Form State
 const [formData, setFormData] = useState({
 role: "",
 revenue: "",
 painPoint: "",
 name: "",
 email: "",
 phone: "",
 businessName: ""
 });

 const [loading, setLoading] = useState(false);
 const [errorMsg, setErrorMsg] = useState<string | null>(null);

 if (!isOpen) return null;

 const totalSteps = 4;

 const handleSubmit = async () => {
 setLoading(true);
 setErrorMsg(null);
 const result = await submitControlQualifyLead(formData);
 setLoading(false);

 if (result.success) {
 setStep(100);
 } else {
 setErrorMsg(result.error || t("error_generic"));
 }
 };

 const handleNext = () => {
 if (step < totalSteps) {
 setStep(prev => prev + 1);
 } else {
 handleSubmit();
 }
 };

 const updateField = (field: string, value: string) => {
 setFormData(prev => ({ ...prev, [field]: value }));
 };

 const isStepValid = () => {
 if (step === 1) return formData.role !== "";
 if (step === 2) return formData.revenue !== "";
 if (step === 3) return formData.painPoint !== "";
 if (step === 4) return formData.name !== "" && formData.email !== "" && formData.businessName !== "";
 return true;
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="absolute inset-0 bg-cream/95 backdrop-blur-md"
 onClick={onClose}
 />

 {/* Modal Content */}
 <motion.div
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 20 }}
 className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
 >
 {/* Progress Bar */}
 {step > 0 && step < 100 && (
 <div className="h-1 bg-white/5 w-full">
 <motion.div
 className="h-full bg-ember shadow-[0_0_10px_rgba(212,255,0,0.5)]"
 initial={{ width: 0 }}
 animate={{ width: `${(step / totalSteps) * 100}%` }}
 />
 </div>
 )}

 <button
 onClick={onClose}
 className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
 >
 <X className="w-6 h-6" />
 </button>

 <div className="p-8 md:p-12 flex-1 overflow-y-auto">
 <AnimatePresence mode="wait">

 {/* STEP 0: INTRO */}
 {step === 0 && (
 <motion.div
 key="intro"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono tracking-widest uppercase">
 <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
 {t("badge")}
 </div>

 <h2 className="text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-[0.9]">
 {t("intro_title")}
 </h2>

 <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
 {t("intro_desc")}
 </p>

 <div className="grid md:grid-cols-3 gap-4 pt-4">
 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
 <Clock className="w-6 h-6 text-ember mb-3" />
 <div className="text-sm font-bold text-white mb-1">{t("benefit_1_title")}</div>
 <div className="text-xs text-slate-400">{t("benefit_1_desc")}</div>
 </div>
 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
 <DollarSign className="w-6 h-6 text-ember mb-3" />
 <div className="text-sm font-bold text-white mb-1">{t("benefit_2_title")}</div>
 <div className="text-xs text-slate-400">{t("benefit_2_desc")}</div>
 </div>
 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
 <Users className="w-6 h-6 text-ember mb-3" />
 <div className="text-sm font-bold text-white mb-1">{t("benefit_3_title")}</div>
 <div className="text-xs text-slate-400">{t("benefit_3_desc")}</div>
 </div>
 </div>

 <button
 onClick={() => setStep(1)}
 className="w-full bg-ember text-ink font-bold py-5 rounded-xl hover:bg-[#b8dd00] transition-colors uppercase tracking-widest flex items-center justify-center gap-3 text-lg"
 >
 {t("intro_btn")} <ArrowRight className="w-5 h-5" />
 </button>
 </motion.div>
 )}

 {/* STEP 1: ROLE */}
 {step === 1 && (
 <motion.div
 key="step1"
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -50 }}
 className="space-y-8"
 >
 <h3 className="text-2xl font-bold text-white font-display">{t("q1_title")}</h3>
 <div className="space-y-3">
 {["owner", "manager", "investor", "chef"].map((role) => (
 <button
 key={role}
 onClick={() => updateField("role", role)}
 className={`w-full p-4 rounded-xl border flex items-center justify-between group transition-all ${formData.role === role
 ? "bg-ember/10 border-ember text-white"
 : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
 }`}
 >
 <span className="font-bold uppercase tracking-wide">{t(`role_${role}`)}</span>
 {formData.role === role && <Check className="w-5 h-5 text-ember" />}
 </button>
 ))}
 </div>
 </motion.div>
 )}

 {/* STEP 2: REVENUE */}
 {step === 2 && (
 <motion.div
 key="step2"
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -50 }}
 className="space-y-8"
 >
 <h3 className="text-2xl font-bold text-white font-display">{t("q2_title")}</h3>
 <div className="space-y-3">
 {["<15k", "15k-40k", "40k-80k", "80k+"].map((rev) => (
 <button
 key={rev}
 onClick={() => updateField("revenue", rev)}
 className={`w-full p-4 rounded-xl border flex items-center justify-between group transition-all ${formData.revenue === rev
 ? "bg-ember/10 border-ember text-white"
 : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
 }`}
 >
 <span className="font-bold font-mono">{rev} / {t("month")}</span>
 {formData.revenue === rev && <Check className="w-5 h-5 text-ember" />}
 </button>
 ))}
 </div>
 </motion.div>
 )}

 {/* STEP 3: PAIN POINT */}
 {step === 3 && (
 <motion.div
 key="step3"
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -50 }}
 className="space-y-8"
 >
 <h3 className="text-2xl font-bold text-white font-display">{t("q3_title")}</h3>
 <div className="space-y-3">
 {["chaos", "profit", "time", "scaling"].map((pain) => (
 <button
 key={pain}
 onClick={() => updateField("painPoint", pain)}
 className={`w-full p-4 rounded-xl border flex items-center justify-between group transition-all ${formData.painPoint === pain
 ? "bg-ember/10 border-ember text-white"
 : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
 }`}
 >
 <span className="font-bold">{t(`pain_${pain}`)}</span>
 {formData.painPoint === pain && <Check className="w-5 h-5 text-ember" />}
 </button>
 ))}
 </div>
 </motion.div>
 )}

 {/* STEP 4: CONTACT */}
 {step === 4 && (
 <motion.div
 key="step4"
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -50 }}
 className="space-y-6"
 >
 <h3 className="text-2xl font-bold text-white font-display">{t("q4_title")}</h3>
 <p className="text-slate-400 text-sm">{t("q4_desc")}</p>

 <div className="space-y-4">
 <input
 type="text"
 placeholder={t("label_name")}
 value={formData.name}
 onChange={(e) => updateField("name", e.target.value)}
 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 />
 <input
 type="text"
 placeholder="Business Name (Restaurante/Hotel/Negocio)"
 value={formData.businessName}
 onChange={(e) => updateField("businessName", e.target.value)}
 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 />
 <input
 type="email"
 placeholder={t("label_email")}
 value={formData.email}
 onChange={(e) => updateField("email", e.target.value)}
 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 />
 <input
 type="tel"
 placeholder={t("label_phone")}
 value={formData.phone}
 onChange={(e) => updateField("phone", e.target.value)}
 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 />
 </div>
 </motion.div>
 )}

 {/* SUCCESS */}
 {step === 100 && (
 <motion.div
 key="success"
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center space-y-6 py-10"
 >
 <div className="w-24 h-24 rounded-full bg-ember/10 flex items-center justify-center mx-auto border-4 border-ember animate-pulse">
 <Check className="w-12 h-12 text-ember" />
 </div>
 <h2 className="text-4xl font-black text-white font-display uppercase tracking-tight">{t("success_title")}</h2>
 <p className="text-slate-400 text-lg">{t("success_desc")}</p>
 <button onClick={onClose} className="text-ember font-bold hover:underline mt-4">{t("close")}</button>
 </motion.div>
 )}

 </AnimatePresence>
 </div>

 {/* Footer / Navigation */}
 {step > 0 && step < 100 && (
 <div className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-md flex flex-col gap-3">
 {errorMsg && (
 <div role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
 {errorMsg}
 </div>
 )}
 <div className="flex justify-between items-center">
 <button
 onClick={() => setStep(prev => prev - 1)}
 className="text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
 >
 {t("back")}
 </button>
 <button
 onClick={handleNext}
 disabled={!isStepValid() || loading}
 className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all ${isStepValid() && !loading
 ? "bg-ember text-ink hover:bg-[#b8dd00]"
 : "bg-white/10 text-white/20 cursor-not-allowed"
 }`}
 >
 {loading ? "SENDING..." : (step === totalSteps ? t("finish") : t("next"))}
 </button>
 </div>
 </div>
 )}
 </motion.div>
 </div>
 );
}
