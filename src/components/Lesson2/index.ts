// @ts-ignore
import { SwEngine, Vec2, Vec3 } from "../../core/swengine";

var canvas: HTMLCanvasElement;

function init(){
    canvas = document.getElementById("Lesson1") as HTMLCanvasElement;
    
    // drawLine();
    
    drawWireMesh();
    
    // drawTriangle();
}

async function loadObj(){
    return new Promise(async (resolve) => {
        const response = await fetch("/african_head.obj");
        const data = await response.text();

        let vertices: Vec3[] = [];
        let faces: Vec3[] = [];

        const lines = data.split("\n");
        for(let line of lines){
            const parts = line.trim().split(" ");
            switch(parts[0]){
                case 'v':
                    vertices.push(new Vec3(Number(parts[1]), Number(parts[2]), Number(parts[3])));
                    break;
                case 'f':
                    faces.push(new Vec3(
                        Number(parts[1].split("/")[0]),
                        Number(parts[2].split("/")[0]),
                        Number(parts[3].split("/")[0])));
                    break;
            }
        }
        resolve([vertices, faces]);
    });
}

// @ts-expect-error
function drawLine(){

    const canvas = document.getElementById("Lesson1") as HTMLCanvasElement;
    if(canvas){
        SwEngine.drawLine(canvas, new Vec2(13, 20), new Vec2(80, 40), "white");
        SwEngine.drawLine(canvas, new Vec2(20, 13), new Vec2(40, 80), "red");
        SwEngine.drawLine(canvas, new Vec2(80, 40), new Vec2(13, 30), "blue");
    }

}

function Color(value: number){
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(value * 255);
    const b = Math.floor(value * 255);
    return 'rgba('+ r +','+ g +','+ b +',0.8)';
}

function drawWireMesh(){

    const light: Vec3 = new Vec3(0, 0, -1);
    if(canvas){
        loadObj().then((data: any) => {
            const vertices = data[0];
            const faces    = data[1];
            for(let i = 0; i < faces.length; i++){
                const face = faces[i];
                const v: Vec3[] = [vertices[face.x - 1], vertices[face.y - 1], vertices[face.z - 1]];
                
                // 计算三角形的法向量
                const v02 = v[2].clone().sub(v[0]);
                const v01 = v[1].clone().sub(v[0]);
                const n = v02.clone().cross(v01).normalize();
                // 计算法向量在光线上的投影
                let intensity = n.dot(light)

                if(intensity > 0){
                    // NDC 归一化坐标
                    const v0 = new Vec3(
                        (v[0].x + 1) * canvas.clientWidth / 2,
                        (v[0].y + 1) * canvas.clientHeight / 2,
                        v[0].z);
                    const v1 = new Vec3(
                        (v[1].x + 1) * canvas.clientWidth / 2,
                        (v[1].y + 1) * canvas.clientHeight / 2,
                        v[1].z);
                    const v2 = new Vec3(
                        (v[2].x + 1) * canvas.clientWidth / 2,
                        (v[2].y + 1) * canvas.clientHeight / 2,
                        v[2].z);
                    SwEngine.drawTriangle(canvas, v0, v1, v2, Color(intensity), true);
                }
            }
        });
    }
}

export { init }