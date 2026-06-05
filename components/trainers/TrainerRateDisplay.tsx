"use client";
import { useCurrency } from "@/components/CurrencyProvider";

type TrainerRateDisplayProps = {
  rateKsh: number;
  rateUsd: number;
};

export default function TrainerRateDisplay({ rateKsh, rateUsd }: TrainerRateDisplayProps) {
  const { formatPrice } = useCurrency();
  return <>{formatPrice(rateKsh, rateUsd)}</>;
}
