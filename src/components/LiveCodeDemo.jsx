import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Copy, Check } from 'lucide-react';

const LiveCodeDemo = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const demos = [
    {
      title: "React Hook",
      language: "javascript",
      code: (
        <div>
          <div className="syntax-comment">// Custom useCounter Hook</div>
          <div><span className="syntax-keyword">import</span> {"{ "}<span className="syntax-function">useState</span>{" } "}<span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;</div>
          <br />
          <div><span className="syntax-keyword">export</span> <span className="syntax-keyword">const</span> <span className="syntax-function">useCounter</span> = (<span className="syntax-variable">initialValue</span> = <span className="syntax-number">0</span>) =&gt; {"{"}</div>
          <div className="ml-4"><span className="syntax-keyword">const</span> [<span className="syntax-variable">count</span>, <span className="syntax-variable">setCount</span>] = <span className="syntax-function">useState</span>(<span className="syntax-variable">initialValue</span>);</div>
          <br />
          <div className="ml-4"><span className="syntax-keyword">const</span> <span className="syntax-function">increment</span> = () =&gt; <span className="syntax-function">setCount</span>(<span className="syntax-variable">prev</span> =&gt; <span className="syntax-variable">prev</span> + <span className="syntax-number">1</span>);</div>
          <div className="ml-4"><span className="syntax-keyword">const</span> <span className="syntax-function">decrement</span> = () =&gt; <span className="syntax-function">setCount</span>(<span className="syntax-variable">prev</span> =&gt; <span className="syntax-variable">prev</span> - <span className="syntax-number">1</span>);</div>
          <div className="ml-4"><span className="syntax-keyword">const</span> <span className="syntax-function">reset</span> = () =&gt; <span className="syntax-function">setCount</span>(<span className="syntax-variable">initialValue</span>);</div>
          <br />
          <div className="ml-4"><span className="syntax-keyword">return</span> {"{ "}<span className="syntax-property">count</span>, <span className="syntax-property">increment</span>, <span className="syntax-property">decrement</span>, <span className="syntax-property">reset</span>{" }"};</div>
          <div>{"}"}</div>
        </div>
      ),
      output: "✨ Custom React Hook for state management"
    },
    {
      title: "API Integration",
      language: "javascript", 
      code: (
        <div>
          <div className="syntax-comment">// Async API call with error handling</div>
          <div><span className="syntax-keyword">const</span> <span className="syntax-function">fetchUserData</span> = <span className="syntax-keyword">async</span> (<span className="syntax-variable">userId</span>) =&gt; {"{"}</div>
          <div className="ml-4"><span className="syntax-keyword">try</span> {"{"}</div>
          <div className="ml-8"><span className="syntax-keyword">const</span> <span className="syntax-variable">response</span> = <span className="syntax-keyword">await</span> <span className="syntax-function">fetch</span>(<span className="syntax-string">`/api/users/${`{userId}`}`</span>);</div>
          <br />
          <div className="ml-8"><span className="syntax-keyword">if</span> (!<span className="syntax-variable">response</span>.<span className="syntax-property">ok</span>) {"{"}</div>
          <div className="ml-12"><span className="syntax-keyword">throw</span> <span className="syntax-keyword">new</span> <span className="syntax-function">Error</span>(<span className="syntax-string">'Failed to fetch user'</span>);</div>
          <div className="ml-8">{"}"}</div>
          <br />
          <div className="ml-8"><span className="syntax-keyword">const</span> <span className="syntax-variable">userData</span> = <span className="syntax-keyword">await</span> <span className="syntax-variable">response</span>.<span className="syntax-function">json</span>();</div>
          <div className="ml-8"><span className="syntax-keyword">return</span> {"{ "}<span className="syntax-property">success</span>: <span className="syntax-keyword">true</span>, <span className="syntax-property">data</span>: <span className="syntax-variable">userData</span>{" }"};</div>
          <div className="ml-4">{"} "}<span className="syntax-keyword">catch</span> (<span className="syntax-variable">error</span>) {"{"}</div>
          <div className="ml-8"><span className="syntax-keyword">return</span> {"{ "}<span className="syntax-property">success</span>: <span className="syntax-keyword">false</span>, <span className="syntax-property">error</span>: <span className="syntax-variable">error</span>.<span className="syntax-property">message</span>{" }"};</div>
          <div className="ml-4">{"}"}</div>
          <div>{"}"}</div>
        </div>
      ),
      output: "🚀 Robust API integration with error handling"
    },
    {
      title: "Database Query",
      language: "javascript",
      code: (
        <div>
          <div className="syntax-comment">// MongoDB aggregation pipeline</div>
          <div><span className="syntax-keyword">const</span> <span className="syntax-function">getUserStats</span> = <span className="syntax-keyword">async</span> (<span className="syntax-variable">userId</span>) =&gt; {"{"}</div>
          <div className="ml-4"><span className="syntax-keyword">return</span> <span className="syntax-keyword">await</span> <span className="syntax-variable">User</span>.<span className="syntax-function">aggregate</span>([</div>
          <div className="ml-8">{"{ "}<span className="syntax-property">$match</span>: {"{ "}<span className="syntax-property">_id</span>: <span className="syntax-variable">userId</span>{" } }"},</div>
          <div className="ml-8">{"{ "}<span className="syntax-property">$lookup</span>: {"{"}</div>
          <div className="ml-12"><span className="syntax-property">from</span>: <span className="syntax-string">'projects'</span>,</div>
          <div className="ml-12"><span className="syntax-property">localField</span>: <span className="syntax-string">'_id'</span>,</div>
          <div className="ml-12"><span className="syntax-property">foreignField</span>: <span className="syntax-string">'createdBy'</span>,</div>
          <div className="ml-12"><span className="syntax-property">as</span>: <span className="syntax-string">'projects'</span></div>
          <div className="ml-8">{"} }"},</div>
          <div className="ml-8">{"{ "}<span className="syntax-property">$addFields</span>: {"{"}</div>
          <div className="ml-12"><span className="syntax-property">totalProjects</span>: {"{ "}<span className="syntax-property">$size</span>: <span className="syntax-string">'$projects'</span>{" }"},</div>
          <div className="ml-12"><span className="syntax-property">avgRating</span>: {"{ "}<span className="syntax-property">$avg</span>: <span className="syntax-string">'$projects.rating'</span>{" }"}</div>
          <div className="ml-8">{"} }"}</div>
          <div className="ml-4">]);</div>
          <div>{"}"}</div>
        </div>
      ),
      output: "📊 Efficient database aggregation query"
    }
  ];

  const copyToClipboard = () => {
    // Extract plain text from the JSX code for copying
    const codeText = demos[activeDemo].title === "React Hook" 
      ? `// Custom useCounter Hook\nimport { useState } from 'react';\n\nexport const useCounter = (initialValue = 0) => {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = () => setCount(prev => prev + 1);\n  const decrement = () => setCount(prev => prev - 1);\n  const reset = () => setCount(initialValue);\n  \n  return { count, increment, decrement, reset };\n};`
      : demos[activeDemo].title === "API Integration"
      ? `// Async API call with error handling\nconst fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(\`/api/users/\${userId}\`);\n    \n    if (!response.ok) {\n      throw new Error('Failed to fetch user');\n    }\n    \n    const userData = await response.json();\n    return { success: true, data: userData };\n  } catch (error) {\n    return { success: false, error: error.message };\n  }\n};`
      : `// MongoDB aggregation pipeline\nconst getUserStats = async (userId) => {\n  return await User.aggregate([\n    { $match: { _id: userId } },\n    { $lookup: {\n        from: 'projects',\n        localField: '_id',\n        foreignField: 'createdBy',\n        as: 'projects'\n      }\n    },\n    { $addFields: {\n        totalProjects: { $size: '$projects' },\n        avgRating: { $avg: '$projects.rating' }\n      }\n    }\n  ]);\n};`;
    
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runDemo = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="terminal p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-[#f5c842]" />
          <span className="code-font text-sm text-gray-400">live-demo.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-[#f5c842]/20 rounded transition-colors"
            title="📋 Copy this code to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#f5c842]" />}
          </button>
          <button
            onClick={runDemo}
            className="flex items-center space-x-1 px-3 py-1 bg-[#f5c842]/20 hover:bg-[#f5c842]/30 rounded transition-colors"
            title="▶️ Try running this code!"
          >
            <Play className="w-4 h-4 text-[#f5c842]" />
            <span className="code-font text-xs text-[#f5c842]">Run</span>
          </button>
        </div>
      </div>

      {/* Demo selector */}
      <div className="flex space-x-2 mb-6">
        {demos.map((demo, index) => (
          <button
            key={index}
            onClick={() => setActiveDemo(index)}
            className={`px-3 py-1 rounded text-xs code-font transition-colors ${
              activeDemo === index 
                ? 'bg-[#f5c842] text-black' 
                : 'bg-[#f5c842]/20 text-[#f5c842] hover:bg-[#f5c842]/30'
            }`}
          >
            {demo.title}
          </button>
        ))}
      </div>

      {/* Code display */}
      <motion.div
        key={activeDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] rounded-lg p-4 mb-4 border border-[#333]"
      >
        <div className="code-font text-sm overflow-x-auto">
          {demos[activeDemo].code}
        </div>
      </motion.div>

      {/* Output */}
      <motion.div
        className={`bg-[#0a0a0a] rounded-lg p-4 border border-[#333] ${isRunning ? 'animate-pulse' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <span className="code-font text-xs text-green-400">Output:</span>
          {isRunning && <span className="code-font text-xs text-[#f5c842]">Running...</span>}
        </div>
        <div className="code-font text-sm text-white">
          {isRunning ? "Executing code..." : demos[activeDemo].output}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveCodeDemo;
