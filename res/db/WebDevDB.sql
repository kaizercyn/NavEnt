-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 03:24 PM
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
-- Database: `webdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `onetime`
--

CREATE TABLE `onetime` (
  `Event_ID` int(11) NOT NULL,
  `Start_Time` time DEFAULT NULL,
  `End_Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `onetime`
--

INSERT INTO `onetime` (`Event_ID`, `Start_Time`, `End_Time`) VALUES
(10001, '09:00:00', '16:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `onetime`
--
ALTER TABLE `onetime`
  ADD PRIMARY KEY (`Event_ID`),
  ADD KEY `EventID_OneTime` (`Event_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `onetime`
--
ALTER TABLE `onetime`
  ADD CONSTRAINT `EventID_OneTime` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
