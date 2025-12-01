import React from 'react';
import Navigation from './components/Navigation';
import RewardCalculator from './components/RewardCalculator';
import VulnerabilityCard from './components/VulnerabilityCard';
import PromptGenerator from './components/PromptGenerator';
import { INELIGIBLE_ITEMS, VULNERABILITIES, FAQS } from './constants';
import { AlertTriangle, Info, CheckCircle, HelpCircle, FileText, Ban, Award, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Expanded for October 2025
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            AI Vulnerability <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Reward Program
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Help us secure the future of AI. Report vulnerabilities in Google's Generative AI products and earn rewards up to $20,000+.
          </p>
        </div>
      </section>

      {/* Scope Section */}
      <section id="scope" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg shrink-0">
              <Info className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Program Scope</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The AI VRP covers AI-related vulnerability and abuse issues in Google and Alphabet AI products.
                Issues must involve interaction with an LLM or GenAI system as an integral part of the vulnerability.
              </p>
              <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-yellow-500">
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-yellow-500 block mb-1">Important Note</span>
                  Issues in Vertex AI or Google Cloud are covered by the Google Cloud VRP, not this program, unless explicitly noted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ineligible Section */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Ban className="w-6 h-6 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Out of Scope</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INELIGIBLE_ITEMS.map((item, idx) => (
            <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-5 hover:bg-slate-800/50 transition-colors">
              <h3 className="font-semibold text-slate-200 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vulnerabilities Grid */}
      <section id="vulnerabilities" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Qualifying Vulnerabilities</h2>
            <p className="text-slate-400">Classified into Security (S) and Abuse (A) categories.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VULNERABILITIES.map((vuln) => (
            <VulnerabilityCard key={vuln.id} vuln={vuln} />
          ))}
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
           <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
             <Sparkles className="w-8 h-8 text-purple-500" />
             Scenario Generator
           </h2>
           <p className="text-slate-400">
             Use our Gemini-powered tool to brainstorm test scenarios aligned with specific VRP categories.
           </p>
        </div>
        <PromptGenerator />
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Rewards & Calculator</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Calculate potential payouts based on the product tier and vulnerability impact.
              We value quality reports and offer multipliers for exceptional research.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <RewardCalculator />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Quality Multipliers</h3>
                <p className="text-sm text-slate-400">
                  Rewards scale from 0.8x to 1.2x based on report clarity, reproducibility, and impact analysis.
                </p>
             </div>
             <div className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Novelty Bonus</h3>
                <p className="text-sm text-slate-400">
                  Discretionary bonuses ($1k - $5k) for truly unique reports that change how we think about security.
                </p>
             </div>
             <div className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Code of Conduct</h3>
                <p className="text-sm text-slate-400">
                  Always test on your own accounts. Never access data you don't own. Do not disrupt services.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <FileText className="w-5 h-5 text-slate-600" />
             <span className="text-slate-500 text-sm">Based on October 2025 AI VRP Rules</span>
          </div>
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Google AI Security Team (Unofficial Hub)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;