/**
 * Tax Calculator for Sri Lanka (Year of Assessment 2025/2026)
 * Based on 2026 Tax Brackets:
 * Personal Relief: Rs. 1,800,000 per annum (Rs. 150,000 per month)
 *
 * Tax Bands (Taxable Income):
 * 1. First Rs. 1,000,000 per annum (Rs. 83,333 per month) @ 6%
 * 2. Next Rs. 500,000 per annum (Rs. 41,667 per month) @ 18%
 * 3. Next Rs. 500,000 per annum (Rs. 41,667 per month) @ 24%
 * 4. Next Rs. 500,000 per annum (Rs. 41,667 per month) @ 30%
 * 5. Balance @ 36%
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

export const calculateTax = (inputIncome, mode = 'monthly') => {
    const isMonthly = mode === 'monthly';
    const totalIncome = parseFloat(inputIncome) || 0;

    if (totalIncome <= 0) {
        return {
            tax: 0,
            netIncome: 0,
            taxableIncome: 0,
            brackets: []
        };
    }

    // Convert everything to annual for calculation standard
    const annualIncome = isMonthly ? totalIncome * 12 : totalIncome;
    let taxableIncome = Math.max(0, annualIncome - ANNUAL_RELIEF);
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

    // Convert back to monthly if needed
    const finalTax = isMonthly ? taxAmount / 12 : taxAmount;
    const finalTaxable = isMonthly ? taxableIncome / 12 : taxableIncome;
    const netIncome = totalIncome - finalTax;

    return {
        tax: finalTax,
        netIncome: netIncome,
        taxableIncome: finalTaxable,
        brackets: isMonthly ? bracketBreakdown.map(b => ({
            ...b,
            amount: b.amount / 12,
            tax: b.tax / 12,
            limit: b.limit / 12 // approximate visual limit for monthly
        })) : bracketBreakdown
    };
};
