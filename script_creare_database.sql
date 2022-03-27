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
-- Table structure for table `informatii_personale`
--

DROP TABLE IF EXISTS `informatii_personale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informatii_personale` (
  `idUser` int NOT NULL,
  `telefon` varchar(16) NOT NULL,
  `facultate` enum('dppd','arh','ac','cmmi','ci','dima','etti','hgim','icpm','ieeia','mec','sim') NOT NULL,
  `email` varchar(100) NOT NULL,
  `rol` enum('student','admin') NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informatii_personale`
--

LOCK TABLES `informatii_personale` WRITE;
/*!40000 ALTER TABLE `informatii_personale` DISABLE KEYS */;
INSERT INTO `informatii_personale` VALUES (1,'0757170212','ac','andrei.anton-aanei@staff.tuiasi.ro','admin'),(2,'0000123456','ac','georgian.voda@staff.tuiasi.ro','student'),(4,'123456781234','arh','bruce.wayne@staff.tuiasi.ro','admin'),(8,'0757170212','ac','andrew.john@student.tuiasi.ro','student');
/*!40000 ALTER TABLE `informatii_personale` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificari`
--

LOCK TABLES `notificari` WRITE;
/*!40000 ALTER TABLE `notificari` DISABLE KEYS */;
INSERT INTO `notificari` VALUES (1,2,1,'2022-03-26 19:31:39'),(16,3,1,'2022-03-26 19:31:49'),(17,2,1,'2022-03-27 00:07:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programari`
--

LOCK TABLES `programari` WRITE;
/*!40000 ALTER TABLE `programari` DISABLE KEYS */;
INSERT INTO `programari` VALUES (14,1,2,'2022-03-25 12:31:00','2022-03-25 13:31:00','Rezervare podcast LSAC Bad Jokes','in_verificare','rezervare'),(15,1,1,'2022-03-25 14:31:00','2022-03-25 16:31:00','Rezervareee','aprobata','rezervare'),(16,1,3,'2022-03-22 12:31:00','2022-03-22 13:31:00','Rezervare podcast LSAC Bad Jokes','aprobata','mentenanta'),(17,1,2,'2022-03-19 12:31:00','2022-03-19 13:31:00','Rezervare podcast LSAC Bad Jokes','in_verificare','rezervare'),(18,1,1,'2022-03-14 12:31:00','2022-03-14 15:31:00','Rezervare podcast LSAC Bad Jokes','aprobata','rezervare'),(19,1,3,'2022-03-10 12:31:00','2022-03-10 18:31:00','Rezervare podcast LSAC Bad Jokes','respinsa','rezervare');
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
  `stare` enum('rezolvat','nerezolvat') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'nerezolvat',
  PRIMARY KEY (`idTichet`),
  KEY `tichete_FK` (`idUser`),
  CONSTRAINT `tichete_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tichete`
--

LOCK TABLES `tichete` WRITE;
/*!40000 ALTER TABLE `tichete` DISABLE KEYS */;
INSERT INTO `tichete` VALUES (1,1,'mare','Problema de test','nerezolvat'),(2,2,'mare','Problema de test 2','nerezolvat'),(3,1,'mare','Problema de test 3','nerezolvat'),(4,2,'mare','A aparut o problema','nerezolvat'),(5,2,'mica','cea mai descriere','nerezolvat');
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
  `rol` enum('student','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'andrei.anton-aanei','$2a$10$mq3Uw2v9euI2Os7MbBy6Decw1QJF4/xX9HoOFyHW.qhG0Bdbeb/YK','admin'),(2,'georgian.voda','$2a$10$gnO2p15IMXnwlxOB4zUelO7es5knz5U6Y5UW70OjOTN0DS5KUx816','student'),(3,'ionut-alexandru.baltariu','$2a$10$zOQWNZ/uKOSLc3TElJwiT.5xRg5FpXxUUMcuYgGQ1XqPGD0eR6zE6','student'),(4,'bruce.wayne','$2a$10$E3bkH23fxXDpAi5/bI6zxelR9kZHG7.3tE3gUAJCdhveLl7bVmWte','admin'),(5,'georgian.voda11','$2a$10$HhPUfWtQjnJ.GtZyUxy1Ie/NGojQCg9Plsj/R1es1ghecHjh3u2KC','student'),(8,'andrew.john','$2a$10$2y2xc4uDFbc8cBHLAU4eb.dN7dJJuGu5HiKvNUzZdrdBiiRfu3fO2','student');
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

-- Dump completed on 2022-03-27  9:26:32
