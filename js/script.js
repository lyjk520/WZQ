var chessBoard = [];
var me = true;
var over = false;
// 赢法数组
var wins = [];
//赢法的统计数组
var mywin = [];
var computerwin = [];
for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
    chessBoard[i][j]=0;
    }
}

for(var i=0;i<15;i++){
    wins[i] = [];
    for(var j=0;j<15;j++){
    wins[i][j]=[];
    }
}
var count = 0;
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j+k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j+k][i][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}
console.log(count);

for(var i=0;i<count;i++){
    mywin[i]=0;
    computerwin[i]=0;
}
var chess = document.getElementById('chess');
var ctx1 = chess.getContext('2d');
ctx1.strokeStyle = "#BFBFBF";

var bg = new Image();
bg.src = "img/jingzhe.jpg";
bg.onload = function(){
    ctx1.drawImage(bg,15,16,420,418);
    drwaPic();
    //onestep(0,0,true);
    //onestep(1,1,false);
}
var drwaPic = function(){
for(var i=0;i<15;i++){
    ctx1.moveTo(15+i*30,15);
    ctx1.lineTo(15+i*30,435);
    ctx1.stroke();
    ctx1.moveTo(15,15+i*30);
    ctx1.lineTo(435,15+i*30);
    ctx1.stroke();
}
}

var onestep = function(i,j,me){
    ctx1.beginPath();
    ctx1.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    ctx1.closePath();
    var gradient = ctx1.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 8, 15 + i*30 + 2, 15 + j*30 - 2, 3);
    if(me){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9");
    }
    ctx1.fillStyle = gradient;
    ctx1.fill();
}

chess.onclick = function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x/30);
    var j = Math.floor(y/30);
    if(chessBoard[i][j]==0){
        onestep(i,j,me);
        chessBoard[i][j]=1;
        chessBoard[i][j]=2;
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                mywin[k]++;
                computerwin[k] = 6;
                if(mywin[k]==5){
                    window.alert("恭喜你赢了惊蛰君！厉害哦！");
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
            computerAI();
        }
    }
}

var computerAI = function(){
    var myScore = [];
    var computerScore = [];
    var max =0;
    var u=0,v=0;
    for(var i=0;i<15;i++){
        myScore[i]=[];
        computerScore[i]=[];
        for(var j=0;j<15;j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
           if(chessBoard[i][j]==0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(mywin[k]==1){
                            myScore[i][j] +=200;
                        }else if(mywin[k]==2){
                            myScore[i][j] +=400;
                        }else if(mywin[k]==3){
                            myScore[i][j] +=2000;
                        }else if(mywin[k]==4){
                            myScore[i][j] +=10000;
                        }
                        if(computerwin[k]==1){
                            computerScore[i][j] +=220;
                        }else if(computerwin[k]==2){
                            computerScore[i][j] +=420;
                        }else if(computerwin[k]==3){
                            computerScore[i][j] +=2100;
                        }else if(computerwin[k]==4){
                            computerScore[i][j] +=20000;
                        }
                    }
                }
                if(myScore[i][j]>max){
                    max = myScore[i][j];
                    u=i;
                    v=j;
                }else if(myScore[i][j]==max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }   
           }
        }
    }
    onestep(u,v,false);
    chessBoard[u][v] = 2;
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerwin[k]++;
            mywin[k] = 6;
            if(computerwin[k]==5){
                window.alert("你输给惊蛰君了！要加油哦！");
                over = true;
            }
        }
    }
    if(!over){
        me = !me;
    }
}