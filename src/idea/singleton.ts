import {Constructor} from "../types/utils";

class OnlyOne {
    private static instance: OnlyOne; // Member variable that will store the OnlyOne instance.

    /**
     * Read only property that can not be modified nor accessed outside of the class.
     */
    private constructor(public readonly name: string) {
    }

    /**
     * If get instance has not been initialized then it will construct a new OnlyOne class object,
     * then store it into the instance property. If it has already been created then it will simply
     * return the instance property.
     * This assures that there will only ever be one instance.
     */
    static getInstance() {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne('The Only One');
        }
        return OnlyOne.instance;
    }

}

type Point<P extends 1 | 2 | 3> = P extends 1 ? { x: number } : P extends 2 ? Point<1> & { y: number } : Point<2> & { z: number }
type Line = [from: number, to: number]

class LineXY {
    _URI = 'Line' as const
    x: Line
    y: Line

    protected constructor(x: Line = [0, 0], y: Line = [0, 0]) {
        this.x = x
        this.y = y
    }

    static New() {
        return new this
    }

    static NewFromPoints(Points: [Point<2>, Point<2>]) {
        const [p1, p2] = Points
        const x: Line = [p1.x, p2.x]
        const y: Line = [p1.y, p2.y]
        return new this(x, y)
    }
}

interface LineXY {
    print():void
}
LineXY.prototype.print = function () {
    console.log("x:", this.x, ' ', "y:", this.y)
}

class LineXYZ extends LineXY {
    z: Line

    protected constructor(x: Line = [0, 0], y: Line = [0, 0], z: Line = [0, 0]) {
        super(x, y)
        this.z = z
    }

    static override NewFromPoints(Points: [Point<3>, Point<3>]) {
        const [p1, p2] = Points
        const x: Line = [p1.x, p2.x]
        const y: Line = [p1.y, p2.y]
        const z: Line = [p1.z, p2.z]
        return new this(x, y, z)
    }
}

const xy1 = LineXY.New()
const xyz1 = LineXYZ.New()
const xy2 = LineXY.NewFromPoints([{x:1, y:1}, {x:2, y:3}])
const xyz2 = LineXYZ.NewFromPoints([{x:1, y:1, z:4}, {x:2, y:3, z:7}])


console.log(xyz1) /*?*/

// const wrongWay = new OnlyOne('The Only One') // Not Possible
const rightWay = OnlyOne.getInstance();
const anotherWay = OnlyOne.getInstance(); // Works too.

const f = {
    new() {
        return {}
    }
}


class Util extends null {

}


const u = new Util