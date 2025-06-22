#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    // Desplazamiento horizontal con el tiempo
    st.x += u_time;

    // Controlar frecuencia con el dedo (horizontal)
    float freq = mix(1.0, 10.0, u_mouse.x *10.0 / u_resolution.x);

    // Cálculo de la onda senoidal
    float wave = sin(st.x * PI * freq + u_time) * 0.5 + 0.5;

    // Color base (usando valor de la onda)
    vec3 baseColor = vec3(wave);

    // Color alternativo controlado por posición vertical del mouse
    vec3 altColor = vec3(u_mouse.y / u_resolution.y, 0.0, 1.0 - wave);

    // Combinar ambos colores
    vec3 color = mix(baseColor, altColor, 0.5);

    // Dibujo de la línea con plot
    float pct = plot(st, wave);
    color = mix(color, vec3(0.0, 1.0, 0.0), pct);

    gl_FragColor = vec4(color, 1.0);
}
