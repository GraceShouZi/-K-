function getDashed(num,height,i){
    return height/(num+1)+(height/(num+1)*i)
};
function getVolumeY(bh,maxVol,v){
    return bh - bh / maxVol * v ;
}

function maxVol(arr){
    return Math.max.apply(null,arr)
}

function getPriceY(highest,lowest,topH,price){
    return (highest - price) * topH / (highest - lowest);
} 

function calcMAPrices (filteredData, startIndex, count, daysCn) {
    var result = new Array();
    for (var i = startIndex; i < startIndex + count; i++) {
        var startCalcIndex = i - daysCn + 1;
        if (startCalcIndex < 0) {
            result.push(false);
            continue;
        }
        var sum = 0;
        for (var k = startCalcIndex; k <= i; k++) {
            sum += filteredData[k].close;
        }
        var val = sum / daysCn;
        result.push(val);
    }
    return result;
};

function getKLData(klineData) {
    var result = {};
    var ks = [];
    for (var i = 0; i < klineData.length; i++) {
        var rawData = klineData[i];
        var item = {
            quoteTime: rawData[0],
            preClose: rawData[1],
            open: rawData[2],
            high: rawData[3],
            low: rawData[4],
            close: rawData[5],
            volume: rawData[6],
            amount: rawData[7]
        };
        if (ks.length == 0) {
            result.low = item.low;
            result.high = item.high;
        } else {
            result.high = Math.max(result.high, item.high);
            result.low = Math.min(result.low, item.low);
        }
        ks.push(item);
    }
    result.ks = ks;
    return result;
}

function drawRect(cxt,x,y,width,height){
    cxt.save();
    cxt.beginPath();
    cxt.rect(x,y,width,height);
    cxt.strokeWidth = 1;
    cxt.strokeStyle = '#aaa';
    cxt.stroke();
    cxt.closePath();
    cxt.restore();
}

function drawDashed(cxt,x,y,w){
    cxt.save();
    cxt.beginPath();
    cxt.moveTo(x,y)
    cxt.lineTo(w,y);
    cxt.setLineDash([2,2]);
    cxt.strokeStyle = "#aaa";
    cxt.lineWidth = 1;
    cxt.stroke();
    cxt.restore();
}

function drawText(cxt,x,y,text,align,color,size){
    cxt.save();
    cxt.beginPath(); 
    cxt.font = size !='' ? size+' Microsoft yahei': '12px Microsoft yahei';
    cxt.fillStyle = color || 'gray';
    cxt.textAlign = align;
    cxt.fillText(text, x,y);
    cxt.fill();
    cxt.restore();
}

function drawVol(cxt,x,y,width,height,color){
    cxt.save();
    cxt.beginPath();
    cxt.rect(x+1,y,width,height);
    cxt.fillStyle = color;
    cxt.fill();
    cxt.closePath();
    cxt.restore();
}

var vvv = [{"price":16.19,"volume":214,"amount":3464.66},{"price":16.19,"volume":1192,"amount":19298.48},{"price":16.2,"volume":204,"amount":3302.76},{"price":16.2,"volume":382,"amount":6184.58},{"price":16.19,"volume":329,"amount":5326.51},{"price":16.19,"volume":224,"amount":3626.56},{"price":16.2,"volume":137,"amount":2218.03},{"price":16.2,"volume":225,"amount":3642.75},{"price":16.2,"volume":47,"amount":760.93},{"price":16.2,"volume":332,"amount":5375.08},{"price":16.2,"volume":52,"amount":841.88},{"price":16.2,"volume":1579,"amount":25579.8},{"price":16.21,"volume":351,"amount":5686.2},{"price":16.22,"volume":29,"amount":469.8},{"price":16.25,"volume":1490,"amount":24152.9},{"price":16.25,"volume":609,"amount":9871.89},{"price":16.24,"volume":971,"amount":15739.91},{"price":16.25,"volume":2070,"amount":33575.4},{"price":16.26,"volume":453,"amount":7347.66},{"price":16.25,"volume":979,"amount":15889.17},{"price":16.25,"volume":613,"amount":9948.99},{"price":16.26,"volume":416,"amount":6751.68},{"price":16.24,"volume":240,"amount":3895.2},{"price":16.25,"volume":1382,"amount":22429.86},{"price":16.23,"volume":277,"amount":4495.71},{"price":16.24,"volume":51,"amount":827.73},{"price":16.24,"volume":267,"amount":4333.41},{"price":16.24,"volume":2833,"amount":46007.92},{"price":16.25,"volume":1403,"amount":22784.72},{"price":16.26,"volume":632,"amount":10263.68},{"price":16.26,"volume":337,"amount":5472.88},{"price":16.27,"volume":898,"amount":14583.52},{"price":16.27,"volume":169,"amount":2744.56},{"price":16.26,"volume":620,"amount":10068.8},{"price":16.22,"volume":1820,"amount":29556.8},{"price":16.27,"volume":616,"amount":10003.84},{"price":16.28,"volume":592,"amount":9614.08},{"price":16.28,"volume":1348,"amount":21891.52},{"price":16.3,"volume":4640,"amount":75400},{"price":16.3,"volume":1768,"amount":28730},{"price":16.3,"volume":738,"amount":11999.88},{"price":16.26,"volume":1694,"amount":27544.44},{"price":16.3,"volume":369,"amount":5999.94},{"price":16.3,"volume":164,"amount":2666.64},{"price":16.3,"volume":436,"amount":7089.36},{"price":16.29,"volume":575,"amount":9349.5},{"price":16.25,"volume":822,"amount":13365.72},{"price":16.29,"volume":664,"amount":10796.64},{"price":16.25,"volume":795,"amount":12926.7},{"price":16.3,"volume":1788,"amount":29072.88},{"price":16.28,"volume":1117,"amount":18162.42},{"price":16.27,"volume":1150,"amount":18699},{"price":16.29,"volume":1040,"amount":16910.4},{"price":16.26,"volume":892,"amount":14503.92},{"price":16.3,"volume":1186,"amount":19296.22},{"price":16.27,"volume":289,"amount":4702.03},{"price":16.28,"volume":2829,"amount":46027.83},{"price":16.3,"volume":324,"amount":5271.48},{"price":16.3,"volume":225,"amount":3660.75},{"price":16.26,"volume":509,"amount":8281.43},{"price":16.31,"volume":1232,"amount":20044.64},{"price":16.28,"volume":27,"amount":439.29},{"price":16.29,"volume":187,"amount":3042.49},{"price":16.26,"volume":127,"amount":2066.29},{"price":16.26,"volume":405,"amount":6589.35},{"price":16.25,"volume":321,"amount":5222.67},{"price":16.27,"volume":222,"amount":3611.94},{"price":16.26,"volume":571,"amount":9290.17},{"price":16.25,"volume":64,"amount":1041.28},{"price":16.26,"volume":120,"amount":1952.4},{"price":16.27,"volume":234,"amount":3807.18},{"price":16.26,"volume":167,"amount":2717.09},{"price":16.26,"volume":267,"amount":4344.09},{"price":16.27,"volume":278,"amount":4523.06},{"price":16.25,"volume":89,"amount":1448.03},{"price":16.25,"volume":210,"amount":3416.7},{"price":16.26,"volume":18,"amount":292.86},{"price":16.25,"volume":78,"amount":1269.06},{"price":16.25,"volume":60,"amount":976.2},{"price":16.25,"volume":167,"amount":2717.09},{"price":16.25,"volume":75,"amount":1220.25},{"price":16.26,"volume":86,"amount":1399.22},{"price":16.26,"volume":203,"amount":3302.81},{"price":16.26,"volume":1059,"amount":17229.93},{"price":16.25,"volume":82,"amount":1334.14},{"price":16.25,"volume":149,"amount":2424.23},{"price":16.26,"volume":123,"amount":2001.21},{"price":16.27,"volume":145,"amount":2359.15},{"price":16.26,"volume":1030,"amount":16758.1},{"price":16.24,"volume":474,"amount":7711.98},{"price":16.2,"volume":9240,"amount":150242.4},{"price":16.21,"volume":732,"amount":11902.32},{"price":16.26,"volume":1099,"amount":17869.74},{"price":16.26,"volume":82,"amount":1333.32},{"price":16.25,"volume":98,"amount":1593.48},{"price":16.24,"volume":79,"amount":1284.54},{"price":16.24,"volume":146,"amount":2373.96},{"price":16.23,"volume":91,"amount":1479.66},{"price":16.23,"volume":496,"amount":8064.96},{"price":16.23,"volume":200,"amount":3252},{"price":16.24,"volume":234,"amount":3804.84},{"price":16.22,"volume":464,"amount":7544.64},{"price":16.23,"volume":477,"amount":7756.02},{"price":16.24,"volume":276,"amount":4487.76},{"price":16.23,"volume":336,"amount":5463.36},{"price":16.22,"volume":294,"amount":4780.44},{"price":16.22,"volume":800,"amount":13008},{"price":16.22,"volume":478,"amount":7772.28},{"price":16.22,"volume":1421,"amount":23105.46},{"price":16.22,"volume":223,"amount":3625.98},{"price":16.22,"volume":312,"amount":5073.12},{"price":16.23,"volume":168,"amount":2731.68},{"price":16.25,"volume":423,"amount":6877.98},{"price":16.23,"volume":545,"amount":8861.7},{"price":16.23,"volume":337,"amount":5479.62},{"price":16.23,"volume":509,"amount":8276.34},{"price":16.23,"volume":287,"amount":4666.62},{"price":16.23,"volume":330,"amount":5365.8},{"price":16.23,"volume":612,"amount":9951.12},{"price":16.25,"volume":1485,"amount":24146.1},{"price":16.24,"volume":2159,"amount":35083.75},{"price":16.26,"volume":2132,"amount":34645},{"price":16.26,"volume":777,"amount":12626.25},{"price":16.24,"volume":906,"amount":14722.5},{"price":16.25,"volume":275,"amount":4468.75},{"price":16.25,"volume":297,"amount":4826.25},{"price":16.24,"volume":145,"amount":2356.25},{"price":16.22,"volume":3100,"amount":50375},{"price":16.24,"volume":587,"amount":9538.75},{"price":16.24,"volume":522,"amount":8482.5},{"price":16.24,"volume":325,"amount":5281.25},{"price":16.24,"volume":346,"amount":5622.5},{"price":16.23,"volume":100,"amount":1625},{"price":16.23,"volume":272,"amount":4420},{"price":16.23,"volume":462,"amount":7507.5},{"price":16.24,"volume":171,"amount":2778.75},{"price":16.23,"volume":707,"amount":11488.75},{"price":16.26,"volume":811,"amount":13178.75},{"price":16.27,"volume":2874,"amount":46702.5},{"price":16.29,"volume":10464,"amount":170144.64},{"price":16.27,"volume":1785,"amount":29024.1},{"price":16.25,"volume":1141,"amount":18552.66},{"price":16.26,"volume":1016,"amount":16520.16},{"price":16.26,"volume":585,"amount":9512.1},{"price":16.26,"volume":1765,"amount":28698.9},{"price":16.26,"volume":488,"amount":7934.88},{"price":16.26,"volume":557,"amount":9056.82},{"price":16.25,"volume":1572,"amount":25560.72},{"price":16.27,"volume":1274,"amount":20715.24},{"price":16.25,"volume":460,"amount":7479.6},{"price":16.26,"volume":431,"amount":7008.06},{"price":16.26,"volume":659,"amount":10715.34},{"price":16.26,"volume":1282,"amount":20845.32},{"price":16.27,"volume":3582,"amount":58243.32},{"price":16.3,"volume":332,"amount":5398.32},{"price":16.3,"volume":204,"amount":3317.04},{"price":16.29,"volume":650,"amount":10569},{"price":16.27,"volume":4921,"amount":80015.46},{"price":16.27,"volume":1496,"amount":24324.96},{"price":16.3,"volume":2316,"amount":37658.16},{"price":16.3,"volume":440,"amount":7154.4},{"price":16.28,"volume":364,"amount":5918.64},{"price":16.3,"volume":3339,"amount":54292.14},{"price":16.3,"volume":935,"amount":15203.1},{"price":16.31,"volume":675,"amount":10975.5},{"price":16.31,"volume":510,"amount":8292.6},{"price":16.29,"volume":362,"amount":5886.12},{"price":16.3,"volume":549,"amount":8926.74},{"price":16.29,"volume":867,"amount":14097.42},{"price":16.29,"volume":1866,"amount":30341.16},{"price":16.31,"volume":3354,"amount":54536.04},{"price":16.31,"volume":293,"amount":4764.18},{"price":16.29,"volume":428,"amount":6959.28},{"price":16.31,"volume":679,"amount":11040.54},{"price":16.31,"volume":887,"amount":14431.49},{"price":16.3,"volume":890,"amount":14480.3},{"price":16.28,"volume":1146,"amount":18645.42},{"price":16.28,"volume":2900,"amount":47183},{"price":16.28,"volume":2916,"amount":47443.32},{"price":16.28,"volume":511,"amount":8313.97},{"price":16.28,"volume":1016,"amount":16530.32},{"price":16.29,"volume":1114,"amount":18124.78},{"price":16.3,"volume":458,"amount":7451.66},{"price":16.28,"volume":439,"amount":7142.53},{"price":16.28,"volume":655,"amount":10656.85},{"price":16.27,"volume":622,"amount":10119.94},{"price":16.27,"volume":447,"amount":7272.69},{"price":16.27,"volume":274,"amount":4457.98},{"price":16.28,"volume":458,"amount":7451.66},{"price":16.29,"volume":2505,"amount":40756.35},{"price":16.28,"volume":446,"amount":7256.42},{"price":16.3,"volume":7548,"amount":122805.96},{"price":16.3,"volume":1141,"amount":18564.07},{"price":16.29,"volume":3724,"amount":60589.48},{"price":16.3,"volume":2577,"amount":41927.79},{"price":16.33,"volume":8578,"amount":139564.06},{"price":16.34,"volume":4426,"amount":72011.02},{"price":16.37,"volume":8605,"amount":140089.4},{"price":16.35,"volume":1573,"amount":25608.44},{"price":16.35,"volume":812,"amount":13219.36},{"price":16.35,"volume":1792,"amount":29173.76},{"price":16.36,"volume":1861,"amount":30297.08},{"price":16.35,"volume":931,"amount":15156.68},{"price":16.35,"volume":537,"amount":8742.36},{"price":16.34,"volume":5586,"amount":90940.08},{"price":16.35,"volume":981,"amount":15970.68},{"price":16.34,"volume":265,"amount":4314.2},{"price":16.33,"volume":237,"amount":3858.36},{"price":16.33,"volume":438,"amount":7130.64},{"price":16.35,"volume":682,"amount":11102.96},{"price":16.34,"volume":672,"amount":10940.16},{"price":16.35,"volume":3206,"amount":52193.68},{"price":16.35,"volume":954,"amount":15531.12},{"price":16.35,"volume":290,"amount":4721.2},{"price":16.36,"volume":335,"amount":5453.8},{"price":16.35,"volume":740,"amount":12047.2},{"price":16.35,"volume":321,"amount":5225.88},{"price":16.36,"volume":699,"amount":11379.72},{"price":16.36,"volume":1889,"amount":30752.92},{"price":16.37,"volume":812,"amount":13227.48},{"price":16.36,"volume":970,"amount":15801.3},{"price":16.36,"volume":905,"amount":14742.45},{"price":16.36,"volume":640,"amount":10425.6},{"price":16.35,"volume":833,"amount":13569.57},{"price":16.34,"volume":1977,"amount":32205.33},{"price":16.34,"volume":415,"amount":6760.35},{"price":16.36,"volume":1983,"amount":32303.07},{"price":16.35,"volume":438,"amount":7135.02},{"price":16.37,"volume":3616,"amount":58904.64},{"price":16.37,"volume":3991,"amount":65013.39},{"price":16.36,"volume":793,"amount":12917.97},{"price":16.36,"volume":376,"amount":6125.04},{"price":16.36,"volume":808,"amount":13162.32},{"price":16.36,"volume":461,"amount":7509.69},{"price":16.35,"volume":556,"amount":9057.24},{"price":16.35,"volume":450,"amount":7330.5},{"price":16.34,"volume":2395,"amount":39014.55},{"price":16.35,"volume":3588,"amount":58448.52},{"price":16.35,"volume":570,"amount":9285.3},{"price":16.36,"volume":2274,"amount":37043.46},{"price":16.35,"volume":1156,"amount":18831.24}]