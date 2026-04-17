-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 20-03-2026 a las 19:43:48
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grupo_9`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `stock` varchar(10) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `tipo`, `cantidad`, `costo`, `stock`, `usuario`, `fecha`) VALUES
(4, 'Laptop HP', 'Electrónica', 5, 35000.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(5, 'Mouse Logitech', 'Accesorio', 20, 800.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(6, 'Teclado Mecánico', 'Accesorio', 10, 2500.00, 'no', 'Lmarte', '2026-03-20 19:41:20'),
(7, 'Monitor Samsung', 'Electrónica', 3, 12000.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(8, 'Disco SSD 1TB', 'Almacenamiento', 7, 5000.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(9, 'Laptop Dell', 'Electrónica', 4, 42000.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(10, 'Memoria RAM 16GB', 'Hardware', 15, 3000.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(11, 'Fuente de Poder 600W', 'Hardware', 6, 2800.00, 'no', 'Lmarte', '2026-03-20 19:41:20'),
(12, 'Router TP-Link', 'Redes', 8, 2200.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(13, 'Switch 8 Puertos', 'Redes', 5, 1800.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(14, 'Tablet Samsung', 'Electrónica', 9, 15000.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(15, 'Audífonos Bluetooth', 'Accesorio', 25, 1200.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(16, 'Cámara Web HD', 'Accesorio', 12, 900.00, 'no', 'Lmarte', '2026-03-20 19:41:20'),
(17, 'Impresora HP', 'Oficina', 3, 9500.00, 'si', 'Lmarte', '2026-03-20 19:41:20'),
(18, 'UPS 1000VA', 'Energía', 4, 7000.00, 'si', 'Lmarte', '2026-03-20 19:41:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `pass`) VALUES
(3, 'Lmarte', '$2y$10$xA.zFuqTreqAUjnd1aKiIORptRka9W22LCAMC7uPxSbrkbQaUZy/K');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
