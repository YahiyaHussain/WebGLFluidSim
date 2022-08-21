var ge=Object.defineProperty;var xe=(t,e,r)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var o=(t,e,r)=>(xe(t,typeof e!="symbol"?e+"":e,r),r);import{r as P,j as q,A as fe,a as x,b as pe,T as G,c as ve,C as me,S as oe,B as _e,F as we,I as ye,d as be,M as Te,R as H,e as Re}from"./vendor.84f156a2.js";const Se=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}};Se();class j{draw(e,r){const i=0;var n=this.points.length;e.usePositions(this.points),e.use(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(this.primitive,i,n)}}class _ extends j{constructor(e){super();o(this,"points");o(this,"primitive");this.gl=e;let r=[new g(0,0),new g(1,0),new g(1,1)],i=[new g(0,1),new g(0,0),new g(1,1)];this.points=r.concat(i),this.primitive=this.gl.TRIANGLES}}var Ee=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 out_color;
in vec2 v_texcoord;
uniform sampler2D u_texture;
 
void main() {
    out_color = texture(u_texture, v_texcoord);
}
`,D=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`;class U{usePositions(e){if(!this.gl||!this.program)throw"Cannot call usePositions on baseShader without extending it first";he(this.gl,this.program,e),ce(this.gl,this.program,e)}}class S extends U{constructor(e,r){super();o(this,"program");this.gl=e,this.tex_loc=r,this.program=y(e,D,Ee)}uniforms(){this.gl.useProgram(this.program),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_texture"),this.tex_loc)}attributes(){}use(e){b(this.gl,e,this.tex_loc,u.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class ${constructor(e,r){this.textureShader=e,this.input_texture=r}usePositions(e){this.textureShader.usePositions(e)}use(){this.textureShader.use(this.input_texture)}}class Ae extends S{constructor(e){super(e,0);o(this,"dataTexture");o(this,"dataLen");o(this,"uses_texture",!0);this.gl=e,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.data(new Array(this.dataLen).fill(255)),this.setup()}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this.dataTexture&&this.gl.deleteTexture(this.dataTexture);const r=new Uint8Array(e);return this.dataTexture=A(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}setup(){}use(){if(!this.dataTexture)throw"Tried to use DataShader without initializing data";super.use(this.dataTexture)}}class E{constructor(e,r){o(this,"limited",!1);this.func=e,this.rate_per_sec=r}run(...e){this.limited||(this.func.apply(null,e),this.limited=!0,setTimeout(()=>{this.limited=!1},1e3/this.rate_per_sec))}}class Fe{constructor(e,r,i){o(this,"swapped",!1);o(this,"fb1");o(this,"fb2");o(this,"tex1");o(this,"tex2");this.gl=e,this.textureSettings=r,this.fb1=N(e),this.fb2=N(e),this.tex1=A(e),this.tex2=A(e),this.setup(i)}setup(e){if(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.tex1),b(this.gl,this.tex1,0,u.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),b(this.gl,this.tex2,1,u.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),this.gl.bindTexture(this.gl.TEXTURE_2D,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb1),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex1,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb2),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex2,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),e){const r=N(this.gl);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,r),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,this.fb2),this.gl.blitFramebuffer(0,0,this.gl.canvas.width,this.gl.canvas.height,0,0,this.gl.canvas.width,this.gl.canvas.height,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,null),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null)}}swapGet(){return this.swapped?(this.swapped=!this.swapped,[this.fb2,this.tex1]):(this.swapped=!this.swapped,[this.fb1,this.tex2])}peek(){return this.swapped?[this.fb2,this.tex1]:[this.fb1,this.tex2]}}class L{constructor(e,r,i,n=void 0){o(this,"pingPong");this.geometry=r,this.pingPong=new Fe(e,i,n)}apply(e,r=i=>{}){const[i,n]=this.pingPong.swapGet();this.geometry.draw(new $(e,n),i);const[s,a]=this.pingPong.peek();return r(a),this}render(e,r){const[i,n]=this.pingPong.peek();this.geometry.draw(new $(e,n),r)}}var Ce=`#version 300 es
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
`;class Pe extends U{constructor(e){super();o(this,"program");this.gl=e,this.program=y(e,D,Ce)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(e){b(this.gl,e,0,u.Clamp),this.uniforms(),this.attributes()}}var De=`#version 300 es
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
`;class Ue extends U{constructor(e,r,i){super();o(this,"program");o(this,"_dataTexture");o(this,"dataLen");this.gl=e,this.tex1_loc=r,this.tex2_loc=i,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.program=y(e,D,De)}uniforms(){var e=this.gl.getUniformLocation(this.program,"u_texture_1"),r=this.gl.getUniformLocation(this.program,"u_texture_2");this.gl.uniform1i(e,this.tex1_loc),this.gl.uniform1i(r,this.tex2_loc)}attributes(){}dataTexture(e){return this._dataTexture=e,this}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this._dataTexture&&this.gl.deleteTexture(this._dataTexture);const r=new Uint8Array(e);return this._dataTexture=A(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(e){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";b(this.gl,this._dataTexture,0,u.Clamp),b(this.gl,e,1,u.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class J{constructor(e,r){o(this,"gl");o(this,"geometry");o(this,"dataShader");o(this,"conwayShader");o(this,"textureRenderShader");o(this,"dataMultiplyShader");o(this,"conwayDebounced");o(this,"drawDebounced");o(this,"eraseDebounced");o(this,"renderSeq");o(this,"paused",!1);this.mouseEvents(e),this.gl=K(e),this.gl.canvas.width=r.res_x,this.gl.canvas.height=r.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.geometry=new _(this.gl),this.dataShader=new Ae(this.gl),this.conwayShader=new Pe(this.gl),this.textureRenderShader=new S(this.gl,0),this.dataMultiplyShader=new Ue(this.gl,0,1),this.renderSeq=new L(this.gl,this.geometry,X(this.gl)),this.renderSeq.apply(this.dataShader),this.renderSeq.render(this.textureRenderShader,null),this.conwayDebounced=new E(()=>{this.paused||(this.renderSeq.apply(this.conwayShader),this.renderSeq.render(this.textureRenderShader,null))},10),this.drawDebounced=new E(i=>{this.drawPoint(i.clientX,i.clientY,e.clientWidth,e.clientHeight)},100),this.eraseDebounced=new E(i=>{this.erasePoint(i.clientX,i.clientY,e.clientWidth,e.clientHeight)},100)}drawPoint(e,r,i,n){const s=this.gl.canvas.width,a=this.gl.canvas.height,h=new Array(4*s*a).fill(255),c=Math.floor(s*e/i),d=Math.floor(a*r/n),l=(c+d*s)*4;h[l]=0,h[l+1]=0,h[l+2]=0,this.renderSeq.apply(this.dataMultiplyShader.data(h)),this.renderSeq.render(this.textureRenderShader,null)}erasePoint(e,r,i,n){const s=this.gl.canvas.width,a=this.gl.canvas.height,h=new Array(4*s*a).fill(255),c=Math.floor(s*e/i),d=Math.floor(a*r/n),l=(c+d*s)*4;h[l]=255,h[l+1]=255,h[l+2]=255,this.renderSeq.apply(this.dataMultiplyShader.data(h)),this.renderSeq.render(this.textureRenderShader,null)}clear(){const e=this.gl.canvas.width,r=this.gl.canvas.height,i=new Array(4*e*r).fill(255);this.renderSeq.apply(this.dataMultiplyShader.data(i)),this.renderSeq.render(this.textureRenderShader,null)}mouseEvents(e){e.onmousedown=r=>{this.drawDebounced.run(r),e.onmousemove=i=>{r.button==0&&!r.ctrlKey?this.drawDebounced.run(i):this.eraseDebounced.run(i)}},e.onmouseup=r=>{e.onmousemove=null},e.oncontextmenu=r=>(this.eraseDebounced.run(r),!1),window.onkeydown=r=>{r.key=="c"&&(console.log("clear!"),this.clear()),r.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}render(){this.conwayDebounced.run()}debugRender(){}}var Le=`#version 300 es
precision highp float;
in vec2 v_texcoord;
uniform float u_timestep;
uniform sampler2D u_velocity_texture;
uniform sampler2D u_dye_texture;
uniform float rdx;
out vec4 color;
#define PI 3.1415926538


vec4 f4texRECTbilerp(sampler2D tex, vec2 s)
{
  vec2 unit_coord = 1. / vec2(textureSize(tex, 0));
  vec4 st;
  st.xy = floor(s - unit_coord) + unit_coord;
  st.zw = st.xy + 1.;
 
  vec2 t = s - st.xy; //interpolating factors
   
  vec4 tex11 = texture(tex, st.xy);
  vec4 tex21 = texture(tex, st.zy);
  vec4 tex12 = texture(tex, st.xw);
  vec4 tex22 = texture(tex, st.zw);

  // bilinear interpolation
  return mix(mix(tex11, tex21, t.x), mix(tex12, tex22, t.x), t.y);
}

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
  // color = f4texRECTbilerp(u_dye_texture, old_pos);
}
`;class Q extends U{constructor(e,r,i,n,s){super();o(this,"program");o(this,"setVelTex",!1);this.gl=e,this.timestep=r,this.dyeTextureIdx=i,this.velocityTextureIdx=n,this.wrapType=s,this.program=y(e,D,Le)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_dye_texture"),this.dyeTextureIdx)}attributes(){}velocityTexture(e){return this.setVelTex=!0,b(this.gl,e,this.velocityTextureIdx,this.wrapType),this}use(e){if(!this.setVelTex)throw"Did not set velocity texture yet for Dye Advection shader";this.gl.useProgram(this.program),this.uniforms(),this.attributes(),b(this.gl,e,this.dyeTextureIdx,this.wrapType)}}var Me=`#version 300 es
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
`,I=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;class B{usePositions(e){if(!this.gl||!this.program)throw"Cannot call usePositions on baseShader without extending it first";he(this.gl,this.program,e),this.uses_texture&&ce(this.gl,this.program,e)}}class qe extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,Me)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}var Ie=`#version 300 es
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

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  float angle = atan(deriv_coord.y, deriv_coord.x);
  float magn = length(deriv_coord) /5.;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.73)), magn);
}
`;class Be extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,Ie)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}function Z(t,e){if(!t.getExtension("EXT_color_buffer_float")){const s="need EXT_color_buffer_float";throw alert(s),s}ue(t,e,z(t)),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST);const i=N(t);return t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),new _(t).draw(new qe(t),i),i}var Xe=`#version 300 es
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

vec4 f4texRECTbilerp(sampler2D tex, vec2 s)
{
  // https://www.omnicalculator.com/math/bilinear-interpolation#bilinear-interpolation-example equation
  // https://godotengine.org/qa/28151/how-to-check-color-of-adjacent-pixels-in-fragment-shader get pixel size
  // want to use the textureSize to get the pixel index by flooring it
  // then subtract 0.5, floor, add 0.5 and you will get the x boundary pixels, do for y and you have the for corners and can get the coefficients
  // then make sure the texture is sampled with 0-1 based tex coords and stuff
  vec2 unit_coord = 1. / vec2(textureSize(tex, 0)) / 2.;
  vec4 st;
  st.xy = floor(s - unit_coord) + unit_coord;
  st.zw = st.xy + 1.;
 
  vec2 t = s - st.xy; //interpolating factors
   
  vec4 tex11 = texture(tex, st.xy);
  vec4 tex21 = texture(tex, st.zy);
  vec4 tex12 = texture(tex, st.xw);
  vec4 tex22 = texture(tex, st.zw);

  // bilinear interpolation
  return mix(mix(tex11, tex21, t.x), mix(tex12, tex22, t.x), t.y);
}
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
  // color = f4texRECTbilerp(u_velocity_texture, old_pos);
}
`;class se extends U{constructor(e,r,i,n){super();o(this,"program");this.gl=e,this.timestep=r,this.velocityTextureIdx=i,this.wrapType=n,this.program=y(e,D,Xe)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx)}attributes(){}use(e){this.gl.useProgram(this.program),this.uniforms(),this.attributes(),b(this.gl,e,this.velocityTextureIdx,this.wrapType)}}var Ge=`#version 300 es
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
`;class ee extends U{constructor(e,r,i){super();o(this,"program");o(this,"_dataTexture");o(this,"dataLen");this.gl=e,this.dataTexLoc=r,this.inputTexLoc=i,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.program=y(e,D,Ge)}uniforms(){var e=this.gl.getUniformLocation(this.program,"u_input_tex"),r=this.gl.getUniformLocation(this.program,"u_data_tex");this.gl.uniform1i(r,this.dataTexLoc),this.gl.uniform1i(e,this.inputTexLoc)}attributes(){}dataTexture(e){return this._dataTexture=e,this}data(e,r=M.Color){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;switch(this._dataTexture&&this.gl.deleteTexture(this._dataTexture),this._dataTexture=A(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),r){case M.Color:var i=new Uint8Array(e),n=X(this.gl);break;case M.Float:var i=new Float32Array(e),n=z(this.gl)}return ue(this.gl,this._dataTexture,n,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(e){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";b(this.gl,this._dataTexture,0,u.Clamp),b(this.gl,e,1,u.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}var ke=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 color;

 
void main() {
   color = vec4(0.,0.,0.,1.);
}
`;class te extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,ke)}uniforms(){}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Ke{constructor(e,r){o(this,"gl");o(this,"debouncer");o(this,"dyeRenderSeq");o(this,"drawDebounced");o(this,"dataRandomShader");o(this,"paused",!1);this.gl=K(e),this.gl.canvas.width=r.res_x,this.gl.canvas.height=r.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new ee(this.gl,0,1),this.setup(),this.drawDebounced=new E(n=>{this.drawPoint(n.clientX,n.clientY,e.clientWidth,e.clientHeight)},100),this.mouseEvents(e),new _(this.gl).draw(new te(this.gl),null)}mouseEvents(e){e.onmousedown=r=>{this.drawDebounced.run(r),e.onmousemove=i=>{r.button==0&&!r.ctrlKey&&this.drawDebounced.run(i)}},e.onmouseup=r=>{e.onmousemove=null},window.onkeydown=r=>{r.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=r=>{ie(this.gl,r).then(i=>{const n=new _(this.gl),s=A(this.gl);Z(this.gl,s);const a=new L(this.gl,n,z(this.gl),s);this.dyeRenderSeq=new L(this.gl,n,X(this.gl),i);const h=new se(this.gl,.03,0,u.Clamp),c=new Q(this.gl,.1,0,1,u.Clamp);this.debouncer=new E(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";a.apply(h,d=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(c.velocityTexture(d))}),this.dyeRenderSeq.render(new S(this.gl,0),null)},25)})};document.onpaste=e}drawPoint(e,r,i,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,a=this.gl.canvas.height,h=new Array(4*s*a).fill(0),c=Math.floor(s/30),d=Math.floor(s*e/i),l=Math.floor(a*r/n),F=d-Math.floor(c/2),T=l-Math.floor(c/2);for(let f=0;f<c;f++)for(let v=0;v<c;v++){const m=F+f,w=T+v;if(m<0||m>=s||w<0||w>=a)continue;const p=(m+w*s)*4,O=new Date().getTime()%5e3/5e3,R=Math.PI*2*O,Y=Math.sin(R)*255,W=Math.cos(R)*255,V=Math.sin(R)*Math.cos(R)*255;h[p]=Y,h[p+1]=W,h[p+2]=V,h[p+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(h)),this.dyeRenderSeq.render(new S(this.gl,0),null)}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}class Ne extends j{constructor(e){super();o(this,"points");o(this,"primitive");this.gl=e;const r=1/e.canvas.width/2,i=1/e.canvas.height/2;this.points=[new g(r,1-i),new g(1-r,1-i),new g(1-r,i),new g(0,i),new g(r,1-i)],this.primitive=e.LINE_STRIP}}class ze extends j{constructor(e){super();o(this,"points");o(this,"primitive");this.gl=e;const r=1/e.canvas.width/2,i=1/e.canvas.height/2;this.points=[new g(r*2,1-i*2),new g(r*2,i*2),new g(1-r*2,i*2),new g(r*2,1-i*2),new g(1-r*2,i*2),new g(1-r*2,1-i*2)],this.primitive=e.TRIANGLES}}var Oe=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
uniform float u_angle_rad;
out vec4 color;

#define PI 3.1415926538

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
 
void main() {
   vec2 uv_coord = floor(gl_FragCoord.xy) / u_viewportCoord.xy;

   float hue = (sin(u_angle_rad)/2.+cos(u_angle_rad) + uv_coord.x)/3.;
   float sat = 0.3 + sin(u_angle_rad*uv_coord.x)/4. + uv_coord.y/3.;
   float val = 0.53 + cos(u_angle_rad*uv_coord.y)/4. + uv_coord.x/3.;

   color = vec4(hsv2rgb(vec3(hue, sat, val)), 1.);
}
`;class re extends B{constructor(e,r){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.ms_per_cycle=r,this.program=y(e,I,Oe)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height]);var r=this.gl.getUniformLocation(this.program,"u_angle_rad");const i=new Date,n=1e3*i.getSeconds()+i.getMilliseconds();this.gl.uniform1f(r,2*Math.PI*(n%this.ms_per_cycle)/this.ms_per_cycle)}attributes(){}use(){this.uniforms(),this.attributes()}}class Ye{constructor(e,r){o(this,"gl");o(this,"width");o(this,"height");o(this,"skinGeometry");o(this,"coreGeometry");o(this,"skinShader");o(this,"coreShader");const i=k(e);if(!i)throw"Could not create webgl2 context";this.gl=i,this.width=r.res_x,this.height=r.res_y,this.skinGeometry=new Ne(i),this.coreGeometry=new ze(i),this.skinShader=new re(i,4e3),this.coreShader=new re(i,6e3),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.coreGeometry.draw(this.coreShader,null),this.skinGeometry.draw(this.skinShader,null)}debugRender(){}}class We{constructor(e,r){o(this,"gl");o(this,"width");o(this,"height");o(this,"shader");o(this,"geometry");const i=k(e);if(!i)throw"Could not create webgl2 context";this.gl=i,this.width=r.res_x,this.height=r.res_y,this.geometry=new _(i),this.shader=new re(i,4e3),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.shader,null)}debugRender(){this.geometry.draw(this.shader,null)}}class Ve{constructor(e,r){o(this,"gl");o(this,"width");o(this,"height");o(this,"spiralShader");o(this,"geometry");const i=k(e);if(!i)throw"Could not create webgl2 context";this.gl=i,this.width=r.res_x,this.height=r.res_y,this.geometry=new _(i),this.spiralShader=new Be(i),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.spiralShader,null)}debugRender(){this.geometry.draw(this.spiralShader,null)}}class He{constructor(e,r){o(this,"gl");o(this,"debouncer");o(this,"dyeRenderSeq");o(this,"drawDebounced");o(this,"dataRandomShader");o(this,"paused",!1);this.gl=K(e),this.gl.canvas.width=r.res_x,this.gl.canvas.height=r.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new ee(this.gl,0,1),this.setup(),this.drawDebounced=new E(n=>{this.drawPoint(n.clientX,n.clientY,e.clientWidth,e.clientHeight)},100),this.mouseEvents(e),new _(this.gl).draw(new te(this.gl),null)}mouseEvents(e){e.onmousedown=r=>{this.drawDebounced.run(r),e.onmousemove=i=>{r.button==0&&!r.ctrlKey&&this.drawDebounced.run(i)}},e.onmouseup=r=>{e.onmousemove=null},window.onkeydown=r=>{r.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=r=>{ie(this.gl,r).then(i=>{const n=new _(this.gl),s=A(this.gl);Z(this.gl,s),this.dyeRenderSeq=new L(this.gl,n,X(this.gl),i);const a=new Q(this.gl,.1,0,1,u.Clamp);this.debouncer=new E(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(a.velocityTexture(s)),this.dyeRenderSeq.render(new S(this.gl,0),null)},25)})};document.onpaste=e}drawPoint(e,r,i,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,a=this.gl.canvas.height,h=new Array(4*s*a).fill(0),c=Math.floor(s/30),d=Math.floor(s*e/i),l=Math.floor(a*r/n),F=d-Math.floor(c/2),T=l-Math.floor(c/2);for(let f=0;f<c;f++)for(let v=0;v<c;v++){const m=F+f,w=T+v;if(m<0||m>=s||w<0||w>=a)continue;const p=(m+w*s)*4,O=new Date().getTime()%5e3/5e3,R=Math.PI*2*O,Y=Math.sin(R)*255,W=Math.cos(R)*255,V=Math.sin(R)*Math.cos(R)*255;h[p]=Y,h[p+1]=W,h[p+2]=V,h[p+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(h)),this.dyeRenderSeq.render(new S(this.gl,0),null)}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}class je{constructor(e,r){o(this,"gl");o(this,"debouncer");o(this,"dyeRenderSeq");o(this,"velocityRenderSeq");o(this,"drawDebounced");o(this,"dataRandomShader");o(this,"paused",!1);o(this,"lastCoords");this.gl=K(e),this.gl.canvas.width=r.res_x,this.gl.canvas.height=r.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new ee(this.gl,0,1),this.setup(),this.drawDebounced=new E(n=>{this.drawPoint(n.clientX,n.clientY,e.clientWidth,e.clientHeight)},100),this.mouseEvents(e),new _(this.gl).draw(new te(this.gl),null)}mouseEvents(e){e.onmousedown=r=>{this.drawDebounced.run(r),e.onmousemove=i=>{r.button==0&&!r.ctrlKey&&this.drawDebounced.run(i)}},e.onmouseup=r=>{e.onmousemove=null},window.onkeydown=r=>{r.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=r=>{ie(this.gl,r).then(i=>{const n=new _(this.gl),s=A(this.gl);Z(this.gl,s),this.velocityRenderSeq=new L(this.gl,n,z(this.gl)),this.dyeRenderSeq=new L(this.gl,n,X(this.gl),i);const a=new se(this.gl,.03,0,u.Clamp);new S(this.gl,0);const h=new Q(this.gl,.1,0,1,u.Clamp);this.debouncer=new E(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";if(!this.velocityRenderSeq)throw"velocity render seq was undefined";this.velocityRenderSeq.apply(a,c=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(h.velocityTexture(c))}),this.dyeRenderSeq.render(new S(this.gl,0),null)},25)})};document.onpaste=e}drawPoint(e,r,i,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,a=this.gl.canvas.height,h=new Array(4*s*a).fill(0),c=Math.floor(s/30),d=Math.floor(s*e/i),l=Math.floor(a*r/n);if(!this.lastCoords){this.lastCoords=[d,l],setTimeout(()=>this.lastCoords=void 0,100);return}const F=d-Math.floor(c/2),T=l-Math.floor(c/2);for(let f=0;f<c;f++)for(let v=0;v<c;v++){const m=F+f,w=T+v;if(m<0||m>=s||w<0||w>=a)continue;const p=(m+w*s)*4;new Date().getTime()%5e3/5e3,console.log("coords",[d,l],this.lastCoords,"velocity",[(d-this.lastCoords[0])/s*200,-((l-this.lastCoords[1])/a)*200]),h[p]=(d-this.lastCoords[0])/s*10,h[p+1]=-((l-this.lastCoords[1])/a)*10,h[p+2]=0,h[p+3]=255}if(!this.velocityRenderSeq)throw alert("Paste image first"),"Didn't paste image before drawing";this.velocityRenderSeq.apply(this.dataRandomShader.data(h,M.Float))}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}var $e=`#version 300 es
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_viewportCoord;
out vec4 color;
#define PI 3.1415926538
#define ITERATIONS 10


vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv_coord = (gl_FragCoord.xy) / u_viewportCoord.xy;
  vec2 clip_coord = (uv_coord * vec2(2.,2.) - vec2(1.,1.));
  
  vec2 deriv_coord = vec2(-clip_coord.x + 2.*clip_coord.y, -5.*clip_coord.x);

  float angle = atan(deriv_coord.y, deriv_coord.x);
  float magn = length(deriv_coord) /5.;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.73)), magn);

  float third = 1./3.;
  float twothird = 2./3.;

  int iterations = int(ceil(log(max(u_viewportCoord.x,u_viewportCoord.y) / 9.)));

  for (int i = 0; i < iterations; i++) {
    if (uv_coord.x > third && uv_coord.x < twothird && uv_coord.y > third && uv_coord.y < twothird) {
      color = vec4(0.,0.,0.,1);
    }
    else {
      for (int i = 0; i < 2; i++) {
        if (uv_coord.x > third) {
          uv_coord.x -= third;
        }

        if (uv_coord.y > third) {
          uv_coord.y -= third;
        }
      }
      uv_coord.x *= 3.;
      uv_coord.y *= 3.;
    }
  }
}
`;class Je extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,$e)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Qe{constructor(e,r){o(this,"gl");o(this,"width");o(this,"height");o(this,"carpetShader");o(this,"geometry");const i=k(e);if(!i)throw"Could not create webgl2 context";this.gl=i,this.width=r.res_x,this.height=r.res_y,this.geometry=new _(i),this.carpetShader=new Je(i),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.carpetShader,null)}debugRender(){this.geometry.draw(this.carpetShader,null)}}function ae(t,e,r){var i=t.createShader(e);if(i){t.shaderSource(i,r),t.compileShader(i);var n=t.getShaderParameter(i,t.COMPILE_STATUS);if(n)return i;console.log(t.getShaderInfoLog(i)),t.deleteShader(i)}console.error("Shader creation borked")}function Ze(t,e,r){var i=t.createProgram();if(i){t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i);var n=t.getProgramParameter(i,t.LINK_STATUS);if(n)return i;console.log(t.getProgramInfoLog(i)),t.deleteProgram(i)}console.error("Shader program borked")}function y(t,e,r){const i=ae(t,t.VERTEX_SHADER,e),n=ae(t,t.FRAGMENT_SHADER,r);if(!i){const a="failed to make vertex shader";throw console.error(a),a}if(!n){const a="failed to make vertex shader";throw console.error(a),a}const s=Ze(t,i,n);if(!s){const a="failed to make shader program";throw console.error(a),alert(a),a}if(t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))throw"Program link failed with: "+t.getProgramInfoLog(s);return s}function k(t){const e=t.getContext("webgl2");return e===null?(alert("Unable to initialize WebGL. Your browser or machine may not support it."),null):e}function he(t,e,r){const i=t.createBuffer();if(!i){const l="Failed to make position buffer";throw console.error(l),l}tt(t,i,r),t.useProgram(e);var n=t.getAttribLocation(e,"a_position");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,i);var s=2,a=t.FLOAT,h=!1,c=0,d=0;t.vertexAttribPointer(n,s,a,h,c,d)}function ce(t,e,r){const i=t.createBuffer();if(!i){const l="failed to make texcoord buffer";console.error(l),alert(l);return}rt(t,i,r),t.useProgram(e);const n=t.getAttribLocation(e,"a_texcoord");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,i);var s=2,a=t.FLOAT,h=!1,c=0,d=0;t.vertexAttribPointer(n,s,a,h,c,d)}function b(t,e,r,i){switch(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e),i){case u.Repeat:t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);break;case u.Clamp:t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);break}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST)}var u;(function(t){t[t.Repeat=0]="Repeat",t[t.Clamp=1]="Clamp"})(u||(u={}));function K(t){const e=t.getContext("webgl2");if(!e){const r="couldn't create canvas webgl2 context";throw console.log(r),r}return e}function de(t){const e=t.getContext("2d");if(!e){const r="couldn't create canvas 2d context";throw console.log(r),r}return e}function A(t){const e=t.createTexture();if(!e)throw"Couldn't create texture";return e}function N(t){const e=t.createFramebuffer();if(!e)throw"Couldn't create texture";return e}async function ie(t,e){var n;const r=(n=e.clipboardData)==null?void 0:n.items;if(!r){const s="Couldn't get items from paste";throw console.log(s),s}for(let s in r){var i=r[s];if(i.kind==="file"){const a=i.getAsFile();if(!a){const c="couldn't get paste blob";throw console.log(c),c}const h=URL.createObjectURL(a);if(!h){const c="couldn't create object url from blob";throw console.log(c),c}return et(h).then(c=>{const d=document.createElement("canvas"),l=document.createElement("canvas"),F=de(d),T=de(l);d.width=c.width,d.height=c.height,F.drawImage(c,0,0,c.width,c.height),l.width=t.canvas.width,l.height=t.canvas.height,T.drawImage(d,0,0,d.width,d.height,0,0,l.width,l.height);const f=A(t);t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,l);const v=new _(t),m=new S(t,0);return v.draw(new $(m,f),null),f})}}}function et(t){return new Promise(e=>{const r=new Image;r.onload=()=>{e(r)},r.src=t})}class ne{constructor(e,r){if(this.x=e,this.y=r,e<-1||e>1||r<-1||r>1)throw"constructed invalid clip point";this.x=e,this.y=r}static fromUVPoint(e){return new ne(e.x*2-1,e.y*2-1)}}class g{constructor(e,r){if(this.x=e,this.y=r,e<0||e>1||r<0||r>1)throw"constructed invalid clip point";this.x=e,this.y=r}}function tt(t,e,r){t.bindBuffer(t.ARRAY_BUFFER,e);let i=[];for(let n of r){const s=ne.fromUVPoint(n);i.push(s.x),i.push(s.y)}t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}function rt(t,e,r){t.bindBuffer(t.ARRAY_BUFFER,e);let i=[];for(let n of r)i.push(n.x),i.push(n.y);t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}class it{constructor(e,r,i){this.res_x=e,this.res_y=r,this.grid_spacing=i}}var C;(function(t){t[t.Border=0]="Border",t[t.Conway=1]="Conway",t[t.Sine=2]="Sine",t[t.Spiral=3]="Spiral",t[t.StaticAdvection=4]="StaticAdvection",t[t.DynamicAdvection=5]="DynamicAdvection",t[t.DrawVelocity=6]="DrawVelocity",t[t.SierpinskiCarpet=7]="SierpinskiCarpet"})(C||(C={}));var M;(function(t){t[t.Color=0]="Color",t[t.Float=1]="Float"})(M||(M={}));function nt(t,e,r){switch(e){case 0:return new Ye(t,r);case 1:return new J(t,r);case 2:return new We(t,r);case 3:return new Ve(t,r);case 4:return new He(t,r);case 5:return new Ke(t,r);case 6:return new je(t,r);case 1:return new J(t,r);case 7:return new Qe(t,r);default:return new J(t,r)}}class le{constructor(e,r,i,n,s,a,h,c,d){this.textureTarget=e,this.mipmapLevel=r,this.internalFormat=i,this.width=n,this.height=s,this.border=a,this.format=h,this.type=c,this.pixels=d}}function z(t){return new le(t.TEXTURE_2D,0,t.RGBA32F,t.canvas.width,t.canvas.height,0,t.RGBA,t.FLOAT,null)}function X(t){return new le(t.TEXTURE_2D,0,t.RGBA,t.canvas.width,t.canvas.height,0,t.RGBA,t.UNSIGNED_BYTE,null)}function ue(t,e,r,i=null){t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(r.textureTarget,r.mipmapLevel,r.internalFormat,r.width,r.height,r.border,r.format,r.type,i)}function ot(t){const{onCheckShowGrid:e,onChangeRes:r,res:i,onChangeSpacing:n,spacing:s,canvasRef:a}=t;return P.exports.useEffect(()=>{if(!window.location.hash)return;const h=window.location.hash.split("/")[1],c=h.charAt(0).toUpperCase()+h.slice(1),d=C[c];d&&t.setModule(d)}),q("div",{style:{backgroundColor:"black",display:"flex",flex:1,flexDirection:"column"},children:[q(fe,{sx:{position:"fixed",right:0,backgroundColor:"#111",color:"#eee",width:"15%"},children:[x(pe,{"aria-controls":"panel1d-content",id:"panel1d-header",children:x(G,{style:{margin:"auto"},children:"Settings"})}),q(ve,{children:[x(me,{sx:{color:"white",display:"inline"},onChange:e}),x(G,{sx:{display:"inline"},children:"show grid"}),x(oe,{sx:{width:"50%"},value:i,min:1,max:window.innerWidth*window.devicePixelRatio,step:1,onChange:(h,c)=>r(c)}),q(G,{sx:{display:"inline"},children:[" res: ",i]}),x(oe,{sx:{width:"50%"},value:s,min:1,max:50,step:1,onChange:(h,c)=>n(c)}),x(G,{sx:{display:"inline"},children:" spacing"})]}),x(_e,{sx:{minWidth:120},children:q(we,{fullWidth:!0,children:[x(ye,{id:"demo-simple-select-label",children:"Age"}),x(be,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:t.module,label:"Module",style:{color:"white"},onChange:h=>{window.location.hash="#/"+C[h.target.value],t.setModule(h.target.value)},children:Object.keys(C).filter(h=>isNaN(Number(h))).map(h=>x(Te,{value:C[h],children:h},h))})]})})]}),x("canvas",{ref:a,style:{width:"100vw",height:"100vh",backgroundColor:"grey",imageRendering:"pixelated"}})]})}function st(t,e,r,i=!1){if(!t||!t.current)return;cancelAnimationFrame(e.current),console.log("Setting up canvas...");const n=r(t.current);function s(){i?n.debugRender():n.render(),e.current=requestAnimationFrame(s)}return e.current=requestAnimationFrame(s),()=>cancelAnimationFrame(e.current)}function at(){let t=H.useRef(null),e=H.useRef(-1);const[r,i]=P.exports.useState(!1),[n,s]=P.exports.useState(100),[a,h]=P.exports.useState(1),[c,d]=P.exports.useState(C.Conway);return P.exports.useEffect(()=>{const l=new it(Math.round(n*window.innerWidth/window.innerHeight),n,a);return st(t,e,T=>nt(T,c,l),r)},[t,r,n,a,c]),x("div",{children:x(ot,{onCheckShowGrid:()=>i(!r),onChangeRes:s,res:n,onChangeSpacing:h,spacing:a,canvasRef:t,setModule:d,module:c})})}Re.render(x(H.StrictMode,{children:x(at,{})}),document.getElementById("root"));
