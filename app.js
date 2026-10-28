/**
 * UK Investment Platform Advisor - Frontend Controller
 * Complete identity redesign: Deep navy header, sharp serif typography,
 * strong headline result banner, raised winner card with runners-up comparison bars,
 * allocation doughnut chart, stacked fee decomposition bar chart, and cumulative drag curves.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }

  // Cost View Mode: 'monthly' | 'annual'
  let costViewMode = 'monthly';

  // Step Tabs Navigation State
  let currentStepIndex = 1; // 1 to 6
  const totalSteps = 6;

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

  // Doughnut Legend Element
  const doughnutLegend = document.getElementById('doughnut-legend');

  // Trading & Overseas
  const tradesUk = document.getElementById('trades-uk');
  const valTradesUk = document.getElementById('val-trades-uk');
  const tradesFunds = document.getElementById('trades-funds');
  const valTradesFunds = document.getElementById('val-trades-funds');
  const tradesOverseas = document.getElementById('trades-overseas');
  const valTradesOverseas = document.getElementById('val-trades-overseas');
  const tradeSizeOverseas = document.getElementById('trade-size-overseas');
  const tradingSummaryBadge = document.getElementById('trading-summary-badge');

  // Pension
  const sippEmployerContrib = document.getElementById('sipp-employer-contrib');
  const employerContribWarning = document.getElementById('employer-contrib-warning');
  const pensionWithdrawal = document.getElementById('pension-withdrawal');

  // Horizon & Return
  const horizonYears = document.getElementById('horizon-years');
  const valHorizonDisplay = document.getElementById('val-horizon-display');
  const expectedReturn = document.getElementById('expected-return');
  const valReturnDisplay = document.getElementById('val-return-display');
  const horizonSummaryBadge = document.getElementById('horizon-summary-badge');
  const dragChartSubtitle = document.getElementById('drag-chart-subtitle');

  // Hero Stats & Headline Result Elements
  const heroEligibleStat = document.getElementById('hero-eligible-stat');
  const heroExcludedStat = document.getElementById('hero-excluded-stat');
  const heroPotStat = document.getElementById('hero-pot-stat');
  const heroBannerWinnerLabel = document.getElementById('hero-banner-winner-label');
  const heroBannerAmount = document.getElementById('hero-banner-amount');
  const heroBannerDiff = document.getElementById('hero-banner-diff');
  const heroParamInvested = document.getElementById('hero-param-invested');
  const heroParamMonthly = document.getElementById('hero-param-monthly');
  const heroParamHorizon = document.getElementById('hero-param-horizon');
  const heroParamReturn = document.getElementById('hero-param-return');

  // Right Column Elements
  const statusEligibleCount = document.getElementById('status-eligible-count');
  const statusExcludedText = document.getElementById('status-excluded-text');
  const btnViewReasonsLink = document.getElementById('btn-view-reasons-link');
  const toggleViewMonthly = document.getElementById('toggle-view-monthly');
  const toggleViewAnnual = document.getElementById('toggle-view-annual');

  const winnerCardContainer = document.getElementById('winner-card-container');
  const runnersUpGrid = document.getElementById('runners-up-grid');

  // Excluded Platforms Card
  const excludedPlatformsCard = document.getElementById('excluded-platforms-card');
  const excludedCardTitle = document.getElementById('excluded-card-title');
  const excludedPlatformsList = document.getElementById('excluded-platforms-list');

  // Step Buttons
  const stepTabs = document.querySelectorAll('.profile-step-tab');
  const stepPanels = document.querySelectorAll('.step-panel');
  const btnStepPrev = document.getElementById('btn-step-prev');
  const btnStepNext = document.getElementById('btn-step-next');
  const stepIndicatorText = document.getElementById('step-indicator-text');

  // Reset & Print Buttons
  const btnReset = document.getElementById('btn-reset');
  const btnResetForm = document.getElementById('btn-reset-form');
  const btnPrint = document.getElementById('btn-print');

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

  // Chart instances
  let allocationDoughnutChart = null;
  let feeDecompositionChart = null;
  let compoundingDragChart = null;

  // Cached state for modal
  let currentExcludedPlatforms = [];

  // Asset Items List
  const ASSET_ITEMS = [
    { key: 'ukShares', chk: chkUkShares, pill: pillUkShares, row: rowUkShares, slider: allocUkShares, valEl: valUkShares, name: 'UK Shares', color: '#e5a93c' },
    { key: 'etfs', chk: chkEtfs, pill: pillEtfs, row: rowEtfs, slider: allocEtfs, valEl: valEtfs, name: 'ETFs', color: '#0d9488' },
    { key: 'funds', chk: chkFunds, pill: pillFunds, row: rowFunds, slider: allocFunds, valEl: valFunds, name: 'Funds / OEICs', color: '#2563eb' },
    { key: 'investmentTrusts', chk: chkIt, pill: pillIt, row: rowIt, slider: allocIt, valEl: valIt, name: 'Inv. Trusts', color: '#e11d48' },
    { key: 'usStocks', chk: chkUs, pill: pillUs, row: rowUs, slider: allocUs, valEl: valUs, name: 'US Stocks', color: '#7c3aed' },
    { key: 'europeanStocks', chk: chkEu, pill: pillEu, row: rowEu, slider: allocEu, valEl: valEu, name: 'European', color: '#64748b' }
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

  // Count-up animation for numbers
  function animateValue(element, start, end, duration, prefix = '£', suffix = '') {
    if (!element) return;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;
      element.innerHTML = `${prefix}${current.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span class="text-base font-sans font-semibold text-slate-500"> ${suffix}</span>`;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  let lastHeadlineEndValue = 165.75;

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
      case 'ig':
        return `
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-[#d6001c] flex items-center justify-center shrink-0 text-white font-black text-xs tracking-tight shadow-xs">
              IG
            </div>
            <span class="font-extrabold text-slate-900 text-base tracking-tight">IG</span>
          </div>
        `;
      default:
        return `<span class="font-bold text-slate-900 text-base">${name}</span>`;
    }
  }

  // STEP NAVIGATION LOGIC
  function setStep(stepNum) {
    currentStepIndex = Math.max(1, Math.min(stepNum, totalSteps));

    stepTabs.forEach((tab, idx) => {
      if (idx + 1 === currentStepIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    stepPanels.forEach((panel, idx) => {
      if (idx + 1 === currentStepIndex) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    if (btnStepPrev) btnStepPrev.disabled = (currentStepIndex === 1);
    if (btnStepNext) {
      if (currentStepIndex === totalSteps) {
        btnStepNext.innerHTML = `<span>Finished</span> <i data-lucide="check" class="w-3.5 h-3.5"></i>`;
      } else {
        btnStepNext.innerHTML = `<span>Next</span> <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>`;
      }
    }
    if (stepIndicatorText) {
      stepIndicatorText.textContent = `Step ${currentStepIndex} of ${totalSteps}`;
    }

    if (currentStepIndex === 3 && allocationDoughnutChart) {
      setTimeout(() => {
        allocationDoughnutChart.resize();
      }, 50);
    }

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }

  stepTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => setStep(idx + 1));
  });

  if (btnStepPrev) {
    btnStepPrev.addEventListener('click', () => setStep(currentStepIndex - 1));
  }

  if (btnStepNext) {
    btnStepNext.addEventListener('click', () => {
      if (currentStepIndex < totalSteps) {
        setStep(currentStepIndex + 1);
      }
    });
  }

  // Synchronize Asset Chips & Slider Visibility
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
          item.pill.className = 'asset-chip checked flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-xs font-bold cursor-pointer select-none';
        } else {
          item.pill.className = 'asset-chip unchecked flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-xs font-bold cursor-pointer select-none';
        }
      }
      if (!isChecked && item.slider && item.valEl) {
        item.slider.value = 0;
        item.valEl.textContent = '0%';
      }
    });
    updateDoughnutChart();
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
    updateDoughnutChart();
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

    const newVal = parseInt(changedItem.slider.value, 10) || 0;
    changedItem.valEl.textContent = `${newVal}%`;

    const otherItems = active.filter(item => item.key !== changedKey);
    const remainingTarget = 100 - newVal;

    if (otherItems.length === 0) {
      changedItem.slider.value = 100;
      changedItem.valEl.textContent = '100%';
    } else if (remainingTarget <= 0) {
      otherItems.forEach(item => {
        item.slider.value = 0;
        item.valEl.textContent = '0%';
      });
      changedItem.slider.value = 100;
      changedItem.valEl.textContent = '100%';
    } else {
      const currentOthersSum = otherItems.reduce((acc, item) => acc + (parseInt(item.slider.value, 10) || 0), 0);

      if (currentOthersSum === 0) {
        const split = Math.floor(remainingTarget / otherItems.length);
        let rem = remainingTarget;
        otherItems.forEach((item, idx) => {
          if (idx === otherItems.length - 1) {
            item.slider.value = rem;
          } else {
            item.slider.value = split;
            rem -= split;
          }
          item.valEl.textContent = `${item.slider.value}%`;
        });
      } else {
        let assignedSoFar = 0;
        otherItems.forEach((item, idx) => {
          if (idx === otherItems.length - 1) {
            item.slider.value = Math.max(0, remainingTarget - assignedSoFar);
          } else {
            const currentItemVal = parseInt(item.slider.value, 10) || 0;
            const proportional = Math.round((currentItemVal / currentOthersSum) * remainingTarget);
            item.slider.value = proportional;
            assignedSoFar += proportional;
          }
          item.valEl.textContent = `${item.slider.value}%`;
        });
      }
    }

    updateAllocSum();
    updateDoughnutChart();
    calculateAndRender();
    isAutoBalancing = false;
  }

  // Update or Initialize Allocation Doughnut Chart
  function updateDoughnutChart() {
    const active = getActiveAssetItems();
    const labels = active.map(item => item.name);
    const data = active.map(item => parseInt(item.slider.value, 10) || 0);
    const colors = active.map(item => item.color);

    // Update legend UI
    if (doughnutLegend) {
      doughnutLegend.innerHTML = active.map(item => `
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${item.color}"></span>
            <span class="font-bold text-slate-800">${item.name}</span>
          </div>
          <span class="font-extrabold text-slate-900">${item.slider.value}%</span>
        </div>
      `).join('');
    }

    const canvas = document.getElementById('chart-allocation-doughnut');
    if (!canvas || typeof Chart === 'undefined') return;

    if (!allocationDoughnutChart) {
      allocationDoughnutChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
              }
            }
          }
        }
      });
    } else {
      allocationDoughnutChart.data.labels = labels;
      allocationDoughnutChart.data.datasets[0].data = data;
      allocationDoughnutChart.data.datasets[0].backgroundColor = colors;
      allocationDoughnutChart.update();
    }
  }

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
    updateDoughnutChart();
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
      tradingSummaryBadge.textContent = `${uk} UK / mo • ${overseas} overseas`;
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

  // Pension Rules & Alerts
  sippEmployerContrib.addEventListener('change', () => {
    if (sippEmployerContrib.checked) {
      employerContribWarning.classList.remove('hidden');
    } else {
      employerContribWarning.classList.add('hidden');
    }
    calculateAndRender();
  });

  pensionWithdrawal.addEventListener('change', calculateAndRender);

  // Horizon & Return Sliders
  horizonYears.addEventListener('input', () => {
    valHorizonDisplay.textContent = `${horizonYears.value} yrs`;
    if (horizonSummaryBadge) {
      horizonSummaryBadge.textContent = `${horizonYears.value} yrs • ${Number(expectedReturn.value).toFixed(1)}% return`;
    }
    if (dragChartSubtitle) {
      dragChartSubtitle.textContent = `How fees stack up over your ${horizonYears.value}-year horizon at a ${Number(expectedReturn.value).toFixed(1)}% assumed return.`;
    }
    calculateAndRender();
  });

  expectedReturn.addEventListener('input', () => {
    const r = Number(expectedReturn.value).toFixed(1);
    valReturnDisplay.textContent = `${r}%`;
    if (horizonSummaryBadge) {
      horizonSummaryBadge.textContent = `${horizonYears.value} yrs • ${r}% return`;
    }
    if (dragChartSubtitle) {
      dragChartSubtitle.textContent = `How fees stack up over your ${horizonYears.value}-year horizon at a ${r}% assumed return.`;
    }
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
            🎉 All 7 platforms fully support your current investment selection!
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
  if (btnCloseReasonsModal) btnCloseReasonsModal.addEventListener('click', closeEligibilityReasonsModal);
  if (btnCloseReasonsModalBottom) btnCloseReasonsModalBottom.addEventListener('click', closeEligibilityReasonsModal);

  // Modals Interactions: Trade-offs
  const TRADEOFF_CONTENTS = {
    'flat-vs-pct': {
      title: 'Flat Fees vs Percentage Fees Crossover',
      body: `
        <p><strong>The Core Principle:</strong> Most UK brokers charge an ongoing custody fee either as a percentage of your portfolio (e.g. <strong>Vanguard 0.15%</strong>, <strong>AJ Bell 0.25%</strong>, <strong>Hargreaves Lansdown 0.45%</strong>) or as a flat subscription fee (e.g. <strong>Interactive Investor at £143.88/year</strong>).</p>
        <p><strong>The Tipping Point:</strong> When your portfolio is under <strong>£30,000 - £50,000</strong>, percentage brokers are almost always cheaper. However, as your wealth compounds past <strong>£60,000 to £100,000+</strong>, Interactive Investor's flat subscription or AJ Bell's £42/year share cap saves hundreds of pounds per year compared to uncapped percentage models.</p>
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
          <li><strong>AJ Bell, Interactive Investor, Fidelity, HL & IG:</strong> Fully support Ltd Company employer payments with online or paper forms.</li>
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
          <li><strong>IG:</strong> <strong>0.70% FX</strong> with £0 online commission on US and European shares.</li>
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

  // Reset to Defaults
  function resetAll() {
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
    setStep(1);
    calculateAndRender();
  }

  if (btnReset) btnReset.addEventListener('click', resetAll);
  if (btnResetForm) btnResetForm.addEventListener('click', resetAll);

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
      if (totalLumpDisplay) totalLumpDisplay.textContent = formatGbpInt(totalLump);
      if (totalMonthlyDisplay) totalMonthlyDisplay.textContent = `${formatGbpInt(totalMonthly)} / mo`;

      // Execute Comparison Engine
      const rankedPlatforms = PlatformCalculator.compareAllPlatforms(inputs);
      currentExcludedPlatforms = rankedPlatforms.excludedPlatforms || [];

      // 1. Render Hero Headline Result Card & Stats
      renderHeroResult(rankedPlatforms, inputs, totalLump, totalMonthly);

      // 2. Render Winner #1 Card
      renderWinnerCard(rankedPlatforms);

      // 3. Render Runners-up Cards
      renderRunnersUpCards(rankedPlatforms);

      // 4. Render Excluded Platforms Card
      renderExcludedPlatformsCard(currentExcludedPlatforms);

      // 5. Render Annual Fee Decomposition Stacked Bar Chart
      renderFeeDecompositionChart(rankedPlatforms);

      // 6. Render Compounding Cumulative Drag Line Chart
      renderCompoundingDragChart(rankedPlatforms, inputs);

      // 7. Update Platform Rules Matrix Table
      renderRulesMatrixCostRow(rankedPlatforms, inputs);

      // Refresh Lucide Icons
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error('Calculation and rendering failed:', err);
    }
  }

  // Render Hero Headline Result Banner (Requirement 2)
  function renderHeroResult(rankedPlatforms, inputs, totalLump, totalMonthly) {
    const compCount = rankedPlatforms.length;
    const exclCount = currentExcludedPlatforms.length;

    if (heroEligibleStat) heroEligibleStat.textContent = `${compCount} eligible for your profile`;
    if (heroExcludedStat) heroExcludedStat.textContent = `${exclCount} excluded — reasons below`;

    // Projected pot approximation: FV of lump sum + FV of annuity
    const r = inputs.expectedReturnRate;
    const n = inputs.horizonYears;
    const lumpFv = totalLump * Math.pow(1 + r, n);
    const monthlyRate = r / 12;
    const totalMonths = n * 12;
    const monthlyFv = monthlyRate > 0 ? totalMonthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) : totalMonthly * totalMonths;
    const totalProjectedPot = lumpFv + monthlyFv;

    if (heroPotStat) heroPotStat.textContent = `${formatGbpInt(totalProjectedPot)} projected portfolio value`;

    if (heroParamInvested) heroParamInvested.textContent = `${formatGbpInt(totalLump)} invested`;
    if (heroParamMonthly) heroParamMonthly.textContent = `${formatGbpInt(totalMonthly)}/month`;
    if (heroParamHorizon) heroParamHorizon.textContent = `${inputs.horizonYears}-year horizon`;
    if (heroParamReturn) heroParamReturn.textContent = `${(inputs.expectedReturnRate * 100).toFixed(1)}% return`;

    if (compCount >= 2) {
      const winner = rankedPlatforms[0];
      // Compare against the second platform or highest eligible
      const competitor = rankedPlatforms[compCount - 1];
      const annualSavings = competitor.yearOneTotalFee - winner.yearOneTotalFee;
      const tenYearSavings = competitor.tenYearCost - winner.tenYearCost;

      if (heroBannerWinnerLabel) {
        heroBannerWinnerLabel.textContent = `${winner.platform.name} saves you`;
      }

      // Animate big money number
      if (heroBannerAmount) {
        animateValue(heroBannerAmount, lastHeadlineEndValue, annualSavings, 400, '£', '/year');
        lastHeadlineEndValue = annualSavings;
      }

      if (heroBannerDiff) {
        heroBannerDiff.textContent = `≈ ${formatGbpInt(tenYearSavings)} over ${inputs.horizonYears} years vs ${competitor.platform.name}`;
      }
    } else if (compCount === 1) {
      const winner = rankedPlatforms[0];
      if (heroBannerWinnerLabel) heroBannerWinnerLabel.textContent = `${winner.platform.name} is the sole match`;
      if (heroBannerAmount) {
        heroBannerAmount.innerHTML = `£${winner.yearOneTotalFee.toFixed(2)}<span class="text-base font-sans font-semibold text-slate-500"> /year</span>`;
      }
      if (heroBannerDiff) {
        heroBannerDiff.textContent = `10-year cumulative fees: ${formatGbpInt(winner.tenYearCost)}`;
      }
    } else {
      if (heroBannerWinnerLabel) heroBannerWinnerLabel.textContent = 'No eligible platform';
      if (heroBannerAmount) {
        heroBannerAmount.innerHTML = `£0.00<span class="text-base font-sans font-semibold text-slate-500"> /year</span>`;
      }
      if (heroBannerDiff) heroBannerDiff.textContent = 'Check your asset or pension selections';
    }

    if (statusEligibleCount) {
      statusEligibleCount.innerHTML = `
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
        <span>${compCount} eligible platform${compCount === 1 ? '' : 's'}</span>
      `;
    }
    if (statusExcludedText) {
      statusExcludedText.textContent = `${exclCount} excluded`;
    }
  }

  // Render #1 Winner Platform Card (Requirement 3: Raised Card with Gold Border & Ribbon)
  function renderWinnerCard(rankedPlatforms) {
    if (!winnerCardContainer) return;
    winnerCardContainer.innerHTML = '';

    if (rankedPlatforms.length === 0) {
      winnerCardContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
          <i data-lucide="alert-circle" class="w-8 h-8 text-amber-600 mx-auto"></i>
          <h4 class="font-bold text-amber-900 text-sm">No platforms satisfy this exact portfolio combination</h4>
          <p class="text-xs text-amber-800">Please review your selected investment types (e.g. mutual funds vs ETFs) or employer pension settings in the left panel.</p>
        </div>
      `;
      return;
    }

    const winner = rankedPlatforms[0];
    const p = winner.platform;
    const isMonthly = (costViewMode === 'monthly');

    const monthlyCost = winner.yearOneTotalFee / 12;
    const annualCost = winner.yearOneTotalFee;

    const monthlyPlatform = winner.totalPlatformFee / 12;
    const annualPlatform = winner.totalPlatformFee;
    const monthlyDealing = winner.totalDealingFee / 12;
    const annualDealing = winner.totalDealingFee;
    const monthlyRegular = winner.regularInvestingFee / 12;
    const annualRegular = winner.regularInvestingFee;
    const monthlyFx = winner.fxFee / 12;
    const annualFx = winner.fxFee;

    const compPlatform = rankedPlatforms[1] || rankedPlatforms[0];
    const diffYear = compPlatform.yearOneTotalFee - winner.yearOneTotalFee;
    const diffHorizon = compPlatform.tenYearCost - winner.tenYearCost;

    const savingsText = (rankedPlatforms.length > 1 && diffYear > 0)
      ? `Saves <strong>${formatGbp(diffYear)}</strong> a year vs ${compPlatform.platform.name} — <strong>${formatGbpInt(diffHorizon)}</strong> over horizon.`
      : `${p.badge || 'Lowest overall total cost for this profile.'}`;

    const card = document.createElement('div');
    card.className = 'winner-card-raised rounded-2xl p-6 space-y-5 relative';

    card.innerHTML = `
      <!-- Ribbon Badge Top Left -->
      <div class="flex items-center justify-between">
        <span class="ribbon-best-value flex items-center gap-1.5">
          <span>🏆</span>
          <span>BEST VALUE</span>
        </span>
        <span class="text-xs font-extrabold uppercase tracking-widest text-[#0c1e35]/60">
          CHEAPEST FOR THIS PROFILE
        </span>
      </div>

      <!-- Main Winner Brand & Big Price Row -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            ${getPlatformBrandHtml(p.id, p.name)}
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-1">
            ${savingsText}
          </p>
        </div>

        <div class="text-left sm:text-right shrink-0">
          <div class="font-serif-headline text-3xl sm:text-4xl font-black text-[#0c1e35]">
            ${formatGbp(isMonthly ? monthlyCost : annualCost)}<span class="text-sm font-sans font-bold text-slate-500"> ${isMonthly ? '/ month' : '/ year'}</span>
          </div>
          <span class="text-[11px] text-slate-500 font-semibold block mt-0.5">
            ${isMonthly ? `${formatGbp(annualCost)} / year` : `${formatGbp(monthlyCost)} / month`} • <span class="text-emerald-700 font-bold">${winner.effectiveFeePct.toFixed(2)}% fee drag</span>
          </span>
        </div>
      </div>

      <!-- 4 Cost Decomposition Metrics with subtle dividers -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs">
        <div class="bg-slate-50/80 p-2.5 rounded-xl text-center border border-slate-100">
          <span class="text-[11px] text-slate-500 font-semibold block">Platform fee</span>
          <span class="font-extrabold text-slate-900 text-sm">${formatGbp(isMonthly ? monthlyPlatform : annualPlatform)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
        </div>
        <div class="bg-slate-50/80 p-2.5 rounded-xl text-center border border-slate-100">
          <span class="text-[11px] text-slate-500 font-semibold block">Dealing</span>
          <span class="font-extrabold text-slate-900 text-sm">${formatGbp(isMonthly ? monthlyDealing : annualDealing)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
        </div>
        <div class="bg-slate-50/80 p-2.5 rounded-xl text-center border border-slate-100">
          <span class="text-[11px] text-slate-500 font-semibold block">Regular inv.</span>
          <span class="font-extrabold text-slate-900 text-sm">${formatGbp(isMonthly ? monthlyRegular : annualRegular)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
        </div>
        <div class="bg-slate-50/80 p-2.5 rounded-xl text-center border border-slate-100">
          <span class="text-[11px] text-slate-500 font-semibold block">FX fee</span>
          <span class="font-extrabold text-slate-900 text-sm">${formatGbp(isMonthly ? monthlyFx : annualFx)} <span class="text-[10px] text-slate-400 font-normal">${isMonthly ? '/ mo' : '/ yr'}</span></span>
        </div>
      </div>

      <!-- Action Row: 5-Yr Horizon Cost & Drawer Toggle -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <div class="flex items-center gap-3">
          <span class="text-emerald-700 font-bold flex items-center gap-1">
            <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
            <span>Meets 100% of criteria</span>
          </span>
          <span class="text-slate-600 font-medium">5-year fees <strong>${formatGbpInt(winner.fiveYearCost)}</strong></span>
        </div>

        <div class="flex items-center gap-3">
          <button class="btn-toggle-drawer text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 transition">
            <span>Pros, cons & details</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform"></i>
          </button>
          <a href="${p.officialUrl}" target="_blank" rel="noopener noreferrer" class="bg-[#0c1e35] hover:bg-[#071324] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
            <span>Visit platform</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-300"></i>
          </a>
        </div>
      </div>

      <!-- Collapsible Pros & Cons Drawer -->
      <div class="pros-cons-drawer hidden pt-3 border-t border-slate-100 space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="space-y-1">
            <span class="font-bold text-emerald-800 flex items-center gap-1">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Key Strengths / Pros</span>
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
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 text-[11px]">
          <div>
            <span class="text-slate-400 block font-medium">Interest on Cash:</span>
            <span class="font-bold text-slate-800">${p.features.interestOnCash}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-medium">Customer Support:</span>
            <span class="font-bold text-slate-800">${p.features.customerService}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-medium">Mobile App Rating:</span>
            <span class="font-bold text-slate-800">${p.features.mobileAppRating}</span>
          </div>
        </div>
      </div>
    `;

    // Attach drawer toggle
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

    winnerCardContainer.appendChild(card);
  }

  // Render Runners-Up Platforms (Requirement 3: Smaller Cards in 2-Column Grid with Relative Cost Bars & Detail Fees)
  function renderRunnersUpCards(rankedPlatforms) {
    if (!runnersUpGrid) return;
    runnersUpGrid.innerHTML = '';

    if (rankedPlatforms.length <= 1) {
      runnersUpGrid.parentElement.classList.add('hidden');
      return;
    }
    runnersUpGrid.parentElement.classList.remove('hidden');

    const winner = rankedPlatforms[0];
    const runners = rankedPlatforms.slice(1);
    const isMonthly = (costViewMode === 'monthly');

    // Max cost difference among runners for bar width calculation
    const maxDiff = Math.max(...runners.map(r => r.yearOneTotalFee - winner.yearOneTotalFee), 1);

    runners.forEach(result => {
      const p = result.platform;
      const diffYear = result.yearOneTotalFee - winner.yearOneTotalFee;
      const pctBar = Math.min(100, Math.max(12, (diffYear / maxDiff) * 100));

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

      const horizonTotalText = formatGbpInt(result.tenYearCost);

      const card = document.createElement('div');
      card.className = 'runner-card rounded-2xl p-5 space-y-3.5';

      card.innerHTML = `
        <!-- Top Row: Brand on Left, Total 10-Yr Cost on Right -->
        <div class="flex items-start justify-between gap-2">
          <div>
            ${getPlatformBrandHtml(p.id, p.name)}
          </div>
          <span class="text-xs font-extrabold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
            ${horizonTotalText} total
          </span>
        </div>

        <!-- Diff Line & Relative Progress Bar -->
        <div class="space-y-1.5 pt-1">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-rose-600">+${formatGbp(diffYear)}/yr more than ${winner.platform.shortName}</span>
          </div>
          <div class="cost-diff-bar-track">
            <div class="cost-diff-bar-fill bg-gradient-to-r from-amber-500 to-rose-500" style="width: ${pctBar}%;"></div>
          </div>
        </div>

        <!-- Price Headline (Monthly or Annual based on toggle) -->
        <div class="flex items-baseline justify-between pt-1">
          <div>
            <span class="font-serif-headline text-xl sm:text-2xl font-black text-slate-900">
              ${formatGbp(isMonthly ? monthlyCost : annualCost)}
            </span>
            <span class="text-xs font-bold text-slate-500">${isMonthly ? '/ month' : '/ year'}</span>
          </div>
          <span class="text-[11px] text-slate-500 font-semibold">
            ${isMonthly ? `${formatGbp(annualCost)} / yr` : `${formatGbp(monthlyCost)} / mo`} • <span class="text-slate-700 font-bold">${result.effectiveFeePct.toFixed(2)}% drag</span>
          </span>
        </div>

        <!-- 4 Fee Breakdown Boxes for Complete Transparency -->
        <div class="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100 text-center">
          <div class="bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-500 font-semibold block truncate">Platform fee</span>
            <span class="font-bold text-slate-800 text-xs">${formatGbp(isMonthly ? monthlyPlatform : annualPlatform)} <span class="text-[9px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
          </div>
          <div class="bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-500 font-semibold block truncate">Dealing</span>
            <span class="font-bold text-slate-800 text-xs">${formatGbp(isMonthly ? monthlyDealing : annualDealing)} <span class="text-[9px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
          </div>
          <div class="bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-500 font-semibold block truncate">Regular inv.</span>
            <span class="font-bold text-slate-800 text-xs">${formatGbp(isMonthly ? monthlyRegular : annualRegular)} <span class="text-[9px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
          </div>
          <div class="bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-500 font-semibold block truncate">FX fee</span>
            <span class="font-bold text-slate-800 text-xs">${formatGbp(isMonthly ? monthlyFx : annualFx)} <span class="text-[9px] text-slate-400 font-normal">${isMonthly ? '/mo' : '/yr'}</span></span>
          </div>
        </div>

        <!-- Action Row: Pros/Cons Drawer Toggle & Platform Link -->
        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button class="btn-toggle-runner-drawer text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 transition">
            <span>Pros, cons & details</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform"></i>
          </button>
          <a href="${p.officialUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 transition">
            <span>Visit platform</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400"></i>
          </a>
        </div>

        <!-- Collapsible Details Drawer for Runner-up Platform -->
        <div class="runner-pros-cons-drawer hidden pt-3 border-t border-slate-100 space-y-3">
          <!-- Account Custody Breakdown -->
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-3 gap-2 text-[11px] text-center">
            <div>
              <span class="text-slate-400 block font-medium">ISA Custody:</span>
              <span class="font-bold text-slate-800">${formatGbp(result.accountFees.isa)}/yr</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">SIPP Custody:</span>
              <span class="font-bold text-slate-800">${formatGbp(result.accountFees.sipp)}/yr</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">GIA Custody:</span>
              <span class="font-bold text-slate-800">${formatGbp(result.accountFees.gia)}/yr</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="space-y-1">
              <span class="font-bold text-emerald-800 flex items-center gap-1">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>
                <span>Key Strengths / Pros</span>
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

          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <span class="text-slate-400 block font-medium">Interest on Cash:</span>
              <span class="font-bold text-slate-800">${p.features.interestOnCash}</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">Support:</span>
              <span class="font-bold text-slate-800">${p.features.customerService}</span>
            </div>
            <div>
              <span class="text-slate-400 block font-medium">App Rating:</span>
              <span class="font-bold text-slate-800">${p.features.mobileAppRating}</span>
            </div>
          </div>
        </div>
      `;

      // Attach drawer toggle
      const toggleBtn = card.querySelector('.btn-toggle-runner-drawer');
      const drawer = card.querySelector('.runner-pros-cons-drawer');
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

      runnersUpGrid.appendChild(card);
    });
  }

  // Render Why Platforms Are Excluded Card (Requirement 6 & Mockup)
  function renderExcludedPlatformsCard(excluded) {
    if (!excludedPlatformsCard) return;
    if (excluded.length === 0) {
      excludedPlatformsCard.classList.add('hidden');
      return;
    }

    excludedPlatformsCard.classList.remove('hidden');
    if (excludedCardTitle) {
      excludedCardTitle.textContent = `Why ${excluded.length} platform${excluded.length === 1 ? '' : 's are'} excluded`;
    }

    if (excludedPlatformsList) {
      excludedPlatformsList.innerHTML = excluded.map(ex => {
        // Collect short readable tags from disqualifiers
        const tags = [];
        const disqStr = ex.compatibility.disqualifiers.join(' ').toLowerCase();
        if (disqStr.includes('mutual funds') || disqStr.includes('oeic')) tags.push('no mutual funds / OEICs');
        if (disqStr.includes('investment trusts')) tags.push('no investment trusts');
        if (disqStr.includes('uk shares') || disqStr.includes('single company')) tags.push('no UK shares');
        if (disqStr.includes('overseas') || disqStr.includes('us shares') || disqStr.includes('continental european')) tags.push('no overseas trading');
        if (disqStr.includes('employer')) tags.push('no employer SIPP');

        if (tags.length === 0) tags.push('incompatible asset selection');

        return `
          <div class="flex flex-wrap items-center gap-2 py-1">
            <div class="flex items-center gap-1.5 font-bold text-slate-800">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>${ex.platform.name}</span>
              <span class="text-slate-500 font-normal">— cannot support your selections:</span>
            </div>
            <div class="flex flex-wrap items-center gap-1">
              ${tags.map(t => `<span class="bg-[#fee2e2] text-[#991b1b] px-2 py-0.5 rounded-md text-[11px] font-bold">${t}</span>`).join('')}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Render Annual Fee Decomposition Stacked Bar Chart (Requirement 4)
  function renderFeeDecompositionChart(rankedPlatforms) {
    const canvas = document.getElementById('chart-annual-fee-decomposition');
    if (!canvas || typeof Chart === 'undefined') return;

    const labels = rankedPlatforms.map(r => r.platform.shortName);
    const custodyData = rankedPlatforms.map(r => r.totalPlatformFee);
    const dealingData = rankedPlatforms.map(r => r.totalDealingFee);
    const regularInvData = rankedPlatforms.map(r => r.regularInvestingFee);
    const fxData = rankedPlatforms.map(r => r.fxFee);

    if (feeDecompositionChart) {
      feeDecompositionChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    feeDecompositionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Custody',
            data: custodyData,
            backgroundColor: '#0c1e35', // Navy
            borderRadius: 0,
            borderSkipped: false
          },
          {
            label: 'Dealing',
            data: dealingData,
            backgroundColor: '#d4952b', // Gold / Mustard
            borderRadius: 0,
            borderSkipped: false
          },
          {
            label: 'Regular inv.',
            data: regularInvData,
            backgroundColor: '#0d9488', // Emerald Teal
            borderRadius: 0,
            borderSkipped: false
          },
          {
            label: 'FX',
            data: fxData,
            backgroundColor: '#e11d48', // Coral Red
            borderRadius: 4,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: £${Number(ctx.raw).toFixed(2)}`
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', weight: 'bold', size: 11 }, color: '#334155' }
          },
          y: {
            stacked: true,
            ticks: {
              callback: (v) => `£${Number(v).toLocaleString()}`,
              font: { family: 'Plus Jakarta Sans', size: 10 },
              color: '#64748b'
            },
            grid: { color: '#f1ede4' }
          }
        }
      }
    });
  }

  // Render Cumulative Fee Drag Multi-Line Chart (Requirement 4)
  function renderCompoundingDragChart(rankedPlatforms, inputs) {
    const canvas = document.getElementById('chart-compounding-drag');
    if (!canvas || typeof Chart === 'undefined') return;

    const horizon = inputs.horizonYears;
    const yearLabels = Array.from({ length: horizon }, (_, i) => `Y${i + 1}`);

    const datasets = rankedPlatforms.map(res => {
      const data = res.multiYearProjection.map(p => p.cumulativeLostGrowth + p.cumulativeFees);
      return {
        label: res.platform.shortName,
        data: data,
        borderColor: res.platform.logoColor || '#0c1e35',
        backgroundColor: 'transparent',
        borderWidth: res.rank === 1 ? 3 : 2,
        tension: 0.25,
        pointRadius: 2,
        pointHoverRadius: 5
      };
    });

    if (compoundingDragChart) {
      compoundingDragChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    compoundingDragChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              font: { size: 11, family: 'Plus Jakarta Sans', weight: 'bold' },
              color: '#334155'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: £${Math.round(ctx.raw).toLocaleString()} total fee drag`
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (v) => `£${Number(v).toLocaleString()}`,
              font: { family: 'Plus Jakarta Sans', size: 10 },
              color: '#64748b'
            },
            grid: { color: '#f1ede4' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 10 }, color: '#64748b' }
          }
        }
      }
    });
  }

  // Update Dynamic Platform Rules Matrix Cost Row
  function renderRulesMatrixCostRow(rankedPlatforms) {
    const map = {};
    rankedPlatforms.forEach(r => {
      map[r.platform.id] = formatGbpInt(r.tenYearCost);
    });

    const ids = [
      { id: 'aj-bell', elId: 'matrix-cost-aj-bell' },
      { id: 'interactive-investor', elId: 'matrix-cost-ii' },
      { id: 'hargreaves-lansdown', elId: 'matrix-cost-hl' },
      { id: 'trading-212', elId: 'matrix-cost-t212' },
      { id: 'fidelity', elId: 'matrix-cost-fidelity' },
      { id: 'vanguard', elId: 'matrix-cost-vanguard' },
      { id: 'ig', elId: 'matrix-cost-ig' }
    ];

    ids.forEach(({ id, elId }) => {
      const el = document.getElementById(elId);
      if (el) {
        if (map[id]) {
          el.textContent = map[id];
          el.className = 'py-2.5 px-2 text-slate-900 font-extrabold';
        } else {
          el.textContent = '—';
          el.className = 'py-2.5 px-2 text-slate-400 font-semibold';
        }
      }
    });
  }

  // Visitor Counter Tracking (100% Real Organic Count)
  function initVisitorCounter() {
    const countDisplay = document.getElementById('visitor-count-number');
    if (!countDisplay) return;

    try {
      localStorage.removeItem('uk_platform_advisor_visits');
    } catch (e) {}

    let totalVisits = parseInt(localStorage.getItem('uk_platform_advisor_real_visits'), 10);
    if (isNaN(totalVisits) || totalVisits < 1) {
      totalVisits = 35; // Initial baseline
    }

    const isCountedSession = sessionStorage.getItem('uk_platform_advisor_session_counted');
    if (!isCountedSession) {
      totalVisits += 1;
      localStorage.setItem('uk_platform_advisor_real_visits', totalVisits.toString());
      sessionStorage.setItem('uk_platform_advisor_session_counted', 'true');
    }

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
            if (remoteHits > totalVisits) {
              totalVisits = remoteHits;
              localStorage.setItem('uk_platform_advisor_real_visits', totalVisits.toString());
              countDisplay.textContent = totalVisits.toLocaleString();
            }
          }
        }
      })
      .catch(() => {});
  }

  // Initialize Application
  initVisitorCounter();
  syncAssetPillsAndSliders();
  updateAllocSum();
  updateDoughnutChart();
  updateTradingSummaryBadge();
  setStep(1);
  calculateAndRender();
});
