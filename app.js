/**
 * UK Investment Platform Advisor - Frontend Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // DOM Elements
  const accountIsa = document.getElementById('account-isa');
  const accountSipp = document.getElementById('account-sipp');
  const accountGia = document.getElementById('account-gia');

  const lumpIsa = document.getElementById('lump-isa');
  const sliderLumpIsa = document.getElementById('slider-lump-isa');
  const lumpSipp = document.getElementById('lump-sipp');
  const sliderLumpSipp = document.getElementById('slider-lump-sipp');
  const lumpGia = document.getElementById('lump-gia');
  const sliderLumpGia = document.getElementById('slider-lump-gia');

  const totalPotDisplay = document.getElementById('total-pot-display');

  const monthlyIsa = document.getElementById('monthly-isa');
  const monthlySipp = document.getElementById('monthly-sipp');
  const monthlyGia = document.getElementById('monthly-gia');
  const totalMonthlyDisplay = document.getElementById('total-monthly-display');

  // Asset Allocations
  const allocUkShares = document.getElementById('alloc-uk-shares');
  const valUkShares = document.getElementById('val-uk-shares');
  const allocEtfs = document.getElementById('alloc-etfs');
  const valEtfs = document.getElementById('val-etfs');
  const allocFunds = document.getElementById('alloc-funds');
  const valFunds = document.getElementById('val-funds');
  const allocIt = document.getElementById('alloc-it');
  const valIt = document.getElementById('val-it');
  const allocUs = document.getElementById('alloc-us');
  const valUs = document.getElementById('val-us');
  const allocEu = document.getElementById('alloc-eu');
  const valEu = document.getElementById('val-eu');
  const allocSumDisplay = document.getElementById('alloc-sum-display');

  // Trading Frequencies
  const tradesUk = document.getElementById('trades-uk');
  const valTradesUk = document.getElementById('val-trades-uk');
  const tradesFunds = document.getElementById('trades-funds');
  const valTradesFunds = document.getElementById('val-trades-funds');
  const tradesOverseas = document.getElementById('trades-overseas');
  const valTradesOverseas = document.getElementById('val-trades-overseas');
  const tradeSizeOverseas = document.getElementById('trade-size-overseas');

  // SIPP options
  const sippEmployerContrib = document.getElementById('sipp-employer-contrib');
  const employerContribWarning = document.getElementById('employer-contrib-warning');
  const pensionWithdrawal = document.getElementById('pension-withdrawal');

  // Horizon
  const horizonYears = document.getElementById('horizon-years');
  const valHorizon = document.getElementById('val-horizon');
  const valHorizonDisplay = document.getElementById('val-horizon-display');
  const expectedReturn = document.getElementById('expected-return');
  const valReturnDisplay = document.getElementById('val-return-display');

  // Output containers
  const winnerName = document.getElementById('winner-name');
  const winnerTagline = document.getElementById('winner-tagline');
  const winnerAnnualFee = document.getElementById('winner-annual-fee');
  const winnerEffectivePct = document.getElementById('winner-effective-pct');
  const winnerScoreBadge = document.getElementById('winner-score-badge');
  const winnerBullet = document.getElementById('winner-bullet');
  const winnerLink = document.getElementById('winner-link');

  const platformCardsContainer = document.getElementById('platform-cards-container');
  const tableBreakdownBody = document.getElementById('table-breakdown-body');

  // Tab buttons
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Preset buttons
  const presetBtns = document.querySelectorAll('.preset-btn');
  const btnReset = document.getElementById('btn-reset');
  const btnPrint = document.getElementById('btn-print');

  // Chart instances
  let compoundingDragChart = null;
  let crossoverChart = null;

  // Preset configurations
  const PRESETS = {
    balanced: {
      accounts: { isa: true, sipp: true, gia: false },
      lumpSums: { isa: 25000, sipp: 15000, gia: 0 },
      monthlyContrib: { isa: 250, sipp: 150, gia: 0 },
      assetAllocation: { ukSharesPct: 25, etfsPct: 35, fundsPct: 20, investmentTrustsPct: 10, usStocksPct: 10, europeanStocksPct: 0 },
      tradesUk: 6,
      tradesFunds: 2,
      tradesOverseas: 4,
      avgOverseasSize: 1000,
      employerContrib: false,
      pensionWithdrawal: 'accumulation',
      horizon: 10,
      returnRate: 6.0
    },
    'company-director': {
      accounts: { isa: true, sipp: true, gia: false },
      lumpSums: { isa: 20000, sipp: 60000, gia: 0 },
      monthlyContrib: { isa: 500, sipp: 1000, gia: 0 },
      assetAllocation: { ukSharesPct: 30, etfsPct: 40, fundsPct: 10, investmentTrustsPct: 10, usStocksPct: 10, europeanStocksPct: 0 },
      tradesUk: 8,
      tradesFunds: 2,
      tradesOverseas: 6,
      avgOverseasSize: 2000,
      employerContrib: true, // Ltd company contribution!
      pensionWithdrawal: 'accumulation',
      horizon: 15,
      returnRate: 6.5
    },
    'active-trader': {
      accounts: { isa: true, sipp: false, gia: true },
      lumpSums: { isa: 20000, sipp: 0, gia: 30000 },
      monthlyContrib: { isa: 500, sipp: 0, gia: 500 },
      assetAllocation: { ukSharesPct: 25, etfsPct: 15, fundsPct: 0, investmentTrustsPct: 10, usStocksPct: 40, europeanStocksPct: 10 },
      tradesUk: 24,
      tradesFunds: 0,
      tradesOverseas: 30,
      avgOverseasSize: 1500,
      employerContrib: false,
      pensionWithdrawal: 'accumulation',
      horizon: 8,
      returnRate: 7.0
    },
    'passive-index': {
      accounts: { isa: true, sipp: true, gia: false },
      lumpSums: { isa: 15000, sipp: 10000, gia: 0 },
      monthlyContrib: { isa: 300, sipp: 200, gia: 0 },
      assetAllocation: { ukSharesPct: 0, etfsPct: 60, fundsPct: 40, investmentTrustsPct: 0, usStocksPct: 0, europeanStocksPct: 0 },
      tradesUk: 0,
      tradesFunds: 1,
      tradesOverseas: 0,
      avgOverseasSize: 0,
      employerContrib: false,
      pensionWithdrawal: 'accumulation',
      horizon: 20,
      returnRate: 6.0
    },
    'high-net-worth': {
      accounts: { isa: true, sipp: true, gia: true },
      lumpSums: { isa: 80000, sipp: 150000, gia: 50000 },
      monthlyContrib: { isa: 500, sipp: 500, gia: 500 },
      assetAllocation: { ukSharesPct: 30, etfsPct: 30, fundsPct: 20, investmentTrustsPct: 10, usStocksPct: 10, europeanStocksPct: 0 },
      tradesUk: 12,
      tradesFunds: 4,
      tradesOverseas: 8,
      avgOverseasSize: 3000,
      employerContrib: true,
      pensionWithdrawal: 'flexible_drawdown',
      horizon: 10,
      returnRate: 5.5
    }
  };

  // Sync range slider and number input
  function syncInputs(slider, numberInput) {
    slider.addEventListener('input', () => {
      numberInput.value = slider.value;
      calculateAndRender();
    });
    numberInput.addEventListener('input', () => {
      slider.value = numberInput.value;
      calculateAndRender();
    });
  }

  syncInputs(sliderLumpIsa, lumpIsa);
  syncInputs(sliderLumpSipp, lumpSipp);
  syncInputs(sliderLumpGia, lumpGia);

  // Sync allocation percentages
  const allocControls = [
    { slider: allocUkShares, val: valUkShares },
    { slider: allocEtfs, val: valEtfs },
    { slider: allocFunds, val: valFunds },
    { slider: allocIt, val: valIt },
    { slider: allocUs, val: valUs },
    { slider: allocEu, val: valEu }
  ];

  allocControls.forEach(item => {
    item.slider.addEventListener('input', () => {
      item.val.textContent = `${item.slider.value}%`;
      updateAllocSum();
      calculateAndRender();
    });
  });

  function updateAllocSum() {
    const sum = Number(allocUkShares.value) +
                Number(allocEtfs.value) +
                Number(allocFunds.value) +
                Number(allocIt.value) +
                Number(allocUs.value) +
                Number(allocEu.value);
    allocSumDisplay.textContent = `Total: ${sum}%`;
    if (sum === 100) {
      allocSumDisplay.className = 'text-[11px] text-emerald-600 font-bold';
    } else {
      allocSumDisplay.className = 'text-[11px] text-amber-600 font-bold';
    }
  }

  // Trading frequency sliders
  tradesUk.addEventListener('input', () => {
    valTradesUk.textContent = `${tradesUk.value} / yr`;
    calculateAndRender();
  });
  tradesFunds.addEventListener('input', () => {
    valTradesFunds.textContent = `${tradesFunds.value} / yr`;
    calculateAndRender();
  });
  tradesOverseas.addEventListener('input', () => {
    valTradesOverseas.textContent = `${tradesOverseas.value} trades`;
    calculateAndRender();
  });
  tradeSizeOverseas.addEventListener('input', calculateAndRender);

  // Horizon & Return sliders
  horizonYears.addEventListener('input', () => {
    valHorizon.textContent = `${horizonYears.value} Years`;
    valHorizonDisplay.textContent = `${horizonYears.value} yrs`;
    calculateAndRender();
  });
  expectedReturn.addEventListener('input', () => {
    valReturnDisplay.textContent = `${Number(expectedReturn.value).toFixed(1)}%`;
    calculateAndRender();
  });

  // Account checkboxes & Monthly inputs
  [accountIsa, accountSipp, accountGia, monthlyIsa, monthlySipp, monthlyGia, pensionWithdrawal].forEach(elem => {
    elem.addEventListener('change', calculateAndRender);
    elem.addEventListener('input', calculateAndRender);
  });

  // SIPP employer contribution
  sippEmployerContrib.addEventListener('change', () => {
    if (sippEmployerContrib.checked) {
      employerContribWarning.classList.remove('hidden');
    } else {
      employerContribWarning.classList.add('hidden');
    }
    calculateAndRender();
  });

  // Apply Preset
  function applyPreset(presetKey) {
    const config = PRESETS[presetKey];
    if (!config) return;

    accountIsa.checked = config.accounts.isa;
    accountSipp.checked = config.accounts.sipp;
    accountGia.checked = config.accounts.gia;

    lumpIsa.value = config.lumpSums.isa;
    sliderLumpIsa.value = config.lumpSums.isa;
    lumpSipp.value = config.lumpSums.sipp;
    sliderLumpSipp.value = config.lumpSums.sipp;
    lumpGia.value = config.lumpSums.gia;
    sliderLumpGia.value = config.lumpSums.gia;

    monthlyIsa.value = config.monthlyContrib.isa;
    monthlySipp.value = config.monthlyContrib.sipp;
    monthlyGia.value = config.monthlyContrib.gia;

    allocUkShares.value = config.assetAllocation.ukSharesPct;
    valUkShares.textContent = `${config.assetAllocation.ukSharesPct}%`;
    allocEtfs.value = config.assetAllocation.etfsPct;
    valEtfs.textContent = `${config.assetAllocation.etfsPct}%`;
    allocFunds.value = config.assetAllocation.fundsPct;
    valFunds.textContent = `${config.assetAllocation.fundsPct}%`;
    allocIt.value = config.assetAllocation.investmentTrustsPct;
    valIt.textContent = `${config.assetAllocation.investmentTrustsPct}%`;
    allocUs.value = config.assetAllocation.usStocksPct;
    valUs.textContent = `${config.assetAllocation.usStocksPct}%`;
    allocEu.value = config.assetAllocation.europeanStocksPct;
    valEu.textContent = `${config.assetAllocation.europeanStocksPct}%`;

    tradesUk.value = config.tradesUk;
    valTradesUk.textContent = `${config.tradesUk} / yr`;
    tradesFunds.value = config.tradesFunds;
    valTradesFunds.textContent = `${config.tradesFunds} / yr`;
    tradesOverseas.value = config.tradesOverseas;
    valTradesOverseas.textContent = `${config.tradesOverseas} trades`;
    tradeSizeOverseas.value = config.avgOverseasSize;

    sippEmployerContrib.checked = config.employerContrib;
    if (config.employerContrib) {
      employerContribWarning.classList.remove('hidden');
    } else {
      employerContribWarning.classList.add('hidden');
    }

    pensionWithdrawal.value = config.pensionWithdrawal;
    horizonYears.value = config.horizon;
    valHorizon.textContent = `${config.horizon} Years`;
    valHorizonDisplay.textContent = `${config.horizon} yrs`;

    expectedReturn.value = config.returnRate;
    valReturnDisplay.textContent = `${config.returnRate.toFixed(1)}%`;

    updateAllocSum();
    calculateAndRender();

    // Visual feedback for active button
    presetBtns.forEach(btn => {
      if (btn.dataset.preset === presetKey) {
        btn.classList.add('bg-brand-600', 'text-white', 'border-brand-600');
        btn.classList.remove('bg-slate-100', 'text-slate-700');
      } else {
        btn.classList.remove('bg-brand-600', 'text-white', 'border-brand-600');
        btn.classList.add('bg-slate-100', 'text-slate-700');
      }
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyPreset(btn.dataset.preset);
    });
  });

  // Reset Button
  btnReset.addEventListener('click', () => {
    applyPreset('balanced');
  });

  // Print Button
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Tab switching
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      navTabs.forEach(t => {
        t.classList.remove('text-brand-600', 'border-b-2', 'border-brand-600');
        t.classList.add('text-slate-500');
      });
      tab.classList.remove('text-slate-500');
      tab.classList.add('text-brand-600', 'border-b-2', 'border-brand-600');

      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });

      // Resize charts if tab is made visible
      if (targetId === 'tab-charts') {
        setTimeout(() => {
          if (compoundingDragChart) compoundingDragChart.resize();
          if (crossoverChart) crossoverChart.resize();
        }, 50);
      }
    });
  });

  // Collect Current Inputs
  function getCurrentInputs() {
    const isaLump = accountIsa.checked ? Number(lumpIsa.value) || 0 : 0;
    const sippLump = accountSipp.checked ? Number(lumpSipp.value) || 0 : 0;
    const giaLump = accountGia.checked ? Number(lumpGia.value) || 0 : 0;

    const isaM = accountIsa.checked ? Number(monthlyIsa.value) || 0 : 0;
    const sippM = accountSipp.checked ? Number(monthlySipp.value) || 0 : 0;
    const giaM = accountGia.checked ? Number(monthlyGia.value) || 0 : 0;

    return {
      accounts: {
        isa: accountIsa.checked,
        sipp: accountSipp.checked,
        gia: accountGia.checked
      },
      lumpSums: {
        isa: isaLump,
        sipp: sippLump,
        gia: giaLump
      },
      monthlyContrib: {
        isa: isaM,
        sipp: sippM,
        gia: giaM
      },
      assetAllocation: {
        ukSharesPct: Number(allocUkShares.value) || 0,
        etfsPct: Number(allocEtfs.value) || 0,
        fundsPct: Number(allocFunds.value) || 0,
        investmentTrustsPct: Number(allocIt.value) || 0,
        usStocksPct: Number(allocUs.value) || 0,
        europeanStocksPct: Number(allocEu.value) || 0
      },
      tradingFrequency: {
        ukShareTradesPerYear: Number(tradesUk.value) || 0,
        fundTradesPerYear: Number(tradesFunds.value) || 0,
        overseasTradesPerYear: Number(tradesOverseas.value) || 0,
        avgOverseasTradeSize: Number(tradeSizeOverseas.value) || 1000
      },
      sippEmployerContrib: sippEmployerContrib.checked,
      pensionWithdrawal: pensionWithdrawal.value,
      horizonYears: Number(horizonYears.value) || 10,
      expectedReturnRate: (Number(expectedReturn.value) || 6) / 100
    };
  }

  // Format currency GBP
  function formatGbp(amount) {
    if (amount === undefined || amount === null) return '£0.00';
    return '£' + Number(amount).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Format integer GBP
  function formatGbpInt(amount) {
    if (amount === undefined || amount === null) return '£0';
    return '£' + Math.round(Number(amount)).toLocaleString('en-GB');
  }

  // MAIN CALCULATION & RENDERING LOOP
  function calculateAndRender() {
    const inputs = getCurrentInputs();

    // Update summary badges
    const totalLump = inputs.lumpSums.isa + inputs.lumpSums.sipp + inputs.lumpSums.gia;
    const totalMonthly = inputs.monthlyContrib.isa + inputs.monthlyContrib.sipp + inputs.monthlyContrib.gia;
    totalPotDisplay.textContent = `Total: ${formatGbpInt(totalLump)}`;
    totalMonthlyDisplay.textContent = `${formatGbpInt(totalMonthly)} / month`;

    // Run comparison engine
    const rankedPlatforms = PlatformCalculator.compareAllPlatforms(inputs);

    // 1. Render Winner Spotlight
    const winner = rankedPlatforms[0];
    if (winner) {
      winnerName.textContent = winner.platform.name;
      winnerTagline.textContent = winner.platform.tagline;
      winnerAnnualFee.textContent = formatGbp(winner.yearOneTotalFee);
      winnerEffectivePct.textContent = `${winner.effectiveFeePct.toFixed(2)}% annual fee drag`;
      winnerScoreBadge.textContent = `Match Score: ${winner.suitabilityScore}/100`;

      if (winner.keyReasons && winner.keyReasons.length) {
        winnerBullet.innerHTML = `
          <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
          <span>${winner.keyReasons[0].text}</span>
        `;
      }
      winnerLink.href = winner.platform.officialUrl;
    }

    // 2. Render Platform Leaderboard Cards
    renderPlatformCards(rankedPlatforms);

    // 3. Render Fee Breakdown Table
    renderBreakdownTable(rankedPlatforms);

    // 4. Render Charts
    renderCharts(rankedPlatforms, inputs);

    // Refresh icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Render Leaderboard Cards
  function renderPlatformCards(rankedPlatforms) {
    platformCardsContainer.innerHTML = '';

    rankedPlatforms.forEach((result, idx) => {
      const p = result.platform;
      const isWinner = (idx === 0);
      const isDisqualified = result.compatibility.hasDisqualifier;

      const card = document.createElement('div');
      card.className = `platform-card bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all ${
        isWinner
          ? 'border-emerald-500 ring-2 ring-emerald-500/20'
          : isDisqualified
          ? 'border-red-200 bg-red-50/10'
          : 'border-slate-200'
      }`;

      // Badge logic
      let badgeHtml = '';
      if (isWinner) {
        badgeHtml = `<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <i data-lucide="trophy" class="w-3.5 h-3.5 text-emerald-600"></i>
          <span>#1 Best Recommendation</span>
        </span>`;
      } else if (isDisqualified) {
        badgeHtml = `<span class="bg-red-100 text-red-800 border border-red-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-red-600"></i>
          <span>Incompatible with Criteria</span>
        </span>`;
      } else {
        badgeHtml = `<span class="bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          Rank #${result.rank}
        </span>`;
      }

      // Disqualification banner if any
      let alertBannerHtml = '';
      if (isDisqualified) {
        alertBannerHtml = `
          <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
            <span class="font-bold flex items-center gap-1">
              <i data-lucide="alert-triangle" class="w-4 h-4 text-red-600"></i>
              <span>Disqualification Notice:</span>
            </span>
            <ul class="list-disc list-inside text-[11px] space-y-0.5">
              ${result.compatibility.disqualifiers.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `;
      } else if (result.compatibility.warnings.length > 0) {
        alertBannerHtml = `
          <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
            <span class="font-bold flex items-center gap-1">
              <i data-lucide="info" class="w-4 h-4 text-amber-600"></i>
              <span>Consideration Note:</span>
            </span>
            <ul class="list-disc list-inside text-[11px] space-y-0.5">
              ${result.compatibility.warnings.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      // Key reason bullet
      const keyReasonHtml = result.keyReasons && result.keyReasons.length ? `
        <div class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
          <i data-lucide="sparkle" class="w-4 h-4 text-brand-600 shrink-0 mt-0.5"></i>
          <span>${result.keyReasons[0].text}</span>
        </div>
      ` : '';

      card.innerHTML = `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              ${badgeHtml}
              <span class="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-100">
                ${p.badge}
              </span>
            </div>
            <h4 class="text-lg font-bold text-slate-900">${p.name}</h4>
            <p class="text-xs text-slate-500">${p.tagline}</p>
          </div>

          <div class="text-right sm:border-l sm:border-slate-100 sm:pl-4 min-w-[130px]">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Year 1 Total Cost</span>
            <div class="text-2xl font-black ${isWinner ? 'text-emerald-600' : 'text-slate-900'}">
              ${formatGbp(result.yearOneTotalFee)}
            </div>
            <span class="text-[11px] text-slate-500 block">
              ${result.effectiveFeePct.toFixed(2)}% effective drag
            </span>
          </div>
        </div>

        ${alertBannerHtml}
        ${keyReasonHtml}

        <!-- Quick 4-box metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50 p-2 rounded-lg text-center">
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Platform Fee</span>
            <span class="font-bold text-slate-800">${formatGbp(result.totalPlatformFee)}</span>
          </div>
          <div class="bg-slate-50 p-2 rounded-lg text-center">
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Dealing Fees</span>
            <span class="font-bold text-slate-800">${formatGbp(result.totalDealingFee)}</span>
          </div>
          <div class="bg-slate-50 p-2 rounded-lg text-center">
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Regular Inv.</span>
            <span class="font-bold text-slate-800">${formatGbp(result.regularInvestingFee)}</span>
          </div>
          <div class="bg-slate-50 p-2 rounded-lg text-center">
            <span class="text-[10px] text-slate-400 font-bold uppercase block">FX Fees</span>
            <span class="font-bold text-slate-800">${formatGbp(result.fxFee)}</span>
          </div>
        </div>

        <!-- Accordion Toggle for Detailed Specs -->
        <details class="group text-xs pt-1">
          <summary class="cursor-pointer font-semibold text-brand-600 hover:text-brand-800 list-none flex items-center justify-between py-1 border-t border-slate-100">
            <span>View Pros, Cons & Platform Highlights</span>
            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
          </summary>
          
          <div class="pt-3 space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <span class="font-bold text-emerald-800 flex items-center gap-1">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>
                  <span>Strengths / Pros</span>
                </span>
                <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  ${p.pros.map(pro => `<li>${pro}</li>`).join('')}
                </ul>
              </div>

              <div class="space-y-1">
                <span class="font-bold text-red-800 flex items-center gap-1">
                  <i data-lucide="x" class="w-3.5 h-3.5 text-red-600"></i>
                  <span>Limitations / Cons</span>
                </span>
                <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  ${p.cons.map(con => `<li>${con}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div>
                <span class="text-slate-400 font-semibold block">Cash Interest:</span>
                <span class="font-bold text-slate-800">${p.features.interestOnCash}</span>
              </div>
              <div>
                <span class="text-slate-400 font-semibold block">Customer Service:</span>
                <span class="font-medium text-slate-800">${p.features.customerService}</span>
              </div>
              <div>
                <span class="text-slate-400 font-semibold block">App Store Score:</span>
                <span class="font-medium text-slate-800">${p.features.mobileAppRating}</span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] text-slate-500 font-medium">5-Year Projected Cumulative Cost: <strong>${formatGbpInt(result.fiveYearCost)}</strong></span>
              <a href="${p.officialUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-brand-600 hover:text-brand-800 font-bold text-xs">
                <span>Visit ${p.shortName}</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </details>
      `;

      platformCardsContainer.appendChild(card);
    });
  }

  // Render Breakdown Table
  function renderBreakdownTable(rankedPlatforms) {
    tableBreakdownBody.innerHTML = '';

    rankedPlatforms.forEach((res, idx) => {
      const isWinner = (idx === 0);
      const isDisqualified = res.compatibility.hasDisqualifier;

      const row = document.createElement('tr');
      row.className = isWinner ? 'bg-emerald-50/50 font-bold' : (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50');

      row.innerHTML = `
        <td class="py-3 px-4">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-full ${isWinner ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'} text-[10px] font-bold flex items-center justify-center">
              ${res.rank}
            </span>
            <span class="font-bold text-slate-900">${res.platform.name}</span>
            ${isDisqualified ? '<span class="text-[10px] text-red-600 bg-red-100 px-1.5 py-0.5 rounded">Incompatible</span>' : ''}
          </div>
        </td>
        <td class="py-3 px-3 text-right text-slate-700">${formatGbp(res.accountFees.isa)}</td>
        <td class="py-3 px-3 text-right text-slate-700">${formatGbp(res.accountFees.sipp)}</td>
        <td class="py-3 px-3 text-right text-slate-700">${formatGbp(res.totalDealingFee)}</td>
        <td class="py-3 px-3 text-right text-slate-700">${formatGbp(res.regularInvestingFee)}</td>
        <td class="py-3 px-3 text-right text-slate-700">${formatGbp(res.fxFee)}</td>
        <td class="py-3 px-4 text-right ${isWinner ? 'text-emerald-700 bg-emerald-100/50' : 'text-slate-900 bg-brand-50/30'} font-extrabold">
          ${formatGbp(res.yearOneTotalFee)}
        </td>
        <td class="py-3 px-4 text-right font-bold text-slate-800">
          ${formatGbpInt(res.fiveYearCost)}
        </td>
      `;

      tableBreakdownBody.appendChild(row);
    });
  }

  // Render Charts
  function renderCharts(rankedPlatforms, inputs) {
    // 1. Compounding Fee Drag Chart
    const horizon = inputs.horizonYears;
    const yearLabels = Array.from({ length: horizon }, (_, i) => `Yr ${i + 1}`);

    const compoundingDatasets = rankedPlatforms.map(res => {
      const data = res.multiYearProjection.map(p => p.cumulativeLostGrowth + p.cumulativeFees);
      return {
        label: res.platform.shortName,
        data: data,
        borderColor: res.platform.logoColor,
        backgroundColor: res.platform.logoColor + '20',
        borderWidth: res.rank === 1 ? 3 : 1.5,
        borderDash: res.compatibility.hasDisqualifier ? [5, 5] : [],
        tension: 0.2,
        pointRadius: 2
      };
    });

    const ctxCompounding = document.getElementById('chart-compounding-drag').getContext('2d');
    if (compoundingDragChart) {
      compoundingDragChart.destroy();
    }
    compoundingDragChart = new Chart(ctxCompounding, {
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: compoundingDatasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 10, family: 'Inter' } }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: £${Math.round(context.raw).toLocaleString()} total fee drag`
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `£${Number(value).toLocaleString()}`
            },
            grid: { color: '#f1f5f9' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });

    // 2. Fee Crossover Curve by Pot Size
    const crossoverData = PlatformCalculator.generateCrossoverData(inputs);
    const crossoverDatasets = crossoverData.datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.borderColor,
      backgroundColor: ds.borderColor + '15',
      borderWidth: 2,
      borderDash: ds.disqualified ? [4, 4] : [],
      tension: 0.25,
      pointRadius: 3
    }));

    const ctxCrossover = document.getElementById('chart-crossover').getContext('2d');
    if (crossoverChart) {
      crossoverChart.destroy();
    }
    crossoverChart = new Chart(ctxCrossover, {
      type: 'line',
      data: {
        labels: crossoverData.labels,
        datasets: crossoverDatasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 10, family: 'Inter' } }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: £${Math.round(context.raw).toLocaleString()}/yr`
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `£${Number(value).toLocaleString()}`
            },
            grid: { color: '#f1f5f9' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // Initialize with 'balanced' preset
  applyPreset('balanced');
});
