# @ryry886/mapbox-gl-measure
## distance  and  area  measure
## 长度测量和面积测量
![image](https://github.com/ryry886/mapbox-gl-measure/blob/main/pic1.jpg)

![image](https://github.com/ryry886/mapbox-gl-measure/blob/main/pic2.jpg)

## Installing
```
npm install @ryry886/mapbox-gl-measure
```

## Example
 ```js
  import MapboxMeasure from "@ryry886/mapbox-gl-measure"
  
  let measure= new MapboxMeasure({
    //language:"cn"
  })
  measure.addTo(map); // mapbox-gl or maplibre map 
  measure.start("distance")// measure.start("area")
  
  //measure.clear();   // 清空测量
  //measure.stop();   // 停止测量
 ```

## custom style
```js
let measure = new MapboxMeasure(map, {
   language:"cn",
   areaStyle:{
    "fillColor":"#000",
    "fill-opacity": 0.1,
    "fillOutlineColor":"#000"
   },
   lengthStyle:{
    "line-width": 2,
    "lineColor": "#D20C0C",
   },
   pointStyle:{ 
    "midPointRadius":6,
    "midPointColor":"#fbb03b",
    "midPointHaloRadius":8,
    "midPointHaloColor"：'#FFF',
   },
   textStyle:{ 
    "radialOffset":0.5,
    "textSize":14,
    "letterSpacing":0.05,
    "textColor":'#D20C0C',
    "textHaloColor":'#fff',
    "textHaloWidth":2,
    "vertexHaloRadius":4,
    "vertexHaloColor":"#fff",
    "vertexRadius":2,
    "vertexColor":"#D20C0C"
   }
});

```