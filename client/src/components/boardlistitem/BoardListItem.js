import React, {useRef, useState, useEffect} from "react";
import "./BoardListItem.css" 

const BoardListItem = ({boardInfo, author, lastModified, goToBoard}) =>{
    const [boardData, setBoardData] = useState(boardInfo);
    const canvasRef = useRef(null);
    const socketRef = useRef();
    
    //console.log(stuff.boardData[0].boardData[0].b1[0].x0)

    useEffect(() => {
        //console.log("board data " + (boardData[0].boardData[1][0]))
        //console.log("board data " + (boardData.boardData[0]))
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        const drawLine = (x0, y0, x1, y1, color, emit) => {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();
            context.closePath(); 
        };

        const onResize = () => {
        let {width, height} = canvas.getBoundingClientRect();
        if(canvas.width !== width || canvas.height !== height){
            canvas.width = width;
            canvas.height = height;
            }
        };

        window.addEventListener('resize', onResize, false);
        onResize();
        
        for (var i in boardData.boardData){
            drawLine(boardData.boardData[i][0], boardData.boardData[i][1], boardData.boardData[i][2], boardData.boardData[i][3], boardData.boardData[i][4]);
        }
        //drawLine(boardData.boardData[0][0], boardData.boardData[0][1], boardData.boardData[0][2], boardData.boardData[0][3], boardData.boardData[0][4]);
        //drawLine(boardData.boardData[1][0], boardData.boardData[1][1], boardData.boardData[1][2], boardData.boardData[1][3], boardData.boardData[1][4]);
        console.log("drew the line dude")

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

   
    return (
        <div className="listItem">
            <div className="imgContainer">
                <canvas ref={canvasRef} className="canvas-sm" />
            </div>
            <div className="infoContainer"> 
                <p id="author"> {author} </p>
                <p id="lastModified"> {lastModified} </p>
            <button className="goToBoard"
            type="button"
            onClick={() => goToBoard(boardData._id)}
            >
            go to board
            </button> 
            </div>
            
        </div>
    )
       
}

export default BoardListItem;