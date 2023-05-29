// Software Engine

class SWEngine{

    constructor(){

    }

    /**
     * 画点
     * @param context 
     * @param x 
     * @param y 
     * @param color 
     */
    drawPoint(context: CanvasRenderingContext2D, x: number, y: number, color : string = "red"){
        if(context){
            context.arc(x, y, 1, 0, Math.PI * 2);
            context.fillStyle = color;
            context.fill();
        }
    }

}

const SwEngine = new SWEngine();

export { SwEngine };