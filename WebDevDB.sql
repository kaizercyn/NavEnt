CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `User_ID` int NOT NULL,
  `First_Name` varchar(45) NOT NULL,
  `Last_Name` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Type` varchar(45) NOT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (2212173,'Sofia','Surro','12345','Student'),(2221097,'Kaizer','Gura','12345','Student'),(2223144,'Ezrha','Dangilan','12345','Student'),(2223451,'Leovide','Bato','12345','Student'),(2224512,'Ava','Narag','12345','Student'),(2226098,'Geoff','Dulnuan','12345','Student'),(9000001,'Justine','Saw','12345','Guest'),(9000002,'Axella','Tulauan','12345','Guest'),(9000004,'Anthonette','Binuluan','12345','Guest'),(9000005,'Charles','Almazan','12345','Guest'),(9000006,'Cristoff','Estrada','12345','Guest');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Admin_ID` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  PRIMARY KEY (`Admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('ad01','1234');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `am/pm`
--

DROP TABLE IF EXISTS `am/pm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `am/pm` (
  `Event_ID` varchar(255) NOT NULL,
  `AM_Start` time DEFAULT NULL,
  `AM_End` time DEFAULT NULL,
  `PM_Start` time DEFAULT NULL,
  `PM_End` time DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `EventID_AM/PM` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `am/pm`
--

LOCK TABLES `am/pm` WRITE;
/*!40000 ALTER TABLE `am/pm` DISABLE KEYS */;
INSERT INTO `am/pm` VALUES ('10002','09:00:00','12:00:00','13:00:00','14:00:00');
/*!40000 ALTER TABLE `am/pm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `Announcement_ID` varchar(255) NOT NULL,
  `Date_Posted` datetime NOT NULL,
  `Details` text NOT NULL,
  `Event_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Announcement_ID`),
  KEY `Event_ID_Announcement` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES ('30001','2023-11-25 00:00:00','Bring a notepad and pen.','10001'),('30002','2023-11-24 00:00:00','Food and water is provided.','10003');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `Attendance_ID` int NOT NULL,
  `Date` varchar(45) NOT NULL,
  `Series_Num` int DEFAULT NULL,
  `In_Time` time NOT NULL,
  `Out_Time` time NOT NULL,
  `Event_ID` int NOT NULL,
  PRIMARY KEY (`Attendance_ID`),
  CONSTRAINT `EventID_Attendance` FOREIGN KEY (`Attendance_ID`) REFERENCES `events` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `Bookmark_ID` int NOT NULL,
  `Date_Bookmarked` date NOT NULL,
  `User_ID` int DEFAULT NULL,
  `Event_ID` int DEFAULT NULL,
  PRIMARY KEY (`Bookmark_ID`),
  KEY `UserID_Bookmarks_idx` (`User_ID`),
  KEY `EventID_Bookmarks_idx` (`Event_ID`),
  CONSTRAINT `EventID_Bookmarks` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  CONSTRAINT `UserID_Bookmarks` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluations` (
  `Evaluation_ID` int NOT NULL,
  `isAccomplished` tinyint NOT NULL DEFAULT '0',
  `Date_Accomplished` datetime DEFAULT NULL,
  `User_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  `Evaluation_Link` text,
  PRIMARY KEY (`Evaluation_ID`),
  KEY `UserID_Eval` (`User_ID`),
  KEY `EventID_Eval` (`Event_ID`),
  CONSTRAINT `EventID_Eval` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  CONSTRAINT `UserID_Eval` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluations`
--

LOCK TABLES `evaluations` WRITE;
/*!40000 ALTER TABLE `evaluations` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `Event_ID` int NOT NULL,
  `Event_Name` varchar(255) NOT NULL,
  `Event_StartDate` date NOT NULL,
  `Event_EndDate` date NOT NULL,
  `isOpen` tinyint NOT NULL DEFAULT '0',
  `Particpants` int DEFAULT '0',
  `Event_Type` varchar(255) NOT NULL,
  `Event_Description` text NOT NULL,
  PRIMARY KEY (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (10001,'Academic Odessey: Exploring Minds','2023-11-26','2023-11-26',1,0,'OneTime','Embark on a journey through the realms of knowledge! Join us for a day filled with captivating lectures, interactive workshops, and thought-provoking discussions led by experts in various fields. Dive deep into the wonders of science, humanities, and technology, fostering curiosity and a thirst for learning.'),(10002,'Cultural Mosaic Festival','2023-11-26','2023-11-26',1,0,'AM/PM','Celebrate diversity and unity in our vibrant school community! Experience a colorful tapestry of traditions, music, dance, and cuisine from around the world. Engage in cultural exchanges, participate in interactive displays, and embrace the rich tapestry of global heritage that unites us all.'),(10003,'STEMpalooza: Innovation Showcase','2023-11-26','2023-11-26',1,0,'Series','Unleash your inner innovator! Get ready for an exhilarating exhibition showcasing groundbreaking projects and cutting-edge technology. Dive into hands-on demonstrations, competitions, and presentations highlighting the wonders of science, technology, engineering, and mathematics. Explore, create, and inspire the future!');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `onetime`
--

DROP TABLE IF EXISTS `onetime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `onetime` (
  `Event_ID` int NOT NULL,
  `Start_Time` time DEFAULT NULL,
  `End_Time` time DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `EventID_OneTime` (`Event_ID`),
  CONSTRAINT `EventID_OneTime` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `onetime`
--

LOCK TABLES `onetime` WRITE;
/*!40000 ALTER TABLE `onetime` DISABLE KEYS */;
INSERT INTO `onetime` VALUES (10001,'09:00:00','16:00:00');
/*!40000 ALTER TABLE `onetime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regisdetails`
--

DROP TABLE IF EXISTS `regisdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regisdetails` (
  `User_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  `QR_Code` longtext,
  PRIMARY KEY (`User_ID`,`Event_ID`),
  KEY `EventID_RegisDetails_idx` (`Event_ID`),
  KEY `UserID_RegisDetails` (`User_ID`),
  CONSTRAINT `EventID_RegisDetails` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  CONSTRAINT `UserID_RegisDetails` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regisdetails`
--

LOCK TABLES `regisdetails` WRITE;
/*!40000 ALTER TABLE `regisdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `regisdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration` (
  `Registration_ID` int NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Age` int NOT NULL,
  `Course` varchar(255) NOT NULL,
  `Year` int NOT NULL,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`Registration_ID`),
  KEY `UserID_Registration` (`User_ID`),
  CONSTRAINT `UserID_Regis` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `Event_ID` int NOT NULL,
  `Num_Series` int DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `EventID_Series` (`Event_ID`),
  CONSTRAINT `Event_ID` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (10003,3);
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 20:22:05
