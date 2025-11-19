// src/components/splash/DigitalRain.tsx
import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

// Based on the user's high-end monitor, we can use a higher density of streams
const FADE_INTERVAL = 1.6;
const STREAM_FONT_SIZE = 20;
const STREAMS_PER_INCH = 1.5; // Density control

// Estimate streams based on a common high-res screen width (e.g., 2560px) and density
const screenWidthInches = 27; // common monitor size
const estimatedStreams = Math.floor(screenWidthInches * STREAMS_PER_INCH * 5); // Heuristic multiplier

class Symbol {
    private x: number;
    private y: number;
    private speed: number;
    private switchInterval: number;
    private first: boolean;
    private value: string = '';

    constructor(x: number, y: number, speed: number, first: boolean) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.switchInterval = Math.round(Math.random() * 10 + 2);
        this.first = first;
        this.setToRandomSymbol();
    }

    public setToRandomSymbol() {
        if (Math.random() > 0.1) {
            // Katakana
            this.value = String.fromCharCode(0x30A0 + Math.round(Math.random() * 96));
        } else {
            // Numeric
            this.value = String.fromCharCode(0x0030 + Math.round(Math.random() * 9));
        }
    }

    public rain(p5: p5Types, streamLength: number) {
        this.y = (this.y >= p5.height) ? 0 : this.y + this.speed;
    }

    public render(p5: p5Types, streamLength: number) {
        const isLast = this.y > p5.height - (p5.height / streamLength) * 2;
        if (this.first && !isLast) {
            p5.fill(180, 255, 180);
        } else {
            p5.fill(0, 255, 70);
        }
        p5.text(this.value, this.x, this.y);

        if (p5.frameCount % this.switchInterval === 0) {
            this.setToRandomSymbol();
        }
    }
}

class Stream {
    private symbols: Symbol[] = [];
    private totalSymbols: number;
    private speed: number;

    constructor(p5: p5Types, x: number) {
        this.totalSymbols = Math.round(Math.random() * 20 + 5);
        this.speed = Math.random() * 5 + 2;
        this.generateSymbols(p5, x, Math.random() * -1000);
    }

    private generateSymbols(p5: p5Types, x: number, y: number) {
        let first = Math.random() > 0.7;
        for (let i = 0; i <= this.totalSymbols; i++) {
            const symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= STREAM_FONT_SIZE;
            first = false;
        }
    }

    public render(p5: p5Types) {
        this.symbols.forEach(symbol => {
            symbol.render(p5, this.totalSymbols);
            symbol.rain(p5, this.totalSymbols);
        });
    }
}


export const DigitalRain: React.FC = () => {
    let streams: Stream[] = [];

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        p5.background(0);
        p5.textSize(STREAM_FONT_SIZE);

        let x = 0;
        for (let i = 0; i <= p5.width / STREAM_FONT_SIZE; i++) {
            const stream = new Stream(p5, x);
            streams.push(stream);
            x += STREAM_FONT_SIZE;
        }
    };

    const draw = (p5: p5Types) => {
        p5.background(0, 150);
        streams.forEach(stream => {
            stream.render(p5);
        });
    };

    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
        </div>
    );
};
