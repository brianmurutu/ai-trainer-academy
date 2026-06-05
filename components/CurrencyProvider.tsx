"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "KES" | "EUR" | "GBP";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceKsh: number, priceUsd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const stored = localStorage.getItem("currency") as Currency;
    if (stored && ["USD", "KES", "EUR", "GBP"].includes(stored)) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  };

  const formatPrice = (priceKsh: number, priceUsd: number) => {
    switch (currency) {
      case "KES":
        return `KES ${priceKsh.toLocaleString()}`;
      case "EUR":
        // Approx conversion: 1 USD = 0.92 EUR
        return `€${Math.round(priceUsd * 0.92).toLocaleString()}`;
      case "GBP":
        // Approx conversion: 1 USD = 0.78 GBP
        return `£${Math.round(priceUsd * 0.78).toLocaleString()}`;
      case "USD":
      default:
        return `$${priceUsd.toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
