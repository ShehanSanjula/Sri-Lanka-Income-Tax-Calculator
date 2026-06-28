import { useState, useEffect } from 'react';
import { calculateTax, formatCurrency, formatCompactNumber, formatViewCount } from './utils/taxCalculator';

function App() {
  // Helper to remove commas for calculation
  const cleanNumber = (val) => val.replace(/,/g, '');

  const [basic, setBasic] = useState('');
  const [fixedAllowances, setFixedAllowances] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');
  const [exportIncome, setExportIncome] = useState('');
  const [investmentIncome, setInvestmentIncome] = useState('');
  const [dividendIncome, setDividendIncome] = useState('');
  const [specialGains, setSpecialGains] = useState('');
  const [mode, setMode] = useState('monthly');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState(null);
  const [viewCount, setViewCount] = useState(null); // Initialize as null for loading state
  const [professionType, setProfessionType] = useState('salaried');

  const isExempt = professionType === 'salaried' && (parseFloat(cleanNumber(otherAllowances)) || 0) === 0;

  const handleModeChange = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    // Clear all inputs on mode switch due to different limits
    setBasic('');
    setFixedAllowances('');
    setOtherAllowances('');
    setExportIncome('');
    setExportIncome('');
    setInvestmentIncome('');
    setDividendIncome('');
    setSpecialGains('');
    setResult(null);
  };

  useEffect(() => {
    // Fetch real view count using a unique namespace
    // Using shehansanjula-tax-calc namespace to ensure uniqueness
    const fetchViews = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/shehansanjula-tax-calc/visits/up');
        if (response.ok) {
          const data = await response.json();
          setViewCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch view count:", error);
        // Fallback to a default number if API fails, or keep null to show nothing/loading
        setViewCount(100);
      }
    };

    fetchViews();
  }, []);

  useEffect(() => {
    // Clean inputs before calculating
    const basicVal = cleanNumber(basic);
    const fixedVal = cleanNumber(fixedAllowances);
    const otherVal = cleanNumber(otherAllowances);
    const exportVal = cleanNumber(exportIncome);
    const investVal = cleanNumber(investmentIncome);
    const dividendVal = cleanNumber(dividendIncome);
    const specialVal = cleanNumber(specialGains);

    const basicNum = parseInt(basicVal || '0', 10);

    if (basicNum > 0 && basicNum <= 1000) {
      setResult(null);
    } else if (basicVal || fixedVal || otherVal || exportVal || investVal || dividendVal || specialVal) {
      setResult(calculateTax(basicVal, fixedVal, otherVal, exportVal, investVal, dividendVal, specialVal, mode, professionType));
    } else {
      setResult(null);
    }
  }, [basic, fixedAllowances, otherAllowances, exportIncome, investmentIncome, dividendIncome, specialGains, mode, professionType]);

  return (
    <div className="min-h-screen bg-[#022c22] text-emerald-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative custom-scrollbar">

      <PrivacyBanner />

      {/* Background Ambience - Fluid Cyber Wealth */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#022c22]">
        {/* Moving Fluid Blobs */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-emerald-600/20 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-[20%] right-[-20%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-emerald-800/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>

        {/* Floating Particles */}
        <div className="absolute top-[15%] left-[15%] w-1.5 h-1.5 bg-amber-300 rounded-full animate-float opacity-30 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
        <div className="absolute top-[45%] right-[25%] w-2 h-2 bg-emerald-400 rounded-full animate-float animation-delay-2000 opacity-30 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
        <div className="absolute bottom-[25%] left-[10%] w-1 h-1 bg-amber-200 rounded-full animate-float animation-delay-4000 opacity-20"></div>
        <div className="absolute top-[10%] right-[10%] w-1 h-1 bg-emerald-200 rounded-full animate-float animation-delay-1000 opacity-20"></div>

        {/* Subtle Grid */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBMMTQwIDBoMS41TDAgNDAuNXoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-10"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <nav className="border-b border-amber-500/10 bg-[#022c22]/90 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* Animated Logo Container */}
              <div className="relative w-10 h-10 flex items-center justify-center bg-[#022c22] border border-emerald-500/50 rounded-lg shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_20px_0px_rgba(251,191,36,0.5)] transition-all duration-300">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-amber-400 font-mono">S</span>
                <div className="absolute -bottom-1 flex gap-0.5">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-amber-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-emerald-300 transition-colors">Sri Lanka Tax Calculator</h1>
                <p className="text-[10px] text-amber-400 font-mono uppercase tracking-widest pl-0.5">Y/A 2025/2026</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-xs font-medium text-emerald-100/80 hover:bg-emerald-900/30 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Official Rates
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/20 border border-amber-500/20 text-xs font-medium text-amber-100/80 hover:bg-amber-900/30 transition-colors cursor-default" title="Total Views">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-mono">{viewCount !== null ? formatViewCount(viewCount) : '...'}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-[90rem] mx-auto px-4 py-8 md:py-12 space-y-8">

          {/* Compliance Banner */}
          {isExempt && (
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-[#064e3b]/30 backdrop-blur-xl flex items-start gap-4 shadow-lg shadow-emerald-950/20 max-w-5xl mx-auto animate-fade-in-right">
              <div className="p-2.5 bg-emerald-500/10 rounded-full text-emerald-400 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-0.5">Compliance Active</h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  🎉 2026 Compliance Note: Under the June 2026 Amendment Act, you are legally exempt from maintaining a tax file or filing an annual income tax return if your only earnings are covered entirely by APIT.
                </p>
              </div>
            </div>
          )}

          {/* Calculator Section */}
          <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* LEFT: Inputs (3 Cols on Desktop) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-amber-500/10 shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative space-y-6">
                  {/* Mode Toggle */}
                  <div className="bg-[#064e3b]/40 p-1.5 rounded-xl inline-flex w-full border border-amber-500/10">
                    <button onClick={() => handleModeChange('monthly')} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${mode === 'monthly' ? 'bg-[#065f46] text-white shadow-lg shadow-black/20 ring-1 ring-white/10' : 'text-emerald-200/60 hover:text-emerald-100'}`}>Monthly</button>
                    <button onClick={() => handleModeChange('annual')} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${mode === 'annual' ? 'bg-[#065f46] text-white shadow-lg shadow-black/20 ring-1 ring-white/10' : 'text-emerald-200/60 hover:text-emerald-100'}`}>Annual</button>
                  </div>

                  {/* Profile Dropdown Selector */}
                  <div className="group relative">
                    <label className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-2 block group-focus-within:text-amber-400 transition-colors">Income Source Profile</label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500/50 group-focus-within:text-amber-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <select
                        value={professionType}
                        onChange={(e) => {
                          const val = e.target.value;
                          setProfessionType(val);
                          if (val === 'independent') {
                            setBasic('');
                            setFixedAllowances('');
                          }
                        }}
                        className="w-full bg-[#064e3b]/30 border border-emerald-500/20 text-white rounded-xl py-3.5 pl-12 pr-10 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all font-sans text-sm appearance-none cursor-pointer shadow-inner"
                      >
                        <option value="salaried" className="bg-[#022c22] text-white">Standard Salaried Employee</option>
                        <option value="independent" className="bg-[#022c22] text-white">Independent Creative / Service Provider</option>
                      </select>
                      <div className="absolute right-4 pointer-events-none text-emerald-500/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-bold">Employment Income</p>
                    <FormattedInput
                      label="Basic Salary"
                      value={basic}
                      onChange={setBasic}
                      max={mode === 'monthly' ? 5000000 : 60000000}
                      placeholder="150,000"
                      suffix="LKR"
                      icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                      subtext={professionType === "independent" ? "Not applicable for independent profile" : "Subject to EPF/ETF"}
                      disabled={professionType === "independent"}
                    />
                    <FormattedInput
                      label="Fixed Allowances"
                      value={fixedAllowances}
                      onChange={setFixedAllowances}
                      max={mode === 'monthly' ? 5000000 : 60000000}
                      placeholder="25,000"
                      suffix="LKR"
                      icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      subtext={professionType === "independent" ? "Not applicable for independent profile" : "Subject to EPF/ETF"}
                      disabled={professionType === "independent"}
                    />
                    <FormattedInput
                      label="Other Income"
                      value={otherAllowances}
                      onChange={setOtherAllowances}
                      max={100000000000}
                      placeholder="10,000"
                      suffix="LKR"
                      icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                      subtext="Taxable Only"
                      tooltip="Note: Under Section 52A, do not include lump sums received from life insurance policy maturity, surrender, or death payouts, as they are completely tax-exempt."
                    />

                    <div className="h-px bg-emerald-500/10 my-2"></div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-bold">Advanced Income Sources</p>
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="md:hidden flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-300 transition-all"
                      >
                        <span>{showAdvanced ? 'Hide' : 'Show'}</span>
                        <svg className={`w-3 h-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <div className={`${showAdvanced ? 'block' : 'hidden'} md:block space-y-5`}>
                      <FormattedInput
                        label="Service Export Income"
                        value={exportIncome}
                        onChange={setExportIncome}
                        max={100000000000}
                        placeholder="USD Earnings (LKR)"
                        suffix="LKR"
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        subtext="Capped at 15% Tax Rate"
                      />

                      <FormattedInput
                        label="Investment Income"
                        value={investmentIncome}
                        onChange={setInvestmentIncome}
                        max={100000000000}
                        placeholder="Interest/ FD"
                        suffix="LKR"
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        subtext="10% WHT / AIT"
                      />

                      <FormattedInput
                        label="Dividend Income"
                        value={dividendIncome}
                        onChange={setDividendIncome}
                        max={100000000000}
                        placeholder="Share Profits"
                        suffix="LKR"
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        subtext="Final WHT 15%"
                      />

                      <FormattedInput
                        label="Special Gains"
                        value={specialGains}
                        onChange={setSpecialGains}
                        max={100000000000}
                        placeholder="Betting / Liquor"
                        suffix="LKR"
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                        subtext="Flat 45% Tax"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE: Hero Estimate (5 Cols on Desktop) */}
            <div className="lg:col-span-5">
              {result ? (
                <div className="animate-fade-in-right h-full">
                  {/* Hero Card - Gold/Emerald */}
                  <div className="glass-card rounded-[2rem] p-8 border border-amber-500/20 shadow-[0_0_50px_-12px] shadow-emerald-900/30 relative overflow-hidden group h-full flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 animate-gradient-x opacity-50"></div>

                    <div className="relative flex flex-col items-center gap-8">
                      {/* Distribution Chart - Centered and larger in this layout */}
                      <div className="relative w-48 h-48 flex-shrink-0">
                        <DonutChart
                          data={[
                            { label: 'Net', value: result.netSalary, color: '#fbbf24' },   // Amber
                            { label: 'Tax', value: result.tax, color: '#f87171' },         // Red
                            { label: 'EPF', value: result.epfEmployee, color: '#34d399' }, // Emerald
                            { label: 'SD', value: result.stampDuty || 0, color: '#22d3ee' } // Cyan (Stamp Duty)
                          ]}
                          total={result.totalEarnings}
                        />
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                          <span className="text-xs text-emerald-400/60 font-bold uppercase tracking-wider">Net</span>
                          <span className="text-2xl font-bold text-amber-300">{Math.round((result.netSalary / result.totalEarnings) * 100)}%</span>
                        </div>
                      </div>

                      <div className="text-center w-full">
                        <p className="text-emerald-200/80 font-medium uppercase tracking-widest text-sm mb-3">Estimated Take Home Pay</p>
                        <div className="flex items-baseline justify-center gap-2 flex-wrap">
                          <span className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-100 via-amber-200 to-amber-500 font-sans tracking-tight drop-shadow-sm whitespace-nowrap" title={formatCurrency(result.netSalary)}>
                            {formatCompactNumber(result.netSalary)}
                          </span>
                          <span className="text-xl text-amber-500/80 font-medium">LKR</span>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                          <Badge label="Total Earnings" value={formatCurrency(result.totalEarnings)} />
                          <Badge label="Total Deductions" value={formatCurrency(result.tax + result.epfEmployee + result.stampDuty)} color="text-red-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 glass-card rounded-3xl border border-amber-500/10 border-dashed">
                  <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                    <svg className="w-8 h-8 text-emerald-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  </div>
                  <h3 className="text-xl font-medium text-emerald-100 mb-2">Ready to Calculate</h3>
                  <p className="text-emerald-200/50 max-w-xs">Enter your salary details to see your comprehensive breakdown.</p>
                </div>
              )}
            </div>

            {/* RIGHT: Breakdown (4 Cols on Desktop) */}
            <div className="lg:col-span-4 space-y-6">
              {result && (
                <div className="space-y-6 animate-fade-in-right">
                  {/* Detailed Breakdown Grid - Stacked Vertically now */}
                  <div className="grid grid-cols-1 gap-4">
                    <DetailCard
                      title="Deductions"
                      items={[
                        { label: "APIT (Tax)", value: result.tax, color: "text-red-300" },
                        { label: "EPF (Employee 8%)", value: result.epfEmployee, color: "text-amber-300" },
                        { label: "Stamp Duty", value: result.stampDuty, color: "text-emerald-400" }
                      ]}
                      total={{ label: "Total Deductions", value: result.tax + result.epfEmployee + result.stampDuty }}
                    />

                    {(result.breakdown.export > 0 || result.breakdown.investment > 0 || result.breakdown.dividend > 0 || result.breakdown.special > 0 || result.breakdown.ait > 0) && (
                      <DetailCard
                        title="Tax Components"
                        items={[
                          { label: "Standard Tax", value: result.breakdown.standard, color: "text-red-200" },
                          ...(result.breakdown.export > 0 ? [{ label: "Export Income Tax (15% Cap)", value: result.breakdown.export, color: "text-amber-200" }] : []),
                          ...(result.breakdown.investment > 0 ? [{ label: "Investment Income Tax (10%)", value: result.breakdown.investment, color: "text-blue-200" }] : []),
                          ...(result.breakdown.dividend > 0 ? [{ label: "Dividend Income Tax (15%)", value: result.breakdown.dividend, color: "text-blue-200" }] : []),
                          ...(result.breakdown.special > 0 ? [{ label: "Special Gains Tax (45%)", value: result.breakdown.special, color: "text-purple-200" }] : []),
                          ...(result.breakdown.ait > 0 ? [{ label: "Advance Income Tax (5% AIT)", value: result.breakdown.ait, color: "text-orange-200" }] : [])
                        ]}
                        total={{ label: "Total Tax", value: result.tax }}
                      />
                    )}

                    <DetailCard
                      title="Employer Contributions"
                      items={[
                        { label: "EPF (Employer 12%)", value: result.epfEmployer, color: "text-emerald-200" },
                        { label: "ETF (Employer 3%)", value: result.etfEmployer, color: "text-emerald-200" }
                      ]}
                      total={{ label: "Cost to Company", value: result.totalEarnings + result.epfEmployer + result.etfEmployer }}
                    />
                  </div>

                  {/* Tax Breakdown Accordion */}
                  <div className="glass-card rounded-2xl border border-amber-500/10 overflow-hidden">
                    <div className="px-6 py-4 border-b border-amber-500/10 bg-[#064e3b]/20 flex justify-between items-center">
                      <span className="text-sm font-semibold text-emerald-100">Tax Breakdown</span>
                    </div>
                    <div className="divide-y divide-emerald-500/10 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {result.brackets.map((b, i) => (
                        <div key={i} className="flex justify-between px-6 py-3 text-sm hover:bg-emerald-500/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className={`w-1.5 h-1.5 rounded-full ${b.tax > 0 ? 'bg-amber-400 shadow-[0_0_8px] shadow-amber-500/50' : 'bg-emerald-900'}`}></span>
                            <span className="text-emerald-200/80">
                              <span className="text-white font-mono font-bold mr-2">
                                {typeof b.rate === 'string' ? b.rate : (Math.round(b.rate * 100) + '%')}
                              </span>
                              {b.label && <span className="text-xs text-amber-400 mr-2">[{b.label}]</span>}
                              on {formatCurrency(b.amount).replace('LKR', '').replace('.00', '').trim()}
                            </span>
                          </div>
                          <span className="font-mono text-emerald-100">{formatCurrency(b.tax).replace('LKR', '').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Note Section - Restored to detailed view */}
          <div className="border-t border-emerald-500/10 pt-12 space-y-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent flex-grow"></div>
              <span className="text-sm font-semibold text-amber-500/80 uppercase tracking-widest">Official Information</span>
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <NoteBlock title="Legislative Authority">
                  <p>Based on the <strong>Inland Revenue (Amendment) Act No. 02 of 2025</strong>. New individual income tax rates effective from April 01, 2025.</p>
                  <p className="mt-2 text-xs text-emerald-300">Includes provisions for Service Export (15% cap), Investment Income (10%), and Special Gains (45%).</p>
                </NoteBlock>
                <NoteBlock title="Relief Structure">
                  <p>Annual Tax Free Threshold: <strong>Rs. 1,800,000</strong></p>
                  <p>Monthly Tax Free Threshold: <strong>Rs. 150,000</strong></p>
                </NoteBlock>
              </div>
              <div className="glass-card rounded-xl border border-emerald-500/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-emerald-900/30 text-emerald-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Monthly Income Slab</th>
                      <th className="px-4 py-3 text-left font-medium">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-500/10 text-emerald-200/70">
                    <tr><td className="px-4 py-2.5">First 150,000</td><td className="px-4 py-2.5 text-emerald-400">Relief</td></tr>
                    <tr><td className="px-4 py-2.5">Next 100,000 (up to 250k)</td><td className="px-4 py-2.5 text-white">6%</td></tr>
                    <tr><td className="px-4 py-2.5">Next 50,000</td><td className="px-4 py-2.5 text-white">18%</td></tr>
                    <tr><td className="px-4 py-2.5">Next 50,000</td><td className="px-4 py-2.5 text-white">24%</td></tr>
                    <tr><td className="px-4 py-2.5">Next 50,000</td><td className="px-4 py-2.5 text-white">30%</td></tr>
                    <tr><td className="px-4 py-2.5">Balance</td><td className="px-4 py-2.5 text-white">36%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>

        {/* Brand Footer - Retaining the specific format requested */}
        <footer className="mt-auto border-t border-emerald-500/10 bg-[#022c22]/90 backdrop-blur-xl py-8 relative">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] text-emerald-400/70 font-mono tracking-wide uppercase font-bold">
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Data Processed Locally in Browser
              </span>
              <span className="hidden md:inline text-emerald-500/40">|</span>
              <a href="https://github.com/shehansanjula/Sri-Lanka-Income-Tax-Calculator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                Open Source Project
              </a>
            </div>


            {/* Social Links */}
            <div className="flex justify-center items-center gap-6 pt-2">
              <span className="text-xs text-emerald-400/60 font-mono tracking-wide">Any bugs? Let me know:</span>
              <a href="https://www.facebook.com/shehansanjula66" target="_blank" rel="noopener noreferrer" className="text-emerald-500/60 hover:text-[#1877F2] transition-colors transform hover:scale-110 duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://lk.linkedin.com/in/shehansanjula" target="_blank" rel="noopener noreferrer" className="text-emerald-500/60 hover:text-[#0A66C2] transition-colors transform hover:scale-110 duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://shehansanjula.github.io" target="_blank" rel="noopener noreferrer" className="text-emerald-500/60 hover:text-amber-400 transition-colors transform hover:scale-110 duration-300" aria-label="Website">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </a>
            </div>
            <p className="text-sm font-mono text-emerald-400/80">
              &copy; 2018-{new Date().getFullYear()} Copyright <span className="text-emerald-100 font-bold">Shehan Sanjula</span> All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Sub-components
const FormattedInput = ({ label, value, onChange, placeholder, suffix, icon, subtext, max, tooltip, disabled }) => {
  // Format number with commas
  const formatNumber = (val) => {
    if (!val) return '';
    const num = val.replace(/,/g, ''); // Remove existing commas
    if (isNaN(num)) return val;
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const rawValue = val.replace(/,/g, '');
    // Only allow numbers
    if (!/^\d*$/.test(rawValue)) return;
    if (max && parseInt(rawValue || '0', 10) > max) return;
    onChange(formatNumber(val));
  };

  return (
    <div className={`group relative ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <label className="text-xs font-bold text-emerald-200 uppercase tracking-widest block group-focus-within:text-amber-400 transition-colors">{label}</label>
        {tooltip && (
          <div className="relative group/tooltip">
            <button type="button" className="text-emerald-500/70 hover:text-amber-400 transition-colors focus:outline-none" aria-label="Information">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-[#022c22] border border-amber-500/30 text-emerald-100 text-[11px] rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none font-sans font-normal normal-case tracking-normal">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#022c22]"></div>
            </div>
          </div>
        )}
      </div>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500/50 group-focus-within:text-amber-500 transition-colors">
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-[#064e3b]/30 border border-emerald-500/20 text-white rounded-xl py-3.5 pl-12 pr-12 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all font-mono text-lg placeholder:text-emerald-800 shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-emerald-950/20"
        />
        <span className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none">
          <span className="text-xs text-emerald-600 font-medium tracking-wider">{suffix}</span>
        </span>
      </div>
      {subtext && <p className="mt-1.5 text-[10px] font-medium text-emerald-300/80 tracking-wide">{subtext}</p>}
    </div>
  );
};

const Badge = ({ label, value, color = "text-slate-200" }) => (
  <div className="bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-500/10 flex items-center gap-2">
    <span className="text-[10px] text-emerald-400/90 font-bold uppercase tracking-wider">{label}</span>
    <span className={`text-sm font-bold font-mono ${color}`}>{value}</span>
  </div>
);

const DetailCard = ({ title, items, total }) => (
  <div className="glass-card p-5 rounded-2xl border border-emerald-500/10 bg-[#064e3b]/10">
    <h4 className="text-xs font-bold text-emerald-400/90 uppercase tracking-widest mb-4">{title}</h4>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center text-sm">
          <span className="text-emerald-100/90 font-medium">{item.label}</span>
          <span className={`font-mono font-medium ${item.color}`}>{formatCurrency(item.value)}</span>
        </div>
      ))}
      <div className="h-px bg-emerald-500/10 my-2"></div>
      <div className="flex justify-between items-center text-sm font-semibold">
        <span className="text-slate-200">{total.label}</span>
        <span className="font-mono text-white">{formatCurrency(total.value)}</span>
      </div>
    </div>
  </div>
);

const NoteBlock = ({ title, children }) => (
  <div>
    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
      {title}
    </h4>
    <div className="text-sm text-emerald-200/90 leading-relaxed border-l-2 border-emerald-500/10 pl-4 font-medium">
      {children}
    </div>
  </div>
);

// SVG Helper
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return { x, y };
}

const DonutChart = ({ data, total }) => {
  // Safety check for total
  if (!total || total <= 0) {
    return (
      <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full transform -rotate-90 overflow-visible opacity-30">
        <circle cx="0" cy="0" r="1" fill="none" stroke="#064e3b" strokeWidth="0.5" />
      </svg>
    );
  }

  let cumulative = 0;

  // Calculate segments
  const segments = data.map((d, i) => {
    if (!d.value || d.value <= 0) return null;

    const startPercent = cumulative;
    const slicePercent = d.value / total;

    // Handle full circle case
    if (slicePercent >= 0.999) {
      return <circle key={i} cx="0" cy="0" r="1" fill={d.color} stroke="#022c22" strokeWidth="0.05" />;
    }

    cumulative += slicePercent;
    const endPercent = cumulative;

    const startParams = getCoordinatesForPercent(startPercent);
    const endParams = getCoordinatesForPercent(endPercent);

    const isLargeArc = slicePercent > 0.5 ? 1 : 0;

    const pathData = [
      `M ${startParams.x} ${startParams.y}`,
      `A 1 1 0 ${isLargeArc} 1 ${endParams.x} ${endParams.y}`,
      `L 0 0`,
    ].join(' ');

    return <path key={i} d={pathData} fill={d.color} stroke="#022c22" strokeWidth="0.02" className="hover:opacity-90 transition-opacity" />;
  });

  return (
    <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full transform -rotate-90 overflow-visible">
      {segments}
      {/* Cutout center for Donut effect */}
      <circle cx="0" cy="0" r="0.75" fill="#022c22" />
      <circle cx="0" cy="0" r="0.75" fill="rgba(6, 78, 59, 0.4)" />
    </svg>
  );
};

const PrivacyBanner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000); // Auto-hide after 8 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-[60] animate-fade-in-up">
      <div className="glass-card p-4 rounded-xl border border-emerald-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] bg-[#064e3b]/90 backdrop-blur-xl flex items-start gap-4 ring-1 ring-white/5">
        <div className="p-2.5 bg-emerald-500/10 rounded-full text-emerald-400 flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
            Privacy First
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">SECURE</span>
          </h4>
          <p className="text-xs text-emerald-100/70 leading-relaxed">
            Data is processed locally in your browser. No information is saved or stored on any server.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-emerald-400/50 hover:text-emerald-200 transition-colors p-1 hover:bg-emerald-500/10 rounded-lg"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
