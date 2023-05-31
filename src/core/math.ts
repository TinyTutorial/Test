class Vec2{

    x: number
    y: number

    constructor(x: number = 0, y: number = 0){

        this.x = x;
        this.y = y;

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