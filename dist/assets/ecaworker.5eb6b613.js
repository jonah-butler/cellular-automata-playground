var f=Object.defineProperty;var d=(h,o,n)=>o in h?f(h,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):h[o]=n;var s=(h,o,n)=>(d(h,typeof o!="symbol"?o+"":o,n),n);(function(){"use strict";class h{constructor(t=2,e="#181818",l="#fff",i=1e3,r=1e3,c=200){s(this,"cell_size");s(this,"dead_color");s(this,"living_color");s(this,"cells_in_col");s(this,"cells_in_row");s(this,"active_array");s(this,"inactive_array");s(this,"interval");s(this,"lifeCycles");this.cell_size=t,this.dead_color=e,this.living_color=l,this.cells_in_col=i,this.cells_in_row=r,this.active_array=[],this.inactive_array=[],this.interval=0,this.lifeCycles=c}arrayInitialization(){for(let t=0;t<this.cells_in_row;t++){this.active_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.active_array[t][e]=0}for(let t=0;t<this.cells_in_row;t++){this.inactive_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=0}}arrayRandomize(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++){const l=Math.random();this.active_array[t][e]=l<.5?0:1}}fillArray(t){for(let e=0;e<this.cells_in_row;e++)for(let l=0;l<this.cells_in_col;l++){const i=this.active_array[e][l]===1?this.living_color:this.dead_color;t.fillStyle=i,t.fillRect(l*this.cell_size,e*this.cell_size,this.cell_size,this.cell_size)}}updateLifeCycle(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=this.updateCellValue(t,e);this.active_array=this.inactive_array}updateCellValue(t,e){const l=this.countNeighbors(t,e);return l>4||l<3?0:l===3&&this.active_array[t][e]===0?1:this.active_array[t][e]}setCellValueHelper(t,e){try{return this.active_array[t][e]}catch{return 0}}countNeighbors(t,e){let l=0;return l+=this.setCellValueHelper(t-1,e-1),l+=this.setCellValueHelper(t-1,e),l+=this.setCellValueHelper(t-1,e+1),l+=this.setCellValueHelper(t,e-1),l+=this.setCellValueHelper(t,e+1),l+=this.setCellValueHelper(t+1,e-1),l+=this.setCellValueHelper(t+1,e),l+=this.setCellValueHelper(t+1,e+1),l}gameSetup(t,e){this.arrayInitialization(),this.arrayRandomize(),this.fillArray(t),this.init(t,e)}init(t,e){let l=0,i=1;l=setInterval(()=>{i===e?(console.log("i is equal to cycles",i,e),clearInterval(l)):(this.updateLifeCycle(),this.fillArray(t),i++)},2)}}class o{constructor(t=2,e="#181818",l="#fff",i=1e3,r=1e3,c=10){s(this,"cell_size");s(this,"dead_color");s(this,"living_color");s(this,"cells_in_col");s(this,"cells_in_row");s(this,"active_array");s(this,"inactive_array");s(this,"interval");s(this,"lifeCycles");this.cell_size=t,this.dead_color=e,this.living_color=l,this.cells_in_col=i,this.cells_in_row=r,this.active_array=[],this.inactive_array=[],this.interval=null,this.lifeCycles=c}arrayInitialization(){for(let t=0;t<this.cells_in_row;t++){this.active_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.active_array[t][e]=0}for(let t=0;t<this.cells_in_row;t++){this.inactive_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=0}}arrayRandomize(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++){const l=Math.random()*Math.random()*Math.random()*12;this.active_array[t][e]=l<.5?0:1}}fillArray(t,e){for(let l=0;l<this.cells_in_row;l++)for(let i=0;i<this.cells_in_col;i++){let r;e?r=e[l][i]===1?this.living_color:this.dead_color:r=this.active_array[l][i]===1?this.living_color:this.dead_color,t.fillStyle=r,t.fillRect(i*this.cell_size,l*this.cell_size,this.cell_size,this.cell_size)}}updateLifeCycle(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=this.updateCellValue(t,e);this.active_array=this.inactive_array}updateCellValue(t,e){const l=this.countNeighbors(t,e);return l>4||l<3?0:l===3&&this.active_array[t][e]===0?1:this.active_array[t][e]}setCellValueHelper(t,e){try{return this.active_array[t][e]}catch{return 0}}countNeighbors(t,e){let l=0;return l+=this.setCellValueHelper(t-1,e-1),l+=this.setCellValueHelper(t-1,e),l+=this.setCellValueHelper(t-1,e+1),l+=this.setCellValueHelper(t,e-1),l+=this.setCellValueHelper(t,e+1),l+=this.setCellValueHelper(t+1,e-1),l+=this.setCellValueHelper(t+1,e),l+=this.setCellValueHelper(t+1,e+1),l}mooresNeighborhood(t){let e=[];for(let l=0;l<this.cells_in_row;l++){let i=[];for(let r=0;r<this.cells_in_col;r++)i.push(this.updateMooresNeighborhood(l,r));e.push(i)}this.active_array=e,this.fillArray(t)}setMooreValueHelper(t,e){let l;try{l=this.active_array[t][e]}catch{l=0}return l===void 0&&(l=0),l}countMooresNeighbors(t,e){let l=0;return l+=this.setMooreValueHelper(t-1,e-1),l+=this.setMooreValueHelper(t-1,e),l+=this.setMooreValueHelper(t-1,e+1),l+=this.setMooreValueHelper(t,e-1),l+=this.setMooreValueHelper(t,e+1),l+=this.setMooreValueHelper(t+1,e-1),l+=this.setMooreValueHelper(t+1,e),l+=this.setMooreValueHelper(t+1,e+1),l}updateMooresNeighborhood(t,e){return this.countMooresNeighbors(t,e)>4?1:0}gameSetup(t){this.arrayInitialization(),this.arrayRandomize(),this.fillArray(t)}runGame(t,e=5){let l=1;this.interval=setInterval(()=>{l===e&&clearInterval(this.interval),l++,this.mooresNeighborhood(t)},10)}}class n{constructor(t=90,e=700,l=500,i=!1,r="#fff",c="#000",u=1){s(this,"cell_size");s(this,"randomizeGen0");s(this,"one_color");s(this,"zero_color");s(this,"cells");s(this,"rule");s(this,"ruleset");s(this,"generations");s(this,"width");s(this,"ruleMap");this.cell_size=u,this.randomizeGen0=i,this.zero_color=r,this.one_color=c,this.cells=[],this.rule=t,this.generations=l,this.width=e,this.ruleset="",this.ruleMap={"000":null,"001":null,"010":null,"011":null,100:null,101:null,110:null,111:null}}_buildGeneration0(){if(this.randomizeGen0){const t=Array(this.width).fill(0);for(let e=0;e<t.length;e++)t[e]=Math.random()>.5?1:0;this.cells.push(t)}else{const t=Array(this.width).fill(0);t[Math.floor(this.width/2)]=1,this.cells.push(t)}}_convertRuleToBinary(){if(this.rule<0||this.rule>255||typeof this.rule!="number")throw new Error("value does not fit into a single byte");const t=this.rule.toString(2);this.ruleset=Array(8-t.length).fill(0).join("")+t,this._mapRuleset()}_mapRuleset(){Object.keys(this.ruleMap).forEach((t,e)=>{this.ruleMap[t]=parseInt(this.ruleset[e])})}_buildEca(){for(let t=0;t<this.generations;t++){const e=this.cells[t];this._validateSquares(e)}}_validateSquares(t){const e=[];for(let l=0;l<this.width;l++)if(l===0){const i=`${t[t.length-1]}${t[l]}${t[l+1]}`;e.push(this.ruleMap[i])}else if(l===t.length-1){const i=`${t[l-1]}${t[l]}${t[0]}`;e.push(this.ruleMap[i])}else{const i=`${t[l-1]}${t[l]}${t[l+1]}`;e.push(this.ruleMap[i])}this.cells.push(e)}_fillCanvas(t){for(let e=0;e<this.cells.length;e++)for(let l=0;l<this.cells[e].length;l++){let i;i=this.cells[e][l]===1?this.one_color:this.zero_color,t.fillStyle=i,t.fillRect(l*this.cell_size,e*this.cell_size,this.cell_size,this.cell_size)}}init(t){this._buildGeneration0(),this._convertRuleToBinary(),this._buildEca(),this._fillCanvas(t)}}let _;onmessage=a=>{if(typeof a.data=="object"){const t=a.data.canvas,e=JSON.parse(a.data.options);t.height=e.generations,t.width=e.width;const l=t.getContext("2d");if(a.data.type==="Elementary Cellular Automata")new n(e.rule,e.width,e.generations,e.randomize,e.zeroColor,e.oneColor,e.cellSize).init(l),postMessage({status:"completed"});else if(a.data.type==="Cellular Automata")new h(e.cellSize,e.zeroColor,e.oneColor,e.generations,e.width,e.lifeCycles).gameSetup(l,e.lifeCycles),postMessage({status:"completed",interval:_});else if(a.data.type==="Moore's Neighborhood"){const i=new o(e.cellSize,e.zeroColor,e.oneColor,e.generations,e.width,e.lifeCycles);i.gameSetup(l),i.runGame(l,10),postMessage({status:"completed"})}}else console.log("post to clear interval"),clearInterval(a.data)}})();
