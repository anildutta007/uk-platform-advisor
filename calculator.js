/**
 * UK Investment Platform Calculator Engine
 * Calculates exact annual platform custody fees, dealing charges,
 * regular investing costs, foreign exchange fees, multi-year compounding fee drag,
 * and assesses feature compatibility.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./platforms'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./platforms'));
  } else {
    var pData = (typeof PLATFORMS_DATA !== 'undefined' ? PLATFORMS_DATA :
                (root && root.PLATFORMS_DATA ? root.PLATFORMS_DATA :
                (typeof window !== 'undefined' && window.PLATFORMS_DATA ? window.PLATFORMS_DATA :
                (typeof globalThis !== 'undefined' && globalThis.PLATFORMS_DATA ? globalThis.PLATFORMS_DATA : []))));
    var calc = factory({ PLATFORMS_DATA: pData });
    if (root) root.PlatformCalculator = calc;
    if (typeof window !== 'undefined') window.PlatformCalculator = calc;
    if (typeof self !== 'undefined') self.PlatformCalculator = calc;
    if (typeof globalThis !== 'undefined') globalThis.PlatformCalculator = calc;
  }
}(typeof self !== 'undefined' ? self : (typeof window !== 'undefined' ? window : this), function (platformsModule) {

  const PLATFORMS_DATA = platformsModule.PLATFORMS_DATA || (typeof PLATFORMS_DATA !== 'undefined' ? PLATFORMS_DATA : []);

  /**
   * Calculate tiered fee on an amount based on brackets
   * tiers = [{ upTo: 250000, rate: 0.0025 }, { upTo: 500000, rate: 0.0010 }, ...]
   */
  function calculateTieredFee(amount, tiers) {
    if (!amount || amount <= 0 || !tiers || !tiers.length) return 0;
    let fee = 0;
    let previousLimit = 0;

    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      const tierCapacity = tier.upTo - previousLimit;
      const taxableInThisTier = Math.min(Math.max(amount - previousLimit, 0), tierCapacity);

      if (taxableInThisTier > 0) {
        fee += taxableInThisTier * tier.rate;
      }

      previousLimit = tier.upTo;
      if (amount <= tier.upTo) break;
    }

    return fee;
  }

  /**
   * Calculate foreign exchange (FX) fee on a trade amount
   */
  function calculateFxFee(annualFxVolume, fxTiers) {
    if (!annualFxVolume || annualFxVolume <= 0 || !fxTiers || !fxTiers.length) return 0;
    return calculateTieredFee(annualFxVolume, fxTiers);
  }

  /**
   * Main Fee Evaluator for a single platform
   */
  function evaluatePlatform(platform, inputs) {
    const {
      accounts = { isa: true, sipp: false, gia: false },
      lumpSums = { isa: 20000, sipp: 0, gia: 0 },
      monthlyContrib = { isa: 0, sipp: 0, gia: 0 },
      assetAllocation = {
        ukSharesPct: 30,
        etfsPct: 30,
        fundsPct: 20,
        investmentTrustsPct: 10,
        usStocksPct: 10,
        europeanStocksPct: 0
      },
      tradingFrequency = {
        ukShareTradesPerYear: 6,
        fundTradesPerYear: 2,
        overseasTradesPerYear: 4,
        avgOverseasTradeSize: 1000
      },
      sippEmployerContrib = false,
      pensionWithdrawal = 'accumulation',
      horizonYears = 10,
      expectedReturnRate = 0.06
    } = inputs;

    // Filter amounts to only active accounts
    const isaLump = accounts.isa ? (Number(lumpSums.isa) || 0) : 0;
    const sippLump = accounts.sipp ? (Number(lumpSums.sipp) || 0) : 0;
    const giaLump = accounts.gia ? (Number(lumpSums.gia) || 0) : 0;
    const totalLump = isaLump + sippLump + giaLump;

    const isaMonthly = accounts.isa ? (Number(monthlyContrib.isa) || 0) : 0;
    const sippMonthly = accounts.sipp ? (Number(monthlyContrib.sipp) || 0) : 0;
    const giaMonthly = accounts.gia ? (Number(monthlyContrib.gia) || 0) : 0;
    const totalMonthly = isaMonthly + sippMonthly + giaMonthly;
    const annualRegularContrib = totalMonthly * 12;

    // Portfolio balance used for annual platform fee (mid-year average of lump + regular)
    const avgYearOnePortfolio = totalLump + (annualRegularContrib / 2);
    const avgIsaPot = isaLump + (isaMonthly * 6);
    const avgSippPot = sippLump + (sippMonthly * 6);
    const avgGiaPot = giaLump + (giaMonthly * 6);

    // Calculate asset portions with normalization to guarantee strict 100% total
    const rawAllocSum = (Number(assetAllocation.ukSharesPct) || 0) +
                        (Number(assetAllocation.etfsPct) || 0) +
                        (Number(assetAllocation.fundsPct) || 0) +
                        (Number(assetAllocation.investmentTrustsPct) || 0) +
                        (Number(assetAllocation.usStocksPct) || 0) +
                        (Number(assetAllocation.europeanStocksPct) || 0);

    const allocMultiplier = rawAllocSum > 0 ? (100 / rawAllocSum) : 1;

    const normAlloc = {
      ukSharesPct: (Number(assetAllocation.ukSharesPct) || 0) * allocMultiplier,
      etfsPct: (Number(assetAllocation.etfsPct) || 0) * allocMultiplier,
      fundsPct: (Number(assetAllocation.fundsPct) || 0) * allocMultiplier,
      investmentTrustsPct: (Number(assetAllocation.investmentTrustsPct) || 0) * allocMultiplier,
      usStocksPct: (Number(assetAllocation.usStocksPct) || 0) * allocMultiplier,
      europeanStocksPct: (Number(assetAllocation.europeanStocksPct) || 0) * allocMultiplier
    };

    // Assets that qualify as "shares / exchange-traded" for capping purposes
    const exchangeTradedPct = (normAlloc.ukSharesPct +
      normAlloc.etfsPct +
      normAlloc.investmentTrustsPct +
      normAlloc.usStocksPct +
      normAlloc.europeanStocksPct) / 100;

    const fundsPct = normAlloc.fundsPct / 100;

    // 1. Calculate Platform / Custody Fee
    let isaPlatformFee = 0;
    let sippPlatformFee = 0;
    let giaPlatformFee = 0;
    let totalPlatformFee = 0;

    const model = platform.custodyFeeModel;

    if (platform.id === 'trading-212') {
      isaPlatformFee = 0;
      sippPlatformFee = 0;
      giaPlatformFee = 0;
      totalPlatformFee = 0;
    } else if (platform.id === 'vanguard') {
      // 0.15% across all accounts, capped at £375/year total
      const rawFee = avgYearOnePortfolio * model.rate;
      totalPlatformFee = Math.min(rawFee, model.annualCap);
      // Proportionally divide across accounts
      if (avgYearOnePortfolio > 0) {
        isaPlatformFee = (avgIsaPot / avgYearOnePortfolio) * totalPlatformFee;
        sippPlatformFee = (avgSippPot / avgYearOnePortfolio) * totalPlatformFee;
        giaPlatformFee = (avgGiaPot / avgYearOnePortfolio) * totalPlatformFee;
      }
    } else if (platform.id === 'interactive-investor') {
      // Flat fee subscription model
      // Essentials (<£50k portfolio): £4.99/mo (£59.88/yr) base (ISA+GIA). SIPP add-on: £10/mo (£120/yr).
      // Investor (>=£50k portfolio or standard): £11.99/mo (£143.88/yr) base. SIPP add-on: £10/mo.
      const isUnder50k = avgYearOnePortfolio <= 50000;
      let baseMonthly = isUnder50k ? model.plans.essentials.monthlyBase : model.plans.investor.monthlyBase;
      let sippMonthlyFee = 0;

      const hasIsaOrGia = accounts.isa || accounts.gia;
      const hasSipp = accounts.sipp;

      if (hasIsaOrGia && hasSipp) {
        totalPlatformFee = (baseMonthly * 12) + (10.00 * 12);
        sippPlatformFee = 120.00;
        const remaining = baseMonthly * 12;
        if (accounts.isa && accounts.gia) {
          isaPlatformFee = remaining * 0.5;
          giaPlatformFee = remaining * 0.5;
        } else if (accounts.isa) {
          isaPlatformFee = remaining;
        } else {
          giaPlatformFee = remaining;
        }
      } else if (hasSipp && !hasIsaOrGia) {
        // Standalone SIPP
        if (isUnder50k) {
          totalPlatformFee = 12.99 * 12; // Pension Builder
          sippPlatformFee = totalPlatformFee;
        } else {
          totalPlatformFee = (baseMonthly * 12) + (10.00 * 12);
          sippPlatformFee = totalPlatformFee;
        }
      } else {
        // ISA and/or GIA only
        totalPlatformFee = baseMonthly * 12;
        if (accounts.isa && accounts.gia) {
          isaPlatformFee = totalPlatformFee * 0.5;
          giaPlatformFee = totalPlatformFee * 0.5;
        } else if (accounts.isa) {
          isaPlatformFee = totalPlatformFee;
        } else {
          giaPlatformFee = totalPlatformFee;
        }
      }
    } else if (platform.id === 'aj-bell') {
      // AJ Bell:
      // Shares: 0.25% capped at £42/yr for ISA, £42/yr for GIA, £120/yr for SIPP
      // Funds: 0.25% up to £250k, 0.10% on £250k-£500k, 0% above £500k (combined portfolio tier)

      // Shares portion per account
      const isaShares = avgIsaPot * exchangeTradedPct;
      const sippShares = avgSippPot * exchangeTradedPct;
      const giaShares = avgGiaPot * exchangeTradedPct;

      const isaSharesFee = Math.min(isaShares * model.sharesRate, model.sharesCapIsaYear);
      const sippSharesFee = Math.min(sippShares * model.sharesRate, model.sharesCapSippYear);
      const giaSharesFee = Math.min(giaShares * model.sharesRate, model.sharesCapGiaYear);

      // Funds portion across total portfolio
      const totalFunds = avgYearOnePortfolio * fundsPct;
      const totalFundsFee = calculateTieredFee(totalFunds, model.fundsTiers);

      // Distribute funds fee proportionally
      const isaFundsPortion = avgYearOnePortfolio > 0 ? (avgIsaPot / avgYearOnePortfolio) * totalFundsFee : 0;
      const sippFundsPortion = avgYearOnePortfolio > 0 ? (avgSippPot / avgYearOnePortfolio) * totalFundsFee : 0;
      const giaFundsPortion = avgYearOnePortfolio > 0 ? (avgGiaPot / avgYearOnePortfolio) * totalFundsFee : 0;

      isaPlatformFee = accounts.isa ? (isaSharesFee + isaFundsPortion) : 0;
      sippPlatformFee = accounts.sipp ? (sippSharesFee + sippFundsPortion) : 0;
      giaPlatformFee = accounts.gia ? (giaSharesFee + giaFundsPortion) : 0;
      totalPlatformFee = isaPlatformFee + sippPlatformFee + giaPlatformFee;

    } else if (platform.id === 'hargreaves-lansdown') {
      // HL:
      // Shares: 0.45% capped at £45/yr in ISA; £0 in GIA (FREE!); capped at £200/yr in SIPP
      // Funds: Tiered (0.45% first £250k, 0.25% next £750k, 0.10% £1m-£2m, 0% over £2m) - UNCAPPED!

      const isaShares = avgIsaPot * exchangeTradedPct;
      const sippShares = avgSippPot * exchangeTradedPct;
      const giaShares = avgGiaPot * exchangeTradedPct;

      const isaSharesFee = Math.min(isaShares * model.sharesRate, model.sharesCapIsaYear);
      const sippSharesFee = Math.min(sippShares * model.sharesRate, model.sharesCapSippYear);
      const giaSharesFee = 0; // HL charges £0 custody on shares in Fund & Share Account!

      const totalFunds = avgYearOnePortfolio * fundsPct;
      const totalFundsFee = calculateTieredFee(totalFunds, model.fundsTiers);

      const isaFundsPortion = avgYearOnePortfolio > 0 ? (avgIsaPot / avgYearOnePortfolio) * totalFundsFee : 0;
      const sippFundsPortion = avgYearOnePortfolio > 0 ? (avgSippPot / avgYearOnePortfolio) * totalFundsFee : 0;
      const giaFundsPortion = avgYearOnePortfolio > 0 ? (avgGiaPot / avgYearOnePortfolio) * totalFundsFee : 0;

      isaPlatformFee = accounts.isa ? (isaSharesFee + isaFundsPortion) : 0;
      sippPlatformFee = accounts.sipp ? (sippSharesFee + sippFundsPortion) : 0;
      giaPlatformFee = accounts.gia ? (giaSharesFee + giaFundsPortion) : 0;
      totalPlatformFee = isaPlatformFee + sippPlatformFee + giaPlatformFee;

    } else if (platform.id === 'fidelity') {
      // Fidelity:
      // 0.35% under £250k, 0.20% £250k-£1m, 0% over £1m
      // If ONLY holding shares/ETFs: capped at £90/year across ISA/GIA, £90/year for SIPP
      const hasOnlyShares = fundsPct === 0;

      if (hasOnlyShares) {
        const isaCap = accounts.isa ? model.sharesCapIsaYear : 0;
        const sippCap = accounts.sipp ? model.sharesCapSippYear : 0;
        const giaCap = accounts.gia ? model.sharesCapGiaYear : 0;

        isaPlatformFee = Math.min(avgIsaPot * model.sharesRate, isaCap);
        sippPlatformFee = Math.min(avgSippPot * model.sharesRate, sippCap);
        giaPlatformFee = Math.min(avgGiaPot * model.sharesRate, giaCap);
        totalPlatformFee = isaPlatformFee + sippPlatformFee + giaPlatformFee;
      } else {
        // Standard tiered fee on total holdings
        totalPlatformFee = calculateTieredFee(avgYearOnePortfolio, model.fundsTiers);
        if (avgYearOnePortfolio > 0) {
          isaPlatformFee = accounts.isa ? (avgIsaPot / avgYearOnePortfolio) * totalPlatformFee : 0;
          sippPlatformFee = accounts.sipp ? (avgSippPot / avgYearOnePortfolio) * totalPlatformFee : 0;
          giaPlatformFee = accounts.gia ? (avgGiaPot / avgYearOnePortfolio) * totalPlatformFee : 0;
        }
      }
    }

    // 2. Calculate Dealing Fees
    let ukShareTradeFee = 0;
    let fundTradeFee = 0;
    let overseasTradeFee = 0;

    const ukShareTrades = Number(tradingFrequency.ukShareTradesPerYear) || 0;
    const fundTrades = Number(tradingFrequency.fundTradesPerYear) || 0;
    const overseasTrades = Number(tradingFrequency.overseasTradesPerYear) || 0;

    if (platform.id === 'trading-212' || platform.id === 'vanguard') {
      ukShareTradeFee = 0;
      fundTradeFee = 0;
      overseasTradeFee = 0;
    } else if (platform.id === 'interactive-investor') {
      // ii provides 1 free trade credit per month (12 credits/yr) on the Investor plan
      const totalTrades = ukShareTrades + fundTrades + overseasTrades;
      const isUnder50k = avgYearOnePortfolio <= 50000;
      const freeCredits = isUnder50k ? 0 : 12;
      const billableTrades = Math.max(0, totalTrades - freeCredits);
      const feePerTrade = isUnder50k ? 5.99 : 3.99;
      const totalDealing = billableTrades * feePerTrade;

      // Assign proportionally
      if (totalTrades > 0) {
        ukShareTradeFee = (ukShareTrades / totalTrades) * totalDealing;
        fundTradeFee = (fundTrades / totalTrades) * totalDealing;
        overseasTradeFee = (overseasTrades / totalTrades) * totalDealing;
      }
    } else if (platform.id === 'aj-bell') {
      const shareRate = ukShareTrades >= 120 ? platform.dealingFees.ukSharesFrequent : platform.dealingFees.ukShares;
      ukShareTradeFee = ukShareTrades * shareRate;
      fundTradeFee = fundTrades * platform.dealingFees.funds;
      overseasTradeFee = overseasTrades * platform.dealingFees.usStocks;
    } else if (platform.id === 'hargreaves-lansdown') {
      const shareRate = ukShareTrades >= 240 ? 5.95 : (ukShareTrades >= 120 ? 8.95 : 11.95);
      ukShareTradeFee = ukShareTrades * shareRate;
      fundTradeFee = 0; // HL has £0 fund dealing!
      overseasTradeFee = overseasTrades * shareRate;
    } else if (platform.id === 'fidelity') {
      ukShareTradeFee = ukShareTrades * platform.dealingFees.ukShares;
      fundTradeFee = 0; // Fidelity has £0 fund dealing!
      overseasTradeFee = overseasTrades * platform.dealingFees.usStocks;
    }

    const totalDealingFee = ukShareTradeFee + fundTradeFee + overseasTradeFee;

    // 3. Regular Monthly Investing Fee
    let regularInvestingFee = 0;
    const hasRegularInvestments = totalMonthly > 0;
    if (hasRegularInvestments) {
      // Determine how many monthly regular investment legs occur
      // E.g., user invests monthly in 1 or 2 assets
      const monthlyLegs = (accounts.isa ? 1 : 0) + (accounts.sipp ? 1 : 0) + (accounts.gia ? 1 : 0);
      const annualRegularTrades = monthlyLegs * 12;

      if (platform.id === 'trading-212' || platform.id === 'vanguard') {
        regularInvestingFee = 0;
      } else if (platform.id === 'interactive-investor') {
        regularInvestingFee = 0; // ii offers free regular investing!
      } else if (platform.id === 'aj-bell') {
        regularInvestingFee = annualRegularTrades * platform.dealingFees.regularInvesting;
      } else if (platform.id === 'hargreaves-lansdown') {
        // Free for funds, £1.50 for shares/ETFs
        if (fundsPct >= 0.8) {
          regularInvestingFee = 0;
        } else {
          regularInvestingFee = annualRegularTrades * (1 - fundsPct) * 1.50;
        }
      } else if (platform.id === 'fidelity') {
        if (fundsPct >= 0.8) {
          regularInvestingFee = 0;
        } else {
          regularInvestingFee = annualRegularTrades * (1 - fundsPct) * 1.50;
        }
      }
    }

    // 4. Foreign Exchange (FX) Fees
    let fxFee = 0;
    if (overseasTrades > 0 && (assetAllocation.usStocksPct > 0 || assetAllocation.europeanStocksPct > 0)) {
      const avgTradeSize = Number(tradingFrequency.avgOverseasTradeSize) || 1000;
      const annualFxVolume = overseasTrades * avgTradeSize;

      if (platform.id === 'vanguard') {
        fxFee = 0; // Vanguard doesn't support direct US/EU individual stocks
      } else {
        fxFee = calculateFxFee(annualFxVolume, platform.fxFees);
      }
    }

    // 5. Total First Year Cost
    const yearOneTotalFee = Math.round((totalPlatformFee + totalDealingFee + regularInvestingFee + fxFee) * 100) / 100;

    // 6. Multi-Year Compound Fee Drag Simulation
    const multiYearProjection = [];
    let currentPot = totalLump;
    let cumulativeFees = 0;
    let noFeePot = totalLump; // Benchmark pot if 0% fees were paid

    for (let yr = 1; yr <= horizonYears; yr++) {
      // Annual growth before fee
      const growth = currentPot * expectedReturnRate;
      const noFeeGrowth = noFeePot * expectedReturnRate;

      // Platform fee scales with pot if percentage model, or stays flat if flat-fee
      let yrPlatformFee = totalPlatformFee;
      if (platform.custodyFeeModel.type === 'percentage_with_caps') {
        // Recalculate with grown pot
        const sharesVal = currentPot * exchangeTradedPct;
        const fundsVal = currentPot * fundsPct;
        const sFee = Math.min(sharesVal * platform.custodyFeeModel.sharesRate, (accounts.isa ? 42 : 0) + (accounts.sipp ? 120 : 0) + (accounts.gia ? 42 : 0));
        const fFee = calculateTieredFee(fundsVal, platform.custodyFeeModel.fundsTiers);
        yrPlatformFee = sFee + fFee;
      } else if (platform.custodyFeeModel.type === 'percentage_hybrid') {
        const sharesVal = currentPot * exchangeTradedPct;
        const fundsVal = currentPot * fundsPct;
        const sFee = Math.min(sharesVal * platform.custodyFeeModel.sharesRate, (accounts.isa ? 45 : 0) + (accounts.sipp ? 200 : 0));
        const fFee = calculateTieredFee(fundsVal, platform.custodyFeeModel.fundsTiers);
        yrPlatformFee = sFee + fFee;
      } else if (platform.custodyFeeModel.type === 'percentage_capped_flat') {
        yrPlatformFee = Math.min(currentPot * platform.custodyFeeModel.rate, platform.custodyFeeModel.annualCap);
      } else if (platform.custodyFeeModel.type === 'percentage_tiered') {
        if (fundsPct === 0) {
          yrPlatformFee = Math.min(currentPot * platform.custodyFeeModel.sharesRate, 90);
        } else {
          yrPlatformFee = calculateTieredFee(currentPot, platform.custodyFeeModel.fundsTiers);
        }
      } else if (platform.id === 'interactive-investor') {
        // ii subscription remains flat unless crosses £50k threshold
        const isUnder50k = currentPot <= 50000;
        const base = isUnder50k ? 4.99 : 11.99;
        yrPlatformFee = (base * 12) + (accounts.sipp ? 120 : 0);
      }

      const yrTotalFee = yrPlatformFee + totalDealingFee + regularInvestingFee + fxFee;
      cumulativeFees += yrTotalFee;

      // Update pot with contribution, growth and fee deduction
      currentPot = currentPot + growth + annualRegularContrib - yrTotalFee;
      noFeePot = noFeePot + noFeeGrowth + annualRegularContrib;

      const cumulativeLostGrowth = Math.max(0, noFeePot - currentPot);

      multiYearProjection.push({
        year: yr,
        portfolioValue: Math.round(currentPot),
        feesPaidThisYear: Math.round(yrTotalFee),
        cumulativeFees: Math.round(cumulativeFees),
        cumulativeLostGrowth: Math.round(cumulativeLostGrowth)
      });
    }

    // 7. Compatibility and Rule Checks
    const compatibility = {
      isFullyCompatible: true,
      hasDisqualifier: false,
      warnings: [],
      disqualifiers: []
    };

    // Rule: SIPP Company / Employer contribution
    if (accounts.sipp && sippEmployerContrib) {
      if (!platform.sippRules.employerContributions) {
        compatibility.hasDisqualifier = true;
        compatibility.isFullyCompatible = false;
        compatibility.disqualifiers.push(
          `${platform.shortName} DOES NOT accept employer or limited company pension contributions (personal contributions only).`
        );
      }
    }

    // Active Disallowed Investments for this Platform based on user allocation
    const activeDisallowed = [];
    if (normAlloc.ukSharesPct > 0 && !platform.universe.ukShares) {
      activeDisallowed.push({ asset: 'UK Shares', label: 'Individual UK Shares', pct: Math.round(normAlloc.ukSharesPct), reason: 'Platform does not permit trading or holding single company UK shares' });
    }
    if (normAlloc.fundsPct > 0 && !platform.universe.funds) {
      activeDisallowed.push({ asset: 'Mutual Funds / OEICs', label: 'Mutual Funds / Unit Trusts (OEICs)', pct: Math.round(normAlloc.fundsPct), reason: 'Platform does not support traditional mutual funds (ETFs only)' });
    }
    if (normAlloc.usStocksPct > 0 && !platform.universe.usStocks) {
      activeDisallowed.push({ asset: 'US Stocks', label: 'US Single Stocks', pct: Math.round(normAlloc.usStocksPct), reason: 'Platform does not permit trading individual US stocks (Apple, Tesla, etc.)' });
    }
    if (normAlloc.europeanStocksPct > 0 && !platform.universe.europeanStocks) {
      activeDisallowed.push({ asset: 'European Stocks', label: 'European Single Stocks', pct: Math.round(normAlloc.europeanStocksPct), reason: 'Direct continental European share dealing is not supported' });
    }
    if (normAlloc.investmentTrustsPct > 0 && !platform.universe.investmentTrusts) {
      activeDisallowed.push({ asset: 'Investment Trusts', label: 'Investment Trusts', pct: Math.round(normAlloc.investmentTrustsPct), reason: 'Closed-end investment trusts are not supported' });
    }

    // STRICT FILTER: If platform cannot hold/trade any of the user's selected investments, disqualify it completely
    if (activeDisallowed.length > 0) {
      compatibility.hasDisqualifier = true;
      compatibility.isFullyCompatible = false;
      activeDisallowed.forEach(d => {
        const msg = `${platform.shortName} does NOT support ${d.label} (${d.reason}).`;
        if (!compatibility.disqualifiers.includes(msg)) {
          compatibility.disqualifiers.push(msg);
        }
      });
    }

    // Rule: Investment Universe checks
    const wantsOverseas = (normAlloc.usStocksPct > 0 || normAlloc.europeanStocksPct > 0);
    const wantsUkShares = (normAlloc.ukSharesPct > 0 || normAlloc.investmentTrustsPct > 0);
    const wantsFunds = (normAlloc.fundsPct > 0);

    if (platform.id === 'vanguard') {
      if (wantsUkShares || wantsOverseas) {
        compatibility.hasDisqualifier = true;
        compatibility.isFullyCompatible = false;
        const vMsg = "Vanguard Investor UK does NOT permit trading individual UK shares, US shares, European stocks, or third-party funds (Vanguard-only index funds & ETFs).";
        if (!compatibility.disqualifiers.includes(vMsg)) {
          compatibility.disqualifiers.push(vMsg);
        }
      }
    }

    if (platform.id === 'trading-212') {
      if (wantsFunds) {
        compatibility.hasDisqualifier = true;
        compatibility.isFullyCompatible = false;
        const tMsg = "Trading 212 does not offer Unit Trusts or OEIC mutual funds (ETFs and stocks only).";
        if (!compatibility.disqualifiers.includes(tMsg)) {
          compatibility.disqualifiers.push(tMsg);
        }
      }
      if (accounts.sipp && pensionWithdrawal === 'flexible_drawdown') {
        compatibility.warnings.push(
          "Trading 212 SIPP is primarily focused on accumulation; complex retirement drawdown schedules are more fully serviced by traditional platforms."
        );
      }
    }

    if (platform.id === 'fidelity') {
      if (normAlloc.europeanStocksPct > 0) {
        compatibility.hasDisqualifier = true;
        compatibility.isFullyCompatible = false;
        const fMsg = "Fidelity UK does not support direct single-stock trading on Continental European exchanges.";
        if (!compatibility.disqualifiers.includes(fMsg)) {
          compatibility.disqualifiers.push(fMsg);
        }
      }
    }

    // 8. Suitability Score Calculation (0 to 100)
    let score = 90;

    // Disqualifier penalty
    if (compatibility.hasDisqualifier) {
      score = Math.max(10, score - 60);
    }

    // Warning penalty
    score -= (compatibility.warnings.length * 8);

    // Cost efficiency impact
    // We adjust score relative to yearOneTotalFee:
    // E.g. £0 -> +10, £100 -> +5, £300 -> -5, £600+ -> -20
    if (yearOneTotalFee < 50) score += 8;
    else if (yearOneTotalFee < 150) score += 4;
    else if (yearOneTotalFee > 500) score -= 12;
    else if (yearOneTotalFee > 300) score -= 6;

    // Feature alignments
    if (platform.id === 'interactive-investor' && avgYearOnePortfolio >= 75000) {
      score += 6; // Flat fee advantage
    }
    if (platform.id === 'trading-212' && !wantsFunds && (!accounts.sipp || !sippEmployerContrib)) {
      score += 7; // Zero fee champion for stocks & ETFs
    }
    if (platform.id === 'vanguard' && !wantsUkShares && !wantsOverseas && (!accounts.sipp || !sippEmployerContrib)) {
      score += 7; // Benchmark passive fund champion
    }
    if (platform.id === 'aj-bell' && exchangeTradedPct > 0.6) {
      score += 5; // Capped share fees
    }
    if (platform.id === 'hargreaves-lansdown' && fundsPct > 0.7 && ukShareTrades === 0) {
      score += 4; // Free fund trading and high support
    }

    // Clamp score
    score = Math.min(99, Math.max(10, Math.round(score)));

    // 9. Personalized Key Reasons
    const keyReasons = [];
    if (compatibility.hasDisqualifier) {
      keyReasons.push({
        type: 'negative',
        text: compatibility.disqualifiers[0]
      });
    }

    if (yearOneTotalFee === 0) {
      keyReasons.push({
        type: 'positive',
        text: "£0 Total annual fees: completely free custody and trading."
      });
    } else {
      keyReasons.push({
        type: 'neutral',
        text: `Estimated Year 1 total cost: £${yearOneTotalFee.toFixed(2)} (${((yearOneTotalFee / (avgYearOnePortfolio || 1)) * 100).toFixed(2)}% effective cost).`
      });
    }

    if (platform.id === 'interactive-investor') {
      if (avgYearOnePortfolio > 50000) {
        keyReasons.push({
          type: 'positive',
          text: `Flat subscription means fees don't explode as your pot compounds to £250k+. Includes 12 free trade credits/year.`
        });
      } else {
        keyReasons.push({
          type: 'warning',
          text: `At smaller pot sizes (<£50k), flat fees represent a higher percentage drag than percentage brokers.`
        });
      }
    } else if (platform.id === 'aj-bell') {
      keyReasons.push({
        type: 'positive',
        text: `Shares & ETF custody capped at £42/yr for ISA/GIA and £120/yr for SIPP. Full employer pension support.`
      });
    } else if (platform.id === 'hargreaves-lansdown') {
      if (fundsPct > 0.5) {
        keyReasons.push({
          type: 'neutral',
          text: `Free dealing on all funds, though fund platform fee is uncapped at 0.45%. Shares in GIA have £0 platform fee.`
        });
      }
      keyReasons.push({
        type: 'positive',
        text: `Gold-standard customer service with direct UK phone lines, top research and highest rated mobile app.`
      });
    } else if (platform.id === 'trading-212') {
      keyReasons.push({
        type: 'positive',
        text: `Ultra-low FX fee (0.15%), 0% commission on global shares, and ~5% interest on uninvested cash.`
      });
    } else if (platform.id === 'vanguard') {
      keyReasons.push({
        type: 'positive',
        text: `Rock-bottom 0.15% fee capped at £375/year. Unmatched simplicity for passive index fund investing.`
      });
    } else if (platform.id === 'fidelity') {
      keyReasons.push({
        type: 'positive',
        text: `Tiered fee drops to 0.20% over £250k and 0% over £1m. Free fund trades and full SIPP drawdown.`
      });
    }

    return {
      platform,
      yearOneTotalFee,
      effectiveFeePct: avgYearOnePortfolio > 0 ? (yearOneTotalFee / avgYearOnePortfolio) * 100 : 0,
      totalPlatformFee: Math.round(totalPlatformFee * 100) / 100,
      totalDealingFee: Math.round(totalDealingFee * 100) / 100,
      regularInvestingFee: Math.round(regularInvestingFee * 100) / 100,
      fxFee: Math.round(fxFee * 100) / 100,
      accountFees: {
        isa: Math.round(isaPlatformFee * 100) / 100,
        sipp: Math.round(sippPlatformFee * 100) / 100,
        gia: Math.round(giaPlatformFee * 100) / 100
      },
      multiYearProjection,
      fiveYearCost: multiYearProjection[Math.min(4, multiYearProjection.length - 1)]?.cumulativeFees || 0,
      tenYearCost: multiYearProjection[Math.min(9, multiYearProjection.length - 1)]?.cumulativeFees || 0,
      fiveYearLostGrowth: multiYearProjection[Math.min(4, multiYearProjection.length - 1)]?.cumulativeLostGrowth || 0,
      tenYearLostGrowth: multiYearProjection[Math.min(9, multiYearProjection.length - 1)]?.cumulativeLostGrowth || 0,
      compatibility,
      suitabilityScore: score,
      keyReasons,
      notPermittedList: platform.notPermittedList || [],
      notPermittedDetails: platform.notPermittedDetails || '',
      investmentPermissions: platform.investmentPermissions || {},
      activeDisallowed: activeDisallowed
    };
  }

  /**
   * Evaluate all platforms and return only those that completely satisfy criteria
   */
  function compareAllPlatforms(inputs) {
    const allEvaluated = PLATFORMS_DATA.map(p => evaluatePlatform(p, inputs));

    // Sort: compatible first, then suitability score descending, then lowest fee
    allEvaluated.sort((a, b) => {
      if (a.compatibility.hasDisqualifier && !b.compatibility.hasDisqualifier) return 1;
      if (!a.compatibility.hasDisqualifier && b.compatibility.hasDisqualifier) return -1;

      if (b.suitabilityScore !== a.suitabilityScore) {
        return b.suitabilityScore - a.suitabilityScore;
      }

      return a.yearOneTotalFee - b.yearOneTotalFee;
    });

    // Platforms that satisfy all user criteria completely
    const compatiblePlatforms = allEvaluated.filter(r => !r.compatibility.hasDisqualifier);
    const excludedPlatforms = allEvaluated.filter(r => r.compatibility.hasDisqualifier);

    compatiblePlatforms.forEach((res, index) => {
      res.rank = index + 1;
    });

    excludedPlatforms.forEach((res, index) => {
      res.rank = compatiblePlatforms.length + index + 1;
    });

    // We return the compatiblePlatforms array, with metadata properties attached
    const returnList = compatiblePlatforms.length > 0 ? compatiblePlatforms : allEvaluated;
    returnList.allEvaluated = allEvaluated;
    returnList.compatiblePlatforms = compatiblePlatforms;
    returnList.excludedPlatforms = excludedPlatforms;
    returnList.hasNoMatches = (compatiblePlatforms.length === 0);

    return returnList;
  }

  /**
   * Calculate Fee Crossover Curves across portfolio sizes (£5k to £500k)
   */
  function generateCrossoverData(inputs) {
    const potSizes = [5000, 15000, 30000, 50000, 75000, 100000, 150000, 250000, 350000, 500000];

    // Chart only the platforms that satisfy criteria completely
    const compatibleData = PLATFORMS_DATA.filter(p => !evaluatePlatform(p, inputs).compatibility.hasDisqualifier);
    const platformsToChart = compatibleData.length > 0 ? compatibleData : PLATFORMS_DATA;

    const datasets = platformsToChart.map(platform => {
      const dataPoints = potSizes.map(pot => {
        // Clone inputs with this single pot size split across selected accounts
        const accountsSelected = Object.keys(inputs.accounts || {}).filter(k => inputs.accounts[k]);
        const numAccounts = accountsSelected.length || 1;
        const lumpPerAccount = pot / numAccounts;

        const mockInputs = JSON.parse(JSON.stringify(inputs));
        mockInputs.lumpSums = {
          isa: inputs.accounts.isa ? lumpPerAccount : 0,
          sipp: inputs.accounts.sipp ? lumpPerAccount : 0,
          gia: inputs.accounts.gia ? lumpPerAccount : 0
        };
        mockInputs.monthlyContrib = { isa: 0, sipp: 0, gia: 0 }; // Focus strictly on custody + static trading

        const evaluation = evaluatePlatform(platform, mockInputs);
        return evaluation.yearOneTotalFee;
      });

      return {
        label: platform.shortName,
        borderColor: platform.logoColor,
        data: dataPoints,
        disqualified: false
      };
    });

    return {
      labels: potSizes.map(p => `£${(p / 1000).toLocaleString()}k`),
      datasets
    };
  }

  return {
    PLATFORMS_DATA,
    evaluatePlatform,
    compareAllPlatforms,
    generateCrossoverData,
    calculateTieredFee,
    calculateFxFee
  };
}));
