const boxes= document.querySelectorAll(".box");
const gameinfo= document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];

    //Empty the display
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    })
    newGamebtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currPlayer}`;
}

initGame();

function swapTurns(){
    if(currPlayer=="X"){
        currPlayer="O";
    }
    else{
        currPlayer="X";
    }
    gameinfo.innerText=`Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="" ) && ((gameGrid[position[0]]) === gameGrid[position[1]] && gameGrid[position[1]]==gameGrid[position[2]])){

            if(gameGrid[position[0]]==="X")
                answer="X";
            else{
                answer="O";
            }
            // disable pointers 
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        gameinfo.innerText=`Winner Player - ${answer}`;
        newGamebtn.classList.add("active");
        return ;
    }

    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameinfo.innerText="Game Tied !";
        newGamebtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        // Swap the turns
        swapTurns();

        //Check gameover
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);
