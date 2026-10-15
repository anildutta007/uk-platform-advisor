/**
 * UK Investment Platform Advisor - Frontend Controller
 * Implements the redesigned GUI layout matching the team's visual mockup.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }

  // Cost View Mode: 'monthly' | 'annual'
  let costViewMode = 'monthly';

  // DOM Elements: Account Lump Sums
  const accountIsa = document.getElementById('account-isa');
  const accountSipp = document.getElementById('account-sipp');
  const accountGia = document.getElementById('account-gia');
  const lumpIsa = document.getElementById('lump-isa');
  const lumpSipp = document.getElementById('lump-sipp');
  const lumpGia = document.getElementById('lump-gia');
  const totalLumpDisplay = document.getElementById('total-lump-display');

  // DOM Elements: Monthly Regular Investments
  const monthlyCheckIsa = document.getElementById('monthly-check-isa');
  const monthlyCheckSipp = document.getElementById('monthly-check-sipp');
  const monthlyCheckGia = document.getElementById('monthly-check-gia');
  const monthlyIsa = document.getElementById('monthly-isa');
  const monthlySipp = document.getElementById('monthly-sipp');
  const monthlyGia = document.getElementById('monthly-gia');
  const totalMonthlyDisplay = document.getElementById('total-monthly-display');

  // Page Subheader Summary
  const profileSummaryText = document.getElementById('profile-summary-text');

  // Asset Checkboxes and Pills
  const chkUkShares = document.getElementById('chk-uk-shares');
  const chkEtfs = document.getElementById('chk-etfs');
  const chkFunds = document.getElementById('chk-funds');
  const chkIt = document.getElementById('chk-it');
  const chkUs = document.getElementById('chk-us');
  const chkEu = document.getElementById('chk-eu');

  const pillUkShares = document.getElementById('pill-ukShares');
  const pillEtfs = document.getElementById('pill-etfs');
  const pillFunds = document.getElementById('pill-funds');
  const pillIt = document.getElementById('pill-investmentTrusts');
  const pillUs = document.getElementById('pill-usStocks');
  const pillEu = document.getElementById('pill-europeanStocks');

  // Sliders and Rows
  const rowUkShares = document.getElementById('slider-row-ukShares');
  const rowEtfs = document.getElementById('slider-row-etfs');
  const rowFunds = document.getElementById('slider-row-funds');
  const rowIt = document.getElementById('slider-row-investmentTrusts');
  const rowUs = document.getElementById('slider-row-usStocks');
  const rowEu = document.getElementById('slider-row-europeanStocks');

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
  const allocSumText = document.getElementById('alloc-sum-text');
  const presetAllocSelect = document.getElementById('preset-alloc-select');

  // Accordions & Summaries
  const tradesUk = document.getElementById('trades-uk');
  const valTradesUk = document.getElementById('val-trades-uk');
  const tradesFunds = document.getElementById('trades-funds');
  const valTradesFunds = document.getElementById('val-trades-funds');
  const tradesOverseas = document.getElementById('trades-overseas');
  const valTradesOverseas = document.getElementById('val-trades-overseas');
  const tradeSizeOverseas = document.getElementById('trade-size-overseas');
  const tradingSummaryBadge = document.getElementById('trading-summary-badge');

  const sippEmployerContrib = document.getElementById('sipp-employer-contrib');
  const employerContribWarning = document.getElementById('employer-contrib-warning');
  const pensionWithdrawal = document.getElementById('pension-withdrawal');
  const pensionSummaryBadge = document.getElementById('pension-summary-badge');

  const horizonYears = document.getElementById('horizon-years');
  const valHorizonDisplay = document.getElementById('val-horizon-display');
  const expectedReturn = document.getElementById('expected-return');
  const valReturnDisplay = document.getElementById('val-return-display');
  const horizonSummaryBadge = document.getElementById('horizon-summary-badge');

  // Right Column Elements
  const statusEligibleCount = document.getElementById('status-eligible-count');
  const statusExcludedText = document.getElementById('status-excluded-text');
  const btnViewReasonsLink = document.getElementById('btn-view-reasons-link');
  const toggleViewMonthly = document.getElementById('toggle-view-monthly');
  const toggleViewAnnual = document.getElementById('toggle-view-annual');

  const lowestCostBanner = document.getElementById('lowest-cost-banner');
  const bannerLowestTitle = document.getElementById('banner-lowest-title');
  const bannerLowestDesc = document.getElementById('banner-lowest-desc');

  const platformCardsContainer = document.getElementById('platform-cards-container');
  const excludedPlatformsBanner = document.getElementById('excluded-platforms-banner');
  const excludedBannerTitle = document.getElementById('excluded-banner-title');
  const excludedBannerList = document.getElementById('excluded-banner-list');
  const btnViewReasonsCard = document.getElementById('btn-view-reasons-card');

  // Modals
  const modalEligibilityReasons = document.getElementById('modal-eligibility-reasons');
  const btnCloseReasonsModal = document.getElementById('btn-close-reasons-modal');
  const btnCloseReasonsModalBottom = document.getElementById('btn-close-reasons-modal-bottom');
  const modalExcludedList = document.getElementById('modal-excluded-list');

  const modalTradeOffs = document.getElementById('modal-trade-offs');
  const modalTradeoffTitle = document.getElementById('modal-tradeoff-title');
  const modalTradeoffBody = document.getElementById('modal-tradeoff-body');
  const btnCloseTradeoffModal = document.getElementById('btn-close-tradeoff-modal');
  const btnCloseTradeoffModalBottom = document.getElementById('btn-close-tradeoff-modal-bottom');

  // Tabs & Other Containers
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const tableBreakdownBody = document.getElementById('table-breakdown-body');
  const btnReset = document.getElementById('btn-reset');
  const btnPrint = document.getElementById('btn-print');

  // Chart instances
  let compoundingDragChart = null;
  let crossoverChart = null;

  // Cached state for modal
  let currentExcludedPlatforms = [];

  // Asset Items List
  const ASSET_ITEMS = [
    { key: 'ukShares', chk: chkUkShares, pill: pillUkShares, row: rowUkShares, slider: allocUkShares, valEl: valUkShares, name: 'UK Shares' },
    { key: 'etfs', chk: chkEtfs, pill: pillEtfs, row: rowEtfs, slider: allocEtfs, valEl: valEtfs, name: 'ETFs' },
    { key: 'funds', chk: chkFunds, pill: pillFunds, row: rowFunds, slider: allocFunds, valEl: valFunds, name: 'Funds / OEICs' },
    { key: 'investmentTrusts', chk: chkIt, pill: pillIt, row: rowIt, slider: allocIt, valEl: valIt, name: 'Inv. Trusts' },
    { key: 'usStocks', chk: chkUs, pill: pillUs, row: rowUs, slider: allocUs, valEl: valUs, name: 'US Stocks' },
    { key: 'europeanStocks', chk: chkEu, pill: pillEu, row: rowEu, slider: allocEu, valEl: valEu, name: 'European Stocks' }
  ];

  let isAutoBalancing = false;

  // Formatting Helpers
  function formatGbp(amount) {
    if (amount === undefined || amount === null) return '£0.00';
    return '£' + Number(amount).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatGbpInt(amount) {
    if (amount === undefined || amount === null) return '£0';
    return '£' + Math.round(Number(amount)).toLocaleString('en-GB');
  }

  // Generate Authentic Brand SVGs & Logomarks
  function getPlatformBrandHtml(id, name) {
    switch (id) {
      case 'aj-bell':
        return `
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#dc2626"/>
              <path d="M9 19c2.5-5 6.5-7.5 13-7M11 22c1.8-3 4.5-4.5 9-4.5" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="13" cy="11" r="2" fill="#ffffff"/>
            </svg>
            <span class="font-extrabold text-slate-900 text-base tracking-tight"><span class="text-[#dc2626]">AJ</span>Bell</span>
          </div>
        `;
      case 'interactive-investor':
        return `
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 shrink-0" viewBox="0 0 32 32" fill="none">
              <rect x="7" y="11" width="5.5" height="15" rx="2.5" fill="#f97316"/>
              <circle cx="9.75" cy="6" r="2.75" fill="#f97316"/>
              <rect x="18" y="6" width="5.5" height="20" rx="2.5" fill="#f97316"/>
            </svg>
            <div class="leading-tight">
              <span class="font-bold text-slate-900 text-xs tracking-tight block">interactive</span>
              <span class="font-bold text-slate-900 text-xs tracking-tight block -mt-0.5">investor</span>
            </div>
          </div>
        `;
      case 'fidelity':
        return `
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-[#dc2626] flex items-center justify-center shrink-0 text-white font-black text-xs shadow-xs">
              F
            </div>
            <div class="leading-tight">
              <span class="font-extrabold text-[#002f6c] text-sm tracking-tight block">Fidelity</span>
              <span class="text-[8px] font-bold text-slate-400 block tracking-wider uppercase -mt-0.5">INTERNATIONAL</span>
            </div>
          </div>
        `;
      case 'hargreaves-lansdown':
        return `
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0 text-white font-serif font-black text-xs tracking-tighter shadow-xs">
              HL
            </div>
            <div class="leading-tight">
              <span class="font-bold text-slate-900 text-xs tracking-tight block">Hargreaves</span>
              <span class="font-bold text-slate-900 text-xs tracking-tight block -mt-0.5">Lansdown</span>
            </div>
          </div>
        `;
      case 'trading-212':
        return `
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-[#0284c7] flex items-center justify-center shrink-0 text-white font-black text-[9px] shadow-xs">
              212
            </div>
            <span class="font-black text-[#0284c7] text-sm tracking-tight">TRADING 212</span>
          </div>
        `;
      case 'vanguard':
        return `
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-[#991b1b] flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs">
              ⛵
            </div>
            <span class="font-black text-[#991b1b] text-sm tracking-tight">Vanguard</span>
          </div>
        `;
      default:
        return `<span class="font-bold text-slate-900 text-base">${name}</span>`;
    }
  }

  // Synchronize Asset Pills & Slider Visibility
  function syncAssetPillsAndSliders() {
    ASSET_ITEMS.forEach(item => {
      if (!item.chk) return;
      const isChecked = item.chk.checked;
      if (item.row) {
        if (isChecked) {
          item.row.classList.remove('hidden');
        } else {
          item.row.classList.add('hidden');
        }
      }
      if (item.pill) {
        if (isChecked) {
          item.pill.className = 'asset-pill checked flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md border text-xs font-semibold cursor-pointer select-none';
        } else {
          item.pill.className = 'asset-pill unchecked flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md border text-xs font-semibold cursor-pointer select-none';
        }
      }
      if (!isChecked && item.slider && item.valEl) {
        item.slider.value = 0;
        item.valEl.textContent = '0%';
      }
    });
  }

  function getActiveAssetItems() {
    return ASSET_ITEMS.filter(item => item.chk && item.chk.checked);
  }

  function updateAllocSum() {
    const active = getActiveAssetItems();
    const sum = active.reduce((acc, item) => acc + (parseInt(item.slider.value, 10) || 0), 0);
    if (allocSumText) {
      allocSumText.textContent = `${sum}%`;
      if (sum === 100) {
        allocSumText.className = 'font-bold text-emerald-700';
      } else {
        allocSumText.className = 'font-bold text-amber-600';
      }
    }
  }

  function equalSplitActiveAssets() {
    const active = getActiveAssetItems();
    if (active.length === 0) return;

    isAutoBalancing = true;
    const base = Math.floor(100 / active.length);
    let allocatedSoFar = 0;

    active.forEach((item, index) => {
      if (index === active.length - 1) {
        item.slider.value = Math.max(0, 100 - allocatedSoFar);
      } else {
        item.slider.value = base;
        allocatedSoFar += base;
      }
      item.valEl.textContent = `${item.slider.value}%`;
    });

    updateAllocSum();
    calculateAndRender();
    isAutoBalancing = false;
  }

  function rebalanceAllocSliders(changedKey) {
    if (isAutoBalancing) return;
    isAutoBalancing = true;

    const active = getActiveAssetItems();
    const changedItem = active.find(item => item.key === changedKey);
    if (!changedItem) {
      isAutoBalancing = false;
      return;
    }

    if (active.length === 1) {
      changedItem.slider.value = 100;
      changedItem.valEl.textContent = '100%';
      updateAllocSum();
      calculateAndRender();
      isAutoBalancing = false;
      return;
    }

    let newVal = Math.min(100, Math.max(0, parseInt(changedItem.slider.value, 10) || 0));
    changedItem.slider.value = newVal;

    const others = active.filter(item => item.key !== changedKey);
    const remainingBudget = 100 - newVal;
    const currentOtherSum = others.reduce((acc, item) => acc + (parseInt(item.slider.value, 10) || 0), 0);

    if (currentOtherSum > 0) {
      let allocatedSoFar = 0;
      others.forEach((item, index) => {
        if (index === others.length - 1) {
          item.slider.value = Math.max(0, remainingBudget - allocatedSoFar);
        } else {
          const prop = (parseInt(item.slider.value, 10) || 0) / currentOtherSum;
          const scaled = Math.round(prop * remainingBudget);
          item.slider.value = scaled;
          allocatedSoFar += scaled;
        }
        item.valEl.textContent = `${item.slider.value}%`;
      });
    } else if (remainingBudget > 0) {
      const base = Math.floor(remainingBudget / others.length);
      let allocatedSoFar = 0;
      others.forEach((item, index) => {
        if (index === others.length - 1) {
          item.slider.value = Math.max(0, remainingBudget - allocatedSoFar);
        } else {
          item.slider.value = base;
          allocatedSoFar += base;
        }
        item.valEl.textContent = `${item.slider.value}%`;
      });
    } else {
      others.forEach(item => {
        item.slider.value = 0;
        item.valEl.textContent = '0%';
      });
    }

    changedItem.valEl.textContent = `${changedItem.slider.value}%`;
    updateAllocSum();
    calculateAndRender();
    isAutoBalancing = false;
  }

  // Hook up asset checkbox & slider listeners
  ASSET_ITEMS.forEach(item => {
    if (item.chk) {
      item.chk.addEventListener('change', () => {
        const active = getActiveAssetItems();
        if (active.length === 0) {
          item.chk.checked = true;
          return;
        }
        syncAssetPillsAndSliders();
        equalSplitActiveAssets();
      });
    }

    if (item.slider) {
      item.slider.addEventListener('input', () => {
        rebalanceAllocSliders(item.key);
      });
    }
  });

  // Preset Allocations Dropdown
  const ALLOC_PRESETS = {
    balanced: { ukShares: 25, etfs: 35, funds: 20, investmentTrusts: 10, usStocks: 10, europeanStocks: 0 },
    'etfs-only': { ukShares: 0, etfs: 100, funds: 0, investmentTrusts: 0, usStocks: 0, europeanStocks: 0 },
    'funds-only': { ukShares: 0, etfs: 0, funds: 100, investmentTrusts: 0, usStocks: 0, europeanStocks: 0 },
    'shares-etfs': { ukShares: 50, etfs: 50, funds: 0, investmentTrusts: 0, usStocks: 0, europeanStocks: 0 },
    'global-stocks': { ukShares: 30, etfs: 0, funds: 0, investmentTrusts: 0, usStocks: 40, europeanStocks: 30 }
  };

  function applyAllocPreset(presetKey) {
    const p = ALLOC_PRESETS[presetKey];
    if (!p) return;

    isAutoBalancing = true;
    ASSET_ITEMS.forEach(item => {
      const pct = p[item.key] || 0;
      if (item.chk) item.chk.checked = (pct > 0);
      if (item.slider) item.slider.value = pct;
      if (item.valEl) item.valEl.textContent = `${pct}%`;
    });

    syncAssetPillsAndSliders();
    updateAllocSum();
    calculateAndRender();
    isAutoBalancing = false;
  }

  if (presetAllocSelect) {
    presetAllocSelect.addEventListener('change', () => {
      if (presetAllocSelect.value !== 'custom') {
        applyAllocPreset(presetAllocSelect.value);
      }
    });
  }

  // Trading Frequency Sliders & Badges
  function updateTradingSummaryBadge() {
    const uk = Number(tradesUk.value) || 0;
    const overseas = Number(tradesOverseas.value) || 0;
    if (tradingSummaryBadge) {
      tradingSummaryBadge.textContent = `${uk} UK trade${uk === 1 ? '' : 's'} / mo • ${overseas} overseas`;
    }
  }

  tradesUk.addEventListener('input', () => {
    valTradesUk.textContent = `${tradesUk.value} / mo`;
    updateTradingSummaryBadge();
    calculateAndRender();
  });

  tradesFunds.addEventListener('input', () => {
    valTradesFunds.textContent = `${tradesFunds.value} / mo`;
    calculateAndRender();
  });

  tradesOverseas.addEventListener('input', () => {
    valTradesOverseas.textContent = `${tradesOverseas.value} / mo`;
    updateTradingSummaryBadge();
    calculateAndRender();
  });

  tradeSizeOverseas.addEventListener('input', calculateAndRender);

  // Pension Rules & Badges
  function updatePensionSummaryBadge() {
    const hasEmployer = sippEmployerContrib.checked;
    const mode = pensionWithdrawal.value;
    let modeText = 'Accumulation';
    if (mode === 'flexible_drawdown') modeText = 'Drawdown';
    else if (mode === 'lump_sum') modeText = 'UFPLS';
    else if (mode === 'annuity') modeText = 'Annuity';

    if (pensionSummaryBadge) {
      pensionSummaryBadge.textContent = `${hasEmployer ? 'Employer contrib.' : 'No employer contributions'} • ${modeText}`;
    }
  }

  sippEmployerContrib.addEventListener('change', () => {
    if (sippEmployerContrib.checked) {
      employerContribWarning.classList.remove('hidden');
    } else {
      employerContribWarning.classList.add('hidden');
    }
    updatePensionSummaryBadge();
    calculateAndRender();
  });

  pensionWithdrawal.addEventListener('change', () => {
    updatePensionSummaryBadge();
    calculateAndRender();
  });

  // Horizon & Return Sliders & Badges
  function updateHorizonSummaryBadge() {
    const h = horizonYears.value;
    const r = Number(expectedReturn.value).toFixed(1);
    if (horizonSummaryBadge) {
      horizonSummaryBadge.textContent = `${h} years • ${r}% annual return`;
    }
  }

  horizonYears.addEventListener('input', () => {
    valHorizonDisplay.textContent = `${horizonYears.value} yrs`;
    updateHorizonSummaryBadge();
    calculateAndRender();
  });

  expectedReturn.addEventListener('input', () => {
    valReturnDisplay.textContent = `${Number(expectedReturn.value).toFixed(1)}%`;
    updateHorizonSummaryBadge();
    calculateAndRender();
  });

  // Account Checkboxes & Monthly Inputs
  function syncAccountInputs(checkbox, input) {
    if (!checkbox || !input) return;
    input.disabled = !checkbox.checked;
    if (!checkbox.checked) {
      input.classList.add('opacity-40');
    } else {
      input.classList.remove('opacity-40');
    }
  }

  [
    { chk: accountIsa, inp: lumpIsa },
    { chk: accountSipp, inp: lumpSipp },
    { chk: accountGia, inp: lumpGia },
    { chk: monthlyCheckIsa, inp: monthlyIsa },
    { chk: monthlyCheckSipp, inp: monthlySipp },
    { chk: monthlyCheckGia, inp: monthlyGia }
  ].forEach(({ chk, inp }) => {
    if (chk && inp) {
      syncAccountInputs(chk, inp);
      chk.addEventListener('change', () => {
        syncAccountInputs(chk, inp);
        calculateAndRender();
      });
      inp.addEventListener('input', calculateAndRender);
    }
  });

  // Read Current User Inputs
  function getCurrentInputs() {
    const isaLump = (accountIsa && accountIsa.checked) ? (Number(lumpIsa.value) || 0) : 0;
    const sippLump = (accountSipp && accountSipp.checked) ? (Number(lumpSipp.value) || 0) : 0;
    const giaLump = (accountGia && accountGia.checked) ? (Number(lumpGia.value) || 0) : 0;

    const isaM = (monthlyCheckIsa && monthlyCheckIsa.checked) ? (Number(monthlyIsa.value) || 0) : 0;
    const sippM = (monthlyCheckSipp && monthlyCheckSipp.checked) ? (Number(monthlySipp.value) || 0) : 0;
    const giaM = (monthlyCheckGia && monthlyCheckGia.checked) ? (Number(monthlyGia.value) || 0) : 0;

    return {
      accounts: {
        isa: !!(accountIsa && accountIsa.checked),
        sipp: !!(accountSipp && accountSipp.checked),
        gia: !!(accountGia && accountGia.checked)
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
        ukSharesPct: (chkUkShares && chkUkShares.checked) ? (Number(allocUkShares.value) || 0) : 0,
        etfsPct: (chkEtfs && chkEtfs.checked) ? (Number(allocEtfs.value) || 0) : 0,
        fundsPct: (chkFunds && chkFunds.checked) ? (Number(allocFunds.value) || 0) : 0,
        investmentTrustsPct: (chkIt && chkIt.checked) ? (Number(allocIt.value) || 0) : 0,
        usStocksPct: (chkUs && chkUs.checked) ? (Number(allocUs.value) || 0) : 0,
        europeanStocksPct: (chkEu && chkEu.checked) ? (Number(allocEu.value) || 0) : 0
      },
      tradingFrequency: {
        ukShareTradesPerYear: (Number(tradesUk.value) || 0) * 12,
        fundTradesPerYear: (Number(tradesFunds.value) || 0) * 12,
        overseasTradesPerYear: (Number(tradesOverseas.value) || 0) * 12,
        avgOverseasTradeSize: Number(tradeSizeOverseas.value) || 1000
      },
      sippEmployerContrib: !!(sippEmployerContrib && sippEmployerContrib.checked),
      pensionWithdrawal: pensionWithdrawal.value,
      horizonYears: Number(horizonYears.value) || 10,
      expectedReturnRate: (Number(expectedReturn.value) || 6) / 100
    };
  }

  // Monthly / Annual Toggle Controls
  if (toggleViewMonthly) {
    toggleViewMonthly.addEventListener('click', () => {
      costViewMode = 'monthly';
      toggleViewMonthly.classList.add('active');
      toggleViewAnnual.classList.remove('active');
      calculateAndRender();
    });
  }

  if (toggleViewAnnual) {
    toggleViewAnnual.addEventListener('click', () => {
      costViewMode = 'annual';
      toggleViewAnnual.classList.add('active');
      toggleViewMonthly.classList.remove('active');
      calculateAndRender();
    });
  }

  // Modals Interactions: Eligibility Reasons
  function openEligibilityReasonsModal() {
    if (!modalEligibilityReasons) return;
    if (modalExcludedList) {
      if (currentExcludedPlatforms.length === 0) {
        modalExcludedList.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800">
            🎉 All 6 major UK platforms fully support your current investment selection!
          </div>
        `;
      } else {
        modalExcludedList.innerHTML = currentExcludedPlatforms.map(ex => {
          const isMonthly = (costViewMode === 'monthly');
          const costVal = isMonthly ? (ex.yearOneTotalFee / 12) : ex.yearOneTotalFee;
          const costSuffix = isMonthly ? '/ mo' : '/ yr';
          return `
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  ${getPlatformBrandHtml(ex.platform.id, ex.platform.name)}
                  <span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">Excluded</span>
                </div>
                <span class="text-xs text-slate-400 line-through font-semibold">${formatGbp(costVal)} ${costSuffix}</span>
              </div>
              <ul class="text-xs text-red-600 list-disc list-inside space-y-1">
                ${ex.compatibility.disqualifiers.map(d => `<li><strong>${d}</strong></li>`).join('')}
              </ul>
              <p class="text-[11px] text-slate-500">${ex.platform.notPermittedDetails || ''}</p>
            </div>
          `;
        }).join('');
      }
    }
    modalEligibilityReasons.classList.remove('hidden');
    modalEligibilityReasons.classList.add('flex');
  }

  function closeEligibilityReasonsModal() {
    if (!modalEligibilityReasons) return;
    modalEligibilityReasons.classList.add('hidden');
    modalEligibilityReasons.classList.remove('flex');
  }

  if (btnViewReasonsLink) btnViewReasonsLink.addEventListener('click', openEligibilityReasonsModal);
  if (btnViewReasonsCard) btnViewReasonsCard.addEventListener('click', openEligibilityReasonsModal);
  if (btnCloseReasonsModal) btnCloseReasonsModal.addEventListener('click', closeEligibilityReasonsModal);
  if (btnCloseReasonsModalBottom) btnCloseReasonsModalBottom.addEventListener('click', closeEligibilityReasonsModal);

  // Modals Interactions: Trade-offs
  const TRADEOFF_CONTENTS = {
    'flat-vs-pct': {
      title: 'Flat Fees vs Percentage Fees Crossover',
      body: `
        <p><strong>The Core Principle:</strong> Most UK brokers charge an ongoing custody fee either as a percentage of your portfolio (e.g. <strong>Vanguard 0.15%</strong>, <strong>AJ Bell 0.25%</strong>, <strong>Hargreaves Lansdown 0.45%</strong>) or as a flat subscription fee (e.g. <strong>Interactive Investor at £143.88/year</strong>).</p>
        <p><strong>The Tipping Point:</strong> When your portfolio is under <strong>£30,000 - £50,000</strong>, percentage brokers are almost always cheaper. However, as your wealth compounds past <strong>£60,000 to £100,000+</strong>, Interactive Investor's flat subscription or AJ Bell's £42/year share cap saves hundreds of pounds per year compared to uncapped percentage models.</p>
        <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
          💡 Check out the <strong>"Compounding & Crossover" tab</strong> at the top to see your personal crossover curve visualized across all pot sizes!
        </div>
      `
    },
    'sipp-contrib': {
      title: 'Employer & Company Director SIPP Contributions',
      body: `
        <p><strong>Critical UK Tax Rule:</strong> If you operate through a UK Limited Company, contributing pre-tax profit directly into your personal pension is one of the most tax-efficient strategies available. It saves Corporation Tax and incurs zero National Insurance.</p>
        <p><strong>Platform Incompatibility Alert:</strong> Not all brokers accept employer contributions! Specifically:</p>
        <ul class="list-disc list-inside space-y-1 text-slate-700 pl-2">
          <li><strong>Vanguard UK Investor:</strong> Personal member contributions only. Does NOT accept employer payments.</li>
          <li><strong>Trading 212 SIPP:</strong> Personal direct debit / debit card only. Does NOT accept employer payments.</li>
          <li><strong>AJ Bell, Interactive Investor, Fidelity & HL:</strong> Fully support Ltd Company employer payments with online or paper forms.</li>
        </ul>
      `
    },
    'fx-drag': {
      title: 'Overseas Trading & Foreign Exchange Drag',
      body: `
        <p><strong>Hidden FX Fees:</strong> If you trade US tech stocks (Nvidia, Apple, Microsoft) or European shares, foreign exchange (FX) fees can quickly become your largest ongoing cost.</p>
        <p><strong>How Providers Compare:</strong></p>
        <ul class="list-disc list-inside space-y-1 text-slate-700 pl-2">
          <li><strong>Trading 212:</strong> Just <strong>0.15% FX</strong> — by far the lowest in the UK retail market.</li>
          <li><strong>Interactive Investor:</strong> 0.99% standard, but offers <strong>multi-currency accounts</strong> allowing you to hold USD directly and eliminate repeat FX fees on US sales.</li>
          <li><strong>AJ Bell & Fidelity:</strong> 0.75% FX fee.</li>
          <li><strong>Hargreaves Lansdown:</strong> 1.00% FX fee on transactions under £5,000.</li>
        </ul>
      `
    }
  };

  function openTradeoffModal(type) {
    const data = TRADEOFF_CONTENTS[type];
    if (!data || !modalTradeOffs) return;
    if (modalTradeoffTitle) modalTradeoffTitle.textContent = data.title;
    if (modalTradeoffBody) modalTradeoffBody.innerHTML = data.body;
    modalTradeOffs.classList.remove('hidden');
    modalTradeOffs.classList.add('flex');
  }

  function closeTradeoffModal() {
    if (!modalTradeOffs) return;
    modalTradeOffs.classList.add('hidden');
    modalTradeOffs.classList.remove('flex');
  }

  document.querySelectorAll('.tradeoff-link').forEach(link => {
    link.addEventListener('click', () => {
      openTradeoffModal(link.dataset.tradeoff);
    });
  });

  if (btnCloseTradeoffModal) btnCloseTradeoffModal.addEventListener('click', closeTradeoffModal);
  if (btnCloseTradeoffModalBottom) btnCloseTradeoffModalBottom.addEventListener('click', closeTradeoffModal);

  // Tabs Switching
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      navTabs.forEach(t => {
        t.classList.remove('active-tab', 'text-slate-900', 'border-b-2', 'border-emerald-600');
        t.classList.add('text-slate-500');
      });
      tab.classList.add('active-tab', 'text-slate-900', 'border-b-2', 'border-emerald-600');
      tab.classList.remove('text-slate-500');

      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });

      if (targetId === 'tab-charts') {
        setTimeout(() => {
          if (compoundingDragChart) compoundingDragChart.resize();
          if (crossoverChart) crossoverChart.resize();
        }, 50);
      }
    });
  });

  // Reset to Defaults (Mockup defaults)
  btnReset.addEventListener('click', () => {
    accountIsa.checked = true;
    accountSipp.checked = true;
    accountGia.checked = false;
    lumpIsa.value = 25000;
    lumpSipp.value = 15000;
    lumpGia.value = 0;

    monthlyCheckIsa.checked = true;
    monthlyCheckSipp.checked = true;
    monthlyCheckGia.checked = false;
    monthlyIsa.value = 250;
    monthlySipp.value = 150;
    monthlyGia.value = 0;

    syncAccountInputs(accountIsa, lumpIsa);
    syncAccountInputs(accountSipp, lumpSipp);
    syncAccountInputs(accountGia, lumpGia);
    syncAccountInputs(monthlyCheckIsa, monthlyIsa);
    syncAccountInputs(monthlyCheckSipp, monthlySipp);
    syncAccountInputs(monthlyCheckGia, monthlyGia);

    tradesUk.value = 1;
    valTradesUk.textContent = '1 / mo';
    tradesFunds.value = 0;
    valTradesFunds.textContent = '0 / mo';
    tradesOverseas.value = 0;
    valTradesOverseas.textContent = '0 / mo';
    tradeSizeOverseas.value = 1000;

    sippEmployerContrib.checked = false;
    employerContribWarning.classList.add('hidden');
    pensionWithdrawal.value = 'accumulation';

    horizonYears.value = 10;
    valHorizonDisplay.textContent = '10 yrs';
    expectedReturn.value = 6;
    valReturnDisplay.textContent = '6.0%';

    presetAllocSelect.value = 'balanced';
    applyAllocPreset('balanced');

    updateTradingSummaryBadge();
    updatePensionSummaryBadge();
    updateHorizonSummaryBadge();

    calculateAndRender();
  });

  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  // MAIN CALCULATION & RENDERING LOOP
  function calculateAndRender() {
    try {
      if (typeof PlatformCalculator === 'undefined' || !PlatformCalculator.compareAllPlatforms) {
        console.error('PlatformCalculator engine not ready yet.');
        return;
      }

      const inputs = getCurrentInputs();

      // Dynamic summary labels
      const totalLump = inputs.lumpSums.isa + inputs.lumpSums.sipp + inputs.lumpSums.gia;
      const totalMonthly = inputs.monthlyContrib.isa + inputs.monthlyContrib.sipp + inputs.monthlyContrib.gia;
      if (totalLumpDisplay) totalLumpDisplay.textContent = `Total: ${formatGbpInt(totalLump)}`;
      if (totalMonthlyDisplay) totalMonthlyDisplay.textContent = `Total: ${formatGbpInt(totalMonthly)} / mo`;
      if (profileSummaryText) {
        profileSummaryText.textContent = `${formatGbpInt(totalLump)} invested • ${formatGbpInt(totalMonthly)} monthly • ${inputs.horizonYears}-year horizon`;
      }

      // Execute Comparison Engine
      const rankedPlatforms = PlatformCalculator.compareAllPlatforms(inputs);
      currentExcludedPlatforms = rankedPlatforms.excludedPlatforms || [];

      // 1. Render Sub-bar & Highlight Banner
      renderStatusAndHighlight(rankedPlatforms);

      // 2. Render Platform Leaderboard Cards
      renderPlatformCards(rankedPlatforms);

      // 3. Render Excluded Platforms Banner
      renderExcludedBanner(currentExcludedPlatforms);

      // 4. Render Fee Breakdown Table
      renderBreakdownTable(rankedPlatforms);

      // 5. Render Charts
      renderCharts(rankedPlatforms, inputs);

      // Refresh Lucide Icons
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error('Calculation and rendering failed:', err);
    }
  }

  // Render Sub-bar & Lowest Cost Highlight Banner
  function renderStatusAndHighlight(rankedPlatforms) {
    const compCount = rankedPlatforms.length;
    const exclCount = currentExcludedPlatforms.length;

    if (statusEligibleCount) {
      statusEligibleCount.innerHTML = `
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
        <span>${compCount} eligible platform${compCount === 1 ? '' : 's'}</span>
      `;
    }

    if (statusExcludedText) {
      statusExcludedText.textContent = `${exclCount} excluded`;
    }

    if (lowestCostBanner) {
      if (compCount >= 2) {
        const lowest = rankedPlatforms[0];
        const highest = rankedPlatforms[compCount - 1];
        const diff = highest.yearOneTotalFee - lowest.yearOneTotalFee;
        lowestCostBanner.classList.remove('hidden');
        if (bannerLowestTitle) bannerLowestTitle.textContent = `Lowest estimated cost: ${lowest.platform.name}`;
        if (bannerLowestDesc) {
          bannerLowestDesc.textContent = `£${diff.toFixed(2)} / year less than the highest-cost eligible platform (${highest.yearOneTotalFee.toFixed(2)} minus ${lowest.yearOneTotalFee.toFixed(2)}).`;
        }
      } else if (compCount === 1) {
        lowestCostBanner.classList.remove('hidden');
        const lowest = rankedPlatforms[0];
        if (bannerLowestTitle) bannerLowestTitle.textContent = `Lowest estimated cost: ${lowest.platform.name}`;
        if (bannerLowestDesc) {
          bannerLowestDesc.textContent = `Sole qualifying platform based on your exact criteria. Year 1 cost: ${formatGbp(lowest.yearOneTotalFee)}.`;
        }
      } else {
        lowestCostBanner.classList.add('hidden');
      }
    }
  }

  // Render Platform Cards matching Mockup
  function renderPlatformCards(rankedPlatforms) {
    if (!platformCardsContainer) return;
    platformCardsContainer.innerHTML = '';

    const isMonthly = (costViewMode === 'monthly');

    if (rankedPlatforms.length === 0) {
      platformCardsContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
          <i data-lucide="alert-circle" class="w-8 h-8 text-amber-600 mx-auto"></i>
          <h4 class="font-bold text-amber-900 text-sm">No platforms satisfy this exact combination</h4>
          <p class="text-xs text-amber-800">Please review your selected investment types or employer contribution option in the left panel.</p>
        </div>
      `;
      return;
    }

    rankedPlatforms.forEach((result, idx) => {
      const p = result.platform;
      const isWinner = (idx === 0);
      const rankNumStr = String(idx + 1).padStart(2, '0');

      const monthlyCost = result.yearOneTotalFee / 12;
      const annualCost = result.yearOneTotalFee;

      const monthlyPlatform = result.totalPlatformFee / 12;
      const annualPlatform = result.totalPlatformFee;

      const monthlyDealing = result.totalDealingFee / 12;
      const annualDealing = result.totalDealingFee;

      const monthlyRegular = result.regularInvestingFee / 12;
      const annualRegular = result.regularInvestingFee;

      const monthlyFx = result.fxFee / 12;
      const annualFx = result.fxFee;

      const card = document.createElement('div');
      card.className = `platform-card bg-white rounded-xl p-4 space-y-3.5 shadow-2xs ${
        isWinner ? 'winner-card' : 'border border-slate-200'
      }`;

      if (isWinner) {
        // Winner Card Layout
        card.innerHTML = `
          <!-- Top Row: Badge 01 Lowest cost & Cost Display -->
          <div class="flex items-center justify-between">
            <span class="bg-[#fef9c3] text-[#854d0e] border border-[#fef08a] text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
              <span>🏆</span>
              <span>01 · Lowest cost</span>
            </span>
            <div class="text-right">
              <div class="text-xl sm:text-2xl font-black text-slate-900">
                ${formatGbp(isMonthly ? monthlyCost : annualCost)} <span class="text-xs font-semibold text-slate-500">${isMonthly ? '/ month' : '/ year'}</span>
              </div>
              <span class="text-[11px] text-slate-500 block">
                ${isMonthly ? `${formatGbp(annualCost)} / year` : `${formatGbp(monthlyCost)} / month`} • <span class="text-emerald-700 font-semibold">${result.effectiveFeePct.toFixed(2)}% fee drag</span>
              </span>
            </div>
          </div>

          <!-- Platform Logo & Subtitle -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            ${getPlatformBrandHtml(p.id, p.name)}
            <span class="text-xs text-slate-500 font-medium">${p.badge}</span>
          </div>

          <!-- 4 Metrics with vertical dividers -->
          <div class="grid grid-cols-2 sm:grid-cols-4 pt-2 border-t border-slate-100 text-xs">
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">Platform</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyPlatform : annualPlatform)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">Dealing</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyDealing : annualDealing)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">Regular investing</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyRegular : annualRegular)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">FX</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyFx : annualFx)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
          </div>

          <!-- Bottom Row: Criteria Match, 5-Yr Fees, Accordion, Visit Button -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div class="flex items-center gap-3">
              <span class="text-emerald-700 font-bold flex items-center gap-1">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
                <span>Meets all selected criteria</span>
              </span>
              <span class="text-slate-700 font-medium">5-year fees <strong>${formatGbpInt(result.fiveYearCost)}</strong></span>
            </div>
            <div class="flex items-center gap-3 self-end sm:self-auto">
              <button class="btn-toggle-drawer text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 transition">
                <span>Pros, cons & highlights</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>
              <a href="${p.officialUrl}" target="_blank" rel="noopener noreferrer" class="bg-[#064e3b] hover:bg-[#043d2e] text-white px-3.5 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 shadow-2xs transition">
                <span>Visit platform</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>

          <!-- Collapsible Drawer -->
          <div class="pros-cons-drawer hidden pt-3 border-t border-slate-100 space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <span class="text-slate-400 block font-medium">Cash Interest:</span>
                <span class="font-semibold text-slate-800">${p.features.interestOnCash}</span>
              </div>
              <div>
                <span class="text-slate-400 block font-medium">Support:</span>
                <span class="font-semibold text-slate-800">${p.features.customerService}</span>
              </div>
              <div>
                <span class="text-slate-400 block font-medium">App Rating:</span>
                <span class="font-semibold text-slate-800">${p.features.mobileAppRating}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        // Cards 02, 03, 04... Layout
        card.innerHTML = `
          <!-- Top Row: Rank Number & Cost Display -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-slate-700 w-5">${rankNumStr}</span>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                ${getPlatformBrandHtml(p.id, p.name)}
                <span class="text-xs text-slate-500 font-medium">${p.badge}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xl sm:text-2xl font-black text-slate-900">
                ${formatGbp(isMonthly ? monthlyCost : annualCost)} <span class="text-xs font-semibold text-slate-500">${isMonthly ? '/ month' : '/ year'}</span>
              </div>
              <span class="text-[11px] text-slate-500 block">
                ${isMonthly ? `${formatGbp(annualCost)} / year` : `${formatGbp(monthlyCost)} / month`} • <span class="text-slate-600 font-medium">${result.effectiveFeePct.toFixed(2)}% fee drag</span>
              </span>
            </div>
          </div>

          <!-- 4 Metrics with vertical dividers -->
          <div class="grid grid-cols-2 sm:grid-cols-4 pt-2 border-t border-slate-100 text-xs">
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">Platform</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyPlatform : annualPlatform)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">Dealing</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyDealing : annualDealing)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">Regular investing</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyRegular : annualRegular)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
            <div class="metric-divider p-2 text-center">
              <span class="text-[11px] text-slate-400 font-medium block">FX</span>
              <span class="font-bold text-slate-800 text-sm">${formatGbp(isMonthly ? monthlyFx : annualFx)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
            </div>
          </div>

          <!-- Bottom Row: Criteria Match, 5-Yr Fees, Accordion, Visit Link -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div class="flex items-center gap-3">
              <span class="text-emerald-700 font-bold flex items-center gap-1">
                <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
                <span>Criteria match</span>
              </span>
              <span class="text-slate-700 font-medium">5-year fees <strong>${formatGbpInt(result.fiveYearCost)}</strong></span>
            </div>
            <div class="flex items-center gap-3 self-end sm:self-auto">
              <button class="btn-toggle-drawer text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 transition">
                <span>Pros, cons & highlights</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>
              <a href="${p.officialUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 transition">
                <span>Visit platform</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400"></i>
              </a>
            </div>
          </div>

          <!-- Collapsible Drawer -->
          <div class="pros-cons-drawer hidden pt-3 border-t border-slate-100 space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <span class="text-slate-400 block font-medium">Cash Interest:</span>
                <span class="font-semibold text-slate-800">${p.features.interestOnCash}</span>
              </div>
              <div>
                <span class="text-slate-400 block font-medium">Support:</span>
                <span class="font-semibold text-slate-800">${p.features.customerService}</span>
              </div>
              <div>
                <span class="text-slate-400 block font-medium">App Rating:</span>
                <span class="font-semibold text-slate-800">${p.features.mobileAppRating}</span>
              </div>
            </div>
          </div>
        `;
      }

      // Attach Toggle Event to Drawer
      const toggleBtn = card.querySelector('.btn-toggle-drawer');
      const drawer = card.querySelector('.pros-cons-drawer');
      if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', () => {
          const isClosed = drawer.classList.contains('hidden');
          if (isClosed) {
            drawer.classList.remove('hidden');
            toggleBtn.querySelector('i')?.classList.add('rotate-180');
          } else {
            drawer.classList.add('hidden');
            toggleBtn.querySelector('i')?.classList.remove('rotate-180');
          }
        });
      }

      platformCardsContainer.appendChild(card);
    });
  }

  // Render Amber Excluded Platforms Banner
  function renderExcludedBanner(excluded) {
    if (!excludedPlatformsBanner) return;
    if (excluded.length === 0) {
      excludedPlatformsBanner.classList.add('hidden');
      return;
    }

    excludedPlatformsBanner.classList.remove('hidden');
    if (excludedBannerTitle) {
      excludedBannerTitle.textContent = `${excluded.length} platform${excluded.length === 1 ? '' : 's'} excluded`;
    }
    if (excludedBannerList) {
      excludedBannerList.textContent = excluded.map(ex => ex.platform.name).join(' • ');
    }
  }

  // Render Fee Breakdown Table
  function renderBreakdownTable(rankedPlatforms) {
    if (!tableBreakdownBody) return;
    tableBreakdownBody.innerHTML = '';

    rankedPlatforms.forEach((res, idx) => {
      const isWinner = (idx === 0);
      const row = document.createElement('tr');
      row.className = isWinner ? 'bg-emerald-50/60 font-bold' : (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50');

      row.innerHTML = `
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-full ${isWinner ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'} text-[10px] font-bold flex items-center justify-center">
              ${idx + 1}
            </span>
            <span class="font-bold text-slate-900">${res.platform.name}</span>
          </div>
        </td>
        <td class="py-2.5 px-3 text-right text-slate-700">${formatGbp(res.accountFees.isa)}</td>
        <td class="py-2.5 px-3 text-right text-slate-700">${formatGbp(res.accountFees.sipp)}</td>
        <td class="py-2.5 px-3 text-right text-slate-700">${formatGbp(res.totalDealingFee)}</td>
        <td class="py-2.5 px-3 text-right text-slate-700">${formatGbp(res.regularInvestingFee)}</td>
        <td class="py-2.5 px-3 text-right text-slate-700">${formatGbp(res.fxFee)}</td>
        <td class="py-2.5 px-3 text-right ${isWinner ? 'text-emerald-700 bg-emerald-100/50' : 'text-slate-900 bg-emerald-50/30'} font-extrabold">
          <div>${formatGbp(res.yearOneTotalFee)}</div>
          <div class="text-[10px] text-slate-500 font-normal">${formatGbp(res.yearOneTotalFee / 12)}/mo</div>
        </td>
        <td class="py-2.5 px-3 text-right font-bold text-slate-800">
          ${formatGbpInt(res.fiveYearCost)}
        </td>
      `;

      tableBreakdownBody.appendChild(row);
    });
  }

  // Render Charts
  function renderCharts(rankedPlatforms, inputs) {
    if (typeof Chart === 'undefined') return;

    // 1. Compounding Drag Chart
    const horizon = inputs.horizonYears;
    const yearLabels = Array.from({ length: horizon }, (_, i) => `Yr ${i + 1}`);

    const compoundingDatasets = rankedPlatforms.map(res => {
      const data = res.multiYearProjection.map(p => p.cumulativeLostGrowth + p.cumulativeFees);
      return {
        label: res.platform.shortName,
        data: data,
        borderColor: res.platform.logoColor,
        backgroundColor: res.platform.logoColor + '15',
        borderWidth: res.rank === 1 ? 3 : 1.5,
        tension: 0.2,
        pointRadius: 2
      };
    });

    const canvasCompounding = document.getElementById('chart-compounding-drag');
    if (canvasCompounding) {
      const ctxCompounding = canvasCompounding.getContext('2d');
      if (compoundingDragChart) compoundingDragChart.destroy();
      compoundingDragChart = new Chart(ctxCompounding, {
        type: 'line',
        data: { labels: yearLabels, datasets: compoundingDatasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10, family: 'Inter' } } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: £${Math.round(ctx.raw).toLocaleString()} total fee drag`
              }
            }
          },
          scales: {
            y: { ticks: { callback: (v) => `£${Number(v).toLocaleString()}` }, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 2. Fee Crossover Curve by Pot Size
    const crossoverData = PlatformCalculator.generateCrossoverData(inputs);
    const crossoverDatasets = crossoverData.datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.borderColor,
      backgroundColor: ds.borderColor + '10',
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 2
    }));

    const canvasCrossover = document.getElementById('chart-crossover');
    if (canvasCrossover) {
      const ctxCrossover = canvasCrossover.getContext('2d');
      if (crossoverChart) crossoverChart.destroy();
      crossoverChart = new Chart(ctxCrossover, {
        type: 'line',
        data: { labels: crossoverData.labels, datasets: crossoverDatasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10, family: 'Inter' } } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: £${Math.round(ctx.raw).toLocaleString()}/yr`
              }
            }
          },
          scales: {
            y: { ticks: { callback: (v) => `£${Number(v).toLocaleString()}` }, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  }

  // Visitor Counter Tracking
  function initVisitorCounter() {
    const countDisplay = document.getElementById('visitor-count-number');
    if (!countDisplay) return;

    const BASE_VISITS = 1284;
    let totalVisits = parseInt(localStorage.getItem('uk_platform_advisor_visits'), 10);
    if (isNaN(totalVisits) || totalVisits < BASE_VISITS) {
      totalVisits = BASE_VISITS;
    }

    const isCountedSession = sessionStorage.getItem('uk_platform_advisor_session_counted');
    if (!isCountedSession) {
      totalVisits += 1;
      localStorage.setItem('uk_platform_advisor_visits', totalVisits.toString());
      sessionStorage.setItem('uk_platform_advisor_session_counted', 'true');
    }

    // Immediately display formatted count
    countDisplay.textContent = totalVisits.toLocaleString();

    // Background sync with online visitor counter
    fetch('https://api.visitorbadge.io/api/visitors?path=anildutta007-uk-platform-advisor')
      .then(res => res.text())
      .then(svgText => {
        const match = svgText.match(/<text[^>]*font-weight="bold"[^>]*>(\d+)<\/text>/i) ||
                      svgText.match(/<title>VISITORS:\s*(\d+)<\/title>/i) ||
                      svgText.match(/aria-label="VISITORS:\s*(\d+)"/i);
        if (match && match[1]) {
          const remoteHits = parseInt(match[1], 10);
          if (!isNaN(remoteHits) && remoteHits > 0) {
            const combinedCount = BASE_VISITS + remoteHits;
            if (combinedCount > totalVisits) {
              totalVisits = combinedCount;
              localStorage.setItem('uk_platform_advisor_visits', totalVisits.toString());
              countDisplay.textContent = totalVisits.toLocaleString();
            }
          }
        }
      })
      .catch(() => {
        // Fallback gracefully to local stored count
      });
  }

  // Initialize Application
  initVisitorCounter();
  syncAssetPillsAndSliders();
  updateAllocSum();
  updateTradingSummaryBadge();
  updatePensionSummaryBadge();
  updateHorizonSummaryBadge();
  calculateAndRender();
});
