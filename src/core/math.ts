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

    sub(v: Vec3){

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;

    }

    dot(v: Vec3){
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v: Vec3){
        const ax = this.x, ay = this.y, az = this.z;
		const bx = v.x, by = v.y, bz = v.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;
    }

    length(){
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

    normalize(){
        const length = this.length();
        this.x *= (1 / length);
        this.y *= (1 / length);
        this.z *= (1 / length);
        return this;
    }

    clone(){
        return new Vec3(this.x, this.y, this.z);
    }

}

export { Vec2, Vec3 }