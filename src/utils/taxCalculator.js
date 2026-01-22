/**
 * Tax Calculator for Sri Lanka (Year of Assessment 2025/2026)
 * Includes EPF, ETF, and Take Home Pay calculations.
 * 
 * EPF Employee: 8% of (Basic + Fixed Allowances)
 * EPF Employer: 12% of (Basic + Fixed Allowances)
 * ETF Employer: 3% of (Basic + Fixed Allowances)
 * APIT (Tax): Based on Total Earnings (Basic + Fixed + Other Allowances) - Relief
 */

export const TAX_BRACKETS = [
    { limit: 1000000, rate: 0.06 },
    { limit: 500000, rate: 0.18 },
    { limit: 500000, rate: 0.24 },
    { limit: 500000, rate: 0.30 },
    { limit: Infinity, rate: 0.36 },
];

export const ANNUAL_RELIEF = 1800000;
export const MONTHLY_RELIEF = 150000;

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const calculateTax = (basicSalary, fixedAllowances, otherAllowances, mode = 'monthly') => {
    const isMonthly = mode === 'monthly';

    const basic = parseFloat(basicSalary) || 0;
    const fixed = parseFloat(fixedAllowances) || 0;
    const other = parseFloat(otherAllowances) || 0;

    const totalEarnings = basic + fixed + other;

    // EPF/ETF Base = Basic + Fixed Allowances only
    const epfBase = basic + fixed;

    if (totalEarnings <= 0) {
        return {
            tax: 0,
            netSalary: 0,
            epfEmployee: 0,
            epfEmployer: 0,
            etfEmployer: 0,
            totalEarnings: 0,
            taxableIncome: 0,
            brackets: []
        };
    }

    // Calculate Statutory Deductions (Monthly)
    // If mode is annual, we assume inputs are annual, so we calculate annual EPF/ETF
    const epfEmployee = epfBase * 0.08;
    const epfEmployer = epfBase * 0.12;
    const etfEmployer = epfBase * 0.03;

    // Calculate Tax (APIT)
    // Convert everything to annual for standard tax calculation
    const annualTotalEarnings = isMonthly ? totalEarnings * 12 : totalEarnings;
    const annualRelief = ANNUAL_RELIEF;

    const taxableIncome = Math.max(0, annualTotalEarnings - annualRelief);
    let taxAmount = 0;
    let remainingTaxable = taxableIncome;

    const bracketBreakdown = [];

    for (const bracket of TAX_BRACKETS) {
        if (remainingTaxable <= 0) break;

        const taxInThisBracket = Math.min(remainingTaxable, bracket.limit);
        const taxForThisChunk = taxInThisBracket * bracket.rate;

        taxAmount += taxForThisChunk;
        remainingTaxable -= taxInThisBracket;

        if (taxForThisChunk > 0) {
            bracketBreakdown.push({
                limit: bracket.limit,
                rate: bracket.rate,
                amount: taxInThisBracket,
                tax: taxForThisChunk
            });
        }
    }

    // Convert tax back to monthly if needed
    const finalTax = isMonthly ? taxAmount / 12 : taxAmount;
    const finalTaxable = isMonthly ? taxableIncome / 12 : taxableIncome;

    // Stamp Duty
    // RS. 25.00 if net salary >= 25,000 (standard practice, though technically on receipts)
    const netBeforeStamp = totalEarnings - (epfEmployee + finalTax);
    let stampDuty = 0;
    if (netBeforeStamp >= 25000) {
        stampDuty = isMonthly ? 25 : 25 * 12;
    }

    // Net Salary = Total Earnings - (EPF Employee + APIT + Stamp Duty)
    const netSalary = totalEarnings - (epfEmployee + finalTax + stampDuty);

    return {
        tax: finalTax,
        netSalary: netSalary,
        epfEmployee: epfEmployee,
        epfEmployer: epfEmployer,
        etfEmployer: etfEmployer,
        stampDuty: stampDuty,
        totalEarnings: totalEarnings,
        taxableIncome: finalTaxable,
        brackets: isMonthly ? bracketBreakdown.map(b => ({
            ...b,
            amount: b.amount / 12,
            tax: b.tax / 12,
            limit: b.limit / 12
        })) : bracketBreakdown
    };
};
