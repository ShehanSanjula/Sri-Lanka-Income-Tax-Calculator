import { useState, useEffect } from 'react';
import { calculateTax, formatCurrency } from './utils/taxCalculator';

function App() {
  const [income, setIncome] = useState('');
  const [mode, setMode] = useState('monthly');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (income) {
      setResult(calculateTax(income, mode));
    } else {
      setResult(null);
    }
  }, [income, mode]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Calculator Section */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h1 className="text-2xl font-bold mb-6 text-emerald-400">Sri Lanka Tax Calculator 2026</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Calculation Mode</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-700 p-1 rounded-lg">
                <button
                  onClick={() => setMode('monthly')}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${mode === 'monthly' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setMode('annual')}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${mode === 'annual' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Total {mode === 'monthly' ? 'Monthly' : 'Annual'} Income (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rs.</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="e.g. 250000"
                  className="w-full bg-slate-900 border border-slate-700 text-white text-lg rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Quick Summary Card */}
            {result && (
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Tax</span>
                  <span className="text-red-400 font-bold text-lg">{formatCurrency(result.tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                  <span className="text-slate-400">Net Income</span>
                  <span className="text-emerald-400 font-bold text-xl">{formatCurrency(result.netIncome)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Tax Breakdown</h2>

          {result && result.brackets.length > 0 ? (
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {result.brackets.map((bracket, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      {bracket.rate * 100}% Band
                    </div>
                    <div className="text-sm text-slate-300">
                      {bracket.limit === Infinity ? 'Balance' : `Next ${formatCurrency(bracket.limit)}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Tax Amount</div>
                    <div className="font-mono text-red-300">{formatCurrency(bracket.tax)}</div>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20 text-center">
                <p className="text-sm text-emerald-400">
                  Effective Tax Rate: {((result.tax / parseFloat(income || 1)) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center">
                <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p>Enter your income to see the breakdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
