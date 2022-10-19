importScripts('../services/eca.ts');

onmessage = (e: MessageEvent) => {
  const canvas: HTMLCanvasElement = e.data.canvas;
  const options = JSON.parse(e.data.options);
  canvas.height = options.generations;
  canvas.width = options.width;
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
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
}
