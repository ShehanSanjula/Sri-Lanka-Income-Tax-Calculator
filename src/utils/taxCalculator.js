/**
 * Tax Calculator for Sri Lanka (Y/A 2025/2026 & Proposed April 2027 Budget Revision)
 * Includes EPF, ETF, and Take Home Pay calculations.
 *
 * EPF Employee: 8% of (Basic + Fixed Allowances)
 * EPF Employer: 12% of (Basic + Fixed Allowances)
 * ETF Employer: 3% of (Basic + Fixed Allowances)
 * APIT (Tax): Based on Total Earnings (Basic + Fixed + Other Allowances) - Relief
 */

export const TAX_REGIMES = {
    '2025_2026': {
        id: '2025_2026',
        shortLabel: '2025/26 Current',
        label: 'Y/A 2025/2026',
        badgeText: 'Official Rates',
        isProposed: false,
        effectiveDate: 'April 1, 2025',
        annualRelief: 1800000, // 150,000 monthly
        brackets: [
            { limit: 1000000, rate: 0.06 },
            { limit: 500000, rate: 0.18 },
            { limit: 500000, rate: 0.24 },
            { limit: 500000, rate: 0.30 },
            { limit: Infinity, rate: 0.36 },
        ],
        slabRows: [
            { slab: 'First 150,000', rate: 'Relief', isRelief: true },
            { slab: 'Next 100,000 (up to 250k)', rate: '6%' },
            { slab: 'Next 50,000', rate: '18%' },
            { slab: 'Next 50,000', rate: '24%' },
            { slab: 'Next 50,000', rate: '30%' },
            { slab: 'Balance', rate: '36%' },
        ],
    },
    '2027_04': {
        id: '2027_04',
        shortLabel: 'Apr 2027 (New)',
        label: 'Eff. Apr 2027 (Budget)',
        badgeText: 'Proposed · Apr 2027',
        isProposed: true,
        effectiveDate: 'April 1, 2027',
        annualRelief: 1950000, // 162,500 monthly
        brackets: [
            { limit: 850000, rate: 0.06 },
            { limit: 600000, rate: 0.12 },
            { limit: 600000, rate: 0.18 },
            { limit: 600000, rate: 0.24 },
            { limit: 600000, rate: 0.30 },
            { limit: Infinity, rate: 0.36 },
        ],
        slabRows: [
            { slab: 'First 162,500', rate: 'Relief', isRelief: true },
            { slab: 'Next 70,833 (Rs. 850k/yr)', rate: '6%' },
            { slab: 'Next 50,000 (Rs. 600k/yr)', rate: '12%' },
            { slab: 'Next 50,000 (Rs. 600k/yr)', rate: '18%' },
            { slab: 'Next 50,000 (Rs. 600k/yr)', rate: '24%' },
            { slab: 'Next 50,000 (Rs. 600k/yr)', rate: '30%' },
            { slab: 'Balance (Above 433,333)', rate: '36%' },
        ],
    },
};

export const DEFAULT_REGIME_ID = '2025_2026';

export const TAX_BRACKETS = TAX_REGIMES[DEFAULT_REGIME_ID].brackets;
export const ANNUAL_RELIEF = TAX_REGIMES[DEFAULT_REGIME_ID].annualRelief;
export const EXPORT_INCOME_CAP_RATE = 0.15;
export const INVESTMENT_TAX_RATE = 0.10;
export const DIVIDEND_TAX_RATE = 0.15;
export const SPECIAL_GAINS_RATE = 0.45;
export const AIT_TAX_RATE = 0.05;
export const MONTHLY_AIT_THRESHOLD = 100000;

export const calculateAit = (otherIncome, mode = 'monthly') => {
    const isMonthly = mode === 'monthly';
    const threshold = isMonthly ? MONTHLY_AIT_THRESHOLD : MONTHLY_AIT_THRESHOLD * 12;
    const income = parseFloat(otherIncome) || 0;
    if (income > threshold) {
        return income * AIT_TAX_RATE;
    }
    return 0;
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatCompactNumber = (number) => {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(2) + ' Billion';
    }
    if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + ' Million';
    }
    return formatCurrency(number).replace('LKR', '').trim();
};

export const formatViewCount = (number) => {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    }
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    }
    return number.toString();
};

export const calculateTax = (basicSalary, fixedAllowances, otherAllowances, exportIncomeInput, investmentIncomeInput, dividendIncomeInput, specialGainsInput, mode = 'monthly', professionType = 'salaried', regimeId = DEFAULT_REGIME_ID) => {
    const regime = TAX_REGIMES[regimeId] || TAX_REGIMES[DEFAULT_REGIME_ID];
    const isMonthly = mode === 'monthly';
    const multiplier = isMonthly ? 12 : 1;

    // Standard Employment Income
    const basic = (parseFloat(basicSalary) || 0);
    const fixed = (parseFloat(fixedAllowances) || 0);
    const other = (parseFloat(otherAllowances) || 0);

    // New Categories
    const exportIncome = (parseFloat(exportIncomeInput) || 0);
    const investmentIncome = (parseFloat(investmentIncomeInput) || 0);
    const dividendIncome = (parseFloat(dividendIncomeInput) || 0);
    const specialGains = (parseFloat(specialGainsInput) || 0);

    const totalStandardEarnings = basic + fixed + other;

    // EPF/ETF Base = Basic + Fixed Allowances
    const epfBase = basic + fixed;

    // Total Assessable Income (Annualized for calculation)
    const annualStandardEarnings = totalStandardEarnings * multiplier;
    const annualExportIncome = exportIncome * multiplier;

    // --- Deductions ---
    const epfEmployee = epfBase * 0.08; // Monthly/Annual based on input
    const epfEmployer = epfBase * 0.12;
    const etfEmployer = epfBase * 0.03;

    // --- Tax Calculation ---
    // 1. Standard Income Tax (Progressive Slabs)
    const annualRelief = regime.annualRelief;

    // Taxable Standard Income
    let taxableStandard = Math.max(0, annualStandardEarnings - annualRelief);
    let standardTax = 0;
    let remainingStandardForTax = taxableStandard;

    // We need to track the "filled" amount of brackets to stack Export Income correctly if we were doing strict stacking.
    // However, the requirement is "Export Income Cap (15%)". 
    // Usually, this implies specific concessionary rate. 
    // Algorithm:
    // 1. Calculate tax on Standard Income normally.
    // 2. Export Income is stacked on top. 
    //    For each chunk of Export Income, the rate is min(SlabRate, 15%).

    const bracketBreakdown = [];

    // --- Step 1: Standard Income Tax ---
    let currentBracketIndex = 0;

    // Helper to process a chunk of income through brackets
    const processIncomeThroughBrackets = (incomeAmount, isExport = false) => {
        let tax = 0;
        let remainingIncome = incomeAmount;

        // Clone brackets to track usage if needed, but here we just iterate
        // We need to maintain state of 'used' bracket amount if we strictly stack.
        // Let's assume we iterate through brackets from where we left off?
        // Actually, it's easier to iterate from scratch but with an 'offset' of already taxed income?
        // No, let's just loop.
    };

    // Correct Approach:
    // We treat (Relief + Standard + Export) as the total stack for positioning.

    let currentIncomePosition = 0; // Starts at 0.

    // 1. absorb Relief
    let usedRelief = Math.min(annualStandardEarnings, annualRelief);
    let remainingRelief = annualRelief - usedRelief;

    // Tax on Standard
    let tempStandard = Math.max(0, annualStandardEarnings - usedRelief);

    for (const bracket of regime.brackets) {
        if (tempStandard <= 0) break;

        const amountInBracket = Math.min(tempStandard, bracket.limit);
        const taxForChunk = amountInBracket * bracket.rate;

        standardTax += taxForChunk;
        tempStandard -= amountInBracket;

        if (taxForChunk > 0) {
            bracketBreakdown.push({
                limit: bracket.limit, // Annual limit
                rate: bracket.rate,
                amount: amountInBracket, // Annual amount
                tax: taxForChunk, // Annual tax
                source: 'Employment'
            });
        }
    }

    // --- Step 2: Export Income Tax (Capped at 15%) ---
    // It starts taxing after Standard Income.
    // If Standard Income < Relief, Export Income uses remaining Relief first.

    let taxableExport = Math.max(0, annualExportIncome - remainingRelief);
    let exportTax = 0;

    if (taxableExport > 0) {
        // Calculate where we are in the brackets based on Standard Income
        // We need to 'skip' the brackets already filled by Standard Income.
        // Effective Taxable Start for Export = TaxableStandard (already defined above)

        let startOffset = taxableStandard; // How much taxable space occupied by standard
        let remainingToTax = taxableExport;

        for (const bracket of regime.brackets) {
            if (remainingToTax <= 0) break;

            // How much space left in this bracket?
            // Space used by previous income sources in this bracket?
            // This is getting complex to track stateless.
            // Let's re-simulate filling from bottom.
        }
    }

    // Simplified Logic for "Mixed Mode" with Cap:
    // 1. Calculate Tax on (Standard + Export) as if it's all normal income.
    // 2. Calculate Tax on (Standard) only.
    // 3. The difference is the "Tax on Export" derived from normal slabs.
    // 4. BUT, we must enforce the 15% Cap.
    //    Actually, we must apply the cap chunk by chunk? 
    //    "Capped at max rate of 15%".
    //    Implementation:
    //    Iterate brackets.
    //    Fill with Standard Income -> Tax at Bracket Rate.
    //    Fill with Export Income -> Tax at min(Bracket Rate, 15%).

    // RESET and DO IT IN ONE PASS
    standardTax = 0;
    exportTax = 0;
    const combinedBreakdown = [];

    let incomeA = Math.max(0, annualStandardEarnings - annualRelief); // Standard Taxable
    let incomeB = Math.max(0, annualExportIncome - Math.max(0, annualRelief - annualStandardEarnings)); // Export Taxable

    // We process brackets sequentially
    for (const bracket of regime.brackets) {
        if (incomeA <= 0 && incomeB <= 0) break;

        const limit = bracket.limit; // Capacity of this bracket

        // 1. Standard Income takes priority in lower slabs (usually beneficial or neutral)
        // Actually it doesn't matter for the total, but for the 'Cap' application, it matters.
        // We assume Standard fills bottom up.

        let takenA = Math.min(incomeA, limit);
        let taxA = takenA * bracket.rate;
        incomeA -= takenA;

        let spaceLeft = limit - takenA;
        let takenB = Math.min(incomeB, spaceLeft);
        // Apply Cap: Export income in this bracket is taxed at min(BracketRate, 15%)
        let effectiveRateB = Math.min(bracket.rate, EXPORT_INCOME_CAP_RATE);
        let taxB = takenB * effectiveRateB;
        incomeB -= takenB;

        standardTax += taxA;
        exportTax += taxB;

        if (takenA > 0 || takenB > 0) {
            combinedBreakdown.push({
                rate: bracket.rate, // Display the nominal rate of the slab
                effectiveRate: takenB > 0 ? `${Math.round(bracket.rate * 100)}% / ${Math.round(effectiveRateB * 100)}%` : bracket.rate,
                amount: takenA + takenB,
                tax: taxA + taxB,
                label: `Slab ${Math.round(bracket.rate * 100)}%`
            });
        }
    }

    // --- Step 3: Investment Income (WHT 10%) ---
    // Annualized for consistency, though rate is flat.
    const annualInvestmentParams = investmentIncome * multiplier;
    const investmentTax = annualInvestmentParams * INVESTMENT_TAX_RATE;

    // --- Step 4: Dividend Income (WHT 15%) ---
    const annualDividendParams = dividendIncome * multiplier;
    const dividendTax = annualDividendParams * DIVIDEND_TAX_RATE;

    // --- Step 5: Special Gains (45%) ---
    const annualSpecialParams = specialGains * multiplier;
    const specialTax = annualSpecialParams * SPECIAL_GAINS_RATE;

    // --- Step 6: Advance Income Tax (AIT 5% for independent service providers) ---
    const annualOther = other * multiplier;
    const annualAitThreshold = MONTHLY_AIT_THRESHOLD * 12;
    const annualAit = (professionType === 'independent' && annualOther > annualAitThreshold) ? (annualOther * AIT_TAX_RATE) : 0;

    const totalTaxAnnual = standardTax + exportTax + investmentTax + dividendTax + specialTax + annualAit;

    // --- Convert back to Monthly if needed ---
    // Logic: The function calculates "Tax per month" if mode is monthly.
    // The inputs were converted to annual for calculation.
    // Now divide results by 12.

    const finalTax = isMonthly ? totalTaxAnnual / 12 : totalTaxAnnual;
    const finalStandardTax = isMonthly ? standardTax / 12 : standardTax;
    const finalExportTax = isMonthly ? exportTax / 12 : exportTax;
    const finalInvestmentTax = isMonthly ? investmentTax / 12 : investmentTax;
    const finalDividendTax = isMonthly ? dividendTax / 12 : dividendTax;
    const finalSpecialTax = isMonthly ? specialTax / 12 : specialTax;
    const finalAit = isMonthly ? annualAit / 12 : annualAit;

    // Total Earnings used for display
    const totalEarningsDisplay = totalStandardEarnings + exportIncome + investmentIncome + dividendIncome + specialGains;

    // Stamp Duty (on Receipt of Salary)
    // Roughly applies to Net Payments > 25,000. 
    // Excluding Investment/Special usually? Stamp duty is on "Aggregate remuneration".
    // We'll stick to Standard + Export (Employment context).
    // Investment might be separate. 
    // Let's apply to (Standard + Export).
    const employmentEarnings = totalStandardEarnings + exportIncome;
    const employmentDeductions = epfEmployee + finalStandardTax + finalExportTax;
    const netEmployment = employmentEarnings - employmentDeductions;

    let stampDuty = 0;
    if (netEmployment >= (isMonthly ? 25000 : 300000)) {
        stampDuty = isMonthly ? 25 : 300;
    }

    const netSalary = totalEarningsDisplay - (epfEmployee + finalTax + stampDuty);

    return {
        tax: finalTax,
        breakdown: {
            standard: finalStandardTax,
            export: finalExportTax,
            investment: finalInvestmentTax,
            dividend: finalDividendTax,
            special: finalSpecialTax,
            ait: finalAit
        },
        netSalary: netSalary,
        epfEmployee: epfEmployee, // Already scaled
        epfEmployer: epfEmployer,
        etfEmployer: etfEmployer,
        stampDuty: stampDuty,
        totalEarnings: totalEarningsDisplay,
        brackets: isMonthly ? combinedBreakdown.map(b => ({
            ...b,
            amount: b.amount / 12,
            tax: b.tax / 12
        })) : combinedBreakdown
    };
};
