import { Vec2, Vec3 } from "./math";
// Software Rendering Engine
class SWEngine{

    width: number
    height:number
    zBuffer: number[]

    constructor(){

        this.width = 400;
        this.height= 400;
        this.zBuffer = new Array(this.width * this.height).fill(Number.MAX_VALUE);

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

    drawTriangle(canvas: HTMLCanvasElement, A: Vec3, B: Vec3, C: Vec3, color: string = "red", fill: boolean = false){
        
        const v0: Vec2 = new Vec2(A.x, A.y);
        const v1: Vec2 = new Vec2(B.x, B.y);
        const v2: Vec2 = new Vec2(C.x, C.y);

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

            // Tips：包围盒如果不向上向下取整的话，会出现最大最小值是小数，这样在渲染的时候可能会出现空洞
            min.x = Math.floor(min.x);
            min.y = Math.floor(min.y);
            max.x = Math.ceil(max.x);
            max.y = Math.ceil(max.y);

            // 画出包围盒
            const drawBoundingBox = false;
            if(drawBoundingBox){
                this.drawLine(canvas, min, new Vec2(max.x, min.y), "pink");
                this.drawLine(canvas, new Vec2(max.x, min.y), max, "pink");
                this.drawLine(canvas, max, new Vec2(min.x, max.y), "pink");
                this.drawLine(canvas, new Vec2(min.x, max.y), min, "pink");
            }

            let useBarycentric: Boolean = true;
            if(!useBarycentric){
                {
                    // 向量叉乘法判断点是否在三角形内部
                    // v0 - v1
                    const v01 = v1.clone().sub(v0);
                    const v12 = v2.clone().sub(v1);
                    const v20 = v0.clone().sub(v2);
    
                    // 遍历包围盒，判断点是否在三角形内部
                    for(let x = min.x; x <= max.x; x+=1){
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
            }else{
                // 重心坐标系发求解点是否在三角形内部
                // 遍历包围盒
                for(let x = min.x; x <= max.x; x++){
                    for(let y = min.y; y <= max.y; y++){
                        const p: Vec3 = new Vec3(x, y, 0);

                        const bc_scree: Vec3 = this.barycentric(A, B, C, p);
                        if(bc_scree.x > 0 && bc_scree.x < 1 && 
                           bc_scree.y > 0 && bc_scree.y < 1 &&
                           bc_scree.z > 0 && bc_scree.z < 1){
                            // 插值求解三角形内部每个点的 z 值
                            p.z = -(bc_scree.x * A.z + bc_scree.y * B.z + bc_scree.z * C.z);
                                      
                            const index = y * this.width + x;
                            if(p.z < this.zBuffer[index]){
                                this.zBuffer[index] = p.z;
                                this.drawPoint(canvas, new Vec2(p.x, p.y), color);
                            }
                        }
                    }
                }
            }
        }else{
            this.drawLine(canvas, v0, v1, color);
            this.drawLine(canvas, v1, v2, color);
            this.drawLine(canvas, v2, v0, color);
        }

    }

    /**
     * 计算中心坐标 
     * @param v0 
     * @param v1 
     * @param v2 
     * @param v 
     * @returns 
     */
    barycentric(A: Vec3, B: Vec3, C: Vec3, P: Vec3){
        
        const v0 = B.clone().sub(A);
        const v1 = C.clone().sub(A);
        const v2 = P.clone().sub(A);

        const d00 = v0.clone().dot(v0);
        const d01 = v0.clone().dot(v1);
        const d11 = v1.clone().dot(v1);
        const d20 = v2.clone().dot(v0);
        const d21 = v2.clone().dot(v1);

        const denom = d00 * d11 - d01 * d01;
        const v = (d11 * d20 - d01 * d21) / denom;
        const w = (d00 * d21 - d01 * d20) / denom;
        const u = 1.0 - v - w;
        
        return new Vec3(u, v, w);  
    }

}

const SwEngine = new SWEngine();

export { SwEngine }
export { Vec2, Vec3 }