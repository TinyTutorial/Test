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
    drawLine(canvas: HTMLCanvasElement, p0: Vec2, p1: Vec2, color: string = "red"){
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

    drawTriangle(canvas: HTMLCanvasElement, v0: Vec2, v1: Vec2, v2: Vec2, color: string = "red", fill: boolean = false){
        
        this.drawLine(canvas, v0, v1, color);
        this.drawLine(canvas, v1, v2, color);
        this.drawLine(canvas, v2, v0, color);

        // 填充三角形
        if(fill){
            // 获取三角形最小的包围盒
            let min: Vec2 = v0.clone();
            let max: Vec2 = v0.clone();
            if(min.x > v1.x){ min.x = v1.x; }
            if(min.x > v2.x){ min.x = v2.x; }
            if(min.y > v1.y){ min.y = v1.y; }
            if(min.y > v2.y){ min.y = v2.y; }
            if(max.x < v1.x){ max.x = v1.x; }
            if(max.x < v2.x){ max.x = v2.x; }
            if(max.y < v1.y){ max.y = v1.y; }
            if(max.y < v2.y){ max.y = v2.y; }

            // 画出包围盒
            // this.drawLine(canvas, min, new Vec2(max.x, min.y), "pink");
            // this.drawLine(canvas, new Vec2(max.x, min.y), max, "pink");
            // this.drawLine(canvas, max, new Vec2(min.x, max.y), "pink");
            // this.drawLine(canvas, new Vec2(min.x, max.y), min, "pink");

            // v0 - v1
            const v01 = v1.clone().sub(v0);
            const v12 = v2.clone().sub(v1);
            const v20 = v0.clone().sub(v2);

            // 遍历包围盒，判断点是否在三角形内部
            for(let x = min.x; x <= max.x; x++){
                for(let y = min.y; y <= max.y; y++){
                    const p: Vec2 = new Vec2(x, y);

                    const v0p: Vec2 = p.clone().sub(v0)
                    const v1p: Vec2 = p.clone().sub(v1);
                    const v2p: Vec2 = p.clone().sub(v2);
                    const c0 = v01.cross(v0p)
                    const c1 = v12.cross(v1p);
                    const c2 = v20.cross(v2p);

                    if((c0 > 0 && c1 > 0 && c2 > 0) || 
                       (c0 < 0 && c1 < 0 && c2 < 0)){
                        // 在三角形内部
                          //颜色对象
                        this.drawPoint(canvas, p, color);
                    }
                }
            }
        }

    }

}

const SwEngine = new SWEngine();

export { SwEngine }
export { Vec2, Vec3 }