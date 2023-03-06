import MapboxDraw from "@mapbox/mapbox-gl-draw";
import length from '@turf/length';
import area  from '@turf/area';
import centroid from '@turf/centroid';
import * as helpers from '@turf/helpers';
import lineSegment from "@turf/line-segment";

const MEASURE_LABELS_SOURCE_ID = 'source-measure-labels';
const MEASURE_LABELS_LAYER_ID = 'layer-measure-labels';
const MEASURE_POINTS_LAYER_ID = 'layer-measure-points';
const MEASURE_POINTS_HALO_LAYER_ID = 'layer-measure-points-halo';

const SOURCE_DATA = {
  type: "FeatureCollection",
  features: []
};
export default class MeasuresControl {

  constructor(options) {
    this.options = options;
    this._drawCtrl = new MapboxDraw({
      displayControlsDefault: false,
      styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
          "id": "gl-draw-line",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": this.options?.style?.lengthMeasurement?.lineColor ?? "#D20C0C",
            "line-dasharray": [0.2, 2],
            "line-width": this.options?.style?.lengthMeasurement?.lineWidth ?? 2
          }
        },
        // polygon fill
        {
          "id": "gl-draw-polygon-fill",
          "type": "fill",
          "filter": ["all", ["==", "$type", "Polygon"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "fill-color": this.options?.style?.areaMeasurement?.fillColor ?? "#D20C0C",
            "fill-outline-color": this.options?.style?.areaMeasurement?.fillOutlineColor ?? "#D20C0C",
            "fill-opacity": this.options?.style?.areaMeasurement?.fillOpacity ?? 0.1,
          }
        },
        // polygon mid points
        {
          'id': 'gl-draw-polygon-midpoint',
          'type': 'circle',
          'filter': ['all',
            ['==', '$type', 'Point'],
            ['==', 'meta', 'midpoint']
          ],
          'paint': {
            'circle-radius': this.options?.style?.common?.midPointRadius ?? 6,
            'circle-color': this.options?.style?.common?.midPointColor ?? "#fbb03b",
          }
        },
        // polygon outline stroke
        // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
        {
          "id": "gl-draw-polygon-stroke-active",
          "type": "line",
          "filter": ["all", ["==", "$type", "Polygon"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": this.options?.style?.areaMeasurement?.fillOutlineColor ?? "#D20C0C",
            "line-dasharray": [0.2, 2],
            "line-width": this.options?.style?.areaMeasurement?.lineWidth ?? 2
          }
        },
        // vertex point halos
        {
          "id": "gl-draw-polygon-and-line-vertex-halo-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": this.options?.style?.common?.midPointHaloRadius ?? 8,
            "circle-color": this.options?.style?.common?.midPointHaloColor ?? '#FFF',
          }
        },
        // vertex points
        {
          "id": "gl-draw-polygon-and-line-vertex-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": this.options?.style?.common?.midPointRadius ?? 6,
            "circle-color": this.options?.style?.common?.midPointColor ?? "#fbb03b",
          }
        },

        // INACTIVE (static, already drawn)
        // line stroke
        {
          "id": "gl-draw-line-static",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"],
            ["==", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": this.options?.style?.lengthMeasurement?.lineColor ?? "#D20C0C",
            "line-width": this.options?.style?.lengthMeasurement?.lineWidth ?? 3
          }
        },
        // polygon fill
        {
          "id": "gl-draw-polygon-fill-static",
          "type": "fill",
          "filter": ["all", ["==", "$type", "Polygon"],
            ["==", "mode", "static"]
          ],
          "paint": {
            "fill-color": this.options?.style?.areaMeasurement?.fillColor ?? "#000",
            "fill-outline-color": this.options?.style?.areaMeasurement?.fillOutlineColor ?? "#000",
            "fill-opacity": this.options?.style?.areaMeasurement?.fillOpacity ?? 0.1,
          }
        },
        // polygon outline
        {
          "id": "gl-draw-polygon-stroke-static",
          "type": "line",
          "filter": ["all", ["==", "$type", "Polygon"],
            ["==", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": this.options?.style?.areaMeasurement?.fillOutlineColor ?? "#000",
            "line-width": this.options?.style?.areaMeasurement?.lineWidth ?? 2
          }
        }
      ]
    });
  }
  test(){
    setInterval(()=>{
      console.log(123);
    },500)
  }
  start(mode){
    switch(mode){
      case "distance":
        this._drawCtrl.changeMode("draw_line_string")

        break;
      case "area":
        this._drawCtrl.changeMode("draw_polygon")
        break;
    }
    this._registerEvents();
  }
  clear(){
    this._drawCtrl.deleteAll();
    this._updateLabels();
  }
  stop(){
    this._drawCtrl.changeMode("simple_select");
    this._removeEvents();
  }
  addTo(map) {
    this._map = map;
    this._map.addControl(this._drawCtrl);
    this._addSymbolLayer();
    this._registerEvents();
    return this;
  }

  _formatMeasure(dist, isAreaMeasurement = false) {
    return isAreaMeasurement ? this._formatAreaToMetricSystem(dist) : this._formatToMetricSystem(dist);
  }

  // area in sqm 
  _formatAreaToMetricSystem (dist) {
    let measure,unit;
    if(dist <10000){
      measure = dist;
      unit = this.options?.language=="cn"?"平方米":'m²'
    }else if(dist >=10000 && dist <1000000){
      measure = dist/10000;
      unit = this.options?.language=="cn"?"公顷":'hm²'
    }
    else{
      measure = helpers.convertArea(dist,"meters","kilometers")
      unit = this.options?.language=="cn"?"平方千米":'km²'
    } 
    return `${measure.toFixed(2)} ${unit}`
  }


  _formatToMetricSystem (dist) {
    let measure,unit;
    if(dist>1000){
      measure = helpers.convertLength(dist,"meters","kilometers")
      unit = this.options?.language=="cn"?"公里":'km'
    }else{
      measure = dist;
      unit = this.options?.language=="cn"?"米":'m'
    }
    return `${measure.toFixed(2)} ${unit}`
  }
  _addSymbolLayer(){
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
        'text-variable-anchor': ['top', 'bottom', 'left', 'right','center'],
        'text-radial-offset': this.options?.style?.text?.radialOffset?? 0.5,
        'text-justify': 'auto',
        'text-size': this.options?.style?.text?.textSize?? 14,
        'text-letter-spacing': this.options?.style?.text?.letterSpacing?? 0.05,
      },
      'paint': {
        'text-color': this.options?.style?.text?.color?? '#D20C0C',
        'text-halo-color': this.options?.style?.text?.haloColor?? '#fff',
        'text-halo-width': this.options?.style?.text?.haloWidth?? 2,
      },
    });
    this._map.addLayer({
      'id': MEASURE_POINTS_HALO_LAYER_ID,
      'type': 'circle',
      'source': MEASURE_LABELS_SOURCE_ID,
      'filter':  ['==', ['get','visible'], true],
      'layout': {

      },
      'paint': {
        "circle-radius": this.options?.style?.common?.vertexHaloRadius ?? 4,
        "circle-color": this.options?.style?.common?.vertexHaloColor ?? "#fff",
      },
    });
    this._map.addLayer({
      'id': MEASURE_POINTS_LAYER_ID,
      'type': 'circle',
      'source': MEASURE_LABELS_SOURCE_ID,
      'filter':  ['==', ['get','visible'], true],
      'layout': {
        // 'text-font': [
        //   'Klokantech Noto Sans Bold'
        // ],
      },
      'paint': {
        "circle-radius": this.options?.style?.common?.vertexRadius ?? 2,
        "circle-color": this.options?.style?.common?.vertexColor ?? "#D20C0C",
      },
    });
  }
  _registerEvents() {
    if(!this._measureListener)
    {
      this._measureListener =this._updateLabels.bind(this)
      this._map.on('draw.create', this._measureListener);
      this._map.on('draw.update', this._measureListener);
      this._map.on('draw.delete', this._measureListener);
      this._map.on('draw.render', this._measureListener);
    }
  }
  _removeEvents(){
    if(this._measureListener){
      this._map.off('draw.create', this._measureListener);
      this._map.off('draw.update', this._measureListener);
      this._map.on('draw.delete', this._measureListener);
      this._map.off('draw.render', this._measureListener);
      this._measureListener = null;
    }

  }
  _updateLabels() {
    let source = this._map.getSource(MEASURE_LABELS_SOURCE_ID);
    // Build up the centroids for each segment into a features list, containing a property 
    // to hold up the measurements
    let features = [];
    // Generate features from what we have on the drawControl:
    let drawnFeatures = this._drawCtrl.getAll();
    drawnFeatures.features.forEach((feature) => {
      try {
        if (feature.geometry.type == 'Polygon') {
          let myarea = this._formatMeasure(area(feature), true);
          let mycentroid = centroid(feature);
          let measurement = `${myarea}`;
          mycentroid.properties = {
            measurement,
          };
          features.push(mycentroid);
        } else if (feature.geometry.type == 'LineString') {
          let segments = lineSegment(feature);
          let lineLength=0
          segments.features.forEach((segment,index) => {
            if(index==0){
              let mycentroid = {
                geometry:{
                  type:"Point",
                  coordinates:segment.geometry.coordinates[0]
                },
                properties:{
                  measurement: this.options?.language=="cn"?"起点":"start",
                  visible:true,
                }
              };
              features.push(mycentroid);
            }
            lineLength += length(segment);
            let measurement = this._formatMeasure(( lineLength* 1000)); //km to m
            let mycentroid = {
              geometry:{
                type:"Point",
                coordinates:segment.geometry.coordinates[1]
              },
              properties:{
                measurement:measurement,
                visible:true
              }
            };
            features.push(mycentroid);
          });
        }
      } catch(e) {
         //Silently ignored
      }
      
    });
    let data = {
      type: "FeatureCollection",
      features: features
    };
    source.setData(data);
  }
}