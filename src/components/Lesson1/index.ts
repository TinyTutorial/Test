import { SwEngine } from "../../core/swengine";

function drawLine(){

    const canvas = document.getElementById("Lesson1") as HTMLCanvasElement;
    if(canvas){
        SwEngine.drawLine(canvas, 13, 20, 80, 40, "white");
        SwEngine.drawLine(canvas, 20, 13, 40, 80, "red");
        SwEngine.drawLine(canvas, 80, 40, 13, 30, "blue");
    }

}



export { drawLine }