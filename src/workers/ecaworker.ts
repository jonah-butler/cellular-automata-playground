/**
 * 
 * 
 * CELLULAR AUTOMATA - CLASSIC
 * 
 */


class CellularAutomata {

  cell_size: number;
  dead_color: string;
  living_color: string;
  cells_in_col: number;
  cells_in_row: number;
  active_array: Array<Array<number>>;
  inactive_array: Array<Array<number>>;
  interval: number | any;
  lifeCycles: number | null;

  constructor(
    cell_size = 2,
    dead_color = '#181818',
    living_color = '#fff',
    cells_in_col = 1000,
    cells_in_row = 1000,
    lifeCycles = 200,
  ) {
    this.cell_size      = cell_size;
    this.dead_color     = dead_color;
    this.living_color   = living_color;
    this.cells_in_col   = cells_in_col;
    this.cells_in_row   = cells_in_row;
    // this.cells_in_col   = Math.floor(canvas.width / this.cell_size);
    // this.cells_in_row   = Math.floor(canvas.height / this.cell_size);
    this.active_array   = [];
    this.inactive_array = [];
    this.interval       = 0;
    this.lifeCycles     = lifeCycles;
  }

  arrayInitialization() {

    for(let i = 0; i < this.cells_in_row; i++) {

      this.active_array[i] = [];

      for(let j = 0; j < this.cells_in_col; j++) {

        this.active_array[i][j] = 0;

      }

    }

    for(let i = 0; i < this.cells_in_row; i++) {

      this.inactive_array[i] = [];

      for(let j = 0; j < this.cells_in_col; j++) {

        this.inactive_array[i][j] = 0;

      }

    }

    

  }

  arrayRandomize() {

    for(let i = 0; i < this.cells_in_row; i++) {

      for(let j = 0; j < this.cells_in_col; j++) {

        const randomInt = Math.random();

        this.active_array[i][j] = randomInt < 0.5 ? 0 : 1;

      }

    }
  }

  fillArray(ctx: CanvasRenderingContext2D): void {

    for(let i = 0; i < this.cells_in_row; i++) {

      for(let j = 0; j < this.cells_in_col; j++) {

        const color = this.active_array[i][j] === 1 ? this.living_color : this.dead_color;

        ctx.fillStyle = color;
        
        ctx.fillRect(
          j * this.cell_size,
          i * this.cell_size,
          this.cell_size,
          this.cell_size
        );

      }

    }

  }

  updateLifeCycle() {

    for(let i = 0; i < this.cells_in_row; i++) {

      for(let j = 0; j < this.cells_in_col; j++) {

        this.inactive_array[i][j] = this.updateCellValue(i, j);

      }

    }

    this.active_array = this.inactive_array;

  }

  updateCellValue(row: number, col: number) {

    const cellNeighbors = this.countNeighbors(row, col);

    if(cellNeighbors > 4 || cellNeighbors < 3) {
      return 0;
    } else if(cellNeighbors === 3 && this.active_array[row][col] === 0) {
      return 1;
    } else {
      return this.active_array[row][col];
    }

  }

  setCellValueHelper(row: number, col: number): number {

    try {

      return this.active_array[row][col];

    } catch {
      return 0;
    }

  }

  countNeighbors(row: number, col: number): number {

    let total = 0;

    total += this.setCellValueHelper(row - 1, col - 1);
    total += this.setCellValueHelper(row - 1, col);
    total += this.setCellValueHelper(row - 1, col + 1);
    total += this.setCellValueHelper(row, col - 1);
    total += this.setCellValueHelper(row, col + 1);
    total += this.setCellValueHelper(row + 1, col - 1);
    total += this.setCellValueHelper(row + 1, col);
    total += this.setCellValueHelper(row + 1, col + 1);
    return total;

  }

  gameSetup(ctx: CanvasRenderingContext2D, cycles: number): void {

    this.arrayInitialization();
    this.arrayRandomize();
    this.fillArray(ctx);
    this.init(ctx, cycles);

  }

  init(ctx: CanvasRenderingContext2D, cycles: number): void {
    
    let interval: any = 0;
    let i = 1;

    interval = setInterval((): void => {
      if(i === cycles) {
        console.log('i is equal to cycles', i, cycles);
        clearInterval(interval);
      } else {
        this.updateLifeCycle();
        this.fillArray(ctx);
        i++;
      }
    }, 2);

  }

};

/**
 * 
 * 
 * MOORES NEIGHBORHOOD
 * 
 */

class MooresNeighborhood {

  cell_size: number;
  dead_color: string;
  living_color: string;
  cells_in_col: number;
  cells_in_row: number;
  active_array: Array<Array<number>>;
  inactive_array: Array<Array<number>>;
  interval: number | any;
  lifeCycles: number;

  constructor(
    cell_size = 2,
    dead_color = '#181818',
    living_color = '#fff',
    cells_in_col = 1000,
    cells_in_row = 1000,
    lifeCyles = 10,
  ) {
    this.cell_size      = cell_size;
    this.dead_color     = dead_color;
    this.living_color   = living_color;
    this.cells_in_col   = cells_in_col;
    this.cells_in_row   = cells_in_row;
    this.active_array   = [];
    this.inactive_array = [];
    this.interval       = null;
    this.lifeCycles     = lifeCyles;
  }

  arrayInitialization(): void {

    for(let i = 0; i < this.cells_in_row; i++) {

      this.active_array[i] = [];

      for(let j = 0; j < this.cells_in_col; j++) {

        this.active_array[i][j] = 0;

      }

    }

    for(let i = 0; i < this.cells_in_row; i++) {

      this.inactive_array[i] = [];

      for(let j = 0; j < this.cells_in_col; j++) {

        this.inactive_array[i][j] = 0;

      }

    }

    

  }

  arrayRandomize(): void {

    for(let i = 0; i < this.cells_in_row; i++) {

      for(let j = 0; j < this.cells_in_col; j++) {

        const randomInt = (Math.random() * Math.random() * Math.random()) * 12;

        this.active_array[i][j] = randomInt < 0.5 ? 0 : 1;

      }

    }
  }

  fillArray(ctx: CanvasRenderingContext2D, arr?: Array<Array<number>>): void {

    for(let i = 0; i < this.cells_in_row; i++) {

      for(let j = 0; j < this.cells_in_col; j++) {

        let color;

        if(arr) {

          color = arr[i][j] === 1 ? this.living_color : this.dead_color;

        } else {

          color = this.active_array[i][j] === 1 ? this.living_color : this.dead_color;

        }

        ctx.fillStyle = color;

        ctx.fillRect(
          j * this.cell_size,
          i * this.cell_size,
          this.cell_size,
          this.cell_size
        );

      }

    }

  }

  updateLifeCycle() {

    for(let i = 0; i < this.cells_in_row; i++) {

      for(let j = 0; j < this.cells_in_col; j++) {

        this.inactive_array[i][j] = this.updateCellValue(i, j);

      }

    }

    this.active_array = this.inactive_array;

  }

  updateCellValue(row: number, col: number): number {

    const cellNeighbors = this.countNeighbors(row, col);

    if(cellNeighbors > 4 || cellNeighbors < 3) {
      return 0;
    } else if(cellNeighbors === 3 && this.active_array[row][col] === 0) {
      return 1;
    } else {
      return this.active_array[row][col];
    }

  }

  setCellValueHelper(row: number, col: number): number {

    try {

      return this.active_array[row][col];

    } catch {

      return 0;

    }

  }

  countNeighbors(row: number, col: number): number {

    let total = 0;

    total += this.setCellValueHelper(row - 1, col - 1);
    total += this.setCellValueHelper(row - 1, col);
    total += this.setCellValueHelper(row - 1, col + 1);
    total += this.setCellValueHelper(row, col - 1);
    total += this.setCellValueHelper(row, col + 1);
    total += this.setCellValueHelper(row + 1, col - 1);
    total += this.setCellValueHelper(row + 1, col);
    total += this.setCellValueHelper(row + 1, col + 1);
    return total;

  }



  mooresNeighborhood(ctx: CanvasRenderingContext2D): void {
    let temp = [];

    for(let i = 0; i < this.cells_in_row; i++) {

      let arr = [];

      for(let j = 0; j < this.cells_in_col; j++) {

        arr.push(this.updateMooresNeighborhood(i,j));

      }

      temp.push(arr);
    }

    this.active_array = temp;
    this.fillArray(ctx);

  }

  setMooreValueHelper(row: number, col: number): number {
    let val;

    try {
      val = this.active_array[row][col];
    } catch {
      val = 0;
    }
    if(val === undefined) {
      val = 0;
    }
    return val;

  }

  countMooresNeighbors(row: number, col: number): number {

    let total = 0;

    total += this.setMooreValueHelper(row - 1, col - 1);
    total += this.setMooreValueHelper(row - 1, col);
    total += this.setMooreValueHelper(row - 1, col + 1);
    total += this.setMooreValueHelper(row, col - 1);
    total += this.setMooreValueHelper(row, col + 1);
    total += this.setMooreValueHelper(row + 1, col - 1);
    total += this.setMooreValueHelper(row + 1, col);
    total += this.setMooreValueHelper(row + 1, col + 1);

    return total;

  }

  updateMooresNeighborhood(i: number, j: number): number {

    const total = this.countMooresNeighbors(i, j);
    
    if(total > 4) {
      return 1;
    } else {
      return 0;
    }

  }

  gameSetup(ctx: CanvasRenderingContext2D): void {

    this.arrayInitialization();
    this.arrayRandomize();
    this.fillArray(ctx);

  }

  runGame(ctx: CanvasRenderingContext2D, cycles = 5) {
    let i = 1;

    this.interval = setInterval(() => {
      if(i === cycles) {
        clearInterval(this.interval!);
      }
      i++;
      this.mooresNeighborhood(ctx);
    }, 10);

  }

};

interface RuleMap {
  [key: string]: number | null;
}

class ECA {

  cell_size: number;
  randomizeGen0: boolean;
  one_color: string;
  zero_color: string;
  cells: Array<Array<number>>;
  rule: number;
  ruleset: string;
  generations: number;
  width: number;
  ruleMap: RuleMap;

  constructor(
    rule: number = 90,
    width: number = 700,
    generations: number = 500,
    randomizeGen0: boolean = false,
    zeroColor: string = '#fff',
    oneColor: string = '#000',
    cellSize: number = 1
    ) 
  {

    this.cell_size = cellSize;

    this.randomizeGen0 = randomizeGen0;

    this.zero_color = zeroColor;
    this.one_color = oneColor;

    this.cells = [];

    this.rule = rule;

    this.generations = generations;
    this.width = width;
    this.ruleset = '';

    this.ruleMap = {
      '000': null,
      '001': null,
      '010': null,
      '011': null,
      '100': null,
      '101': null,
      '110': null,
      '111': null
    };

  }

  _buildGeneration0(): void {
    if(!this.randomizeGen0) {

      const gen0 = Array(this.width).fill(0);
      gen0[Math.floor(this.width / 2)] = 1;
      this.cells.push(gen0);

    } else {

      const gen0 = Array(this.width).fill(0);
      
      for(let i = 0; i < gen0.length; i++) {
        gen0[i] = Math.random() > 0.5 ? 1 : 0;
      }

      this.cells.push(gen0);

    }
  }

  _convertRuleToBinary(): void {

    if(this.rule < 0 || this.rule > 255 || typeof this.rule !== 'number') {
      throw new Error('value does not fit into a single byte');
    }

    const num = this.rule.toString(2);
    this.ruleset = Array(8 - num.length).fill(0).join('') + num;
    this._mapRuleset();

  }

  _mapRuleset(): void {

    Object.keys(this.ruleMap).forEach((key, i) => {
      this.ruleMap[key] = parseInt(this.ruleset[i]);
    })

  }

  _buildEca(): void {

    for(let i = 0; i < this.generations; i++) {

      const currentCell = this.cells[i];
      this._validateSquares(currentCell);

    }

  }

  _validateSquares(cell: Array<number>): void {
    const newCell: Array<number> = [];
    for(let i = 0; i < this.width; i++) {

      if(i === 0) {

        const neighborhood = `${cell[cell.length - 1]}${cell[i]}${cell[i + 1]}`;
        newCell.push(this.ruleMap[neighborhood]!);

      } else if(i === cell.length - 1) {

        const neighborhood = `${cell[i - 1]}${cell[i]}${cell[0]}`;
        newCell.push(this.ruleMap[neighborhood]!);

      } else {

        const neighborhood = `${cell[i - 1]}${cell[i]}${cell[i + 1]}`;
        newCell.push(this.ruleMap[neighborhood]!);

      }

    }

    this.cells.push(newCell);

  }

  _fillCanvas(ctx: CanvasRenderingContext2D): void {

    for(let i = 0; i < this.cells.length; i++) {

      for(let j = 0; j < this.cells[i].length; j++) {

        let color;

        color = this.cells[i][j] === 1 ? this.one_color : this.zero_color;

        ctx.fillStyle = color;
        ctx.fillRect(
          j * this.cell_size,
          i * this.cell_size,
          this.cell_size,
          this.cell_size
        );

      }

    }

  }

  init(ctx: CanvasRenderingContext2D): void {
    this._buildGeneration0();
    this._convertRuleToBinary();
    this._buildEca();
    this._fillCanvas(ctx);
  }

};

let TIMER: any;

onmessage = (e: MessageEvent) => {
  if(typeof e.data === 'object') {

    const canvas: HTMLCanvasElement = e.data.canvas;
    const options = JSON.parse(e.data.options);
  
    canvas.height = options.generations;
    canvas.width = options.width;
  
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  
    if(e.data.type === "Elementary Cellular Automata") {
  
      const eca = new ECA(
        options.rule,
        options.width,
        options.generations,
        options.randomize,
        options.zeroColor,
        options.oneColor,
        options.cellSize
      );
      eca.init(ctx);
      postMessage({
        status: "completed"
      });
  
    } else if(e.data.type === "Cellular Automata") {
  
      const ca = new CellularAutomata(
        options.cellSize,
        options.zeroColor,
        options.oneColor,
        options.generations,
        options.width,
        options.lifeCycles
      );
      ca.gameSetup(ctx, options.lifeCycles);
  
      postMessage({
        status: "completed",
        interval: TIMER,
      });
  
    } else if(e.data.type === "Moore's Neighborhood") {
      const mn = new MooresNeighborhood(
        options.cellSize,
        options.zeroColor,
        options.oneColor,
        options.generations,
        options.width,
        options.lifeCycles
      );
      mn.gameSetup(ctx);
      mn.runGame(ctx, options.lifeCycles);
  
      postMessage({
        status: "completed"
      });
  
    }
  } else {
    console.log('post to clear interval');
    clearInterval(e.data);
  }
}
