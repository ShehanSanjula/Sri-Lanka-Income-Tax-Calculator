
# 🇱🇰 Sri Lanka Income Tax Calculator (2025/2026)

![GitHub last commit](https://img.shields.io/github/last-commit/shehansanjula/Sri-Lanka-Income-Tax-Calculator?style=for-the-badge&color=emerald)
![GitHub license](https://img.shields.io/github/license/shehansanjula/Sri-Lanka-Income-Tax-Calculator?style=for-the-badge&color=amber)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-FFD700?style=for-the-badge&logo=github&logoColor=black)](https://shehansanjula.github.io/Sri-Lanka-Income-Tax-Calculator/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A premium, privacy-focused, and fully responsive Income Tax Calculator for Sri Lanka, updated for the Year of Assessment 2025/2026. Built with modern web technologies to provide instant, accurate breakdowns of your salary, deductions, and take-home pay.

## ✨ Features

- **🚀 Instant Calculation**: Real-time updates as you type.
- **🔒 Privacy First**: All data is processed locally in your browser. No data is sent to any server.
- **Advanced Income Calculation**: Support for diverse income streams:
    - **Service Export Income**: Capped at **15%** tax rate.
    - **Investment Income**: Fixed **10%** WHT/AIT.
    - **Special Gains**: Flat **45%** tax for betting/gaming profits.
- **👀 Live View Counter**: Real-time global visitor count powered by CounterAPI.
- **🎨 Premium UI**: "Fluid Cyber Wealth" theme with glassmorphism and smooth animations.
- **📱 Smart Formatting**: Handles large numbers (Millions/Billions) gracefully without breaking the layout.
- **📊 Visual Breakdown**: Interactive Donut Chart for visualizing salary distribution.
- **📋 Detailed Reports**:
    - **APIT (Tax)** calculation based on official 5-tier tax slabs.
    - **EPF/ETF** computations for both employee and employer.
    - **Stamp Duty** logic (New for 2025).
    - **Total Deductions** & **Cost to Company**.

## 🛠️ Technology Stack

-   **Frontend**: React (Vite)
-   **Styling**: Tailwind CSS
-   **Icons**: Heroicons
-   **API**: CounterAPI (for view counting)
-   **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shehansanjula/Sri-Lanka-Income-Tax-Calculator.git
    cd Sri-Lanka-Income-Tax-Calculator
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 📜 Tax Logic (Y/A 2025/2026)

Based on the **Inland Revenue (Amendment) Act No. 02 of 2025**:

### Standard Employment Income
-   **Tax-Free Threshold**: Rs. 150,000 / month (Rs. 1,800,000 / year).
-   **Relief**: First Rs. 150,000 is tax-free.
-   **Progressive Tax Slabs (Annual Taxable Income)**:
    -   First Rs. 1,000,000: **6%**
    -   Next Rs. 500,000: **18%**
    -   Next Rs. 500,000: **24%**
    -   Next Rs. 500,000: **30%**
    -   Balance: **36%**

### Advanced Categories
-   **Service Export Income**: Taxed at progressive rates but **capped at 15%**.
-   **Investment Income**: Flat rate of **10%**.
-   **Special Gains**: Flat rate of **45%** (Liquor, Tobacco, Betting).

### Other Deductions
-   **EPF (Employee)**: 8%
-   **EPF (Employer)**: 12%
-   **ETF (Employer)**: 3%
-   **Stamp Duty**: Rs. 25/month if Net Salary > Rs. 25,000.

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to suggest a feature:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👤 Author

**Shehan Sanjula**

-   Website: [shehansanjula.github.io](https://shehansanjula.github.io)
-   LinkedIn: [linkedin.com/in/shehansanjula](https://lk.linkedin.com/in/shehansanjula)
-   Facebook: [facebook.com/shehansanjula66](https://www.facebook.com/shehansanjula66)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <small> Data Processed Locally in Browser | Open Source Project </small>
</div>
