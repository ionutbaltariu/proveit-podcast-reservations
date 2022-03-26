-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: tuiasi_podcast
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notificari`
--

DROP TABLE IF EXISTS `notificari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificari` (
  `idNotificare` int NOT NULL AUTO_INCREMENT,
  `idUserSursa` int NOT NULL,
  `idUserDestinatie` int NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`idNotificare`),
  KEY `notificari_FK` (`idUserSursa`),
  KEY `notificari_FK_1` (`idUserDestinatie`),
  CONSTRAINT `notificari_FK` FOREIGN KEY (`idUserSursa`) REFERENCES `users` (`idUser`),
  CONSTRAINT `notificari_FK_1` FOREIGN KEY (`idUserDestinatie`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificari`
--

LOCK TABLES `notificari` WRITE;
/*!40000 ALTER TABLE `notificari` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programari`
--

DROP TABLE IF EXISTS `programari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programari` (
  `idProgramare` int NOT NULL AUTO_INCREMENT,
  `idSala` int NOT NULL,
  `idUser` int NOT NULL,
  `dataStart` datetime NOT NULL,
  `dataStop` datetime NOT NULL,
  `scop` varchar(256) NOT NULL,
  `stare` enum('in_verificare','aprobata','respinsa') NOT NULL,
  `tip` enum('rezervare','mentenanta') NOT NULL,
  PRIMARY KEY (`idProgramare`),
  KEY `programari_FK` (`idUser`),
  KEY `programari_FK_1` (`idSala`),
  CONSTRAINT `programari_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  CONSTRAINT `programari_FK_1` FOREIGN KEY (`idSala`) REFERENCES `sali` (`idSala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programari`
--

LOCK TABLES `programari` WRITE;
/*!40000 ALTER TABLE `programari` DISABLE KEYS */;
/*!40000 ALTER TABLE `programari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sali`
--

DROP TABLE IF EXISTS `sali`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sali` (
  `idSala` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(128) NOT NULL,
  `cod` varchar(64) NOT NULL,
  `capacitate` int NOT NULL,
  `oraStart` int NOT NULL,
  `oraStop` int NOT NULL,
  `disponibilitate` varchar(7) NOT NULL,
  PRIMARY KEY (`idSala`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sali`
--

LOCK TABLES `sali` WRITE;
/*!40000 ALTER TABLE `sali` DISABLE KEYS */;
INSERT INTO `sali` VALUES (1,'Sala Podcast','SP1',5,10,18,'1111100');
/*!40000 ALTER TABLE `sali` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tichete`
--

DROP TABLE IF EXISTS `tichete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tichete` (
  `idTichet` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `prioritate` enum('mica','medie','mare') NOT NULL,
  `descriere` varchar(300) NOT NULL,
  `stare` enum('rezolvat','nerezolvat') NOT NULL,
  PRIMARY KEY (`idTichet`),
  KEY `tichete_FK` (`idUser`),
  CONSTRAINT `tichete_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tichete`
--

LOCK TABLES `tichete` WRITE;
/*!40000 ALTER TABLE `tichete` DISABLE KEYS */;
/*!40000 ALTER TABLE `tichete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `telefon` varchar(16) DEFAULT NULL,
  `rol` enum('student','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `facultate` enum('dppd','arh','ac','cmmi','ci','dima','etti','hgim','icpm','ieeia','mec','sim') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tuiasi_podcast'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-26 13:06:00
