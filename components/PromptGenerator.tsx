import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { VULNERABILITIES } from '../constants';
import { Sparkles, Terminal, Copy, AlertTriangle, Play, Loader2, Code2 } from 'lucide-react';

const PromptGenerator: React.FC = () => {
  const [selectedVulnId, setSelectedVulnId] = useState(VULNERABILITIES[0].id);
  const [targetApp, setTargetApp] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedVuln = VULNERABILITIES.find(v => v.id === selectedVulnId) || VULNERABILITIES[0];

  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
      setError("API Key is missing. Cannot generate scenarios.");
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `You are an expert security researcher assisting in the Google AI Vulnerability Reward Program (VRP). 
      Your goal is to help researchers create valid, reproduceable Proof of Concept (PoC) code for testing AI vulnerabilities.
      
      RULES:
      1. Do NOT generate harmful, abusive, or illegal payloads that damage systems or access data without authorization.
      2. Focus on "Safe Harbor" testing: PoCs should demonstrate impact harmlessly (e.g., popping an alert(1), creating a draft email labeled "TEST", calculating a specific number).
      3. Provide executable code (Python, JavaScript, Bash, HTML) that sets up the test environment or payloads.
      4. Ensure the scenarios strictly align with the VRP definition provided.
      5. Output format must be Markdown with code blocks.
      `;

      const prompt = `
        Context: Google AI VRP Bug Hunting.
        Vulnerability Category: ${selectedVuln.id} - ${selectedVuln.name}
        Description: ${selectedVuln.description}
        Reference Example: ${selectedVuln.example}
        Target Application/Feature: ${targetApp || 'Generic Google AI Product'}

        Task: Generate 2 detailed, technical test cases with executable PoC code.

        For each test case, provide:
        1. **Title**: Technical name of the attack vector.
        2. **VRP Alignment**: Briefly explain why this fits ${selectedVuln.id}.
        3. **Attack Logic**: Step-by-step execution flow.
        4. **PoC Code/Payload**: 
           - If web-based (XSS/Phishing): Provide the HTML/JS source.
           - If Indirect Injection (e.g. via file): Provide a Python script to generate the malicious file (e.g., .ics, .pdf, .txt).
           - If API-based (Model Theft/DoS): Provide a Python script using 'requests' or a 'curl' command.
           - If Prompt Injection: Provide the exact injection text and a script to encode it if necessary.
        5. **Verification**: How to verify success safely (e.g., "Check if the variable X contains the leaked string").
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      setGeneratedContent(response.text || "No content generated.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate scenarios.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-3 bg-purple-500/10 rounded-lg">
          <Code2 className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">PoC Generator</h2>
          <p className="text-slate-400 text-sm">Generate executable Python/JS code to test vulnerabilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Configuration Panel */}
        <div className="space-y-6 lg:col-span-1">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Vulnerability Category</label>
            <select
              value={selectedVulnId}
              onChange={(e) => setSelectedVulnId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {VULNERABILITIES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id}: {v.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2 p-2 bg-slate-800/50 rounded border border-slate-700/50">
              {selectedVuln.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Feature (Optional)</label>
            <input
              type="text"
              value={targetApp}
              onChange={(e) => setTargetApp(e.target.value)}
              placeholder="e.g. Gmail Sidebar, Calendar API, Docs"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-purple-500 outline-none placeholder-slate-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
              isLoading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-500/20'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Terminal className="w-5 h-5" />}
            {isLoading ? 'Generating Code...' : 'Generate PoC'}
          </button>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
             <div className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-500/90 leading-relaxed">
                  <strong>Code of Conduct:</strong> Always test on your own accounts. Generated code is for educational and testing purposes only. Review all code before execution.
                </p>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2 min-h-[400px] bg-slate-950 rounded-xl border border-slate-800 p-6 relative flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
             <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-4 h-4" />
                <span className="text-sm font-mono">poc_output.md</span>
             </div>
             {generatedContent && (
               <button 
                 onClick={() => navigator.clipboard.writeText(generatedContent)}
                 className="text-xs flex items-center gap-1 text-slate-500 hover:text-white transition-colors"
               >
                 <Copy className="w-3 h-3" /> Copy Code
               </button>
             )}
          </div>

          {error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-red-400 p-4 text-center">
              <AlertTriangle className="w-8 h-8 mb-2 opacity-50" />
              <p>{error}</p>
            </div>
          ) : generatedContent ? (
            <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
               <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 leading-relaxed">
                 {generatedContent}
               </pre>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
               <Code2 className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-sm">Select a category to generate executable PoC code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;