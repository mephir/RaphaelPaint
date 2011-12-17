if(!window.RaphaelPaint) {
  window.RaphaelPaint = (function () {
    var RaphaelPaint = {
      paper: null,
      toolbar: null,
      holder: null,
      workspace: null,
      options: null,
      canvas: null,
      activeTool: null,
      tools: {},

      /**
       * Initializing painter
       */
      init : function (elementId, width, height, options) {
        this.options = options || {};
        this.options.tools = options.tools || ['pen'];

        this.holder = document.getElementById(elementId);
        this.toolbar = this.setupToolbar();
        this.canvas = this.setupCanvas(width, height, this.options.background || '#fff');
        this.paper = this.setupPaper(this.canvas, width, height);
        this.workspace = this.setupWorkspace(this.canvas, this.options.workspaceZIndex || 1000);

        this.holder.addClass('_raphael_paint');
        this.holder.appendChild(this.toolbar);
        this.holder.appendChild(this.canvas);

        //temporairly because there is one tool ;)
        this.activeTool = this.tools.pen;
        this.tools.pen.init(this.workspace);
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
        workspace.onclick = this.workspaceOnClick;
        workspace.mouseButton = 0;
        workspace.mouseMove = false;
        element.appendChild(workspace);
        return workspace;
      },
      workspaceOnMouseDown : function (event) {
        //registering pressed button
        if (event.which == 1 && event.button == 0) {
          this.mouseButton = 1;
        } else if (event.which == 3 && event.button == 2) {
          this.mouseButton = 2;
        }

        this.mouseMove = false;
        RaphaelPaint.fireEvent('onMouseDown', event);

        //prevent against drag and drop events
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        return false;
      },
      workspaceOnMouseUp : function (event) {
        this.mouseButton = 0;
        RaphaelPaint.fireEvent('onMouseUp', event);
      },
      workspaceOnMouseMove : function (event) {
        if (this.mouseButton > 0) {
          this.mouseMove = true;
        }
        event.mouseButton = this.mouseButton;
        RaphaelPaint.fireEvent('onMouseMove', event);
      },
      workspaceOnClick : function (event) {
        if (this.mouseMove) {
          return false;
        }
        RaphaelPaint.fireEvent('onClick', event);
      },
      addTool : function (name, obj) {
        this.tools[name] = obj;
      },
      fireEvent : function (name, event) {
        if (typeof this.activeTool[name] != "undefined") {
          this.activeTool[name](this.paper, event);
        }
      }
    };
    return RaphaelPaint;
  })();
}