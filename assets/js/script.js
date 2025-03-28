document.addEventListener("DOMContentLoaded", function () {
    let valores = [1, 2, 5, 10, 20, 50, 100, 200]; // Valores de los billetes
    let index = 0;
    let totalGeneral = 0;
    let tablaBody = document.getElementById("tabla-body");

    function mostrarBillete() {
        document.getElementById('billete-img').src = `../assets/billetes/${valores[index]}.jpg`;
        document.getElementById('billete-valor').value = valores[index];
    }

    function siguiente() {
        if (index < valores.length - 1) index++;
        mostrarBillete();
    }

    function anterior() {
        if (index > 0) index--;
        mostrarBillete();
    }

    function agregarBillete() {
        let valor = parseInt(document.getElementById('billete-valor').value);
        let cantidad = parseInt(document.getElementById('cantidad-input').value);

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Ingrese una cantidad válida.");
            return;
        }

        let total = valor * cantidad;

        // Verificar si el billete ya está en la tabla
        let filas = tablaBody.getElementsByTagName("tr");
        for (let fila of filas) {
            let celdaValor = fila.getAttribute("data-valor");
            if (parseInt(celdaValor) === valor) {
                let inputCantidad = fila.querySelector(".cantidad-input");
                let celdaTotal = fila.querySelector(".total-celda");

                inputCantidad.value = parseInt(inputCantidad.value) + cantidad;
                celdaTotal.innerText = (valor * parseInt(inputCantidad.value)).toFixed(2) + " Bs";
                actualizarTotalGeneral();
                return;
            }
        }

        // Agregar fila a la tabla
        let fila = document.createElement("tr");
        fila.setAttribute("data-valor", valor);

        fila.innerHTML = `
            <td><img src="../assets/billetes/${valor}.jpg" class="billete"></td>
            <td><input type="number" class="cantidad-input" value="${cantidad}" min="1"></td>
            <td class="total-celda">${total.toFixed(2)} Bs</td>
        `;

        tablaBody.appendChild(fila);
        actualizarTotalGeneral();
        document.getElementById('cantidad-input').value = "";
    }

    function actualizarTotalGeneral() {
        totalGeneral = 0;
        let filas = tablaBody.getElementsByTagName("tr");

        for (let fila of filas) {
            let valor = parseInt(fila.getAttribute("data-valor"));
            let cantidad = parseInt(fila.querySelector(".cantidad-input").value);
            let total = valor * cantidad;

            fila.querySelector(".total-celda").innerText = total.toFixed(2) + " Bs";
            totalGeneral += total;
        }

        document.getElementById("total-general").innerText = totalGeneral.toFixed(2) + " Bs";
    }

    function borrarTodo() {
        tablaBody.innerHTML = "";
        totalGeneral = 0;
        document.getElementById("total-general").innerText = "0.00 Bs";
    }

    document.getElementById("btn-agregar").addEventListener("click", agregarBillete);
    document.getElementById("btn-anterior").addEventListener("click", anterior);
    document.getElementById("btn-siguiente").addEventListener("click", siguiente);
    document.getElementById("btn-borrar").addEventListener("click", borrarTodo);
    document.getElementById("btn-actualizar").addEventListener("click", actualizarTotalGeneral);

    mostrarBillete();
});
