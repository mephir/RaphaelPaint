(function ()
{
  RaphaelPaint.addTool('pen', {
    name: 'Pen',
    onMouseMove: function (paper, event) {
      if (event.mouseButton == 1) {
        paper.circle(event.layerX, event.layerY, 1).attr({fill: '#000', stroke: 'none'});
      }
    },
    onMouseDown: function (paper, event) {
      paper.circle(event.layerX, event.layerY, 1).attr({fill: '#000', stroke: 'none'});
    }
  });
})();