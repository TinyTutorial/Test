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
    drawPoint(canvas: HTMLCanvasElement, x: number, y: number, color : string = "red"){
        const context = canvas.getContext("2d");
        if(context){
            const h = canvas.clientHeight;
            context.beginPath();
            context.arc(x, h - y, 1, 0, Math.PI * 2);
            context.fillStyle = color;
            context.fill();
            context.closePath();
        }
    }

    /**
     * 画线
     * @param canvas 
     * @param x0 
     * @param y0 
     * @param x1 
     * @param y1 
     * @param color 
     */
    drawLine(canvas: HTMLCanvasElement, x0: number, y0: number, x1: number, y1: number, color : string = "red"){
        function swap(a: number, b: number){
            return [b, a];
        }
        let steep = false;
        if(Math.abs(x0 - x1) < Math.abs(y0 - y1)){
            [x0, y0] = swap(x0, y0);
            [x1, y1] = swap(x1, y1);
            steep = true;
        }
        if(x0 > x1){
            [x0, x1] = swap(x0, x1);
            [y0, y1] = swap(y0, y1);
        }
        let dx = x1 - x0;
        let dy = y1 - y0;
        let derror2 = Math.abs(dy) * 2;
        let error2 = 0;
        let y = y0;
        for(let x = x0; x <= x1; x++){
            if(steep){
                this.drawPoint(canvas, y, x, color);
            }else{
                this.drawPoint(canvas, x, y, color);
            }
            error2 += derror2;

            if(error2 > dx){
                y += (y1 > y0? 1: -1);
                error2 -= dx * 2;
            }
        }
    }

}

const SwEngine = new SWEngine();

export { SwEngine };