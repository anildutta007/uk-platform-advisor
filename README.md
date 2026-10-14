# UK Investment Platform Advisor 🧭
### Intelligent ISA, SIPP & Trading Account Fee Engine & Decision Advisor

An impartial, interactive UK financial web application designed to advise individual and corporate investors on selecting the most cost-effective and suitable investment platform for **Stocks & Shares ISA**, **SIPP (Self-Invested Personal Pension)**, and **General Investment Accounts (GIA)**.

---

## 🏛️ Platforms Compared

The engine performs deep, granular calculations across the 6 most prominent UK retail platforms:

1. **AJ Bell** — 0.25% custody fee capped at £42/year for ISA/GIA and £120/year for SIPP on exchange-traded assets (shares/ETFs/trusts). Full employer SIPP contribution support, £5.00 share dealing, and £1.50 fund dealing.
2. **Interactive Investor (ii)** — UK flat subscription leader (£4.99 - £11.99/mo + £10 SIPP add-on). Unbeatable for mid-to-large portfolios (£50k+). Includes 1 free trade credit/month, free regular monthly investing, and 9-currency multi-currency holding (USD, EUR, GBP).
3. **Hargreaves Lansdown (HL)** — UK's largest investment service with gold-standard customer phone support and premier research. £0 platform fee for shares in GIA, £45 cap in ISA, £200 cap in SIPP. Free dealing on mutual funds, but uncapped 0.45% custody on funds.
4. **Trading 212** — Zero custody fees (£0 platform fee) and zero dealing commission across UK, US, and European shares & ETFs. Market-lowest 0.15% FX fee and ~5% APY paid daily on uninvested cash. *(Note: Does not offer traditional unit trusts/OEICs; SIPP is personal contributions only).*
5. **Fidelity International** — Competitive tiered fund custody (0.35% under £250k, 0.20% £250k-£1m, 0% above £1m). Capped at £90/year for pure exchange-traded holdings. Free fund dealing, full SIPP employer contributions and drawdown support.
6. **Vanguard UK Investor** — The benchmark for passive index fund investors. Dirt-cheap 0.15% platform fee across all accounts combined, capped at £375/year. Zero dealing fees on Vanguard index funds and ETFs. *(Note: Strictly Vanguard-only universe; no individual UK/US shares; does not accept employer/company SIPP contributions).*

---

## 🔍 The 8 Comparison Criteria & Questions

The advisor dynamically adjusts recommendations based on 8 core user questions:

1. **Lump Sum Investment Amount**: Split across ISA, SIPP, and GIA.
2. **Monthly Regular Investments**: Evaluates platform direct debit and regular savings fee waivers.
3. **Investment Instruments**: UK Equities, UCITS ETFs, Mutual Funds / OEICs, Investment Trusts, US Stocks, European Stocks. (Applies asset-specific fee caps like AJ Bell's £42 cap or HL's £45 cap vs uncapped fund tiers).
4. **Frequency of Trading**: Accounts for share dealing charges (£0 to £11.95/trade) and trading activity credits.
5. **Overseas / US Trading Volume & FX Drag**: Multiplies international trades by trade size and applies provider FX spreads (0.15% to 1.00%).
6. **Pension SIPP Contributions (Personal vs Employer/Company)**: Flags critical disqualifications if a limited company or director contribution is needed (disqualifying Vanguard and Trading 212).
7. **Pension Withdrawal Method**: Accumulation vs Flexible Drawdown vs UFPLS vs Annuity.
8. **Investment Horizon & Compounding Growth**: Projects cumulative fee drag and lost compound returns (at 6% p.a.) over 1 to 25 years.

---

## 🚀 How to Run the Application

### Option 1: Double-Click Batch File (Recommended)
From `c:\Anil Google Projects`:
- Double-click **`run_platform_advisor.bat`**

Or from within `c:\Anil Google Projects\uk-platform-advisor`:
- Double-click **`run_advisor.bat`**

### Option 2: Run with Node.js
```bash
cd "c:\Anil Google Projects\uk-platform-advisor"
node server.js
```
The server will start on **`http://127.0.0.1:8070`** and automatically open your default browser.

### Option 3: Direct Browser Launch
Open `c:\Anil Google Projects\uk-platform-advisor\index.html` directly in Google Chrome, Microsoft Edge, or Firefox.

---

## 📊 Key Architectural Features

- **Reactive Live Simulator**: Recalculates all fees in real-time as sliders and checkboxes change.
- **Fast Preset Profiles**: One-click configuration for Balanced, Company Director SIPP, Active Global Trader, Passive Index Saver, and High Net Worth investors.
- **Chart.js Visualizations**:
  - *Compounding Drag Timeline*: Compares fee erosion and lost compound growth over time.
  - *Fee Crossover Curve*: Displays the exact tipping point (£5k to £500k) where flat-fee platforms beat percentage-based brokers.
- **Full Transparency Table**: Breakdown of platform custody, dealing, regular investing, and FX fees.
- **Export / Print**: High-contrast, clean summary report ready to save as PDF.

---
*Created as part of the Anil Dutta UK FinTech & Wealth Intelligence Suite.*
