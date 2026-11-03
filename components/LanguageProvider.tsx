"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "SW" | "ES" | "FR" | "DE";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  EN: {
    find_trainers: "Find Trainers",
    courses: "Courses",
    academy: "Academy",
    business: "For Business",
    become_trainer: "Become a Trainer",
    log_in: "Log in",
    get_started: "Get started",
    hero_title: "Upskill Your Team with Elite AI Training",
    hero_sub: "Get custom 1-on-1 coaching, courses, and certifications from verified industry experts.",
    book_trainer: "Book a Trainer",
    browse_courses: "Browse Courses",
  },
  SW: {
    find_trainers: "Tafuta Wakufunzi",
    courses: "Kozi",
    academy: "Chuo cha AI",
    business: "Kwa Biashara",
    become_trainer: "Kuwa Mkufunzi",
    log_in: "Ingia",
    get_started: "Anza sasa",
    hero_title: "Kuza Ujuzi wa Timu Yako kwa Mafunzo ya AI",
    hero_sub: "Pata mafunzo ya kibinafsi, kozi, na vyeti kutoka kwa wataalamu waliothibitishwa.",
    book_trainer: "Weka nafasi",
    browse_courses: "Vinjari Kozi",
  },
  ES: {
    find_trainers: "Buscar Entrenadores",
    courses: "Cursos",
    academy: "Academia",
    business: "Para Empresas",
    become_trainer: "Conviértete en Entrenador",
    log_in: "Iniciar sesión",
    get_started: "Empezar",
    hero_title: "Capacite a su Equipo con Entrenamiento de IA de Elite",
    hero_sub: "Obtenga entrenamiento personalizado, cursos y certificaciones de expertos de la industria.",
    book_trainer: "Reservar un Entrenador",
    browse_courses: "Explorar Cursos",
  },
  FR: {
    find_trainers: "Trouver des Formateurs",
    courses: "Cours",
    academy: "Académie",
    business: "Pour les Entreprises",
    become_trainer: "Devenir Formateur",
    log_in: "Se connecter",
    get_started: "Commencer",
    hero_title: "Améliorez les compétences de votre équipe grâce à l'IA",
    hero_sub: "Bénéficiez d'un coaching individuel personnalisé, de cours et de certifications d'experts.",
    book_trainer: "Réserver un Formateur",
    browse_courses: "Parcourir les Cours",
  },
  DE: {
    find_trainers: "Trainer Finden",
    courses: "Kurse",
    academy: "Akademie",
    business: "Für Unternehmen",
    become_trainer: "Trainer Werden",
    log_in: "Einloggen",
    get_started: "Loslegen",
    hero_title: "Qualifizieren Sie Ihr Team mit Elite-KI-Schulung",
    hero_sub: "Erhalten Sie akademisches Coaching, Kurse und Zertifikate von Branchenexperten.",
    book_trainer: "Trainer Buchen",
    browse_courses: "Kurse Durchsuchen",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language;
    if (stored && ["EN", "SW", "ES", "FR", "DE"].includes(stored)) {
      setTimeout(() => setLanguageState(stored), 0);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["EN"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
