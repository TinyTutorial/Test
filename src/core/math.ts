class Vec2{

    x: number
    y: number

    constructor(x: number = 0, y: number = 0){

        this.x = x;
        this.y = y;

    }

    sub(v: Vec2){

        this.x -= v.x;
        this.y -= v.y;
        return this;

    }

    cross(v: Vec2){

        return this.x * v.y - this.y * v.x;

    }

    clone(){
        return new Vec2(this.x, this.y);
    }

}

class Vec3{

    x: number
    y: number
    z: number

    constructor(x: number = 0, y: number = 0, z: number = 0){

        this.x = x;
        this.y = y;
        this.z = z;

    }

    clone(){
        return new Vec3(this.x, this.y, this.z);
    }

}

export { Vec2, Vec3 }