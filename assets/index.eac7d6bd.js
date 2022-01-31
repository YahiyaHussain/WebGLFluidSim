var w=Object.defineProperty;var b=(o,e,r)=>e in o?w(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var u=(o,e,r)=>(b(o,typeof e!="symbol"?e+"":e,r),r);import{R as v,r as m,j as _,A as F,a as c,b as y,T as p,c as S,C as P,S as R,d as L}from"./vendor.a16032df.js";const U=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}};U();var C=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,B=`#version 300 es
// attribute vec4 a_position;
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`,D=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_viewportCoord;
uniform float u_angle_rad;
out vec4 color;

 
void main() {
   vec2 uv_coord = floor(gl_FragCoord.xy) / u_viewportCoord.xy;
   color = vec4((sin(u_angle_rad)+1.)/2., (cos(u_angle_rad)+1.)/2., (uv_coord.y*sin(u_angle_rad)+1.)/2., 1.) / 1.1;
}
`,G=`#version 300 es
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
`;function E(o,e,r){var t=o.createShader(e);if(t){o.shaderSource(t,r),o.compileShader(t);var i=o.getShaderParameter(t,o.COMPILE_STATUS);if(i)return t;console.log(o.getShaderInfoLog(t)),o.deleteShader(t)}console.error("Shader creation borked")}function M(o,e,r){var t=o.createProgram();if(t){o.attachShader(t,e),o.attachShader(t,r),o.linkProgram(t);var i=o.getProgramParameter(t,o.LINK_STATUS);if(i)return t;console.log(o.getProgramInfoLog(t)),o.deleteProgram(t)}console.error("Shader program borked")}class A{constructor(e,r){if(this.x=e,this.y=r,e<-1||e>1||r<-1||r>1)throw"constructed invalid clip point";this.x=e,this.y=r}static fromUVPoint(e){return new A(e.x*2-1,e.y*2-1)}}class g{constructor(e,r){if(this.x=e,this.y=r,e<0||e>1||r<0||r>1)throw"constructed invalid clip point";this.x=e,this.y=r}}function T(o,e,r){o.bindBuffer(o.ARRAY_BUFFER,e);let t=[];for(let i of r){const s=A.fromUVPoint(i);t.push(s.x),t.push(s.y)}o.bufferData(o.ARRAY_BUFFER,new Float32Array(t),o.STATIC_DRAW)}class I{constructor(e,r,t){this.res_x=e,this.res_y=r,this.grid_spacing=t}}class O{constructor(e,r){u(this,"gl");u(this,"width");u(this,"height");u(this,"spacing");u(this,"program");u(this,"gridProgram");this.gl=e,this.width=r.res_x,this.height=r.res_y,this.spacing=r.grid_spacing;let t=this.compileShaders(C,D);if(!t)throw"Could not create shader program";let i=this.compileShaders(B,G);if(!i)throw"Could not create grid shader program";this.program=t,this.gridProgram=i,this.setup()}setup(){this.gl.clearColor(.1,.5,.8,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.canvas.width=this.width,this.gl.canvas.height=this.height,this.gl.viewport(0,0,this.width,this.height),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}compileShaders(e,r){const t=E(this.gl,this.gl.VERTEX_SHADER,e),i=E(this.gl,this.gl.FRAGMENT_SHADER,r);if(!t){const n="failed to make vertex shader";console.error(n),alert(n);return}if(!i){const n="failed to make vertex shader";console.error(n),alert(n);return}const s=M(this.gl,t,i);if(!s){const n="failed to make shader program";console.error(n),alert(n);return}return s}setupGeometry(e){this.gl.useProgram(this.program);var r=this.gl.getUniformLocation(this.program,"u_viewportCoord");this.gl.uniform2fv(r,[this.width,this.height]);var t=this.gl.createBuffer();if(!t){const d="failed to make position buffer";console.error(d),alert(d);return}T(this.gl,t,e);var i=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t);var s=2,n=this.gl.FLOAT,a=!1,l=0,h=0;this.gl.vertexAttribPointer(i,s,n,a,l,h)}setupTextureGeometry(e){this.gl.useProgram(this.gridProgram);var r=this.gl.getUniformLocation(this.gridProgram,"u_viewportCoord");this.gl.uniform2fv(r,[this.width,this.height]);var t=this.gl.createBuffer();if(!t){const f="failed to make position buffer";console.error(f),alert(f);return}T(this.gl,t,e);var i=this.gl.getAttribLocation(this.gridProgram,"a_position");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t);var s=2,n=this.gl.FLOAT,a=!1,l=0,h=0;this.gl.vertexAttribPointer(i,s,n,a,l,h),this.gl.useProgram(this.gridProgram);const d=this.gl.createBuffer();if(!d){const f="failed to make texcoord buffer";console.error(f),alert(f);return}this.gl.bindBuffer(this.gl.ARRAY_BUFFER,d),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);const x=this.gl.getAttribLocation(this.gridProgram,"a_texcoord");this.gl.enableVertexAttribArray(x),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,d);var s=2,n=this.gl.FLOAT,a=!1,l=0,h=0;this.gl.vertexAttribPointer(x,s,n,a,l,h)}render(){let e=[new g(0,0),new g(1,0),new g(0,1)],r=[new g(0,1),new g(1,0),new g(1,1)];this.setupGeometry(e.concat(r));var t=this.gl.TRIANGLES,i=0,s=6;this.gl.useProgram(this.program);var n=this.gl.getUniformLocation(this.program,"u_angle_rad");const a=new Date,l=1e3*a.getSeconds()+a.getMilliseconds();this.gl.uniform1f(n,2*Math.PI*(l%3e3)/3e3),this.gl.drawArrays(t,i,s)}debugRender(){let e=[new g(0,0),new g(1,0),new g(1,1)],r=[new g(0,1),new g(0,0),new g(1,1)];this.setupTextureGeometry(e.concat(r)),this.gl.useProgram(this.program);var t=this.gl.createTexture();this.gl.activeTexture(this.gl.TEXTURE0+0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null);var i=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.viewport(0,0,this.width,this.height),this.render(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.viewport(0,0,this.width,this.height);var s=this.gl.TRIANGLES,n=0,a=6;this.gl.useProgram(this.gridProgram),this.gl.uniform1i(this.gl.getUniformLocation(this.gridProgram,"u_spacing"),this.spacing),this.gl.drawArrays(s,n,a)}}function k(o,e,r,t=!1){if(!o||!o.current)return;cancelAnimationFrame(e.current);const s=o.current.getContext("webgl2");if(s===null){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}console.log("Setting up canvas...");const n=r(s);function a(){t?n.debugRender():n.render(),e.current=requestAnimationFrame(a)}e.current=requestAnimationFrame(a)}function N(){let o=v.useRef(null),e=v.useRef(-1);const[r,t]=m.exports.useState(!1),[i,s]=m.exports.useState(10),[n,a]=m.exports.useState(1);return m.exports.useEffect(()=>{const l=new I(i*window.innerWidth/window.innerHeight,i,n),h=d=>new O(d,l);console.log("settings.grid_spacing",l.grid_spacing),k(o,e,h,r)},[o,r,i,n]),_("div",{style:{backgroundColor:"black",display:"flex",flex:1,flexDirection:"column"},children:[_(F,{sx:{position:"fixed",right:0,backgroundColor:"#111",color:"#eee",width:"15%"},children:[c(y,{"aria-controls":"panel1d-content",id:"panel1d-header",children:c(p,{style:{margin:"auto"},children:"Settings"})}),_(S,{children:[c(P,{sx:{color:"white",display:"inline"},onChange:()=>t(!r)}),c(p,{sx:{display:"inline"},children:"show grid"}),c(R,{sx:{width:"50%"},value:i,min:1,max:50,onChange:(l,h)=>s(h)}),c(p,{sx:{display:"inline"},children:" res"}),c(R,{sx:{width:"50%"},value:n,min:1,max:50,step:1,onChange:(l,h)=>{console.log("v",h),a(h)}}),c(p,{sx:{display:"inline"},children:" spacing"})]})]}),c("canvas",{ref:o,style:{width:"100vw",height:"100vh",backgroundColor:"grey",imageRendering:"pixelated"}})]})}L.render(c(v.StrictMode,{children:c(N,{})}),document.getElementById("root"));
