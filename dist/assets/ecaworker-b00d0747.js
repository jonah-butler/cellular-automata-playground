var p=Object.defineProperty;var g=(c,n,_)=>n in c?p(c,n,{enumerable:!0,configurable:!0,writable:!0,value:_}):c[n]=_;var s=(c,n,_)=>(g(c,typeof n!="symbol"?n+"":n,_),_);(function(){"use strict";class c{constructor(t=1,e="#181818",i="#fff",l=100,a=100,r,h){s(this,"cell_size");s(this,"dead_color");s(this,"living_color");s(this,"cells_in_col");s(this,"cells_in_row");s(this,"steps");s(this,"walks");s(this,"active_array");s(this,"visited_steps");this.cell_size=t,this.dead_color=e,this.living_color=i,this.cells_in_col=l/this.cell_size,this.cells_in_row=a/this.cell_size,this.steps=r,this.walks=h,this.active_array=[],this.visited_steps=[]}_arrayInitialization(){for(let t=0;t<this.cells_in_row;t++){this.active_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.active_array[t][e]=0}}_randomHelper(t){return Math.floor(Math.random()*t)}_generatePoints(){const t=this._randomHelper(this.cells_in_row),e=this._randomHelper(this.cells_in_col);this._walk({x:t,y:e})}_walk(t){this.active_array[t.x][t.y]=1,this.visited_steps.push({x:t.x,y:t.y});let e=t.x,i=t.y;for(let l=0;l<this.walks;l++){for(let h=1;h<this.steps;h++){const u=this._neighbors(e,i),f=this._randomHelper(Object.keys(u).length);e=u[f].x,i=u[f].y,this._evaluateCoordinates(e,i)===void 0?(e=t.x,i=t.y):(this.active_array[e][i]=1,this.visited_steps.push({x:e,y:i}))}const a=this._randomHelper(this.visited_steps.length),r=this.visited_steps[a];e=r.x,i=r.y}}_evaluateCoordinates(t,e){let i;try{i=this.active_array[t][e]}catch{i=void 0}if(i===0||i===1)return i}_fillArray(t){for(let e=0;e<this.cells_in_row;e++)for(let i=0;i<this.cells_in_col;i++){const l=this.active_array[e][i]===1?this.living_color:this.dead_color;t.fillStyle=l,t.fillRect(i*this.cell_size,e*this.cell_size,this.cell_size,this.cell_size)}}_neighbors(t,e){return{0:{x:t-1,y:e-1},1:{x:t-1,y:e},2:{x:t-1,y:e+1},3:{x:t,y:e-1},4:{x:t,y:e+1},5:{x:t+1,y:e-1},6:{x:t+1,y:e},7:{x:t+1,y:e+1}}}init(t){this._arrayInitialization(),this._generatePoints(),this._fillArray(t)}}class n{constructor(t=2,e="#181818",i="#fff",l=1e3,a=1e3,r=200){s(this,"cell_size");s(this,"dead_color");s(this,"living_color");s(this,"cells_in_col");s(this,"cells_in_row");s(this,"active_array");s(this,"inactive_array");s(this,"interval");s(this,"lifeCycles");this.cell_size=t,this.dead_color=e,this.living_color=i,this.cells_in_col=l,this.cells_in_row=a,this.active_array=[],this.inactive_array=[],this.interval=0,this.lifeCycles=r}arrayInitialization(){for(let t=0;t<this.cells_in_row;t++){this.active_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.active_array[t][e]=0}for(let t=0;t<this.cells_in_row;t++){this.inactive_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=0}}arrayRandomize(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++){const i=Math.random();this.active_array[t][e]=i<.5?0:1}}fillArray(t){for(let e=0;e<this.cells_in_row;e++)for(let i=0;i<this.cells_in_col;i++){const l=this.active_array[e][i]===1?this.living_color:this.dead_color;t.fillStyle=l,t.fillRect(i*this.cell_size,e*this.cell_size,this.cell_size,this.cell_size)}}updateLifeCycle(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=this.updateCellValue(t,e);this.active_array=this.inactive_array}updateCellValue(t,e){const i=this.countNeighbors(t,e);return i>4||i<3?0:i===3&&this.active_array[t][e]===0?1:this.active_array[t][e]}setCellValueHelper(t,e){try{return this.active_array[t][e]}catch{return 0}}countNeighbors(t,e){let i=0;return i+=this.setCellValueHelper(t-1,e-1),i+=this.setCellValueHelper(t-1,e),i+=this.setCellValueHelper(t-1,e+1),i+=this.setCellValueHelper(t,e-1),i+=this.setCellValueHelper(t,e+1),i+=this.setCellValueHelper(t+1,e-1),i+=this.setCellValueHelper(t+1,e),i+=this.setCellValueHelper(t+1,e+1),i}gameSetup(t,e){this.arrayInitialization(),this.arrayRandomize(),this.fillArray(t),this.init(t,e)}init(t,e){let i=0,l=1;i=setInterval(()=>{l===e?(console.log("i is equal to cycles",l,e),clearInterval(i)):(this.updateLifeCycle(),this.fillArray(t),l++)},2)}}class _{constructor(t=2,e="#181818",i="#fff",l=1e3,a=1e3,r=10){s(this,"cell_size");s(this,"dead_color");s(this,"living_color");s(this,"cells_in_col");s(this,"cells_in_row");s(this,"active_array");s(this,"inactive_array");s(this,"interval");s(this,"lifeCycles");this.cell_size=t,this.dead_color=e,this.living_color=i,this.cells_in_col=l,this.cells_in_row=a,this.active_array=[],this.inactive_array=[],this.interval=null,this.lifeCycles=r}arrayInitialization(){for(let t=0;t<this.cells_in_row;t++){this.active_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.active_array[t][e]=0}for(let t=0;t<this.cells_in_row;t++){this.inactive_array[t]=[];for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=0}}arrayRandomize(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++){const i=Math.random()*Math.random()*Math.random()*12;this.active_array[t][e]=i<.5?0:1}}fillArray(t,e){for(let i=0;i<this.cells_in_row;i++)for(let l=0;l<this.cells_in_col;l++){let a;e?a=e[i][l]===1?this.living_color:this.dead_color:a=this.active_array[i][l]===1?this.living_color:this.dead_color,t.fillStyle=a,t.fillRect(l*this.cell_size,i*this.cell_size,this.cell_size,this.cell_size)}}updateLifeCycle(){for(let t=0;t<this.cells_in_row;t++)for(let e=0;e<this.cells_in_col;e++)this.inactive_array[t][e]=this.updateCellValue(t,e);this.active_array=this.inactive_array}updateCellValue(t,e){const i=this.countNeighbors(t,e);return i>4||i<3?0:i===3&&this.active_array[t][e]===0?1:this.active_array[t][e]}setCellValueHelper(t,e){try{return this.active_array[t][e]}catch{return 0}}countNeighbors(t,e){let i=0;return i+=this.setCellValueHelper(t-1,e-1),i+=this.setCellValueHelper(t-1,e),i+=this.setCellValueHelper(t-1,e+1),i+=this.setCellValueHelper(t,e-1),i+=this.setCellValueHelper(t,e+1),i+=this.setCellValueHelper(t+1,e-1),i+=this.setCellValueHelper(t+1,e),i+=this.setCellValueHelper(t+1,e+1),i}mooresNeighborhood(t){let e=[];for(let i=0;i<this.cells_in_row;i++){let l=[];for(let a=0;a<this.cells_in_col;a++)l.push(this.updateMooresNeighborhood(i,a));e.push(l)}this.active_array=e,this.fillArray(t)}setMooreValueHelper(t,e){let i;try{i=this.active_array[t][e]}catch{i=0}return i===void 0&&(i=0),i}countMooresNeighbors(t,e){let i=0;return i+=this.setMooreValueHelper(t-1,e-1),i+=this.setMooreValueHelper(t-1,e),i+=this.setMooreValueHelper(t-1,e+1),i+=this.setMooreValueHelper(t,e-1),i+=this.setMooreValueHelper(t,e+1),i+=this.setMooreValueHelper(t+1,e-1),i+=this.setMooreValueHelper(t+1,e),i+=this.setMooreValueHelper(t+1,e+1),i}updateMooresNeighborhood(t,e){return this.countMooresNeighbors(t,e)>4?1:0}gameSetup(t){this.arrayInitialization(),this.arrayRandomize(),this.fillArray(t)}runGame(t,e=5){let i=1;this.interval=setInterval(()=>{i===e&&clearInterval(this.interval),i++,this.mooresNeighborhood(t)},10)}}class y{constructor(t=90,e=700,i=500,l=!1,a="#fff",r="#000",h=1,u){s(this,"cell_size");s(this,"randomizeGen0");s(this,"one_color");s(this,"zero_color");s(this,"cells");s(this,"rule");s(this,"ruleset");s(this,"generations");s(this,"width");s(this,"ruleMap");s(this,"colors");s(this,"blocksToEval",3);s(this,"customRuleMap");this.cell_size=h,this.randomizeGen0=l,this.zero_color=a,this.one_color=r,this.cells=[],this.rule=t,this.generations=i,this.width=e,this.ruleset="",this.colors=u,this.blocksToEval=3,this.ruleMap={"000":null,"001":null,"010":null,"011":null,100:null,101:null,110:null,111:null},this.customRuleMap={}}_buildRuleMap(){if(this.colors.length<2)throw new Error("color states must be a minimum of 2");this._dynamicRuleSet(this._numbersUpTo(this.colors.length),this.customRuleMap,this.blocksToEval),this._convertRuleToDynamicBase()}_numbersUpTo(t){const e=[];for(let i=0;i<t;i++)e.push(i.toString());return e}_dynamicRuleSet(t,e,i){function l(a,r){if(r===0){const h=a;e[h]=null;return}for(let h=0;h<t.length;h++)l(a+t[h],r-1)}l("",i)}_dynamicRuleSet2(t,e,i,l){for(let a=0;a<i+1;a++)t[l]=a,l===i?e[t.join("")]=null:this._dynamicRuleSet2(t,e,i,l+1);return e}_convertRuleToDynamicBase(){const t=this.rule.toLocaleString("fullwide",{useGrouping:!1}),e=Number(t).toString(this.colors.length),i=Array(Object.keys(this.customRuleMap).length-e.length).fill("0").join("")+e;Object.keys(this.customRuleMap).forEach((l,a)=>{this.customRuleMap[l]=parseInt(i[a])}),console.log(this.customRuleMap)}_buildGeneration0(){if(this.randomizeGen0){const t=Array(this.width).fill(0);for(let e=0;e<t.length;e++)t[e]=Math.random()>.5?1:0;this.cells.push(t)}else{const t=Array(this.width).fill(0);t[Math.floor(this.width/2)]=1,this.cells.push(t)}}_mapRuleset(){Object.keys(this.ruleMap).forEach((t,e)=>{this.ruleMap[t]=parseInt(this.ruleset[e])})}_buildEca(){for(let t=0;t<this.generations;t++){const e=this.cells[t];this._validateSquares(e)}}_validateSquares(t){const e=[];for(let i=0;i<this.width;i++)if(i===0){const l=`${t[t.length-1]}${t[i]}${t[i+1]}`;e.push(this.customRuleMap[l])}else if(i===t.length-1){const l=`${t[i-1]}${t[i]}${t[0]}`;e.push(this.customRuleMap[l])}else{const l=`${t[i-1]}${t[i]}${t[i+1]}`;e.push(this.customRuleMap[l])}this.cells.push(e)}_fillCanvas(t){for(let e=0;e<this.cells.length;e++)for(let i=0;i<this.cells[e].length;i++){const l=this.colors[this.cells[e][i]];t.fillStyle=l,t.fillRect(i*this.cell_size,e*this.cell_size,this.cell_size,this.cell_size)}}init(t){this._buildGeneration0(),this._buildRuleMap(),this._buildEca(),this._fillCanvas(t)}}class v{constructor(t=1,e=750,i=750,l=1,a=3,r,h=300,u=!0,f=!0){s(this,"cell_size");s(this,"width");s(this,"generations");s(this,"range");s(this,"threshold");s(this,"states");s(this,"active_array");s(this,"lifeCycles");s(this,"interval");s(this,"animate");s(this,"useNoise");this.cell_size=t,this.width=e,this.generations=i,this.range=l,this.threshold=a,this.states=r,this.active_array=[],this.lifeCycles=h,this.interval=null,this.animate=u,this.useNoise=f}generateRandomState(){return Math.floor(Math.random()*this.states.length)}fillWithNoise(){console.log(this.width,this.generations);for(let t=0;t<this.width;t++){this.active_array[t]=[];for(let e=0;e<this.generations;e++)this.active_array[t][e]=this.generateRandomState()}}randomizeGen0(){for(let t=0;t<this.width;t++){this.active_array[t]=[];for(let e=0;e<this.generations;e++)e===0?this.active_array[t][e]=this.generateRandomState():this.active_array[t][e]=0}}fillCanvas(t){for(let e=0;e<this.active_array.length;e++)for(let i=0;i<this.active_array[e].length;i++){let l=this.states[this.active_array[e][i]];t.fillStyle=l,t.fillRect(e*this.cell_size,i*this.cell_size,this.cell_size,this.cell_size)}}runLifeCycle(t){let e=[];for(let i=0;i<this.width;i++){let l=[];for(let a=0;a<this.generations;a++)l.push(this.evaluateNeighborhood(i,a));e.push(l)}this.active_array=e,this.fillCanvas(t)}evaluateNeighborhood(t,e){let i=0,l;const a=this.active_array[t][e];return a===this.states.length-1?l=0:l=a+1,i+=this.evaluateHelper(t-this.range,e-this.range,l),i+=this.evaluateHelper(t-this.range,e,l),i+=this.evaluateHelper(t-this.range,e+this.range,l),i+=this.evaluateHelper(t,e-this.range,l),i+=this.evaluateHelper(t,e+this.range,l),i+=this.evaluateHelper(t+this.range,e-this.range,l),i+=this.evaluateHelper(t+this.range,e,l),i+=this.evaluateHelper(t+this.range,e+this.range,l),i>=this.threshold?l:a}evaluateHelper(t,e,i){let l,a;return t<0?l=this.active_array.length-1:t===this.active_array.length?l=0:l=t,e<0?a=this.active_array[l].length-1:e===this.active_array[l].length?a=0:a=e,this.active_array[l][a]===i?1:0}run(t){if(this.useNoise?this.fillWithNoise():this.randomizeGen0(),this.animate){this.fillCanvas(t);let e=1;this.interval=setInterval(()=>{if(e===this.lifeCycles){clearInterval(this.interval);return}e++,this.runLifeCycle(t)},10)}else for(let e=0;e<this.lifeCycles;e++)this.runLifeCycle(t)}}let d;onmessage=o=>{if(typeof o.data=="object"){const t=o.data.canvas,e=JSON.parse(o.data.options);t.height=e.generations,t.width=e.width;const i=t.getContext("2d");if(o.data.type==="Elementary Cellular Automata")new y(e.rule,e.width,e.generations,e.randomize,e.zeroColor,e.oneColor,e.cellSize,e.colors).init(i),postMessage({status:"completed"});else if(o.data.type==="Cellular Automata")new n(e.cellSize,e.zeroColor,e.oneColor,e.generations,e.width,e.lifeCycles).gameSetup(i,e.lifeCycles),postMessage({status:"completed",interval:d});else if(o.data.type==="Moore's Neighborhood"){const l=new _(e.cellSize,e.zeroColor,e.oneColor,e.generations,e.width,e.lifeCycles);l.gameSetup(i),l.runGame(i,e.lifeCycles),postMessage({status:"completed"})}else o.data.type==="Drunkard's Walk"?(new c(e.cellSize,e.deadColor,e.livingColor,e.generations,e.width,e.steps,e.drunkards).init(i),postMessage({status:"completed"})):o.data.type==="Cyclic Cellular Automata"&&(new v(e.cellSize,e.width,e.generations,e.range,e.threshold,e.colors,e.lifeCycles,e.animate,e.useNoise).run(i),postMessage({status:"completed"}))}else console.log("post to clear interval"),clearInterval(o.data)}})();
