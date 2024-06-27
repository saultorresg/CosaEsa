/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: plasheras
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `canasta`
--

DROP TABLE IF EXISTS `canasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `canasta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `canasta_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canasta`
--

LOCK TABLES `canasta` WRITE;
/*!40000 ALTER TABLE `canasta` DISABLE KEYS */;
/*!40000 ALTER TABLE `canasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canasta_productos`
--

DROP TABLE IF EXISTS `canasta_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `canasta_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_canasta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_canasta_productos_producto` (`id_producto`),
  KEY `fk_canasta_productos_canasta` (`id_canasta`),
  CONSTRAINT `fk_canasta_productos_canasta` FOREIGN KEY (`id_canasta`) REFERENCES `canasta` (`id`),
  CONSTRAINT `fk_canasta_productos_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canasta_productos`
--

LOCK TABLES `canasta_productos` WRITE;
/*!40000 ALTER TABLE `canasta_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `canasta_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jugador` varchar(100) NOT NULL,
  `equipo` varchar(100) NOT NULL,
  `numero` int(11) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES
(1,'CESAR GIOVANNY PALACIOS','CALVOS FC',1,100.00,15),
(2,'JOSE EDUARDO MORENO','CALVOS FC',2,150.00,11),
(3,'JOHAN MEJORADA','CALVOS FC',3,250.00,20),
(4,'DIEGo VELAZQUEZ','CALVOS FC',4,100.00,20),
(5,'BOGAR GUADALUPE MORENO','CALVOS FC',5,100.00,20),
(6,'ALBERTO ARMANDO MENDEZ','CALVOS FC',6,100.00,20),
(7,'OSCAR DANIEL PATIÑO','CALVOS FC',7,100.00,20),
(8,'LUIS MANUEL MAGAÑA','CALVOS FC',8,100.00,20),
(9,'FERNANDO MORALES','CALVOS FC',9,100.00,20),
(10,'MOISES','CACHORROS',1,100.00,20),
(11,'LUIS DIEGO GOMEZ','CACHORROS',2,100.00,20),
(12,'JONATHAN MOYA','CACHORROS',3,100.00,20),
(13,'ISAI CALLEJAS','CACHORROS',4,100.00,20),
(14,'DIEGO MORENO','CACHORROS',5,100.00,20),
(15,'ALEXIS ARATH VALDES','CACHORROS',6,100.00,20);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 16:33:26
