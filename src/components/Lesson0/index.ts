import { SwEngine } from "../../core/swengine";

function draw(){

    const e = document.getElementById("Lesson0");
    if(e){
        const context = (e as any).getContext('2d');
        console.log(context)
        if(context){
            SwEngine.drawPoint(context, 100, 100);
        }
    }

}

export { draw }