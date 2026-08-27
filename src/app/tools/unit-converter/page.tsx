"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Ruler, Scale, Thermometer, Square, Droplet, Clock } from "lucide-react";

interface UnitCategory { name: string; icon: any; units: Record<string,string>; baseUnit:string; rates: Record<string,number>; }
const categories: UnitCategory[] = [
  { name:"长度", icon:Ruler, units:{mm:"毫米",cm:"厘米",m:"米",km:"千米",in:"英寸",ft:"英尺",yd:"码",mi:"英里"}, baseUnit:"m", rates:{mm:0.001,cm:0.01,m:1,km:1000,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344} },
  { name:"重量", icon:Scale, units:{mg:"毫克",g:"克",kg:"千克",t:"吨",oz:"盎司",lb:"磅"}, baseUnit:"g", rates:{mg:0.001,g:1,kg:1000,t:1000000,oz:28.3495,lb:453.592} },
  { name:"温度", icon:Thermometer, units:{C:"摄氏度",F:"华氏度",K:"开尔文"}, baseUnit:"C", rates:{C:1,F:1,K:1} },
  { name:"面积", icon:Square, units:{mm2:"平方毫米",cm2:"平方厘米",m2:"平方米",km2:"平方千米",ha:"公顷",ac:"英亩"}, baseUnit:"m2", rates:{mm2:1e-6,cm2:1e-4,m2:1,km2:1e6,ha:10000,ac:4046.86} },
  { name:"体积", icon:Droplet, units:{ml:"毫升",l:"升",m3:"立方米",tsp:"茶匙",tbsp:"汤匙",fl_oz:"液量盎司",gal:"加仑"}, baseUnit:"ml", rates:{ml:1,l:1000,m3:1e6,tsp:4.929,tbsp:14.787,fl_oz:29.574,gal:3785.41} },
  { name:"时间", icon:Clock, units:{ms:"毫秒",s:"秒",min:"分钟",h:"小时",d:"天",wk:"周",mo:"月",yr:"年"}, baseUnit:"s", rates:{ms:0.001,s:1,min:60,h:3600,d:86400,wk:604800,mo:2592000,yr:31536000} },
];

export default function UnitConverterPage() {
  const [ci, setCi] = useState(0);
  const [fromU, setFromU] = useState("");
  const [toU, setToU] = useState("");
  const [value, setValue] = useState("1");
  const category = categories[ci];

  useState(() => { const k = Object.keys(category.units); setFromU(k[0]); setToU(k[1]||k[0]); });

  const convert = () => {
    const n = parseFloat(value); if (isNaN(n)) return "";
    if (category.name==="温度") {
      let c: number;
      switch(fromU){case"C":c=n;break;case"F":c=(n-32)*5/9;break;case"K":c=n-273.15;break;default:c=n;}
      let r: number;
      switch(toU){case"C":r=c;break;case"F":r=c*9/5+32;break;case"K":r=c+273.15;break;default:r=c;}
      return `${n} ${category.units[fromU]} = ${parseFloat(r.toFixed(6))} ${category.units[toU]}`;
    }
    const base = n * category.rates[fromU];
    const result = base / category.rates[toU];
    return `${n} ${category.units[fromU]} = ${parseFloat(result.toFixed(8))} ${category.units[toU]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"><ArrowLeft className="w-5 h-5 mr-1"/>返回首页</Link>
          <h1 className="ml-4 text-xl font-bold">单位转换器</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c,i) => <button key={i} onClick={()=>{setCi(i);const k=Object.keys(c.units);setFromU(k[0]);setToU(k[1]||k[0]);setValue("1");}} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${ci===i?"bg-indigo-600 text-white shadow-lg":"bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}><c.icon className="w-4 h-4"/>{c.name}</button>)}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Ad Slot */}
          <div className="w-full h-[90px] bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center mb-6">
          </div>
          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">从</label>
              <select value={fromU} onChange={e=>{setFromU(e.target.value)}} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm">{Object.entries(category.units).map(([k,v])=><option key={k} value={k}>{v} ({k})</option>)}</select></div>
            <div className="text-center pb-2"><span className="text-2xl text-gray-600">⇄</span></div>
            <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">到</label>
              <select value={toU} onChange={e=>{setToU(e.target.value)}} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm">{Object.entries(category.units).map(([k,v])=><option key={k} value={k}>{v} ({k})</option>)}</select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">数值</label>
            <input type="number" value={value} onChange={e=>setValue(e.target.value)} className="w-full p-4 text-2xl font-bold rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 focus:border-indigo-500 outline-none"/></div>
          {convert() && <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-center"><p className="text-white text-xl font-bold">{convert()}</p></div>}
        </div>
      </div>
    </div>
  );
}
