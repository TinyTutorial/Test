import { Vec2, Vec3 } from "./math";
// Software Rendering Engine
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
    drawPoint(canvas: HTMLCanvasElement, p: Vec2, color : string = "red"){
        const context = canvas.getContext("2d");
        if(context){
            const h = canvas.clientHeight;
            context.beginPath();
            context.arc(p.x, h - p.y, 1, 0, Math.PI * 2);
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
    drawLine(canvas: HTMLCanvasElement, p0: Vec2, p1: Vec2, color : string = "red"){
        let pt0 = p0.clone();
        let pt1 = p1.clone();
        function swap(a: number, b: number){
            return [b, a];
        }
        let steep = false;
        if(Math.abs(pt0.x - pt1.x) < Math.abs(pt0.y - pt1.y)){
            [pt0.x, pt0.y] = swap(pt0.x, pt0.y);
            [pt1.x, pt1.y] = swap(pt1.x, pt1.y);
            steep = true;
        }
        if(pt0.x > pt1.x){
            [pt0.x, pt1.x] = swap(pt0.x, pt1.x);
            [pt0.y, pt1.y] = swap(pt0.y, pt1.y);
        }
        let dx = pt1.x - pt0.x;
        let dy = pt1.y - pt0.y;
        let derror2 = Math.abs(dy) * 2;
        let error2 = 0;
        let y = pt0.y;
        for(let x = pt0.x; x <= pt1.x; x++){
            if(steep){
                this.drawPoint(canvas, new Vec2(y, x), color);
            }else{
                this.drawPoint(canvas, new Vec2(x, y), color);
            }
            error2 += derror2;

            if(error2 > dx){
                y += (pt1.y > pt0.y? 1: -1);
                error2 -= dx * 2;
            }
        }
    }

    drawTriangle(canvasL: HTMLCanvasElement){
        
    }

}

const SwEngine = new SWEngine();

export { SwEngine }
export { Vec2, Vec3 }