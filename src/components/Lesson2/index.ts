// @ts-ignore
import { SwEngine, Vec2, Vec3 } from "../../core/swengine";

var canvas: HTMLCanvasElement;

function init(){
    canvas = document.getElementById("Lesson1") as HTMLCanvasElement;
    
    // drawLine();
    
    // drawWireMesh();
    
    drawTriangle();
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

// @ts-expect-error
function drawWireMesh(){
    
    if(canvas){
        loadObj().then((data: any) => {
            const vertices = data[0];
            const faces    = data[1];
            for(let i = 0; i < faces.length; i++){
                const face = faces[i];
                const v: Vec3[] = [vertices[face.x - 1], vertices[face.y - 1], vertices[face.z - 1]];
                
                for(let j = 0; j < 3; j++){
                    const x0 = (v[j].x + 1) * canvas.clientWidth / 2;
                    const y0 = (v[j].y + 1) * canvas.clientHeight / 2;

                    const x1 = (v[(j + 1) % 3].x + 1) * canvas.clientWidth / 2;
                    const y1 = (v[(j + 1) % 3].y + 1) * canvas.clientHeight / 2;
                    SwEngine.drawLine(canvas, new Vec2(x0, y0), new Vec2(x1, y1), "white");
                }
            }
        });
    }
}

function drawTriangle(){

    SwEngine.drawTriangle(canvas, new Vec2(10, 70),   new Vec2(50, 160),  new Vec2(70, 80),   "red",   true);
    SwEngine.drawTriangle(canvas, new Vec2(180, 50),  new Vec2(150, 1),   new Vec2(70, 180),  "white", true);
    SwEngine.drawTriangle(canvas, new Vec2(180, 150), new Vec2(120, 160), new Vec2(130, 180), "green", true);

}



export { init }