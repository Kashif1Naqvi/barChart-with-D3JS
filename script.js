d3.json('tem.json').then((d)=>{

  let temprature = [],
  dates = [],
  margin = {top:0,right:0,left:20,bottom:30}
  width = 600  - margin.left - margin.right,
  height = 400 - margin.top  - margin.bottom,
  barWidth = 50,
  offset = 5;
  
  let tempColor,
      yScale,
      xScale,
      colors,
      toltips,
      myTemprature,
      yAxisValues,
      yAxisTicks,
      yGuide;
  
  for(var bar = 1; bar<d.list.length; bar++){
    temprature.push(d.list[bar].main.temp) 
    dates.push(new Date(d.list[bar].dt_txt))
  }
  
   yScale = d3.scaleLinear()
            .domain([0,d3.max(temprature)])
            .range([0,height])
   yAxisValues = d3.scaleLinear()
                .domain([0,d3.max(temprature)])
                .range([height,0]);

   yAxisTicks = d3.axisRight(yAxisValues)
                .ticks(10)
   xAxisValues = d3.scaleTime()
                .domain([dates[0] , dates[(dates.length - 1 )] ])
                .range([0,width]);
   xAxisTicks = d3.axisBottom((xAxisValues))
                  .ticks(d3.timeDay.every(1))
   xScale =  d3.scaleBand()
            .domain(temprature)
            .paddingInner(.1)
            .paddingOuter(.2)
            .range([0,width])
  
   colors = d3.scaleLinear()
            .domain([0,65,80,d3.max(temprature)
            ]).range(["#FFFFFF","#2D8BCF","#DA3637"])
            
  toltips = d3.select("body").append('div')
          .style("position","absolute")
          .style("padding","0 10px")
          .style('background',"white")
          .style("opacity",0)
  
  myTemprature = d3.select("#temprature").append("svg")
                .attr("width",width + margin.left + margin.right )
                .attr("height",height + margin.top + margin.bottom)
                .append('g')
                .attr('transform','translate(' + margin.left + ',' +  margin.right +   ')')
                .selectAll('rect').data(temprature)
                .enter().append('rect')
                .attr("fill",colors)
                .attr("width",function(d){
                return xScale.bandwidth(d);
                })
                .attr("height",0)
                .attr("x",function(d){
                return xScale(d)
                })
                .attr("y",height)
                .on("mouseover",function(d){
                toltips.transition().duration(1000).style("opacity",.9)
                toltips.html('<div  style="font-size:1.5em; font-weight:bold;" >'+ d + "&deg;" +"</div>"  )
                .style("left",(d3.event.pageX - 35) + "px")
                .style("top",(d3.event.pageY - 30) + "px")
                tempColor = this.style.fill
                d3.select(this)
                .style("fill","yellow")
                })
                .on("mouseout",function(){
                  toltips.html('')
                d3.select(this)
                .style("fill",tempColor)
  })
  
  yGuide = d3.select('#temprature svg').append('g')
    .attr('transform','translate(0,4)')
    .call(yAxisTicks)
  xGuide = d3.select("#temprature svg").append('g')
             .attr('transform','translate(20,' +height+ ')')
             .call(xAxisTicks)
  myTemprature.transition()
              .attr('height',function(d){ return yScale(d) })
              .attr("y",function(d){ return height - yScale(d) })
              .delay(function(d,i){return i * 20 })
              .duration(1000)
              .ease(d3.easeBounceOut)
  
  })


