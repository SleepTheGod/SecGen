import React, { useState, useMemo } from 'react';
import { PRODUCT_TIERS, VULNERABILITIES } from '../constants';
import { ProductTier, VulnerabilityCategory } from '../types';
import { Calculator, AlertCircle, Award, CheckCircle2 } from 'lucide-react';

const RewardCalculator: React.FC = () => {
  const [tier, setTier] = useState<ProductTier>('Flagship');
  const [category, setCategory] = useState<string>(VULNERABILITIES[0].id);
  const [quality, setQuality] = useState<number>(1.0);
  const [isNovel, setIsNovel] = useState(false);

  const selectedCategory = useMemo(() => 
    VULNERABILITIES.find(v => v.id === category), 
  [category]);

  const baseReward = useMemo(() => {
    if (!selectedCategory) return 0;
    const val = selectedCategory.baseRewards[tier];
    return val === 'credit' ? 0 : val;
  }, [selectedCategory, tier]);

  const totalReward = useMemo(() => {
    let total = baseReward * quality;
    if (isNovel && total > 0) total += 3000; // Average of 1k-5k
    return total;
  }, [baseReward, quality, isNovel]);

  const isCredit = baseReward === 0;

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Bounty Calculator</h2>
          <p className="text-slate-400 text-sm">Estimate your potential reward</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Tier Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Product Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {PRODUCT_TIERS.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTier(t.name)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    tier === t.name
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {PRODUCT_TIERS.find(t => t.name === tier)?.examples[0]} etc.
            </p>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Vulnerability Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {VULNERABILITIES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id}: {v.name}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <div className="mt-2 p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-blue-400">Example:</span> {selectedCategory.example}
                </p>
              </div>
            )}
          </div>

          {/* Quality & Bonus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Report Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={0.8}>Low Quality (0.8x)</option>
                <option value={1.0}>Good Quality (1.0x)</option>
                <option value={1.2}>Exceptional (1.2x)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setIsNovel(!isNovel)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  isNovel
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Novelty Bonus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-slate-900 rounded-xl p-6 flex flex-col justify-between border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Estimated Bounty</h3>
            <div className="flex items-baseline gap-1">
              {isCredit ? (
                <span className="text-3xl font-bold text-white">Honorable Mention</span>
              ) : (
                <>
                  <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    ${totalReward.toLocaleString()}
                  </span>
                  <span className="text-slate-500">USD</span>
                </>
              )}
            </div>
            
            {isNovel && !isCredit && (
              <div className="mt-2 flex items-center gap-2 text-xs text-purple-400">
                <Award className="w-3 h-3" />
                <span>Includes estimated ~$3k novelty bonus</span>
              </div>
            )}
          </div>

          <div className="space-y-3 mt-8">
            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800">
              <span className="text-slate-400">Base Amount</span>
              <span className="text-slate-200 font-mono">
                {isCredit ? 'Credit' : `$${baseReward.toLocaleString()}`}
              </span>
            </div>
             <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800">
              <span className="text-slate-400">Multiplier</span>
              <span className={`font-mono ${quality > 1 ? 'text-green-400' : quality < 1 ? 'text-red-400' : 'text-slate-200'}`}>
                {quality}x
              </span>
            </div>
            <div className="pt-2">
              <div className="flex gap-2 items-start p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-500/90">
                  Final amounts are always at the discretion of the reward panel. Unclaimed rewards donate to charity after 12 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCalculator;
