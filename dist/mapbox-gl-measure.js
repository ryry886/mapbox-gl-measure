function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var mapboxGlDraw = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e() ;
  }(commonjsGlobal, function () {

    var t = function (t, e) {
      var n = {
          drag: [],
          click: [],
          mousemove: [],
          mousedown: [],
          mouseup: [],
          mouseout: [],
          keydown: [],
          keyup: [],
          touchstart: [],
          touchmove: [],
          touchend: [],
          tap: []
        },
        o = {
          on: function (t, e, o) {
            if (void 0 === n[t]) throw new Error("Invalid event type: " + t);
            n[t].push({
              selector: e,
              fn: o
            });
          },
          render: function (t) {
            e.store.featureChanged(t);
          }
        },
        r = function (t, r) {
          for (var i = n[t], a = i.length; a--;) {
            var s = i[a];
            if (s.selector(r)) {
              s.fn.call(o, r) || e.store.render(), e.ui.updateMapClasses();
              break;
            }
          }
        };
      return t.start.call(o), {
        render: t.render,
        stop: function () {
          t.stop && t.stop();
        },
        trash: function () {
          t.trash && (t.trash(), e.store.render());
        },
        combineFeatures: function () {
          t.combineFeatures && t.combineFeatures();
        },
        uncombineFeatures: function () {
          t.uncombineFeatures && t.uncombineFeatures();
        },
        drag: function (t) {
          r("drag", t);
        },
        click: function (t) {
          r("click", t);
        },
        mousemove: function (t) {
          r("mousemove", t);
        },
        mousedown: function (t) {
          r("mousedown", t);
        },
        mouseup: function (t) {
          r("mouseup", t);
        },
        mouseout: function (t) {
          r("mouseout", t);
        },
        keydown: function (t) {
          r("keydown", t);
        },
        keyup: function (t) {
          r("keyup", t);
        },
        touchstart: function (t) {
          r("touchstart", t);
        },
        touchmove: function (t) {
          r("touchmove", t);
        },
        touchend: function (t) {
          r("touchend", t);
        },
        tap: function (t) {
          r("tap", t);
        }
      };
    };
    function e(t) {
      if (t.__esModule) return t;
      var e = t.default;
      if ("function" == typeof e) {
        var n = function t() {
          if (this instanceof t) {
            var n = [null];
            n.push.apply(n, arguments);
            var o = Function.bind.apply(e, n);
            return new o();
          }
          return e.apply(this, arguments);
        };
        n.prototype = e.prototype;
      } else n = {};
      return Object.defineProperty(n, "__esModule", {
        value: !0
      }), Object.keys(t).forEach(function (e) {
        var o = Object.getOwnPropertyDescriptor(t, e);
        Object.defineProperty(n, e, o.get ? o : {
          enumerable: !0,
          get: function () {
            return t[e];
          }
        });
      }), n;
    }
    var n = {},
      o = {
        RADIUS: 6378137,
        FLATTENING: 1 / 298.257223563,
        POLAR_RADIUS: 6356752.3142
      },
      r = o;
    function i(t) {
      var e = 0;
      if (t && t.length > 0) {
        e += Math.abs(a(t[0]));
        for (var n = 1; n < t.length; n++) e -= Math.abs(a(t[n]));
      }
      return e;
    }
    function a(t) {
      var e,
        n,
        o,
        i,
        a,
        u,
        c = 0,
        l = t.length;
      if (l > 2) {
        for (u = 0; u < l; u++) u === l - 2 ? (o = l - 2, i = l - 1, a = 0) : u === l - 1 ? (o = l - 1, i = 0, a = 1) : (o = u, i = u + 1, a = u + 2), e = t[o], n = t[i], c += (s(t[a][0]) - s(e[0])) * Math.sin(s(n[1]));
        c = c * r.RADIUS * r.RADIUS / 2;
      }
      return c;
    }
    function s(t) {
      return t * Math.PI / 180;
    }
    n.geometry = function t(e) {
      var n,
        o = 0;
      switch (e.type) {
        case "Polygon":
          return i(e.coordinates);
        case "MultiPolygon":
          for (n = 0; n < e.coordinates.length; n++) o += i(e.coordinates[n]);
          return o;
        case "Point":
        case "MultiPoint":
        case "LineString":
        case "MultiLineString":
          return 0;
        case "GeometryCollection":
          for (n = 0; n < e.geometries.length; n++) o += t(e.geometries[n]);
          return o;
      }
    }, n.ring = a;
    var u = {
        CONTROL_BASE: "mapboxgl-ctrl",
        CONTROL_PREFIX: "mapboxgl-ctrl-",
        CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
        CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
        CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
        CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
        CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
        CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
        CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
        CONTROL_GROUP: "mapboxgl-ctrl-group",
        ATTRIBUTION: "mapboxgl-ctrl-attrib",
        ACTIVE_BUTTON: "active",
        BOX_SELECT: "mapbox-gl-draw_boxselect"
      },
      c = {
        HOT: "mapbox-gl-draw-hot",
        COLD: "mapbox-gl-draw-cold"
      },
      l = {
        ADD: "add",
        MOVE: "move",
        DRAG: "drag",
        POINTER: "pointer",
        NONE: "none"
      },
      d = {
        POLYGON: "polygon",
        LINE: "line_string",
        POINT: "point"
      },
      p = {
        FEATURE: "Feature",
        POLYGON: "Polygon",
        LINE_STRING: "LineString",
        POINT: "Point",
        FEATURE_COLLECTION: "FeatureCollection",
        MULTI_PREFIX: "Multi",
        MULTI_POINT: "MultiPoint",
        MULTI_LINE_STRING: "MultiLineString",
        MULTI_POLYGON: "MultiPolygon"
      },
      f = {
        DRAW_LINE_STRING: "draw_line_string",
        DRAW_POLYGON: "draw_polygon",
        DRAW_POINT: "draw_point",
        SIMPLE_SELECT: "simple_select",
        DIRECT_SELECT: "direct_select",
        STATIC: "static"
      },
      h = {
        CREATE: "draw.create",
        DELETE: "draw.delete",
        UPDATE: "draw.update",
        SELECTION_CHANGE: "draw.selectionchange",
        MODE_CHANGE: "draw.modechange",
        ACTIONABLE: "draw.actionable",
        RENDER: "draw.render",
        COMBINE_FEATURES: "draw.combine",
        UNCOMBINE_FEATURES: "draw.uncombine"
      },
      g = {
        MOVE: "move",
        CHANGE_COORDINATES: "change_coordinates"
      },
      y = {
        FEATURE: "feature",
        MIDPOINT: "midpoint",
        VERTEX: "vertex"
      },
      v = {
        ACTIVE: "true",
        INACTIVE: "false"
      },
      m = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"],
      _ = -85,
      b = Object.freeze({
        __proto__: null,
        classes: u,
        sources: c,
        cursors: l,
        types: d,
        geojsonTypes: p,
        modes: f,
        events: h,
        updateActions: g,
        meta: y,
        activeStates: v,
        interactions: m,
        LAT_MIN: -90,
        LAT_RENDERED_MIN: _,
        LAT_MAX: 90,
        LAT_RENDERED_MAX: 85,
        LNG_MIN: -270,
        LNG_MAX: 270
      }),
      E = {
        Point: 0,
        LineString: 1,
        MultiLineString: 1,
        Polygon: 2
      };
    function T(t, e) {
      var n = E[t.geometry.type] - E[e.geometry.type];
      return 0 === n && t.geometry.type === p.POLYGON ? t.area - e.area : n;
    }
    function C(t) {
      return t.map(function (t) {
        return t.geometry.type === p.POLYGON && (t.area = n.geometry({
          type: p.FEATURE,
          property: {},
          geometry: t.geometry
        })), t;
      }).sort(T).map(function (t) {
        return delete t.area, t;
      });
    }
    function O(t, e) {
      return void 0 === e && (e = 0), [[t.point.x - e, t.point.y - e], [t.point.x + e, t.point.y + e]];
    }
    function S(t) {
      if (this._items = {}, this._nums = {}, this._length = t ? t.length : 0, t) for (var e = 0, n = t.length; e < n; e++) this.add(t[e]), void 0 !== t[e] && ("string" == typeof t[e] ? this._items[t[e]] = e : this._nums[t[e]] = e);
    }
    S.prototype.add = function (t) {
      return this.has(t) || (this._length++, "string" == typeof t ? this._items[t] = this._length : this._nums[t] = this._length), this;
    }, S.prototype.delete = function (t) {
      return !1 === this.has(t) || (this._length--, delete this._items[t], delete this._nums[t]), this;
    }, S.prototype.has = function (t) {
      return ("string" == typeof t || "number" == typeof t) && (void 0 !== this._items[t] || void 0 !== this._nums[t]);
    }, S.prototype.values = function () {
      var t = this,
        e = [];
      return Object.keys(this._items).forEach(function (n) {
        e.push({
          k: n,
          v: t._items[n]
        });
      }), Object.keys(this._nums).forEach(function (n) {
        e.push({
          k: JSON.parse(n),
          v: t._nums[n]
        });
      }), e.sort(function (t, e) {
        return t.v - e.v;
      }).map(function (t) {
        return t.k;
      });
    }, S.prototype.clear = function () {
      return this._length = 0, this._items = {}, this._nums = {}, this;
    };
    var I = [y.FEATURE, y.MIDPOINT, y.VERTEX],
      x = {
        click: function (t, e, n) {
          return M(t, e, n, n.options.clickBuffer);
        },
        touch: function (t, e, n) {
          return M(t, e, n, n.options.touchBuffer);
        }
      };
    function M(t, e, n, o) {
      if (null === n.map) return [];
      var r = t ? O(t, o) : e,
        i = {};
      n.options.styles && (i.layers = n.options.styles.map(function (t) {
        return t.id;
      }));
      var a = n.map.queryRenderedFeatures(r, i).filter(function (t) {
          return -1 !== I.indexOf(t.properties.meta);
        }),
        s = new S(),
        u = [];
      return a.forEach(function (t) {
        var e = t.properties.id;
        s.has(e) || (s.add(e), u.push(t));
      }), C(u);
    }
    function L(t, e) {
      var n = x.click(t, null, e),
        o = {
          mouse: l.NONE
        };
      return n[0] && (o.mouse = n[0].properties.active === v.ACTIVE ? l.MOVE : l.POINTER, o.feature = n[0].properties.meta), -1 !== e.events.currentModeName().indexOf("draw") && (o.mouse = l.ADD), e.ui.queueMapClasses(o), e.ui.updateMapClasses(), n[0];
    }
    function N(t, e) {
      var n = t.x - e.x,
        o = t.y - e.y;
      return Math.sqrt(n * n + o * o);
    }
    function A(t, e, n) {
      void 0 === n && (n = {});
      var o = null != n.fineTolerance ? n.fineTolerance : 4,
        r = null != n.grossTolerance ? n.grossTolerance : 12,
        i = null != n.interval ? n.interval : 500;
      t.point = t.point || e.point, t.time = t.time || e.time;
      var a = N(t.point, e.point);
      return a < o || a < r && e.time - t.time < i;
    }
    function P(t, e, n) {
      void 0 === n && (n = {});
      var o = null != n.tolerance ? n.tolerance : 25,
        r = null != n.interval ? n.interval : 250;
      return t.point = t.point || e.point, t.time = t.time || e.time, N(t.point, e.point) < o && e.time - t.time < r;
    }
    var F = {},
      w = {
        get exports() {
          return F;
        },
        set exports(t) {
          F = t;
        }
      }.exports = function (t, e) {
        if (e || (e = 16), void 0 === t && (t = 128), t <= 0) return "0";
        for (var n = Math.log(Math.pow(2, t)) / Math.log(e), o = 2; n === 1 / 0; o *= 2) n = Math.log(Math.pow(2, t / o)) / Math.log(e) * o;
        var r = n - Math.floor(n),
          i = "";
        for (o = 0; o < Math.floor(n); o++) {
          i = Math.floor(Math.random() * e).toString(e) + i;
        }
        if (r) {
          var a = Math.pow(e, r);
          i = Math.floor(Math.random() * a).toString(e) + i;
        }
        var s = parseInt(i, e);
        return s !== 1 / 0 && s >= Math.pow(2, t) ? w(t, e) : i;
      };
    w.rack = function (t, e, n) {
      var o = function (o) {
          var i = 0;
          do {
            if (i++ > 10) {
              if (!n) throw new Error("too many ID collisions, use more bits");
              t += n;
            }
            var a = w(t, e);
          } while (Object.hasOwnProperty.call(r, a));
          return r[a] = o, a;
        },
        r = o.hats = {};
      return o.get = function (t) {
        return o.hats[t];
      }, o.set = function (t, e) {
        return o.hats[t] = e, o;
      }, o.bits = t || 128, o.base = e || 16, o;
    };
    var R = function (t, e) {
      this.ctx = t, this.properties = e.properties || {}, this.coordinates = e.geometry.coordinates, this.id = e.id || F(), this.type = e.geometry.type;
    };
    R.prototype.changed = function () {
      this.ctx.store.featureChanged(this.id);
    }, R.prototype.incomingCoords = function (t) {
      this.setCoordinates(t);
    }, R.prototype.setCoordinates = function (t) {
      this.coordinates = t, this.changed();
    }, R.prototype.getCoordinates = function () {
      return JSON.parse(JSON.stringify(this.coordinates));
    }, R.prototype.setProperty = function (t, e) {
      this.properties[t] = e;
    }, R.prototype.toGeoJSON = function () {
      return JSON.parse(JSON.stringify({
        id: this.id,
        type: p.FEATURE,
        properties: this.properties,
        geometry: {
          coordinates: this.getCoordinates(),
          type: this.type
        }
      }));
    }, R.prototype.internal = function (t) {
      var e = {
        id: this.id,
        meta: y.FEATURE,
        "meta:type": this.type,
        active: v.INACTIVE,
        mode: t
      };
      if (this.ctx.options.userProperties) for (var n in this.properties) e["user_" + n] = this.properties[n];
      return {
        type: p.FEATURE,
        properties: e,
        geometry: {
          coordinates: this.getCoordinates(),
          type: this.type
        }
      };
    };
    var D = function (t, e) {
      R.call(this, t, e);
    };
    (D.prototype = Object.create(R.prototype)).isValid = function () {
      return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1];
    }, D.prototype.updateCoordinate = function (t, e, n) {
      this.coordinates = 3 === arguments.length ? [e, n] : [t, e], this.changed();
    }, D.prototype.getCoordinate = function () {
      return this.getCoordinates();
    };
    var k = function (t, e) {
      R.call(this, t, e);
    };
    (k.prototype = Object.create(R.prototype)).isValid = function () {
      return this.coordinates.length > 1;
    }, k.prototype.addCoordinate = function (t, e, n) {
      this.changed();
      var o = parseInt(t, 10);
      this.coordinates.splice(o, 0, [e, n]);
    }, k.prototype.getCoordinate = function (t) {
      var e = parseInt(t, 10);
      return JSON.parse(JSON.stringify(this.coordinates[e]));
    }, k.prototype.removeCoordinate = function (t) {
      this.changed(), this.coordinates.splice(parseInt(t, 10), 1);
    }, k.prototype.updateCoordinate = function (t, e, n) {
      var o = parseInt(t, 10);
      this.coordinates[o] = [e, n], this.changed();
    };
    var U = function (t, e) {
      R.call(this, t, e), this.coordinates = this.coordinates.map(function (t) {
        return t.slice(0, -1);
      });
    };
    (U.prototype = Object.create(R.prototype)).isValid = function () {
      return 0 !== this.coordinates.length && this.coordinates.every(function (t) {
        return t.length > 2;
      });
    }, U.prototype.incomingCoords = function (t) {
      this.coordinates = t.map(function (t) {
        return t.slice(0, -1);
      }), this.changed();
    }, U.prototype.setCoordinates = function (t) {
      this.coordinates = t, this.changed();
    }, U.prototype.addCoordinate = function (t, e, n) {
      this.changed();
      var o = t.split(".").map(function (t) {
        return parseInt(t, 10);
      });
      this.coordinates[o[0]].splice(o[1], 0, [e, n]);
    }, U.prototype.removeCoordinate = function (t) {
      this.changed();
      var e = t.split(".").map(function (t) {
          return parseInt(t, 10);
        }),
        n = this.coordinates[e[0]];
      n && (n.splice(e[1], 1), n.length < 3 && this.coordinates.splice(e[0], 1));
    }, U.prototype.getCoordinate = function (t) {
      var e = t.split(".").map(function (t) {
          return parseInt(t, 10);
        }),
        n = this.coordinates[e[0]];
      return JSON.parse(JSON.stringify(n[e[1]]));
    }, U.prototype.getCoordinates = function () {
      return this.coordinates.map(function (t) {
        return t.concat([t[0]]);
      });
    }, U.prototype.updateCoordinate = function (t, e, n) {
      this.changed();
      var o = t.split("."),
        r = parseInt(o[0], 10),
        i = parseInt(o[1], 10);
      void 0 === this.coordinates[r] && (this.coordinates[r] = []), this.coordinates[r][i] = [e, n];
    };
    var j = {
        MultiPoint: D,
        MultiLineString: k,
        MultiPolygon: U
      },
      V = function (t, e, n, o, r) {
        var i = n.split("."),
          a = parseInt(i[0], 10),
          s = i[1] ? i.slice(1).join(".") : null;
        return t[a][e](s, o, r);
      },
      B = function (t, e) {
        if (R.call(this, t, e), delete this.coordinates, this.model = j[e.geometry.type], void 0 === this.model) throw new TypeError(e.geometry.type + " is not a valid type");
        this.features = this._coordinatesToFeatures(e.geometry.coordinates);
      };
    function G(t) {
      this.map = t.map, this.drawConfig = JSON.parse(JSON.stringify(t.options || {})), this._ctx = t;
    }
    (B.prototype = Object.create(R.prototype))._coordinatesToFeatures = function (t) {
      var e = this,
        n = this.model.bind(this);
      return t.map(function (t) {
        return new n(e.ctx, {
          id: F(),
          type: p.FEATURE,
          properties: {},
          geometry: {
            coordinates: t,
            type: e.type.replace("Multi", "")
          }
        });
      });
    }, B.prototype.isValid = function () {
      return this.features.every(function (t) {
        return t.isValid();
      });
    }, B.prototype.setCoordinates = function (t) {
      this.features = this._coordinatesToFeatures(t), this.changed();
    }, B.prototype.getCoordinate = function (t) {
      return V(this.features, "getCoordinate", t);
    }, B.prototype.getCoordinates = function () {
      return JSON.parse(JSON.stringify(this.features.map(function (t) {
        return t.type === p.POLYGON ? t.getCoordinates() : t.coordinates;
      })));
    }, B.prototype.updateCoordinate = function (t, e, n) {
      V(this.features, "updateCoordinate", t, e, n), this.changed();
    }, B.prototype.addCoordinate = function (t, e, n) {
      V(this.features, "addCoordinate", t, e, n), this.changed();
    }, B.prototype.removeCoordinate = function (t) {
      V(this.features, "removeCoordinate", t), this.changed();
    }, B.prototype.getFeatures = function () {
      return this.features;
    }, G.prototype.setSelected = function (t) {
      return this._ctx.store.setSelected(t);
    }, G.prototype.setSelectedCoordinates = function (t) {
      var e = this;
      this._ctx.store.setSelectedCoordinates(t), t.reduce(function (t, n) {
        return void 0 === t[n.feature_id] && (t[n.feature_id] = !0, e._ctx.store.get(n.feature_id).changed()), t;
      }, {});
    }, G.prototype.getSelected = function () {
      return this._ctx.store.getSelected();
    }, G.prototype.getSelectedIds = function () {
      return this._ctx.store.getSelectedIds();
    }, G.prototype.isSelected = function (t) {
      return this._ctx.store.isSelected(t);
    }, G.prototype.getFeature = function (t) {
      return this._ctx.store.get(t);
    }, G.prototype.select = function (t) {
      return this._ctx.store.select(t);
    }, G.prototype.deselect = function (t) {
      return this._ctx.store.deselect(t);
    }, G.prototype.deleteFeature = function (t, e) {
      return void 0 === e && (e = {}), this._ctx.store.delete(t, e);
    }, G.prototype.addFeature = function (t) {
      return this._ctx.store.add(t);
    }, G.prototype.clearSelectedFeatures = function () {
      return this._ctx.store.clearSelected();
    }, G.prototype.clearSelectedCoordinates = function () {
      return this._ctx.store.clearSelectedCoordinates();
    }, G.prototype.setActionableState = function (t) {
      void 0 === t && (t = {});
      var e = {
        trash: t.trash || !1,
        combineFeatures: t.combineFeatures || !1,
        uncombineFeatures: t.uncombineFeatures || !1
      };
      return this._ctx.events.actionable(e);
    }, G.prototype.changeMode = function (t, e, n) {
      return void 0 === e && (e = {}), void 0 === n && (n = {}), this._ctx.events.changeMode(t, e, n);
    }, G.prototype.updateUIClasses = function (t) {
      return this._ctx.ui.queueMapClasses(t);
    }, G.prototype.activateUIButton = function (t) {
      return this._ctx.ui.setActiveButton(t);
    }, G.prototype.featuresAt = function (t, e, n) {
      if (void 0 === n && (n = "click"), "click" !== n && "touch" !== n) throw new Error("invalid buffer type");
      return x[n](t, e, this._ctx);
    }, G.prototype.newFeature = function (t) {
      var e = t.geometry.type;
      return e === p.POINT ? new D(this._ctx, t) : e === p.LINE_STRING ? new k(this._ctx, t) : e === p.POLYGON ? new U(this._ctx, t) : new B(this._ctx, t);
    }, G.prototype.isInstanceOf = function (t, e) {
      if (t === p.POINT) return e instanceof D;
      if (t === p.LINE_STRING) return e instanceof k;
      if (t === p.POLYGON) return e instanceof U;
      if ("MultiFeature" === t) return e instanceof B;
      throw new Error("Unknown feature class: " + t);
    }, G.prototype.doRender = function (t) {
      return this._ctx.store.featureChanged(t);
    }, G.prototype.onSetup = function () {}, G.prototype.onDrag = function () {}, G.prototype.onClick = function () {}, G.prototype.onMouseMove = function () {}, G.prototype.onMouseDown = function () {}, G.prototype.onMouseUp = function () {}, G.prototype.onMouseOut = function () {}, G.prototype.onKeyUp = function () {}, G.prototype.onKeyDown = function () {}, G.prototype.onTouchStart = function () {}, G.prototype.onTouchMove = function () {}, G.prototype.onTouchEnd = function () {}, G.prototype.onTap = function () {}, G.prototype.onStop = function () {}, G.prototype.onTrash = function () {}, G.prototype.onCombineFeature = function () {}, G.prototype.onUncombineFeature = function () {}, G.prototype.toDisplayFeatures = function () {
      throw new Error("You must overwrite toDisplayFeatures");
    };
    var J = {
        drag: "onDrag",
        click: "onClick",
        mousemove: "onMouseMove",
        mousedown: "onMouseDown",
        mouseup: "onMouseUp",
        mouseout: "onMouseOut",
        keyup: "onKeyUp",
        keydown: "onKeyDown",
        touchstart: "onTouchStart",
        touchmove: "onTouchMove",
        touchend: "onTouchEnd",
        tap: "onTap"
      },
      z = Object.keys(J);
    function Y(t) {
      var e = Object.keys(t);
      return function (n, o) {
        void 0 === o && (o = {});
        var r = {},
          i = e.reduce(function (e, n) {
            return e[n] = t[n], e;
          }, new G(n));
        return {
          start: function () {
            var e = this;
            r = i.onSetup(o), z.forEach(function (n) {
              var o,
                a = J[n],
                s = function () {
                  return !1;
                };
              t[a] && (s = function () {
                return !0;
              }), e.on(n, s, (o = a, function (t) {
                return i[o](r, t);
              }));
            });
          },
          stop: function () {
            i.onStop(r);
          },
          trash: function () {
            i.onTrash(r);
          },
          combineFeatures: function () {
            i.onCombineFeatures(r);
          },
          uncombineFeatures: function () {
            i.onUncombineFeatures(r);
          },
          render: function (t, e) {
            i.toDisplayFeatures(r, t, e);
          }
        };
      };
    }
    function $(t) {
      return [].concat(t).filter(function (t) {
        return void 0 !== t;
      });
    }
    function q() {
      var t = this;
      if (!(t.ctx.map && void 0 !== t.ctx.map.getSource(c.HOT))) return u();
      var e = t.ctx.events.currentModeName();
      t.ctx.ui.queueMapClasses({
        mode: e
      });
      var n = [],
        o = [];
      t.isDirty ? o = t.getAllIds() : (n = t.getChangedIds().filter(function (e) {
        return void 0 !== t.get(e);
      }), o = t.sources.hot.filter(function (e) {
        return e.properties.id && -1 === n.indexOf(e.properties.id) && void 0 !== t.get(e.properties.id);
      }).map(function (t) {
        return t.properties.id;
      })), t.sources.hot = [];
      var r = t.sources.cold.length;
      t.sources.cold = t.isDirty ? [] : t.sources.cold.filter(function (t) {
        var e = t.properties.id || t.properties.parent;
        return -1 === n.indexOf(e);
      });
      var i = r !== t.sources.cold.length || o.length > 0;
      function a(n, o) {
        var r = t.get(n).internal(e);
        t.ctx.events.currentModeRender(r, function (e) {
          t.sources[o].push(e);
        });
      }
      if (n.forEach(function (t) {
        return a(t, "hot");
      }), o.forEach(function (t) {
        return a(t, "cold");
      }), i && t.ctx.map.getSource(c.COLD).setData({
        type: p.FEATURE_COLLECTION,
        features: t.sources.cold
      }), t.ctx.map.getSource(c.HOT).setData({
        type: p.FEATURE_COLLECTION,
        features: t.sources.hot
      }), t._emitSelectionChange && (t.ctx.map.fire(h.SELECTION_CHANGE, {
        features: t.getSelected().map(function (t) {
          return t.toGeoJSON();
        }),
        points: t.getSelectedCoordinates().map(function (t) {
          return {
            type: p.FEATURE,
            properties: {},
            geometry: {
              type: p.POINT,
              coordinates: t.coordinates
            }
          };
        })
      }), t._emitSelectionChange = !1), t._deletedFeaturesToEmit.length) {
        var s = t._deletedFeaturesToEmit.map(function (t) {
          return t.toGeoJSON();
        });
        t._deletedFeaturesToEmit = [], t.ctx.map.fire(h.DELETE, {
          features: s
        });
      }
      function u() {
        t.isDirty = !1, t.clearChangedIds();
      }
      u(), t.ctx.map.fire(h.RENDER, {});
    }
    function H(t) {
      var e,
        n = this;
      this._features = {}, this._featureIds = new S(), this._selectedFeatureIds = new S(), this._selectedCoordinates = [], this._changedFeatureIds = new S(), this._deletedFeaturesToEmit = [], this._emitSelectionChange = !1, this._mapInitialConfig = {}, this.ctx = t, this.sources = {
        hot: [],
        cold: []
      }, this.render = function () {
        e || (e = requestAnimationFrame(function () {
          e = null, q.call(n);
        }));
      }, this.isDirty = !1;
    }
    function X(t, e) {
      var n = t._selectedCoordinates.filter(function (e) {
        return t._selectedFeatureIds.has(e.feature_id);
      });
      t._selectedCoordinates.length === n.length || e.silent || (t._emitSelectionChange = !0), t._selectedCoordinates = n;
    }
    H.prototype.createRenderBatch = function () {
      var t = this,
        e = this.render,
        n = 0;
      return this.render = function () {
        n++;
      }, function () {
        t.render = e, n > 0 && t.render();
      };
    }, H.prototype.setDirty = function () {
      return this.isDirty = !0, this;
    }, H.prototype.featureChanged = function (t) {
      return this._changedFeatureIds.add(t), this;
    }, H.prototype.getChangedIds = function () {
      return this._changedFeatureIds.values();
    }, H.prototype.clearChangedIds = function () {
      return this._changedFeatureIds.clear(), this;
    }, H.prototype.getAllIds = function () {
      return this._featureIds.values();
    }, H.prototype.add = function (t) {
      return this.featureChanged(t.id), this._features[t.id] = t, this._featureIds.add(t.id), this;
    }, H.prototype.delete = function (t, e) {
      var n = this;
      return void 0 === e && (e = {}), $(t).forEach(function (t) {
        n._featureIds.has(t) && (n._featureIds.delete(t), n._selectedFeatureIds.delete(t), e.silent || -1 === n._deletedFeaturesToEmit.indexOf(n._features[t]) && n._deletedFeaturesToEmit.push(n._features[t]), delete n._features[t], n.isDirty = !0);
      }), X(this, e), this;
    }, H.prototype.get = function (t) {
      return this._features[t];
    }, H.prototype.getAll = function () {
      var t = this;
      return Object.keys(this._features).map(function (e) {
        return t._features[e];
      });
    }, H.prototype.select = function (t, e) {
      var n = this;
      return void 0 === e && (e = {}), $(t).forEach(function (t) {
        n._selectedFeatureIds.has(t) || (n._selectedFeatureIds.add(t), n._changedFeatureIds.add(t), e.silent || (n._emitSelectionChange = !0));
      }), this;
    }, H.prototype.deselect = function (t, e) {
      var n = this;
      return void 0 === e && (e = {}), $(t).forEach(function (t) {
        n._selectedFeatureIds.has(t) && (n._selectedFeatureIds.delete(t), n._changedFeatureIds.add(t), e.silent || (n._emitSelectionChange = !0));
      }), X(this, e), this;
    }, H.prototype.clearSelected = function (t) {
      return void 0 === t && (t = {}), this.deselect(this._selectedFeatureIds.values(), {
        silent: t.silent
      }), this;
    }, H.prototype.setSelected = function (t, e) {
      var n = this;
      return void 0 === e && (e = {}), t = $(t), this.deselect(this._selectedFeatureIds.values().filter(function (e) {
        return -1 === t.indexOf(e);
      }), {
        silent: e.silent
      }), this.select(t.filter(function (t) {
        return !n._selectedFeatureIds.has(t);
      }), {
        silent: e.silent
      }), this;
    }, H.prototype.setSelectedCoordinates = function (t) {
      return this._selectedCoordinates = t, this._emitSelectionChange = !0, this;
    }, H.prototype.clearSelectedCoordinates = function () {
      return this._selectedCoordinates = [], this._emitSelectionChange = !0, this;
    }, H.prototype.getSelectedIds = function () {
      return this._selectedFeatureIds.values();
    }, H.prototype.getSelected = function () {
      var t = this;
      return this._selectedFeatureIds.values().map(function (e) {
        return t.get(e);
      });
    }, H.prototype.getSelectedCoordinates = function () {
      var t = this;
      return this._selectedCoordinates.map(function (e) {
        return {
          coordinates: t.get(e.feature_id).getCoordinate(e.coord_path)
        };
      });
    }, H.prototype.isSelected = function (t) {
      return this._selectedFeatureIds.has(t);
    }, H.prototype.setFeatureProperty = function (t, e, n) {
      this.get(t).setProperty(e, n), this.featureChanged(t);
    }, H.prototype.storeMapConfig = function () {
      var t = this;
      m.forEach(function (e) {
        t.ctx.map[e] && (t._mapInitialConfig[e] = t.ctx.map[e].isEnabled());
      });
    }, H.prototype.restoreMapConfig = function () {
      var t = this;
      Object.keys(this._mapInitialConfig).forEach(function (e) {
        t._mapInitialConfig[e] ? t.ctx.map[e].enable() : t.ctx.map[e].disable();
      });
    }, H.prototype.getInitialConfigValue = function (t) {
      return void 0 === this._mapInitialConfig[t] || this._mapInitialConfig[t];
    };
    var W = function () {
        for (var t = arguments, e = {}, n = 0; n < arguments.length; n++) {
          var o = t[n];
          for (var r in o) Z.call(o, r) && (e[r] = o[r]);
        }
        return e;
      },
      Z = Object.prototype.hasOwnProperty;
    var K = ["mode", "feature", "mouse"];
    function Q(e) {
      var n = null,
        o = null,
        r = {
          onRemove: function () {
            return e.map.off("load", r.connect), clearInterval(o), r.removeLayers(), e.store.restoreMapConfig(), e.ui.removeButtons(), e.events.removeEventListeners(), e.ui.clearMapClasses(), e.map = null, e.container = null, e.store = null, n && n.parentNode && n.parentNode.removeChild(n), n = null, this;
          },
          connect: function () {
            e.map.off("load", r.connect), clearInterval(o), r.addLayers(), e.store.storeMapConfig(), e.events.addEventListeners();
          },
          onAdd: function (i) {
            var a = i.fire;
            return i.fire = function (t, e) {
              var n = arguments;
              return 1 === a.length && 1 !== arguments.length && (n = [W({}, {
                type: t
              }, e)]), a.apply(i, n);
            }, e.map = i, e.events = function (e) {
              var n = Object.keys(e.options.modes).reduce(function (t, n) {
                  return t[n] = Y(e.options.modes[n]), t;
                }, {}),
                o = {},
                r = {},
                i = {},
                a = null,
                s = null;
              i.drag = function (t, n) {
                n({
                  point: t.point,
                  time: new Date().getTime()
                }) ? (e.ui.queueMapClasses({
                  mouse: l.DRAG
                }), s.drag(t)) : t.originalEvent.stopPropagation();
              }, i.mousedrag = function (t) {
                i.drag(t, function (t) {
                  return !A(o, t);
                });
              }, i.touchdrag = function (t) {
                i.drag(t, function (t) {
                  return !P(r, t);
                });
              }, i.mousemove = function (t) {
                if (1 === (void 0 !== t.originalEvent.buttons ? t.originalEvent.buttons : t.originalEvent.which)) return i.mousedrag(t);
                var n = L(t, e);
                t.featureTarget = n, s.mousemove(t);
              }, i.mousedown = function (t) {
                o = {
                  time: new Date().getTime(),
                  point: t.point
                };
                var n = L(t, e);
                t.featureTarget = n, s.mousedown(t);
              }, i.mouseup = function (t) {
                var n = L(t, e);
                t.featureTarget = n, A(o, {
                  point: t.point,
                  time: new Date().getTime()
                }) ? s.click(t) : s.mouseup(t);
              }, i.mouseout = function (t) {
                s.mouseout(t);
              }, i.touchstart = function (t) {
                if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
                  r = {
                    time: new Date().getTime(),
                    point: t.point
                  };
                  var n = x.touch(t, null, e)[0];
                  t.featureTarget = n, s.touchstart(t);
                }
              }, i.touchmove = function (t) {
                if (t.originalEvent.preventDefault(), e.options.touchEnabled) return s.touchmove(t), i.touchdrag(t);
              }, i.touchend = function (t) {
                if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
                  var n = x.touch(t, null, e)[0];
                  t.featureTarget = n, P(r, {
                    time: new Date().getTime(),
                    point: t.point
                  }) ? s.tap(t) : s.touchend(t);
                }
              };
              var u = function (t) {
                return !(8 === t || 46 === t || t >= 48 && t <= 57);
              };
              function c(o, r, i) {
                void 0 === i && (i = {}), s.stop();
                var u = n[o];
                if (void 0 === u) throw new Error(o + " is not valid");
                a = o;
                var c = u(e, r);
                s = t(c, e), i.silent || e.map.fire(h.MODE_CHANGE, {
                  mode: o
                }), e.store.setDirty(), e.store.render();
              }
              i.keydown = function (t) {
                "mapboxgl-canvas" === (t.srcElement || t.target).classList[0] && (8 !== t.keyCode && 46 !== t.keyCode || !e.options.controls.trash ? u(t.keyCode) ? s.keydown(t) : 49 === t.keyCode && e.options.controls.point ? c(f.DRAW_POINT) : 50 === t.keyCode && e.options.controls.line_string ? c(f.DRAW_LINE_STRING) : 51 === t.keyCode && e.options.controls.polygon && c(f.DRAW_POLYGON) : (t.preventDefault(), s.trash()));
              }, i.keyup = function (t) {
                u(t.keyCode) && s.keyup(t);
              }, i.zoomend = function () {
                e.store.changeZoom();
              }, i.data = function (t) {
                if ("style" === t.dataType) {
                  var n = e.setup,
                    o = e.map,
                    r = e.options,
                    i = e.store;
                  r.styles.some(function (t) {
                    return o.getLayer(t.id);
                  }) || (n.addLayers(), i.setDirty(), i.render());
                }
              };
              var d = {
                trash: !1,
                combineFeatures: !1,
                uncombineFeatures: !1
              };
              return {
                start: function () {
                  a = e.options.defaultMode, s = t(n[a](e), e);
                },
                changeMode: c,
                actionable: function (t) {
                  var n = !1;
                  Object.keys(t).forEach(function (e) {
                    if (void 0 === d[e]) throw new Error("Invalid action type");
                    d[e] !== t[e] && (n = !0), d[e] = t[e];
                  }), n && e.map.fire(h.ACTIONABLE, {
                    actions: d
                  });
                },
                currentModeName: function () {
                  return a;
                },
                currentModeRender: function (t, e) {
                  return s.render(t, e);
                },
                fire: function (t, e) {
                  i[t] && i[t](e);
                },
                addEventListeners: function () {
                  e.map.on("mousemove", i.mousemove), e.map.on("mousedown", i.mousedown), e.map.on("mouseup", i.mouseup), e.map.on("data", i.data), e.map.on("touchmove", i.touchmove), e.map.on("touchstart", i.touchstart), e.map.on("touchend", i.touchend), e.container.addEventListener("mouseout", i.mouseout), e.options.keybindings && (e.container.addEventListener("keydown", i.keydown), e.container.addEventListener("keyup", i.keyup));
                },
                removeEventListeners: function () {
                  e.map.off("mousemove", i.mousemove), e.map.off("mousedown", i.mousedown), e.map.off("mouseup", i.mouseup), e.map.off("data", i.data), e.map.off("touchmove", i.touchmove), e.map.off("touchstart", i.touchstart), e.map.off("touchend", i.touchend), e.container.removeEventListener("mouseout", i.mouseout), e.options.keybindings && (e.container.removeEventListener("keydown", i.keydown), e.container.removeEventListener("keyup", i.keyup));
                },
                trash: function (t) {
                  s.trash(t);
                },
                combineFeatures: function () {
                  s.combineFeatures();
                },
                uncombineFeatures: function () {
                  s.uncombineFeatures();
                },
                getMode: function () {
                  return a;
                }
              };
            }(e), e.ui = function (t) {
              var e = {},
                n = null,
                o = {
                  mode: null,
                  feature: null,
                  mouse: null
                },
                r = {
                  mode: null,
                  feature: null,
                  mouse: null
                };
              function i(t) {
                r = W(r, t);
              }
              function a() {
                var e, n;
                if (t.container) {
                  var i = [],
                    a = [];
                  K.forEach(function (t) {
                    r[t] !== o[t] && (i.push(t + "-" + o[t]), null !== r[t] && a.push(t + "-" + r[t]));
                  }), i.length > 0 && (e = t.container.classList).remove.apply(e, i), a.length > 0 && (n = t.container.classList).add.apply(n, a), o = W(o, r);
                }
              }
              function s(t, e) {
                void 0 === e && (e = {});
                var o = document.createElement("button");
                return o.className = u.CONTROL_BUTTON + " " + e.className, o.setAttribute("title", e.title), e.container.appendChild(o), o.addEventListener("click", function (o) {
                  if (o.preventDefault(), o.stopPropagation(), o.target === n) return c(), void e.onDeactivate();
                  l(t), e.onActivate();
                }, !0), o;
              }
              function c() {
                n && (n.classList.remove(u.ACTIVE_BUTTON), n = null);
              }
              function l(t) {
                c();
                var o = e[t];
                o && o && "trash" !== t && (o.classList.add(u.ACTIVE_BUTTON), n = o);
              }
              return {
                setActiveButton: l,
                queueMapClasses: i,
                updateMapClasses: a,
                clearMapClasses: function () {
                  i({
                    mode: null,
                    feature: null,
                    mouse: null
                  }), a();
                },
                addButtons: function () {
                  var n = t.options.controls,
                    o = document.createElement("div");
                  return o.className = u.CONTROL_GROUP + " " + u.CONTROL_BASE, n ? (n[d.LINE] && (e[d.LINE] = s(d.LINE, {
                    container: o,
                    className: u.CONTROL_BUTTON_LINE,
                    title: "LineString tool " + (t.options.keybindings ? "(l)" : ""),
                    onActivate: function () {
                      return t.events.changeMode(f.DRAW_LINE_STRING);
                    },
                    onDeactivate: function () {
                      return t.events.trash();
                    }
                  })), n[d.POLYGON] && (e[d.POLYGON] = s(d.POLYGON, {
                    container: o,
                    className: u.CONTROL_BUTTON_POLYGON,
                    title: "Polygon tool " + (t.options.keybindings ? "(p)" : ""),
                    onActivate: function () {
                      return t.events.changeMode(f.DRAW_POLYGON);
                    },
                    onDeactivate: function () {
                      return t.events.trash();
                    }
                  })), n[d.POINT] && (e[d.POINT] = s(d.POINT, {
                    container: o,
                    className: u.CONTROL_BUTTON_POINT,
                    title: "Marker tool " + (t.options.keybindings ? "(m)" : ""),
                    onActivate: function () {
                      return t.events.changeMode(f.DRAW_POINT);
                    },
                    onDeactivate: function () {
                      return t.events.trash();
                    }
                  })), n.trash && (e.trash = s("trash", {
                    container: o,
                    className: u.CONTROL_BUTTON_TRASH,
                    title: "Delete",
                    onActivate: function () {
                      t.events.trash();
                    }
                  })), n.combine_features && (e.combine_features = s("combineFeatures", {
                    container: o,
                    className: u.CONTROL_BUTTON_COMBINE_FEATURES,
                    title: "Combine",
                    onActivate: function () {
                      t.events.combineFeatures();
                    }
                  })), n.uncombine_features && (e.uncombine_features = s("uncombineFeatures", {
                    container: o,
                    className: u.CONTROL_BUTTON_UNCOMBINE_FEATURES,
                    title: "Uncombine",
                    onActivate: function () {
                      t.events.uncombineFeatures();
                    }
                  })), o) : o;
                },
                removeButtons: function () {
                  Object.keys(e).forEach(function (t) {
                    var n = e[t];
                    n.parentNode && n.parentNode.removeChild(n), delete e[t];
                  });
                }
              };
            }(e), e.container = i.getContainer(), e.store = new H(e), n = e.ui.addButtons(), e.options.boxSelect && (i.boxZoom.disable(), i.dragPan.disable(), i.dragPan.enable()), i.loaded() ? r.connect() : (i.on("load", r.connect), o = setInterval(function () {
              i.loaded() && r.connect();
            }, 16)), e.events.start(), n;
          },
          addLayers: function () {
            e.map.addSource(c.COLD, {
              data: {
                type: p.FEATURE_COLLECTION,
                features: []
              },
              type: "geojson"
            }), e.map.addSource(c.HOT, {
              data: {
                type: p.FEATURE_COLLECTION,
                features: []
              },
              type: "geojson"
            }), e.options.styles.forEach(function (t) {
              e.map.addLayer(t);
            }), e.store.setDirty(!0), e.store.render();
          },
          removeLayers: function () {
            e.options.styles.forEach(function (t) {
              e.map.getLayer(t.id) && e.map.removeLayer(t.id);
            }), e.map.getSource(c.COLD) && e.map.removeSource(c.COLD), e.map.getSource(c.HOT) && e.map.removeSource(c.HOT);
          }
        };
      return e.setup = r, r;
    }
    var tt = [{
      id: "gl-draw-polygon-fill-inactive",
      type: "fill",
      filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
      paint: {
        "fill-color": "#3bb2d0",
        "fill-outline-color": "#3bb2d0",
        "fill-opacity": .1
      }
    }, {
      id: "gl-draw-polygon-fill-active",
      type: "fill",
      filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
      paint: {
        "fill-color": "#fbb03b",
        "fill-outline-color": "#fbb03b",
        "fill-opacity": .1
      }
    }, {
      id: "gl-draw-polygon-midpoint",
      type: "circle",
      filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
      paint: {
        "circle-radius": 3,
        "circle-color": "#fbb03b"
      }
    }, {
      id: "gl-draw-polygon-stroke-inactive",
      type: "line",
      filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#3bb2d0",
        "line-width": 2
      }
    }, {
      id: "gl-draw-polygon-stroke-active",
      type: "line",
      filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#fbb03b",
        "line-dasharray": [.2, 2],
        "line-width": 2
      }
    }, {
      id: "gl-draw-line-inactive",
      type: "line",
      filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#3bb2d0",
        "line-width": 2
      }
    }, {
      id: "gl-draw-line-active",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#fbb03b",
        "line-dasharray": [.2, 2],
        "line-width": 2
      }
    }, {
      id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
      type: "circle",
      filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
      paint: {
        "circle-radius": 5,
        "circle-color": "#fff"
      }
    }, {
      id: "gl-draw-polygon-and-line-vertex-inactive",
      type: "circle",
      filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
      paint: {
        "circle-radius": 3,
        "circle-color": "#fbb03b"
      }
    }, {
      id: "gl-draw-point-point-stroke-inactive",
      type: "circle",
      filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
      paint: {
        "circle-radius": 5,
        "circle-opacity": 1,
        "circle-color": "#fff"
      }
    }, {
      id: "gl-draw-point-inactive",
      type: "circle",
      filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
      paint: {
        "circle-radius": 3,
        "circle-color": "#3bb2d0"
      }
    }, {
      id: "gl-draw-point-stroke-active",
      type: "circle",
      filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
      paint: {
        "circle-radius": 7,
        "circle-color": "#fff"
      }
    }, {
      id: "gl-draw-point-active",
      type: "circle",
      filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
      paint: {
        "circle-radius": 5,
        "circle-color": "#fbb03b"
      }
    }, {
      id: "gl-draw-polygon-fill-static",
      type: "fill",
      filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
      paint: {
        "fill-color": "#404040",
        "fill-outline-color": "#404040",
        "fill-opacity": .1
      }
    }, {
      id: "gl-draw-polygon-stroke-static",
      type: "line",
      filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#404040",
        "line-width": 2
      }
    }, {
      id: "gl-draw-line-static",
      type: "line",
      filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#404040",
        "line-width": 2
      }
    }, {
      id: "gl-draw-point-static",
      type: "circle",
      filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
      paint: {
        "circle-radius": 5,
        "circle-color": "#404040"
      }
    }];
    function et(t) {
      return function (e) {
        var n = e.featureTarget;
        return !!n && !!n.properties && n.properties.meta === t;
      };
    }
    function nt(t) {
      return !!t.originalEvent && !!t.originalEvent.shiftKey && 0 === t.originalEvent.button;
    }
    function ot(t) {
      return !!t.featureTarget && !!t.featureTarget.properties && t.featureTarget.properties.active === v.ACTIVE && t.featureTarget.properties.meta === y.FEATURE;
    }
    function rt(t) {
      return !!t.featureTarget && !!t.featureTarget.properties && t.featureTarget.properties.active === v.INACTIVE && t.featureTarget.properties.meta === y.FEATURE;
    }
    function it(t) {
      return void 0 === t.featureTarget;
    }
    function at(t) {
      return !!t.featureTarget && !!t.featureTarget.properties && t.featureTarget.properties.meta === y.FEATURE;
    }
    function st(t) {
      var e = t.featureTarget;
      return !!e && !!e.properties && e.properties.meta === y.VERTEX;
    }
    function ut(t) {
      return !!t.originalEvent && !0 === t.originalEvent.shiftKey;
    }
    function ct(t) {
      return 27 === t.keyCode;
    }
    function lt(t) {
      return 13 === t.keyCode;
    }
    var dt = Object.freeze({
        __proto__: null,
        isOfMetaType: et,
        isShiftMousedown: nt,
        isActiveFeature: ot,
        isInactiveFeature: rt,
        noTarget: it,
        isFeature: at,
        isVertex: st,
        isShiftDown: ut,
        isEscapeKey: ct,
        isEnterKey: lt,
        isTrue: function () {
          return !0;
        }
      }),
      pt = ft;
    function ft(t, e) {
      this.x = t, this.y = e;
    }
    function ht(t, e) {
      var n = e.getBoundingClientRect();
      return new pt(t.clientX - n.left - (e.clientLeft || 0), t.clientY - n.top - (e.clientTop || 0));
    }
    function gt(t, e, n, o) {
      return {
        type: p.FEATURE,
        properties: {
          meta: y.VERTEX,
          parent: t,
          coord_path: n,
          active: o ? v.ACTIVE : v.INACTIVE
        },
        geometry: {
          type: p.POINT,
          coordinates: e
        }
      };
    }
    function yt(t, e, n) {
      var o = e.geometry.coordinates,
        r = n.geometry.coordinates;
      if (o[1] > 85 || o[1] < _ || r[1] > 85 || r[1] < _) return null;
      var i = {
        lng: (o[0] + r[0]) / 2,
        lat: (o[1] + r[1]) / 2
      };
      return {
        type: p.FEATURE,
        properties: {
          meta: y.MIDPOINT,
          parent: t,
          lng: i.lng,
          lat: i.lat,
          coord_path: n.properties.coord_path
        },
        geometry: {
          type: p.POINT,
          coordinates: [i.lng, i.lat]
        }
      };
    }
    function vt(t, e, n) {
      void 0 === e && (e = {}), void 0 === n && (n = null);
      var o,
        r = t.geometry,
        i = r.type,
        a = r.coordinates,
        s = t.properties && t.properties.id,
        u = [];
      function c(t, n) {
        var o = "",
          r = null;
        t.forEach(function (t, i) {
          var a = null != n ? n + "." + i : String(i),
            c = gt(s, t, a, l(a));
          if (e.midpoints && r) {
            var d = yt(s, r, c);
            d && u.push(d);
          }
          r = c;
          var p = JSON.stringify(t);
          o !== p && u.push(c), 0 === i && (o = p);
        });
      }
      function l(t) {
        return !!e.selectedPaths && -1 !== e.selectedPaths.indexOf(t);
      }
      return i === p.POINT ? u.push(gt(s, a, n, l(n))) : i === p.POLYGON ? a.forEach(function (t, e) {
        c(t, null !== n ? n + "." + e : String(e));
      }) : i === p.LINE_STRING ? c(a, n) : 0 === i.indexOf(p.MULTI_PREFIX) && (o = i.replace(p.MULTI_PREFIX, ""), a.forEach(function (n, r) {
        var i = {
          type: p.FEATURE,
          properties: t.properties,
          geometry: {
            type: o,
            coordinates: n
          }
        };
        u = u.concat(vt(i, e, r));
      })), u;
    }
    ft.prototype = {
      clone: function () {
        return new ft(this.x, this.y);
      },
      add: function (t) {
        return this.clone()._add(t);
      },
      sub: function (t) {
        return this.clone()._sub(t);
      },
      multByPoint: function (t) {
        return this.clone()._multByPoint(t);
      },
      divByPoint: function (t) {
        return this.clone()._divByPoint(t);
      },
      mult: function (t) {
        return this.clone()._mult(t);
      },
      div: function (t) {
        return this.clone()._div(t);
      },
      rotate: function (t) {
        return this.clone()._rotate(t);
      },
      rotateAround: function (t, e) {
        return this.clone()._rotateAround(t, e);
      },
      matMult: function (t) {
        return this.clone()._matMult(t);
      },
      unit: function () {
        return this.clone()._unit();
      },
      perp: function () {
        return this.clone()._perp();
      },
      round: function () {
        return this.clone()._round();
      },
      mag: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      equals: function (t) {
        return this.x === t.x && this.y === t.y;
      },
      dist: function (t) {
        return Math.sqrt(this.distSqr(t));
      },
      distSqr: function (t) {
        var e = t.x - this.x,
          n = t.y - this.y;
        return e * e + n * n;
      },
      angle: function () {
        return Math.atan2(this.y, this.x);
      },
      angleTo: function (t) {
        return Math.atan2(this.y - t.y, this.x - t.x);
      },
      angleWith: function (t) {
        return this.angleWithSep(t.x, t.y);
      },
      angleWithSep: function (t, e) {
        return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e);
      },
      _matMult: function (t) {
        var e = t[0] * this.x + t[1] * this.y,
          n = t[2] * this.x + t[3] * this.y;
        return this.x = e, this.y = n, this;
      },
      _add: function (t) {
        return this.x += t.x, this.y += t.y, this;
      },
      _sub: function (t) {
        return this.x -= t.x, this.y -= t.y, this;
      },
      _mult: function (t) {
        return this.x *= t, this.y *= t, this;
      },
      _div: function (t) {
        return this.x /= t, this.y /= t, this;
      },
      _multByPoint: function (t) {
        return this.x *= t.x, this.y *= t.y, this;
      },
      _divByPoint: function (t) {
        return this.x /= t.x, this.y /= t.y, this;
      },
      _unit: function () {
        return this._div(this.mag()), this;
      },
      _perp: function () {
        var t = this.y;
        return this.y = this.x, this.x = -t, this;
      },
      _rotate: function (t) {
        var e = Math.cos(t),
          n = Math.sin(t),
          o = e * this.x - n * this.y,
          r = n * this.x + e * this.y;
        return this.x = o, this.y = r, this;
      },
      _rotateAround: function (t, e) {
        var n = Math.cos(t),
          o = Math.sin(t),
          r = e.x + n * (this.x - e.x) - o * (this.y - e.y),
          i = e.y + o * (this.x - e.x) + n * (this.y - e.y);
        return this.x = r, this.y = i, this;
      },
      _round: function () {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      }
    }, ft.convert = function (t) {
      return t instanceof ft ? t : Array.isArray(t) ? new ft(t[0], t[1]) : t;
    };
    var mt = {
        enable: function (t) {
          setTimeout(function () {
            t.map && t.map.doubleClickZoom && t._ctx && t._ctx.store && t._ctx.store.getInitialConfigValue && t._ctx.store.getInitialConfigValue("doubleClickZoom") && t.map.doubleClickZoom.enable();
          }, 0);
        },
        disable: function (t) {
          setTimeout(function () {
            t.map && t.map.doubleClickZoom && t.map.doubleClickZoom.disable();
          }, 0);
        }
      },
      _t = {},
      bt = {
        get exports() {
          return _t;
        },
        set exports(t) {
          _t = t;
        }
      },
      Et = function (t) {
        if (!t || !t.type) return null;
        var e = Tt[t.type];
        if (!e) return null;
        if ("geometry" === e) return {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {},
            geometry: t
          }]
        };
        if ("feature" === e) return {
          type: "FeatureCollection",
          features: [t]
        };
        if ("featurecollection" === e) return t;
      },
      Tt = {
        Point: "geometry",
        MultiPoint: "geometry",
        LineString: "geometry",
        MultiLineString: "geometry",
        Polygon: "geometry",
        MultiPolygon: "geometry",
        GeometryCollection: "geometry",
        Feature: "feature",
        FeatureCollection: "featurecollection"
      };
    var Ct = Object.freeze({
        __proto__: null,
        default: function t(e) {
          switch (e && e.type || null) {
            case "FeatureCollection":
              return e.features = e.features.reduce(function (e, n) {
                return e.concat(t(n));
              }, []), e;
            case "Feature":
              return e.geometry ? t(e.geometry).map(function (t) {
                var n = {
                  type: "Feature",
                  properties: JSON.parse(JSON.stringify(e.properties)),
                  geometry: t
                };
                return void 0 !== e.id && (n.id = e.id), n;
              }) : [e];
            case "MultiPoint":
              return e.coordinates.map(function (t) {
                return {
                  type: "Point",
                  coordinates: t
                };
              });
            case "MultiPolygon":
              return e.coordinates.map(function (t) {
                return {
                  type: "Polygon",
                  coordinates: t
                };
              });
            case "MultiLineString":
              return e.coordinates.map(function (t) {
                return {
                  type: "LineString",
                  coordinates: t
                };
              });
            case "GeometryCollection":
              return e.geometries.map(t).reduce(function (t, e) {
                return t.concat(e);
              }, []);
            case "Point":
            case "Polygon":
            case "LineString":
              return [e];
          }
        }
      }),
      Ot = Et,
      St = e(Ct),
      It = function (t) {
        return function t(e) {
          if (Array.isArray(e) && e.length && "number" == typeof e[0]) return [e];
          return e.reduce(function (e, n) {
            return Array.isArray(n) && Array.isArray(n[0]) ? e.concat(t(n)) : (e.push(n), e);
          }, []);
        }(t);
      };
    St instanceof Function || (St = St.default);
    var xt = {},
      Mt = {
        get exports() {
          return xt;
        },
        set exports(t) {
          xt = t;
        }
      }.exports = function (t) {
        return new Lt(t);
      };
    function Lt(t) {
      this.value = t;
    }
    function Nt(t, e, n) {
      var o = [],
        r = [],
        i = !0;
      return function t(a) {
        var s = n ? At(a) : a,
          u = {},
          c = !0,
          l = {
            node: s,
            node_: a,
            path: [].concat(o),
            parent: r[r.length - 1],
            parents: r,
            key: o.slice(-1)[0],
            isRoot: 0 === o.length,
            level: o.length,
            circular: null,
            update: function (t, e) {
              l.isRoot || (l.parent.node[l.key] = t), l.node = t, e && (c = !1);
            },
            delete: function (t) {
              delete l.parent.node[l.key], t && (c = !1);
            },
            remove: function (t) {
              wt(l.parent.node) ? l.parent.node.splice(l.key, 1) : delete l.parent.node[l.key], t && (c = !1);
            },
            keys: null,
            before: function (t) {
              u.before = t;
            },
            after: function (t) {
              u.after = t;
            },
            pre: function (t) {
              u.pre = t;
            },
            post: function (t) {
              u.post = t;
            },
            stop: function () {
              i = !1;
            },
            block: function () {
              c = !1;
            }
          };
        if (!i) return l;
        function d() {
          if ("object" == typeof l.node && null !== l.node) {
            l.keys && l.node_ === l.node || (l.keys = Pt(l.node)), l.isLeaf = 0 == l.keys.length;
            for (var t = 0; t < r.length; t++) if (r[t].node_ === a) {
              l.circular = r[t];
              break;
            }
          } else l.isLeaf = !0, l.keys = null;
          l.notLeaf = !l.isLeaf, l.notRoot = !l.isRoot;
        }
        d();
        var p = e.call(l, l.node);
        return void 0 !== p && l.update && l.update(p), u.before && u.before.call(l, l.node), c ? ("object" != typeof l.node || null === l.node || l.circular || (r.push(l), d(), Rt(l.keys, function (e, r) {
          o.push(e), u.pre && u.pre.call(l, l.node[e], e);
          var i = t(l.node[e]);
          n && Dt.call(l.node, e) && (l.node[e] = i.node), i.isLast = r == l.keys.length - 1, i.isFirst = 0 == r, u.post && u.post.call(l, i), o.pop();
        }), r.pop()), u.after && u.after.call(l, l.node), l) : l;
      }(t).node;
    }
    function At(t) {
      if ("object" == typeof t && null !== t) {
        var e;
        if (wt(t)) e = [];else if ("[object Date]" === Ft(t)) e = new Date(t.getTime ? t.getTime() : t);else if (function (t) {
          return "[object RegExp]" === Ft(t);
        }(t)) e = new RegExp(t);else if (function (t) {
          return "[object Error]" === Ft(t);
        }(t)) e = {
          message: t.message
        };else if (function (t) {
          return "[object Boolean]" === Ft(t);
        }(t)) e = new Boolean(t);else if (function (t) {
          return "[object Number]" === Ft(t);
        }(t)) e = new Number(t);else if (function (t) {
          return "[object String]" === Ft(t);
        }(t)) e = new String(t);else if (Object.create && Object.getPrototypeOf) e = Object.create(Object.getPrototypeOf(t));else if (t.constructor === Object) e = {};else {
          var n = t.constructor && t.constructor.prototype || t.__proto__ || {},
            o = function () {};
          o.prototype = n, e = new o();
        }
        return Rt(Pt(t), function (n) {
          e[n] = t[n];
        }), e;
      }
      return t;
    }
    Lt.prototype.get = function (t) {
      for (var e = this.value, n = 0; n < t.length; n++) {
        var o = t[n];
        if (!e || !Dt.call(e, o)) {
          e = void 0;
          break;
        }
        e = e[o];
      }
      return e;
    }, Lt.prototype.has = function (t) {
      for (var e = this.value, n = 0; n < t.length; n++) {
        var o = t[n];
        if (!e || !Dt.call(e, o)) return !1;
        e = e[o];
      }
      return !0;
    }, Lt.prototype.set = function (t, e) {
      for (var n = this.value, o = 0; o < t.length - 1; o++) {
        var r = t[o];
        Dt.call(n, r) || (n[r] = {}), n = n[r];
      }
      return n[t[o]] = e, e;
    }, Lt.prototype.map = function (t) {
      return Nt(this.value, t, !0);
    }, Lt.prototype.forEach = function (t) {
      return this.value = Nt(this.value, t, !1), this.value;
    }, Lt.prototype.reduce = function (t, e) {
      var n = 1 === arguments.length,
        o = n ? this.value : e;
      return this.forEach(function (e) {
        this.isRoot && n || (o = t.call(this, o, e));
      }), o;
    }, Lt.prototype.paths = function () {
      var t = [];
      return this.forEach(function (e) {
        t.push(this.path);
      }), t;
    }, Lt.prototype.nodes = function () {
      var t = [];
      return this.forEach(function (e) {
        t.push(this.node);
      }), t;
    }, Lt.prototype.clone = function () {
      var t = [],
        e = [];
      return function n(o) {
        for (var r = 0; r < t.length; r++) if (t[r] === o) return e[r];
        if ("object" == typeof o && null !== o) {
          var i = At(o);
          return t.push(o), e.push(i), Rt(Pt(o), function (t) {
            i[t] = n(o[t]);
          }), t.pop(), e.pop(), i;
        }
        return o;
      }(this.value);
    };
    var Pt = Object.keys || function (t) {
      var e = [];
      for (var n in t) e.push(n);
      return e;
    };
    function Ft(t) {
      return Object.prototype.toString.call(t);
    }
    var wt = Array.isArray || function (t) {
        return "[object Array]" === Object.prototype.toString.call(t);
      },
      Rt = function (t, e) {
        if (t.forEach) return t.forEach(e);
        for (var n = 0; n < t.length; n++) e(t[n], n, t);
      };
    Rt(Pt(Lt.prototype), function (t) {
      Mt[t] = function (e) {
        var n = [].slice.call(arguments, 1),
          o = new Lt(e);
        return o[t].apply(o, n);
      };
    });
    var Dt = Object.hasOwnProperty || function (t, e) {
        return e in t;
      },
      kt = Ut;
    function Ut(t) {
      if (!(this instanceof Ut)) return new Ut(t);
      this._bbox = t || [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !!t;
    }
    Ut.prototype.include = function (t) {
      return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], t[0]), this._bbox[1] = Math.min(this._bbox[1], t[1]), this._bbox[2] = Math.max(this._bbox[2], t[0]), this._bbox[3] = Math.max(this._bbox[3], t[1]), this;
    }, Ut.prototype.equals = function (t) {
      var e;
      return e = t instanceof Ut ? t.bbox() : t, this._bbox[0] == e[0] && this._bbox[1] == e[1] && this._bbox[2] == e[2] && this._bbox[3] == e[3];
    }, Ut.prototype.center = function (t) {
      return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null;
    }, Ut.prototype.union = function (t) {
      var e;
      return this._valid = !0, e = t instanceof Ut ? t.bbox() : t, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[2]), this._bbox[3] = Math.max(this._bbox[3], e[3]), this;
    }, Ut.prototype.bbox = function () {
      return this._valid ? this._bbox : null;
    }, Ut.prototype.contains = function (t) {
      if (!t) return this._fastContains();
      if (!this._valid) return null;
      var e = t[0],
        n = t[1];
      return this._bbox[0] <= e && this._bbox[1] <= n && this._bbox[2] >= e && this._bbox[3] >= n;
    }, Ut.prototype.intersect = function (t) {
      return this._valid ? (e = t instanceof Ut ? t.bbox() : t, !(this._bbox[0] > e[2] || this._bbox[2] < e[0] || this._bbox[3] < e[1] || this._bbox[1] > e[3])) : null;
      var e;
    }, Ut.prototype._fastContains = function () {
      if (!this._valid) return new Function("return null;");
      var t = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
      return new Function("ll", t);
    }, Ut.prototype.polygon = function () {
      return this._valid ? {
        type: "Polygon",
        coordinates: [[[this._bbox[0], this._bbox[1]], [this._bbox[2], this._bbox[1]], [this._bbox[2], this._bbox[3]], [this._bbox[0], this._bbox[3]], [this._bbox[0], this._bbox[1]]]]
      } : null;
    };
    var jt = function (t) {
        if (!t) return [];
        var e = St(Ot(t)),
          n = [];
        return e.features.forEach(function (t) {
          t.geometry && (n = n.concat(It(t.geometry.coordinates)));
        }), n;
      },
      Vt = xt,
      Bt = kt,
      Gt = {
        features: ["FeatureCollection"],
        coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"],
        geometry: ["Feature"],
        geometries: ["GeometryCollection"]
      },
      Jt = Object.keys(Gt);
    function zt(t) {
      for (var e = Bt(), n = jt(t), o = 0; o < n.length; o++) e.include(n[o]);
      return e;
    }
    bt.exports = function (t) {
      return zt(t).bbox();
    }, _t.polygon = function (t) {
      return zt(t).polygon();
    }, _t.bboxify = function (t) {
      return Vt(t).map(function (t) {
        t && Jt.some(function (e) {
          return !!t[e] && -1 !== Gt[e].indexOf(t.type);
        }) && (t.bbox = zt(t).bbox(), this.update(t));
      });
    };
    var Yt = -90;
    function $t(t, e) {
      var n = Yt,
        o = 90,
        r = Yt,
        i = 90,
        a = 270,
        s = -270;
      t.forEach(function (t) {
        var e = _t(t),
          u = e[1],
          c = e[3],
          l = e[0],
          d = e[2];
        u > n && (n = u), c < o && (o = c), c > r && (r = c), u < i && (i = u), l < a && (a = l), d > s && (s = d);
      });
      var u = e;
      return n + u.lat > 85 && (u.lat = 85 - n), r + u.lat > 90 && (u.lat = 90 - r), o + u.lat < -85 && (u.lat = -85 - o), i + u.lat < Yt && (u.lat = Yt - i), a + u.lng <= -270 && (u.lng += 360 * Math.ceil(Math.abs(u.lng) / 360)), s + u.lng >= 270 && (u.lng -= 360 * Math.ceil(Math.abs(u.lng) / 360)), u;
    }
    function qt(t, e) {
      var n = $t(t.map(function (t) {
        return t.toGeoJSON();
      }), e);
      t.forEach(function (t) {
        var e,
          o = t.getCoordinates(),
          r = function (t) {
            var e = {
              lng: t[0] + n.lng,
              lat: t[1] + n.lat
            };
            return [e.lng, e.lat];
          },
          i = function (t) {
            return t.map(function (t) {
              return r(t);
            });
          };
        t.type === p.POINT ? e = r(o) : t.type === p.LINE_STRING || t.type === p.MULTI_POINT ? e = o.map(r) : t.type === p.POLYGON || t.type === p.MULTI_LINE_STRING ? e = o.map(i) : t.type === p.MULTI_POLYGON && (e = o.map(function (t) {
          return t.map(function (t) {
            return i(t);
          });
        })), t.incomingCoords(e);
      });
    }
    var Ht = {
      onSetup: function (t) {
        var e = this,
          n = {
            dragMoveLocation: null,
            boxSelectStartLocation: null,
            boxSelectElement: void 0,
            boxSelecting: !1,
            canBoxSelect: !1,
            dragMoving: !1,
            canDragMove: !1,
            initiallySelectedFeatureIds: t.featureIds || []
          };
        return this.setSelected(n.initiallySelectedFeatureIds.filter(function (t) {
          return void 0 !== e.getFeature(t);
        })), this.fireActionable(), this.setActionableState({
          combineFeatures: !0,
          uncombineFeatures: !0,
          trash: !0
        }), n;
      },
      fireUpdate: function () {
        this.map.fire(h.UPDATE, {
          action: g.MOVE,
          features: this.getSelected().map(function (t) {
            return t.toGeoJSON();
          })
        });
      },
      fireActionable: function () {
        var t = this,
          e = this.getSelected(),
          n = e.filter(function (e) {
            return t.isInstanceOf("MultiFeature", e);
          }),
          o = !1;
        if (e.length > 1) {
          o = !0;
          var r = e[0].type.replace("Multi", "");
          e.forEach(function (t) {
            t.type.replace("Multi", "") !== r && (o = !1);
          });
        }
        var i = n.length > 0,
          a = e.length > 0;
        this.setActionableState({
          combineFeatures: o,
          uncombineFeatures: i,
          trash: a
        });
      },
      getUniqueIds: function (t) {
        return t.length ? t.map(function (t) {
          return t.properties.id;
        }).filter(function (t) {
          return void 0 !== t;
        }).reduce(function (t, e) {
          return t.add(e), t;
        }, new S()).values() : [];
      },
      stopExtendedInteractions: function (t) {
        t.boxSelectElement && (t.boxSelectElement.parentNode && t.boxSelectElement.parentNode.removeChild(t.boxSelectElement), t.boxSelectElement = null), this.map.dragPan.enable(), t.boxSelecting = !1, t.canBoxSelect = !1, t.dragMoving = !1, t.canDragMove = !1;
      },
      onStop: function () {
        mt.enable(this);
      },
      onMouseMove: function (t) {
        return this.stopExtendedInteractions(t), !0;
      },
      onMouseOut: function (t) {
        return !t.dragMoving || this.fireUpdate();
      }
    };
    Ht.onTap = Ht.onClick = function (t, e) {
      return it(e) ? this.clickAnywhere(t, e) : et(y.VERTEX)(e) ? this.clickOnVertex(t, e) : at(e) ? this.clickOnFeature(t, e) : void 0;
    }, Ht.clickAnywhere = function (t) {
      var e = this,
        n = this.getSelectedIds();
      n.length && (this.clearSelectedFeatures(), n.forEach(function (t) {
        return e.doRender(t);
      })), mt.enable(this), this.stopExtendedInteractions(t);
    }, Ht.clickOnVertex = function (t, e) {
      this.changeMode(f.DIRECT_SELECT, {
        featureId: e.featureTarget.properties.parent,
        coordPath: e.featureTarget.properties.coord_path,
        startPos: e.lngLat
      }), this.updateUIClasses({
        mouse: l.MOVE
      });
    }, Ht.startOnActiveFeature = function (t, e) {
      this.stopExtendedInteractions(t), this.map.dragPan.disable(), this.doRender(e.featureTarget.properties.id), t.canDragMove = !0, t.dragMoveLocation = e.lngLat;
    }, Ht.clickOnFeature = function (t, e) {
      var n = this;
      mt.disable(this), this.stopExtendedInteractions(t);
      var o = ut(e),
        r = this.getSelectedIds(),
        i = e.featureTarget.properties.id,
        a = this.isSelected(i);
      if (!o && a && this.getFeature(i).type !== p.POINT) return this.changeMode(f.DIRECT_SELECT, {
        featureId: i
      });
      a && o ? (this.deselect(i), this.updateUIClasses({
        mouse: l.POINTER
      }), 1 === r.length && mt.enable(this)) : !a && o ? (this.select(i), this.updateUIClasses({
        mouse: l.MOVE
      })) : a || o || (r.forEach(function (t) {
        return n.doRender(t);
      }), this.setSelected(i), this.updateUIClasses({
        mouse: l.MOVE
      })), this.doRender(i);
    }, Ht.onMouseDown = function (t, e) {
      return ot(e) ? this.startOnActiveFeature(t, e) : this.drawConfig.boxSelect && nt(e) ? this.startBoxSelect(t, e) : void 0;
    }, Ht.startBoxSelect = function (t, e) {
      this.stopExtendedInteractions(t), this.map.dragPan.disable(), t.boxSelectStartLocation = ht(e.originalEvent, this.map.getContainer()), t.canBoxSelect = !0;
    }, Ht.onTouchStart = function (t, e) {
      if (ot(e)) return this.startOnActiveFeature(t, e);
    }, Ht.onDrag = function (t, e) {
      return t.canDragMove ? this.dragMove(t, e) : this.drawConfig.boxSelect && t.canBoxSelect ? this.whileBoxSelect(t, e) : void 0;
    }, Ht.whileBoxSelect = function (t, e) {
      t.boxSelecting = !0, this.updateUIClasses({
        mouse: l.ADD
      }), t.boxSelectElement || (t.boxSelectElement = document.createElement("div"), t.boxSelectElement.classList.add(u.BOX_SELECT), this.map.getContainer().appendChild(t.boxSelectElement));
      var n = ht(e.originalEvent, this.map.getContainer()),
        o = Math.min(t.boxSelectStartLocation.x, n.x),
        r = Math.max(t.boxSelectStartLocation.x, n.x),
        i = Math.min(t.boxSelectStartLocation.y, n.y),
        a = Math.max(t.boxSelectStartLocation.y, n.y),
        s = "translate(" + o + "px, " + i + "px)";
      t.boxSelectElement.style.transform = s, t.boxSelectElement.style.WebkitTransform = s, t.boxSelectElement.style.width = r - o + "px", t.boxSelectElement.style.height = a - i + "px";
    }, Ht.dragMove = function (t, e) {
      t.dragMoving = !0, e.originalEvent.stopPropagation();
      var n = {
        lng: e.lngLat.lng - t.dragMoveLocation.lng,
        lat: e.lngLat.lat - t.dragMoveLocation.lat
      };
      qt(this.getSelected(), n), t.dragMoveLocation = e.lngLat;
    }, Ht.onTouchEnd = Ht.onMouseUp = function (t, e) {
      var n = this;
      if (t.dragMoving) this.fireUpdate();else if (t.boxSelecting) {
        var o = [t.boxSelectStartLocation, ht(e.originalEvent, this.map.getContainer())],
          r = this.featuresAt(null, o, "click"),
          i = this.getUniqueIds(r).filter(function (t) {
            return !n.isSelected(t);
          });
        i.length && (this.select(i), i.forEach(function (t) {
          return n.doRender(t);
        }), this.updateUIClasses({
          mouse: l.MOVE
        }));
      }
      this.stopExtendedInteractions(t);
    }, Ht.toDisplayFeatures = function (t, e, n) {
      e.properties.active = this.isSelected(e.properties.id) ? v.ACTIVE : v.INACTIVE, n(e), this.fireActionable(), e.properties.active === v.ACTIVE && e.geometry.type !== p.POINT && vt(e).forEach(n);
    }, Ht.onTrash = function () {
      this.deleteFeature(this.getSelectedIds()), this.fireActionable();
    }, Ht.onCombineFeatures = function () {
      var t = this.getSelected();
      if (!(0 === t.length || t.length < 2)) {
        for (var e = [], n = [], o = t[0].type.replace("Multi", ""), r = 0; r < t.length; r++) {
          var i = t[r];
          if (i.type.replace("Multi", "") !== o) return;
          i.type.includes("Multi") ? i.getCoordinates().forEach(function (t) {
            e.push(t);
          }) : e.push(i.getCoordinates()), n.push(i.toGeoJSON());
        }
        if (n.length > 1) {
          var a = this.newFeature({
            type: p.FEATURE,
            properties: n[0].properties,
            geometry: {
              type: "Multi" + o,
              coordinates: e
            }
          });
          this.addFeature(a), this.deleteFeature(this.getSelectedIds(), {
            silent: !0
          }), this.setSelected([a.id]), this.map.fire(h.COMBINE_FEATURES, {
            createdFeatures: [a.toGeoJSON()],
            deletedFeatures: n
          });
        }
        this.fireActionable();
      }
    }, Ht.onUncombineFeatures = function () {
      var t = this,
        e = this.getSelected();
      if (0 !== e.length) {
        for (var n = [], o = [], r = function (r) {
            var i = e[r];
            t.isInstanceOf("MultiFeature", i) && (i.getFeatures().forEach(function (e) {
              t.addFeature(e), e.properties = i.properties, n.push(e.toGeoJSON()), t.select([e.id]);
            }), t.deleteFeature(i.id, {
              silent: !0
            }), o.push(i.toGeoJSON()));
          }, i = 0; i < e.length; i++) r(i);
        n.length > 1 && this.map.fire(h.UNCOMBINE_FEATURES, {
          createdFeatures: n,
          deletedFeatures: o
        }), this.fireActionable();
      }
    };
    var Xt = et(y.VERTEX),
      Wt = et(y.MIDPOINT),
      Zt = {
        fireUpdate: function () {
          this.map.fire(h.UPDATE, {
            action: g.CHANGE_COORDINATES,
            features: this.getSelected().map(function (t) {
              return t.toGeoJSON();
            })
          });
        },
        fireActionable: function (t) {
          this.setActionableState({
            combineFeatures: !1,
            uncombineFeatures: !1,
            trash: t.selectedCoordPaths.length > 0
          });
        },
        startDragging: function (t, e) {
          this.map.dragPan.disable(), t.canDragMove = !0, t.dragMoveLocation = e.lngLat;
        },
        stopDragging: function (t) {
          this.map.dragPan.enable(), t.dragMoving = !1, t.canDragMove = !1, t.dragMoveLocation = null;
        },
        onVertex: function (t, e) {
          this.startDragging(t, e);
          var n = e.featureTarget.properties,
            o = t.selectedCoordPaths.indexOf(n.coord_path);
          ut(e) || -1 !== o ? ut(e) && -1 === o && t.selectedCoordPaths.push(n.coord_path) : t.selectedCoordPaths = [n.coord_path];
          var r = this.pathsToCoordinates(t.featureId, t.selectedCoordPaths);
          this.setSelectedCoordinates(r);
        },
        onMidpoint: function (t, e) {
          this.startDragging(t, e);
          var n = e.featureTarget.properties;
          t.feature.addCoordinate(n.coord_path, n.lng, n.lat), this.fireUpdate(), t.selectedCoordPaths = [n.coord_path];
        },
        pathsToCoordinates: function (t, e) {
          return e.map(function (e) {
            return {
              feature_id: t,
              coord_path: e
            };
          });
        },
        onFeature: function (t, e) {
          0 === t.selectedCoordPaths.length ? this.startDragging(t, e) : this.stopDragging(t);
        },
        dragFeature: function (t, e, n) {
          qt(this.getSelected(), n), t.dragMoveLocation = e.lngLat;
        },
        dragVertex: function (t, e, n) {
          for (var o = t.selectedCoordPaths.map(function (e) {
              return t.feature.getCoordinate(e);
            }), r = $t(o.map(function (t) {
              return {
                type: p.FEATURE,
                properties: {},
                geometry: {
                  type: p.POINT,
                  coordinates: t
                }
              };
            }), n), i = 0; i < o.length; i++) {
            var a = o[i];
            t.feature.updateCoordinate(t.selectedCoordPaths[i], a[0] + r.lng, a[1] + r.lat);
          }
        },
        clickNoTarget: function () {
          this.changeMode(f.SIMPLE_SELECT);
        },
        clickInactive: function () {
          this.changeMode(f.SIMPLE_SELECT);
        },
        clickActiveFeature: function (t) {
          t.selectedCoordPaths = [], this.clearSelectedCoordinates(), t.feature.changed();
        },
        onSetup: function (t) {
          var e = t.featureId,
            n = this.getFeature(e);
          if (!n) throw new Error("You must provide a featureId to enter direct_select mode");
          if (n.type === p.POINT) throw new TypeError("direct_select mode doesn't handle point features");
          var o = {
            featureId: e,
            feature: n,
            dragMoveLocation: t.startPos || null,
            dragMoving: !1,
            canDragMove: !1,
            selectedCoordPaths: t.coordPath ? [t.coordPath] : []
          };
          return this.setSelectedCoordinates(this.pathsToCoordinates(e, o.selectedCoordPaths)), this.setSelected(e), mt.disable(this), this.setActionableState({
            trash: !0
          }), o;
        },
        onStop: function () {
          mt.enable(this), this.clearSelectedCoordinates();
        },
        toDisplayFeatures: function (t, e, n) {
          t.featureId === e.properties.id ? (e.properties.active = v.ACTIVE, n(e), vt(e, {
            map: this.map,
            midpoints: !0,
            selectedPaths: t.selectedCoordPaths
          }).forEach(n)) : (e.properties.active = v.INACTIVE, n(e)), this.fireActionable(t);
        },
        onTrash: function (t) {
          t.selectedCoordPaths.sort(function (t, e) {
            return e.localeCompare(t, "en", {
              numeric: !0
            });
          }).forEach(function (e) {
            return t.feature.removeCoordinate(e);
          }), this.fireUpdate(), t.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(t), !1 === t.feature.isValid() && (this.deleteFeature([t.featureId]), this.changeMode(f.SIMPLE_SELECT, {}));
        },
        onMouseMove: function (t, e) {
          var n = ot(e),
            o = Xt(e),
            r = 0 === t.selectedCoordPaths.length;
          return n && r || o && !r ? this.updateUIClasses({
            mouse: l.MOVE
          }) : this.updateUIClasses({
            mouse: l.NONE
          }), this.stopDragging(t), !0;
        },
        onMouseOut: function (t) {
          return t.dragMoving && this.fireUpdate(), !0;
        }
      };
    Zt.onTouchStart = Zt.onMouseDown = function (t, e) {
      return Xt(e) ? this.onVertex(t, e) : ot(e) ? this.onFeature(t, e) : Wt(e) ? this.onMidpoint(t, e) : void 0;
    }, Zt.onDrag = function (t, e) {
      if (!0 === t.canDragMove) {
        t.dragMoving = !0, e.originalEvent.stopPropagation();
        var n = {
          lng: e.lngLat.lng - t.dragMoveLocation.lng,
          lat: e.lngLat.lat - t.dragMoveLocation.lat
        };
        t.selectedCoordPaths.length > 0 ? this.dragVertex(t, e, n) : this.dragFeature(t, e, n), t.dragMoveLocation = e.lngLat;
      }
    }, Zt.onClick = function (t, e) {
      return it(e) ? this.clickNoTarget(t, e) : ot(e) ? this.clickActiveFeature(t, e) : rt(e) ? this.clickInactive(t, e) : void this.stopDragging(t);
    }, Zt.onTap = function (t, e) {
      return it(e) ? this.clickNoTarget(t, e) : ot(e) ? this.clickActiveFeature(t, e) : rt(e) ? this.clickInactive(t, e) : void 0;
    }, Zt.onTouchEnd = Zt.onMouseUp = function (t) {
      t.dragMoving && this.fireUpdate(), this.stopDragging(t);
    };
    var Kt = {};
    function Qt(t, e) {
      return !!t.lngLat && t.lngLat.lng === e[0] && t.lngLat.lat === e[1];
    }
    Kt.onSetup = function () {
      var t = this.newFeature({
        type: p.FEATURE,
        properties: {},
        geometry: {
          type: p.POINT,
          coordinates: []
        }
      });
      return this.addFeature(t), this.clearSelectedFeatures(), this.updateUIClasses({
        mouse: l.ADD
      }), this.activateUIButton(d.POINT), this.setActionableState({
        trash: !0
      }), {
        point: t
      };
    }, Kt.stopDrawingAndRemove = function (t) {
      this.deleteFeature([t.point.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT);
    }, Kt.onTap = Kt.onClick = function (t, e) {
      this.updateUIClasses({
        mouse: l.MOVE
      }), t.point.updateCoordinate("", e.lngLat.lng, e.lngLat.lat), this.map.fire(h.CREATE, {
        features: [t.point.toGeoJSON()]
      }), this.changeMode(f.SIMPLE_SELECT, {
        featureIds: [t.point.id]
      });
    }, Kt.onStop = function (t) {
      this.activateUIButton(), t.point.getCoordinate().length || this.deleteFeature([t.point.id], {
        silent: !0
      });
    }, Kt.toDisplayFeatures = function (t, e, n) {
      var o = e.properties.id === t.point.id;
      if (e.properties.active = o ? v.ACTIVE : v.INACTIVE, !o) return n(e);
    }, Kt.onTrash = Kt.stopDrawingAndRemove, Kt.onKeyUp = function (t, e) {
      if (ct(e) || lt(e)) return this.stopDrawingAndRemove(t, e);
    };
    var te = {
      onSetup: function () {
        var t = this.newFeature({
          type: p.FEATURE,
          properties: {},
          geometry: {
            type: p.POLYGON,
            coordinates: [[]]
          }
        });
        return this.addFeature(t), this.clearSelectedFeatures(), mt.disable(this), this.updateUIClasses({
          mouse: l.ADD
        }), this.activateUIButton(d.POLYGON), this.setActionableState({
          trash: !0
        }), {
          polygon: t,
          currentVertexPosition: 0
        };
      },
      clickAnywhere: function (t, e) {
        if (t.currentVertexPosition > 0 && Qt(e, t.polygon.coordinates[0][t.currentVertexPosition - 1])) return this.changeMode(f.SIMPLE_SELECT, {
          featureIds: [t.polygon.id]
        });
        this.updateUIClasses({
          mouse: l.ADD
        }), t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), t.currentVertexPosition++, t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
      },
      clickOnVertex: function (t) {
        return this.changeMode(f.SIMPLE_SELECT, {
          featureIds: [t.polygon.id]
        });
      },
      onMouseMove: function (t, e) {
        t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), st(e) && this.updateUIClasses({
          mouse: l.POINTER
        });
      }
    };
    te.onTap = te.onClick = function (t, e) {
      return st(e) ? this.clickOnVertex(t, e) : this.clickAnywhere(t, e);
    }, te.onKeyUp = function (t, e) {
      ct(e) ? (this.deleteFeature([t.polygon.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT)) : lt(e) && this.changeMode(f.SIMPLE_SELECT, {
        featureIds: [t.polygon.id]
      });
    }, te.onStop = function (t) {
      this.updateUIClasses({
        mouse: l.NONE
      }), mt.enable(this), this.activateUIButton(), void 0 !== this.getFeature(t.polygon.id) && (t.polygon.removeCoordinate("0." + t.currentVertexPosition), t.polygon.isValid() ? this.map.fire(h.CREATE, {
        features: [t.polygon.toGeoJSON()]
      }) : (this.deleteFeature([t.polygon.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT, {}, {
        silent: !0
      })));
    }, te.toDisplayFeatures = function (t, e, n) {
      var o = e.properties.id === t.polygon.id;
      if (e.properties.active = o ? v.ACTIVE : v.INACTIVE, !o) return n(e);
      if (0 !== e.geometry.coordinates.length) {
        var r = e.geometry.coordinates[0].length;
        if (!(r < 3)) {
          if (e.properties.meta = y.FEATURE, n(gt(t.polygon.id, e.geometry.coordinates[0][0], "0.0", !1)), r > 3) {
            var i = e.geometry.coordinates[0].length - 3;
            n(gt(t.polygon.id, e.geometry.coordinates[0][i], "0." + i, !1));
          }
          if (r <= 4) {
            var a = [[e.geometry.coordinates[0][0][0], e.geometry.coordinates[0][0][1]], [e.geometry.coordinates[0][1][0], e.geometry.coordinates[0][1][1]]];
            if (n({
              type: p.FEATURE,
              properties: e.properties,
              geometry: {
                coordinates: a,
                type: p.LINE_STRING
              }
            }), 3 === r) return;
          }
          return n(e);
        }
      }
    }, te.onTrash = function (t) {
      this.deleteFeature([t.polygon.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT);
    };
    var ee = {
      onSetup: function (t) {
        var e,
          n,
          o = (t = t || {}).featureId,
          r = "forward";
        if (o) {
          if (!(e = this.getFeature(o))) throw new Error("Could not find a feature with the provided featureId");
          var i = t.from;
          if (i && "Feature" === i.type && i.geometry && "Point" === i.geometry.type && (i = i.geometry), i && "Point" === i.type && i.coordinates && 2 === i.coordinates.length && (i = i.coordinates), !i || !Array.isArray(i)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
          var a = e.coordinates.length - 1;
          if (e.coordinates[a][0] === i[0] && e.coordinates[a][1] === i[1]) n = a + 1, e.addCoordinate.apply(e, [n].concat(e.coordinates[a]));else {
            if (e.coordinates[0][0] !== i[0] || e.coordinates[0][1] !== i[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
            r = "backwards", n = 0, e.addCoordinate.apply(e, [n].concat(e.coordinates[0]));
          }
        } else e = this.newFeature({
          type: p.FEATURE,
          properties: {},
          geometry: {
            type: p.LINE_STRING,
            coordinates: []
          }
        }), n = 0, this.addFeature(e);
        return this.clearSelectedFeatures(), mt.disable(this), this.updateUIClasses({
          mouse: l.ADD
        }), this.activateUIButton(d.LINE), this.setActionableState({
          trash: !0
        }), {
          line: e,
          currentVertexPosition: n,
          direction: r
        };
      },
      clickAnywhere: function (t, e) {
        if (t.currentVertexPosition > 0 && Qt(e, t.line.coordinates[t.currentVertexPosition - 1]) || "backwards" === t.direction && Qt(e, t.line.coordinates[t.currentVertexPosition + 1])) return this.changeMode(f.SIMPLE_SELECT, {
          featureIds: [t.line.id]
        });
        this.updateUIClasses({
          mouse: l.ADD
        }), t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), "forward" === t.direction ? (t.currentVertexPosition++, t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat)) : t.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
      },
      clickOnVertex: function (t) {
        return this.changeMode(f.SIMPLE_SELECT, {
          featureIds: [t.line.id]
        });
      },
      onMouseMove: function (t, e) {
        t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), st(e) && this.updateUIClasses({
          mouse: l.POINTER
        });
      }
    };
    ee.onTap = ee.onClick = function (t, e) {
      if (st(e)) return this.clickOnVertex(t, e);
      this.clickAnywhere(t, e);
    }, ee.onKeyUp = function (t, e) {
      lt(e) ? this.changeMode(f.SIMPLE_SELECT, {
        featureIds: [t.line.id]
      }) : ct(e) && (this.deleteFeature([t.line.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT));
    }, ee.onStop = function (t) {
      mt.enable(this), this.activateUIButton(), void 0 !== this.getFeature(t.line.id) && (t.line.removeCoordinate("" + t.currentVertexPosition), t.line.isValid() ? this.map.fire(h.CREATE, {
        features: [t.line.toGeoJSON()]
      }) : (this.deleteFeature([t.line.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT, {}, {
        silent: !0
      })));
    }, ee.onTrash = function (t) {
      this.deleteFeature([t.line.id], {
        silent: !0
      }), this.changeMode(f.SIMPLE_SELECT);
    }, ee.toDisplayFeatures = function (t, e, n) {
      var o = e.properties.id === t.line.id;
      if (e.properties.active = o ? v.ACTIVE : v.INACTIVE, !o) return n(e);
      e.geometry.coordinates.length < 2 || (e.properties.meta = y.FEATURE, n(gt(t.line.id, e.geometry.coordinates["forward" === t.direction ? e.geometry.coordinates.length - 2 : 1], "" + ("forward" === t.direction ? e.geometry.coordinates.length - 2 : 1), !1)), n(e));
    };
    var ne = {
        simple_select: Ht,
        direct_select: Zt,
        draw_point: Kt,
        draw_polygon: te,
        draw_line_string: ee
      },
      oe = {
        defaultMode: f.SIMPLE_SELECT,
        keybindings: !0,
        touchEnabled: !0,
        clickBuffer: 2,
        touchBuffer: 25,
        boxSelect: !0,
        displayControlsDefault: !0,
        styles: tt,
        modes: ne,
        controls: {},
        userProperties: !1
      },
      re = {
        point: !0,
        line_string: !0,
        polygon: !0,
        trash: !0,
        combine_features: !0,
        uncombine_features: !0
      },
      ie = {
        point: !1,
        line_string: !1,
        polygon: !1,
        trash: !1,
        combine_features: !1,
        uncombine_features: !1
      };
    function ae(t, e) {
      return t.map(function (t) {
        return t.source ? t : W(t, {
          id: t.id + "." + e,
          source: "hot" === e ? c.HOT : c.COLD
        });
      });
    }
    var se = {};
    !function (t, e) {
      var n = "__lodash_hash_undefined__",
        o = 9007199254740991,
        r = "[object Arguments]",
        i = "[object Array]",
        a = "[object Boolean]",
        s = "[object Date]",
        u = "[object Error]",
        c = "[object Function]",
        l = "[object Map]",
        d = "[object Number]",
        p = "[object Object]",
        f = "[object Promise]",
        h = "[object RegExp]",
        g = "[object Set]",
        y = "[object String]",
        v = "[object Symbol]",
        m = "[object WeakMap]",
        _ = "[object ArrayBuffer]",
        b = "[object DataView]",
        E = /^\[object .+?Constructor\]$/,
        T = /^(?:0|[1-9]\d*)$/,
        C = {};
      C["[object Float32Array]"] = C["[object Float64Array]"] = C["[object Int8Array]"] = C["[object Int16Array]"] = C["[object Int32Array]"] = C["[object Uint8Array]"] = C["[object Uint8ClampedArray]"] = C["[object Uint16Array]"] = C["[object Uint32Array]"] = !0, C[r] = C[i] = C[_] = C[a] = C[b] = C[s] = C[u] = C[c] = C[l] = C[d] = C[p] = C[h] = C[g] = C[y] = C[m] = !1;
      var O = "object" == typeof commonjsGlobal && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal,
        S = "object" == typeof self && self && self.Object === Object && self,
        I = O || S || Function("return this")(),
        x = e && !e.nodeType && e,
        M = x && t && !t.nodeType && t,
        L = M && M.exports === x,
        N = L && O.process,
        A = function () {
          try {
            return N && N.binding && N.binding("util");
          } catch (t) {}
        }(),
        P = A && A.isTypedArray;
      function F(t, e) {
        for (var n = -1, o = null == t ? 0 : t.length; ++n < o;) if (e(t[n], n, t)) return !0;
        return !1;
      }
      function w(t) {
        var e = -1,
          n = Array(t.size);
        return t.forEach(function (t, o) {
          n[++e] = [o, t];
        }), n;
      }
      function R(t) {
        var e = -1,
          n = Array(t.size);
        return t.forEach(function (t) {
          n[++e] = t;
        }), n;
      }
      var D,
        k,
        U,
        j = Array.prototype,
        V = Function.prototype,
        B = Object.prototype,
        G = I["__core-js_shared__"],
        J = V.toString,
        z = B.hasOwnProperty,
        Y = (D = /[^.]+$/.exec(G && G.keys && G.keys.IE_PROTO || "")) ? "Symbol(src)_1." + D : "",
        $ = B.toString,
        q = RegExp("^" + J.call(z).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        H = L ? I.Buffer : void 0,
        X = I.Symbol,
        W = I.Uint8Array,
        Z = B.propertyIsEnumerable,
        K = j.splice,
        Q = X ? X.toStringTag : void 0,
        tt = Object.getOwnPropertySymbols,
        et = H ? H.isBuffer : void 0,
        nt = (k = Object.keys, U = Object, function (t) {
          return k(U(t));
        }),
        ot = At(I, "DataView"),
        rt = At(I, "Map"),
        it = At(I, "Promise"),
        at = At(I, "Set"),
        st = At(I, "WeakMap"),
        ut = At(Object, "create"),
        ct = Rt(ot),
        lt = Rt(rt),
        dt = Rt(it),
        pt = Rt(at),
        ft = Rt(st),
        ht = X ? X.prototype : void 0,
        gt = ht ? ht.valueOf : void 0;
      function yt(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n;) {
          var o = t[e];
          this.set(o[0], o[1]);
        }
      }
      function vt(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n;) {
          var o = t[e];
          this.set(o[0], o[1]);
        }
      }
      function mt(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n;) {
          var o = t[e];
          this.set(o[0], o[1]);
        }
      }
      function _t(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.__data__ = new mt(); ++e < n;) this.add(t[e]);
      }
      function bt(t) {
        var e = this.__data__ = new vt(t);
        this.size = e.size;
      }
      function Et(t, e) {
        var n = Ut(t),
          o = !n && kt(t),
          r = !n && !o && jt(t),
          i = !n && !o && !r && zt(t),
          a = n || o || r || i,
          s = a ? function (t, e) {
            for (var n = -1, o = Array(t); ++n < t;) o[n] = e(n);
            return o;
          }(t.length, String) : [],
          u = s.length;
        for (var c in t) !e && !z.call(t, c) || a && ("length" == c || r && ("offset" == c || "parent" == c) || i && ("buffer" == c || "byteLength" == c || "byteOffset" == c) || wt(c, u)) || s.push(c);
        return s;
      }
      function Tt(t, e) {
        for (var n = t.length; n--;) if (Dt(t[n][0], e)) return n;
        return -1;
      }
      function Ct(t) {
        return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : Q && Q in Object(t) ? function (t) {
          var e = z.call(t, Q),
            n = t[Q];
          try {
            t[Q] = void 0;
            var o = !0;
          } catch (t) {}
          var r = $.call(t);
          o && (e ? t[Q] = n : delete t[Q]);
          return r;
        }(t) : function (t) {
          return $.call(t);
        }(t);
      }
      function Ot(t) {
        return Jt(t) && Ct(t) == r;
      }
      function St(t, e, n, o, c) {
        return t === e || (null == t || null == e || !Jt(t) && !Jt(e) ? t != t && e != e : function (t, e, n, o, c, f) {
          var m = Ut(t),
            E = Ut(e),
            T = m ? i : Ft(t),
            C = E ? i : Ft(e),
            O = (T = T == r ? p : T) == p,
            S = (C = C == r ? p : C) == p,
            I = T == C;
          if (I && jt(t)) {
            if (!jt(e)) return !1;
            m = !0, O = !1;
          }
          if (I && !O) return f || (f = new bt()), m || zt(t) ? Mt(t, e, n, o, c, f) : function (t, e, n, o, r, i, c) {
            switch (n) {
              case b:
                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                t = t.buffer, e = e.buffer;
              case _:
                return !(t.byteLength != e.byteLength || !i(new W(t), new W(e)));
              case a:
              case s:
              case d:
                return Dt(+t, +e);
              case u:
                return t.name == e.name && t.message == e.message;
              case h:
              case y:
                return t == e + "";
              case l:
                var p = w;
              case g:
                var f = 1 & o;
                if (p || (p = R), t.size != e.size && !f) return !1;
                var m = c.get(t);
                if (m) return m == e;
                o |= 2, c.set(t, e);
                var E = Mt(p(t), p(e), o, r, i, c);
                return c.delete(t), E;
              case v:
                if (gt) return gt.call(t) == gt.call(e);
            }
            return !1;
          }(t, e, T, n, o, c, f);
          if (!(1 & n)) {
            var x = O && z.call(t, "__wrapped__"),
              M = S && z.call(e, "__wrapped__");
            if (x || M) {
              var L = x ? t.value() : t,
                N = M ? e.value() : e;
              return f || (f = new bt()), c(L, N, n, o, f);
            }
          }
          if (!I) return !1;
          return f || (f = new bt()), function (t, e, n, o, r, i) {
            var a = 1 & n,
              s = Lt(t),
              u = s.length,
              c = Lt(e).length;
            if (u != c && !a) return !1;
            var l = u;
            for (; l--;) {
              var d = s[l];
              if (!(a ? d in e : z.call(e, d))) return !1;
            }
            var p = i.get(t);
            if (p && i.get(e)) return p == e;
            var f = !0;
            i.set(t, e), i.set(e, t);
            var h = a;
            for (; ++l < u;) {
              var g = t[d = s[l]],
                y = e[d];
              if (o) var v = a ? o(y, g, d, e, t, i) : o(g, y, d, t, e, i);
              if (!(void 0 === v ? g === y || r(g, y, n, o, i) : v)) {
                f = !1;
                break;
              }
              h || (h = "constructor" == d);
            }
            if (f && !h) {
              var m = t.constructor,
                _ = e.constructor;
              m == _ || !("constructor" in t) || !("constructor" in e) || "function" == typeof m && m instanceof m && "function" == typeof _ && _ instanceof _ || (f = !1);
            }
            return i.delete(t), i.delete(e), f;
          }(t, e, n, o, c, f);
        }(t, e, n, o, St, c));
      }
      function It(t) {
        return !(!Gt(t) || function (t) {
          return !!Y && Y in t;
        }(t)) && (Vt(t) ? q : E).test(Rt(t));
      }
      function xt(t) {
        if (n = (e = t) && e.constructor, o = "function" == typeof n && n.prototype || B, e !== o) return nt(t);
        var e,
          n,
          o,
          r = [];
        for (var i in Object(t)) z.call(t, i) && "constructor" != i && r.push(i);
        return r;
      }
      function Mt(t, e, n, o, r, i) {
        var a = 1 & n,
          s = t.length,
          u = e.length;
        if (s != u && !(a && u > s)) return !1;
        var c = i.get(t);
        if (c && i.get(e)) return c == e;
        var l = -1,
          d = !0,
          p = 2 & n ? new _t() : void 0;
        for (i.set(t, e), i.set(e, t); ++l < s;) {
          var f = t[l],
            h = e[l];
          if (o) var g = a ? o(h, f, l, e, t, i) : o(f, h, l, t, e, i);
          if (void 0 !== g) {
            if (g) continue;
            d = !1;
            break;
          }
          if (p) {
            if (!F(e, function (t, e) {
              if (a = e, !p.has(a) && (f === t || r(f, t, n, o, i))) return p.push(e);
              var a;
            })) {
              d = !1;
              break;
            }
          } else if (f !== h && !r(f, h, n, o, i)) {
            d = !1;
            break;
          }
        }
        return i.delete(t), i.delete(e), d;
      }
      function Lt(t) {
        return function (t, e, n) {
          var o = e(t);
          return Ut(t) ? o : function (t, e) {
            for (var n = -1, o = e.length, r = t.length; ++n < o;) t[r + n] = e[n];
            return t;
          }(o, n(t));
        }(t, Yt, Pt);
      }
      function Nt(t, e) {
        var n,
          o,
          r = t.__data__;
        return ("string" == (o = typeof (n = e)) || "number" == o || "symbol" == o || "boolean" == o ? "__proto__" !== n : null === n) ? r["string" == typeof e ? "string" : "hash"] : r.map;
      }
      function At(t, e) {
        var n = function (t, e) {
          return null == t ? void 0 : t[e];
        }(t, e);
        return It(n) ? n : void 0;
      }
      yt.prototype.clear = function () {
        this.__data__ = ut ? ut(null) : {}, this.size = 0;
      }, yt.prototype.delete = function (t) {
        var e = this.has(t) && delete this.__data__[t];
        return this.size -= e ? 1 : 0, e;
      }, yt.prototype.get = function (t) {
        var e = this.__data__;
        if (ut) {
          var o = e[t];
          return o === n ? void 0 : o;
        }
        return z.call(e, t) ? e[t] : void 0;
      }, yt.prototype.has = function (t) {
        var e = this.__data__;
        return ut ? void 0 !== e[t] : z.call(e, t);
      }, yt.prototype.set = function (t, e) {
        var o = this.__data__;
        return this.size += this.has(t) ? 0 : 1, o[t] = ut && void 0 === e ? n : e, this;
      }, vt.prototype.clear = function () {
        this.__data__ = [], this.size = 0;
      }, vt.prototype.delete = function (t) {
        var e = this.__data__,
          n = Tt(e, t);
        return !(n < 0) && (n == e.length - 1 ? e.pop() : K.call(e, n, 1), --this.size, !0);
      }, vt.prototype.get = function (t) {
        var e = this.__data__,
          n = Tt(e, t);
        return n < 0 ? void 0 : e[n][1];
      }, vt.prototype.has = function (t) {
        return Tt(this.__data__, t) > -1;
      }, vt.prototype.set = function (t, e) {
        var n = this.__data__,
          o = Tt(n, t);
        return o < 0 ? (++this.size, n.push([t, e])) : n[o][1] = e, this;
      }, mt.prototype.clear = function () {
        this.size = 0, this.__data__ = {
          hash: new yt(),
          map: new (rt || vt)(),
          string: new yt()
        };
      }, mt.prototype.delete = function (t) {
        var e = Nt(this, t).delete(t);
        return this.size -= e ? 1 : 0, e;
      }, mt.prototype.get = function (t) {
        return Nt(this, t).get(t);
      }, mt.prototype.has = function (t) {
        return Nt(this, t).has(t);
      }, mt.prototype.set = function (t, e) {
        var n = Nt(this, t),
          o = n.size;
        return n.set(t, e), this.size += n.size == o ? 0 : 1, this;
      }, _t.prototype.add = _t.prototype.push = function (t) {
        return this.__data__.set(t, n), this;
      }, _t.prototype.has = function (t) {
        return this.__data__.has(t);
      }, bt.prototype.clear = function () {
        this.__data__ = new vt(), this.size = 0;
      }, bt.prototype.delete = function (t) {
        var e = this.__data__,
          n = e.delete(t);
        return this.size = e.size, n;
      }, bt.prototype.get = function (t) {
        return this.__data__.get(t);
      }, bt.prototype.has = function (t) {
        return this.__data__.has(t);
      }, bt.prototype.set = function (t, e) {
        var n = this.__data__;
        if (n instanceof vt) {
          var o = n.__data__;
          if (!rt || o.length < 199) return o.push([t, e]), this.size = ++n.size, this;
          n = this.__data__ = new mt(o);
        }
        return n.set(t, e), this.size = n.size, this;
      };
      var Pt = tt ? function (t) {
          return null == t ? [] : (t = Object(t), function (t, e) {
            for (var n = -1, o = null == t ? 0 : t.length, r = 0, i = []; ++n < o;) {
              var a = t[n];
              e(a, n, t) && (i[r++] = a);
            }
            return i;
          }(tt(t), function (e) {
            return Z.call(t, e);
          }));
        } : function () {
          return [];
        },
        Ft = Ct;
      function wt(t, e) {
        return !!(e = null == e ? o : e) && ("number" == typeof t || T.test(t)) && t > -1 && t % 1 == 0 && t < e;
      }
      function Rt(t) {
        if (null != t) {
          try {
            return J.call(t);
          } catch (t) {}
          try {
            return t + "";
          } catch (t) {}
        }
        return "";
      }
      function Dt(t, e) {
        return t === e || t != t && e != e;
      }
      (ot && Ft(new ot(new ArrayBuffer(1))) != b || rt && Ft(new rt()) != l || it && Ft(it.resolve()) != f || at && Ft(new at()) != g || st && Ft(new st()) != m) && (Ft = function (t) {
        var e = Ct(t),
          n = e == p ? t.constructor : void 0,
          o = n ? Rt(n) : "";
        if (o) switch (o) {
          case ct:
            return b;
          case lt:
            return l;
          case dt:
            return f;
          case pt:
            return g;
          case ft:
            return m;
        }
        return e;
      });
      var kt = Ot(function () {
          return arguments;
        }()) ? Ot : function (t) {
          return Jt(t) && z.call(t, "callee") && !Z.call(t, "callee");
        },
        Ut = Array.isArray;
      var jt = et || function () {
        return !1;
      };
      function Vt(t) {
        if (!Gt(t)) return !1;
        var e = Ct(t);
        return e == c || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e;
      }
      function Bt(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && t <= o;
      }
      function Gt(t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
      }
      function Jt(t) {
        return null != t && "object" == typeof t;
      }
      var zt = P ? function (t) {
        return function (e) {
          return t(e);
        };
      }(P) : function (t) {
        return Jt(t) && Bt(t.length) && !!C[Ct(t)];
      };
      function Yt(t) {
        return null != (e = t) && Bt(e.length) && !Vt(e) ? Et(t) : xt(t);
        var e;
      }
      t.exports = function (t, e) {
        return St(t, e);
      };
    }({
      get exports() {
        return se;
      },
      set exports(t) {
        se = t;
      }
    }, se);
    var ue = se;
    function ce(t, e) {
      return t.length === e.length && JSON.stringify(t.map(function (t) {
        return t;
      }).sort()) === JSON.stringify(e.map(function (t) {
        return t;
      }).sort());
    }
    var le = {
      Polygon: U,
      LineString: k,
      Point: D,
      MultiPolygon: B,
      MultiLineString: B,
      MultiPoint: B
    };
    var de = Object.freeze({
        __proto__: null,
        CommonSelectors: dt,
        constrainFeatureMovement: $t,
        createMidPoint: yt,
        createSupplementaryPoints: vt,
        createVertex: gt,
        doubleClickZoom: mt,
        euclideanDistance: N,
        featuresAt: x,
        getFeatureAtAndSetCursors: L,
        isClick: A,
        isEventAtCoordinates: Qt,
        isTap: P,
        mapEventToBoundingBox: O,
        ModeHandler: t,
        moveFeatures: qt,
        sortFeatures: C,
        stringSetsAreEqual: ce,
        StringSet: S,
        theme: tt,
        toDenseArray: $
      }),
      pe = function (t, e) {
        var n = {
          options: t = function (t) {
            void 0 === t && (t = {});
            var e = W(t);
            return t.controls || (e.controls = {}), !1 === t.displayControlsDefault ? e.controls = W(ie, t.controls) : e.controls = W(re, t.controls), (e = W(oe, e)).styles = ae(e.styles, "cold").concat(ae(e.styles, "hot")), e;
          }(t)
        };
        e = function (t, e) {
          return e.modes = f, e.getFeatureIdsAt = function (e) {
            return x.click({
              point: e
            }, null, t).map(function (t) {
              return t.properties.id;
            });
          }, e.getSelectedIds = function () {
            return t.store.getSelectedIds();
          }, e.getSelected = function () {
            return {
              type: p.FEATURE_COLLECTION,
              features: t.store.getSelectedIds().map(function (e) {
                return t.store.get(e);
              }).map(function (t) {
                return t.toGeoJSON();
              })
            };
          }, e.getSelectedPoints = function () {
            return {
              type: p.FEATURE_COLLECTION,
              features: t.store.getSelectedCoordinates().map(function (t) {
                return {
                  type: p.FEATURE,
                  properties: {},
                  geometry: {
                    type: p.POINT,
                    coordinates: t.coordinates
                  }
                };
              })
            };
          }, e.set = function (n) {
            if (void 0 === n.type || n.type !== p.FEATURE_COLLECTION || !Array.isArray(n.features)) throw new Error("Invalid FeatureCollection");
            var o = t.store.createRenderBatch(),
              r = t.store.getAllIds().slice(),
              i = e.add(n),
              a = new S(i);
            return (r = r.filter(function (t) {
              return !a.has(t);
            })).length && e.delete(r), o(), i;
          }, e.add = function (e) {
            var n = JSON.parse(JSON.stringify(Et(e))).features.map(function (e) {
              if (e.id = e.id || F(), null === e.geometry) throw new Error("Invalid geometry: null");
              if (void 0 === t.store.get(e.id) || t.store.get(e.id).type !== e.geometry.type) {
                var n = le[e.geometry.type];
                if (void 0 === n) throw new Error("Invalid geometry type: " + e.geometry.type + ".");
                var o = new n(t, e);
                t.store.add(o);
              } else {
                var r = t.store.get(e.id);
                r.properties = e.properties, ue(r.getCoordinates(), e.geometry.coordinates) || r.incomingCoords(e.geometry.coordinates);
              }
              return e.id;
            });
            return t.store.render(), n;
          }, e.get = function (e) {
            var n = t.store.get(e);
            if (n) return n.toGeoJSON();
          }, e.getAll = function () {
            return {
              type: p.FEATURE_COLLECTION,
              features: t.store.getAll().map(function (t) {
                return t.toGeoJSON();
              })
            };
          }, e.delete = function (n) {
            return t.store.delete(n, {
              silent: !0
            }), e.getMode() !== f.DIRECT_SELECT || t.store.getSelectedIds().length ? t.store.render() : t.events.changeMode(f.SIMPLE_SELECT, void 0, {
              silent: !0
            }), e;
          }, e.deleteAll = function () {
            return t.store.delete(t.store.getAllIds(), {
              silent: !0
            }), e.getMode() === f.DIRECT_SELECT ? t.events.changeMode(f.SIMPLE_SELECT, void 0, {
              silent: !0
            }) : t.store.render(), e;
          }, e.changeMode = function (n, o) {
            return void 0 === o && (o = {}), n === f.SIMPLE_SELECT && e.getMode() === f.SIMPLE_SELECT ? (ce(o.featureIds || [], t.store.getSelectedIds()) || (t.store.setSelected(o.featureIds, {
              silent: !0
            }), t.store.render()), e) : (n === f.DIRECT_SELECT && e.getMode() === f.DIRECT_SELECT && o.featureId === t.store.getSelectedIds()[0] || t.events.changeMode(n, o, {
              silent: !0
            }), e);
          }, e.getMode = function () {
            return t.events.getMode();
          }, e.trash = function () {
            return t.events.trash({
              silent: !0
            }), e;
          }, e.combineFeatures = function () {
            return t.events.combineFeatures({
              silent: !0
            }), e;
          }, e.uncombineFeatures = function () {
            return t.events.uncombineFeatures({
              silent: !0
            }), e;
          }, e.setFeatureProperty = function (n, o, r) {
            return t.store.setFeatureProperty(n, o, r), e;
          }, e;
        }(n, e), n.api = e;
        var o = Q(n);
        return e.onAdd = o.onAdd, e.onRemove = o.onRemove, e.types = d, e.options = t, e;
      };
    function fe(t) {
      pe(t, this);
    }
    return fe.modes = ne, fe.constants = b, fe.lib = de, fe;
  });
});
var MapboxDraw = unwrapExports(mapboxGlDraw);

/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
var factors = {
  centimeters: earthRadius * 100,
  centimetres: earthRadius * 100,
  degrees: earthRadius / 111325,
  feet: earthRadius * 3.28084,
  inches: earthRadius * 39.37,
  kilometers: earthRadius / 1000,
  kilometres: earthRadius / 1000,
  meters: earthRadius,
  metres: earthRadius,
  miles: earthRadius / 1609.344,
  millimeters: earthRadius * 1000,
  millimetres: earthRadius * 1000,
  nauticalmiles: earthRadius / 1852,
  radians: 1,
  yards: earthRadius * 1.0936
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var areaFactors = {
  acres: 0.000247105,
  centimeters: 10000,
  centimetres: 10000,
  feet: 10.763910417,
  hectares: 0.0001,
  inches: 1550.003100006,
  kilometers: 0.000001,
  kilometres: 0.000001,
  meters: 1,
  metres: 1,
  miles: 3.86e-7,
  millimeters: 1000000,
  millimetres: 1000000,
  yards: 1.195990046
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var feat = {
    type: "Feature"
  };
  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }
  if (options.bbox) {
    feat.bbox = options.bbox;
  }
  feat.properties = properties || {};
  feat.geometry = geom;
  return feat;
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  var geom = {
    type: "Point",
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be an array of two or more positions");
  }
  var geom = {
    type: "LineString",
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
  if (options === void 0) {
    options = {};
  }
  var fc = {
    type: "FeatureCollection"
  };
  if (options.id) {
    fc.id = options.id;
  }
  if (options.bbox) {
    fc.bbox = options.bbox;
  }
  fc.features = features;
  return fc;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return radians * factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance / factor;
}
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = "kilometers";
  }
  if (finalUnit === void 0) {
    finalUnit = "kilometers";
  }
  if (!(length >= 0)) {
    throw new Error("length must be a positive number");
  }
  return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = "meters";
  }
  if (finalUnit === void 0) {
    finalUnit = "kilometers";
  }
  if (!(area >= 0)) {
    throw new Error("area must be a positive number");
  }
  var startFactor = areaFactors[originalUnit];
  if (!startFactor) {
    throw new Error("invalid original units");
  }
  var finalFactor = areaFactors[finalUnit];
  if (!finalFactor) {
    throw new Error("invalid final units");
  }
  return area / startFactor * finalFactor;
}
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (!Array.isArray(coord)) {
    if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
      return coord.geometry.coordinates;
    }
    if (coord.type === "Point") {
      return coord.coordinates;
    }
  }
  if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
  if (Array.isArray(coords)) {
    return coords;
  }
  // Feature
  if (coords.type === "Feature") {
    if (coords.geometry !== null) {
      return coords.geometry.coordinates;
    }
  } else {
    // Geometry
    if (coords.coordinates) {
      return coords.coordinates;
    }
  }
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}

//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
/**
 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @name distance
 * @param {Coord | Point} from origin point or coordinate
 * @param {Coord | Point} to destination point or coordinate
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.distance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function distance(from, to, options) {
  if (options === void 0) {
    options = {};
  }
  var coordinates1 = getCoord(from);
  var coordinates2 = getCoord(to);
  var dLat = degreesToRadians(coordinates2[1] - coordinates1[1]);
  var dLon = degreesToRadians(coordinates2[0] - coordinates1[0]);
  var lat1 = degreesToRadians(coordinates1[1]);
  var lat2 = degreesToRadians(coordinates2[1]);
  var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
}

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;
      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++) if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
    featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
    featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : undefined;
    featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : undefined;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon":
          {
            if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
            break;
          }
        case "GeometryCollection":
          {
            for (j = 0; j < geometry.geometries.length; j++) {
              if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
            }
            break;
          }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
    if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
  });
  return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
    // Callback for single geometry
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (callback(feature(geometry, properties, {
          bbox: bbox,
          id: id
        }), featureIndex, 0) === false) return false;
        return;
    }
    var geomType;

    // Callback for multi-geometry
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }
    for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate
      };
      if (callback(feature(geom, properties), featureIndex, multiFeatureIndex) === false) return false;
    }
  });
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

    // Generate 2-vertex line segments
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (coordEach(feature, function (currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
      // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
      if (previousCoords === undefined || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
        previousCoords = currentCoord;
        previousFeatureIndex = featureIndex;
        previousMultiIndex = multiPartIndexCoord;
        prevGeomIndex = geometryIndex;
        segmentIndex = 0;
        return;
      }
      var currentSegment = lineString([previousCoords, currentCoord], feature.properties);
      if (callback(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) === false) return false;
      segmentIndex++;
      previousCoords = currentCoord;
    }) === false) return false;
  });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentIndex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(geojson, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
    if (started === false && initialValue === undefined) previousValue = currentSegment;else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
    started = true;
  });
  return previousValue;
}

/**
 * Takes a {@link GeoJSON} and measures its length in the specified units, {@link (Multi)Point}'s distance are ignored.
 *
 * @name length
 * @param {Feature<LineString|MultiLineString>} geojson GeoJSON to measure
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units=kilometers] can be degrees, radians, miles, or kilometers
 * @returns {number} length of GeoJSON
 * @example
 * var line = turf.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);
 * var length = turf.length(line, {units: 'miles'});
 *
 * //addToMap
 * var addToMap = [line];
 * line.properties.distance = length;
 */
function length(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  // Calculate distance from 2-vertex line segments
  return segmentReduce(geojson, function (previousValue, segment) {
    var coords = segment.geometry.coordinates;
    return previousValue + distance(coords[0], coords[1], options);
  }, 0);
}

// Note: change RADIUS => earthRadius
var RADIUS = 6378137;
/**
 * Takes one or more features and returns their area in square meters.
 *
 * @name area
 * @param {GeoJSON} geojson input GeoJSON feature(s)
 * @returns {number} area in square meters
 * @example
 * var polygon = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
 *
 * var area = turf.area(polygon);
 *
 * //addToMap
 * var addToMap = [polygon]
 * polygon.properties.area = area
 */
function area(geojson) {
  return geomReduce(geojson, function (value, geom) {
    return value + calculateArea(geom);
  }, 0);
}
/**
 * Calculate Area
 *
 * @private
 * @param {Geometry} geom GeoJSON Geometries
 * @returns {number} area
 */
function calculateArea(geom) {
  var total = 0;
  var i;
  switch (geom.type) {
    case "Polygon":
      return polygonArea(geom.coordinates);
    case "MultiPolygon":
      for (i = 0; i < geom.coordinates.length; i++) {
        total += polygonArea(geom.coordinates[i]);
      }
      return total;
    case "Point":
    case "MultiPoint":
    case "LineString":
    case "MultiLineString":
      return 0;
  }
  return 0;
}
function polygonArea(coords) {
  var total = 0;
  if (coords && coords.length > 0) {
    total += Math.abs(ringArea(coords[0]));
    for (var i = 1; i < coords.length; i++) {
      total -= Math.abs(ringArea(coords[i]));
    }
  }
  return total;
}
/**
 * @private
 * Calculate the approximate area of the polygon were it projected onto the earth.
 * Note that this area will be positive if ring is oriented clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for Polygons on a Sphere",
 * JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007 https://trs.jpl.nasa.gov/handle/2014/40409
 *
 * @param {Array<Array<number>>} coords Ring Coordinates
 * @returns {number} The approximate signed geodesic area of the polygon in square meters.
 */
function ringArea(coords) {
  var p1;
  var p2;
  var p3;
  var lowerIndex;
  var middleIndex;
  var upperIndex;
  var i;
  var total = 0;
  var coordsLength = coords.length;
  if (coordsLength > 2) {
    for (i = 0; i < coordsLength; i++) {
      if (i === coordsLength - 2) {
        // i = N-2
        lowerIndex = coordsLength - 2;
        middleIndex = coordsLength - 1;
        upperIndex = 0;
      } else if (i === coordsLength - 1) {
        // i = N-1
        lowerIndex = coordsLength - 1;
        middleIndex = 0;
        upperIndex = 1;
      } else {
        // i = 0 to N-3
        lowerIndex = i;
        middleIndex = i + 1;
        upperIndex = i + 2;
      }
      p1 = coords[lowerIndex];
      p2 = coords[middleIndex];
      p3 = coords[upperIndex];
      total += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
    }
    total = total * RADIUS * RADIUS / 2;
  }
  return total;
}
function rad(num) {
  return num * Math.PI / 180;
}

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @name centroid
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] an Object that is used as the {@link Feature}'s properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = turf.centroid(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, centroid]
 */
function centroid(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  var xSum = 0;
  var ySum = 0;
  var len = 0;
  coordEach(geojson, function (coord) {
    xSum += coord[0];
    ySum += coord[1];
    len++;
  }, true);
  return point([xSum / len, ySum / len], options.properties);
}

/**
 * Creates a {@link FeatureCollection} of 2-vertex {@link LineString} segments from a
 * {@link LineString|(Multi)LineString} or {@link Polygon|(Multi)Polygon}.
 *
 * @name lineSegment
 * @param {GeoJSON} geojson GeoJSON Polygon or LineString
 * @returns {FeatureCollection<LineString>} 2-vertex line segments
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 * var segments = turf.lineSegment(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, segments]
 */
function lineSegment(geojson) {
  if (!geojson) {
    throw new Error("geojson is required");
  }
  var results = [];
  flattenEach(geojson, function (feature) {
    lineSegmentFeature(feature, results);
  });
  return featureCollection(results);
}
/**
 * Line Segment
 *
 * @private
 * @param {Feature<LineString|Polygon>} geojson Line or polygon feature
 * @param {Array} results push to results
 * @returns {void}
 */
function lineSegmentFeature(geojson, results) {
  var coords = [];
  var geometry = geojson.geometry;
  if (geometry !== null) {
    switch (geometry.type) {
      case "Polygon":
        coords = getCoords(geometry);
        break;
      case "LineString":
        coords = [getCoords(geometry)];
    }
    coords.forEach(function (coord) {
      var segments = createSegments(coord, geojson.properties);
      segments.forEach(function (segment) {
        segment.id = results.length;
        results.push(segment);
      });
    });
  }
}
/**
 * Create Segments from LineString coordinates
 *
 * @private
 * @param {Array<Array<number>>} coords LineString coordinates
 * @param {*} properties GeoJSON properties
 * @returns {Array<Feature<LineString>>} line segments
 */
function createSegments(coords, properties) {
  var segments = [];
  coords.reduce(function (previousCoords, currentCoords) {
    var segment = lineString([previousCoords, currentCoords], properties);
    segment.bbox = bbox(previousCoords, currentCoords);
    segments.push(segment);
    return currentCoords;
  });
  return segments;
}
/**
 * Create BBox between two coordinates (faster than @turf/bbox)
 *
 * @private
 * @param {Array<number>} coords1 Point coordinate
 * @param {Array<number>} coords2 Point coordinate
 * @returns {BBox} [west, south, east, north]
 */
function bbox(coords1, coords2) {
  var x1 = coords1[0];
  var y1 = coords1[1];
  var x2 = coords2[0];
  var y2 = coords2[1];
  var west = x1 < x2 ? x1 : x2;
  var south = y1 < y2 ? y1 : y2;
  var east = x1 > x2 ? x1 : x2;
  var north = y1 > y2 ? y1 : y2;
  return [west, south, east, north];
}

var MEASURE_LABELS_SOURCE_ID = 'source-measure-labels';
var MEASURE_LABELS_LAYER_ID = 'layer-measure-labels';
var MEASURE_POINTS_LAYER_ID = 'layer-measure-points';
var MEASURE_POINTS_HALO_LAYER_ID = 'layer-measure-points-halo';
var SOURCE_DATA = {
  type: "FeatureCollection",
  features: []
};
var MeasuresControl = /*#__PURE__*/function () {
  function MeasuresControl(options) {
    var _this$options$style$l, _this$options, _this$options$style, _this$options$style$l2, _this$options$style$l3, _this$options2, _this$options2$style, _this$options2$style$, _this$options$style$a, _this$options3, _this$options3$style, _this$options3$style$, _this$options$style$a2, _this$options4, _this$options4$style, _this$options4$style$, _this$options$style$a3, _this$options5, _this$options5$style, _this$options5$style$, _this$options$style$p, _this$options6, _this$options6$style, _this$options6$style$, _this$options$style$p2, _this$options7, _this$options7$style, _this$options7$style$, _this$options$style$a4, _this$options8, _this$options8$style, _this$options8$style$, _this$options$style$a5, _this$options9, _this$options9$style, _this$options9$style$, _this$options$style$p3, _this$options10, _this$options10$style, _this$options10$style2, _this$options$style$p4, _this$options11, _this$options11$style, _this$options11$style2, _this$options$style$p5, _this$options12, _this$options12$style, _this$options12$style2, _this$options$style$p6, _this$options13, _this$options13$style, _this$options13$style2, _this$options$style$l4, _this$options14, _this$options14$style, _this$options14$style2, _this$options$style$l5, _this$options15, _this$options15$style, _this$options15$style2, _this$options$style$a6, _this$options16, _this$options16$style, _this$options16$style2, _this$options$style$a7, _this$options17, _this$options17$style, _this$options17$style2, _this$options$style$a8, _this$options18, _this$options18$style, _this$options18$style2, _this$options$style$a9, _this$options19, _this$options19$style, _this$options19$style2, _this$options$style$a10, _this$options20, _this$options20$style, _this$options20$style2;
    _classCallCheck(this, MeasuresControl);
    this.options = options;
    this._drawCtrl = new MapboxDraw({
      displayControlsDefault: false,
      styles: [
      // ACTIVE (being drawn)
      // line stroke
      {
        "id": "gl-draw-line",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": (_this$options$style$l = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : (_this$options$style = _this$options.style) === null || _this$options$style === void 0 ? void 0 : (_this$options$style$l2 = _this$options$style.lengthStyle) === null || _this$options$style$l2 === void 0 ? void 0 : _this$options$style$l2.lineColor) !== null && _this$options$style$l !== void 0 ? _this$options$style$l : "#D20C0C",
          "line-dasharray": [0.2, 2],
          "line-width": (_this$options$style$l3 = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : (_this$options2$style = _this$options2.style) === null || _this$options2$style === void 0 ? void 0 : (_this$options2$style$ = _this$options2$style.lengthStyle) === null || _this$options2$style$ === void 0 ? void 0 : _this$options2$style$.lineWidth) !== null && _this$options$style$l3 !== void 0 ? _this$options$style$l3 : 2
        }
      },
      // polygon fill
      {
        "id": "gl-draw-polygon-fill",
        "type": "fill",
        "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        "paint": {
          "fill-color": (_this$options$style$a = (_this$options3 = this.options) === null || _this$options3 === void 0 ? void 0 : (_this$options3$style = _this$options3.style) === null || _this$options3$style === void 0 ? void 0 : (_this$options3$style$ = _this$options3$style.areaStyle) === null || _this$options3$style$ === void 0 ? void 0 : _this$options3$style$.fillColor) !== null && _this$options$style$a !== void 0 ? _this$options$style$a : "#D20C0C",
          "fill-outline-color": (_this$options$style$a2 = (_this$options4 = this.options) === null || _this$options4 === void 0 ? void 0 : (_this$options4$style = _this$options4.style) === null || _this$options4$style === void 0 ? void 0 : (_this$options4$style$ = _this$options4$style.areaStyle) === null || _this$options4$style$ === void 0 ? void 0 : _this$options4$style$.fillOutlineColor) !== null && _this$options$style$a2 !== void 0 ? _this$options$style$a2 : "#D20C0C",
          "fill-opacity": (_this$options$style$a3 = (_this$options5 = this.options) === null || _this$options5 === void 0 ? void 0 : (_this$options5$style = _this$options5.style) === null || _this$options5$style === void 0 ? void 0 : (_this$options5$style$ = _this$options5$style.areaStyle) === null || _this$options5$style$ === void 0 ? void 0 : _this$options5$style$.fillOpacity) !== null && _this$options$style$a3 !== void 0 ? _this$options$style$a3 : 0.1
        }
      },
      // polygon mid points
      {
        'id': 'gl-draw-polygon-midpoint',
        'type': 'circle',
        'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
        'paint': {
          'circle-radius': (_this$options$style$p = (_this$options6 = this.options) === null || _this$options6 === void 0 ? void 0 : (_this$options6$style = _this$options6.style) === null || _this$options6$style === void 0 ? void 0 : (_this$options6$style$ = _this$options6$style.pointStyle) === null || _this$options6$style$ === void 0 ? void 0 : _this$options6$style$.midPointRadius) !== null && _this$options$style$p !== void 0 ? _this$options$style$p : 6,
          'circle-color': (_this$options$style$p2 = (_this$options7 = this.options) === null || _this$options7 === void 0 ? void 0 : (_this$options7$style = _this$options7.style) === null || _this$options7$style === void 0 ? void 0 : (_this$options7$style$ = _this$options7$style.pointStyle) === null || _this$options7$style$ === void 0 ? void 0 : _this$options7$style$.midPointColor) !== null && _this$options$style$p2 !== void 0 ? _this$options$style$p2 : "#fbb03b"
        }
      },
      // polygon outline stroke
      // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
      {
        "id": "gl-draw-polygon-stroke-active",
        "type": "line",
        "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": (_this$options$style$a4 = (_this$options8 = this.options) === null || _this$options8 === void 0 ? void 0 : (_this$options8$style = _this$options8.style) === null || _this$options8$style === void 0 ? void 0 : (_this$options8$style$ = _this$options8$style.areaStyle) === null || _this$options8$style$ === void 0 ? void 0 : _this$options8$style$.fillOutlineColor) !== null && _this$options$style$a4 !== void 0 ? _this$options$style$a4 : "#D20C0C",
          "line-dasharray": [0.2, 2],
          "line-width": (_this$options$style$a5 = (_this$options9 = this.options) === null || _this$options9 === void 0 ? void 0 : (_this$options9$style = _this$options9.style) === null || _this$options9$style === void 0 ? void 0 : (_this$options9$style$ = _this$options9$style.areaStyle) === null || _this$options9$style$ === void 0 ? void 0 : _this$options9$style$.lineWidth) !== null && _this$options$style$a5 !== void 0 ? _this$options$style$a5 : 2
        }
      },
      // vertex point halos
      {
        "id": "gl-draw-polygon-and-line-vertex-halo-active",
        "type": "circle",
        "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
        "paint": {
          "circle-radius": (_this$options$style$p3 = (_this$options10 = this.options) === null || _this$options10 === void 0 ? void 0 : (_this$options10$style = _this$options10.style) === null || _this$options10$style === void 0 ? void 0 : (_this$options10$style2 = _this$options10$style.pointStyle) === null || _this$options10$style2 === void 0 ? void 0 : _this$options10$style2.midPointHaloRadius) !== null && _this$options$style$p3 !== void 0 ? _this$options$style$p3 : 8,
          "circle-color": (_this$options$style$p4 = (_this$options11 = this.options) === null || _this$options11 === void 0 ? void 0 : (_this$options11$style = _this$options11.style) === null || _this$options11$style === void 0 ? void 0 : (_this$options11$style2 = _this$options11$style.pointStyle) === null || _this$options11$style2 === void 0 ? void 0 : _this$options11$style2.midPointHaloColor) !== null && _this$options$style$p4 !== void 0 ? _this$options$style$p4 : '#FFF'
        }
      },
      // vertex points
      {
        "id": "gl-draw-polygon-and-line-vertex-active",
        "type": "circle",
        "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
        "paint": {
          "circle-radius": (_this$options$style$p5 = (_this$options12 = this.options) === null || _this$options12 === void 0 ? void 0 : (_this$options12$style = _this$options12.style) === null || _this$options12$style === void 0 ? void 0 : (_this$options12$style2 = _this$options12$style.pointStyle) === null || _this$options12$style2 === void 0 ? void 0 : _this$options12$style2.midPointRadius) !== null && _this$options$style$p5 !== void 0 ? _this$options$style$p5 : 6,
          "circle-color": (_this$options$style$p6 = (_this$options13 = this.options) === null || _this$options13 === void 0 ? void 0 : (_this$options13$style = _this$options13.style) === null || _this$options13$style === void 0 ? void 0 : (_this$options13$style2 = _this$options13$style.pointStyle) === null || _this$options13$style2 === void 0 ? void 0 : _this$options13$style2.midPointColor) !== null && _this$options$style$p6 !== void 0 ? _this$options$style$p6 : "#fbb03b"
        }
      },
      // INACTIVE (static, already drawn)
      // line stroke
      {
        "id": "gl-draw-line-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": (_this$options$style$l4 = (_this$options14 = this.options) === null || _this$options14 === void 0 ? void 0 : (_this$options14$style = _this$options14.style) === null || _this$options14$style === void 0 ? void 0 : (_this$options14$style2 = _this$options14$style.lengthStyle) === null || _this$options14$style2 === void 0 ? void 0 : _this$options14$style2.lineColor) !== null && _this$options$style$l4 !== void 0 ? _this$options$style$l4 : "#D20C0C",
          "line-width": (_this$options$style$l5 = (_this$options15 = this.options) === null || _this$options15 === void 0 ? void 0 : (_this$options15$style = _this$options15.style) === null || _this$options15$style === void 0 ? void 0 : (_this$options15$style2 = _this$options15$style.lengthStyle) === null || _this$options15$style2 === void 0 ? void 0 : _this$options15$style2.lineWidth) !== null && _this$options$style$l5 !== void 0 ? _this$options$style$l5 : 2
        }
      },
      // polygon fill
      {
        "id": "gl-draw-polygon-fill-static",
        "type": "fill",
        "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
        "paint": {
          "fill-color": (_this$options$style$a6 = (_this$options16 = this.options) === null || _this$options16 === void 0 ? void 0 : (_this$options16$style = _this$options16.style) === null || _this$options16$style === void 0 ? void 0 : (_this$options16$style2 = _this$options16$style.areaStyle) === null || _this$options16$style2 === void 0 ? void 0 : _this$options16$style2.fillColor) !== null && _this$options$style$a6 !== void 0 ? _this$options$style$a6 : "#000",
          "fill-outline-color": (_this$options$style$a7 = (_this$options17 = this.options) === null || _this$options17 === void 0 ? void 0 : (_this$options17$style = _this$options17.style) === null || _this$options17$style === void 0 ? void 0 : (_this$options17$style2 = _this$options17$style.areaStyle) === null || _this$options17$style2 === void 0 ? void 0 : _this$options17$style2.fillOutlineColor) !== null && _this$options$style$a7 !== void 0 ? _this$options$style$a7 : "#000",
          "fill-opacity": (_this$options$style$a8 = (_this$options18 = this.options) === null || _this$options18 === void 0 ? void 0 : (_this$options18$style = _this$options18.style) === null || _this$options18$style === void 0 ? void 0 : (_this$options18$style2 = _this$options18$style.areaStyle) === null || _this$options18$style2 === void 0 ? void 0 : _this$options18$style2.fillOpacity) !== null && _this$options$style$a8 !== void 0 ? _this$options$style$a8 : 0.1
        }
      },
      // polygon outline
      {
        "id": "gl-draw-polygon-stroke-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": (_this$options$style$a9 = (_this$options19 = this.options) === null || _this$options19 === void 0 ? void 0 : (_this$options19$style = _this$options19.style) === null || _this$options19$style === void 0 ? void 0 : (_this$options19$style2 = _this$options19$style.areaStyle) === null || _this$options19$style2 === void 0 ? void 0 : _this$options19$style2.fillOutlineColor) !== null && _this$options$style$a9 !== void 0 ? _this$options$style$a9 : "#000",
          "line-width": (_this$options$style$a10 = (_this$options20 = this.options) === null || _this$options20 === void 0 ? void 0 : (_this$options20$style = _this$options20.style) === null || _this$options20$style === void 0 ? void 0 : (_this$options20$style2 = _this$options20$style.areaStyle) === null || _this$options20$style2 === void 0 ? void 0 : _this$options20$style2.lineWidth) !== null && _this$options$style$a10 !== void 0 ? _this$options$style$a10 : 2
        }
      }]
    });
  }
  _createClass(MeasuresControl, [{
    key: "test",
    value: function test() {
      setInterval(function () {
        console.log(123);
      }, 500);
    }
  }, {
    key: "start",
    value: function start(mode) {
      switch (mode) {
        case "distance":
          this._drawCtrl.changeMode("draw_line_string");
          break;
        case "area":
          this._drawCtrl.changeMode("draw_polygon");
          break;
      }
      this._registerEvents();
    }
  }, {
    key: "clear",
    value: function clear() {
      this._drawCtrl.deleteAll();
      this._updateLabels();
    }
  }, {
    key: "stop",
    value: function stop() {
      this._drawCtrl.changeMode("simple_select");
      this._removeEvents();
    }
  }, {
    key: "addTo",
    value: function addTo(map) {
      this._map = map;
      this._map.addControl(this._drawCtrl);
      this._addSymbolLayer();
      this._registerEvents();
      return this;
    }
  }, {
    key: "_formatMeasure",
    value: function _formatMeasure(dist) {
      var isareaStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return isareaStyle ? this._formatAreaToMetricSystem(dist) : this._formatToMetricSystem(dist);
    }

    // area in sqm 
  }, {
    key: "_formatAreaToMetricSystem",
    value: function _formatAreaToMetricSystem(dist) {
      var measure, unit;
      if (dist < 10000) {
        var _this$options21;
        measure = dist;
        unit = ((_this$options21 = this.options) === null || _this$options21 === void 0 ? void 0 : _this$options21.language) == "cn" ? "平方米" : 'm²';
      } else if (dist >= 10000 && dist < 1000000) {
        var _this$options22;
        measure = dist / 10000;
        unit = ((_this$options22 = this.options) === null || _this$options22 === void 0 ? void 0 : _this$options22.language) == "cn" ? "公顷" : 'hm²';
      } else {
        var _this$options23;
        measure = convertArea(dist, "meters", "kilometers");
        unit = ((_this$options23 = this.options) === null || _this$options23 === void 0 ? void 0 : _this$options23.language) == "cn" ? "平方千米" : 'km²';
      }
      return "".concat(measure.toFixed(2), " ").concat(unit);
    }
  }, {
    key: "_formatToMetricSystem",
    value: function _formatToMetricSystem(dist) {
      var measure, unit;
      if (dist > 1000) {
        var _this$options24;
        measure = convertLength(dist, "meters", "kilometers");
        unit = ((_this$options24 = this.options) === null || _this$options24 === void 0 ? void 0 : _this$options24.language) == "cn" ? "公里" : 'km';
      } else {
        var _this$options25;
        measure = dist;
        unit = ((_this$options25 = this.options) === null || _this$options25 === void 0 ? void 0 : _this$options25.language) == "cn" ? "米" : 'm';
      }
      return "".concat(measure.toFixed(2), " ").concat(unit);
    }
  }, {
    key: "_addSymbolLayer",
    value: function _addSymbolLayer() {
      var _this$options$style$t, _this$options26, _this$options26$style, _this$options26$style2, _this$options$style$t2, _this$options27, _this$options27$style, _this$options27$style2, _this$options$style$t3, _this$options28, _this$options28$style, _this$options28$style2, _this$options$style$t4, _this$options29, _this$options29$style, _this$options29$style2, _this$options$style$t5, _this$options30, _this$options30$style, _this$options30$style2, _this$options$style$t6, _this$options31, _this$options31$style, _this$options31$style2, _this$options$style$p7, _this$options32, _this$options32$style, _this$options32$style2, _this$options$style$p8, _this$options33, _this$options33$style, _this$options33$style2, _this$options$style$p9, _this$options34, _this$options34$style, _this$options34$style2, _this$options$style$p10, _this$options35, _this$options35$style, _this$options35$style2;
      this._map.addSource(MEASURE_LABELS_SOURCE_ID, {
        type: 'geojson',
        data: SOURCE_DATA
      });
      this._map.addLayer({
        'id': MEASURE_LABELS_LAYER_ID,
        'type': 'symbol',
        'source': MEASURE_LABELS_SOURCE_ID,
        'layout': {
          // 'text-font': [
          //   'Klokantech Noto Sans Bold'
          // ],
          'text-field': ['get', 'measurement'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right', 'center'],
          'text-radial-offset': (_this$options$style$t = (_this$options26 = this.options) === null || _this$options26 === void 0 ? void 0 : (_this$options26$style = _this$options26.style) === null || _this$options26$style === void 0 ? void 0 : (_this$options26$style2 = _this$options26$style.textStyle) === null || _this$options26$style2 === void 0 ? void 0 : _this$options26$style2.radialOffset) !== null && _this$options$style$t !== void 0 ? _this$options$style$t : 0.5,
          'text-justify': 'auto',
          'text-size': (_this$options$style$t2 = (_this$options27 = this.options) === null || _this$options27 === void 0 ? void 0 : (_this$options27$style = _this$options27.style) === null || _this$options27$style === void 0 ? void 0 : (_this$options27$style2 = _this$options27$style.textStyle) === null || _this$options27$style2 === void 0 ? void 0 : _this$options27$style2.textSize) !== null && _this$options$style$t2 !== void 0 ? _this$options$style$t2 : 14,
          'text-letter-spacing': (_this$options$style$t3 = (_this$options28 = this.options) === null || _this$options28 === void 0 ? void 0 : (_this$options28$style = _this$options28.style) === null || _this$options28$style === void 0 ? void 0 : (_this$options28$style2 = _this$options28$style.textStyle) === null || _this$options28$style2 === void 0 ? void 0 : _this$options28$style2.letterSpacing) !== null && _this$options$style$t3 !== void 0 ? _this$options$style$t3 : 0.05
        },
        'paint': {
          'text-color': (_this$options$style$t4 = (_this$options29 = this.options) === null || _this$options29 === void 0 ? void 0 : (_this$options29$style = _this$options29.style) === null || _this$options29$style === void 0 ? void 0 : (_this$options29$style2 = _this$options29$style.textStyle) === null || _this$options29$style2 === void 0 ? void 0 : _this$options29$style2.textColor) !== null && _this$options$style$t4 !== void 0 ? _this$options$style$t4 : '#D20C0C',
          'text-halo-color': (_this$options$style$t5 = (_this$options30 = this.options) === null || _this$options30 === void 0 ? void 0 : (_this$options30$style = _this$options30.style) === null || _this$options30$style === void 0 ? void 0 : (_this$options30$style2 = _this$options30$style.textStyle) === null || _this$options30$style2 === void 0 ? void 0 : _this$options30$style2.textHaloColor) !== null && _this$options$style$t5 !== void 0 ? _this$options$style$t5 : '#fff',
          'text-halo-width': (_this$options$style$t6 = (_this$options31 = this.options) === null || _this$options31 === void 0 ? void 0 : (_this$options31$style = _this$options31.style) === null || _this$options31$style === void 0 ? void 0 : (_this$options31$style2 = _this$options31$style.textStyle) === null || _this$options31$style2 === void 0 ? void 0 : _this$options31$style2.textHaloWidth) !== null && _this$options$style$t6 !== void 0 ? _this$options$style$t6 : 2
        }
      });
      this._map.addLayer({
        'id': MEASURE_POINTS_HALO_LAYER_ID,
        'type': 'circle',
        'source': MEASURE_LABELS_SOURCE_ID,
        'filter': ['==', ['get', 'visible'], true],
        'layout': {},
        'paint': {
          "circle-radius": (_this$options$style$p7 = (_this$options32 = this.options) === null || _this$options32 === void 0 ? void 0 : (_this$options32$style = _this$options32.style) === null || _this$options32$style === void 0 ? void 0 : (_this$options32$style2 = _this$options32$style.pointStyle) === null || _this$options32$style2 === void 0 ? void 0 : _this$options32$style2.vertexHaloRadius) !== null && _this$options$style$p7 !== void 0 ? _this$options$style$p7 : 4,
          "circle-color": (_this$options$style$p8 = (_this$options33 = this.options) === null || _this$options33 === void 0 ? void 0 : (_this$options33$style = _this$options33.style) === null || _this$options33$style === void 0 ? void 0 : (_this$options33$style2 = _this$options33$style.pointStyle) === null || _this$options33$style2 === void 0 ? void 0 : _this$options33$style2.vertexHaloColor) !== null && _this$options$style$p8 !== void 0 ? _this$options$style$p8 : "#fff"
        }
      });
      this._map.addLayer({
        'id': MEASURE_POINTS_LAYER_ID,
        'type': 'circle',
        'source': MEASURE_LABELS_SOURCE_ID,
        'filter': ['==', ['get', 'visible'], true],
        'layout': {
          // 'text-font': [
          //   'Klokantech Noto Sans Bold'
          // ],
        },
        'paint': {
          "circle-radius": (_this$options$style$p9 = (_this$options34 = this.options) === null || _this$options34 === void 0 ? void 0 : (_this$options34$style = _this$options34.style) === null || _this$options34$style === void 0 ? void 0 : (_this$options34$style2 = _this$options34$style.pointStyle) === null || _this$options34$style2 === void 0 ? void 0 : _this$options34$style2.vertexRadius) !== null && _this$options$style$p9 !== void 0 ? _this$options$style$p9 : 2,
          "circle-color": (_this$options$style$p10 = (_this$options35 = this.options) === null || _this$options35 === void 0 ? void 0 : (_this$options35$style = _this$options35.style) === null || _this$options35$style === void 0 ? void 0 : (_this$options35$style2 = _this$options35$style.pointStyle) === null || _this$options35$style2 === void 0 ? void 0 : _this$options35$style2.vertexColor) !== null && _this$options$style$p10 !== void 0 ? _this$options$style$p10 : "#D20C0C"
        }
      });
    }
  }, {
    key: "_registerEvents",
    value: function _registerEvents() {
      if (!this._measureListener) {
        this._measureListener = this._updateLabels.bind(this);
        this._map.on('draw.create', this._measureListener);
        this._map.on('draw.update', this._measureListener);
        this._map.on('draw.delete', this._measureListener);
        this._map.on('draw.render', this._measureListener);
      }
    }
  }, {
    key: "_removeEvents",
    value: function _removeEvents() {
      if (this._measureListener) {
        this._map.off('draw.create', this._measureListener);
        this._map.off('draw.update', this._measureListener);
        this._map.on('draw.delete', this._measureListener);
        this._map.off('draw.render', this._measureListener);
        this._measureListener = null;
      }
    }
  }, {
    key: "_updateLabels",
    value: function _updateLabels() {
      var _this = this;
      var source = this._map.getSource(MEASURE_LABELS_SOURCE_ID);
      // Build up the centroids for each segment into a features list, containing a property 
      // to hold up the measurements
      var features = [];
      // Generate features from what we have on the drawControl:
      var drawnFeatures = this._drawCtrl.getAll();
      drawnFeatures.features.forEach(function (feature) {
        try {
          if (feature.geometry.type == 'Polygon') {
            var myarea = _this._formatMeasure(area(feature), true);
            var mycentroid = centroid(feature);
            var measurement = "".concat(myarea);
            mycentroid.properties = {
              measurement: measurement
            };
            features.push(mycentroid);
          } else if (feature.geometry.type == 'LineString') {
            var segments = lineSegment(feature);
            var lineLength = 0;
            segments.features.forEach(function (segment, index) {
              if (index == 0) {
                var _this$options36;
                var _mycentroid = {
                  geometry: {
                    type: "Point",
                    coordinates: segment.geometry.coordinates[0]
                  },
                  properties: {
                    measurement: ((_this$options36 = _this.options) === null || _this$options36 === void 0 ? void 0 : _this$options36.language) == "cn" ? "起点" : "start",
                    visible: true
                  }
                };
                features.push(_mycentroid);
              }
              lineLength += length(segment);
              var measurement = _this._formatMeasure(lineLength * 1000); //km to m
              var mycentroid = {
                geometry: {
                  type: "Point",
                  coordinates: segment.geometry.coordinates[1]
                },
                properties: {
                  measurement: measurement,
                  visible: true
                }
              };
              features.push(mycentroid);
            });
          }
        } catch (e) {
          //Silently ignored
        }
      });
      var data = {
        type: "FeatureCollection",
        features: features
      };
      source.setData(data);
    }
  }]);
  return MeasuresControl;
}();

export { MeasuresControl as default };
//# sourceMappingURL=mapbox-gl-measure.js.map
