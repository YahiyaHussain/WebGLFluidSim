var I=Object.defineProperty;var N=(h,t,i)=>t in h?I(h,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[t]=i;var n=(h,t,i)=>(N(h,typeof t!="symbol"?t+"":t,i),i);import{r as R,j as b,A as O,a as f,b as k,T as U,c as K,C as z,S as D,B as Y,F as W,I as q,d as V,M as H,R as P,e as $}from"./vendor.84f156a2.js";const j=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}};j();var v=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,J=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538
uniform vec2 u_viewportCoord;
out vec4 color;

 
void main() {

   vec2 uv_coord = gl_FragCoord.xy / u_viewportCoord.xy;

   color = vec4(uv_coord.x, uv_coord.y, sin(uv_coord.x * 1. * PI), 1.);
}
`;function E(h,t,i){var e=h.createShader(t);if(e){h.shaderSource(e,i),h.compileShader(e);var r=h.getShaderParameter(e,h.COMPILE_STATUS);if(r)return e;console.log(h.getShaderInfoLog(e)),h.deleteShader(e)}console.error("Shader creation borked")}function F(h,t,i){var e=h.createProgram();if(e){h.attachShader(e,t),h.attachShader(e,i),h.linkProgram(e);var r=h.getProgramParameter(e,h.LINK_STATUS);if(r)return e;console.log(h.getProgramInfoLog(e)),h.deleteProgram(e)}console.error("Shader program borked")}function _(h,t,i){const e=E(h,h.VERTEX_SHADER,t),r=E(h,h.FRAGMENT_SHADER,i);if(!e){const o="failed to make vertex shader";console.error(o),alert(o);return}if(!r){const o="failed to make vertex shader";console.error(o),alert(o);return}const s=F(h,e,r);if(!s){const o="failed to make shader program";console.error(o),alert(o);return}if(h.linkProgram(s),!h.getProgramParameter(s,h.LINK_STATUS))throw"Program link failed with: "+h.getProgramInfoLog(s);return s}function x(h){const t=h.getContext("webgl2");return t===null?(alert("Unable to initialize WebGL. Your browser or machine may not support it."),null):t}class L{constructor(t,i){if(this.x=t,this.y=i,t<-1||t>1||i<-1||i>1)throw"constructed invalid clip point";this.x=t,this.y=i}static fromUVPoint(t){return new L(t.x*2-1,t.y*2-1)}}class l{constructor(t,i){if(this.x=t,this.y=i,t<0||t>1||i<0||i>1)throw"constructed invalid clip point";this.x=t,this.y=i}}function p(h,t,i){h.bindBuffer(h.ARRAY_BUFFER,t);let e=[];for(let r of i){const s=L.fromUVPoint(r);e.push(s.x),e.push(s.y)}h.bufferData(h.ARRAY_BUFFER,new Float32Array(e),h.STATIC_DRAW),h.bindBuffer(h.ARRAY_BUFFER,null)}function B(h,t,i){h.bindBuffer(h.ARRAY_BUFFER,t);let e=[];for(let r of i)e.push(r.x),e.push(r.y);h.bufferData(h.ARRAY_BUFFER,new Float32Array(e),h.STATIC_DRAW),h.bindBuffer(h.ARRAY_BUFFER,null)}class Q{constructor(t,i,e){this.res_x=t,this.res_y=i,this.grid_spacing=e}}var d;(function(h){h[h.Basic=0]="Basic",h[h.Conway=1]="Conway",h[h.Grid=2]="Grid",h[h.Ring=3]="Ring",h[h.Sequencer=4]="Sequencer",h[h.Sine=5]="Sine"})(d||(d={}));class X{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");const e=x(t);if(!e)throw"Could not create webgl2 context";this.gl=e,this.width=i.res_x,this.height=i.res_y,this.setup()}setup(){const t=E(this.gl,this.gl.VERTEX_SHADER,v),i=E(this.gl,this.gl.FRAGMENT_SHADER,J);if(!t){const o="failed to make vertex shader";console.error(o),alert(o);return}if(!i){const o="failed to make vertex shader";console.error(o),alert(o);return}const e=F(this.gl,t,i);if(!e){const o="failed to make shader program";console.error(o),alert(o);return}this.gl.clearColor(.1,.5,.8,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.canvas.width=this.width,this.gl.canvas.height=this.height;let r=[new l(0,0),new l(1,0),new l(1,1)],s=[new l(0,1),new l(0,0),new l(1,1)];this.set_geometry(r.concat(s),e),this.gl.viewport(0,0,this.width,this.height),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}set_geometry(t,i){this.gl.useProgram(i);var e=this.gl.getUniformLocation(i,"u_viewportCoord");this.gl.uniform2fv(e,[this.width,this.height]);var r=this.gl.createBuffer();if(!r){const m="failed to make position buffer";console.error(m),alert(m);return}p(this.gl,r,t);var s=this.gl.getAttribLocation(i,"a_position");this.gl.enableVertexAttribArray(s),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r);var o=2,a=this.gl.FLOAT,g=!1,u=0,c=0;this.gl.vertexAttribPointer(s,o,a,g,u,c)}render(){var t=this.gl.TRIANGLES,i=0,e=6;this.gl.drawArrays(t,i,e)}debugRender(){this.render()}}var w=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
uniform float u_angle_rad;
out vec4 color;

 
void main() {
   vec2 uv_coord = floor(gl_FragCoord.xy) / u_viewportCoord.xy;
   color = vec4((uv_coord.x * sin(u_angle_rad)+1.)/2., uv_coord.y * (cos(u_angle_rad)+1.)/2., uv_coord.x * (uv_coord.y*sin(u_angle_rad)+1.)/2., 1.) / 1.1;
}
`;class Z{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"program");n(this,"time");const e=x(t);if(!e)throw"Could not create webgl2 context";this.gl=e,this.time=0,this.gl=e,this.width=e.canvas.clientWidth,this.height=e.canvas.clientHeight;let r=this.setupShaders();if(!r)throw"Could not create shader program";this.program=r,this.setup()}setup(){this.gl.clearColor(.1,.5,.8,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.canvas.width=this.width,this.gl.canvas.height=this.height;let t=[new l(0,0),new l(1,0),new l(1,1)],i=[new l(0,1),new l(0,0),new l(1,1)];this.setupGeometry(t.concat(i),this.program),this.gl.viewport(0,0,this.width,this.height),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}setupShaders(){const t=E(this.gl,this.gl.VERTEX_SHADER,v),i=E(this.gl,this.gl.FRAGMENT_SHADER,w);if(!t){const r="failed to make vertex shader";console.error(r),alert(r);return}if(!i){const r="failed to make vertex shader";console.error(r),alert(r);return}const e=F(this.gl,t,i);if(!e){const r="failed to make shader program";console.error(r),alert(r);return}return e}setupGeometry(t,i){this.gl.useProgram(i);var e=this.gl.getUniformLocation(i,"u_viewportCoord");this.gl.uniform2fv(e,[this.width,this.height]);var r=this.gl.createBuffer();if(!r){const m="failed to make position buffer";console.error(m),alert(m);return}p(this.gl,r,t);var s=this.gl.getAttribLocation(i,"a_position");this.gl.enableVertexAttribArray(s),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r);var o=2,a=this.gl.FLOAT,g=!1,u=0,c=0;this.gl.vertexAttribPointer(s,o,a,g,u,c)}render(){var t=this.gl.TRIANGLES,i=0,e=6,r=this.gl.getUniformLocation(this.program,"u_angle_rad");this.time=(this.time+1)%300,this.gl.uniform1f(r,2*Math.PI*this.time/300),this.gl.drawArrays(t,i,e)}debugRender(){this.render()}}var A=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`,tt=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform int u_spacing;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    int x_index = int(gl_FragCoord.x - 0.5);
    int y_index = int(gl_FragCoord.y - 0.5);

    if (x_index % (u_spacing + 1) == 0 || y_index % (u_spacing + 1) == 0) {
        out_color = vec4(0, 0, 0, 1.);
        return;
    }
    out_color = texture(u_texture, v_texcoord);

}
`;class it{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"spacing");n(this,"program");n(this,"gridProgram");const e=x(t);if(!e)throw"Could not create webgl2 context";this.gl=e,this.width=i.res_x,this.height=i.res_y,this.spacing=i.grid_spacing;let r=this.compileShaders(v,w);if(!r)throw"Could not create shader program";let s=this.compileShaders(A,tt);if(!s)throw"Could not create grid shader program";this.program=r,this.gridProgram=s,this.setup()}setup(){this.gl.clearColor(.1,.5,.8,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}compileShaders(t,i){const e=E(this.gl,this.gl.VERTEX_SHADER,t),r=E(this.gl,this.gl.FRAGMENT_SHADER,i);if(!e){const o="failed to make vertex shader";console.error(o),alert(o);return}if(!r){const o="failed to make vertex shader";console.error(o),alert(o);return}const s=F(this.gl,e,r);if(!s){const o="failed to make shader program";console.error(o),alert(o);return}return s}setupGeometry(t){this.gl.useProgram(this.program);var i=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(i,[this.width,this.height]);var e=this.gl.createBuffer();if(!e){const c="failed to make position buffer";console.error(c),alert(c);return}p(this.gl,e,t);var r=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(r),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e);var s=2,o=this.gl.FLOAT,a=!1,g=0,u=0;this.gl.vertexAttribPointer(r,s,o,a,g,u)}setupTextureGeometry(t){this.gl.useProgram(this.gridProgram);var i=this.gl.getUniformLocation(this.gridProgram,"u_viewportCoord");this.gl.uniform2fv(i,[this.width,this.height]);var e=this.gl.createBuffer();if(!e){const T="failed to make position buffer";console.error(T),alert(T);return}p(this.gl,e,t);var r=this.gl.getAttribLocation(this.gridProgram,"a_position");this.gl.enableVertexAttribArray(r),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e);var s=2,o=this.gl.FLOAT,a=!1,g=0,u=0;this.gl.vertexAttribPointer(r,s,o,a,g,u),this.gl.useProgram(this.gridProgram);const c=this.gl.createBuffer();if(!c){const T="failed to make texcoord buffer";console.error(T),alert(T);return}this.gl.bindBuffer(this.gl.ARRAY_BUFFER,c),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);const m=this.gl.getAttribLocation(this.gridProgram,"a_texcoord");this.gl.enableVertexAttribArray(m),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,c);var s=2,o=this.gl.FLOAT,a=!1,g=0,u=0;this.gl.vertexAttribPointer(m,s,o,a,g,u)}render(){let t=[new l(0,0),new l(1,0),new l(0,1)],i=[new l(0,1),new l(1,0),new l(1,1)];this.setupGeometry(t.concat(i));var e=this.gl.TRIANGLES,r=0,s=6;this.gl.useProgram(this.program);var o=this.gl.getUniformLocation(this.program,"u_angle_rad");const a=new Date,g=1e3*a.getSeconds()+a.getMilliseconds();this.gl.uniform1f(o,2*Math.PI*(g%3e3)/3e3),this.gl.drawArrays(e,r,s)}debugRender(){let t=[new l(0,0),new l(1,0),new l(1,1)],i=[new l(0,1),new l(0,0),new l(1,1)];this.setupTextureGeometry(t.concat(i)),this.gl.useProgram(this.program);var e=this.gl.createTexture();this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null);var r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.viewport(0,0,this.width,this.height),this.render(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.viewport(0,0,this.width,this.height);var s=this.gl.TRIANGLES,o=0,a=6;this.gl.useProgram(this.gridProgram),this.gl.uniform1i(this.gl.getUniformLocation(this.gridProgram,"u_spacing"),this.spacing),this.gl.drawArrays(s,o,a)}}class y{constructor(t,i,e,r){n(this,"program");n(this,"positionBuffer");this.gl=t,this.points=i,this.width=e,this.height=r,this.program=_(this.gl,v,w);const s=this.gl.createBuffer();if(!s){const o="failed to make position buffer";console.error(o),alert(o);return}p(this.gl,s,i),this.positionBuffer=s}uniforms(){if(!this.program)return;this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.width,this.height]);var i=this.gl.getUniformLocation(this.program,"u_angle_rad");const e=new Date,r=1e3*e.getSeconds()+e.getMilliseconds();this.gl.uniform1f(i,2*Math.PI*(r%3e3)/3e3)}attributes(){if(!(!this.program||!this.positionBuffer)){this.gl.useProgram(this.program);var t=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(t,i,e,r,s,o)}}render(t){if(!(!this.program||!this.positionBuffer)){this.uniforms(),this.attributes();var i=this.gl.TRIANGLES,e=0,r=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(i,e,r)}}}var et=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec4 u_amount;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord) + u_amount;
}
`;class M{constructor(t,i,e,r){n(this,"program");n(this,"positionBuffer");n(this,"texCoordBuffer");n(this,"_amount",[0,0,0,0]);this.gl=t,this.points=i,this.width=e,this.height=r,this.program=_(this.gl,A,et);const s=this.gl.createBuffer();if(!s){const a="failed to make position buffer";console.error(a),alert(a);return}p(this.gl,s,this.points),this.positionBuffer=s;const o=this.gl.createBuffer();if(!o){const a="failed to make texcoord buffer";console.error(a),alert(a);return}B(this.gl,o,this.points),this.texCoordBuffer=o}amount(t){return this._amount=[t[0]/255,t[1]/255,t[2]/255,t[3]/255],this}uniforms(){if(!this.program)return;this.gl.useProgram(this.program);const t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.width,this.height]);const i=this.gl.getUniformLocation(this.program,"u_amount");this.gl.uniform4fv(i,this._amount)}attributes(){if(!this.program||!this.positionBuffer||!this.texCoordBuffer)return;this.gl.useProgram(this.program);var t=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(t,i,e,r,s,o);const a=this.gl.getAttribLocation(this.program,"a_texcoord");this.gl.enableVertexAttribArray(a),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(a,i,e,r,s,o)}textures(t){this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}render(t,i){if(!(!this.program||!this.positionBuffer||!this.texCoordBuffer)){this.uniforms(),this.attributes(),this.textures(i);var e=this.gl.TRIANGLES,r=0,s=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(e,r,s)}}}var rt=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord);
}
`;class G{constructor(t,i,e,r){n(this,"program");n(this,"positionBuffer");n(this,"texCoordBuffer");this.gl=t,this.points=i,this.width=e,this.height=r,this.program=_(this.gl,A,rt);const s=this.gl.createBuffer();if(!s){const a="failed to make position buffer";console.error(a),alert(a);return}p(this.gl,s,this.points),this.positionBuffer=s;const o=this.gl.createBuffer();if(!o){const a="failed to make texcoord buffer";console.error(a),alert(a);return}B(this.gl,o,this.points),this.texCoordBuffer=o}uniforms(){}attributes(){if(!this.program||!this.positionBuffer||!this.texCoordBuffer)return;this.gl.useProgram(this.program);var t=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(t,i,e,r,s,o);const a=this.gl.getAttribLocation(this.program,"a_texcoord");this.gl.enableVertexAttribArray(a),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(a,i,e,r,s,o)}textures(t){this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}render(t,i){if(!(!this.program||!this.positionBuffer||!this.texCoordBuffer)){this.uniforms(),this.attributes(),this.textures(i);var e=this.gl.TRIANGLES,r=0,s=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(e,r,s)}}}class S{constructor(t,i,e){n(this,"width");n(this,"height");n(this,"swapped",!1);n(this,"fb1");n(this,"fb2");n(this,"tex1");n(this,"tex2");this.gl=t,this.points=i,t.texStorage2D,this.width=e.res_x,this.height=e.res_y;const r=this.gl.createFramebuffer(),s=this.gl.createFramebuffer(),o=this.gl.createTexture(),a=this.gl.createTexture();if(!r||!s||!o||!a)throw"Could not create Framebuffers or Textures";this.fb1=r,this.fb2=s,this.tex1=o,this.tex2=a,this.setup()}setup(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height),this.gl.bindTexture(this.gl.TEXTURE_2D,this.tex1),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.bindTexture(this.gl.TEXTURE_2D,this.tex2),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.bindTexture(this.gl.TEXTURE_2D,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb1),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex1,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb2),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex2,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}apply(t){const[i,e]=this.get_order();return t.render(i),this.swap(),new st(this.gl,this)}get_order(){return this.swapped?[this.fb2,this.tex1]:[this.fb1,this.tex2]}clear_buffers(){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb1),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}swap(){this.swapped=!this.swapped}}class st{constructor(t,i){this.gl=t,this.start=i}apply(t,i=1){for(let e=0;e<i;e++){const[r,s]=this.start.get_order();t.render(r,s),this.start.swap()}return this}render(){const[t,i]=this.start.get_order();new G(this.gl,this.start.points,this.start.width,this.start.height).render(null,i)}}class C{constructor(t,i,e,r){n(this,"_data");n(this,"dataTexture");n(this,"textureKernel");this.gl=t,this.points=i,this.width=e,this.height=r,this._data=new Uint8Array(new Array(4*Math.round(this.width)*Math.round(this.height)).fill(0));const s=t.createTexture();if(!s)throw"Couldn't create texture";this.dataTexture=s,this.textureKernel=new G(this.gl,this.points,this.width,this.height),this.setup()}data(t){if(t.length!=4*Math.round(this.width)*Math.round(this.height))throw`data list was found to have length: ${t.length}, but was expected to have 4 x width x height: ${4*Math.round(this.width)*Math.round(this.height)}`;this.gl.deleteTexture(this.dataTexture),this._data=new Uint8Array(t.map(e=>e));const i=this.gl.createTexture();if(!i)throw"Couldn't create texture";return this.dataTexture=i,this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this._data),this}setup(){this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this._data),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST)}render(t){this.textureKernel.render(t,this.dataTexture)}}class ot{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"points");n(this,"dataKernel");n(this,"sineKernel");n(this,"addKernel");n(this,"basicSequence");const e=x(t);if(!e)throw"Could not create webgl2 context";this.gl=e,this.width=i.res_x,this.height=i.res_y;const r=[new l(0,0),new l(1,0),new l(0,1)],s=[new l(0,1),new l(1,0),new l(1,1)];this.points=r.concat(s),this.sineKernel=new y(this.gl,this.points,this.width,this.height),this.addKernel=new M(this.gl,this.points,this.width,this.height),this.dataKernel=new C(this.gl,this.points,this.width,this.height),this.basicSequence=new S(this.gl,this.points,i),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){const t=new Array(4*this.width*this.height);for(let i=0;i<Math.floor(this.height/2);i++)for(let e=0;e<this.width;e++)t[4*(e+this.width*i)+0]=40,t[4*(e+this.width*i)+1]=80,t[4*(e+this.width*i)+2]=120,t[4*(e+this.width*i)+3]=255;for(let i=Math.floor(this.height/2);i<this.height;i++)for(let e=0;e<this.width;e++)t[4*(e+this.width*i)+0]=70,t[4*(e+this.width*i)+1]=150,t[4*(e+this.width*i)+2]=200,t[4*(e+this.width*i)+3]=255;this.basicSequence.apply(this.dataKernel.data(t)).apply(this.addKernel.amount([20,20,20,255]),2).render()}debugRender(){this.basicSequence.apply(this.sineKernel).apply(this.addKernel).render()}}class ht{constructor(t,i,e,r){n(this,"program");n(this,"positionBuffer");n(this,"skinPoints");n(this,"corePoints");n(this,"skinProgram");n(this,"coreProgram");n(this,"skinBuffer");n(this,"coreBuffer");this.gl=t,this.width=e,this.height=r;const s=1/this.width/2,o=1/this.height/2;this.skinPoints=[new l(s,1-o),new l(1-s,1-o),new l(1-s,o),new l(0,o),new l(s,1-o)],this.corePoints=[new l(s*2,1-o*2),new l(s*2,o*2),new l(1-s*2,o*2),new l(s*2,1-o*2),new l(1-s*2,o*2),new l(1-s*2,1-o*2)],this.program=_(this.gl,v,w),this.skinProgram=_(this.gl,v,w),this.coreProgram=_(this.gl,v,w);const a=this.gl.createBuffer(),g=this.gl.createBuffer();if(!a||!g){const u="failed to make position buffer(s)";console.error(u),alert(u);return}p(this.gl,a,this.skinPoints),p(this.gl,g,this.corePoints),this.skinBuffer=a,this.coreBuffer=g}uniforms(t,i=0){this.gl.useProgram(t);var e=this.gl.getUniformLocation(t,"u_viewportCoord");this.gl.uniform2fv(e,[this.width,this.height]);var r=this.gl.getUniformLocation(t,"u_angle_rad");const s=new Date,o=1e3*s.getSeconds()+s.getMilliseconds();this.gl.uniform1f(r,2*Math.PI*(o%3e3/3e3+i))}attributes(t,i){this.gl.useProgram(t);var e=this.gl.getAttribLocation(t,"a_position");this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);var r=2,s=this.gl.FLOAT,o=!0,a=0,g=0;this.gl.vertexAttribPointer(e,r,s,o,a,g)}render(t){if(!(!this.program||!this.skinBuffer||!this.coreBuffer)){this.uniforms(this.program),this.attributes(this.program,this.skinBuffer);var i=this.gl.LINE_STRIP,e=0,r=this.skinPoints.length;this.gl.viewport(0,0,this.width,this.height),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(i,e,r),this.uniforms(this.program,.5),this.attributes(this.program,this.coreBuffer);var i=this.gl.TRIANGLES,e=0,r=this.corePoints.length;this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(i,e,r)}}}class nt{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"points");n(this,"dataKernel");n(this,"sineKernel");n(this,"addKernel");n(this,"skinKernel");n(this,"basicSequence");const e=x(t);if(!e)throw"Could not create webgl2 context";this.gl=e,this.width=i.res_x,this.height=i.res_y;const r=[new l(0,0),new l(1,0),new l(0,1)],s=[new l(0,1),new l(1,0),new l(1,1)];this.points=r.concat(s),this.sineKernel=new y(this.gl,this.points,this.width,this.height),this.addKernel=new M(this.gl,this.points,this.width,this.height),this.dataKernel=new C(this.gl,this.points,this.width,this.height),this.skinKernel=new ht(this.gl,this.points,this.width,this.height),this.basicSequence=new S(this.gl,this.points,i),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.basicSequence.apply(this.skinKernel).render()}debugRender(){this.basicSequence.apply(this.skinKernel).render()}}function at(h){const{onCheckShowGrid:t,onChangeRes:i,res:e,onChangeSpacing:r,spacing:s,canvasRef:o}=h;return R.exports.useEffect(()=>{const a=window.location.pathname.split("/")[2],g=a.charAt(0).toUpperCase()+a.slice(1),u=d[g];console.log(g,u),u&&h.setModule(u)}),b("div",{style:{backgroundColor:"black",display:"flex",flex:1,flexDirection:"column"},children:[b(O,{sx:{position:"fixed",right:0,backgroundColor:"#111",color:"#eee",width:"15%"},children:[f(k,{"aria-controls":"panel1d-content",id:"panel1d-header",children:f(U,{style:{margin:"auto"},children:"Settings"})}),b(K,{children:[f(z,{sx:{color:"white",display:"inline"},onChange:t}),f(U,{sx:{display:"inline"},children:"show grid"}),f(D,{sx:{width:"50%"},value:e,min:1,max:150,step:1,onChange:(a,g)=>i(g)}),b(U,{sx:{display:"inline"},children:[" res: ",e]}),f(D,{sx:{width:"50%"},value:s,min:1,max:50,step:1,onChange:(a,g)=>r(g)}),f(U,{sx:{display:"inline"},children:" spacing"})]}),f(Y,{sx:{minWidth:120},children:b(W,{fullWidth:!0,children:[f(q,{id:"demo-simple-select-label",children:"Age"}),f(V,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:h.module,label:"Module",style:{color:"white"},onChange:a=>{window.location.pathname="/WebGLFluidSim/"+d[a.target.value]},children:Object.keys(d).filter(a=>isNaN(Number(a))).map(a=>f(H,{value:d[a],children:a},a))})]})})]}),f("canvas",{ref:o,style:{width:"100vw",height:"100vh",backgroundColor:"grey",imageRendering:"pixelated"}})]})}var lt=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec4 u_amount;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord) * u_amount;
}
`;class gt{constructor(t,i,e,r){n(this,"program");n(this,"positionBuffer");n(this,"texCoordBuffer");n(this,"_amount",[0,0,0,0]);this.gl=t,this.points=i,this.width=e,this.height=r,this.program=_(this.gl,A,lt);const s=this.gl.createBuffer();if(!s){const a="failed to make position buffer";console.error(a),alert(a);return}p(this.gl,s,this.points),this.positionBuffer=s;const o=this.gl.createBuffer();if(!o){const a="failed to make texcoord buffer";console.error(a),alert(a);return}B(this.gl,o,this.points),this.texCoordBuffer=o}amount(t){return this._amount=[t[0]/255,t[1]/255,t[2]/255,t[3]/255],this}uniforms(){if(!this.program)return;this.gl.useProgram(this.program);const t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.width,this.height]);const i=this.gl.getUniformLocation(this.program,"u_amount");this.gl.uniform4fv(i,this._amount)}attributes(){if(!this.program||!this.positionBuffer||!this.texCoordBuffer)return;this.gl.useProgram(this.program);var t=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(t,i,e,r,s,o);const a=this.gl.getAttribLocation(this.program,"a_texcoord");this.gl.enableVertexAttribArray(a),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(a,i,e,r,s,o)}textures(t){this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}render(t,i){if(!(!this.program||!this.positionBuffer||!this.texCoordBuffer)){this.uniforms(),this.attributes(),this.textures(i);var e=this.gl.TRIANGLES,r=0,s=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(e,r,s)}}}var ut=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture_1;
uniform sampler2D u_texture_2;
 
void main() {
    out_color = texture(u_texture_1, v_texcoord) * texture(u_texture_2, v_texcoord);
}
`;class ft{constructor(t,i,e,r){n(this,"_data");n(this,"dataTexture");n(this,"program");n(this,"positionBuffer");n(this,"texCoordBuffer");this.gl=t,this.points=i,this.width=e,this.height=r;const s=t.createTexture();if(!s)throw"Couldn't create texture";this.dataTexture=s,this.program=_(this.gl,A,ut);const o=this.gl.createBuffer();if(!o){const g="failed to make position buffer";console.error(g),alert(g);return}p(this.gl,o,this.points),this.positionBuffer=o;const a=this.gl.createBuffer();if(!a){const g="failed to make texcoord buffer";console.error(g),alert(g);return}B(this.gl,a,this.points),this.texCoordBuffer=a,this.data(new Array(4*this.width*this.height).fill(255))}data(t){if(t.length!=4*Math.round(this.width)*Math.round(this.height))throw`data list was found to have length: ${t.length}, but was expected to have 4 x width x height: ${4*Math.round(this.width)*Math.round(this.height)}`;this.gl.deleteTexture(this.dataTexture),this._data=new Uint8Array(t.map(e=>e));const i=this.gl.createTexture();if(!i)throw"Couldn't create texture";return this.dataTexture=i,this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this._data),this}uniforms(){if(!!this.program){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_texture_1"),i=this.gl.getUniformLocation(this.program,"u_texture_2");this.gl.uniform1i(t,0),this.gl.uniform1i(i,1)}}attributes(){if(!this.program||!this.positionBuffer||!this.texCoordBuffer)return;this.gl.useProgram(this.program);var t=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(t,i,e,r,s,o);const a=this.gl.getAttribLocation(this.program,"a_texcoord");this.gl.enableVertexAttribArray(a),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(a,i,e,r,s,o)}textures(t){this.gl.activeTexture(this.gl.TEXTURE0+1),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}render(t,i){if(!(!this.program||!this.positionBuffer||!this.texCoordBuffer)){this.uniforms(),this.attributes(),this.textures(i);var e=this.gl.TRIANGLES,r=0,s=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(e,r,s)}}}var ct=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    const vec2 offsets[8] = vec2[8](
        vec2(-1., -1.),
        vec2(-1., 0.),
        vec2(-1., 1.),
        vec2(0., -1.),
        vec2(0., 1.),
        vec2(1., -1.),
        vec2(1., 0.),
        vec2(1., 1.)
    );
    
    float population = 0.;
    const vec4 alive = vec4(0.,0.,0.,1.);
    const vec4 dead = vec4(1.,1.,1.,1.);
    for(int i = 0; i < 8; i++) {
        population += 1. - texture(u_texture, v_texcoord+(offsets[i] / u_viewportCoord)).x;
    }

    float self = texture(u_texture, v_texcoord).x;
    
    

    if (self < 0.5) {
        if (population == 2. || population == 3.) {
            out_color = alive;
            return;
        }
    }
    else {
        if (abs(population - 3.) < 0.01 ) {
            out_color = alive;
            return;
        }
    }


    out_color = dead;
}
`;class dt{constructor(t,i,e,r){n(this,"program");n(this,"positionBuffer");n(this,"texCoordBuffer");this.gl=t,this.points=i,this.width=e,this.height=r,this.program=_(this.gl,A,ct);const s=this.gl.createBuffer();if(!s){const a="failed to make position buffer";console.error(a),alert(a);return}p(this.gl,s,this.points),this.positionBuffer=s;const o=this.gl.createBuffer();if(!o){const a="failed to make texcoord buffer";console.error(a),alert(a);return}B(this.gl,o,this.points),this.texCoordBuffer=o}uniforms(){if(!!this.program){this.gl.useProgram(this.program);var t=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(t,[this.width,this.height])}}attributes(){if(!this.program||!this.positionBuffer||!this.texCoordBuffer)return;this.gl.useProgram(this.program);var t=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(t,i,e,r,s,o);const a=this.gl.getAttribLocation(this.program,"a_texcoord");this.gl.enableVertexAttribArray(a),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);var i=2,e=this.gl.FLOAT,r=!1,s=0,o=0;this.gl.vertexAttribPointer(a,i,e,r,s,o)}textures(t){this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}render(t,i){if(!(!this.program||!this.positionBuffer||!this.texCoordBuffer)){this.uniforms(),this.attributes(),this.textures(i);var e=this.gl.TRIANGLES,r=0,s=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.viewport(0,0,this.width,this.height),this.gl.drawArrays(e,r,s)}}}class pt{constructor(t,i){n(this,"gl");n(this,"width");n(this,"height");n(this,"points");n(this,"dataKernel");n(this,"sineKernel");n(this,"multiplyKernel");n(this,"dataMultiplyKernel");n(this,"conwayKernel");n(this,"basicSequence");n(this,"sequence");n(this,"paused",!0);n(this,"limited",!1);n(this,"first",!0);this.mouseEvents(t);const e=x(t);if(!e)throw"Could not create webgl2 context";this.gl=e,this.width=i.res_x,this.height=i.res_y;const r=[new l(0,0),new l(1,0),new l(0,1)],s=[new l(0,1),new l(1,0),new l(1,1)];this.points=r.concat(s),this.sineKernel=new y(this.gl,this.points,this.width,this.height),this.multiplyKernel=new gt(this.gl,this.points,this.width,this.height),this.dataKernel=new C(this.gl,this.points,this.width,this.height),this.dataMultiplyKernel=new ft(this.gl,this.points,this.width,this.height),this.conwayKernel=new dt(this.gl,this.points,this.width,this.height),this.setup(),this.basicSequence=new S(this.gl,this.points,i),this.sequence=this.basicSequence.apply(this.dataKernel.data(new Array(4*this.width*this.height).fill(255)))}drawPoint(t,i,e,r){const s=new Array(4*this.width*this.height).fill(255),o=Math.floor(this.width*t/e),a=Math.floor(this.height*i/r),g=(o+a*this.width)*4;s[g]=0,s[g+1]=0,s[g+2]=0,this.dataMultiplyKernel.data(s),this.sequence.apply(this.dataMultiplyKernel).render(),console.log(`${o}, ${a}`)}mouseEvents(t){t.onclick=i=>{this.drawPoint(i.clientX,i.clientY,t.clientWidth,t.clientHeight)},t.addEventListener("contextmenu",i=>{console.log(i.button)}),window.addEventListener("keydown",i=>{i.key==" "&&(this.paused=!this.paused,this.sequence.apply(this.conwayKernel).render())})}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.first&&(this.sequence.apply(this.conwayKernel).render(),this.first=!1),this.paused||this.limited||(this.sequence.apply(this.conwayKernel).render(),this.limited=!0,setTimeout(()=>{this.limited=!1},100))}debugRender(){this.sequence.render()}}function mt(h,t,i,e=!1){if(!h||!h.current)return;cancelAnimationFrame(t.current),console.log("Setting up canvas...");const r=i(h.current);function s(){e?r.debugRender():r.render(),t.current=requestAnimationFrame(s)}return t.current=requestAnimationFrame(s),()=>cancelAnimationFrame(t.current)}function _t(h,t,i){switch(t){case d.Basic:return new X(h,i);case d.Conway:return new pt(h,i);case d.Grid:return new it(h,i);case d.Ring:return new nt(h,i);case d.Sequencer:return new ot(h,i);case d.Sine:return new Z(h,i);default:return new X(h,i)}}function Et(){let h=P.useRef(null),t=P.useRef(-1);const[i,e]=R.exports.useState(!1),[r,s]=R.exports.useState(30),[o,a]=R.exports.useState(1),[g,u]=R.exports.useState(d.Basic);return R.exports.useEffect(()=>{const c=new Q(Math.round(r*window.innerWidth/window.innerHeight),r,o);console.log(`x: ${c.res_x}`,`y: ${c.res_y}`);const m=T=>_t(T,g,c);return console.log("settings.grid_spacing",c.grid_spacing),mt(h,t,m,i)},[h,i,r,o,g]),f("div",{children:f(at,{onCheckShowGrid:()=>e(!i),onChangeRes:s,res:r,onChangeSpacing:a,spacing:o,canvasRef:h,setModule:u,module:g})})}$.render(f(P.StrictMode,{children:f(Et,{})}),document.getElementById("root"));