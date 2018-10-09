document.write("<script type='text/javascript' src='js/common.js'></script>"); 
function drawKline(cxt,rawData,width,height,barWidth,masIndex){
    //klineData.slice(klineData.length-count,klineData.length)
    var spaceWidth = 2;
    var barWidth = barWidth || 5;
    var count = Math.floor(width/(barWidth+spaceWidth));
    count = count > rawData.length ? rawData.length:count;

    var data = getKLData(rawData);
    var kdata = data.ks.slice(rawData.length-count,rawData.length);
    
    var rawData02 = rawData.slice(rawData.length-count,rawData.length);
    var data02 = getKLData(rawData02);

    var volData = [];
    var topH = height*0.72;
    var bottomH = height*0.28;

    var high = data02.high;
    var low = data02.low;
    var MAs = [{color: 'rgb(255,70,251)', daysCount: 5},{ color: 'rgb(227,150,34)', daysCount: 10 },{ color: 'rgb(0,153,255)', daysCount: 20 },{ color: 'rgb(53,71,107)', daysCount: 30 }];
    cxt.clearRect(0,0,width,height)//先清空再绘图
    drawRect(cxt,0,0,width,height);//走势框
    /**分割线**/
    cxt.beginPath();
    cxt.moveTo(0,topH);
    cxt.lineTo(width,topH);
    cxt.lineWidth = 1;
    cxt.strokeStyle = "#ccc";
    cxt.stroke();
    /**分割线**/

    /**价格**/
    for(var i=0; i<2;i++){
        var y = i==0 ? topH*i+12:topH*i-2;
        var text = i==0 ? high:low;
        drawText(cxt,0,y,text.toFixed(2),'left')
    }
    /**价格 end**/

    /**虚线**/
    for(var i=0;i<3;i++){
        var y =  getDashed(3,topH,i)
        drawDashed(cxt,0,y,width);
    }
    /**虚线 end**/

    /**蜡烛图***/
    for(var i=0;i<kdata.length;i++){
        var color = kdata[i].close > kdata[i].open ? 'red':'green'
        cxt.beginPath();
        cxt.moveTo(i*(spaceWidth+barWidth)+(barWidth/2+1),getPriceY(high,low,topH,kdata[i].high))
        cxt.lineTo(i*(spaceWidth+barWidth)+(barWidth/2+1),getPriceY(high,low,topH,kdata[i].low));
        cxt.strokeStyle = color;
        cxt.stroke();
        var openY = getPriceY(high,low,topH,kdata[i].open);
        var closeY = getPriceY(high,low,topH,kdata[i].close);
        var y = openY > closeY ? closeY:openY;
        drawVol(cxt,i*(barWidth+spaceWidth),y,barWidth,Math.abs(openY-closeY),color)    
    }
    /**蜡烛图 end**/

    /**均线**/
    var filteredData = [];
    var dataCount = Math.ceil(width / (spaceWidth + barWidth))-1;
    var maxDataLength = data.ks.length;
    var startIndex, dHigh = [], dLow=[],volumeData = [], MAsData = [];

    if(maxDataLength-dataCount<0){
        startIndex = 0;
    }else{
        startIndex = maxDataLength - dataCount;
    }
    for (var i = startIndex; i < data.ks.length; i++) {
         filteredData.push(data.ks[i]);
    }
    for(var i=0;i<filteredData.length;i++){
        if (i == 0 && (maxDataLength - dataCount==0)) { 
            max = data.high;
            min = data.low; 
        }else { 
            dHigh.push(filteredData[i].high);
            dLow.push(filteredData[i].low);
            volumeData.push(filteredData[i].volume)
        }
    }

    max = Math.max.apply(null,dHigh);
    min = Math.min.apply(null,dLow); 
    vHigh = Math.max.apply(null,volumeData);
    vLow = Math.min.apply(null,volumeData);
    /*
    for(var i=0; i<MAs.length; i++){
        var MA = calcMAPrices(data.ks, startIndex, filteredData.length, MAs[i].daysCount);
        for(var k=0; k<MA.length; k++){
            if(MA[k] != false){
                MAsData.push(MA[k])
            }
        }
        cxt.stroke();
    }
    */

    max = max > Math.max.apply(null,MAsData) ? max :Math.max.apply(null,MAsData);
    min = min < Math.min.apply(null,MAsData) ? min :Math.min.apply(null,MAsData);
    for(var i=0; i<MAs.length; i++){
        var MA = calcMAPrices(data.ks, startIndex, filteredData.length, MAs[i].daysCount);
        cxt.strokeStyle = MAs[i].color;
        cxt.beginPath();
        var currentX = 0;
        for(var k=0; k<MA.length; k++){
            var x = k * (spaceWidth + barWidth) + ( spaceWidth + barWidth);
            if(MA[k] != false){
                var y = getPriceY(max,min,topH,MA[k]);
                if(k==0){
                       
                }
                if (y && i==0) {
                        cxt.lineTo(x, y);
                } else {
                        cxt.lineTo(x, y);
                }
            }
        }
        cxt.stroke();
    }   
    /**均线 end**/
    
    cxt.clearRect(1,topH+1,width-2,bottomH-2)//先清空再绘图
    /**成交量**/
    for(var i=0;i<kdata.length;i++){
        volData.push(kdata[i].volume)
    }
    var max = maxVol(volData);        
    for(var i=0;i<kdata.length;i++){
        var y = getVolumeY(bottomH,max,kdata[i].volume);
        var yh = bottomH / max * kdata[i].volume;
        var color = kdata[i].close > kdata[i].open ? 'red':'green'
        drawVol(context,i*(barWidth+spaceWidth),height-yh,barWidth,yh,color);
    }
    /**成交量 end**/

    } 