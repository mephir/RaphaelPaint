if(!window.RaphaelPaint) {
  window.RaphaelPaint = (function () {
    var RaphaelPaint = {
      paper: null,
      toolbar: null,
      holder: null,
      workspace: null,
      options: null,
      canvas: null,

      /**
       * Initializing painter
       */
      init : function (elementId, width, height, options) {
        this.options = options || {};

        this.holder = document.getElementById(elementId);
        this.toolbar = this.setupToolbar();
        this.canvas = this.setupCanvas(width, height, this.options.background || '#fff');
        this.paper = this.setupPaper(this.canvas, width, height);
        this.workspace = this.setupWorkspace(this.canvas, this.options.workspaceZIndex || 1000);

        this.holder.addClass('_raphael_paint');
        this.holder.appendChild(this.toolbar);
        this.holder.appendChild(this.canvas);
      },
      /**
       * Setup toolbar
       */
      setupToolbar : function () {
        var toolbar = document.createElement('div');
        toolbar.addClass('_raphael_paint_toolbar');
        toolbar.appendChild(document.createTextNode('toolbar'));
        return toolbar;
      },
      /**
       * Setup canvas
       */
      setupCanvas : function (width, height, background) {
        var canvas = document.createElement('div');
        canvas.addClass('_raphael_paint_canvas');
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.style.position = 'relative';
        canvas.style.background = background;
        return canvas;
      },
      /**
       * Setup Raphael paper
       */
      setupPaper : function (element, width, height) {
        var paper = new Raphael(element, width, height);
        return paper;
      },
      setupWorkspace : function (element, zIndex) {
        var workspace = document.createElement('div');
        workspace.addClass('_raphael_paint_workspace');
        workspace.style.position = 'absolute';
        workspace.style.width = '100%';
        workspace.style.height = '100%';
        workspace.style.top = 0;
        workspace.style.left = 0;
        workspace.style.zIndex = zIndex;
        /** bind workspace events **/
        workspace.onmousedown = this.workspaceOnMouseDown;
        workspace.onmouseup = this.workspaceOnMouseUp;
        workspace.onmousemove = this.workspaceOnMouseMove;
        element.appendChild(workspace);
        return workspace;
      },
      workspaceOnMouseDown: function (event) {
        console.log('down');

        //prevent against drag and drop events
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue= false;
        }
        return false;
      },
      workspaceOnMouseUp: function (event) {
        console.log('up');
      },
      workspaceOnMouseMove: function (event) {
        //console.log(event.layerX);
      }
    };
    return RaphaelPaint;
  })();
}