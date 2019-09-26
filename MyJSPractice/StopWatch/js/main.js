"use strict";

{
    const timer =document.getElementById("timer");
    const start =document.getElementById("start");
    const stop =document.getElementById("stop");
    const rest =document.getElementById("rest");

    let startTime;
    let timeoutId;
    let elapsedTime = 0;

    function countUp(){
       console.log(Date.now()-startTime);
       const d = new Date(Date.now()-startTime +elapsedTime);             //new Date 年月日取得のためのメソッド
       const m = String(d.getMinutes()).padStart(2,'0');                  //分を取得 
                                                                          //padStartは表示のケタ数を指定。埋まらなかった場合0で埋める 
                                                                          //padStartは文字列にしか使えないためStringで一度文字列にしている
       const s = String(d.getSeconds()).padStart(2,'0');                  //秒を取得
       const ms = String(d.getMilliseconds()).padStart(2,'0');            //ミリ秒を取得
       timer.textContent = `${m}:${s}.${ms}`;


       timeoutId = setTimeout(() => {
           countUp();
       }, 10); //setTimeout(関数,時間の指定(ミリ秒指定)) ある処理を一定時間後に実行するように命令することができるメソッド
    }


    function setButtonStateInitial(){
        start.classList.remove("inactive"); //disabled「使用禁止」の意味。disabledがついていると入力不可、ボタンなら押せなくなる
        stop.classList.add("inactive");
        reset.classList.add("inactive");
    }

    function setButtonStateRunning(){
        start.classList.add("inactive");
        stop.classList.remove("inactive");
        reset.classList.add("inactive");

    }

    function setButtonStateStopped(){
        start.classList.remove("inactive");
        stop.classList.add("inactive");
        reset.classList.remove("inactive");

    }

    setButtonStateInitial();

    start.addEventListener("click", () => {
        if(start.classList.contains('inactive')==true){
            return;
        };
        setButtonStateRunning();
        startTime = Date.now(); //UTCでの jan 01 , 1970 0:0:0から現在までの経過時間をミリ秒単位で取得
        countUp();
        
    });

    stop.addEventListener("click", () => {
        if (stop.classList.contains('inactive')==true){
            return;
        };
        setButtonStateStopped();
        clearTimeout(timeoutId); //setTimeoutでセットしたタイマーを解除
        elapsedTime += Date.now() - startTime;
        
    });

    reset.addEventListener("click", () => {
        if (reset.classList.contains('inactive')==true){
            return;
        };
        setButtonStateInitial();
        timer.textContent ="00:00:000"
        elapsedTime = 0;
        
    });

}

//setButtonStateInitial()を実行、start以外のボタンは押せない
//startボタンをクリックすると現在時刻をstartTimeに代入
//countUp関数を呼び出し
//呼び出した時点での時刻とstartTimeの差をコンソールに表示
//10ミリ秒後に再びcountUp関数の呼び出し


//new Date使い方
//引数の指定がない場合、現在日時でDateオブジェクトを生成
// 引数が2つ以上の整数値で指定されている場合、第一引数から順番に年,月,日,時,分,秒,ミリ秒になる。
// 引数が指定されていない場合、日には1、それ以外には0が設定される。
// 月だけ数値が0始まりになるので注意が必要

// 以下、例
//new Data() 現在時刻を取得
//new Data(2016,(12-1)) 年月取得（月は0～11で表現される。この場合 Dec 01, 2016 00:00:00 となる）
//new Date(2016,(12-1),24) 年月日取得(Dec 24, 2016 00:00:00)