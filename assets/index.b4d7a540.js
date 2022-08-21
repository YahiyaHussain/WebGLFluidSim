var ge=Object.defineProperty;var xe=(t,e,i)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var o=(t,e,i)=>(xe(t,typeof e!="symbol"?e+"":e,i),i);import{r as P,j as q,A as fe,a as x,b as pe,T as G,c as me,C as ve,S as ne,B as _e,F as we,I as ye,d as be,M as Te,R as H,e as Re}from"./vendor.84f156a2.js";const Se=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}};Se();class ${draw(e,i){const r=0;var n=this.points.length;e.usePositions(this.points),e.use(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.drawArrays(this.primitive,r,n)}}class _ extends ${constructor(e){super();o(this,"points");o(this,"primitive");this.gl=e;let i=[new g(0,0),new g(1,0),new g(1,1)],r=[new g(0,1),new g(0,0),new g(1,1)];this.points=i.concat(r),this.primitive=this.gl.TRIANGLES}}var Ee=`#version 300 es
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
}`;class U{usePositions(e){if(!this.gl||!this.program)throw"Cannot call usePositions on baseShader without extending it first";he(this.gl,this.program,e),ce(this.gl,this.program,e)}}class S extends U{constructor(e,i){super();o(this,"program");this.gl=e,this.tex_loc=i,this.program=y(e,D,Ee)}uniforms(){this.gl.useProgram(this.program),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_texture"),this.tex_loc)}attributes(){}use(e){b(this.gl,e,this.tex_loc,u.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class j{constructor(e,i){this.textureShader=e,this.input_texture=i}usePositions(e){this.textureShader.usePositions(e)}use(){this.textureShader.use(this.input_texture)}}class Ae extends S{constructor(e){super(e,0);o(this,"dataTexture");o(this,"dataLen");o(this,"uses_texture",!0);this.gl=e,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.data(new Array(this.dataLen).fill(255)),this.setup()}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this.dataTexture&&this.gl.deleteTexture(this.dataTexture);const i=new Uint8Array(e);return this.dataTexture=A(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this.dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}setup(){}use(){if(!this.dataTexture)throw"Tried to use DataShader without initializing data";super.use(this.dataTexture)}}class E{constructor(e,i){o(this,"limited",!1);this.func=e,this.rate_per_sec=i}run(...e){this.limited||(this.func.apply(null,e),this.limited=!0,setTimeout(()=>{this.limited=!1},1e3/this.rate_per_sec))}}class Fe{constructor(e,i,r){o(this,"swapped",!1);o(this,"fb1");o(this,"fb2");o(this,"tex1");o(this,"tex2");this.gl=e,this.textureSettings=i,this.fb1=N(e),this.fb2=N(e),this.tex1=A(e),this.tex2=A(e),this.setup(r)}setup(e){if(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.tex1),b(this.gl,this.tex1,0,u.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),b(this.gl,this.tex2,1,u.Clamp),this.gl.texImage2D(this.textureSettings.textureTarget,this.textureSettings.mipmapLevel,this.textureSettings.internalFormat,this.textureSettings.width,this.textureSettings.height,this.textureSettings.border,this.textureSettings.format,this.textureSettings.type,this.textureSettings.pixels),this.gl.bindTexture(this.gl.TEXTURE_2D,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb1),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex1,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fb2),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.tex2,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),e){const i=N(this.gl);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,i),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,this.fb2),this.gl.blitFramebuffer(0,0,this.gl.canvas.width,this.gl.canvas.height,0,0,this.gl.canvas.width,this.gl.canvas.height,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST),this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,null),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null)}}swapGet(){return this.swapped?(this.swapped=!this.swapped,[this.fb2,this.tex1]):(this.swapped=!this.swapped,[this.fb1,this.tex2])}peek(){return this.swapped?[this.fb2,this.tex1]:[this.fb1,this.tex2]}}class L{constructor(e,i,r,n=void 0){o(this,"pingPong");this.geometry=i,this.pingPong=new Fe(e,r,n)}apply(e,i=r=>{}){const[r,n]=this.pingPong.swapGet();this.geometry.draw(new j(e,n),r);const[s,h]=this.pingPong.peek();return i(h),this}render(e,i){const[r,n]=this.pingPong.peek();this.geometry.draw(new j(e,n),i)}}var Ce=`#version 300 es
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
`;class Ue extends U{constructor(e,i,r){super();o(this,"program");o(this,"_dataTexture");o(this,"dataLen");this.gl=e,this.tex1_loc=i,this.tex2_loc=r,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.program=y(e,D,De)}uniforms(){var e=this.gl.getUniformLocation(this.program,"u_texture_1"),i=this.gl.getUniformLocation(this.program,"u_texture_2");this.gl.uniform1i(e,this.tex1_loc),this.gl.uniform1i(i,this.tex2_loc)}attributes(){}dataTexture(e){return this._dataTexture=e,this}data(e){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;this._dataTexture&&this.gl.deleteTexture(this._dataTexture);const i=new Uint8Array(e);return this._dataTexture=A(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.canvas.width,this.gl.canvas.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(e){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";b(this.gl,this._dataTexture,0,u.Clamp),b(this.gl,e,1,u.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class oe{constructor(e,i){o(this,"gl");o(this,"geometry");o(this,"dataShader");o(this,"conwayShader");o(this,"textureRenderShader");o(this,"dataMultiplyShader");o(this,"conwayDebounced");o(this,"drawDebounced");o(this,"eraseDebounced");o(this,"renderSeq");o(this,"paused",!1);this.mouseEvents(e),this.gl=K(e),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.geometry=new _(this.gl),this.dataShader=new Ae(this.gl),this.conwayShader=new Pe(this.gl),this.textureRenderShader=new S(this.gl,0),this.dataMultiplyShader=new Ue(this.gl,0,1),this.renderSeq=new L(this.gl,this.geometry,X(this.gl)),this.renderSeq.apply(this.dataShader),this.renderSeq.render(this.textureRenderShader,null),this.conwayDebounced=new E(()=>{this.paused||(this.renderSeq.apply(this.conwayShader),this.renderSeq.render(this.textureRenderShader,null))},10),this.drawDebounced=new E(r=>{var n=e.getBoundingClientRect();this.drawPoint(r.clientX-n.left,r.clientY-n.top,e.clientWidth,e.clientHeight)},100),this.eraseDebounced=new E(r=>{this.erasePoint(r.clientX,r.clientY,e.clientWidth,e.clientHeight)},100)}drawPoint(e,i,r,n){const s=this.gl.canvas.width,h=this.gl.canvas.height,a=new Array(4*s*h).fill(255),c=Math.floor(s*e/r),d=Math.floor(h*i/n),l=(c+d*s)*4;a[l]=0,a[l+1]=0,a[l+2]=0,this.renderSeq.apply(this.dataMultiplyShader.data(a)),this.renderSeq.render(this.textureRenderShader,null)}erasePoint(e,i,r,n){const s=this.gl.canvas.width,h=this.gl.canvas.height,a=new Array(4*s*h).fill(255),c=Math.floor(s*e/r),d=Math.floor(h*i/n),l=(c+d*s)*4;a[l]=255,a[l+1]=255,a[l+2]=255,this.renderSeq.apply(this.dataMultiplyShader.data(a)),this.renderSeq.render(this.textureRenderShader,null)}clear(){const e=this.gl.canvas.width,i=this.gl.canvas.height,r=new Array(4*e*i).fill(255);this.renderSeq.apply(this.dataMultiplyShader.data(r)),this.renderSeq.render(this.textureRenderShader,null)}mouseEvents(e){e.onmousedown=i=>{this.drawDebounced.run(i),e.onmousemove=r=>{i.button==0&&!i.ctrlKey?this.drawDebounced.run(r):this.eraseDebounced.run(r)}},e.onmouseup=i=>{e.onmousemove=null},e.oncontextmenu=i=>(this.eraseDebounced.run(i),!1),window.onkeydown=i=>{i.key=="c"&&(console.log("clear!"),this.clear()),i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}render(){this.conwayDebounced.run()}debugRender(){}}var Le=`#version 300 es
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
`;class J extends U{constructor(e,i,r,n,s){super();o(this,"program");o(this,"setVelTex",!1);this.gl=e,this.timestep=i,this.dyeTextureIdx=r,this.velocityTextureIdx=n,this.wrapType=s,this.program=y(e,D,Le)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_dye_texture"),this.dyeTextureIdx)}attributes(){}velocityTexture(e){return this.setVelTex=!0,b(this.gl,e,this.velocityTextureIdx,this.wrapType),this}use(e){if(!this.setVelTex)throw"Did not set velocity texture yet for Dye Advection shader";this.gl.useProgram(this.program),this.uniforms(),this.attributes(),b(this.gl,e,this.dyeTextureIdx,this.wrapType)}}var Me=`#version 300 es
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
`;class Be extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,Ie)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}function Q(t,e){if(!t.getExtension("EXT_color_buffer_float")){const s="need EXT_color_buffer_float";throw alert(s),s}ue(t,e,z(t)),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST);const r=N(t);return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),new _(t).draw(new qe(t),r),r}var Xe=`#version 300 es
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
`;class se extends U{constructor(e,i,r,n){super();o(this,"program");this.gl=e,this.timestep=i,this.velocityTextureIdx=r,this.wrapType=n,this.program=y(e,D,Xe)}uniforms(){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,"u_viewportCoord"),[this.gl.canvas.width,this.gl.canvas.height]),this.gl.uniform1f(this.gl.getUniformLocation(this.program,"u_timestep"),this.timestep),this.gl.uniform1i(this.gl.getUniformLocation(this.program,"u_velocity_texture"),this.velocityTextureIdx)}attributes(){}use(e){this.gl.useProgram(this.program),this.uniforms(),this.attributes(),b(this.gl,e,this.velocityTextureIdx,this.wrapType)}}var Ge=`#version 300 es
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
`;class Z extends U{constructor(e,i,r){super();o(this,"program");o(this,"_dataTexture");o(this,"dataLen");this.gl=e,this.dataTexLoc=i,this.inputTexLoc=r,this.dataLen=4*Math.round(e.canvas.width)*Math.round(e.canvas.height),this.program=y(e,D,Ge)}uniforms(){var e=this.gl.getUniformLocation(this.program,"u_input_tex"),i=this.gl.getUniformLocation(this.program,"u_data_tex");this.gl.uniform1i(i,this.dataTexLoc),this.gl.uniform1i(e,this.inputTexLoc)}attributes(){}dataTexture(e){return this._dataTexture=e,this}data(e,i=M.Color){if(e.length!=this.dataLen)throw`data list was found to have length: ${e.length}, but was expected to have 4 x width x height: ${this.dataLen}`;switch(this._dataTexture&&this.gl.deleteTexture(this._dataTexture),this._dataTexture=A(this.gl),this.gl.bindTexture(this.gl.TEXTURE_2D,this._dataTexture),i){case M.Color:var r=new Uint8Array(e),n=X(this.gl);break;case M.Float:var r=new Float32Array(e),n=z(this.gl)}return ue(this.gl,this._dataTexture,n,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this}use(e){if(!this._dataTexture)throw"Must initialize data texture before using DataMultiplyShader";b(this.gl,this._dataTexture,0,u.Clamp),b(this.gl,e,1,u.Clamp),this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}var ke=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
out vec4 color;

 
void main() {
   color = vec4(0.,0.,0.,1.);
}
`;class ee extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,ke)}uniforms(){}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Ke{constructor(e,i){o(this,"gl");o(this,"debouncer");o(this,"dyeRenderSeq");o(this,"drawDebounced");o(this,"dataRandomShader");o(this,"paused",!1);this.gl=K(e),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new Z(this.gl,0,1),this.setup(),this.drawDebounced=new E(n=>{var s=e.getBoundingClientRect();this.drawPoint(n.clientX-s.left,n.clientY-s.top,e.clientWidth,e.clientHeight)},100),this.mouseEvents(e),new _(this.gl).draw(new ee(this.gl),null)}mouseEvents(e){e.onmousedown=i=>{this.drawDebounced.run(i),e.onmousemove=r=>{i.button==0&&!i.ctrlKey&&this.drawDebounced.run(r)}},e.onmouseup=i=>{e.onmousemove=null},window.onkeydown=i=>{i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=i=>{ie(this.gl,i).then(r=>{const n=new _(this.gl),s=A(this.gl);Q(this.gl,s);const h=new L(this.gl,n,z(this.gl),s);this.dyeRenderSeq=new L(this.gl,n,X(this.gl),r);const a=new se(this.gl,.03,0,u.Clamp),c=new J(this.gl,.1,0,1,u.Clamp);this.debouncer=new E(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";h.apply(a,d=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(c.velocityTexture(d))}),this.dyeRenderSeq.render(new S(this.gl,0),null)},25)})};document.onpaste=e}drawPoint(e,i,r,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,h=this.gl.canvas.height,a=new Array(4*s*h).fill(0),c=Math.floor(s/30),d=Math.floor(s*e/r),l=Math.floor(h*i/n),F=d-Math.floor(c/2),T=l-Math.floor(c/2);for(let f=0;f<c;f++)for(let m=0;m<c;m++){const v=F+f,w=T+m;if(v<0||v>=s||w<0||w>=h)continue;const p=(v+w*s)*4,O=new Date().getTime()%5e3/5e3,R=Math.PI*2*O,W=Math.sin(R)*255,Y=Math.cos(R)*255,V=Math.sin(R)*Math.cos(R)*255;a[p]=W,a[p+1]=Y,a[p+2]=V,a[p+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(a)),this.dyeRenderSeq.render(new S(this.gl,0),null)}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}class Ne extends ${constructor(e){super();o(this,"points");o(this,"primitive");this.gl=e;const i=1/e.canvas.width/2,r=1/e.canvas.height/2;this.points=[new g(i,1-r),new g(1-i,1-r),new g(1-i,r),new g(0,r),new g(i,1-r)],this.primitive=e.LINE_STRIP}}class ze extends ${constructor(e){super();o(this,"points");o(this,"primitive");this.gl=e;const i=1/e.canvas.width/2,r=1/e.canvas.height/2;this.points=[new g(i*2,1-r*2),new g(i*2,r*2),new g(1-i*2,r*2),new g(i*2,1-r*2),new g(1-i*2,r*2),new g(1-i*2,1-r*2)],this.primitive=e.TRIANGLES}}var Oe=`#version 300 es
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
`;class te extends B{constructor(e,i){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.ms_per_cycle=i,this.program=y(e,I,Oe)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height]);var i=this.gl.getUniformLocation(this.program,"u_angle_rad");const r=new Date,n=1e3*r.getSeconds()+r.getMilliseconds();this.gl.uniform1f(i,2*Math.PI*(n%this.ms_per_cycle)/this.ms_per_cycle)}attributes(){}use(){this.uniforms(),this.attributes()}}class We{constructor(e,i){o(this,"gl");o(this,"width");o(this,"height");o(this,"skinGeometry");o(this,"coreGeometry");o(this,"skinShader");o(this,"coreShader");const r=k(e);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.skinGeometry=new Ne(r),this.coreGeometry=new ze(r),this.skinShader=new te(r,4e3),this.coreShader=new te(r,6e3),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.coreGeometry.draw(this.coreShader,null),this.skinGeometry.draw(this.skinShader,null)}debugRender(){}}class Ye{constructor(e,i){o(this,"gl");o(this,"width");o(this,"height");o(this,"shader");o(this,"geometry");const r=k(e);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.shader=new te(r,4e3),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.shader,null)}debugRender(){this.geometry.draw(this.shader,null)}}class Ve{constructor(e,i){o(this,"gl");o(this,"width");o(this,"height");o(this,"spiralShader");o(this,"geometry");const r=k(e);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.spiralShader=new Be(r),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.spiralShader,null)}debugRender(){this.geometry.draw(this.spiralShader,null)}}class He{constructor(e,i){o(this,"gl");o(this,"debouncer");o(this,"dyeRenderSeq");o(this,"drawDebounced");o(this,"dataRandomShader");o(this,"paused",!1);this.gl=K(e),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new Z(this.gl,0,1),this.setup(),this.drawDebounced=new E(n=>{var s=e.getBoundingClientRect();this.drawPoint(n.clientX-s.left,n.clientY-s.top,e.clientWidth,e.clientHeight)},100),this.mouseEvents(e),new _(this.gl).draw(new ee(this.gl),null)}mouseEvents(e){e.onmousedown=i=>{this.drawDebounced.run(i),e.onmousemove=r=>{i.button==0&&!i.ctrlKey&&this.drawDebounced.run(r)}},e.onmouseup=i=>{e.onmousemove=null},window.onkeydown=i=>{i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=i=>{ie(this.gl,i).then(r=>{const n=new _(this.gl),s=A(this.gl);Q(this.gl,s),this.dyeRenderSeq=new L(this.gl,n,X(this.gl),r);const h=new J(this.gl,.1,0,1,u.Clamp);this.debouncer=new E(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(h.velocityTexture(s)),this.dyeRenderSeq.render(new S(this.gl,0),null)},20)})};document.onpaste=e}drawPoint(e,i,r,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,h=this.gl.canvas.height,a=new Array(4*s*h).fill(0),c=Math.floor(s/30),d=Math.floor(s*e/r),l=Math.floor(h*i/n),F=d-Math.floor(c/2),T=l-Math.floor(c/2);for(let f=0;f<c;f++)for(let m=0;m<c;m++){const v=F+f,w=T+m;if(v<0||v>=s||w<0||w>=h)continue;const p=(v+w*s)*4,O=new Date().getTime()%5e3/5e3,R=Math.PI*2*O,W=Math.sin(R)*255,Y=Math.cos(R)*255,V=Math.sin(R)*Math.cos(R)*255;a[p]=W,a[p+1]=Y,a[p+2]=V,a[p+3]=255}this.dyeRenderSeq.apply(this.dataRandomShader.data(a)),this.dyeRenderSeq.render(new S(this.gl,0),null)}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}class $e{constructor(e,i){o(this,"gl");o(this,"debouncer");o(this,"dyeRenderSeq");o(this,"velocityRenderSeq");o(this,"drawDebounced");o(this,"dataRandomShader");o(this,"paused",!1);o(this,"lastCoords");this.gl=K(e),this.gl.canvas.width=i.res_x,this.gl.canvas.height=i.res_y,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.dataRandomShader=new Z(this.gl,0,1),this.setup(),this.drawDebounced=new E(n=>{var s=e.getBoundingClientRect();this.drawPoint(n.clientX-s.left,n.clientY-s.top,e.clientWidth,e.clientHeight)},50),this.mouseEvents(e),new _(this.gl).draw(new ee(this.gl),null)}mouseEvents(e){e.onmousedown=i=>{this.drawDebounced.run(i),e.onmousemove=r=>{i.button==0&&!i.ctrlKey&&this.drawDebounced.run(r)}},e.onmouseup=i=>{e.onmousemove=null},window.onkeydown=i=>{i.key==" "&&(this.paused=!this.paused,console.log(this.paused?"pause!":"play!"))}}setup(){const e=i=>{ie(this.gl,i).then(r=>{const n=new _(this.gl),s=A(this.gl);Q(this.gl,s),this.velocityRenderSeq=new L(this.gl,n,z(this.gl)),this.dyeRenderSeq=new L(this.gl,n,X(this.gl),r);const h=new se(this.gl,.03,0,u.Clamp);new S(this.gl,0);const a=new J(this.gl,.1,0,1,u.Clamp);this.debouncer=new E(()=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";if(!this.velocityRenderSeq)throw"velocity render seq was undefined";this.velocityRenderSeq.apply(h,c=>{if(!this.dyeRenderSeq)throw"Render sequence was undefined";this.dyeRenderSeq.apply(a.velocityTexture(c))}),this.dyeRenderSeq.render(new S(this.gl,0),null)},25)})};document.onpaste=e}drawPoint(e,i,r,n){if(!this.dyeRenderSeq)throw"Render sequence was undefined";const s=this.gl.canvas.width,h=this.gl.canvas.height,a=new Array(4*s*h).fill(0),c=Math.floor(s/30),d=Math.floor(s*e/r),l=Math.floor(h*i/n);if(!this.lastCoords){this.lastCoords=[d,l],setTimeout(()=>this.lastCoords=void 0,100);return}const F=d-Math.floor(c/2),T=l-Math.floor(c/2);for(let f=0;f<c;f++)for(let m=0;m<c;m++){const v=F+f,w=T+m;if(v<0||v>=s||w<0||w>=h)continue;const p=(v+w*s)*4;new Date().getTime()%5e3/5e3,a[p]=(d-this.lastCoords[0])/s*10,a[p+1]=-((l-this.lastCoords[1])/h)*10,a[p+2]=0,a[p+3]=255}if(!this.velocityRenderSeq)throw alert("Paste image first"),"Didn't paste image before drawing";this.velocityRenderSeq.apply(this.dataRandomShader.data(a,M.Float))}render(){var e;this.paused||(e=this.debouncer)==null||e.run()}debugRender(){}}var je=`#version 300 es
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
  float magn = length(deriv_coord)*0.3;
  angle = angle > 0. ? angle : angle + 2.*PI;

  color = vec4(hsv2rgb(vec3(angle/ (2.*PI), 0.59, 0.9*magn + 0.35)), 1.);

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
`;class Je extends B{constructor(e){super();o(this,"program");o(this,"uses_texture",!1);this.gl=e,this.program=y(e,I,je)}uniforms(){this.gl.useProgram(this.program);var e=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(e,[this.gl.canvas.width,this.gl.canvas.height])}attributes(){}use(){this.gl.useProgram(this.program),this.uniforms(),this.attributes()}}class Qe{constructor(e,i){o(this,"gl");o(this,"width");o(this,"height");o(this,"carpetShader");o(this,"geometry");const r=k(e);if(!r)throw"Could not create webgl2 context";this.gl=r,this.width=i.res_x,this.height=i.res_y,this.geometry=new _(r),this.carpetShader=new Je(r),this.setup()}setup(){this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height)}render(){this.geometry.draw(this.carpetShader,null)}debugRender(){this.geometry.draw(this.carpetShader,null)}}function ae(t,e,i){var r=t.createShader(e);if(r){t.shaderSource(r,i),t.compileShader(r);var n=t.getShaderParameter(r,t.COMPILE_STATUS);if(n)return r;console.log(t.getShaderInfoLog(r)),t.deleteShader(r)}console.error("Shader creation borked")}function Ze(t,e,i){var r=t.createProgram();if(r){t.attachShader(r,e),t.attachShader(r,i),t.linkProgram(r);var n=t.getProgramParameter(r,t.LINK_STATUS);if(n)return r;console.log(t.getProgramInfoLog(r)),t.deleteProgram(r)}console.error("Shader program borked")}function y(t,e,i){const r=ae(t,t.VERTEX_SHADER,e),n=ae(t,t.FRAGMENT_SHADER,i);if(!r){const h="failed to make vertex shader";throw console.error(h),h}if(!n){const h="failed to make vertex shader";throw console.error(h),h}const s=Ze(t,r,n);if(!s){const h="failed to make shader program";throw console.error(h),alert(h),h}if(t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))throw"Program link failed with: "+t.getProgramInfoLog(s);return s}function k(t){const e=t.getContext("webgl2");return e===null?(alert("Unable to initialize WebGL. Your browser or machine may not support it."),null):e}function he(t,e,i){const r=t.createBuffer();if(!r){const l="Failed to make position buffer";throw console.error(l),l}tt(t,r,i),t.useProgram(e);var n=t.getAttribLocation(e,"a_position");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,r);var s=2,h=t.FLOAT,a=!1,c=0,d=0;t.vertexAttribPointer(n,s,h,a,c,d)}function ce(t,e,i){const r=t.createBuffer();if(!r){const l="failed to make texcoord buffer";console.error(l),alert(l);return}it(t,r,i),t.useProgram(e);const n=t.getAttribLocation(e,"a_texcoord");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,r);var s=2,h=t.FLOAT,a=!1,c=0,d=0;t.vertexAttribPointer(n,s,h,a,c,d)}function b(t,e,i,r){switch(t.activeTexture(t.TEXTURE0+i),t.bindTexture(t.TEXTURE_2D,e),r){case u.Repeat:t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);break;case u.Clamp:t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);break}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST)}var u;(function(t){t[t.Repeat=0]="Repeat",t[t.Clamp=1]="Clamp"})(u||(u={}));function K(t){const e=t.getContext("webgl2");if(!e){const i="couldn't create canvas webgl2 context";throw console.log(i),i}return e}function de(t){const e=t.getContext("2d");if(!e){const i="couldn't create canvas 2d context";throw console.log(i),i}return e}function A(t){const e=t.createTexture();if(!e)throw"Couldn't create texture";return e}function N(t){const e=t.createFramebuffer();if(!e)throw"Couldn't create texture";return e}async function ie(t,e){var n;const i=(n=e.clipboardData)==null?void 0:n.items;if(!i){const s="Couldn't get items from paste";throw console.log(s),s}for(let s in i){var r=i[s];if(r.kind==="file"){const h=r.getAsFile();if(!h){const c="couldn't get paste blob";throw console.log(c),c}const a=URL.createObjectURL(h);if(!a){const c="couldn't create object url from blob";throw console.log(c),c}return et(a).then(c=>{const d=document.createElement("canvas"),l=document.createElement("canvas"),F=de(d),T=de(l);d.width=c.width,d.height=c.height,F.drawImage(c,0,0,c.width,c.height),l.width=t.canvas.width,l.height=t.canvas.height,T.drawImage(d,0,0,d.width,d.height,0,0,l.width,l.height);const f=A(t);t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,l);const m=new _(t),v=new S(t,0);return m.draw(new j(v,f),null),f})}}}function et(t){return new Promise(e=>{const i=new Image;i.onload=()=>{e(i)},i.src=t})}class re{constructor(e,i){if(this.x=e,this.y=i,e<-1||e>1||i<-1||i>1)throw"constructed invalid clip point";this.x=e,this.y=i}static fromUVPoint(e){return new re(e.x*2-1,e.y*2-1)}}class g{constructor(e,i){if(this.x=e,this.y=i,e<0||e>1||i<0||i>1)throw"constructed invalid clip point";this.x=e,this.y=i}}function tt(t,e,i){t.bindBuffer(t.ARRAY_BUFFER,e);let r=[];for(let n of i){const s=re.fromUVPoint(n);r.push(s.x),r.push(s.y)}t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}function it(t,e,i){t.bindBuffer(t.ARRAY_BUFFER,e);let r=[];for(let n of i)r.push(n.x),r.push(n.y);t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}class rt{constructor(e,i,r){this.res_x=e,this.res_y=i,this.grid_spacing=r}}var C;(function(t){t[t.Border=0]="Border",t[t.Conway=1]="Conway",t[t.Sine=2]="Sine",t[t.Spiral=3]="Spiral",t[t.StaticAdvection=4]="StaticAdvection",t[t.DynamicAdvection=5]="DynamicAdvection",t[t.DrawVelocity=6]="DrawVelocity",t[t.SierpinskiCarpet=7]="SierpinskiCarpet"})(C||(C={}));var M;(function(t){t[t.Color=0]="Color",t[t.Float=1]="Float"})(M||(M={}));function nt(t,e,i){switch(e){case 0:return new We(t,i);case 1:return new oe(t,i);case 2:return new Ye(t,i);case 3:return new Ve(t,i);case 4:return new He(t,i);case 5:return new Ke(t,i);case 6:return new $e(t,i);case 7:return new Qe(t,i);default:return new oe(t,i)}}class le{constructor(e,i,r,n,s,h,a,c,d){this.textureTarget=e,this.mipmapLevel=i,this.internalFormat=r,this.width=n,this.height=s,this.border=h,this.format=a,this.type=c,this.pixels=d}}function z(t){return new le(t.TEXTURE_2D,0,t.RGBA32F,t.canvas.width,t.canvas.height,0,t.RGBA,t.FLOAT,null)}function X(t){return new le(t.TEXTURE_2D,0,t.RGBA,t.canvas.width,t.canvas.height,0,t.RGBA,t.UNSIGNED_BYTE,null)}function ue(t,e,i,r=null){t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(i.textureTarget,i.mipmapLevel,i.internalFormat,i.width,i.height,i.border,i.format,i.type,r)}function ot(t){const{onCheckShowGrid:e,onChangeRes:i,res:r,onChangeSpacing:n,spacing:s,canvasRef:h}=t;return P.exports.useEffect(()=>{if(!window.location.hash)return;const a=window.location.hash.split("/")[1],c=a.charAt(0).toUpperCase()+a.slice(1),d=C[c];d&&t.setModule(d)}),q("div",{style:{backgroundColor:"black",display:"flex",flex:1,flexDirection:"column"},children:[q(fe,{sx:{position:"fixed",right:0,backgroundColor:"#111",color:"#eee",width:"15%"},children:[x(pe,{"aria-controls":"panel1d-content",id:"panel1d-header",children:x(G,{style:{margin:"auto"},children:"Settings"})}),q(me,{children:[x(ve,{sx:{color:"white",display:"inline"},onChange:e}),x(G,{sx:{display:"inline"},children:"show grid"}),x(ne,{sx:{width:"50%"},value:r,min:1,max:window.innerWidth*window.devicePixelRatio,step:1,onChange:(a,c)=>i(c)}),q(G,{sx:{display:"inline"},children:[" res: ",r]}),x(ne,{sx:{width:"50%"},value:s,min:1,max:50,step:1,onChange:(a,c)=>n(c)}),x(G,{sx:{display:"inline"},children:" spacing"})]}),x(_e,{sx:{minWidth:120},children:q(we,{fullWidth:!0,children:[x(ye,{id:"demo-simple-select-label",children:"Age"}),x(be,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:t.module,label:"Module",style:{color:"white"},onChange:a=>{window.location.hash="#/"+C[a.target.value],t.setModule(a.target.value)},children:Object.keys(C).filter(a=>isNaN(Number(a))).map(a=>x(Te,{value:C[a],children:a},a))})]})})]}),x("canvas",{ref:h,style:{margin:"auto",width:`${Math.min(window.innerWidth,window.innerHeight)}px`,height:`${Math.min(window.innerWidth,window.innerHeight)}px`,backgroundColor:"grey",imageRendering:"pixelated"}})]})}function st(t,e,i,r=!1){if(!t||!t.current)return;cancelAnimationFrame(e.current),console.log("Setting up canvas...");const n=i(t.current);function s(){r?n.debugRender():n.render(),e.current=requestAnimationFrame(s)}return e.current=requestAnimationFrame(s),()=>cancelAnimationFrame(e.current)}function at(){let t=H.useRef(null),e=H.useRef(-1);const[i,r]=P.exports.useState(!1),[n,s]=P.exports.useState(100),[h,a]=P.exports.useState(1),[c,d]=P.exports.useState(C.Conway);return P.exports.useEffect(()=>{const l=new rt(Math.round(n*window.innerWidth/window.innerHeight),n,h);return st(t,e,T=>nt(T,c,l),i)},[t,i,n,h,c]),x("div",{children:x(ot,{onCheckShowGrid:()=>r(!i),onChangeRes:s,res:n,onChangeSpacing:a,spacing:h,canvasRef:t,setModule:d,module:c})})}Re.render(x(H.StrictMode,{children:x(at,{})}),document.getElementById("root"));
