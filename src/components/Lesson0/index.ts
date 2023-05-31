import { SwEngine, Vec2 } from "../../core/swengine";

// 在 (100, 100) 处画点
function draw(){

    const e = document.getElementById("Lesson0");
    if(e){
        const context = (e as any).getContext('2d');
        console.log(context)
        if(context){
            SwEngine.drawPoint(context, new Vec2(100, 100));
        }
    }

}

export { draw }