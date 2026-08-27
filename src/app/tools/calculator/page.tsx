"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, History, Trash2 } from "lucide-react";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);
  const [mode, setMode] = useState<"basic" | "scientific">("basic");
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (resetNext) { setDisplay(num); setResetNext(false); }
    else { setDisplay(display === "0" ? num : display + num); }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : NaN;
      case "%": return a * b / 100;
      default: return b;
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && operation && !resetNext) {
      setDisplay(String(calculate(parseFloat(prevValue), current, operation)));
      setPrevValue(String(calculate(parseFloat(prevValue), current, operation)));
    } else { setPrevValue(display); }
    setOperation(op); setResetNext(true);
  };

  const handleEquals = () => {
    if (prevValue === null || !operation) return;
    const result = calculate(parseFloat(prevValue), parseFloat(display), operation);
    const r = isNaN(result) ? "错误" : String(parseFloat(result.toFixed(8)));
    setHistory([`${prevValue} ${operation} ${display} = ${r}`, ...history].slice(0, 20));
    setDisplay(r); setPrevValue(null); setOperation(null); setResetNext(true);
  };

  const handleClear = () => { setDisplay("0"); setPrevValue(null); setOperation(null); setResetNext(false); };
  const handleBackspace = () => { setDisplay(display.length > 1 ? display.slice(0, -1) : "0"); };
  const handleDecimal = () => { if (resetNext) { setDisplay("0."); setResetNext(false); return; } if (!display.includes(".")) setDisplay(display + "."); };
  const handlePercent = () => { setDisplay(String(parseFloat(display) / 100)); };
  const handleToggleSign = () => { setDisplay(String(-parseFloat(display))); };

  const scientificOps = ["sin", "cos", "tan", "log", "ln", "√", "x²", "x³", "π", "e"];
  const handleScientific = (fn: string) => {
    const val = parseFloat(display); let result: number;
    switch (fn) {
      case "sin": result = Math.sin(val * Math.PI / 180); break;
      case "cos": result = Math.cos(val * Math.PI / 180); break;
      case "tan": result = Math.tan(val * Math.PI / 180); break;
      case "log": result = Math.log10(val); break;
      case "ln": result = Math.log(val); break;
      case "√": result = Math.sqrt(val); break;
      case "x²": result = val * val; break;
      case "x³": result = val * val * val; break;
      case "π": result = Math.PI; break;
      case "e": result = Math.E; break;
      default: result = val;
    }
    const r = isNaN(result) || !isFinite(result) ? "错误" : String(parseFloat(result.toFixed(8)));
    setDisplay(r); setResetNext(true);
  };

  const buttons = [["C","±","%","÷"],["7","8","9","×"],["4","5","6","-"],["1","2","3","+"],["0",".","⌫","="]];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"><ArrowLeft className="w-5 h-5 mr-1" />返回首页</Link>
          <div className="flex gap-2">
            <button onClick={() => setMode("basic")} className={`px-3 py-1 rounded-lg text-sm font-medium transition ${mode==="basic"?"bg-indigo-600 text-white":"bg-gray-100 dark:bg-gray-700"}`}>标准</button>
            <button onClick={() => setMode("scientific")} className={`px-3 py-1 rounded-lg text-sm font-medium transition ${mode==="scientific"?"bg-indigo-600 text-white":"bg-gray-100 dark:bg-gray-700"}`}>科学</button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Ad Slot */}
        <div className="w-full h-[90px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4">
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-right">
                <div className="text-indigo-200 text-sm h-6">{prevValue !== null && operation ? `${prevValue} ${operation}` : ""}</div>
                <div className="text-white text-4xl font-bold truncate">{display}</div>
              </div>
              {mode==="scientific" && <div className="grid grid-cols-5 gap-1 p-2 bg-gray-50 dark:bg-gray-700 border-b">
                {scientificOps.map(op => <button key={op} onClick={() => handleScientific(op)} className="py-2 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition">{op}</button>)}
              </div>}
              <div className="p-4 grid grid-cols-4 gap-2">
                {buttons.map((row, ri) => row.map(btn => {
                  const isOp = ["÷","×","-","+","="].includes(btn);
                  return (
                    <button key={`${ri}-${btn}`} onClick={() => {
                      if (btn>="0"&&btn<="9") handleNumber(btn);
                      else if (btn===".") handleDecimal();
                      else if (btn==="C") handleClear();
                      else if (btn==="±") handleToggleSign();
                      else if (btn==="%") handlePercent();
                      else if (btn==="⌫") handleBackspace();
                      else if (isOp) btn==="="?handleEquals():handleOperator(btn);
                    }} className={`py-4 text-lg font-semibold rounded-xl transition ${isOp?"bg-indigo-600 text-white hover:bg-indigo-700":"bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"} ${btn==="="?"bg-gradient-to-r from-indigo-600 to-purple-600":""}`}>{btn}</button>
                  );
                }))}
              </div>
            </div>
          </div>
          <div className="lg:w-72">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2"><History className="w-4 h-4" />计算历史</h3>
                {history.length>0 && <button aria-label="清空历史记录" onClick={()=>setHistory([])} className="text-gray-600 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>}
              </div>
              {history.length===0 ? <p className="text-sm text-gray-600 text-center py-8">暂无计算记录</p> :
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {history.map((item,i) => <div key={i} className="text-sm bg-gray-50 dark:bg-gray-700 rounded-lg p-2 font-mono">{item}</div>)}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
