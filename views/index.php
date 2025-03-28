<?php
session_start();

if (!isset($_SESSION['billetes'])) {
    $_SESSION['billetes'] = [];
}

$totalGeneral = array_sum(array_column($_SESSION['billetes'], 'total'));
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arqueo de Caja</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <script defer src="../assets/js/script.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <img src="../assets/img/logo1.jpg" alt="Logo" class="logo">
            <h2>Arqueo de Caja</h2>
        </header>

        <!-- Carrusel de billetes -->
        <div class="carrusel">
            <button id="btn-anterior" class="btn-nav">⬅</button>
            <img id="billete-img" src="" alt="Billete" class="billete">
            <button id="btn-siguiente" class="btn-nav">➡</button>
        </div>

        <!-- Formulario para agregar billetes -->
        <form class="form-arqueo">
            <input type="hidden" id="billete-valor">
            <label>Cantidad:</label>
            <input type="number" id="cantidad-input" min="1" required>
            <button type="button" id="btn-agregar" class="btn">Agregar</button>
        </form>

        <h3>Resumen</h3>
        <table>
            <thead>
                <tr>
                    <th>Billete/Moneda</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody id="tabla-body">
                <!-- Aquí se llenará dinámicamente -->
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2">Total General</th>
                    <th id="total-general"><?php echo number_format($totalGeneral, 2); ?> Bs</th>
                </tr>
            </tfoot>
        </table>

        <button type="button" id="btn-actualizar" class="btn btn-actualizar">Actualizar</button>
        <button type="button" id="btn-borrar" class="btn btn-borrar">Borrar Todo</button>
    </div>
</body>
</html>
