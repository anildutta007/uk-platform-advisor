/**
 * UK Investment Platform Advisor - Frontend Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // State
  let costViewMode = 'monthly'; // 'monthly' | 'annual'

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

  // Asset Checkboxes and Cards
  const chkUkShares = document.getElementById('chk-uk-shares');
  const chkEtfs = document.getElementById('chk-etfs');
  const chkFunds = document.getElementById('chk-funds');
  const chkIt = document.getElementById('chk-it');
  const chkUs = document.getElementById('chk-us');
  const chkEu = document.getElementById('chk-eu');

  const cardUkShares = document.getElementById('card-chk-ukShares');
  const cardEtfs = document.getElementById('card-chk-etfs');
  const cardFunds = document.getElementById('card-chk-funds');
  const cardIt = document.getElementById('card-chk-investmentTrusts');
  const cardUs = document.getElementById('card-chk-usStocks');
  const cardEu = document.getElementById('card-chk-europeanStocks');

  const rowUkShares = document.getElementById('slider-row-ukShares');
  const rowEtfs = document.getElementById('slider-row-etfs');
  const rowFunds = document.getElementById('slider-row-funds');
  const rowIt = document.getElementById('slider-row-investmentTrusts');
  const rowUs = document.getElementById('slider-row-usStocks');
  const rowEu = document.getElementById('slider-row-europeanStocks');

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
      tradesUk: 1,
      tradesFunds: 0,
      tradesOverseas: 0,
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
      tradesUk: 1,
      tradesFunds: 0,
      tradesOverseas: 1,
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
      tradesUk: 3,
      tradesFunds: 0,
      tradesOverseas: 4,
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
      tradesFunds: 0,
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
      tradesUk: 2,
      tradesFunds: 1,
      tradesOverseas: 1,
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

  // Asset items definition tying checkboxes, cards, row containers and sliders
  const ASSET_ITEMS = [
    { key: 'ukShares', chk: chkUkShares, card: cardUkShares, row: rowUkShares, slider: allocUkShares, valEl: valUkShares, name: 'UK Shares' },
    { key: 'etfs', chk: chkEtfs, card: cardEtfs, row: rowEtfs, slider: allocEtfs, valEl: valEtfs, name: 'ETFs' },
    { key: 'funds', chk: chkFunds, card: cardFunds, row: rowFunds, slider: allocFunds, valEl: valFunds, name: 'Funds / OEICs' },
    { key: 'investmentTrusts', chk: chkIt, card: cardIt, row: rowIt, slider: allocIt, valEl: valIt, name: 'Investment Trusts' },
    { key: 'usStocks', chk: chkUs, card: cardUs, row: rowUs, slider: allocUs, valEl: valUs, name: 'US Stocks' },
    { key: 'europeanStocks', chk: chkEu, card: cardEu, row: rowEu, slider: allocEu, valEl: valEu, name: 'European Stocks' }
  ];

  let isAutoBalancing = false;

  function syncAssetCardsAndSliders() {
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
      if (item.card) {
        if (isChecked) {
          item.card.className = 'asset-card flex items-start gap-2 p-2.5 rounded-xl border border-brand-500 bg-brand-50/50 ring-1 ring-brand-500 cursor-pointer transition select-none';
        } else {
          item.card.className = 'asset-card flex items-start gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-brand-400 cursor-pointer transition select-none';
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
    const allocSumText = document.getElementById('alloc-sum-text');
    if (allocSumText) {
      allocSumText.textContent = `Total: ${sum}%`;
    }
    const allocSumDisplayElem = document.getElementById('alloc-sum-display');
    if (allocSumDisplayElem) {
      if (sum === 100) {
        allocSumDisplayElem.className = 'text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-sm';
      } else {
        allocSumDisplayElem.className = 'text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 shadow-sm';
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
          // Keep at least one checked
          item.chk.checked = true;
          return;
        }
        syncAssetCardsAndSliders();
        equalSplitActiveAssets();
      });
    }

    if (item.slider) {
      item.slider.addEventListener('input', () => {
        rebalanceAllocSliders(item.key);
      });
    }
  });

  // Quick allocation presets
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

    syncAssetCardsAndSliders();
    updateAllocSum();
    calculateAndRender();
    isAutoBalancing = false;
  }

  document.querySelectorAll('.alloc-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyAllocPreset(btn.dataset.alloc);
    });
  });

  const btnBalance100 = document.getElementById('btn-balance-100');
  if (btnBalance100) {
    btnBalance100.addEventListener('click', () => {
      equalSplitActiveAssets();
    });
  }

  // Trading frequency sliders (Monthly Basis)
  tradesUk.addEventListener('input', () => {
    valTradesUk.textContent = `${tradesUk.value} / mo`;
    calculateAndRender();
  });
  tradesFunds.addEventListener('input', () => {
    valTradesFunds.textContent = `${tradesFunds.value} / mo`;
    calculateAndRender();
  });
  tradesOverseas.addEventListener('input', () => {
    const v = Number(tradesOverseas.value);
    valTradesOverseas.textContent = v === 1 ? '1 trade / mo' : `${v} trades / mo`;
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

    ASSET_ITEMS.forEach(item => {
      let pct = 0;
      if (item.key === 'ukShares') pct = config.assetAllocation.ukSharesPct || 0;
      else if (item.key === 'etfs') pct = config.assetAllocation.etfsPct || 0;
      else if (item.key === 'funds') pct = config.assetAllocation.fundsPct || 0;
      else if (item.key === 'investmentTrusts') pct = config.assetAllocation.investmentTrustsPct || 0;
      else if (item.key === 'usStocks') pct = config.assetAllocation.usStocksPct || 0;
      else if (item.key === 'europeanStocks') pct = config.assetAllocation.europeanStocksPct || 0;

      if (item.chk) item.chk.checked = (pct > 0);
      if (item.slider) item.slider.value = pct;
      if (item.valEl) item.valEl.textContent = `${pct}%`;
    });
    syncAssetCardsAndSliders();

    tradesUk.value = config.tradesUk;
    valTradesUk.textContent = `${config.tradesUk} / mo`;
    tradesFunds.value = config.tradesFunds;
    valTradesFunds.textContent = `${config.tradesFunds} / mo`;
    tradesOverseas.value = config.tradesOverseas;
    valTradesOverseas.textContent = Number(config.tradesOverseas) === 1 ? '1 trade / mo' : `${config.tradesOverseas} trades / mo`;
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
    try {
      if (typeof PlatformCalculator === 'undefined' || !PlatformCalculator.compareAllPlatforms) {
        console.error('PlatformCalculator engine not ready yet.');
        return;
      }

      const inputs = getCurrentInputs();

      // Update summary badges
      const totalLump = inputs.lumpSums.isa + inputs.lumpSums.sipp + inputs.lumpSums.gia;
      const totalMonthly = inputs.monthlyContrib.isa + inputs.monthlyContrib.sipp + inputs.monthlyContrib.gia;
      if (totalPotDisplay) totalPotDisplay.textContent = `Total: ${formatGbpInt(totalLump)}`;
      if (totalMonthlyDisplay) totalMonthlyDisplay.textContent = `${formatGbpInt(totalMonthly)} / month`;

      // Run comparison engine
      const rankedPlatforms = PlatformCalculator.compareAllPlatforms(inputs);

      // 1. Render Platform Leaderboard Cards
      renderPlatformCards(rankedPlatforms);

      // 2. Render Fee Breakdown Table
      renderBreakdownTable(rankedPlatforms);

      // 3. Render Charts
      renderCharts(rankedPlatforms, inputs);

      // Refresh icons
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error('Calculation and rendering failed:', err);
    }
  }

  // Render Leaderboard Cards (Only completely compatible platforms)
  // Render Leaderboard Cards (Only completely compatible platforms)
  function renderPlatformCards(rankedPlatforms) {
    platformCardsContainer.innerHTML = '';

    const isMonthly = (costViewMode === 'monthly');

    // Render Live Compatibility Status Bar with Monthly/Annual View Toggle
    const statusBar = document.getElementById('compatibility-status-bar');
    if (statusBar) {
      const compCount = rankedPlatforms.length;
      const exclCount = rankedPlatforms.excludedPlatforms ? rankedPlatforms.excludedPlatforms.length : 0;
      statusBar.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shrink-0"></span>
          <span class="font-bold text-slate-800">
            Showing ${compCount} platform${compCount === 1 ? '' : 's'} that completely satisfy your criteria
          </span>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <!-- Toggle Monthly / Annual View -->
          <div class="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-[11px] font-semibold text-slate-600 shadow-2xs">
            <button id="toggle-view-monthly" class="px-2.5 py-1 rounded-md transition ${isMonthly ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
              Monthly View (/mo)
            </button>
            <button id="toggle-view-annual" class="px-2.5 py-1 rounded-md transition ${!isMonthly ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
              Annual View (/yr)
            </button>
          </div>
          ${exclCount > 0 ? `
            <span class="text-[11px] font-semibold text-slate-600 bg-slate-200/70 px-2.5 py-0.5 rounded-full">
              ${exclCount} platform${exclCount === 1 ? '' : 's'} excluded
            </span>
          ` : `
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i>
              <span>All platforms compatible</span>
            </span>
          `}
        </div>
      `;

      // Attach event listeners for Monthly/Annual toggle
      const btnMonthly = document.getElementById('toggle-view-monthly');
      const btnAnnual = document.getElementById('toggle-view-annual');
      if (btnMonthly) {
        btnMonthly.addEventListener('click', () => {
          costViewMode = 'monthly';
          renderPlatformCards(rankedPlatforms);
          renderBreakdownTable(rankedPlatforms);
          if (window.lucide) window.lucide.createIcons();
        });
      }
      if (btnAnnual) {
        btnAnnual.addEventListener('click', () => {
          costViewMode = 'annual';
          renderPlatformCards(rankedPlatforms);
          renderBreakdownTable(rankedPlatforms);
          if (window.lucide) window.lucide.createIcons();
        });
      }
    }

    if (rankedPlatforms.length === 0) {
      platformCardsContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
          <i data-lucide="alert-circle" class="w-8 h-8 text-amber-600 mx-auto"></i>
          <h4 class="font-bold text-amber-900">No platforms satisfy this exact combination</h4>
          <p class="text-xs text-amber-800">Please review your selected investments or account options above.</p>
        </div>
      `;
    } else {
      rankedPlatforms.forEach((result, idx) => {
        const p = result.platform;
        const isWinner = (idx === 0);

        const monthlyCost = result.yearOneTotalFee / 12;
        const monthlyPlatformFee = result.totalPlatformFee / 12;
        const monthlyDealingFee = result.totalDealingFee / 12;
        const monthlyRegularInv = result.regularInvestingFee / 12;
        const monthlyFx = result.fxFee / 12;

        const card = document.createElement('div');
        card.className = `platform-card bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all ${
          isWinner
            ? 'border-emerald-500 ring-2 ring-emerald-500/20'
            : 'border-slate-200'
        }`;

        // Badge logic
        let badgeHtml = '';
        if (isWinner) {
          badgeHtml = `<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <i data-lucide="trophy" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>#1 Best Recommendation</span>
          </span>`;
        } else {
          badgeHtml = `<span class="bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            Rank #${result.rank}
          </span>`;
        }

        // Key reason bullet
        const keyReasonHtml = result.keyReasons && result.keyReasons.length ? `
          <div class="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
            <i data-lucide="sparkle" class="w-4 h-4 text-brand-600 shrink-0 mt-0.5"></i>
            <span class="font-medium">${result.keyReasons[0].text}</span>
          </div>
        ` : '';

        // Universe pills for platform card (full text, no truncation)
        const assetKeys = [
          { key: 'ukShares', label: 'UK Shares' },
          { key: 'etfs', label: 'ETFs' },
          { key: 'funds', label: 'Funds / OEICs' },
          { key: 'investmentTrusts', label: 'Inv. Trusts' },
          { key: 'usStocks', label: 'US Stocks' },
          { key: 'europeanStocks', label: 'EU Stocks' }
        ];

        const universePills = assetKeys.map(a => {
          const perm = p.investmentPermissions && p.investmentPermissions[a.key];
          const allowed = perm ? perm.permitted : true;
          if (allowed) {
            return `
              <div class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 shadow-2xs" title="${perm?.detail || 'Allowed'}">
                <span class="font-medium text-emerald-900 text-[11px] whitespace-nowrap">${a.label}</span>
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
              </div>
            `;
          } else {
            return `
              <div class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 flex items-center gap-1.5 shadow-2xs" title="${perm?.detail || 'Not Permitted'}">
                <span class="font-normal text-slate-400 line-through text-[11px] whitespace-nowrap">${a.label}</span>
                <i data-lucide="minus" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              </div>
            `;
          }
        }).join('');

        card.innerHTML = `
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                ${badgeHtml}
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <i data-lucide="check-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                  <span>100% Satisfies Selected Criteria</span>
                </span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-100">
                  ${p.badge}
                </span>
              </div>
              <h4 class="text-lg font-bold text-slate-900">${p.name}</h4>
              <p class="text-xs text-slate-500">${p.tagline}</p>
            </div>

            <div class="text-right sm:border-l sm:border-slate-100 sm:pl-4 min-w-[145px]">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">${isMonthly ? 'Est. Monthly Cost' : 'Year 1 Total Cost'}</span>
              <div class="text-2xl font-black ${isWinner ? 'text-emerald-600' : 'text-slate-900'}">
                ${formatGbp(isMonthly ? monthlyCost : result.yearOneTotalFee)} <span class="text-xs font-semibold text-slate-500">${isMonthly ? '/ mo' : '/ yr'}</span>
              </div>
              <span class="text-[11px] text-slate-500 block">
                ${isMonthly ? `${formatGbp(result.yearOneTotalFee)} / yr` : `${formatGbp(monthlyCost)} / mo`} (${result.effectiveFeePct.toFixed(2)}% drag)
              </span>
            </div>
          </div>

          ${keyReasonHtml}

          <!-- Quick 4-box metrics (Monthly with Annual reference) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div class="bg-slate-50 p-2 rounded-lg text-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase block">Platform Fee</span>
              <span class="font-bold text-slate-800">${formatGbp(isMonthly ? monthlyPlatformFee : result.totalPlatformFee)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
              <span class="text-[10px] text-slate-400 block">${isMonthly ? `${formatGbp(result.totalPlatformFee)}/yr` : `${formatGbp(monthlyPlatformFee)}/mo`}</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-lg text-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase block">Dealing Fees</span>
              <span class="font-bold text-slate-800">${formatGbp(isMonthly ? monthlyDealingFee : result.totalDealingFee)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
              <span class="text-[10px] text-slate-400 block">${isMonthly ? `${formatGbp(result.totalDealingFee)}/yr` : `${formatGbp(monthlyDealingFee)}/mo`}</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-lg text-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase block">Regular Inv.</span>
              <span class="font-bold text-slate-800">${formatGbp(isMonthly ? monthlyRegularInv : result.regularInvestingFee)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
              <span class="text-[10px] text-slate-400 block">${isMonthly ? `${formatGbp(result.regularInvestingFee)}/yr` : `${formatGbp(monthlyRegularInv)}/mo`}</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-lg text-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase block">FX Fees</span>
              <span class="font-bold text-slate-800">${formatGbp(isMonthly ? monthlyFx : result.fxFee)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
              <span class="text-[10px] text-slate-400 block">${isMonthly ? `${formatGbp(result.fxFee)}/yr` : `${formatGbp(monthlyFx)}/mo`}</span>
            </div>
          </div>

          <!-- Investment Universe Permissions -->
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                <i data-lucide="layers" class="w-4 h-4 text-brand-600"></i>
                <span>Supported Asset Universe</span>
              </span>
              <span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i>
                <span>Permits All Your Selected Assets</span>
              </span>
            </div>

            <div class="flex flex-wrap gap-1.5 text-[11px]">
              ${universePills}
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

    // Render Excluded Platforms Drawer
    const excludedContainer = document.getElementById('excluded-platforms-container');
    if (excludedContainer) {
      const excluded = rankedPlatforms.excludedPlatforms || [];
      if (excluded.length > 0) {
        excludedContainer.innerHTML = `
          <details class="group bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs transition">
            <summary class="cursor-pointer font-bold text-slate-700 hover:text-slate-900 flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <i data-lucide="ban" class="w-4 h-4 text-slate-400"></i>
                <span>View ${excluded.length} Excluded Platform${excluded.length > 1 ? 's' : ''} (Not Meeting All Criteria)</span>
              </span>
              <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180 text-slate-400"></i>
            </summary>

            <div class="pt-3 space-y-2.5">
              <p class="text-[11px] text-slate-500">The following platforms cannot completely fulfill your portfolio because they do not permit one or more of your chosen investments or pension contribution types:</p>
              <div class="grid grid-cols-1 gap-2">
                ${excluded.map(ex => `
                  <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900">${ex.platform.name}</span>
                        <span class="text-[10px] text-red-700 bg-red-100 font-semibold px-2 py-0.5 rounded">Excluded</span>
                      </div>
                      <ul class="text-[11px] text-red-600 list-disc list-inside space-y-0.5 pt-1">
                        ${ex.compatibility.disqualifiers.map(d => `<li>${d}</li>`).join('')}
                      </ul>
                    </div>
                    <div class="text-right sm:border-l sm:border-slate-100 sm:pl-3 min-w-[120px]">
                      <span class="text-[10px] text-slate-400 uppercase font-semibold block">Indicative Cost</span>
                      <span class="font-bold text-slate-500 line-through">${formatGbp(isMonthly ? ex.yearOneTotalFee / 12 : ex.yearOneTotalFee)} <span class="text-[10px] font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
                      <span class="text-[10px] text-slate-400 block">${isMonthly ? `${formatGbp(ex.yearOneTotalFee)}/yr` : `${formatGbp(ex.yearOneTotalFee / 12)}/mo`}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </details>
        `;
      } else {
        excludedContainer.innerHTML = '';
      }
    }
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
          <div>${formatGbp(res.yearOneTotalFee)}</div>
          <div class="text-[10px] text-slate-500 font-normal">${formatGbp(res.yearOneTotalFee / 12)}/mo</div>
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
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js CDN is not loaded yet');
      return;
    }

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

    const canvasCompounding = document.getElementById('chart-compounding-drag');
    if (canvasCompounding) {
      const ctxCompounding = canvasCompounding.getContext('2d');
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
  }

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

    const canvasCrossover = document.getElementById('chart-crossover');
    if (canvasCrossover) {
      const ctxCrossover = canvasCrossover.getContext('2d');
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
  }

  // -------------------------------------------------------------
  // Live Visitor Counter Initialization
  // -------------------------------------------------------------
  function initVisitorCounter() {
    const badgeImg = document.getElementById('visitor-img-badge');
    const fallbackBox = document.getElementById('visitor-fallback-container');
    const fallbackCount = document.getElementById('visitor-fallback-count');

    // 1. Session & local storage persistent visitor tracking
    const BASE_VISITS = 1248;
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

    if (fallbackCount) {
      fallbackCount.textContent = totalVisits.toLocaleString();
    }

    // 2. Handle Image badge loading & ad-blocker fallback
    const showFallback = () => {
      if (badgeImg) badgeImg.classList.add('hidden');
      if (fallbackBox) {
        fallbackBox.classList.remove('hidden');
        fallbackBox.classList.add('flex');
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };

    if (badgeImg) {
      badgeImg.addEventListener('error', showFallback);
      badgeImg.addEventListener('load', () => {
        // If loaded successfully, ensure image is visible
        badgeImg.classList.remove('hidden');
        if (fallbackBox) {
          fallbackBox.classList.add('hidden');
          fallbackBox.classList.remove('flex');
        }
      });

      // Safety timeout: if ad-blocker silences the request without firing onerror
      setTimeout(() => {
        if (!badgeImg.complete || badgeImg.naturalWidth === 0) {
          showFallback();
        }
      }, 2500);
    } else {
      showFallback();
    }
  }

  // Initialize visitor counter
  initVisitorCounter();

  // Initialize with 'balanced' preset
  applyPreset('balanced');
});
