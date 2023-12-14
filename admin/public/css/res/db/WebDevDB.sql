-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 07:52 AM
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
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `User_ID` int(11) NOT NULL,
  `First_Name` varchar(45) NOT NULL,
  `Last_Name` varchar(45) NOT NULL,
  `Email_Address` varchar(255) NOT NULL,
  `Password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`User_ID`, `First_Name`, `Last_Name`, `Email_Address`, `Password`) VALUES
(2212173, 'Sofia', 'Surro', '', '12345'),
(2221097, 'Kaizer', 'Gura', '', '12345'),
(2223144, 'Ezrha', 'Dangilan', '', '12345'),
(2223451, 'Leovide', 'Bato', '', '12345'),
(2224512, 'Ava', 'Narag', '', '12345'),
(2226098, 'Geoff', 'Dulnuan', '', '12345'),
(9000001, 'Justine', 'Saw', '', '12345'),
(9000002, 'Axella', 'Tulauan', '', '12345'),
(9000004, 'Anthonette', 'Binuluan', '', '12345'),
(9000005, 'Charles', 'Almazan', '', '12345'),
(9000006, 'Cristoff', 'Estrada', '', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Admin_ID` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_ID`, `Password`) VALUES
('ad01', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `am/pm`
--

CREATE TABLE `am/pm` (
  `Event_ID` varchar(255) NOT NULL,
  `AM_Start` time DEFAULT NULL,
  `AM_End` time DEFAULT NULL,
  `PM_Start` time DEFAULT NULL,
  `PM_End` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `am/pm`
--

INSERT INTO `am/pm` (`Event_ID`, `AM_Start`, `AM_End`, `PM_Start`, `PM_End`) VALUES
('10002', '09:00:00', '12:00:00', '13:00:00', '14:00:00'),
('10005 ', '10:30:00', '12:30:00', '14:00:00', '16:00:00'),
('10010', '08:45:00', '11:30:00', '13:00:00', '15:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `Announcement_ID` varchar(255) NOT NULL,
  `Date_Posted` datetime NOT NULL,
  `Details` text NOT NULL,
  `Event_ID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`Announcement_ID`, `Date_Posted`, `Details`, `Event_ID`) VALUES
('30001', '2023-11-24 08:30:00', 'Bring a notepad and pen.', '10001'),
('30002', '2023-11-25 10:15:00', 'Food and water is provided.', '10002'),
('30003', '2023-12-02 13:45:00', 'Event starts at 9 AM.', '10004'),
('30004', '2023-12-05 09:00:00', 'Dress code: Business casual.', '10003'),
('30005', '2023-12-10 16:20:00', 'Networking session at 3 PM.', '10005'),
('30006', '2023-12-15 11:55:00', 'Attire: Business casual for the guest speaker event.', '10006'),
('30007', '2023-12-18 14:40:00', 'Access to event only with valid university identification.', '10009'),
('30008', '2023-12-20 10:30:00', 'Live streaming available for remote participants.', '10002'),
('30009', '2023-12-22 12:10:00', 'Parking instructions for on-site event attendees.', '10007'),
('30010', '2023-12-28 09:45:00', 'Registration closing soon for the annual conference.', '10008');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `Attendance_ID` int(11) NOT NULL,
  `Date` varchar(45) NOT NULL,
  `Series_Num` int(11) DEFAULT NULL,
  `In_Time` time NOT NULL,
  `Out_Time` time NOT NULL,
  `Event_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `Bookmark_ID` int(11) NOT NULL,
  `Date_Bookmarked` date NOT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Event_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `evaluations`
--

CREATE TABLE `evaluations` (
  `Evaluation_ID` int(11) NOT NULL,
  `isAccomplished` tinyint(4) NOT NULL DEFAULT 0,
  `Date_Accomplished` datetime DEFAULT NULL,
  `User_ID` int(11) NOT NULL,
  `Event_ID` int(11) NOT NULL,
  `Evaluation_Link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `Event_ID` int(11) NOT NULL,
  `Event_Name` varchar(255) NOT NULL,
  `Event_Description` text NOT NULL,
  `Event_StartDate` date NOT NULL,
  `Event_EndDate` date NOT NULL,
  `isOpen` tinyint(4) NOT NULL DEFAULT 0,
  `Participants` int(11) DEFAULT 0,
  `Event_Type` varchar(255) NOT NULL,
  `Event_Tagline` varchar(255) NOT NULL,
  `isPublic` tinyint(4) DEFAULT 0,
  `Event_PicFileName` varchar(255) DEFAULT NULL,
  `Event_PicFilePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`Event_ID`, `Event_Name`, `Event_Description`, `Event_StartDate`, `Event_EndDate`, `isOpen`, `Participants`, `Event_Type`, `Event_Tagline`, `isPublic`, `Event_PicFileName`, `Event_PicFilePath`) VALUES
(10001, 'Academic Odessey: Exploring Minds', 'Embark on a journey through the realms of knowledge! Join us for a day filled with captivating lectures, interactive workshops, and thought-provoking discussions led by experts in various fields. Dive deep into the wonders of science, humanities, and technology, fostering curiosity and a thirst for learning.', '2023-11-26', '2023-11-26', 0, 45, 'OneTime', '\"Navigating Knowledge, Exploring Minds\"', 1, NULL, NULL),
(10002, 'Cultural Mosaic Festival', 'Celebrate diversity and unity in our vibrant school community! Experience a colorful tapestry of traditions, music, dance, and cuisine from around the world. Engage in cultural exchanges, participate in interactive displays, and embrace the rich tapestry of global heritage that unites us all.', '2023-11-28', '2023-11-28', 0, 67, 'AM/PM', '\"Celebrate Diversity in Unity\"', 1, NULL, NULL),
(10003, 'STEMpalooza: Innovation Showcase', 'Unleash your inner innovator! Get ready for an exhilarating exhibition showcasing groundbreaking projects and cutting-edge technology. Dive into hands-on demonstrations, competitions, and presentations highlighting the wonders of science, technology, engineering, and mathematics. Explore, create, and inspire the future!', '2023-11-30', '2023-12-02', 1, 59, 'Series', '\"Innovation Unleashed, Ideas Ignited\"', 1, NULL, NULL),
(10004, '\"Future of AI: Ethical Implications Summit', ' Deliberate the ethical considerations shaping the future of artificial intelligence.', '2023-12-10', '2023-12-12', 0, 95, 'Series', '\"Shaping Tomorrow Responsibly\"', 1, NULL, NULL),
(10005, 'Quantum Computing Conference ', 'Delve into the revolutionary world of quantum computing. Engage with experts, witness demos, and explore the potential applications of quantum technologies.', '2023-12-15', '2023-12-15', 1, 63, 'AM/PM', '\"Unveiling the Quantum Future\"', 0, NULL, NULL),
(10006, 'Artificial Intelligence in Sports Analytics Symposium', 'Explore the transformative role of AI in redefining sports analytics and strategy.', '2023-12-20', '2023-12-20', 0, 84, 'OneTime', '\"Elevating Play with Intelligent Insights\"', 1, NULL, NULL),
(10007, 'Sustainability Summit  ', 'Explore innovative approaches to sustainability and environmental conservation. Join discussions, workshops, and presentations on green initiatives.', '2023-12-28', '2023-12-30', 1, 52, 'OneTime', '\"Empowering Change, Sustaining Tomorrow\"', 1, NULL, NULL),
(10008, 'HealthTech Expo   ', 'Discover the latest advancements in healthcare technology. Experience demos, attend seminars, and interact with pioneers in the HealthTech industry.', '2023-12-29', '2023-12-29', 1, 61, 'Series', '\"Revolutionizing Health, Empowering Lives\"', 1, NULL, NULL),
(10009, 'Business Innovation Forum', 'Foster creativity and strategize innovation in the business landscape. Engage in discussions, case studies, and workshops led by industry leaders.', '2024-01-05', '2024-01-07', 0, 42, 'OneTime', '\"Where Ideas Meet Impact\"', 0, NULL, NULL),
(10010, 'Music and Technology Conference', 'Explore the intersection of music and technology. Experience live demonstrations, discussions, and performances showcasing technological advancements in music.', '2024-01-10', '2024-01-12', 1, 76, 'AM/PM', '\"Harmony of Innovation and Sound\"', 1, NULL, NULL);

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
(10001, '09:00:00', '16:00:00'),
(10006, '10:00:00', '17:00:00'),
(10007, '11:30:00', '18:30:00'),
(10009, '09:30:00', '16:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `regisdetails`
--

CREATE TABLE `regisdetails` (
  `User_ID` int(11) NOT NULL,
  `Event_ID` int(11) NOT NULL,
  `QR_Code` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `Registration_ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Age` int(11) NOT NULL,
  `Course` varchar(255) NOT NULL,
  `Year` int(11) NOT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `Event_ID` int(11) NOT NULL,
  `Series_Num` int(11) NOT NULL,
  `Start_Time` time DEFAULT NULL,
  `End_Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`Event_ID`, `Series_Num`, `Start_Time`, `End_Time`) VALUES
(10003, 1, '10:00:00', '12:00:00'),
(10003, 2, '13:00:00', '14:00:00'),
(10003, 3, '15:00:00', '16:00:00'),
(10004, 1, '09:30:00', '11:30:00'),
(10004, 2, '12:30:00', '14:30:00'),
(10008, 1, '10:00:00', '12:00:00'),
(10008, 2, '13:30:00', '15:30:00'),
(10008, 3, '16:30:00', '18:30:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_ID`);

--
-- Indexes for table `am/pm`
--
ALTER TABLE `am/pm`
  ADD PRIMARY KEY (`Event_ID`),
  ADD KEY `EventID_AM/PM` (`Event_ID`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`Announcement_ID`),
  ADD KEY `Event_ID_Announcement` (`Event_ID`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`Attendance_ID`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`Bookmark_ID`),
  ADD KEY `UserID_Bookmarks_idx` (`User_ID`),
  ADD KEY `EventID_Bookmarks_idx` (`Event_ID`);

--
-- Indexes for table `evaluations`
--
ALTER TABLE `evaluations`
  ADD PRIMARY KEY (`Evaluation_ID`),
  ADD KEY `UserID_Eval` (`User_ID`),
  ADD KEY `EventID_Eval` (`Event_ID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`Event_ID`);

--
-- Indexes for table `onetime`
--
ALTER TABLE `onetime`
  ADD PRIMARY KEY (`Event_ID`),
  ADD KEY `EventID_OneTime` (`Event_ID`);

--
-- Indexes for table `regisdetails`
--
ALTER TABLE `regisdetails`
  ADD PRIMARY KEY (`User_ID`,`Event_ID`),
  ADD KEY `EventID_RegisDetails_idx` (`Event_ID`),
  ADD KEY `UserID_RegisDetails` (`User_ID`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`Registration_ID`),
  ADD KEY `UserID_Registration` (`User_ID`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`Event_ID`,`Series_Num`),
  ADD KEY `EventID_Series` (`Event_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `EventID_Attendance` FOREIGN KEY (`Attendance_ID`) REFERENCES `events` (`Event_ID`);

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `EventID_Bookmarks` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  ADD CONSTRAINT `UserID_Bookmarks` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`);

--
-- Constraints for table `evaluations`
--
ALTER TABLE `evaluations`
  ADD CONSTRAINT `EventID_Eval` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  ADD CONSTRAINT `UserID_Eval` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`);

--
-- Constraints for table `onetime`
--
ALTER TABLE `onetime`
  ADD CONSTRAINT `EventID_OneTime` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`);

--
-- Constraints for table `regisdetails`
--
ALTER TABLE `regisdetails`
  ADD CONSTRAINT `EventID_RegisDetails` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  ADD CONSTRAINT `UserID_RegisDetails` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `UserID_Regis` FOREIGN KEY (`User_ID`) REFERENCES `accounts` (`User_ID`);

--
-- Constraints for table `series`
--
ALTER TABLE `series`
  ADD CONSTRAINT `Event_ID` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
