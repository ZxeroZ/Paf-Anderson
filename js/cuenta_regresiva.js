function iniciarCuentaRegresiva() {
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    const segundos = document.getElementById("segundos");

    let tiempoRestante = 14 * 3600 + 56 * 60 + 42; // 14 horas, 56 minutos y 42 segundos

    setInterval(() => {
        if (tiempoRestante <= 0) return;

        tiempoRestante--;

        let h = Math.floor(tiempoRestante / 3600);
        let m = Math.floor((tiempoRestante % 3600) / 60);
        let s = tiempoRestante % 60;

        horas.textContent = String(h).padStart(2, "0");
        minutos.textContent = String(m).padStart(2, "0");
        segundos.textContent = String(s).padStart(2, "0");
    }, 1000);
}

document.addEventListener("DOMContentLoaded", iniciarCuentaRegresiva);
