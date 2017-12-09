import '../css/app.scss';
import $ from "jquery";
import {TweenMax, TweenLite} from 'gsap';
import questions from './questions';

var app = {
  version: 1,
  currentQ: 0,
  board: $("<div class='gameBoard'>"+
           
             "<!--- Scores --->"+
             "<div class='score' id='boardScore'>0</div>"+
             "<div class='score' id='team1' >0</div>"+
             "<div class='score' id='team2' >0</div>"+
           
             "<!--- Question --->"+
             "<div class='questionHolder'>"+
               "<span class='question'></span>"+
             "</div>"+
           
             "<!--- Answers --->"+
             "<div class='colHolder'>"+
               "<div class='col1'></div>"+
               "<div class='col2'></div>"+
             "</div>"+
           
             "<!--- Buttons --->"+
             "<div class='btnHolder'>"+
               "<div id='awardTeam1' data-team='1' class='button'>Award Team 1</div>"+
               "<div id='newQuestion' class='button'>Next Question</div>"+
               "<div id='awardTeam2' data-team='2'class='button'>Award Team 2</div>"+
             "</div>"+
           
           "</div>"),
  // Utility functions
  shuffle: function(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  jsonLoaded: function(data){
    console.clear()
    app.allData   = data
    app.questions = Object.keys(data)
    // app.shuffle(app.questions)
    app.makeQuestion(app.currentQ)
    $('body').append(app.board)
  },
  // Action functions
  makeQuestion: function(qNum){
    var qText  = app.questions[qNum]
    var qAnswr = app.allData[qText]

    var qNum = qAnswr.length
        qNum = (qNum<8)? 8: qNum;
        qNum = (qNum % 2 != 0) ? qNum+1: qNum;
    
    var boardScore = app.board.find("#boardScore")
    var question   = app.board.find(".question")
    var col1       = app.board.find(".col1")
    var col2       = app.board.find(".col2")
    
    boardScore.html(0)
    question.html(qText.replace(/&x22;/gi,'"'))
    col1.empty()
    col2.empty()

    for (var i = 0; i < qNum; i++){
      var aLI     
      if(qAnswr[i]){
        aLI = $("<div class='cardHolder'>"+
                  "<div class='card'>"+
                    "<div class='front'>"+
                      "<span class='DBG'>"+(i+1)+"</span>"+
                    "</div>"+
                    "<div class='back DBG'>"+
                      "<span>"+qAnswr[i][0]+"</span>"+
                      "<b class='LBG'>"+qAnswr[i][1]+"</b>"+
                    "</div>"+
                  "</div>"+
                "</div>")
      } else {
        aLI = $("<div class='cardHolder empty'><div></div></div>")
      }
      var parentDiv = (i<(qNum/2))? col1: col2;
      $(aLI).appendTo(parentDiv)
    }  
    
    var cardHolders = app.board.find('.cardHolder')
    var cards       = app.board.find('.card')
    var backs       = app.board.find('.back')
    var cardSides   = app.board.find('.card>div')

    TweenLite.set(cardHolders , {perspective:800});
    TweenLite.set(cards       , {transformStyle:"preserve-3d"});
    TweenLite.set(backs       , {rotationX:180});
    TweenLite.set(cardSides   , {backfaceVisibility:"hidden"});

    cards.data("flipped", false)
    cards.data("scored", false)
    
    function showCard(){
      var card = $('.card', this)
      var flipped = $(card).data("flipped")
      var cardRotate = (flipped)?0:-180;
      TweenLite.to(card, 1, {rotationX:cardRotate, ease:Back.easeOut})
      flipped = !flipped
      $(card).data("flipped", flipped)
      app.getBoardScore()
    }
    cardHolders.on('click',showCard)
  },
  getBoardScore: function(){
    var cards = app.board.find('.card')
    var boardScore = app.board.find('#boardScore')
    var currentScore = {var: boardScore.html()}
    var score = 0
    function tallyScore(){
      if($(this).data("flipped")){
         if (!$(this).data("scored")) {
            var value = $(this).find("b").html()
            score += parseInt(value)
         }
      }
    }
    $.each(cards, tallyScore)      
    TweenMax.to(currentScore, 1, {
      var: score, 
      onUpdate: function () {
        boardScore.html(Math.round(currentScore.var));
      },
      ease: Power3.easeOut,
    });
  },
  awardPoints: function(num){
    var cards = app.board.find('.card')
    var num          = $(this).attr("data-team")
    var boardScore   = app.board.find('#boardScore')
    var currentScore = {var: parseInt(boardScore.html())}
    var team         = app.board.find("#team"+num)
    var teamScore    = {var: parseInt(team.html())}
    var teamScoreUpdated = (teamScore.var + currentScore.var)
    TweenMax.to(teamScore, 1, {
      var: teamScoreUpdated, 
      onUpdate: function () {
        team.html(Math.round(teamScore.var));
      },
      ease: Power3.easeOut,
    });
    
    TweenMax.to(currentScore, 1, {
      var: 0, 
      onUpdate: function () {
        boardScore.html(Math.round(currentScore.var));
      },
      ease: Power3.easeOut,
    });
    function markScored(){
        if($(this).data("flipped")){
            $(this).data("scored", true) 
        }
    }
    $.each(cards, markScored)
  },
  changeQuestion: function(){
    app.currentQ++
    app.makeQuestion(app.currentQ)
  },
  // Inital function
  init: function(){
    app.jsonLoaded(questions)
    app.board.find('#newQuestion' ).on('click', app.changeQuestion)
    app.board.find('#awardTeam1'  ).on('click', app.awardPoints)
    app.board.find('#awardTeam2'  ).on('click', app.awardPoints)
  }  
}
app.init()
//http://www.qwizx.com/gssfx/usa/ff.htm
