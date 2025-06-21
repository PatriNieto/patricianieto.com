#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359


//smoothstep(). Dado un rango de dos números y un valor, 
//esta función interpola el valor entre el rango definido. 
//Los primeros dos parámetros son para el comienzo y el final de la transición, 
//el tercero es el valor a interpolar.
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
} 

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
    //smoothstep(). Dado un rango de dos números y un valor, 
    //esta función interpola el valor entre el rango definido. 
    //Los primeros dos parámetros son para el comienzo y el final de la transición, 
    //el tercero es el valor a interpolar.
    //float y = smoothstep(0.1,0.5,st.x);
        //float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
    //float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
  
    //Add time (u_time) to x before computing the sin. Internalize that motion along x.

    //con u_time podemos hacer que el valor de x cambie con el tiempo, ANIMACION!!!!
    //Efecto: Todo se desplaza horizontalmente hacia la izquierda visualmente
    st.x = st.x + u_time * -0.1;

    //st.x * PI convierte la coordenada X a radianes
//* u_time hace que la frecuencia de la onda cambie con el tiempo
//Resultado: Una onda seno que cambia su frecuencia dinámicamente
    float y = sin((st.x * PI)*u_time*2.0);



    vec3 color = vec3(y);

    

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}


