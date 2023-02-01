onmessage = (e: MessageEvent) => {
  console.log(e.data);
  console.log("in public dir");
  postMessage({
    status: "completed",
  });
};
