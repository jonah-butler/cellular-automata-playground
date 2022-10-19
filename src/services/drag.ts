function setupDraggableContainer(element: HTMLDivElement): void {

  let pos = { top: 0, left: 0, x: 0, y: 0, isDragging: false };

  const mouseMoveHandler = function (e: MouseEvent): void {
    if(pos.isDragging) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
  
      element.scrollTop = pos.top - dy;
      element.scrollLeft = pos.left - dx;
    }
  };

  const mouseDownHandler = function(e: MouseEvent) {
    pos = {
      left: element.scrollLeft,
      top: element.scrollTop,
      x: e.clientX,
      y: e.clientY,
      isDragging: true
    };
    element.style.cursor = 'grabbing';
    element.style.userSelect = 'none';

    element.addEventListener('mousemove', mouseMoveHandler);
    element.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseUpHandler = function (e: MouseEvent) {
    pos = {
      left: element.scrollLeft,
      top: element.scrollTop,
      x: e.clientX,
      y: e.clientY,
      isDragging: false,
    };
    element.style.cursor = 'grab';
    element.style.removeProperty('user-select');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

  element.addEventListener('mousedown', mouseDownHandler);

}

export {
  setupDraggableContainer
};