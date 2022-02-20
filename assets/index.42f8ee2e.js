var Q=Object.defineProperty;var Z=(t,e,r)=>e in t?Q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var a=(t,e,r)=>(Z(t,typeof e!="symbol"?e+"":e,r),r);import{r as _,j as y,A as ee,a as l,b as te,T as L,c as re,C as ie,S as G,B as ne,F as oe,I as se,d as ae,M as he,R as I,e as ce}from"./vendor.84f156a2.js";const ue=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}};ue();class S{constructor(e){a(this,"points");this.gl=e;let r=[new T(0,0),new T(1,0),new T(1,1)],i=[new T(0,1),new T(0,0),new T(1,1)];this.points=r.concat(i)}attributes(e,r){ge(this.gl,e.program,this.points),r&&fe(this.gl,e.program,this.points)}draw(e,r,i=!1){this.attributes(e,i),e.use();const n=this.gl.TRIANGLES,o=0;var s=this.points.length;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(n,o,s)}}var de=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord);
}
`,w=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`;class A{constructor(e,r){a(this,"program");this.gl=e,this.tex_loc=r,this.program=x(e,w,de)}uniforms(){this.gl.useProgram(this.program),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_texture"),this.tex_loc)}attributes(){}use(e){f(this.gl,e,this.tex_loc,g.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class B{constructor(e,r){a(this,"program");this.textureShader=e,this.input_texture=r,this.program=e.program}use(){this.textureShader.use(this.input_texture)}}function N(t,e,r){var i=t.createShader(e);if(i){t.shaderSource(i,r),t.compileShader(i);var n=t.getShaderParameter(i,t.COMPILE_STATUS);if(n)return i;console.log(t.getShaderInfoLog(i)),t.deleteShader(i)}console.error("Shader creation borked")}function le(t,e,r){var i=t.createProgram();if(i){t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i);var n=t.getProgramParameter(i,t.LINK_STATUS);if(n)return i;console.log(t.getProgramInfoLog(i)),t.deleteProgram(i)}console.error("Shader program borked")}function x(t,e,r){const i=N(t,t.VERTEX_SHADER,e),n=N(t,t.FRAGMENT_SHADER,r);if(!i){const s="failed to make vertex shader";throw console.error(s),s}if(!n){const s="failed to make vertex shader";throw console.error(s),s}const o=le(t,i,n);if(!o){const s="failed to make shader program";throw console.error(s),alert(s),s}if(t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS))throw"Program link failed with: "+t.getProgramInfoLog(o);return o}function ge(t,e,r){const i=t.createBuffer();if(!i){const d="Failed to make position buffer";throw console.error(d),d}Ie(t,i,r),t.useProgram(e);var n=t.getAttribLocation(e,"a_position");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,i);var o=2,s=t.FLOAT,h=!1,c=0,u=0;t.vertexAttribPointer(n,o,s,h,c,u)}function fe(t,e,r){const i=t.createBuffer();if(!i){const d="failed to make texcoord buffer";console.error(d),alert(d);return}Be(t,i,r),t.useProgram(e);const n=t.getAttribLocation(e,"a_texcoord");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,i);var o=2,s=t.FLOAT,h=!1,c=0,u=0;t.vertexAttribPointer(n,o,s,h,c,u)}function f(t,e,r,i){switch(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e),i){case g.Repeat:t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);break;case g.Clamp:t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);break}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST)}var g;(function(t){t[t.Repeat=0]="Repeat",t[t.Clamp=1]="Clamp"})(g||(g={}));function K(t){const e=t.getContext("webgl2");if(!e){const r="couldn't create canvas webgl2 context";throw console.log(r),r}return e}function k(t){const e=t.getContext("2d");if(!e){const r="couldn't create canvas 2d context";throw console.log(r),r}return e}function p(t){const e=t.createTexture();if(!e)throw"Couldn't create texture";return e}function M(t){const e=t.createFramebuffer();if(!e)throw"Couldn't create texture";return e}async function xe(t,e){var n;const r=(n=e.clipboardData)==null?void 0:n.items;if(!r){const o="Couldn't get items from paste";throw console.log(o),o}for(let o in r){var i=r[o];if(i.kind==="file"){const s=i.getAsFile();if(!s){const c="couldn't get paste blob";throw console.log(c),c}const h=URL.createObjectURL(s);if(!h){const c="couldn't create object url from blob";throw console.log(c),c}return me(h).then(c=>{const u=document.createElement("canvas"),d=document.createElement("canvas"),D=k(u),E=k(d);u.width=c.width,u.height=c.height,D.drawImage(c,0,0,c.width,c.height),d.width=t.canvas.width,d.height=t.canvas.height,E.drawImage(u,0,0,u.width,u.height,0,0,d.width,d.height);const m=p(t);t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,d);const R=new S(t),b=new A(t,0);return R.draw(new B(b,m),null,!0),m})}}}function me(t){return new Promise(e=>{const r=new Image;r.onload=()=>{e(r)},r.src=t})}class pe{constructor(e){a(this,"dataTexture");a(this,"textureShader");a(this,"program");a(this,"dataLen");this.gl=e,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.data(new Array(this.dataLen).fill(255)),this.textureShader=new A(this.gl,0),this.program=this.textureShader.program,this.setup()}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this.dataTexture&&this.gl.deleteTexture(this.dataTexture);const r=new Uint8Array(e);return this.dataTexture=p(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}setup(){}use(){if(!this.dataTexture)throw"Tried to use DataShader without initializing data";this.textureShader.use(this.dataTexture)}}class F{constructor(e,r){a(this,"limited",!1);this.func=e,this.rate_per_sec=r}run(...e){this.limited||(this.func.apply(null,e),this.limited=!0,setTimeout(()=>{this.limited=!1},1e3/this.rate_per_sec))}}class ve{constructor(e,r,i){a(this,"swapped",!1);a(this,"fb1");a(this,"fb2");a(this,"tex1");a(this,"tex2");this.gl=e,this.textureSettings=r,this.fb1=M(e),this.fb2=M(e),this.tex1=p(e),this.tex2=p(e),this.setup(i)}setup(e){if(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.tex1),f(this.gl,this.tex1,0,g.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),f(this.gl,this.tex2,1,g.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),this.gl.bindTexture(this.gl.TEXTURE_2D,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb1),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex1,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb2),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex2,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),e){const r=M(this.gl);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,r),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,this.fb2),this.gl.blitFramebuffer(0,0,this.gl.canvas.width,this.gl.canvas.height,0,0,this.gl.canvas.width,this.gl.canvas.height,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,null),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null)}}swapGet(){return this.swapped?(this.swapped=!this.swapped,[this.fb2,this.tex1]):(this.swapped=!this.swapped,[this.fb1,this.tex2])}peek(){return this.swapped?[this.fb2,this.tex1]:[this.fb1,this.tex2]}}class q{constructor(e,r,i,n=void 0){a(this,"pingPong");this.geometry=r,this.pingPong=new ve(e,i,n)}apply(e,r=i=>{}){const[i,n]=this.pingPong.swapGet();this.geometry.draw(new B(e,n),i,!0);const[o,s]=this.pingPong.peek();return r(s),this}render(e,r){const[i,n]=this.pingPong.peek();this.geometry.draw(new B(e,n),r,!0)}}var _e=`#version 300 es
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
`;class we{constructor(e){a(this,"program");this.gl=e,this.program=x(e,w,_e)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(e){f(this.gl,e,0,g.Clamp),this.uniforms(),this.attributes()}}var Te=`#version 300 es
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
`;class Ee{constructor(e,r,i){a(this,"program");a(this,"_dataTexture");a(this,"dataLen");this.gl=e,this.tex1_loc=r,this.tex2_loc=i,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.program=x(e,w,Te)}uniforms(){var e=this.gl.getUniformLocation(this.program,"u_texture_1"),r=this.gl.getUniformLocation(this.program,"u_texture_2");this.gl.uniform1i(e,this.tex1_loc),this.gl.uniform1i(r,this.tex2_loc)}attributes(){}dataTexture(e){return this._dataTexture=e,this}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this._dataTexture&&this.gl.deleteTexture(this._dataTexture);const r=new Uint8Array(e);return this._dataTexture=p(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(e){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";f(this.gl,this._dataTexture,0,g.Clamp),f(this.gl,e,1,g.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class O{constructor(e,r){a(this,"gl");a(this,"geometry");a(this,"dataShader");a(this,"conwayShader");a(this,"textureRenderShader");a(this,"dataMultiplyShader");a(this,"conwayDebounced");a(this,"drawDebounced");a(this,"eraseDebounced");a(this,"renderSeq");a(this,"paused",!0);this.mouseEvents(e),this.gl=K(e),this.gl.canvas.width=r.res_x,this.gl.canvas.height=r.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.geometry=new S(this.gl),this.dataShader=new pe(this.gl),this.conwayShader=new we(this.gl),this.textureRenderShader=new A(this.gl,0),this.dataMultiplyShader=new Ee(this.gl,0,1),this.renderSeq=new q(this.gl,this.geometry,W(this.gl)),this.renderSeq.apply(this.dataShader),this.renderSeq.render(this.textureRenderShader,null),this.conwayDebounced=new F(()=>{this.paused||(this.renderSeq.apply(this.conwayShader),this.renderSeq.render(this.textureRenderShader,null))},10),this.drawDebounced=new F(i=>{this.drawPoint(i.clientX,i.clientY,e.clientWidth,e.clientHeight)},100),this.eraseDebounced=new F(i=>{this.erasePoint(i.clientX,i.clientY,e.clientWidth,e.clientHeight)},100)}drawPoint(e,r,i,n){const o=this.gl.canvas.width,s=this.gl.canvas.height,h=new Array(4*o*s).fill(255),c=Math.floor(o*e/i),u=Math.floor(s*r/n),d=(c+u*o)*4;h[d]=0,h[d+1]=0,h[d+2]=0,this.renderSeq.apply(this.dataMultiplyShader.data(h)),this.renderSeq.render(this.textureRenderShader,null)}erasePoint(e,r,i,n){const o=this.gl.canvas.width,s=this.gl.canvas.height,h=new Array(4*o*s).fill(255),c=Math.floor(o*e/i),u=Math.floor(s*r/n),d=(c+u*o)*4;h[d]=255,h[d+1]=255,h[d+2]=255,this.renderSeq.apply(this.dataMultiplyShader.data(h)),this.renderSeq.render(this.textureRenderShader,null)}clear(){const e=this.gl.canvas.width,r=this.gl.canvas.height,i=new Array(4*e*r).fill(255);this.renderSeq.apply(this.dataMultiplyShader.data(i)),this.renderSeq.render(this.textureRenderShader,null)}mouseEvents(e){e.onmousedown=r=>{this.drawDebounced.run(r),e.onmousemove=i=>{r.button==0&&!r.ctrlKey?this.drawDebounced.run(i):this.eraseDebounced.run(i)}},e.onmouseup=r=>{e.onmousemove=null},e.oncontextmenu=r=>(this.eraseDebounced.run(r),!1),window.onkeydown=r=>{r.key=="c"&&(console.log("clear!"),this.clear()),r.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}render(){this.conwayDebounced.run()}debugRender(){}}var Re=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
in vec2 v_texcoord;
uniform float u_timestep;
uniform sampler2D u_velocity_texture;
uniform sampler2D u_dye_texture;
out vec4 color;
#define PI 3.1415926538
// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

void main() {
  vec4 texture_output = texture(u_velocity_texture, v_texcoord);
  // float angle = .x;
  // float magn = texture(u_velocity_texture, v_texcoord).y;
  // vec2 velocities = vec2(magn*cos(angle), magn*sin(angle
  // ));
  vec2 old_pos = v_texcoord - vec2(u_timestep, u_timestep) * texture_output.xy;

  // vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  // vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  // vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  // float angle = atan(deriv_coord.y, deriv_coord.x);
  // float magn = length(deriv_coord) / 4.;
  // angle = angle > 0. ? angle : angle + 2.*PI;

  // color = ivec2(round(vec2(angle, magn) * vec2(360./(2.*PI))));
  // color = vec4(angle*360./(2. * PI), magn, 0.,0.);


  color = texture(u_dye_texture, old_pos);
}
`;class be{constructor(e,r,i,n,o){a(this,"program");a(this,"setVelTex",!1);this.gl=e,this.timestep=r,this.dyeTextureIdx=i,this.velocityTextureIdx=n,this.wrapType=o,this.program=x(e,w,Re)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_dye_texture"),this.dyeTextureIdx)}attributes(){}velocityTexture(e){return this.setVelTex=!0,f(this.gl,e,this.velocityTextureIdx,this.wrapType),this}use(e){if(!this.setVelTex)throw"Did not set velocity texture yet for Dye Advection shader";this.gl.useProgram(this.program),this.uniforms(),this.attributes(),f(this.gl,e,this.dyeTextureIdx,this.wrapType)}}var ye=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538

// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x)/5.;

  // float angle = atan(deriv_coord.y, deriv_coord.x);
  // float magn = length(deriv_coord);
  // angle = angle > 0. ? angle : angle + 2.*PI;

  // color = ivec2(round(vec2(angle, magn) * vec2(360./(2.*PI))));
  color = vec4( deriv_coord.x, deriv_coord.y, 0., 0.);
}
`,z=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;class Se{constructor(e){a(this,"program");this.gl=e,this.program=x(e,z,ye)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Ae{constructor(e,r,i){this.gl=e,this.geometry=r,this.shader=i}render(e){this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.geometry.draw(this.shader,e)}}function Fe(t,e){if(!t.getExtension("EXT_color_buffer_float")){const d="need EXT_color_buffer_float";throw alert(d),d}const i=new Ae(t,new S(t),new Se(t));t.bindTexture(t.TEXTURE_2D,e);const n=0,o=t.RGBA32F,s=0,h=t.RGBA,c=t.FLOAT;t.texImage2D(t.TEXTURE_2D,n,o,t.canvas.width,t.canvas.height,s,h,c,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST);const u=M(t);return t.bindFramebuffer(t.FRAMEBUFFER,u),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),i.render(u),u}var De=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
in vec2 v_texcoord;
uniform float u_timestep;
uniform sampler2D u_velocity_texture;
// uniform sampler2D u_dye_texture;
out vec4 color;
#define PI 3.1415926538
// vec3 rgb2hsv(vec3 c)
// {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

void main() {
  vec4 texture_output = texture(u_velocity_texture, v_texcoord);
  // float angle = .x;
  // float magn = texture(u_velocity_texture, v_texcoord).y;
  // vec2 velocities = vec2(magn*cos(angle), magn*sin(angle
  // ));
  vec2 old_pos = v_texcoord - vec2(u_timestep, u_timestep) * texture_output.xy;

  // vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  // vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  // vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  // float angle = atan(deriv_coord.y, deriv_coord.x);
  // float magn = length(deriv_coord) / 4.;
  // angle = angle > 0. ? angle : angle + 2.*PI;

  // color = ivec2(round(vec2(angle, magn) * vec2(360./(2.*PI))));
  // color = vec4(angle*360./(2. * PI), magn, 0.,0.);


  color = texture(u_velocity_texture, old_pos);
}
`;class Ue{constructor(e,r,i,n){a(this,"program");this.gl=e,this.timestep=r,this.velocityTextureIdx=i,this.wrapType=n,this.program=x(e,w,De)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx)}attributes(){}use(e){this.gl.useProgram(this.program),this.uniforms(),this.attributes(),f(this.gl,e,this.velocityTextureIdx,this.wrapType)}}var Pe=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_input_tex;
uniform sampler2D u_data_tex;
 
void main() {
    if (texture(u_data_tex, v_texcoord).a > 0.5) {
        out_color = texture(u_data_tex, v_texcoord);
    }
    else {
        out_color = texture(u_input_tex, v_texcoord);
    }
}
`;class Le{constructor(e,r,i){a(this,"program");a(this,"_dataTexture");a(this,"dataLen");this.gl=e,this.dataTexLoc=r,this.inputTexLoc=i,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.program=x(e,w,Pe)}uniforms(){var e=this.gl.getUniformLocation(this.program,"u_input_tex"),r=this.gl.getUniformLocation(this.program,"u_data_tex");this.gl.uniform1i(r,this.dataTexLoc),this.gl.uniform1i(e,this.inputTexLoc)}attributes(){}dataTexture(e){return this._dataTexture=e,this}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this._dataTexture&&this.gl.deleteTexture(this._dataTexture);const r=new Uint8Array(e);return this._dataTexture=p(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(e){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";f(this.gl,this._dataTexture,0,g.Clamp),f(this.gl,e,1,g.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}var Me=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 color;

 
void main() {
   color = vec4(0.,0.,0.,1.);
}
`;class Y{constructor(e){a(this,"program");this.gl=e,this.program=x(e,z,Me)}uniforms(){}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Ce{constructor(e,r){a(this,"gl");a(this,"debouncer");a(this,"dyeRenderSeq");a(this,"drawDebounced");a(this,"dataRandomShader");a(this,"paused",!1);a(this,"blackShader");this.gl=K(e),this.gl.canvas.width=r.res_x,this.gl.canvas.height=r.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new Le(this.gl,0,1),this.blackShader=new Y(this.gl),this.setup(),this.drawDebounced=new F(n=>{this.drawPoint(n.clientX,n.clientY,e.clientWidth,e.clientHeight)},100),this.mouseEvents(e),new S(this.gl).draw(new Y(this.gl),null)}mouseEvents(e){e.onmousedown=r=>{this.drawDebounced.run(r),e.onmousemove=i=>{r.button==0&&!r.ctrlKey&&this.drawDebounced.run(i)}},e.onmouseup=r=>{e.onmousemove=null},window.onkeydown=r=>{r.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=r=>{xe(this.gl,r).then(i=>{const n=new S(this.gl),o=p(this.gl);Fe(this.gl,o);const s=new q(this.gl,n,Ge(this.gl),o);this.dyeRenderSeq=new q(this.gl,n,W(this.gl),i);const h=new Ue(this.gl,4e-4,0,g.Clamp),c=new be(this.gl,.1,0,1,g.Clamp);this.debouncer=new F(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";s.apply(h,u=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(c.velocityTexture(u))}),this.dyeRenderSeq.render(new A(this.gl,0),null)},25)})};document.onpaste=e}drawPoint(e,r,i,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const o=this.gl.canvas.width,s=this.gl.canvas.height,h=new Array(4*o*s).fill(0),c=Math.floor(o/30),u=Math.floor(o*e/i),d=Math.floor(s*r/n),D=u-Math.floor(c/2),E=d-Math.floor(c/2);for(let m=0;m<c;m++)for(let R=0;R<c;R++){const b=D+m,C=E+R;if(b<0||b>=o||C<0||C>=s)continue;const U=(b+C*o)*4,H=new Date().getTime()%5e3/5e3,P=Math.PI*2*H,$=Math.sin(P)*255,j=Math.cos(P)*255,J=Math.sin(P)*Math.cos(P)*255;h[U]=$,h[U+1]=j,h[U+2]=J,h[U+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(h)),this.dyeRenderSeq.render(new A(this.gl,0),null)}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}class X{constructor(e,r){if(this.x=e,this.y=r,e<-1||e>1||r<-1||r>1)throw"constructed invalid clip point";this.x=e,this.y=r}static fromUVPoint(e){return new X(e.x*2-1,e.y*2-1)}}class T{constructor(e,r){if(this.x=e,this.y=r,e<0||e>1||r<0||r>1)throw"constructed invalid clip point";this.x=e,this.y=r}}function Ie(t,e,r){t.bindBuffer(t.ARRAY_BUFFER,e);let i=[];for(let n of r){const o=X.fromUVPoint(n);i.push(o.x),i.push(o.y)}t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}function Be(t,e,r){t.bindBuffer(t.ARRAY_BUFFER,e);let i=[];for(let n of r)i.push(n.x),i.push(n.y);t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}class qe{constructor(e,r,i){this.res_x=e,this.res_y=r,this.grid_spacing=i}}var v;(function(t){t[t.Conway=0]="Conway",t[t.DynamicAdvection=1]="DynamicAdvection"})(v||(v={}));function Xe(t,e,r){switch(e){case 0:return new O(t,r);case 1:return new Ce(t,r);default:return new O(t,r)}}class V{constructor(e,r,i,n,o,s,h,c,u){this.textureTarget=e,this.mipmapLevel=r,this.internalFormat=i,this.width=n,this.height=o,this.border=s,this.format=h,this.type=c,this.pixels=u}}function Ge(t){return new V(t.TEXTURE_2D,0,t.RGBA32F,t.canvas.width,t.canvas.height,0,t.RGBA,t.FLOAT,null)}function W(t){return new V(t.TEXTURE_2D,0,t.RGBA,t.canvas.width,t.canvas.height,0,t.RGBA,t.UNSIGNED_BYTE,null)}function Ne(t){const{onCheckShowGrid:e,onChangeRes:r,res:i,onChangeSpacing:n,spacing:o,canvasRef:s}=t;return _.exports.useEffect(()=>{if(!window.location.hash)return;const h=window.location.hash.split("/")[1],c=h.charAt(0).toUpperCase()+h.slice(1),u=v[c];u&&t.setModule(u)}),y("div",{style:{backgroundColor:"black",display:"flex",flex:1,flexDirection:"column"},children:[y(ee,{sx:{position:"fixed",right:0,backgroundColor:"#111",color:"#eee",width:"15%"},children:[l(te,{"aria-controls":"panel1d-content",id:"panel1d-header",children:l(L,{style:{margin:"auto"},children:"Settings"})}),y(re,{children:[l(ie,{sx:{color:"white",display:"inline"},onChange:e}),l(L,{sx:{display:"inline"},children:"show grid"}),l(G,{sx:{width:"50%"},value:i,min:1,max:1200,step:1,onChange:(h,c)=>r(c)}),y(L,{sx:{display:"inline"},children:[" res: ",i]}),l(G,{sx:{width:"50%"},value:o,min:1,max:50,step:1,onChange:(h,c)=>n(c)}),l(L,{sx:{display:"inline"},children:" spacing"})]}),l(ne,{sx:{minWidth:120},children:y(oe,{fullWidth:!0,children:[l(se,{id:"demo-simple-select-label",children:"Age"}),l(ae,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:t.module,label:"Module",style:{color:"white"},onChange:h=>{window.location.hash="#/"+v[h.target.value],t.setModule(h.target.value)},children:Object.keys(v).filter(h=>isNaN(Number(h))).map(h=>l(he,{value:v[h],children:h},h))})]})})]}),l("canvas",{ref:s,style:{width:"100vw",height:"100vh",backgroundColor:"grey",imageRendering:"pixelated"}})]})}function Ke(t,e,r,i=!1){if(!t||!t.current)return;cancelAnimationFrame(e.current),console.log("Setting up canvas...");const n=r(t.current);function o(){i?n.debugRender():n.render(),e.current=requestAnimationFrame(o)}return e.current=requestAnimationFrame(o),()=>cancelAnimationFrame(e.current)}function ke(){let t=I.useRef(null),e=I.useRef(-1);const[r,i]=_.exports.useState(!1),[n,o]=_.exports.useState(600),[s,h]=_.exports.useState(1),[c,u]=_.exports.useState(v.Basic);return _.exports.useEffect(()=>{const d=new qe(Math.round(n*window.innerWidth/window.innerHeight),n,s);return Ke(t,e,E=>Xe(E,c,d),r)},[t,r,n,s,c]),l("div",{children:l(Ne,{onCheckShowGrid:()=>i(!r),onChangeRes:o,res:n,onChangeSpacing:h,spacing:s,canvasRef:t,setModule:u,module:c})})}ce.render(l(I.StrictMode,{children:l(ke,{})}),document.getElementById("root"));
