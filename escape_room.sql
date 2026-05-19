-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 19, 2026 at 06:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `escape_room`
--
DROP DATABASE IF EXISTS `escape_room`;
CREATE DATABASE `escape_room`;
USE `escape_room`;
-- --------------------------------------------------------

--
-- Table structure for table `pistas`
--
DROP TABLE IF EXISTS `pistas`;
CREATE TABLE `pistas` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `pregunta` text NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `mensaje_exito` text NOT NULL,
  `orden` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `pista_extra` text DEFAULT NULL,
  `imagen_acertada` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pistas`
--

INSERT INTO `pistas` (, `pregunta`, `respuesta`, `mensaje_exito`, `orden`, `imagen`, `pista_extra`, `imagen_acertada`) VALUES
('¿Qué palabra representa la imagen?', 'CIENPIES', '¡Correcto!', 1, 'img/pregunta1.png', 'Es un insecto', 'img/acierto1.jpeg'),
('¿Qué palabra representa la imagen?', 'ARCOIRIS', '¡Correcto!', 2, 'img/pregunta2.png', 'Suele aparecer después de la lluvia', 'img/acierto2.jpeg'),
('¿Qué palabra representa la imagen?', 'GIRASOL', '¡Correcto!', 3, 'img/pregunta3.png', 'Planta que sigue al sol', 'img/acierto3.jpeg'),
('¿Qué palabra representa la imagen?', 'LANZALLAMAS', '¡Correcto!', 4, 'img/pregunta4.png', 'Instrumento incendiario', 'img/acierto4.jpeg'),
('¿Qué palabra representa la imagen?', 'CORTAUÑAS', '¡Correcto!', 5, 'img/pregunta5.png', 'Instrumento de higiene', 'img/acierto5.jpeg'),
('¿Qué palabra representa la imagen?', 'ROSARIO', '¡Correcto!', 6, 'img/pregunta6.png', 'Objeto de devoción', 'img/acierto6.jpeg'),
('¿Qué palabra representa la imagen?', 'LUNADEMIEL', '¡Correcto!', 7, 'img/pregunta7.png', 'Ocurre después de una boda', 'img/acierto7.jpeg'),
('¿Qué palabra representa la imagen?', 'MONTAÑARUSA', '¡Correcto!', 8, 'img/pregunta8.png', 'Atracción de parques de diversiones', 'img/acierto8.jpeg'),
('¿Qué palabra representa la imagen?', 'ALGODONDEAZUCAR', '¡Correcto!', 9, 'img/pregunta9.png', 'Común en ferias y circos', 'img/acierto9.jpeg'),
('¿Qué palabra representa la imagen?', 'CEPILLODEDIENTES', '¡Correcto!', 10, 'img/pregunta10.png', 'Se usa para la higiene bucal', 'img/acierto10.jpeg');



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;