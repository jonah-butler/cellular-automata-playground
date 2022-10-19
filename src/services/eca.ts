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

}

// export default ECA;