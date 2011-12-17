(function ()
{
  RaphaelPaint.addTool('pen', {
    name: 'Pen',
    start: { x: 0, y: 0 },
    onMouseMove: function (paper, event) {
      if (event.mouseButton == 1) {
        var line = this.drawLine(paper, this.start.x, this.start.y, event.layerX, event.layerY);
        this.start = { x: event.layerX, y: event.layerY };
        return line;
      }
    },
    onMouseUp: function (paper, event) {
      return this.drawLine(paper, this.start.x, this.start.y, event.layerX, event.layerY);
    },
    onMouseDown: function (paper, event) {
      this.start = { x: event.layerX, y: event.layerY };
    },
    drawLine: function (paper, startX, startY, endX, endY) {
      return paper.path(['M',startX,startY,'L',endX,endY]).attr({stroke: '1px solid #000'});
    }
  });
})();