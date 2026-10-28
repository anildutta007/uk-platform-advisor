/**
 * UK Investment Platforms Fee & Rule Database
 * Platforms compared:
 * 1. AJ Bell
 * 2. Interactive Investor (ii)
 * 3. Hargreaves Lansdown (HL)
 * 4. Trading 212
 * 5. Fidelity International
 * 6. Vanguard UK Investor
 * 7. IG (IG.com)
 */

const PLATFORMS_DATA = [
  {
    id: "aj-bell",
    name: "AJ Bell",
    shortName: "AJ Bell",
    tagline: "Low capped fees for shares & ETFs with a full-service UK pension suite",
    logoColor: "#dc2626", // Red
    badge: "Best for shares & ETF capped custody",
    rating: 4.6,
    trustScore: "4.8/5 (Trustpilot 10k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true,
      gia: true
    },
    universe: {
      ukShares: true,
      etfs: true,
      funds: true, // Unit trusts & OEICs
      investmentTrusts: true,
      usStocks: true,
      europeanStocks: true
    },
    investmentPermissions: {
      ukShares: { permitted: true, label: "UK Shares", detail: "Full London Stock Exchange (FTSE 100, 250, Small Cap, AIM)" },
      etfs: { permitted: true, label: "ETFs", detail: "Broad range of UK and international UCITS ETFs" },
      funds: { permitted: true, label: "Mutual Funds / OEICs", detail: "Over 2,000+ unit trusts & mutual funds" },
      investmentTrusts: { permitted: true, label: "Investment Trusts", detail: "UK closed-end funds and REITs" },
      usStocks: { permitted: true, label: "US Stocks", detail: "Direct trading on NYSE & NASDAQ" },
      europeanStocks: { permitted: true, label: "European Stocks", detail: "Direct trading on Euronext, Frankfurt, etc." }
    },
    notPermittedList: [],
    notPermittedDetails: "All 6 major investment categories are fully permitted on AJ Bell.",
    custodyFeeModel: {
      type: "percentage_with_caps",
      sharesRate: 0.0025, // 0.25%
      sharesCapIsaYear: 42.00, // £3.50/month = £42/year
      sharesCapGiaYear: 42.00, // £3.50/month = £42/year
      sharesCapSippYear: 120.00, // £10/month = £120/year
      fundsTiers: [
        { upTo: 250000, rate: 0.0025 }, // 0.25%
        { upTo: 500000, rate: 0.0010 }, // 0.10%
        { upTo: Infinity, rate: 0.0000 } // 0% above £500k
      ]
    },
    dealingFees: {
      ukShares: 5.00, // £5.00 online (drops to £3.50 if >= 10 trades previous month)
      ukSharesFrequent: 3.50,
      funds: 1.50,
      usStocks: 5.00,
      europeanStocks: 5.00,
      regularInvesting: 1.50, // £1.50 per regular monthly investment
      dividendReinvestment: 0.01, // 1% (min £1.50, max £5.00)
      divReinvestMin: 1.50,
      divReinvestMax: 5.00
    },
    fxFees: [
      { upTo: 10000, rate: 0.0075 }, // 0.75%
      { upTo: 20000, rate: 0.0050 }, // 0.50%
      { upTo: 30000, rate: 0.0025 }, // 0.25%
      { upTo: Infinity, rate: 0.0025 }
    ],
    sippRules: {
      supported: true,
      employerContributions: true, // Yes! Limited company & employer payments accepted
      drawdownFee: 0, // £0 flexible drawdown fee
      ufplsFee: 0,
      notes: "Full SIPP support including employer/director contributions, flexible income drawdown, and UFPLS."
    },
    features: {
      interestOnCash: "Up to 3.45% on uninvested cash (tiered)",
      fractionalShares: false,
      multiCurrencyAccounts: false,
      mobileAppRating: "4.7 ★ (iOS) / 4.4 ★ (Android)",
      customerService: "Excellent UK-based phone & messaging support",
      researchTools: "Shares Magazine access, stock reports, Morningstar data"
    },
    pros: [
      "Low custody fee for shares/ETFs: capped at £42/yr (ISA/GIA) and £120/yr (SIPP)",
      "Full employer and company contributions accepted for SIPP",
      "Low fund dealing charge (£1.50)",
      "Tiered fund platform fee (drops to 0.10% over £250k, 0% over £500k)",
      "Free flexible pension drawdown & UFPLS"
    ],
    cons: [
      "Fund platform fee is uncapped up to £250,000",
      "Dealing charges (£5/trade) can mount up for active daily traders",
      "Foreign exchange fee of 0.75% on overseas share trades"
    ],
    officialUrl: "https://www.ajbell.co.uk"
  },
  {
    id: "interactive-investor",
    name: "Interactive Investor",
    shortName: "Interactive Investor (ii)",
    tagline: "Flat subscription pricing that beats percentage fees for mid-to-large portfolios",
    logoColor: "#0284c7", // Sky blue
    badge: "Flat-fee pricing for larger portfolios",
    rating: 4.7,
    trustScore: "4.7/5 (Trustpilot 25k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true,
      gia: true
    },
    universe: {
      ukShares: true,
      etfs: true,
      funds: true,
      investmentTrusts: true,
      usStocks: true,
      europeanStocks: true
    },
    investmentPermissions: {
      ukShares: { permitted: true, label: "UK Shares", detail: "Full London Stock Exchange (main market, AIM)" },
      etfs: { permitted: true, label: "ETFs", detail: "Extensive selection of UCITS ETFs" },
      funds: { permitted: true, label: "Mutual Funds / OEICs", detail: "Over 4,000+ unit trusts & OEICs" },
      investmentTrusts: { permitted: true, label: "Investment Trusts", detail: "Complete range of UK investment trusts" },
      usStocks: { permitted: true, label: "US Stocks", detail: "Direct trading with multi-currency holding (USD)" },
      europeanStocks: { permitted: true, label: "European Stocks", detail: "European exchanges with multi-currency (EUR)" }
    },
    notPermittedList: [],
    notPermittedDetails: "All 6 major investment categories are fully permitted on Interactive Investor.",
    custodyFeeModel: {
      type: "flat_subscription",
      plans: {
        essentials: {
          maxPortfolio: 50000,
          monthlyBase: 4.99, // £59.88/yr (includes ISA + GIA)
          sippAddonMonthly: 10.00, // +£120/yr
          tradeCreditPerMonth: 0,
          ukShareTradeFee: 5.99,
          fundTradeFee: 3.99
        },
        investor: {
          maxPortfolio: Infinity,
          monthlyBase: 11.99, // £143.88/yr (includes ISA + GIA)
          sippAddonMonthly: 10.00, // +£120/yr
          tradeCreditPerMonth: 1, // 1 free trade/month (£3.99 value)
          ukShareTradeFee: 3.99,
          fundTradeFee: 3.99
        },
        superInvestor: {
          monthlyBase: 19.99, // £239.88/yr
          sippAddonMonthly: 10.00,
          tradeCreditPerMonth: 2,
          ukShareTradeFee: 2.99,
          fundTradeFee: 2.99
        },
        pensionBuilderStandalone: {
          monthlyBase: 12.99 // SIPP only (under £50k)
        }
      }
    },
    dealingFees: {
      ukShares: 3.99, // On standard Investor plan
      funds: 3.99,
      usStocks: 3.99,
      europeanStocks: 3.99,
      regularInvesting: 0.00, // FREE regular monthly investing for funds & UK shares
      dividendReinvestment: 0.99
    },
    fxFees: [
      { upTo: 25000, rate: 0.0099 }, // 0.99%
      { upTo: 50000, rate: 0.0075 }, // 0.75%
      { upTo: 100000, rate: 0.0050 }, // 0.50%
      { upTo: Infinity, rate: 0.0025 }
    ],
    sippRules: {
      supported: true,
      employerContributions: true, // Yes! Fully supported
      drawdownFee: 0,
      ufplsFee: 0,
      notes: "Award-winning SIPP with full employer contribution support and free drawdown."
    },
    features: {
      interestOnCash: "Up to 3.75% on cash balances (tiered)",
      fractionalShares: false,
      multiCurrencyAccounts: true, // Hold 9 foreign currencies including USD & EUR!
      mobileAppRating: "4.6 ★ (iOS) / 4.3 ★ (Android)",
      customerService: "Award-winning UK phone and secure message desk",
      researchTools: "Superb Quickrank, Super 60 fund list, ACE 40 ethical funds"
    },
    pros: [
      "Flat fee pricing: does not increase as your wealth compounds to £100k, £250k, or £1m+",
      "Free regular monthly investing across funds and UK shares",
      "Multi-currency accounts allow holding USD and EUR to avoid repeat FX fees",
      "Full employer and company contributions accepted for SIPP",
      "1 free trade credit per month on Investor plan (£47.88/yr value)"
    ],
    cons: [
      "Expensive for small pots under £25k (flat fee is higher percentage drag)",
      "Standard FX fee is 0.99% if not using multi-currency holding",
      "SIPP has an additional £10/month subscription add-on"
    ],
    officialUrl: "https://www.ii.co.uk"
  },
  {
    id: "hargreaves-lansdown",
    name: "Hargreaves Lansdown",
    shortName: "Hargreaves Lansdown (HL)",
    tagline: "The UK's largest investment platform with gold-standard research and service",
    logoColor: "#1e3a8a", // Navy
    badge: "Premium service & fund dealing",
    rating: 4.5,
    trustScore: "4.2/5 (Trustpilot 12k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true,
      gia: true
    },
    universe: {
      ukShares: true,
      etfs: true,
      funds: true,
      investmentTrusts: true,
      usStocks: true,
      europeanStocks: true
    },
    investmentPermissions: {
      ukShares: { permitted: true, label: "UK Shares", detail: "Broadest UK stock universe (main market, AIM, bonds)" },
      etfs: { permitted: true, label: "ETFs", detail: "Full range of UK and global UCITS ETFs" },
      funds: { permitted: true, label: "Mutual Funds / OEICs", detail: "Over 3,000+ unit trusts & OEICs (£0 dealing fees)" },
      investmentTrusts: { permitted: true, label: "Investment Trusts", detail: "Comprehensive UK closed-end funds & REITs" },
      usStocks: { permitted: true, label: "US Stocks", detail: "Direct trading on NYSE & NASDAQ" },
      europeanStocks: { permitted: true, label: "European Stocks", detail: "Direct dealing on major European exchanges" }
    },
    notPermittedList: [],
    notPermittedDetails: "All 6 major investment categories are fully permitted on Hargreaves Lansdown.",
    custodyFeeModel: {
      type: "percentage_hybrid",
      sharesRate: 0.0045, // 0.45%
      sharesCapIsaYear: 45.00, // Capped at £45/year for ISA
      sharesCapGiaYear: 0.00, // £0 platform fee for shares in Fund & Share Account!
      sharesCapSippYear: 200.00, // Capped at £200/year for SIPP
      fundsTiers: [
        { upTo: 250000, rate: 0.0045 }, // 0.45%
        { upTo: 1000000, rate: 0.0025 }, // 0.25%
        { upTo: 2000000, rate: 0.0010 }, // 0.10%
        { upTo: Infinity, rate: 0.0000 }
      ]
    },
    dealingFees: {
      ukShares: 11.95, // £11.95 (0-9 trades/mo), drops to £8.95 (10-19) or £5.95 (20+)
      ukSharesFrequent: 8.95,
      funds: 0.00, // £0 FREE to buy and sell funds!
      usStocks: 11.95,
      europeanStocks: 11.95,
      regularInvesting: 1.50, // £1.50 for shares/ETFs; £0 for funds
      regularInvestingFunds: 0.00,
      dividendReinvestment: 0.01 // 1% (min £1, max £10)
    },
    fxFees: [
      { upTo: 5000, rate: 0.0100 }, // 1.00%
      { upTo: 10000, rate: 0.0075 }, // 0.75%
      { upTo: 20000, rate: 0.0050 }, // 0.50%
      { upTo: Infinity, rate: 0.0025 }
    ],
    sippRules: {
      supported: true,
      employerContributions: true, // Yes! Director / Employer contributions fully accepted
      drawdownFee: 0,
      ufplsFee: 0,
      notes: "The UK's largest SIPP administrator. Seamless employer contributions & drawdown."
    },
    features: {
      interestOnCash: "Up to 3.55% on cash (tiered by account)",
      fractionalShares: false,
      multiCurrencyAccounts: false,
      mobileAppRating: "4.7 ★ (iOS) / 4.6 ★ (Android) - Highest rated UK broker app",
      customerService: "Gold-standard UK phone support (no automated robots)",
      researchTools: "Industry-leading proprietary equity research, fund analysis & videos"
    },
    pros: [
      "£0 platform fee on UK shares and ETFs held in General Investment Account (GIA)",
      "Shares platform fee capped at £45/yr in ISA and £200/yr in SIPP",
      "£0 dealing fee on all Unit Trusts and OEIC Funds",
      "Top-tier customer support and industry benchmark research & tools",
      "Full employer and company contributions supported for SIPP"
    ],
    cons: [
      "High dealing charge for shares (£11.95 per online trade)",
      "Uncapped 0.45% custody fee on funds (£900/yr for £200k in funds)",
      "High foreign exchange charge (1.00% on first £5k)"
    ],
    officialUrl: "https://www.hl.co.uk"
  },
  {
    id: "trading-212",
    name: "Trading 212",
    shortName: "Trading 212",
    tagline: "Zero platform fee, zero dealing commission & ultra-low 0.15% FX for modern investors",
    logoColor: "#0284c7", // Bright Cyan/Blue
    badge: "Zero-fee trading & fractional shares",
    rating: 4.7,
    trustScore: "4.6/5 (Trustpilot 30k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true, // Launched UK SIPP
      gia: true
    },
    universe: {
      ukShares: true,
      etfs: true,
      funds: false, // NO Unit Trusts / OEICs! ETFs and stocks only
      investmentTrusts: true,
      usStocks: true,
      europeanStocks: true
    },
    investmentPermissions: {
      ukShares: { permitted: true, label: "UK Shares", detail: "Over 2,500+ UK stocks with £0 commission" },
      etfs: { permitted: true, label: "ETFs", detail: "Over 2,000+ UCITS ETFs at 0% commission" },
      funds: { permitted: false, label: "Mutual Funds / OEICs", detail: "NOT PERMITTED - No traditional Unit Trusts or OEICs" },
      investmentTrusts: { permitted: true, label: "Investment Trusts", detail: "UK Investment Trusts & REITs supported" },
      usStocks: { permitted: true, label: "US Stocks", detail: "Direct trading at 0% commission & low 0.15% FX" },
      europeanStocks: { permitted: true, label: "European Stocks", detail: "German, French, Dutch stocks supported" }
    },
    notPermittedList: [
      "Mutual Funds / Unit Trusts (OEICs)"
    ],
    notPermittedDetails: "Trading 212 strictly supports exchange-traded securities (stocks, ETFs, and REITs). Traditional mutual funds / OEICs / unit trusts (e.g. Fundsmith, Vanguard LifeStrategy OEIC fund, L&G Global funds) CANNOT be bought or held. Investors must use equivalent UCITS ETFs instead.",
    custodyFeeModel: {
      type: "zero_fee",
      rate: 0.0000,
      annualFee: 0.00
    },
    dealingFees: {
      ukShares: 0.00, // £0 commission!
      funds: 0.00, // N/A (funds not offered)
      usStocks: 0.00, // £0 commission!
      europeanStocks: 0.00, // £0 commission!
      regularInvesting: 0.00, // £0 automated AutoInvest Pies
      dividendReinvestment: 0.00 // Free Auto-reinvest
    },
    fxFees: [
      { upTo: Infinity, rate: 0.0015 } // Ultra-low 0.15% flat FX!
    ],
    sippRules: {
      supported: true,
      employerContributions: false, // IMPORTANT LIMITATION: Personal contributions only!
      drawdownFee: 0,
      ufplsFee: 0,
      notes: "Trading 212 SIPP offers 0% fees, but currently DOES NOT accept employer/company contributions."
    },
    features: {
      interestOnCash: "Up to 5.0% - 5.2% APY paid daily on uninvested cash (market-leading)",
      fractionalShares: true, // Buy shares from just £1
      multiCurrencyAccounts: true, // Hold 13 currencies inside the app
      mobileAppRating: "4.8 ★ (iOS) / 4.7 ★ (Android)",
      customerService: "24/7 in-app chat support (no telephone line)",
      researchTools: "AutoInvest Pies, community portfolios, TradingView charting"
    },
    pros: [
      "100% Free custody: £0 platform fee across ISA, SIPP, and GIA",
      "Zero commission on UK, US, and European shares & ETFs",
      "Industry-lowest FX fee of just 0.15%",
      "Market-leading daily interest on uninvested cash (~5% APY)",
      "Fractional shares from £1 and automated portfolio Pies"
    ],
    cons: [
      "Does NOT offer traditional Unit Trusts or OEIC funds (ETFs only)",
      "SIPP does NOT currently accept employer or limited company contributions",
      "No telephone support (chat and ticket based only)"
    ],
    officialUrl: "https://www.trading212.com"
  },
  {
    id: "fidelity",
    name: "Fidelity International",
    shortName: "Fidelity",
    tagline: "Competitive tiered platform fees for fund investors with extensive global guidance",
    logoColor: "#15803d", // Green
    badge: "Funds & larger portfolios",
    rating: 4.4,
    trustScore: "4.1/5 (Trustpilot 5k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true,
      gia: true
    },
    universe: {
      ukShares: true,
      etfs: true,
      funds: true,
      investmentTrusts: true,
      usStocks: true,
      europeanStocks: false // Fidelity UK has limited European direct single shares compared to US
    },
    investmentPermissions: {
      ukShares: { permitted: true, label: "UK Shares", detail: "UK equities and investment trusts" },
      etfs: { permitted: true, label: "ETFs", detail: "Broad range of London-listed UCITS ETFs" },
      funds: { permitted: true, label: "Mutual Funds / OEICs", detail: "Over 2,500+ mutual funds (£0 dealing fees)" },
      investmentTrusts: { permitted: true, label: "Investment Trusts", detail: "Supported closed-end investment trusts" },
      usStocks: { permitted: true, label: "US Stocks", detail: "Direct trading in NYSE & NASDAQ equities" },
      europeanStocks: { permitted: false, label: "European Single Stocks", detail: "NOT PERMITTED - Direct continental share dealing not supported" }
    },
    notPermittedList: [
      "European Single Stocks (Direct Dealing)"
    ],
    notPermittedDetails: "Direct single-share trading on Continental European exchanges is NOT supported on Fidelity UK retail accounts. European exposure must be accessed through mutual funds or ETFs.",
    custodyFeeModel: {
      type: "percentage_tiered",
      // If holding only shares/ETFs: 0.35% capped at £90/year across ISA/GIA, or £45/yr with regular savings
      sharesRate: 0.0035,
      sharesCapIsaYear: 90.00,
      sharesCapGiaYear: 90.00,
      sharesCapSippYear: 90.00,
      fundsTiers: [
        { upTo: 250000, rate: 0.0035 }, // 0.35% (cheaper than HL's 0.45%)
        { upTo: 1000000, rate: 0.0020 }, // 0.20% (for balances £250k - £1m)
        { upTo: Infinity, rate: 0.0000 } // 0% on balances over £1m
      ]
    },
    dealingFees: {
      ukShares: 7.50, // £7.50 online trade
      funds: 0.00, // £0 FREE to buy and sell funds!
      usStocks: 7.50,
      europeanStocks: 7.50,
      regularInvesting: 1.50, // £1.50 for shares/ETFs; £0 for regular savings in funds
      regularInvestingFunds: 0.00,
      dividendReinvestment: 1.50
    },
    fxFees: [
      { upTo: Infinity, rate: 0.0075 } // 0.75%
    ],
    sippRules: {
      supported: true,
      employerContributions: true, // Yes! Accepts employer / company contributions
      drawdownFee: 0,
      ufplsFee: 0,
      notes: "Full SIPP with free flexible drawdown and occupational / employer contributions."
    },
    features: {
      interestOnCash: "Tiered interest on cash balances",
      fractionalShares: false,
      multiCurrencyAccounts: false,
      mobileAppRating: "4.3 ★ (iOS) / 3.9 ★ (Android)",
      customerService: "Solid UK telephone support & retirement guidance experts",
      researchTools: "Fidelity Select 50 fund list, analyst ratings, retirement calculators"
    },
    pros: [
      "Competitive 0.35% platform fee for funds (cheaper than Hargreaves Lansdown)",
      "Drops to 0.20% above £250k and 0% above £1m (no fee on balance over £1m)",
      "£0 dealing fee on all mutual funds and OEICs",
      "Full employer and company contributions accepted for SIPP",
      "Capped at £90/yr if investing solely in exchange-traded shares/ETFs"
    ],
    cons: [
      "£7.50 dealing fee on UK shares and US stocks",
      "Fund platform fee is uncapped up to £250,000",
      "Foreign exchange fee is 0.75% for US stocks"
    ],
    officialUrl: "https://www.fidelity.co.uk"
  },
  {
    id: "vanguard",
    name: "Vanguard UK Investor",
    shortName: "Vanguard",
    tagline: "The gold standard for low-cost passive index funds with a rock-bottom 0.15% fee",
    logoColor: "#991b1b", // Burgundy / Crimson
    badge: "Low-cost index funds & ETFs",
    rating: 4.6,
    trustScore: "4.2/5 (Trustpilot 4k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true,
      gia: true
    },
    universe: {
      ukShares: false, // NO individual stocks!
      etfs: true, // Only Vanguard's own ETFs
      funds: true, // Only Vanguard's own Index Funds
      investmentTrusts: false,
      usStocks: false, // NO individual US stocks!
      europeanStocks: false // NO individual European stocks!
    },
    investmentPermissions: {
      ukShares: { permitted: false, label: "UK Shares", detail: "NOT PERMITTED - No single company stocks (FTSE shares, AIM)" },
      etfs: { permitted: true, label: "ETFs", detail: "Vanguard UCITS ETFs only (e.g. S&P 500 VUSA, All-World VWRL)" },
      funds: { permitted: true, label: "Mutual Funds / OEICs", detail: "Vanguard Index Funds only (e.g. LifeStrategy, Global All Cap)" },
      investmentTrusts: { permitted: false, label: "Investment Trusts", detail: "NOT PERMITTED - No closed-end investment trusts" },
      usStocks: { permitted: false, label: "US Stocks", detail: "NOT PERMITTED - No individual US stocks (Apple, Tesla, Microsoft, etc.)" },
      europeanStocks: { permitted: false, label: "European Stocks", detail: "NOT PERMITTED - No individual European stocks" }
    },
    notPermittedList: [
      "Individual UK Shares",
      "US Single Stocks",
      "European Single Stocks",
      "Investment Trusts",
      "Non-Vanguard / Third-Party Mutual Funds"
    ],
    notPermittedDetails: "Vanguard UK Investor strictly restricts investments to its own proprietary Vanguard funds and ETFs (~85 funds total). You CANNOT buy any single company shares (Apple, Tesla, Rolls-Royce, etc.), investment trusts, or competitor funds (e.g. Fundsmith, Baillie Gifford).",
    custodyFeeModel: {
      type: "percentage_capped_flat",
      rate: 0.0015, // 0.15% across all accounts combined
      annualCap: 375.00 // Capped at £375/year (reached at £250,000 portfolio value)
    },
    dealingFees: {
      ukShares: 0.00, // N/A
      funds: 0.00, // £0 dealing on Vanguard funds
      usStocks: 0.00, // N/A
      europeanStocks: 0.00, // N/A
      regularInvesting: 0.00, // £0 regular monthly investing
      dividendReinvestment: 0.00 // £0 automatic reinvestment
    },
    fxFees: [
      { upTo: Infinity, rate: 0.0000 } // £0 (All funds traded in GBP)
    ],
    sippRules: {
      supported: true,
      employerContributions: false, // CRITICAL LIMITATION: Vanguard UK SIPP DOES NOT accept employer contributions!
      drawdownFee: 0,
      ufplsFee: 0,
      notes: "Low 0.15% fee capped at £375/yr, but DOES NOT accept employer/company contributions."
    },
    features: {
      interestOnCash: "Competitive interest on cash held in account",
      fractionalShares: false,
      multiCurrencyAccounts: false,
      mobileAppRating: "4.7 ★ (iOS) / 4.5 ★ (Android)",
      customerService: "Online secure messaging and phone customer team",
      researchTools: "Simple index fund selectors, Target Retirement planners"
    },
    pros: [
      "Ultra-low 0.15% platform fee across ISA, SIPP, and GIA",
      "Platform fee capped at £375/year (all holdings over £250k are free)",
      "Zero dealing fees for batch trading on Vanguard funds and ETFs",
      "Home of the famous LifeStrategy and FTSE Global All Cap funds",
      "Zero dividend reinvestment and regular investing fees"
    ],
    cons: [
      "STRICTLY VANGUARD FUNDS ONLY: Cannot buy individual stocks (Apple, Tesla, FTSE shares) or non-Vanguard funds",
      "DOES NOT accept employer or limited company pension contributions",
      "No multi-currency holding or overseas market trading"
    ],
    officialUrl: "https://www.vanguardinvestor.co.uk"
  },
  {
    id: "ig",
    name: "IG",
    shortName: "IG",
    tagline: "Commission-free global share dealing with £0 ISA custody fee and institutional tools",
    logoColor: "#d6001c", // IG Red
    badge: "Zero commission share dealing & £0 ISA",
    rating: 4.6,
    trustScore: "4.5/5 (Trustpilot 8k+ reviews)",
    accountsSupported: {
      isa: true,
      sipp: true,
      gia: true
    },
    universe: {
      ukShares: true,
      etfs: true,
      funds: false, // NO traditional mutual funds / OEICs / unit trusts
      investmentTrusts: true,
      usStocks: true,
      europeanStocks: true
    },
    investmentPermissions: {
      ukShares: { permitted: true, label: "UK Shares", detail: "Over 10,000+ UK shares, FTSE 100, 250, Small Cap, AIM" },
      etfs: { permitted: true, label: "ETFs", detail: "Over 3,000+ UK and international UCITS ETFs" },
      funds: { permitted: false, label: "Mutual Funds / OEICs", detail: "NOT PERMITTED - No traditional Unit Trusts or OEICs (shares & ETFs only)" },
      investmentTrusts: { permitted: true, label: "Investment Trusts", detail: "UK closed-end investment trusts & REITs" },
      usStocks: { permitted: true, label: "US Stocks", detail: "Direct trading on NYSE & NASDAQ (£0 commission)" },
      europeanStocks: { permitted: true, label: "European Stocks", detail: "Direct continental European shares (£0 commission)" }
    },
    notPermittedList: [
      "Mutual Funds / Unit Trusts (OEICs)"
    ],
    notPermittedDetails: "IG share dealing strictly provides exchange-traded instruments (single stocks, investment trusts, and UCITS ETFs). Traditional mutual funds, unit trusts, and OEICs are not available. Investors must use equivalent UCITS ETFs instead.",
    custodyFeeModel: {
      type: "zero_fee_with_sipp_admin",
      isaRate: 0.0000,
      giaRate: 0.0000,
      sippAdminYear: 210.00
    },
    dealingFees: {
      ukShares: 0.00, // £0 online commission
      funds: 0.00, // N/A
      usStocks: 0.00, // £0 online commission
      europeanStocks: 0.00, // £0 online commission
      regularInvesting: 0.00,
      dividendReinvestment: 0.00
    },
    fxFees: [
      { upTo: Infinity, rate: 0.0070 } // 0.70% FX fee on international shares
    ],
    sippRules: {
      supported: true,
      employerContributions: true, // Supported via Options UK SIPP trustee
      drawdownFee: 0,
      ufplsFee: 0,
      notes: "SIPP administered by Options UK Pensions with full employer contribution support (£210/year flat administrator fee)."
    },
    features: {
      interestOnCash: "Up to 3.75% AER on uninvested cash balances",
      fractionalShares: false,
      multiCurrencyAccounts: true, // Hold foreign currencies or auto-convert
      mobileAppRating: "4.6 ★ (iOS) / 4.4 ★ (Android) - Award-winning platform",
      customerService: "24/5 phone and live chat support from UK trading specialists",
      researchTools: "Industry-leading technical charting, ProRealTime, Reuters newsfeed, analyst consensus"
    },
    pros: [
      "Zero commission (£0) on UK, US, and European online share & ETF trades",
      "£0 platform / custody fee on Stocks & Shares ISA and General Investment Account (GIA)",
      "Full employer and Ltd Company director contributions supported for SIPP (via Options UK)",
      "Competitive 0.70% FX fee on overseas US & European shares",
      "Market-leading technical analysis, charting tools, and Reuters market news"
    ],
    cons: [
      "Does NOT offer traditional mutual funds or OEIC unit trusts (ETFs & stocks only)",
      "SIPP carries a £210/year flat administrator fee from Options UK",
      "Telephone dealing carries high charges (£40-£50 per trade)"
    ],
    officialUrl: "https://www.ig.com/uk"
  }
];

if (typeof window !== 'undefined') {
  window.PLATFORMS_DATA = PLATFORMS_DATA;
}
if (typeof self !== 'undefined') {
  self.PLATFORMS_DATA = PLATFORMS_DATA;
}
if (typeof globalThis !== 'undefined') {
  globalThis.PLATFORMS_DATA = PLATFORMS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLATFORMS_DATA };
}
