# Release Notes

## [v1.7.1] - 2026-08-08

### 🐛 Bug Fixes

- **View Counter**: Migrated from deprecated CounterAPI (v1) to Abacus API to restore the live view counter functionality in the header.

## [v1.7] - 2026-06-28

### ⚖️ Legal & Compliance Updates

- **Exemption Disclaimer Update**: Clarified the compliance alert banner to explicitly mention the June 2026 amendment guidelines, indicating that salaried employees under APIT generally do not need to maintain an income tax file or file a return, and that this relief extends to up to Rs. 5,000 in interest income.
- **Official Information Update**: Updated the 'Official Information' section at the bottom of the UI to reference the Inland Revenue (Amendment) Act No. 11 of 2026 and detail the new APIT/AIT provisions.

## [v1.6] - 2026-06-28

### ⚙️ Improvements

- **UX Safeguards**: Locked "Basic Salary" and "Fixed Allowances" fields when switching to the Independent Creative / Service Provider profile, setting their subtexts dynamically to "Not applicable for independent profile".
- **Auto-Clear State**: Switching profiles to Independent Creative automatically clears existing values from the Basic Salary and Fixed Allowances state to prevent leftover corporate salary data from skewing independent contractor calculations.
- **Dynamic Placeholders**: Scale numeric field placeholders (Basic Salary, Fixed Allowances, Other Income) dynamically based on the selected mode (e.g., LKR 150,000 monthly vs. LKR 1,800,000 annual for Basic Salary).

## [v1.5] - 2026-06-28

### 🚀 New Features

- **2026 Compliance Upgrades**: Fully updated to match the Inland Revenue (Amendment) Act No. 11 of 2026 guidelines.
- **Income Source Profile Selector**: Choose between **Standard Salaried Employee** and **Independent Creative / Service Provider** tax profiles.
- **Advance Income Tax (AIT) calculation**: Automatically applies a 5% AIT withholding/deduction on "Other Income" for Independent Service Providers when it exceeds LKR 100,000 per month (or LKR 1,200,000 annually).
- **Tax Return Exemption Banner**: Dynamic banner notifying standard salaried employees with no other income that they are exempt from filing annual tax returns under the 2026 Amendment Act.
- **Section 52A Tooltip**: Helpful compliance indicator next to other income input, reminding users that maturity, surrender, or death payouts from life insurance policies are fully tax-exempt under Section 52A (Effective June 2026).

## [v1.4] - 2026-01-31

### 🚀 New Features

- **Dividend Income Input**: Added a separate field for Dividend Income (15% Tax).
- **Updated Tax Logic**:
  - **Dividend Income**: Final WHT of **15%**.
  - **Investment Income**: Fixed **10%** WHT/AIT (Interest/Fixed Deposits).
- **UI Improvements**: Updated placeholder to **"Interest/ FD"** for clarity and mobile optimization.

### ⚙️ Improvements

- **Compliance**: Aligned with **Inland Revenue (Amendment) Act No. 02 of 2025**.
