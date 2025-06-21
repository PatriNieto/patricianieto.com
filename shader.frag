#ifdef GL_ES
precision mediump float;
#endif

//establece un vector de dos dimensiones con la resolucion del navegador
uniform vec2 u_resolution;

//establece la posicion del raton(en pixeles)
uniform vec2 u_mouse;

//establece un tipo float para el tiempo
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0

//recibe un argumento vector de dos dimensiones  st.y y st.x
float plot(vec2 st) {   

		//funcion smoothstep
		//float smoothstep(float edge0, float edge1, float x);
		//edge0 y edge1 definen los límites entre los que se aplicará la transición.
//x es el valor de entrada.
//Devuelve un valor entre 0.0 y 1.0 que sigue una curva suave (no lineal), ideal para transiciones suaves.
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

void main() {

    // Normaliza las coordenadas de fragmento a un rango de 0.0 a 1.0
    // gl_FragCoord.xy devuelve las coordenadas del fragmento actual en píxeles
    //x	Posición horizontal (pixel)
    //y	Posición vertical (pixel)
    //z	Profundidad del fragmento (depth)
    //w	Valor interpolado para perspectiva (opcional/avanzado)
    // u_resolution es un vector que contiene la resolución del viewport
    // Dividiendo las coordenadas del fragmento por la resolución, obtenemos un rango de 0.0 a 1.0 en un vector de dos dimensiones
    // Esto nos permite trabajar con coordenadas normalizadas en lugar de píxeles absolutos
	vec2 st = gl_FragCoord.xy/u_resolution;


	//y es igual al ancho? 
    float y = st.x;

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}