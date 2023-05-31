// @ts-ignore
import { SwEngine, Vec2 } from "../../core/swengine";

var canvas: HTMLCanvasElement;
class Vector3{
    
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
    }

}

function init(){
    // drawLine();
    drawWireMesh();
}

async function loadObj(){
    return new Promise(async (resolve) => {
        const response = await fetch("/african_head.obj");
        const data = await response.text();

        let vertices: Vector3[] = [];
        let faces: Vector3[] = [];

        const lines = data.split("\n");
        for(let line of lines){
            const parts = line.trim().split(" ");
            switch(parts[0]){
                case 'v':
                    vertices.push(new Vector3(Number(parts[1]), Number(parts[2]), Number(parts[3])));
                    break;
                case 'f':
                    faces.push(new Vector3(
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

function drawWireMesh(){
    canvas = document.getElementById("Lesson1") as HTMLCanvasElement;
    if(canvas){
        loadObj().then((data: any) => {
            const vertices = data[0];
            const faces    = data[1];
            for(let i = 0; i < faces.length; i++){
                const face = faces[i];
                const v: Vector3[] = [vertices[face.x - 1], vertices[face.y - 1], vertices[face.z - 1]];
                
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



export { init }