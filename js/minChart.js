document.write("<script type='text/javascript' src='js/common.js'></script>"); 
function drawMin(cxt,data,width,height){
        cxt.clearRect(0,0,width,height)//先清空再绘图
        var mins = data.mins;
        var preClose = data.quote.preClose;
        var highest = data.quote.highest;
        var lowest = data.quote.lowest;
        var preClose = data.quote.preClose;
        var open = data.quote.open;
        var TopH = height*0.68;
        var BottomH = height*0.25;
        var widthX = width / 241;
        var volData =[];
        drawRect(cxt,0,0,width,TopH);//走势框
        /**价格，百分比**/
        for(var i=0;i<3;i++){
            var y = TopH/2
            var h = i==0 ? (y*i)+12:(y*i)+4;
            var color,text,percent;
            var diff =  highest - preClose > preClose - lowest ? highest - preClose : preClose - lowest;
            highest = preClose + diff;
            lowest =  preClose - diff;
            if(i==0){ 
                color = 'green'; 
                text = (preClose+ diff).toFixed(2);
                percent = (diff/preClose*100).toFixed(2);
            }
            if(i==1){ 
                color = 'gray'; 
                text = (preClose).toFixed(2); 
                percent = '0.00';
            }
            if(i==2){ 
                color = 'red'; 
                text = (preClose - diff).toFixed(2); 
                percent = (-diff/preClose*100).toFixed(2);
                h = (y*i)-2
            }
            drawText(cxt,0,h,text,'left',color)
            drawText(cxt,width,h,percent+'%','right',color)
        }
        /**价格，百分比end**/
        /**时间**/
        for(var i=0;i<3;i++){
            var text, align,x;
            if(i==0){  
                text = '9:30';
                align = 'left';
                x = 0;
            }
            if(i==1){ 
                text = '11:30/13:00'; 
                align = 'center';
                x = width/2;
            }
            if(i==2){ 
                text = '15:00';  
                align = 'right'; 
                x = width          
            }
           drawText(cxt,x,TopH+18,text,align,'gray');
        }
        /**时间 end**/
        drawRect(cxt,0,TopH+ height*0.07,width,BottomH);//成交量框  
        /**分时线**/

        /**分时线 end**/
        /**成交量**/
        for(var i=0;i<mins.length;i++){
            volData.push(mins[i].volume)
        }
        var max = maxVol(volData);
        for(var i=0;i<mins.length;i++){
            var y = getVolumeY(BottomH,max,mins[i].volume);
            var yh = BottomH / max * mins[i].volume;
            var color = 'red';
             if(i>0){
                color = mins[i].volume > mins[i-1].volume ? 'red':'green'
            }
            drawVol(context,widthX*i+1,height-yh,1.5,yh,color);
        }
        /**成交量 end**/

        /**虚线**/
        for(var i=0;i<3;i++){
            var y =  getDashed(3,TopH,i)
            drawDashed(cxt,0,y,width);
        }
        /**虚线 end**/
        

        /**分时线**/
        cxt.beginPath();
        cxt.moveTo(0,getPriceY(highest,lowest,open));
        for(var i=0;i<mins.length;i++){
            var x = widthX;
            var y = getPriceY(highest,lowest,TopH,mins[i].price);
            cxt.lineTo(x*i,y)
        }
        cxt.lineWidth = 1;
        cxt.strokeStyle = 'blue';
        cxt.stroke();
        /**分时线 end**/

        /**均价**/
        cxt.beginPath();
        cxt.moveTo(0,getPriceY(highest,lowest,open));
        for(var i=0;i<mins.length;i++){
            var avg = mins[i].amount/mins[i].volume;
            var y = getPriceY(highest,lowest,TopH,avg);
            cxt.lineTo(x*i,y)
        }
        cxt.lineWidth = 1;
        cxt.strokeStyle = 'red';
        cxt.stroke();
        /**均价 end**/
    } 