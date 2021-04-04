import * as seedrandom from 'seedrandom';

const WIDTH: number = 1920 / 2;
const HEIGHT: number = 1080 / 2;


const srandom = seedrandom('a');

export default class CanvasRenderer{

    colors = ['#df0128', '#ffffff', '#f2d701', '#978d8e', '#0188cc'];
    items: any = [];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    maxSize = 100;

    constructor(canvas: HTMLCanvasElement) {
        
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        let x = -WIDTH;
        let y = HEIGHT / 2;

        for (let i = 0; i < 100; i++) {
            let children = [];
            
            for (let j = 0; j < 5; j++) {
                children.push({
                    color: this.randomColor(), 
                    line: this.randomLine(),
                    size: this.randomSize()
                });
            }

            this.items.push({x, y, children});

            /*
            x += this.maxSize;
            if (x > WIDTH) {
              x = 0;
              y += this.maxSize;
            }
            */
           x += this.maxSize;
        }
    }

    render() {
        this.ctx.fillStyle = '#234698';
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < this.items.length; i++) {
            this.ctx.save();
            let item = this.items[i];
            this.ctx.translate(item.x, item.y);

            for (let j = 0; j < item.children.length; j++) {
                let child = item.children[j];
                this.ctx.beginPath();
                this.ctx.strokeStyle = child.color;
                this.ctx.lineWidth = child.line;
                this.ctx.moveTo(WIDTH, HEIGHT);
                this.ctx.lineTo(-WIDTH, -HEIGHT);
                //this.ctx.arc(0, 0, child.size, 0, 2 * Math.PI);
                this.ctx.stroke();
            }

            this.ctx.restore();
        }
    }

    randomColor() {
        return this.colors[Math.floor(srandom() * this.colors.length)];
    }

    randomSize() {
        return 2 + srandom() * this.maxSize / 3;
    }

    randomLine() {
        return srandom() * 50;
    }
}