"use client";

import { DollarSign, Landmark, Smartphone, Wallet, TrendingUp, CalendarDays, CheckCircle, Info } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import Link from "next/link";

const MOCK_EARNINGS = {
  totalRevenueKsh: 34000,
  netEarningsKsh: 27200,
  platformFeeKsh: 6800,
  pendingEscrowKsh: 8000,
  disbursedKsh: 19200
};

const MOCK_LEDGER = [
  { id: "tx1", learner: "Amina Diop", item: "RAG Chunking Strategy Setup (1h call)", netKsh: 2400, date: "Jun 5, 2026", status: "escrow" },
  { id: "tx2", learner: "Moussa Traore", item: "LLaMA 3 Quantization parameters (1.5h call)", netKsh: 3600, date: "Jun 4, 2026", status: "escrow" },
  { id: "tx3", learner: "Naledi Dlamini", item: "Dataset Curation Techniques (1.5h call)", netKsh: 3600, date: "Jun 1, 2026", status: "approved" },
  { id: "tx4", learner: "Amina Diop", item: "Fine-tuning LLaMA 3 with LoRA (Course Sale)", netKsh: 12480, date: "May 29, 2026", status: "approved" },
  { id: "tx5", learner: "James Kariuki", item: "LLaMA 3 Fine-tuning Part 1 (2h call)", netKsh: 4000, date: "May 25, 2026", status: "disbursed" }
];

const MOCK_PAYOUTS = [
  { id: "pay1", date: "Jun 1, 2026", amountKsh: 16480, channel: "M-Pesa (0700***000)", status: "processed" },
  { id: "pay2", date: "May 25, 2026", amountKsh: 4000, channel: "Bank (Equity 120***)", status: "processed" }
];

export default function TrainerEarningsPage() {
  const { formatPrice } = useCurrency();

  // Helper conversions assuming base rate for USD, EUR, GBP
  const formatVal = (ksh: number) => {
    const usd = Math.round(ksh / 130);
    return formatPrice(ksh, usd);
  };

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Earnings & Escrow Ledger
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
          Monitor your earnings splits, check pending escrow balances, configure payout channels, and view your disbursement histories.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16, marginBottom: 32
      }}>
        {[
          { label: "Gross Revenues", value: formatVal(MOCK_EARNINGS.totalRevenueKsh), sub: "Total generated", Icon: DollarSign, color: "var(--accent)" },
          { label: "Net Earnings (80%)", value: formatVal(MOCK_EARNINGS.netEarningsKsh), sub: "Your net share", Icon: TrendingUp, color: "var(--green)" },
          { label: "Held in Escrow", value: formatVal(MOCK_EARNINGS.pendingEscrowKsh), sub: "Pending approval", Icon: CalendarDays, color: "var(--amber)" },
          { label: "Total Disbursed", value: formatVal(MOCK_EARNINGS.disbursedKsh), sub: "Paid to account", Icon: CheckCircle, color: "var(--navy)" }
        ].map((stat, i) => (
          <div key={i} style={{
            background: "white", borderRadius: 14, padding: "20px 22px",
            border: "1px solid var(--line)", boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
              <stat.Icon size={16} color={stat.color} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 4 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }} className="earnings-grid">
        
        {/* Ledger Table */}
        <div style={{
          background: "white", borderRadius: 16, border: "1px solid var(--line)",
          padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 18 }}>Recent Transactions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_LEDGER.map(item => {
              const labelColor = 
                item.status === "escrow" ? "var(--amber)" :
                item.status === "approved" ? "var(--green)" :
                "var(--slate)";
              const labelBg = 
                item.status === "escrow" ? "#FFFBEB" :
                item.status === "approved" ? "var(--green-light)" :
                "var(--surface)";
              return (
                <div key={item.id} style={{
                  padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 10,
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14
                }}>
                  <div>
                    <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "var(--navy)", marginBottom: 3 }}>{item.item}</h3>
                    <div style={{ fontSize: 11.5, color: "var(--slate)" }}>
                      Student: {item.learner} · Date: {item.date}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                      +{formatVal(item.netKsh)}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, textTransform: "uppercase",
                      padding: "2px 8px", borderRadius: 12, background: labelBg, color: labelColor
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payout Channels & Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Active Configuration */}
          <div style={{
            background: "white", borderRadius: 16, border: "1px solid var(--line)",
            padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 14 }}>Payout Channel</h2>
            <div style={{ display: "flex", gap: 12, alignItems: "start", background: "var(--surface)", padding: 14, borderRadius: 10, border: "1px solid var(--line)" }}>
              <Smartphone size={18} color="var(--green)" style={{ marginTop: 2 }} />
              <div>
                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "var(--navy)", marginBottom: 2 }}>M-Pesa Wallet</h3>
                <span style={{ fontSize: 12, color: "var(--slate)" }}>Active: +254 (0) 700***000</span>
              </div>
            </div>
            <Link href="/trainer/settings" style={{
              display: "block", textAlign: "center", marginTop: 16, padding: "10px", fontSize: 12.5, fontWeight: 600,
              color: "var(--accent)", border: "1px solid var(--line)", background: "white", borderRadius: 8, textDecoration: "none"
            }}>
              Modify Payout Destination
            </Link>
          </div>

          {/* Past Payouts */}
          <div style={{
            background: "white", borderRadius: 16, border: "1px solid var(--line)",
            padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 14 }}>Disbursement History</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MOCK_PAYOUTS.map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, color: "var(--slate)" }}>
                  <div>
                    <span style={{ display: "block", color: "var(--navy)", fontWeight: 500 }}>{p.date}</span>
                    <span style={{ display: "block", fontSize: 11, color: "var(--muted)" }}>via {p.channel}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--navy)" }}>{formatVal(p.amountKsh)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width: 768px) {
          .earnings-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
