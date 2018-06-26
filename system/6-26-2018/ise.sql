-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2018 at 12:07 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ise`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_code`
--

CREATE TABLE `auth_code` (
  `id` int(11) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `book_id` varchar(10) NOT NULL,
  `auth_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth_code`
--

INSERT INTO `auth_code` (`id`, `user_id`, `book_id`, `auth_code`) VALUES
(1, '1', '10', 'abc123'),
(2, '1', '11', 'qwe123');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `ID` int(11) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `cv_number` varchar(100) DEFAULT NULL,
  `account_name` varchar(100) DEFAULT NULL,
  `book_a` varchar(100) DEFAULT NULL,
  `book_k` varchar(100) DEFAULT NULL,
  `book_foc` varchar(100) DEFAULT NULL,
  `book_inf` varchar(100) DEFAULT NULL,
  `book_tg` varchar(100) DEFAULT NULL,
  `book_e` varchar(100) DEFAULT NULL,
  `book_arrival` varchar(100) DEFAULT NULL,
  `book_time` varchar(100) DEFAULT NULL,
  `actual_a` varchar(100) DEFAULT NULL,
  `actual_k` varchar(100) DEFAULT NULL,
  `actual_foc` varchar(100) DEFAULT NULL,
  `actual_inf` varchar(100) DEFAULT NULL,
  `actual_tg` varchar(100) DEFAULT NULL,
  `actual_e` varchar(100) DEFAULT NULL,
  `actual_arrival` varchar(100) DEFAULT NULL,
  `actual_time` varchar(100) DEFAULT NULL,
  `resort_hotel` varchar(100) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `unit_atd` varchar(100) DEFAULT NULL,
  `driver` varchar(100) DEFAULT NULL,
  `coordinator` varchar(100) DEFAULT NULL,
  `sales_handle` varchar(100) DEFAULT NULL,
  `agency` varchar(100) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `user` int(10) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`ID`, `location`, `cv_number`, `account_name`, `book_a`, `book_k`, `book_foc`, `book_inf`, `book_tg`, `book_e`, `book_arrival`, `book_time`, `actual_a`, `actual_k`, `actual_foc`, `actual_inf`, `actual_tg`, `actual_e`, `actual_arrival`, `actual_time`, `resort_hotel`, `unit`, `unit_atd`, `driver`, `coordinator`, `sales_handle`, `agency`, `remarks`, `user`, `status`) VALUES
(1, 'Kalibo International Airport', 'MNL - 20170018048', 'MS MARIBEL PASCUAL AND CO', '23', '0', '0', '0', '0', '0', 'KLO', '5:30', '23', '0', '0', '0', '0', '0', 'KLO', '5:30', 'LA CARMELA', '', '', '', '', 'MARIDETH RAMOS', 'TRAVBEST TRAVEL & TOURS', 'ASSISTED TRANSFER W/T&E , OVERNIGHT IN KALIBO PICK UP AT 0530H PLEASE USE BUS NOTE DEPARTURE PICK UP', 1, 0),
(2, 'Kalibo International Airport', 'MNL - 20170015079', 'JOHN STEVEN QUINTOS & PTY', '4', '0', '0', '0', '0', '0', 'PR2969', '9:40', '4', '0', '0', '0', '0', '0', 'PR2969', '9:40', 'BORACAY TRAVELODGE BEACH RESORT', '', '', '', '', 'DAISCHELLE ANN CANALON', 'ASTROKIDD TRAVEL AND TOURS', 'ASSTD TRANSFER W/T&E NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTEL', 1, 0),
(3, ' Kalibo International Airport ', ' MNL - 20170018047 ', ' RANDOLPH EDWARD VILLANUEVA ', '1', '0', '0', '0', '0', '0', ' PR2969 ', ' 9 : 40 ', '1', '0', '0', '0', '0', '0', ' PR2969 ', '9:40 ', ' W HOSTEL BORACAY ', '', '', '', '', ' JOHN VHIR FAVIS ', ' Walk - In ', ' ASSIST TRANSFER W / T & E;\r\nNOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION T', 1, 0),
(4, 'Kalibo International Airport', 'MNL - 20170017290', 'NINA KASTEN BOQUERENTE & CO', '2', '0', '0', '0', '0', '0', 'Z2711', '10:50', '2', '0', '0', '0', '0', '0', 'Z2711', '10:50', 'LA CARMELA', '', '', '', '', 'NEIL KEVIN CERDA', '1STOP TRAVEL EXPRESS', 'ASSIST TRANSFER OIPA; NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTE', 1, 0),
(5, ' Kalibo International Airport ', ' MNL - 20170018011 ', ' MS RONALYN KIER ELEC \r\n    AND CO ', '8', '0', '0', '0', '0', '0', 'Z2711 ', ' 10 : 50 ', '7', '1', '0', '0', '0', '0', ' Z2711 ', '10:50 ', ' BORACAY TRAVELODGE BEACH RESORT ', '', '', '', '', ' MARIDETH RAMOS ', ' FLIGHT DADDY TRAVEL \r\n    AND TOURS ', ' ASSISTED TRANSFER OIPA NOTE DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU FRO', 1, 0),
(6, ' Kalibo International Airport ', ' MNL - 20170017989 ', 'SANG HA LEE & CO ', '2', '0', '0', '0', '0', '0', '0', ' 10 : 55 ', '', '', '', '', '', '', '', '', ' NIGI - NIGI TOO ', '', '', '', '', ' DAISCHELLE ANN CANALON ', ' TRAVEL ONLINE PHILIPPINES TRAVEL AGENCY INC.', ' ASSTD TRANSFER OIPA NOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTE', 1, 0),
(7, 'Kalibo International Airport', 'BOR - 20170018035', 'PERAS ROCHELLE', '8', '2', '0', '1', '0', '0', '0', '10:55', '', '', '', '', '', '', '', '', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED BY: GLAICY. PAID 04/20/17 BPI', 1, 0),
(8, 'Kalibo International Airport', 'BOR - 20170018036', 'NIDUAZA AILEEN', '2', '0', '0', '0', '0', '0', '0', '10:55', '', '', '', '', '', '', '', '', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED BY: JOY. PAID 05/29/17 BDO', 1, 0),
(9, 'Kalibo International Airport', 'BOR - 20170018037', 'SIOJO JOSELITO', '5', '0', '0', '0', '0', '0', '0', '11:50', '', '', '', '', '', '', '', '', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED JOY. PAID 03/13/17 BDO', 1, 0),
(10, 'Kalibo International Airport', 'BOR - 20170018038', 'PALINSAD JAMES KIM', '2', '1', '0', '0', '0', '0', '0', '11:50', '', '', '', '', '', '', '', '', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED BY: JOANNE. PAID 03/24/17 BDO', 1, 0),
(11, 'Kalibo International Airport', 'BOR - 20170018039', 'SIOJO REYNALDO', '5', '0', '0', '0', '0', '0', '0', '11:55', '', '', '', '', '', '', '', '', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED BY: JOY. PAID 03/31/17 BDO', 1, 0),
(12, 'Kalibo International Airport', 'BOR - 20170018042', 'JANORAS MARY JOY', '2', '0', '0', '0', '0', '0', '0', '11:55', '', '', '', '', '', '', '', '', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED BY: JOANNE. PAID 03/31/17 BDO', 1, 0),
(13, 'Kalibo International Airport', 'MNL - 20170018018', 'MAY ABACAN & CO', '2', '0', '0', '0', '0', '0', '5', '12:05', '', '', '', '', '', '', '', '', 'BAMBOO BEACH RESORT', '', '', '', '', 'DAISCHELLE ANN CANALON', 'MARXCY TRAVEL TICKETS AND TOURS', 'ASSTD TRANSFER W/T&E NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTEL', 1, 0),
(14, ' Kalibo International Airport ', ' BOR - 20170018040 ', ' GALLARDO FLORY ', '11', '0', '0', '0', '0', '0', '5', ' 12 : 05 ', '', '', '', '', '', '', '', '', ' LA CARMELA ', '', '', '', '', ' RONALYN SALVADOR ', 'SHADOW TRAVEL \r\n    AND TOURS ', ' ASSIST W / MCAB - OIPA.RTT.BOOKED BY : GLAICY.PAID 05 / 02 / 17 BDO ', 1, 0),
(15, ' Kalibo International Airport ', ' BOR - 20170018041 ', ' AZANZA ALEXIS ', '2', '0', '0', '0', '0', '0', '5', ' 12 : 05 ', '', '', '', '', '', '', '', '', ' BAMBOO BEACH RESORT ', '', '', '', '', ' RONALYN SALVADOR ', 'SHADOW TRAVEL \r\n    AND TOURS ', ' ASSIST W / MCAB - OIPA.RTT.BOOKED BY : HANIA.PAID 06 / 05 / 17 BPI ', 1, 0),
(16, ' Kalibo International Airport ', ' BOR - 20170017602 ', ' C / O REYES JAYLYN ', '2', '0', '0', '0', '0', '0', '0', ' 14 : 15 ', '', '', '', '', '', '', '', '', ' LA CARMELA ', '', '', '', '', ' RONALYN SALVADOR ', 'SHADOW TRAVEL \r\n    AND TOURS ', ' ASSIST W / MCAB - OIPA.RTT.BOOKED BY : JOY.NOTE : ADDTL 2PAX ', 1, 0),
(17, ' Kalibo International Airport ', ' MNL - 20170017920 ', ' JASBINDER SAUL & CO ', '4', '0', '0', '0', '0', '0', '0', ' 14 : 45 ', '', '', '', '', '', '', '', '', ' LA CARMELA ', '', '', '', '', ' NEIL KEVIN CERDA ', 'SALLOMAN TRAVEL ', ' ASSIST TRANSFER W / T & E;\r\nNOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION T', 1, 0),
(18, 'Kalibo International Airport', 'MNL - 20170017938', 'MAEANNE MANALO & CO', '2', '0', '0', '0', '0', '0', '0', '14:45', '', '', '', '', '', '', 'Z2101', '14:45', 'LA CARMELA', '', '', '', '', 'NEIL KEVIN CERDA', 'MOSCONI TOURS', 'ASSIST TRANSFER W/T&E; NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOT', 1, 0),
(19, ' Kalibo International Airport ', ' MNL - 20170015775 ', ' DALYN MOLATO & PTY ', '8', '0', '0', '0', '0', '0', '0', ' 15 : 30 ', '', '', '', '', '', '', ' Z2262 ', ' 15 : 30 ', ' LA CARMELA ', '', '', '', '', ' DAISCHELLE ANN CANALON ', ' TRAVEL ONLINE PHILIPPINES TRAVEL AGENCY INC.', ' ASSTD TRANSFER OIPA NOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTE', 1, 0),
(20, 'Kalibo International Airport', 'MNL - 20170018002', 'JEROME RAMOS AND CO', '2', '0', '0', '0', '0', '0', '0', '15:35', '', '', '', '', '', '', 'Z2272', '15:35', 'ISLAND INN', '', '', '', '', 'MARIDETH RAMOS', 'FLY DOTCOM TRAVELS', 'ASSISTED TRANSFER OIPA NOTE DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU FRON', 1, 0),
(21, 'Kalibo International Airport', 'MNL - 20170015770', 'EUANNE FRANCISCO & CO', '2', '0', '0', '0', '0', '0', '0', '16:50', '', '', '', '', '', '', 'Z2709', '16:50', 'LA CARMELA', '', '', '', '', 'DAISCHELLE ANN CANALON', 'TRAVEL ONLINE PHILIPPINES TRAVEL AGENCY INC.', 'ASSTD TRANSFER OIPA NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTELS', 1, 0),
(22, ' Kalibo International Airport ', ' MNL - 20170018044 ', ' LEONARDO NATIVIDAD JR & CO ', '8', '1', '0', '0', '0', '0', '0', ' 16 : 50 ', '', '', '', '', '', '', ' Z2709 ', ' 16 : 50 ', ' LA CARMELA ', '', '', '', '', ' NEIL KEVIN CERDA ', 'SMB TRAVEL & TOURS ', ' ASSIST TRANSFER OIPA;\r\nNOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU H', 1, 0),
(23, 'Kalibo International Airport', 'MNL - 20170018049', 'ANGELICA VALDEZ & CO', '4', '0', '0', '0', '0', '0', '0', '17:00', '', '', '', '', '', '', 'Z2262', '17:00', 'BORACAY TRAVELODGE BEACH RESORT', '', '', '', '', 'NEIL KEVIN CERDA', 'GOLDEN TICKET', 'pamilyalakwatseratnt@gmail.com', 1, 0),
(24, 'Kalibo International Airport', 'MNL - 20170018001', 'GUAN ZHANBO & GUAN KAREN JIAXI', '2', '0', '0', '0', '0', '0', '0', '18:10', '', '', '', '', '', '', 'UO2727', '18:10', 'CROWN REGENCY PRINCE', '', '', '', '', 'JOHN VHIR FAVIS', 'DIRECTION TRAVEL & TOURS, INC.', 'ASSIST TRANSFER W/T&E AND NN; NOTE: PICK UP TIME IS 1PM.', 1, 0),
(25, 'Caticlan Airport', 'MNL - 20170018024', 'DASING JOSE PERLITA & CO', '2', '0', '0', '0', '0', '0', '0', '6:00', '', '', '', '', '', '', 'PR2039', '6:00', 'WHITE HOUSE', '', '', '', '', 'NEIL KEVIN CERDA', 'TRIP HUB TRAVEL SERVICES', 'ASSIST TRANSFER W/T&E; NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOT', 1, 0),
(26, ' Caticlan Airport ', ' MNL - 20170017993 ', ' KRENEZA HERNANDEZ & CO ', '2', '0', '0', '0', '0', '0', '5', ' 6 : 50 ', '', '', '', '', '', '', ' 5J891 ', ' 6 : 50 ', ' EUROTEL ', '', '', '', '', ' NEIL KEVIN CERDA ', 'SMB TRAVEL & TOURS ', ' ASSIST TRANSFER OIPA;\r\nNOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU H', 1, 0),
(27, 'Caticlan Airport', 'MNL - 20170017668', 'IVAN TRISTAN GUZMAN & CO', '2', '0', '0', '0', '0', '0', '0', '9:15', '', '', '', '', '', '', 'PR2043', '9:15', 'SUN VILLA HILLTOP RESORT', '', '', '', '', 'NEIL KEVIN CERDA', 'EXPLORASIA TRAVEL & TOURS', 'ASSIST TRANSFER OIPA; NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTE', 1, 0),
(28, ' Caticlan Airport ', ' MNL - 20170016482 ', ' JAYNE TORRES DIALOGO & PTY ', '3', '2', '0', '0', '0', '0', '0', ' 9 : 20 ', '', '', '', '', '', '', ' PR2043 ', ' 9 : 20 ', ' BORACAY HAVEN STATION 2 ', '', '', '', '', ' DAISCHELLE ANN CANALON ', ' BOOKING ONLINE PHILIPPINES INC ', ' ASSTD TRANSFER OIPA NOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTE', 1, 0),
(29, 'Caticlan Airport', 'BOR - 20170018032', 'ARCEO JENNYLYN', '2', '0', '0', '0', '0', '0', '5', '11:00', '', '', '', '', '', '', '5J899', '11:00', 'LA CARMELA', '', '', '', '', 'RONALYN SALVADOR', 'SHADOW TRAVEL AND TOURS', 'ASSIST W/ MCAB -OIPA. RTT. BOOKED BY: JOANNE. PAID 06/05/17 BPI', 1, 0),
(30, 'Caticlan Airport', 'MNL - 20170018043', 'MARIA ALZENA GALVEZ & CO', '2', '0', '0', '0', '0', '0', '0', '11:10', '', '', '', '', '', '', 'M8183', '11:10', 'ISLAND INN', '', '', '', '', 'NEIL KEVIN CERDA', 'INNOVATIVE TRAVEL SOLUTIONS', 'ASSTD TRANSFER OIPA NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTELS', 1, 0),
(31, ' Caticlan Airport ', ' MNL - 20170018045 ', ' MARK LUIGI LEYNES \r\n    AND PTY ', '4', '0', '0', '0', '0', '0', '0', ' 11 : 50 ', '', '', '', '', '', '', ' Z2221 ', ' 11 : 50 ', ' LA CARMELA ', '', '', '', '', ' JERLYN JANE WONG ', ' GILLIAN TRAVEL & TOURS ', ' ASSIST W / TRIC.OIPA NOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION ', 1, 0),
(32, ' Caticlan Airport ', ' MNL - 20170018016 ', ' QUINTANA MICHELLE MS \r\n    AND CO ', '9', '1', '0', '0', '0', '0', '0', ' 12 : 15 ', '', '', '', '', '', '', ' PR2041 ', ' 12 : 15 ', ' FAIRWAYS WELCOME CENTER ', '', '', '', '', ' MARIDETH RAMOS ', 'SEAWIND RESORT ', ' REGULAR LAND TRANSFER ONLY ', 1, 0),
(33, ' Caticlan Airport ', ' BOR - 20170017612 ', ' KRISTIE CLARK ', '1', '0', '0', '0', '0', '0', '0', ' 12 : 45 ', '', '', '', '', '', '', ' AO1010 ', ' 12 : 45 ', ' FERRA HOTEL BORACAY ', '', '', '', '', ' LINAGEL ANN BACLI ', ' FERRA HOTEL BORACAY ', ' ASSTD W / MCAB W / T & E ', 1, 0),
(34, ' Caticlan Airport ', ' BOR - 20170018034 ', ' TUAZON MENCHIE ', '4', '0', '0', '0', '0', '0', '0', ' 12 : 50 ', '', '', '', '', '', '', ' PR2371 ', ' 12 : 50 ', ' LA CARMELA ', '', '', '', '', ' RONALYN SALVADOR ', 'SHADOW TRAVEL \r\n    AND TOURS ', ' ASSIST W / MCAB - OIPA.RTT.BOOKED BY : JOY.PAID 05 / 02 / 17 BDO ', 1, 0),
(35, ' Caticlan Airport ', ' BOR - 20170016298 ', ' ALVAREZ LOVELY ', '2', '0', '0', '0', '0', '0', '5', ' 13 : 45 ', '', '', '', '', '', '', ' 5J901 ', ' 13 : 45 ', ' LA CARMELA ', '', '', '', '', ' RONALYN SALVADOR ', 'SHADOW TRAVEL \r\n    AND TOURS ', ' ASSIST W / MCAB - OIPA.RTT.BOOKED BY : GLAICY.PAID 07 / 31 / 17 BDO ', 1, 0),
(36, ' Caticlan Airport ', ' BOR - 20170014911 ', ' Michael Vaeth ', '2', '0', '0', '0', '0', '0', '0', ' 14 : 30 ', '', '', '', '', '', '', ' T6410 ', ' 14 : 30 ', ' FERRA HOTEL BORACAY ', '', '', '', '', ' LINAGEL ANN BACLI ', ' FERRA HOTEL BORACAY ', ' ASSTD W / MCAB W / TERMINAL FEES ', 1, 0),
(37, ' Caticlan Airport ', ' MNL - 20170017959 ', ' JOIS DIANE DIZON & CO ', '2', '0', '0', '0', '0', '0', '0', ' 14 : 30 ', '', '', '', '', '', '', ' M8185 ', ' 14 : 30 ', 'SUN VILLA BEACHFRONT RESORT & SPA ', '', '', '', '', ' NEIL KEVIN CERDA ', ' I - FB TRAVEL \r\n    AND TOURS ', ' ASSIST TRANSFER W / T & E;\r\nNOTE : DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION T', 1, 0),
(38, 'Caticlan Airport', 'MNL - 20170018046', 'ANNALYN YBANEZ', '1', '0', '0', '0', '0', '0', '0', '14:50', '', '', '', '', '', '', 'PR2371', '14:50', 'NIGI NIGI NU NOOS', '', '', '', '', 'JOHN VHIR FAVIS', 'ONLINE BOOKING', 'ASSIST TRANSFER W/T&E', 1, 0),
(39, 'Caticlan Airport', 'MNL - 20170016924', 'TOMORI SHERLY MARIN & PTY', '5', '0', '0', '0', '0', '0', '0', '19:05', '', '', '', '', '', '', 'DG6243', '19:05', 'BORACAY OCEAN CLUB', '', '', '', '', 'DAISCHELLE ANN CANALON', 'LANCE STAR TRAVEL & TOURS', 'ASSTD TRANSFER OIPA NOTE: DEPARTURE PICK UP TIME WILL BE INFORMED BY BORACAY RESERVATION THRU HOTELS', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `complete_name` varchar(300) NOT NULL,
  `status` smallint(1) NOT NULL,
  `last_sync` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `password`, `complete_name`, `status`, `last_sync`) VALUES
(1, 'admin', '123456', 'User Admin', 1, '2018-06-16 16:00:00'),
(2, 'coordinator', '123456', 'Coordinator User', 1, '2018-06-16 16:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_code`
--
ALTER TABLE `auth_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_code`
--
ALTER TABLE `auth_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
