"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, AlertTriangle, EyeOff } from "lucide-react";
import { submitRadarQuizLead } from "@/actions/leads";
import { useRouter } from "@/i18n/routing";

interface RadarQuizModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export default function RadarQuizModal({ isOpen, onClose }: RadarQuizModalProps) {
 const t = useTranslations("RadarQuiz");
 const router = useRouter();
 const [step, setStep] = useState(0); // 0-intro, 1..N-questions, 99-email, 100-result
 const [score, setScore] = useState(0);
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");

 if (!isOpen) return null;

 // Questions configuration (could be moved to a config file)
 const questions = [
 { id: "gmaps", key: "q1_gmaps", points: 20 },
 { id: "menu", key: "q2_menu", points: 20 },
 { id: "reviews", key: "q3_reviews", points: 20 },
 { id: "rating", key: "q4_rating", points: 20 },
 { id: "speed", key: "q5_speed", points: 20 },
 ];

 const handleAnswer = (yes: boolean) => {
 if (yes) setScore((prev) => prev + questions[step - 1].points);

 if (step < questions.length) {
 setStep((prev) => prev + 1);
 } else {
 setStep(99); // Go to email gate
 }
 };

 const handleEmailSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 await submitRadarQuizLead({
 name,
 email,
 score
 });

 setStep(100); // Go to result
 };

 const getResultTier = () => {
 if (score >= 80) return "visible";
 if (score >= 40) return "partial";
 return "invisible";
 };

 const resultTier = getResultTier();

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="absolute inset-0 bg-cream/90 backdrop-blur-sm"
 onClick={onClose}
 />

 {/* Modal Content */}
 <motion.div
 initial={{ opacity: 0, scale: 0.9, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9, y: 20 }}
 className="relative w-full max-w-lg bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
 >
 {/* Glow */}
 <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-${resultTier === 'visible' ? 'cyan' : resultTier === 'partial' ? 'yellow-500' : 'red-500'} to-transparent opacity-50`} />

 <button
 onClick={onClose}
 className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-20"
 >
 <X className="w-5 h-5" />
 </button>

 <div className="p-8 md:p-10 relative z-10 min-h-[400px] flex flex-col justify-center">
 <AnimatePresence mode="wait">

 {/* STEP 0: INTRO */}
 {step === 0 && (
 <motion.div
 key="intro"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="text-center space-y-6"
 >
 <div className="w-16 h-16 rounded-full bg-ink/10 flex items-center justify-center mx-auto border border-ember/20">
 <EyeOff className="w-8 h-8 text-ember" />
 </div>
 <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">
 {t("intro_title")}
 </h2>
 <p className="text-slate-400 font-light text-lg">
 {t("intro_desc")}
 </p>
 <button
 onClick={() => setStep(1)}
 className="w-full bg-ink text-ink font-bold py-4 rounded-xl hover:bg-ink/90 transition-all uppercase tracking-wide flex items-center justify-center gap-2"
 >
 {t("intro_btn")} <ArrowRight className="w-4 h-4" />
 </button>
 </motion.div>
 )}

 {/* STEPS 1..N: QUESTIONS */}
 {step > 0 && step <= questions.length && (
 <motion.div
 key={`q-${step}`}
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -50 }}
 className="space-y-8"
 >
 <div className="flex justify-between items-center text-xs font-mono text-ember/60 uppercase tracking-widest">
 <span>{t("question_prefix")} {step}/{questions.length}</span>
 <span>{questions[step - 1].points} pts</span>
 </div>

 <h3 className="text-2xl font-bold text-white leading-tight min-h-[3em] flex items-center">
 {t(questions[step - 1].key)}
 </h3>

 <div className="grid grid-cols-2 gap-4">
 <button
 onClick={() => handleAnswer(false)}
 className="py-4 rounded-xl border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 text-white/60 transition-all font-bold uppercase"
 >
 {t("btn_no")}
 </button>
 <button
 onClick={() => handleAnswer(true)}
 className="py-4 rounded-xl border border-white/10 hover:bg-ink/10 hover:border-ember/50 hover:text-ember text-white transition-all font-bold uppercase"
 >
 {t("btn_yes")}
 </button>
 </div>
 </motion.div>
 )}

 {/* STEP 99: EMAIL GATE */}
 {step === 99 && (
 <motion.div
 key="gate"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-center space-y-6"
 >
 <h3 className="text-xl font-bold text-white mb-2 font-display uppercase">
 {t("gate_title")}
 </h3>
 <p className="text-slate-400 text-sm">
 {t("gate_desc")}
 </p>
 <form onSubmit={handleEmailSubmit} className="space-y-4">
 <input
 type="text"
 required
 placeholder={t("gate_placeholder_name")}
 className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors text-center"
 value={name}
 onChange={(e) => setName(e.target.value)}
 />
 <input
 type="email"
 required
 placeholder={t("gate_placeholder_email")}
 className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors text-center"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 <button
 type="submit"
 className="w-full bg-white text-ink font-bold py-4 rounded-xl hover:bg-slate-200 transition-all uppercase tracking-wide"
 >
 {t("gate_btn")}
 </button>
 </form>
 </motion.div>
 )}

 {/* STEP 100: RESULT */}
 {step === 100 && (
 <motion.div
 key="result"
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center space-y-6"
 >
 <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border-4 ${resultTier === 'visible' ? 'bg-ink/10 border-ember text-ember' :
 resultTier === 'partial' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' :
 'bg-red-500/10 border-red-500 text-red-500'
 }`}>
 {resultTier === 'visible' ? <Check className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
 </div>

 <div>
 <p className="text-sm font-mono uppercase tracking-widest text-white/50 mb-2">{t("result_label")}</p>
 <h2 className={`text-4xl font-black font-display uppercase ${resultTier === 'visible' ? 'text-ember' :
 resultTier === 'partial' ? 'text-yellow-500' :
 'text-red-500'
 }`}>
 {t(`tier_${resultTier}`)}
 </h2>
 </div>

 <p className="text-slate-300 leading-relaxed">
 {t(`desc_${resultTier}`)}
 </p>

 <button
 onClick={() => { onClose(); router.push('/diagnostico'); }}
 className={`w-full font-bold py-4 rounded-xl text-ink uppercase tracking-wide transition-all ${resultTier === 'visible' ? 'bg-ink hover:bg-ink/90' :
 resultTier === 'partial' ? 'bg-yellow-500 hover:bg-yellow-400' :
 'bg-red-500 hover:bg-red-400'
 }`}
 >
 {t("result_cta")}
 </button>
 </motion.div>
 )}

 </AnimatePresence>
 </div>
 </motion.div>
 </div>
 );
}
