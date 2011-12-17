(function ()
{
  RaphaelPaint.addTool('pen', {
    name: 'Pen',
    start: { x: 0, y: 0 },
    points: [],
    path: null,
    workspace: null,

    init: function (workspace) {
      this.workspace = workspace;
      this.workspace.addClass('_raphael_paint_pen_tool');
    },
    onMouseMove: function (paper, event) {
      if (event.mouseButton == 1) {
        if (this.path != null) {
          this.path.remove();
        }
        this.points.push({x: event.layerX, y: event.layerY});
        this.path = paper.path(this.linePath(this.start, this.points)).attr({stroke: '1px solid #000'});
      }
    },
    onMouseUp: function (paper, event) {
      this.points.push({x: event.layerX, y: event.layerY});
      this.path.remove();
      var line = paper.path(this.linePath(this.start, this.points)).attr({stroke: '1px solid #000'});
      this.points = [];
      this.start = { x: 0, y: 0};
      this.path = null;
      return line;
    },
    onMouseDown: function (paper, event) {
      this.start = { x: event.layerX, y: event.layerY };
    },
    linePath: function (start, points) {
      var path = ['M', start.x, start.y];
      for (var x in points) {
        path.push('L');
        path.push(points[x].x);
        path.push(points[x].y);
      }
      return path;
    }
  });
})();