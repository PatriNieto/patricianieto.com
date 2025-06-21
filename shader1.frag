#ifdef GL_ES
precision mediump float;
#endif


//declaramos PI como una constante
//esto es una buena practica para evitar errores de redondeo
#define PI 3.14159265359


//variables uniformes de resolucion, mouse y tiempo
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// Plot a line on Y using a value between 0.0-1.0
// recibe un argumento vector de dos dimensiones st.y y st.x
// Esta función dibuja una línea en la coordenada Y
// usando un valor entre 0.0 y 1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;


//pow() es una función nativa en GLSL y hay muchas más. La mayoría de ellas son aceleradas por hardware, lo que significa que, usadas de la forma correcta, harán tu código mucho más rápido.
    //float y = pow(st.x,5.0);
    float y = pow(st.x,5.0);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}