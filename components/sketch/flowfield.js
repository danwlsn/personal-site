import React, { Component } from 'react';
const scl = 50;
const particleCount = 300;
let zoff = 0;
let cols, rows;

const inc = 0.1;
const time = 0.01;

let fr;
let particles = [];
let flowfield;

function Particle(p5) {
  this.p5 = p5;
  this.pos = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
  this.vel = this.p5.createVector(0,0);
  this.acc = this.p5.createVector(0,0);
  this.maxspeed = 1.5;
  this.color = 'hsla(50, 100%, 50%, 0.3)';

  this.prevPos = this.pos.copy();
  

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    this.p5.stroke(this.color);
    this.p5.strokeWeight(1);
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
    this.updateColor();
  }

  this.updatePrev = function() {
    this.prevPos = this.pos;
  }

  this.updateColor = function() {
    this.p5.noiseDetail(8, 0.65);
    let lum = Math.floor(this.p5.noise(this.pos.x, this.pos.y) * 360);
    //this.color = 'hsla('+ lum + ', 100%, 50%, 0.3)';
    this.color = 'hsla(50, ' + lum + '%, 50%, 0.3)';
  }

  this.edges = function() {
    if (this.pos.x > this.p5.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0){
      this.pos.x = this.p5.width;
      this.updatePrev();
    }
    if (this.pos.y > this.p5.height){
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0){
      this.pos.y = this.p5.height;
      this.updatePrev();
    }
  }

  this.follow = function(vectors) {
    var x = Math.floor(this.pos.x / scl);
    var y = Math.floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}


class Flowfield extends Component {
  constructor(){
    super()
    this.renderRef = React.createRef()
  }

  componentDidMount(){
    const p5 = require("p5");
    this.sketch = new p5( p => {

      p.setup = ()  => {
        if (window.innerWidth < 600) {
          p.createCanvas(window.innerWidth-50, window.innerWidth-50);
        } else {
          p.createCanvas(600, 600);
        }

        p.pixelDensity(1);
        cols = Math.floor(p.width / scl);
        rows = Math.floor(p.height / scl);
        fr = p.createP('');
        flowfield = new Array(cols * rows);

        for (var i = 0; i < particleCount; i++) {
          particles[i] = new Particle(p);
        }

        p.background(0);

      }

      p.draw = () => {
        let yoff = 0;
        for (var y = 0; y < rows; y++){
          var xoff = 0;
          for (var x = 0; x < cols; x++){
            var index = x + y * cols;
            var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.2);
            flowfield[index] = v;
            xoff += inc;

          }
          yoff += inc;
        }
        zoff += time;

        for (var i = 0; i < particles.length; i++){
          particles[i].follow(flowfield);
          particles[i].update();
          particles[i].edges();
          particles[i].show();
        }

      }
    });


  }
  render(){

    return (
      <>
        <div ref={this.renderRef}></div>

        <p className="text-xl font-thin mb-2 text-center">Particles on a flowfield. A demonstration of noise.</p>
      </>
    );
  }
}

export default Flowfield;
