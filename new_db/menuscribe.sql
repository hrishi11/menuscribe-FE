-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2024 at 08:20 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `menuscribe`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name_singular` varchar(111) NOT NULL,
  `category_plural` varchar(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name_singular`, `category_plural`) VALUES
(1, 'Side', 'Sides'),
(2, 'Main', 'Mains'),
(3, 'Dessert', 'Desserts'),
(4, 'Salad', 'Salads'),
(5, 'Yogurt', 'Yogurts');

-- --------------------------------------------------------

--
-- Table structure for table `category_vendor`
--

CREATE TABLE `category_vendor` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities_active`
--

CREATE TABLE `cities_active` (
  `id` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `shortcode` varchar(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `colour` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cities_active`
--

INSERT INTO `cities_active` (`id`, `city_name`, `city`, `country`, `shortcode`, `status`, `colour`) VALUES
(1, 'Toronto', 'Toronto area ', 'Canada', 'TOR', 1, '#FFF081'),
(2, 'Edmonton', 'Edmonton area', 'Canada', 'EDM', 1, '#FFC481'),
(3, 'Vancouver', 'Vancouver area', 'Canada', 'VAN', 1, '#81FFED'),
(4, 'Montreal', 'Montreal area', 'Canada', 'MTL', 1, '#FD81FF'),
(5, 'Winnipeg', 'Winnipeg area', 'Canada', 'MTB', 1, ''),
(6, 'Calgary', 'Calgary area', 'Canada', 'CAL', 1, '#FF8181'),
(7, 'Regina', 'Regina area', 'Canada', 'REG', 1, ''),
(8, 'Halifax', 'Halifax area', 'Canada', 'HFX', 1, ''),
(9, 'Sydney', 'Sydney', 'Australia', 'SYD', 1, ''),
(10, 'Melbourne', 'Melbourne', 'Australia', 'MEL', 1, ''),
(11, 'Denver', 'Denver', 'USA', 'DEN', 1, ''),
(12, 'Boston', 'Boston', 'USA', 'BOS', 1, ''),
(13, 'Dallas', 'Dallas', 'USA', 'DAL', 1, ''),
(14, 'New York', 'New York', 'USA', 'NYC', 1, ''),
(15, 'Los Angeles', 'Los Angeles', 'USA', 'LAX', 1, ''),
(16, 'Quebec City', 'Quebec City', 'Canada', 'QBC', 1, ''),
(17, 'Ottawa', 'Ottawa', 'Canada', 'OTW', 1, ''),
(50, 'Dubai', 'Dubai', 'UAE', 'DXB', 1, ''),
(60, 'Mumbai', 'Mumbai', 'India', 'BOM', 0, ''),
(61, 'Delhi', 'Delhi', 'India', 'DEL', 0, ''),
(62, 'Chennai', 'Chennai', 'India', 'CHE', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `cities_all`
--

CREATE TABLE `cities_all` (
  `id` smallint(4) UNSIGNED NOT NULL,
  `city` varchar(128) NOT NULL,
  `state` enum('AB','AK','AL','AR','AZ','BC','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MB','MD','ME','MI','MN','MO','MS','MT','NB','NC','ND','NE','NH','NJ','NL','NM','NS','NT','NU','NV','NY','OH','OK','ON','OR','PA','PE','QC','RI','SC','SD','SK','TN','TX','UT','VA','VT','WA','WI','WV','WY','YT') NOT NULL,
  `country` enum('US','CA') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cities_all`
--

INSERT INTO `cities_all` (`id`, `city`, `state`, `country`) VALUES
(1, 'Acme', 'AB', 'CA'),
(2, 'Airdrie', 'AB', 'CA'),
(3, 'Alix', 'AB', 'CA'),
(4, 'Amber Valley', 'AB', 'CA'),
(5, 'Ardrossan', 'AB', 'CA'),
(6, 'Athabasca', 'AB', 'CA'),
(7, 'Balzac', 'AB', 'CA'),
(8, 'Banff', 'AB', 'CA'),
(9, 'Barrhead', 'AB', 'CA'),
(10, 'Bashaw', 'AB', 'CA'),
(11, 'Beaumont', 'AB', 'CA'),
(12, 'Beiseker', 'AB', 'CA'),
(13, 'Bellevue', 'AB', 'CA'),
(14, 'Benalto', 'AB', 'CA'),
(15, 'Bilby', 'AB', 'CA'),
(16, 'Black Diamond', 'AB', 'CA'),
(17, 'Blackfalds', 'AB', 'CA'),
(18, 'Blackie', 'AB', 'CA'),
(19, 'Blairmore', 'AB', 'CA'),
(20, 'Bluesky', 'AB', 'CA'),
(21, 'Bluffton', 'AB', 'CA'),
(22, 'Bon Accord', 'AB', 'CA'),
(23, 'Bonnyville', 'AB', 'CA'),
(24, 'Bow Island', 'AB', 'CA'),
(25, 'Bowness', 'AB', 'CA'),
(26, 'Boyle', 'AB', 'CA'),
(27, 'Breton', 'AB', 'CA'),
(28, 'Brooks', 'AB', 'CA'),
(29, 'Busby', 'AB', 'CA'),
(30, 'Calgary', 'AB', 'CA'),
(31, 'Calmar', 'AB', 'CA'),
(32, 'Camrose', 'AB', 'CA'),
(33, 'Canmore', 'AB', 'CA'),
(34, 'Cardston', 'AB', 'CA'),
(35, 'Caroline', 'AB', 'CA'),
(36, 'Carseland', 'AB', 'CA'),
(37, 'Carstairs', 'AB', 'CA'),
(38, 'Champion', 'AB', 'CA'),
(39, 'Cherhill', 'AB', 'CA'),
(40, 'Chip Lake', 'AB', 'CA'),
(41, 'Chipman', 'AB', 'CA'),
(42, 'Clairmont', 'AB', 'CA'),
(43, 'Claresholm', 'AB', 'CA'),
(44, 'Clive', 'AB', 'CA'),
(45, 'Coaldale', 'AB', 'CA'),
(46, 'Cold Lake', 'AB', 'CA'),
(47, 'Coleman', 'AB', 'CA'),
(48, 'Coronation', 'AB', 'CA'),
(49, 'Crossfield', 'AB', 'CA'),
(50, 'Daysland', 'AB', 'CA'),
(51, 'Delburne', 'AB', 'CA'),
(52, 'Devon', 'AB', 'CA'),
(53, 'Didsbury', 'AB', 'CA'),
(54, 'Dowling', 'AB', 'CA'),
(55, 'Drayton Valley', 'AB', 'CA'),
(56, 'Drumheller', 'AB', 'CA'),
(57, 'Duchess', 'AB', 'CA'),
(58, 'Duffield', 'AB', 'CA'),
(59, 'Eaglesham', 'AB', 'CA'),
(60, 'Edmonton', 'AB', 'CA'),
(61, 'Edson', 'AB', 'CA'),
(62, 'Elk Point', 'AB', 'CA'),
(63, 'Endiang', 'AB', 'CA'),
(64, 'Entwistle', 'AB', 'CA'),
(65, 'Fairview', 'AB', 'CA'),
(66, 'Faust', 'AB', 'CA'),
(67, 'Flatbush', 'AB', 'CA'),
(68, 'Foremost', 'AB', 'CA'),
(69, 'Forestburg', 'AB', 'CA'),
(70, 'Fort Macleod', 'AB', 'CA'),
(71, 'Fort McMurray', 'AB', 'CA'),
(72, 'Fort Saskatchewan', 'AB', 'CA'),
(73, 'Fort Vermilion', 'AB', 'CA'),
(75, 'Girouxville', 'AB', 'CA'),
(76, 'Gleichen', 'AB', 'CA'),
(77, 'Glendon', 'AB', 'CA'),
(78, 'Glenwood', 'AB', 'CA'),
(79, 'Goodfish Lake', 'AB', 'CA'),
(80, 'Grand Centre', 'AB', 'CA'),
(81, 'Grande Prairie', 'AB', 'CA'),
(82, 'Grimshaw', 'AB', 'CA'),
(83, 'Halkirk', 'AB', 'CA'),
(84, 'Hanna', 'AB', 'CA'),
(85, 'Hardisty', 'AB', 'CA'),
(86, 'Heisler', 'AB', 'CA'),
(87, 'Helina', 'AB', 'CA'),
(88, 'High Level', 'AB', 'CA'),
(89, 'High Prairie', 'AB', 'CA'),
(90, 'High River', 'AB', 'CA'),
(91, 'Hinton', 'AB', 'CA'),
(92, 'Hobbema', 'AB', 'CA'),
(93, 'Horburg', 'AB', 'CA'),
(94, 'Innisfail', 'AB', 'CA'),
(95, 'Irricana', 'AB', 'CA'),
(96, 'Irvine', 'AB', 'CA'),
(97, 'Jarvie', 'AB', 'CA'),
(98, 'Jasper', 'AB', 'CA'),
(99, 'Joussard', 'AB', 'CA'),
(100, 'Keoma', 'AB', 'CA'),
(101, 'Killam', 'AB', 'CA'),
(102, 'Kinuso', 'AB', 'CA'),
(103, 'Kitscoty', 'AB', 'CA'),
(104, 'Lac La Biche', 'AB', 'CA'),
(105, 'Lacombe', 'AB', 'CA'),
(106, 'Lake Louise', 'AB', 'CA'),
(107, 'Lamont', 'AB', 'CA'),
(108, 'Lancaster Park', 'AB', 'CA'),
(109, 'Leduc', 'AB', 'CA'),
(110, 'Legal', 'AB', 'CA'),
(111, 'Lethbridge', 'AB', 'CA'),
(112, 'Lloydminster', 'AB', 'CA'),
(113, 'Looma', 'AB', 'CA'),
(114, 'Mackay', 'AB', 'CA'),
(115, 'Magrath', 'AB', 'CA'),
(116, 'Mannville', 'AB', 'CA'),
(117, 'Marwayne', 'AB', 'CA'),
(118, 'McLennan', 'AB', 'CA'),
(119, 'McMurray', 'AB', 'CA'),
(120, 'Medicine Hat', 'AB', 'CA'),
(121, 'Midnapore', 'AB', 'CA'),
(122, 'Milk River', 'AB', 'CA'),
(123, 'Millet', 'AB', 'CA'),
(124, 'Monarch', 'AB', 'CA'),
(125, 'Morinville', 'AB', 'CA'),
(126, 'Munson', 'AB', 'CA'),
(127, 'Nampa', 'AB', 'CA'),
(128, 'Nanton', 'AB', 'CA'),
(129, 'Nisku', 'AB', 'CA'),
(130, 'Nobleford', 'AB', 'CA'),
(131, 'North Vermilion', 'AB', 'CA'),
(132, 'Obed', 'AB', 'CA'),
(133, 'Okotoks', 'AB', 'CA'),
(134, 'Olds', 'AB', 'CA'),
(135, 'Onoway', 'AB', 'CA'),
(136, 'Paradise Valley', 'AB', 'CA'),
(137, 'Patricia', 'AB', 'CA'),
(138, 'Peace River', 'AB', 'CA'),
(139, 'Peers', 'AB', 'CA'),
(140, 'Penhold', 'AB', 'CA'),
(141, 'Pincher Creek', 'AB', 'CA'),
(142, 'Plamondon', 'AB', 'CA'),
(143, 'Ponoka', 'AB', 'CA'),
(144, 'Provost', 'AB', 'CA'),
(145, 'Radway', 'AB', 'CA'),
(146, 'Ralston', 'AB', 'CA'),
(147, 'Raymond', 'AB', 'CA'),
(148, 'Red Deer', 'AB', 'CA'),
(149, 'Redcliff', 'AB', 'CA'),
(150, 'Rimbey', 'AB', 'CA'),
(151, 'Rocky Mountain House', 'AB', 'CA'),
(152, 'Rosalind', 'AB', 'CA'),
(153, 'Rosedale', 'AB', 'CA'),
(154, 'Rosemary', 'AB', 'CA'),
(155, 'Rycroft', 'AB', 'CA'),
(156, 'Saint Albert', 'AB', 'CA'),
(157, 'Saint Paul', 'AB', 'CA'),
(158, 'Saint Vincent', 'AB', 'CA'),
(159, 'Sangudo', 'AB', 'CA'),
(160, 'Scandia', 'AB', 'CA'),
(161, 'Sexsmith', 'AB', 'CA'),
(162, 'Sherwood Park', 'AB', 'CA'),
(163, 'Slave Lake', 'AB', 'CA'),
(164, 'Smith', 'AB', 'CA'),
(165, 'Smoky Lake', 'AB', 'CA'),
(166, 'Spedden', 'AB', 'CA'),
(167, 'Spirit River', 'AB', 'CA'),
(168, 'Spruce Grove', 'AB', 'CA'),
(169, 'Standard', 'AB', 'CA'),
(170, 'Stettler', 'AB', 'CA'),
(171, 'Stony Plain', 'AB', 'CA'),
(172, 'Suffield', 'AB', 'CA'),
(173, 'Sylvan Lake', 'AB', 'CA'),
(174, 'Taber', 'AB', 'CA'),
(175, 'Thorhild', 'AB', 'CA'),
(176, 'Three Hills', 'AB', 'CA'),
(177, 'Tofield', 'AB', 'CA'),
(178, 'Trochu', 'AB', 'CA'),
(179, 'Two Hills', 'AB', 'CA'),
(180, 'Valleyview', 'AB', 'CA'),
(181, 'Vauxhall', 'AB', 'CA'),
(182, 'Vegreville', 'AB', 'CA'),
(183, 'Vermilion', 'AB', 'CA'),
(184, 'Veteran', 'AB', 'CA'),
(185, 'Viking', 'AB', 'CA'),
(186, 'Vulcan', 'AB', 'CA'),
(187, 'Wainwright', 'AB', 'CA'),
(188, 'Watino', 'AB', 'CA'),
(189, 'Webster', 'AB', 'CA'),
(190, 'Wembley', 'AB', 'CA'),
(191, 'Westlock', 'AB', 'CA'),
(192, 'Wetaskiwin', 'AB', 'CA'),
(193, 'Whitecourt', 'AB', 'CA'),
(194, 'Widewater', 'AB', 'CA'),
(195, 'Wildwood', 'AB', 'CA'),
(196, 'Wrentham', 'AB', 'CA'),
(197, 'Abbotsford', 'BC', 'CA'),
(198, 'Abbottsford', 'BC', 'CA'),
(199, 'Agassiz', 'BC', 'CA'),
(200, 'Aiyansh', 'BC', 'CA'),
(201, 'Albert Canyon', 'BC', 'CA'),
(202, 'Alert Bay', 'BC', 'CA'),
(203, 'Armstrong', 'BC', 'CA'),
(204, 'Ashcroft', 'BC', 'CA'),
(205, 'Atlin', 'BC', 'CA'),
(206, 'Bamfield', 'BC', 'CA'),
(207, 'Barriere', 'BC', 'CA'),
(208, 'Bella Coola', 'BC', 'CA'),
(209, 'Black Pines', 'BC', 'CA'),
(210, 'Blucher Hall', 'BC', 'CA'),
(211, 'Boswell', 'BC', 'CA'),
(212, 'Brackendale', 'BC', 'CA'),
(213, 'Brentwood Bay', 'BC', 'CA'),
(214, 'Bridge Lake', 'BC', 'CA'),
(215, 'Burnaby', 'BC', 'CA'),
(216, 'Burns Lake', 'BC', 'CA'),
(217, 'Campbell River', 'BC', 'CA'),
(218, 'Canal Flats', 'BC', 'CA'),
(219, 'Castlegar', 'BC', 'CA'),
(220, 'Cecil Lake', 'BC', 'CA'),
(221, 'Chase', 'BC', 'CA'),
(222, 'Chemainus', 'BC', 'CA'),
(223, 'Cherryville', 'BC', 'CA'),
(224, 'Chief Lake', 'BC', 'CA'),
(225, 'Chilliwack', 'BC', 'CA'),
(226, 'Cinema', 'BC', 'CA'),
(227, 'Clearwater', 'BC', 'CA'),
(228, 'Clo-oose', 'BC', 'CA'),
(229, 'Cloverdale', 'BC', 'CA'),
(230, 'Coal Creek', 'BC', 'CA'),
(231, 'Cobble Hill', 'BC', 'CA'),
(232, 'Colebrook', 'BC', 'CA'),
(233, 'Comox', 'BC', 'CA'),
(234, 'Coquitlam', 'BC', 'CA'),
(235, 'Cortes Bay', 'BC', 'CA'),
(236, 'Courtenay', 'BC', 'CA'),
(237, 'Cowichan Bay', 'BC', 'CA'),
(238, 'Cranbrook', 'BC', 'CA'),
(239, 'Creston', 'BC', 'CA'),
(240, 'Crofton', 'BC', 'CA'),
(241, 'Dawson Creek', 'BC', 'CA'),
(242, 'Dease Lake', 'BC', 'CA'),
(243, 'Delta', 'BC', 'CA'),
(244, 'Deroche', 'BC', 'CA'),
(245, 'Dot', 'BC', 'CA'),
(246, 'Duncan', 'BC', 'CA'),
(247, 'Edgewood', 'BC', 'CA'),
(248, 'Elko', 'BC', 'CA'),
(249, 'Enderby', 'BC', 'CA'),
(250, 'Extension', 'BC', 'CA'),
(251, 'Fairmont Hot Springs', 'BC', 'CA'),
(252, 'Fernie', 'BC', 'CA'),
(253, 'Finmoore', 'BC', 'CA'),
(254, 'Fort Nelson', 'BC', 'CA'),
(255, 'Fort Saint James', 'BC', 'CA'),
(256, 'Fort Saint John', 'BC', 'CA'),
(257, 'Fraser Lake', 'BC', 'CA'),
(258, 'Fruitvale', 'BC', 'CA'),
(259, 'Gabriola', 'BC', 'CA'),
(260, 'Ganges', 'BC', 'CA'),
(261, 'Garibaldi', 'BC', 'CA'),
(262, 'Gibsons', 'BC', 'CA'),
(263, 'Glacier', 'BC', 'CA'),
(264, 'Gold Bridge', 'BC', 'CA'),
(265, 'Golden', 'BC', 'CA'),
(266, 'Grand Forks', 'BC', 'CA'),
(267, 'Hagensborg', 'BC', 'CA'),
(268, 'Hartley Bay', 'BC', 'CA'),
(269, 'Hazelton', 'BC', 'CA'),
(270, 'Hedley', 'BC', 'CA'),
(271, 'Hixon', 'BC', 'CA'),
(272, 'Houston', 'BC', 'CA'),
(273, 'Invermere', 'BC', 'CA'),
(274, 'Isle Pierre', 'BC', 'CA'),
(275, 'Kamloops', 'BC', 'CA'),
(276, 'Kelowna', 'BC', 'CA'),
(277, 'Keremeos', 'BC', 'CA'),
(278, 'Kimberley', 'BC', 'CA'),
(279, 'Kimberly', 'BC', 'CA'),
(280, 'Kincolith', 'BC', 'CA'),
(281, 'Kitimat', 'BC', 'CA'),
(282, 'Kitwanga', 'BC', 'CA'),
(283, 'Ladner', 'BC', 'CA'),
(284, 'Ladysmith', 'BC', 'CA'),
(285, 'Lake Cowichan', 'BC', 'CA'),
(286, 'Langley', 'BC', 'CA'),
(287, 'Leon', 'BC', 'CA'),
(288, 'Lillooet', 'BC', 'CA'),
(289, 'Lumby', 'BC', 'CA'),
(290, 'Lytton', 'BC', 'CA'),
(291, 'Mackenzie', 'BC', 'CA'),
(292, 'Maple Ridge', 'BC', 'CA'),
(293, 'Marysville', 'BC', 'CA'),
(294, 'Masset', 'BC', 'CA'),
(295, 'Mayne', 'BC', 'CA'),
(296, 'McBride', 'BC', 'CA'),
(297, 'McMurphy', 'BC', 'CA'),
(298, 'Merritt', 'BC', 'CA'),
(299, 'Merville', 'BC', 'CA'),
(300, 'Midway', 'BC', 'CA'),
(301, 'Mission', 'BC', 'CA'),
(302, 'Moberly Lake', 'BC', 'CA'),
(303, 'Mud River', 'BC', 'CA'),
(304, 'Nadu', 'BC', 'CA'),
(305, 'Nakusp', 'BC', 'CA'),
(306, 'Nanaimo', 'BC', 'CA'),
(307, 'Nanoose Bay', 'BC', 'CA'),
(308, 'Nelson', 'BC', 'CA'),
(309, 'New Denver', 'BC', 'CA'),
(310, 'New Westminster', 'BC', 'CA'),
(311, 'Newgate', 'BC', 'CA'),
(312, 'North Surrey', 'BC', 'CA'),
(313, 'North Vancouver', 'BC', 'CA'),
(314, 'Ocean Falls', 'BC', 'CA'),
(315, 'Okanagan', 'BC', 'CA'),
(316, 'Oliver', 'BC', 'CA'),
(317, 'One Hundred Mile House', 'BC', 'CA'),
(318, 'Osoyoos', 'BC', 'CA'),
(319, 'Oyama', 'BC', 'CA'),
(320, 'Pacific', 'BC', 'CA'),
(321, 'Parksville', 'BC', 'CA'),
(322, 'Peachland', 'BC', 'CA'),
(323, 'Pemberton', 'BC', 'CA'),
(324, 'Penticton', 'BC', 'CA'),
(325, 'Pitt Meadows', 'BC', 'CA'),
(326, 'Port Alberni', 'BC', 'CA'),
(327, 'Port Alice', 'BC', 'CA'),
(328, 'Port Clements', 'BC', 'CA'),
(329, 'Port Coquitlam', 'BC', 'CA'),
(330, 'Port Edward', 'BC', 'CA'),
(331, 'Port Hardy', 'BC', 'CA'),
(332, 'Port Mann', 'BC', 'CA'),
(333, 'Port Mellon', 'BC', 'CA'),
(334, 'Port Moody', 'BC', 'CA'),
(335, 'Port Neville', 'BC', 'CA'),
(336, 'Pouce Coupe', 'BC', 'CA'),
(337, 'Powell River', 'BC', 'CA'),
(338, 'Prince George', 'BC', 'CA'),
(339, 'Prince Rupert', 'BC', 'CA'),
(340, 'Princeton', 'BC', 'CA'),
(341, 'Pritchard', 'BC', 'CA'),
(342, 'Qualicum Beach', 'BC', 'CA'),
(343, 'Quathiaski Cove', 'BC', 'CA'),
(344, 'Queen Charlotte', 'BC', 'CA'),
(345, 'Quesnel', 'BC', 'CA'),
(346, 'Revelstoke', 'BC', 'CA'),
(347, 'Richmond', 'BC', 'CA'),
(348, 'Riondel', 'BC', 'CA'),
(349, 'Roberts Creek', 'BC', 'CA'),
(350, 'Rose Lake', 'BC', 'CA'),
(351, 'Rossland', 'BC', 'CA'),
(352, 'Salmon Arm', 'BC', 'CA'),
(353, 'Salmon Valley', 'BC', 'CA'),
(354, 'Savona', 'BC', 'CA'),
(355, 'Sayward', 'BC', 'CA'),
(356, 'Sechelt', 'BC', 'CA'),
(357, 'Shere', 'BC', 'CA'),
(358, 'Sicamous', 'BC', 'CA'),
(359, 'Sidney', 'BC', 'CA'),
(360, 'Skidegate', 'BC', 'CA'),
(361, 'Slocan', 'BC', 'CA'),
(362, 'Smithers', 'BC', 'CA'),
(363, 'Sointula', 'BC', 'CA'),
(364, 'Sooke', 'BC', 'CA'),
(365, 'Sorrento', 'BC', 'CA'),
(366, 'Squamish', 'BC', 'CA'),
(367, 'Stephen', 'BC', 'CA'),
(368, 'Stewart', 'BC', 'CA'),
(369, 'Sturdies Bay', 'BC', 'CA'),
(370, 'Summerland', 'BC', 'CA'),
(371, 'Surrey', 'BC', 'CA'),
(372, 'Tahsis', 'BC', 'CA'),
(373, 'Tappen', 'BC', 'CA'),
(374, 'Taylor', 'BC', 'CA'),
(375, 'Telegraph Creek', 'BC', 'CA'),
(376, 'Terrace', 'BC', 'CA'),
(377, 'Tlell', 'BC', 'CA'),
(378, 'Tofino', 'BC', 'CA'),
(379, 'Trail', 'BC', 'CA'),
(380, 'Tsawwassen', 'BC', 'CA'),
(381, 'Ucluelet', 'BC', 'CA'),
(382, 'Union Bay', 'BC', 'CA'),
(383, 'Valemount', 'BC', 'CA'),
(384, 'Vancouver', 'BC', 'CA'),
(385, 'Vanderhoof', 'BC', 'CA'),
(386, 'Vernon', 'BC', 'CA'),
(387, 'Victoria', 'BC', 'CA'),
(388, 'Whaletown', 'BC', 'CA'),
(389, 'White Rock', 'BC', 'CA'),
(390, 'Williams Lake', 'BC', 'CA'),
(391, 'Windermere', 'BC', 'CA'),
(392, 'Winfield', 'BC', 'CA'),
(393, 'Wright', 'BC', 'CA'),
(394, 'Youbou', 'BC', 'CA'),
(395, 'Zeballos', 'BC', 'CA'),
(396, 'Alexander', 'MB', 'CA'),
(397, 'Altona', 'MB', 'CA'),
(398, 'Arborg', 'MB', 'CA'),
(399, 'Ashern', 'MB', 'CA'),
(400, 'Austin', 'MB', 'CA'),
(401, 'Beausejour', 'MB', 'CA'),
(402, 'Brandon', 'MB', 'CA'),
(403, 'Brochet', 'MB', 'CA'),
(404, 'Carberry', 'MB', 'CA'),
(405, 'Carman', 'MB', 'CA'),
(406, 'Cranberry Portage', 'MB', 'CA'),
(407, 'Cross Lake', 'MB', 'CA'),
(408, 'Dauphin', 'MB', 'CA'),
(409, 'Deer', 'MB', 'CA'),
(410, 'Dufresne', 'MB', 'CA'),
(411, 'Eriksdale', 'MB', 'CA'),
(412, 'Flin Flon', 'MB', 'CA'),
(413, 'Gillam', 'MB', 'CA'),
(414, 'Gimli', 'MB', 'CA'),
(415, 'Gods Lake', 'MB', 'CA'),
(416, 'Griswold', 'MB', 'CA'),
(417, 'Gypsumville', 'MB', 'CA'),
(418, 'Hamiota', 'MB', 'CA'),
(419, 'Inwood', 'MB', 'CA'),
(420, 'Kemnay', 'MB', 'CA'),
(421, 'Killarney', 'MB', 'CA'),
(422, 'Langruth', 'MB', 'CA'),
(423, 'Lazare', 'MB', 'CA'),
(424, 'Macgregor', 'MB', 'CA'),
(425, 'Malonton', 'MB', 'CA'),
(426, 'Manitou', 'MB', 'CA'),
(427, 'McCreary', 'MB', 'CA'),
(428, 'Melita', 'MB', 'CA'),
(429, 'Miami', 'MB', 'CA'),
(430, 'Minitonas', 'MB', 'CA'),
(431, 'Minnedosa', 'MB', 'CA'),
(432, 'Morden', 'MB', 'CA'),
(433, 'Morris', 'MB', 'CA'),
(434, 'Neepawa', 'MB', 'CA'),
(435, 'Nelson House', 'MB', 'CA'),
(436, 'Norway House', 'MB', 'CA'),
(437, 'Notre-Dame-de-Lourdes', 'MB', 'CA'),
(438, 'Ochre River', 'MB', 'CA'),
(439, 'Otterburne', 'MB', 'CA'),
(440, 'Oxford House', 'MB', 'CA'),
(441, 'Pilot Mound', 'MB', 'CA'),
(442, 'Pinawa', 'MB', 'CA'),
(443, 'Pine Falls', 'MB', 'CA'),
(444, 'Portage La Prairie', 'MB', 'CA'),
(445, 'Richer', 'MB', 'CA'),
(446, 'Rivers', 'MB', 'CA'),
(447, 'Rosenfeld', 'MB', 'CA'),
(448, 'Saint Lazare', 'MB', 'CA'),
(449, 'Sainte-Anne', 'MB', 'CA'),
(450, 'Selkirk', 'MB', 'CA'),
(451, 'Shoal Lake', 'MB', 'CA'),
(452, 'Southport', 'MB', 'CA'),
(453, 'Steinbach', 'MB', 'CA'),
(454, 'Stonewall', 'MB', 'CA'),
(455, 'Stony Mountain', 'MB', 'CA'),
(456, 'Swan River', 'MB', 'CA'),
(457, 'Teulon', 'MB', 'CA'),
(458, 'The Pas', 'MB', 'CA'),
(459, 'Thicket Portage', 'MB', 'CA'),
(460, 'Thompson', 'MB', 'CA'),
(461, 'Treherne', 'MB', 'CA'),
(462, 'Virden', 'MB', 'CA'),
(463, 'Wawanesa', 'MB', 'CA'),
(464, 'Winkler', 'MB', 'CA'),
(465, 'Winnipeg', 'MB', 'CA'),
(466, 'Winnipegosis', 'MB', 'CA'),
(467, 'Aldouane', 'NB', 'CA'),
(468, 'Bathurst', 'NB', 'CA'),
(469, 'Blackville', 'NB', 'CA'),
(470, 'Buctouche', 'NB', 'CA'),
(471, 'Burnsville', 'NB', 'CA'),
(472, 'Burnt Church', 'NB', 'CA'),
(473, 'Campbellton', 'NB', 'CA'),
(474, 'Canterbury Station', 'NB', 'CA'),
(475, 'Caraquet', 'NB', 'CA'),
(476, 'Chatham', 'NB', 'CA'),
(477, 'Dalhousie', 'NB', 'CA'),
(478, 'Dieppe', 'NB', 'CA'),
(479, 'Doaktown', 'NB', 'CA'),
(480, 'Durham Bridge', 'NB', 'CA'),
(481, 'Edmundston', 'NB', 'CA'),
(482, 'Frederickton', 'NB', 'CA'),
(483, 'Fredericton', 'NB', 'CA'),
(484, 'Glassville', 'NB', 'CA'),
(485, 'Grand Bay', 'NB', 'CA'),
(486, 'Grand Falls', 'NB', 'CA'),
(487, 'Hampton', 'NB', 'CA'),
(488, 'Harvey', 'NB', 'CA'),
(489, 'Hillsborough', 'NB', 'CA'),
(490, 'Kedgwick', 'NB', 'CA'),
(491, 'Kent Junction', 'NB', 'CA'),
(492, 'L\'Etete', 'NB', 'CA'),
(493, 'McAdam', 'NB', 'CA'),
(494, 'Memramcook', 'NB', 'CA'),
(495, 'Miramichi', 'NB', 'CA'),
(496, 'Moncton', 'NB', 'CA'),
(497, 'Moores Mills', 'NB', 'CA'),
(498, 'Nauwigewauk', 'NB', 'CA'),
(499, 'Neguac', 'NB', 'CA'),
(500, 'Newcastle Bridge', 'NB', 'CA'),
(501, 'Nigadoo', 'NB', 'CA'),
(502, 'Notre Dame', 'NB', 'CA'),
(503, 'Oromocto', 'NB', 'CA'),
(504, 'Pennfield', 'NB', 'CA'),
(505, 'Plaster Rock', 'NB', 'CA'),
(506, 'Pointe-du-Chene', 'NB', 'CA'),
(507, 'Prince William', 'NB', 'CA'),
(508, 'Renous', 'NB', 'CA'),
(509, 'Rexton', 'NB', 'CA'),
(510, 'Richibucto', 'NB', 'CA'),
(511, 'River Charlo', 'NB', 'CA'),
(512, 'Rogersville', 'NB', 'CA'),
(513, 'Rothesay', 'NB', 'CA'),
(514, 'Sackville', 'NB', 'CA'),
(515, 'Saint Andrews', 'NB', 'CA'),
(516, 'Saint John', 'NB', 'CA'),
(517, 'Saint Louis De Kent', 'NB', 'CA'),
(518, 'Saint Margaret Bay', 'NB', 'CA'),
(519, 'Salisbury', 'NB', 'CA'),
(520, 'Shediac', 'NB', 'CA'),
(521, 'South Nelson', 'NB', 'CA'),
(522, 'Stanley', 'NB', 'CA'),
(523, 'Sussex', 'NB', 'CA'),
(524, 'Welsford', 'NB', 'CA'),
(525, 'Woodstock', 'NB', 'CA'),
(526, 'Baie Verte', 'NL', 'CA'),
(527, 'Bauline', 'NL', 'CA'),
(528, 'Bay Bulls', 'NL', 'CA'),
(529, 'Bay De Verde', 'NL', 'CA'),
(530, 'Bay Roberts', 'NL', 'CA'),
(531, 'Belleoram', 'NL', 'CA'),
(532, 'Birchy Bay', 'NL', 'CA'),
(533, 'Bishops Falls', 'NL', 'CA'),
(534, 'Bonavista', 'NL', 'CA'),
(535, 'Botwood', 'NL', 'CA'),
(536, 'Brigus', 'NL', 'CA'),
(537, 'Burgeo', 'NL', 'CA'),
(538, 'Burin', 'NL', 'CA'),
(539, 'Burnside', 'NL', 'CA'),
(540, 'Cape Ray', 'NL', 'CA'),
(541, 'Carbonear', 'NL', 'CA'),
(542, 'Catalina', 'NL', 'CA'),
(543, 'Change Islands', 'NL', 'CA'),
(544, 'Channel-Port Aux Basques', 'NL', 'CA'),
(545, 'Chapel Arm', 'NL', 'CA'),
(546, 'Clarenville', 'NL', 'CA'),
(547, 'Colliers', 'NL', 'CA'),
(548, 'Come By Chance', 'NL', 'CA'),
(549, 'Corner Brook', 'NL', 'CA'),
(550, 'Daniels Cove', 'NL', 'CA'),
(551, 'Dildo', 'NL', 'CA'),
(552, 'Doyles', 'NL', 'CA'),
(553, 'Dunville', 'NL', 'CA'),
(554, 'Fortune', 'NL', 'CA'),
(555, 'Foxtrap', 'NL', 'CA'),
(556, 'Francois', 'NL', 'CA'),
(557, 'Gambo', 'NL', 'CA'),
(558, 'Gander', 'NL', 'CA'),
(559, 'Glenburnie', 'NL', 'CA'),
(560, 'Glovertown', 'NL', 'CA'),
(561, 'Goose Bay', 'NL', 'CA'),
(562, 'Grand Bank', 'NL', 'CA'),
(563, 'Grates Cove', 'NL', 'CA'),
(564, 'Happy Valley', 'NL', 'CA'),
(565, 'Harbour Grace', 'NL', 'CA'),
(566, 'Holyrood', 'NL', 'CA'),
(567, 'Kelligrews', 'NL', 'CA'),
(568, 'La Scie', 'NL', 'CA'),
(569, 'Lamaline', 'NL', 'CA'),
(570, 'Lawn', 'NL', 'CA'),
(571, 'Lewisporte', 'NL', 'CA'),
(572, 'Little Bay Island', 'NL', 'CA'),
(573, 'Little Harbour', 'NL', 'CA'),
(574, 'Logy Bay', 'NL', 'CA'),
(575, 'Loon Bay', 'NL', 'CA'),
(576, 'Lourdes', 'NL', 'CA'),
(577, 'Marystown', 'NL', 'CA'),
(578, 'Middle Arm', 'NL', 'CA'),
(579, 'Mount Pearl', 'NL', 'CA'),
(580, 'Mount Pearl Park', 'NL', 'CA'),
(581, 'Nippers Harbour', 'NL', 'CA'),
(582, 'Norris Arm', 'NL', 'CA'),
(583, 'Paradise', 'NL', 'CA'),
(584, 'Parsons Pond', 'NL', 'CA'),
(585, 'Petty Harbour', 'NL', 'CA'),
(586, 'Placentia', 'NL', 'CA'),
(587, 'Port Albert', 'NL', 'CA'),
(588, 'Port Blandford', 'NL', 'CA'),
(589, 'Port Saunders', 'NL', 'CA'),
(590, 'Portugal Cove', 'NL', 'CA'),
(591, 'Ramea', 'NL', 'CA'),
(592, 'Rigolet', 'NL', 'CA'),
(593, 'Saint Anthony', 'NL', 'CA'),
(594, 'Saint George', 'NL', 'CA'),
(595, 'Saint John\'s', 'NL', 'CA'),
(596, 'Saint Jones Within', 'NL', 'CA'),
(597, 'Silverdale', 'NL', 'CA'),
(598, 'South Branch', 'NL', 'CA'),
(599, 'Southern Bay', 'NL', 'CA'),
(600, 'Spaniards Bay', 'NL', 'CA'),
(601, 'Springdale', 'NL', 'CA'),
(602, 'Stephenville', 'NL', 'CA'),
(603, 'Topsail', 'NL', 'CA'),
(604, 'Torbay', 'NL', 'CA'),
(605, 'Twillingate', 'NL', 'CA'),
(606, 'Wabana', 'NL', 'CA'),
(607, 'Wabush', 'NL', 'CA'),
(608, 'Whitbourne', 'NL', 'CA'),
(609, 'Winterton', 'NL', 'CA'),
(610, 'Witless Bay', 'NL', 'CA'),
(611, 'York Harbour', 'NL', 'CA'),
(612, 'Albany', 'NS', 'CA'),
(613, 'Amherst', 'NS', 'CA'),
(614, 'Annapolis', 'NS', 'CA'),
(615, 'Annapolis Royal', 'NS', 'CA'),
(616, 'Antigonish', 'NS', 'CA'),
(617, 'Arichat', 'NS', 'CA'),
(618, 'Barrington', 'NS', 'CA'),
(619, 'Bear River', 'NS', 'CA'),
(620, 'Beaver Harbour', 'NS', 'CA'),
(621, 'Bedford', 'NS', 'CA'),
(622, 'Berwick', 'NS', 'CA'),
(623, 'Bridgetown', 'NS', 'CA'),
(624, 'Bridgewater', 'NS', 'CA'),
(625, 'Centreville', 'NS', 'CA'),
(626, 'Chester', 'NS', 'CA'),
(627, 'Church Point', 'NS', 'CA'),
(628, 'Cornwallis', 'NS', 'CA'),
(629, 'Cow Bay', 'NS', 'CA'),
(630, 'Dartmouth', 'NS', 'CA'),
(631, 'Debert', 'NS', 'CA'),
(632, 'Digby', 'NS', 'CA'),
(633, 'Dingwall', 'NS', 'CA'),
(634, 'East Chezzetcook', 'NS', 'CA'),
(635, 'Eastern Passage', 'NS', 'CA'),
(636, 'Economy', 'NS', 'CA'),
(637, 'Elmsdale', 'NS', 'CA'),
(638, 'Glace Bay', 'NS', 'CA'),
(639, 'Grand Narrows', 'NS', 'CA'),
(640, 'Granville Ferry', 'NS', 'CA'),
(641, 'Greenwood', 'NS', 'CA'),
(642, 'Halifax', 'NS', 'CA'),
(643, 'Hantsport', 'NS', 'CA'),
(644, 'Hopewell', 'NS', 'CA'),
(645, 'Hubbards', 'NS', 'CA'),
(646, 'Inverness', 'NS', 'CA'),
(647, 'Judique', 'NS', 'CA'),
(648, 'Kennetcook', 'NS', 'CA'),
(649, 'Kentville', 'NS', 'CA'),
(650, 'Kingsport', 'NS', 'CA'),
(651, 'Lawrencetown', 'NS', 'CA'),
(652, 'Liverpool', 'NS', 'CA'),
(653, 'Londonderry', 'NS', 'CA'),
(654, 'Long Point', 'NS', 'CA'),
(655, 'Lunenburg', 'NS', 'CA'),
(656, 'Mabou', 'NS', 'CA'),
(657, 'Mahone Bay', 'NS', 'CA'),
(658, 'Marshy Hope', 'NS', 'CA'),
(659, 'McKinnon Harbour', 'NS', 'CA'),
(660, 'Merigomishe', 'NS', 'CA'),
(661, 'Middleton', 'NS', 'CA'),
(662, 'Mosherville', 'NS', 'CA'),
(663, 'Mount Uniacke', 'NS', 'CA'),
(664, 'Musquodoboit', 'NS', 'CA'),
(665, 'Musquodoboit Harbour', 'NS', 'CA'),
(666, 'New Germany', 'NS', 'CA'),
(667, 'New Glasgow', 'NS', 'CA'),
(668, 'New Waterford', 'NS', 'CA'),
(669, 'Oxford', 'NS', 'CA'),
(670, 'Oxford Junction', 'NS', 'CA'),
(671, 'Parrsboro', 'NS', 'CA'),
(672, 'Petit-Etang', 'NS', 'CA'),
(673, 'Pictou', 'NS', 'CA'),
(674, 'Port Hastings', 'NS', 'CA'),
(675, 'Port Hawkesbury', 'NS', 'CA'),
(676, 'Port Mouton', 'NS', 'CA'),
(677, 'Port Williams', 'NS', 'CA'),
(678, 'Pubnico', 'NS', 'CA'),
(679, 'Sable River', 'NS', 'CA'),
(680, 'Saint Peters', 'NS', 'CA'),
(681, 'Scotsburn', 'NS', 'CA'),
(682, 'Shubenacadie', 'NS', 'CA'),
(683, 'Springhill', 'NS', 'CA'),
(684, 'Stellarton', 'NS', 'CA'),
(685, 'Sydney', 'NS', 'CA'),
(686, 'Sydney Mines', 'NS', 'CA'),
(687, 'Tatamagouche', 'NS', 'CA'),
(688, 'Tenecape', 'NS', 'CA'),
(689, 'Tracadie', 'NS', 'CA'),
(690, 'Truro', 'NS', 'CA'),
(691, 'Upper Musquodoboit', 'NS', 'CA'),
(692, 'Wedgeport', 'NS', 'CA'),
(693, 'Westville', 'NS', 'CA'),
(694, 'Weymouth', 'NS', 'CA'),
(695, 'Wolfville', 'NS', 'CA'),
(696, 'Woods Harbour', 'NS', 'CA'),
(697, 'Yarmouth', 'NS', 'CA'),
(698, 'Aklavik', 'NT', 'CA'),
(699, 'Apex', 'NT', 'CA'),
(700, 'Arctic Bay', 'NT', 'CA'),
(701, 'Arviat', 'NT', 'CA'),
(702, 'Baker Lake', 'NT', 'CA'),
(703, 'Broughton Island', 'NT', 'CA'),
(704, 'Cambridge Bay', 'NT', 'CA'),
(705, 'Cape Dorset', 'NT', 'CA'),
(706, 'Chesterfield Inlet', 'NT', 'CA'),
(707, 'Clyde River', 'NT', 'CA'),
(708, 'Colville Lake', 'NT', 'CA'),
(709, 'Coral Harbour', 'NT', 'CA'),
(710, 'Deline', 'NT', 'CA'),
(711, 'Fort Good Hope', 'NT', 'CA'),
(712, 'Fort Liard', 'NT', 'CA'),
(713, 'Fort McPherson', 'NT', 'CA'),
(714, 'Fort Providence', 'NT', 'CA'),
(715, 'Fort Resolution', 'NT', 'CA'),
(716, 'Fort Simpson', 'NT', 'CA'),
(717, 'Fort Smith', 'NT', 'CA'),
(718, 'Gjoa Haven', 'NT', 'CA'),
(719, 'Hall Beach', 'NT', 'CA'),
(720, 'Hay River', 'NT', 'CA'),
(721, 'Holman Island', 'NT', 'CA'),
(722, 'Igloolik', 'NT', 'CA'),
(723, 'Inuvik', 'NT', 'CA'),
(724, 'Iqaluit', 'NT', 'CA'),
(725, 'Jean Marie River', 'NT', 'CA'),
(726, 'Kimmirut', 'NT', 'CA'),
(727, 'Kugluktuk', 'NT', 'CA'),
(728, 'Nahanni Butte', 'NT', 'CA'),
(729, 'Norman Wells', 'NT', 'CA'),
(730, 'Pangnirtung', 'NT', 'CA'),
(731, 'Paulatuk', 'NT', 'CA'),
(732, 'Pelly Bay', 'NT', 'CA'),
(733, 'Pond Inlet', 'NT', 'CA'),
(734, 'Providence', 'NT', 'CA'),
(735, 'Rankin Inlet', 'NT', 'CA'),
(736, 'Repulse Bay', 'NT', 'CA'),
(737, 'Resolution', 'NT', 'CA'),
(738, 'Sachs Harbour', 'NT', 'CA'),
(739, 'Sanikiluaq', 'NT', 'CA'),
(740, 'Snare Lake', 'NT', 'CA'),
(741, 'Taloyoak', 'NT', 'CA'),
(742, 'Trout Lake', 'NT', 'CA'),
(743, 'Tsiigehtchic', 'NT', 'CA'),
(744, 'Tuktoyaktuk', 'NT', 'CA'),
(745, 'Tulita', 'NT', 'CA'),
(746, 'Wha Ti', 'NT', 'CA'),
(747, 'Wrigley', 'NT', 'CA'),
(748, 'Yellowknife', 'NT', 'CA'),
(749, 'Kugaaruk', 'NU', 'CA'),
(750, 'Resolute', 'NU', 'CA'),
(751, 'Acton', 'ON', 'CA'),
(752, 'Agincourt', 'ON', 'CA'),
(753, 'Ajax', 'ON', 'CA'),
(754, 'Alexandria', 'ON', 'CA'),
(755, 'Alfred', 'ON', 'CA'),
(756, 'Algonquin Park', 'ON', 'CA'),
(757, 'Allenford', 'ON', 'CA'),
(758, 'Alliston', 'ON', 'CA'),
(759, 'Almonte', 'ON', 'CA'),
(760, 'Amherstburg', 'ON', 'CA'),
(761, 'Angus', 'ON', 'CA'),
(762, 'Apsley', 'ON', 'CA'),
(763, 'Arnprior', 'ON', 'CA'),
(764, 'Arthur', 'ON', 'CA'),
(765, 'Atikokan', 'ON', 'CA'),
(766, 'Attawapiskat', 'ON', 'CA'),
(767, 'Aurora', 'ON', 'CA'),
(768, 'Ayr', 'ON', 'CA'),
(769, 'Ayton', 'ON', 'CA'),
(770, 'Baden', 'ON', 'CA'),
(771, 'Bala', 'ON', 'CA'),
(772, 'Bancroft', 'ON', 'CA'),
(773, 'Barrie', 'ON', 'CA'),
(774, 'Bath', 'ON', 'CA'),
(775, 'Bayfield', 'ON', 'CA'),
(776, 'Beachburg', 'ON', 'CA'),
(777, 'Beamsville', 'ON', 'CA'),
(778, 'Bearskin Lake', 'ON', 'CA'),
(779, 'Beaverton', 'ON', 'CA'),
(780, 'Belle River', 'ON', 'CA'),
(781, 'Belleville', 'ON', 'CA'),
(782, 'Belmont', 'ON', 'CA'),
(783, 'Bethany', 'ON', 'CA'),
(784, 'Blenheim', 'ON', 'CA'),
(785, 'Blind River', 'ON', 'CA'),
(786, 'Bobcaygeon', 'ON', 'CA'),
(787, 'Bolton', 'ON', 'CA'),
(788, 'Borden', 'ON', 'CA'),
(789, 'Bowmanville', 'ON', 'CA'),
(790, 'Bracebridge', 'ON', 'CA'),
(791, 'Bradford', 'ON', 'CA'),
(792, 'Brampton', 'ON', 'CA'),
(793, 'Brantford', 'ON', 'CA'),
(794, 'Brechin', 'ON', 'CA'),
(795, 'Brighton', 'ON', 'CA'),
(796, 'Brimley', 'ON', 'CA'),
(797, 'Britt', 'ON', 'CA'),
(798, 'Brockville', 'ON', 'CA'),
(799, 'Bruce Mines', 'ON', 'CA'),
(800, 'Buckhorn', 'ON', 'CA'),
(801, 'Burks Falls', 'ON', 'CA'),
(802, 'Burlington', 'ON', 'CA'),
(803, 'Calabogie', 'ON', 'CA'),
(804, 'Caledon', 'ON', 'CA'),
(805, 'Caledon East', 'ON', 'CA'),
(806, 'Caledonia', 'ON', 'CA'),
(807, 'Callander', 'ON', 'CA'),
(808, 'Cambridge', 'ON', 'CA'),
(809, 'Campbellford', 'ON', 'CA'),
(810, 'Canfield', 'ON', 'CA'),
(811, 'Cannington', 'ON', 'CA'),
(812, 'Capreol', 'ON', 'CA'),
(813, 'Cardinal', 'ON', 'CA'),
(814, 'Carleton Place', 'ON', 'CA'),
(815, 'Carp', 'ON', 'CA'),
(816, 'Casselman', 'ON', 'CA'),
(817, 'Chalk River', 'ON', 'CA'),
(818, 'Chapleau', 'ON', 'CA'),
(819, 'Chatsworth', 'ON', 'CA'),
(820, 'Chelmsford', 'ON', 'CA'),
(821, 'Cheminis', 'ON', 'CA'),
(822, 'Chesley', 'ON', 'CA'),
(823, 'Chesterville', 'ON', 'CA'),
(824, 'Churchill', 'ON', 'CA'),
(825, 'Clarkson', 'ON', 'CA'),
(826, 'Clinton', 'ON', 'CA'),
(827, 'Cobalt', 'ON', 'CA'),
(828, 'Cobden', 'ON', 'CA'),
(829, 'Cobourg', 'ON', 'CA'),
(830, 'Cochrane', 'ON', 'CA'),
(831, 'Colborne', 'ON', 'CA'),
(832, 'Coldwater', 'ON', 'CA'),
(833, 'Collingwood', 'ON', 'CA'),
(834, 'Comber', 'ON', 'CA'),
(835, 'Cornwall', 'ON', 'CA'),
(836, 'Cottam', 'ON', 'CA'),
(837, 'Courtright', 'ON', 'CA'),
(838, 'Creemore', 'ON', 'CA'),
(839, 'Creighton', 'ON', 'CA'),
(840, 'Crystal Beach', 'ON', 'CA'),
(841, 'Cumberland', 'ON', 'CA'),
(842, 'Deep River', 'ON', 'CA'),
(843, 'Deer Lake', 'ON', 'CA'),
(844, 'Delhi', 'ON', 'CA'),
(845, 'Denbigh', 'ON', 'CA'),
(846, 'Denfield', 'ON', 'CA'),
(847, 'Desbarats', 'ON', 'CA'),
(848, 'Deseronto', 'ON', 'CA'),
(849, 'Don Mills', 'ON', 'CA'),
(850, 'Dorset', 'ON', 'CA'),
(851, 'Downsview', 'ON', 'CA'),
(852, 'Dresden', 'ON', 'CA'),
(853, 'Drinkwater', 'ON', 'CA'),
(854, 'Drumbo', 'ON', 'CA'),
(855, 'Dryden', 'ON', 'CA'),
(856, 'Dundalk', 'ON', 'CA'),
(857, 'Dundas', 'ON', 'CA'),
(858, 'Dunnville', 'ON', 'CA'),
(859, 'Dunsford', 'ON', 'CA'),
(860, 'Durham', 'ON', 'CA'),
(861, 'Earlton', 'ON', 'CA'),
(862, 'Echo Bay', 'ON', 'CA'),
(863, 'Eganville', 'ON', 'CA'),
(864, 'Elgin', 'ON', 'CA'),
(865, 'Elk Lake', 'ON', 'CA'),
(866, 'Elliot Lake', 'ON', 'CA'),
(867, 'Elmira', 'ON', 'CA'),
(868, 'Elmvale', 'ON', 'CA'),
(869, 'Elora', 'ON', 'CA'),
(870, 'Emerald', 'ON', 'CA'),
(871, 'Emo', 'ON', 'CA'),
(872, 'Englehart', 'ON', 'CA'),
(873, 'Enterprise', 'ON', 'CA'),
(874, 'Erin', 'ON', 'CA'),
(875, 'Erindale', 'ON', 'CA'),
(876, 'Espanola', 'ON', 'CA'),
(877, 'Essex', 'ON', 'CA'),
(878, 'Etobicoke', 'ON', 'CA'),
(879, 'Exeter', 'ON', 'CA'),
(880, 'Falconbridge', 'ON', 'CA'),
(881, 'Fenelon Falls', 'ON', 'CA'),
(882, 'Fergus', 'ON', 'CA'),
(883, 'Flesherton', 'ON', 'CA'),
(884, 'Fonthill', 'ON', 'CA'),
(885, 'Forest', 'ON', 'CA'),
(886, 'Fort Albany', 'ON', 'CA'),
(887, 'Fort Erie', 'ON', 'CA'),
(888, 'Fort Frances', 'ON', 'CA'),
(889, 'Fort Hope', 'ON', 'CA'),
(890, 'Fort Severn', 'ON', 'CA'),
(891, 'Foymount', 'ON', 'CA'),
(892, 'Frankford', 'ON', 'CA'),
(893, 'Galt', 'ON', 'CA'),
(894, 'Gananoque', 'ON', 'CA'),
(895, 'Garden River', 'ON', 'CA'),
(896, 'Garson', 'ON', 'CA'),
(897, 'Georgetown', 'ON', 'CA'),
(898, 'Geraldton', 'ON', 'CA'),
(899, 'Glencoe', 'ON', 'CA'),
(900, 'Gloucester', 'ON', 'CA'),
(901, 'Goderich', 'ON', 'CA'),
(902, 'Gogama', 'ON', 'CA'),
(903, 'Golden Lake', 'ON', 'CA'),
(904, 'Goldpines', 'ON', 'CA'),
(905, 'Gooderham', 'ON', 'CA'),
(906, 'Gore Bay', 'ON', 'CA'),
(907, 'Grand Bend', 'ON', 'CA'),
(908, 'Grand Valley', 'ON', 'CA'),
(909, 'Gravenhurst', 'ON', 'CA'),
(910, 'Grimsby', 'ON', 'CA'),
(911, 'Guelph', 'ON', 'CA'),
(912, 'Hagersville', 'ON', 'CA'),
(913, 'Haileybury', 'ON', 'CA'),
(914, 'Haley Station', 'ON', 'CA'),
(915, 'Haliburton', 'ON', 'CA'),
(916, 'Hamilton', 'ON', 'CA'),
(917, 'Hanover', 'ON', 'CA'),
(918, 'Harriston', 'ON', 'CA'),
(919, 'Harrow', 'ON', 'CA'),
(920, 'Hastings', 'ON', 'CA'),
(921, 'Havelock', 'ON', 'CA'),
(922, 'Hawk Junction', 'ON', 'CA'),
(923, 'Hawkesbury', 'ON', 'CA'),
(924, 'Hearst', 'ON', 'CA'),
(925, 'Hensall', 'ON', 'CA'),
(926, 'Heron Bay', 'ON', 'CA'),
(927, 'Hespeler', 'ON', 'CA'),
(928, 'Hindon', 'ON', 'CA'),
(929, 'Holland', 'ON', 'CA'),
(930, 'Hope', 'ON', 'CA'),
(931, 'Hornepayne', 'ON', 'CA'),
(932, 'Huntsville', 'ON', 'CA'),
(933, 'Ignace', 'ON', 'CA'),
(934, 'Ingersoll', 'ON', 'CA'),
(935, 'Ingleside', 'ON', 'CA'),
(936, 'Inglewood', 'ON', 'CA'),
(937, 'Iroquois', 'ON', 'CA'),
(938, 'Iroquois Falls', 'ON', 'CA'),
(939, 'Kagawong', 'ON', 'CA'),
(940, 'Kakabeka Falls', 'ON', 'CA'),
(941, 'Kanata', 'ON', 'CA'),
(942, 'Kapuskasing', 'ON', 'CA'),
(943, 'Keene', 'ON', 'CA'),
(944, 'Keewatin', 'ON', 'CA'),
(945, 'Kemptville', 'ON', 'CA'),
(946, 'Kenora', 'ON', 'CA'),
(947, 'Keswick', 'ON', 'CA'),
(948, 'Kincardine', 'ON', 'CA'),
(949, 'King City', 'ON', 'CA'),
(950, 'Kingston', 'ON', 'CA'),
(951, 'Kingsville', 'ON', 'CA'),
(952, 'Kirkland Lake', 'ON', 'CA'),
(953, 'Kitchener', 'ON', 'CA'),
(954, 'L\'Original', 'ON', 'CA'),
(955, 'Lakefield', 'ON', 'CA'),
(956, 'Lancaster', 'ON', 'CA'),
(957, 'Lansdowne', 'ON', 'CA'),
(958, 'Leamington', 'ON', 'CA'),
(959, 'Leaside', 'ON', 'CA'),
(960, 'Lefroy', 'ON', 'CA'),
(961, 'Levack', 'ON', 'CA'),
(962, 'Lindsay', 'ON', 'CA'),
(963, 'Listowel', 'ON', 'CA'),
(964, 'Little Current', 'ON', 'CA'),
(965, 'Lively', 'ON', 'CA'),
(966, 'London', 'ON', 'CA'),
(967, 'Long Sault', 'ON', 'CA'),
(968, 'Longlac', 'ON', 'CA'),
(969, 'Lucan', 'ON', 'CA'),
(970, 'Lucknow', 'ON', 'CA'),
(971, 'Macdiarmid', 'ON', 'CA'),
(972, 'Madoc', 'ON', 'CA'),
(973, 'Magnetawan', 'ON', 'CA'),
(974, 'Maitland', 'ON', 'CA'),
(975, 'Malton', 'ON', 'CA'),
(976, 'Manitouwadge', 'ON', 'CA'),
(977, 'Manitowaning', 'ON', 'CA'),
(978, 'Maple', 'ON', 'CA'),
(979, 'Marathon', 'ON', 'CA'),
(980, 'Markdale', 'ON', 'CA'),
(981, 'Markham', 'ON', 'CA'),
(982, 'Markstay', 'ON', 'CA'),
(983, 'Marmora', 'ON', 'CA'),
(984, 'Massey', 'ON', 'CA'),
(985, 'Mattawa', 'ON', 'CA'),
(986, 'Maxville', 'ON', 'CA'),
(987, 'Maynooth', 'ON', 'CA'),
(988, 'McGregor', 'ON', 'CA'),
(989, 'Meaford', 'ON', 'CA'),
(990, 'Merrickville', 'ON', 'CA'),
(991, 'Michipicoten', 'ON', 'CA'),
(992, 'Midhurst', 'ON', 'CA'),
(993, 'Midland', 'ON', 'CA'),
(994, 'Mildmay', 'ON', 'CA'),
(995, 'Millbrook', 'ON', 'CA'),
(996, 'Millhaven', 'ON', 'CA'),
(997, 'Milton', 'ON', 'CA'),
(998, 'Milverton', 'ON', 'CA'),
(999, 'Mimico', 'ON', 'CA'),
(1000, 'Minden', 'ON', 'CA'),
(1001, 'Mississauga', 'ON', 'CA'),
(1002, 'Mitchell', 'ON', 'CA'),
(1003, 'Moose Factory', 'ON', 'CA'),
(1004, 'Morrisburg', 'ON', 'CA'),
(1005, 'Mount Forest', 'ON', 'CA'),
(1006, 'Mountain Grove', 'ON', 'CA'),
(1007, 'Nakina', 'ON', 'CA'),
(1008, 'Napanee', 'ON', 'CA'),
(1009, 'Nepean', 'ON', 'CA'),
(1010, 'New Hamburg', 'ON', 'CA'),
(1011, 'New Liskeard', 'ON', 'CA'),
(1012, 'Newburgh', 'ON', 'CA'),
(1013, 'Newcastle', 'ON', 'CA'),
(1014, 'Newmarket', 'ON', 'CA'),
(1015, 'Niagara', 'ON', 'CA'),
(1016, 'Niagara Falls', 'ON', 'CA'),
(1017, 'Niagara-on-the-Lake', 'ON', 'CA'),
(1018, 'Nipigon', 'ON', 'CA'),
(1019, 'Noelville', 'ON', 'CA'),
(1020, 'North Bay', 'ON', 'CA'),
(1021, 'Norwich', 'ON', 'CA'),
(1022, 'Norwood', 'ON', 'CA'),
(1023, 'Oakville', 'ON', 'CA'),
(1024, 'Omemee', 'ON', 'CA'),
(1025, 'Orangeville', 'ON', 'CA'),
(1026, 'Orillia', 'ON', 'CA'),
(1027, 'Orleans', 'ON', 'CA'),
(1028, 'Oshawa', 'ON', 'CA'),
(1029, 'Ottawa', 'ON', 'CA'),
(1030, 'Otter Lake', 'ON', 'CA'),
(1031, 'Owen Sound', 'ON', 'CA'),
(1032, 'Paisley', 'ON', 'CA'),
(1033, 'Pakenham', 'ON', 'CA'),
(1034, 'Palmerston', 'ON', 'CA'),
(1035, 'Paris', 'ON', 'CA'),
(1036, 'Park Head', 'ON', 'CA'),
(1037, 'Parkhill', 'ON', 'CA'),
(1038, 'Parry Sound', 'ON', 'CA'),
(1039, 'Pass Lake', 'ON', 'CA'),
(1040, 'Pefferlaw', 'ON', 'CA'),
(1041, 'Pembroke', 'ON', 'CA'),
(1042, 'Penetanguishene', 'ON', 'CA'),
(1043, 'Perth', 'ON', 'CA'),
(1044, 'Petawawa', 'ON', 'CA'),
(1045, 'Peterborough', 'ON', 'CA'),
(1046, 'Petrolia', 'ON', 'CA'),
(1047, 'Pickering', 'ON', 'CA'),
(1048, 'Picton', 'ON', 'CA'),
(1049, 'Pikangikum', 'ON', 'CA'),
(1050, 'Pinewood', 'ON', 'CA'),
(1051, 'Point Edward', 'ON', 'CA'),
(1052, 'Pontypool', 'ON', 'CA'),
(1053, 'Poplar Hill', 'ON', 'CA'),
(1054, 'Port Colborne', 'ON', 'CA'),
(1055, 'Port Credit', 'ON', 'CA'),
(1056, 'Port Dover', 'ON', 'CA'),
(1057, 'Port Elgin', 'ON', 'CA'),
(1058, 'Port Hope', 'ON', 'CA'),
(1059, 'Port McNicoll', 'ON', 'CA'),
(1060, 'Port Perry', 'ON', 'CA'),
(1061, 'Port Stanley', 'ON', 'CA'),
(1062, 'Port Weller', 'ON', 'CA'),
(1063, 'Powassan', 'ON', 'CA'),
(1064, 'Prescott', 'ON', 'CA'),
(1065, 'Preston', 'ON', 'CA'),
(1066, 'Queenston', 'ON', 'CA'),
(1067, 'Red Lake', 'ON', 'CA'),
(1068, 'Red Rock', 'ON', 'CA'),
(1069, 'Redwater', 'ON', 'CA'),
(1070, 'Renfrew', 'ON', 'CA'),
(1071, 'Rexdale', 'ON', 'CA'),
(1072, 'Richan', 'ON', 'CA'),
(1073, 'Richmond Hill', 'ON', 'CA'),
(1074, 'Ridgetown', 'ON', 'CA'),
(1075, 'River Valley', 'ON', 'CA'),
(1076, 'Roblin', 'ON', 'CA'),
(1077, 'Rockland', 'ON', 'CA'),
(1078, 'Rodney', 'ON', 'CA'),
(1079, 'Rossport', 'ON', 'CA'),
(1080, 'Russell', 'ON', 'CA'),
(1081, 'Saint Catharines', 'ON', 'CA'),
(1082, 'Saint Catherines', 'ON', 'CA'),
(1083, 'Saint Clair Beach', 'ON', 'CA'),
(1084, 'Saint Marys', 'ON', 'CA'),
(1085, 'Saint Thomas', 'ON', 'CA'),
(1086, 'Saint-Charles', 'ON', 'CA'),
(1087, 'Sarnia', 'ON', 'CA'),
(1088, 'Sault Sainte Marie', 'ON', 'CA'),
(1089, 'Scarborough', 'ON', 'CA'),
(1090, 'Scarborough Junction', 'ON', 'CA'),
(1091, 'Scarborough Township', 'ON', 'CA'),
(1092, 'Schreiber', 'ON', 'CA'),
(1093, 'Schumacher', 'ON', 'CA'),
(1094, 'Scotia', 'ON', 'CA'),
(1095, 'Seaforth', 'ON', 'CA'),
(1096, 'Severn Bridge', 'ON', 'CA'),
(1097, 'Sharbot Lake', 'ON', 'CA'),
(1098, 'Shelburne', 'ON', 'CA'),
(1099, 'Simcoe', 'ON', 'CA'),
(1100, 'Sioux Lookout', 'ON', 'CA'),
(1101, 'Smiths Falls', 'ON', 'CA'),
(1102, 'Smithville', 'ON', 'CA'),
(1103, 'Sombra', 'ON', 'CA'),
(1104, 'South Porcupine', 'ON', 'CA'),
(1105, 'South River', 'ON', 'CA'),
(1106, 'Southampton', 'ON', 'CA'),
(1107, 'Spanish', 'ON', 'CA'),
(1108, 'Sparta', 'ON', 'CA'),
(1109, 'Stamford', 'ON', 'CA'),
(1110, 'Stayner', 'ON', 'CA'),
(1111, 'Stirling', 'ON', 'CA'),
(1112, 'Stittsville', 'ON', 'CA'),
(1113, 'Stoney Creek', 'ON', 'CA'),
(1114, 'Stouffville', 'ON', 'CA'),
(1115, 'Stratford', 'ON', 'CA'),
(1116, 'Strathroy', 'ON', 'CA'),
(1117, 'Streetsville', 'ON', 'CA'),
(1118, 'Sturgeon Falls', 'ON', 'CA'),
(1119, 'Sudbury', 'ON', 'CA'),
(1120, 'Sundridge', 'ON', 'CA'),
(1121, 'Swansea', 'ON', 'CA'),
(1122, 'Sydenham', 'ON', 'CA'),
(1123, 'Tavistock', 'ON', 'CA'),
(1124, 'Tecumseh', 'ON', 'CA'),
(1125, 'Teeswater', 'ON', 'CA'),
(1126, 'Terrace Bay', 'ON', 'CA'),
(1127, 'Thedford', 'ON', 'CA'),
(1128, 'Thessalon', 'ON', 'CA'),
(1129, 'Thornbury', 'ON', 'CA'),
(1130, 'Thornhill', 'ON', 'CA'),
(1131, 'Thorold', 'ON', 'CA'),
(1132, 'Thunder Bay', 'ON', 'CA'),
(1133, 'Tichborne', 'ON', 'CA'),
(1134, 'Tilbury', 'ON', 'CA'),
(1135, 'Tillsonburg', 'ON', 'CA'),
(1136, 'Tilsonburg', 'ON', 'CA'),
(1137, 'Timmins', 'ON', 'CA'),
(1138, 'Tiverton', 'ON', 'CA'),
(1139, 'Tobermory', 'ON', 'CA'),
(1140, 'Toronto', 'ON', 'CA'),
(1141, 'Tottenham', 'ON', 'CA'),
(1142, 'Trenton', 'ON', 'CA'),
(1143, 'Tudhope', 'ON', 'CA'),
(1144, 'Tweed', 'ON', 'CA'),
(1145, 'Tyrone', 'ON', 'CA'),
(1146, 'Uxbridge', 'ON', 'CA'),
(1147, 'Vankleek Hill', 'ON', 'CA'),
(1148, 'Verner', 'ON', 'CA'),
(1149, 'Verona', 'ON', 'CA'),
(1150, 'Victoria Harbour', 'ON', 'CA'),
(1151, 'Walkerton', 'ON', 'CA'),
(1152, 'Wallace', 'ON', 'CA'),
(1153, 'Wallaceburg', 'ON', 'CA'),
(1154, 'Warren', 'ON', 'CA'),
(1155, 'Waterdown', 'ON', 'CA'),
(1156, 'Waterford', 'ON', 'CA'),
(1157, 'Waterloo', 'ON', 'CA'),
(1158, 'Watford', 'ON', 'CA'),
(1159, 'Wawa', 'ON', 'CA'),
(1160, 'Webbwood', 'ON', 'CA'),
(1161, 'Welland', 'ON', 'CA'),
(1162, 'Wellington', 'ON', 'CA'),
(1163, 'West Lorne', 'ON', 'CA'),
(1164, 'Weston', 'ON', 'CA'),
(1165, 'Westport', 'ON', 'CA'),
(1166, 'Wheatley', 'ON', 'CA'),
(1167, 'Whitby', 'ON', 'CA'),
(1168, 'Whitchurch-Stouffville', 'ON', 'CA'),
(1169, 'White River', 'ON', 'CA'),
(1170, 'Whitefish', 'ON', 'CA'),
(1171, 'Whitney', 'ON', 'CA'),
(1172, 'Wiarton', 'ON', 'CA'),
(1173, 'Wilberforce', 'ON', 'CA'),
(1174, 'Willowdale', 'ON', 'CA'),
(1175, 'Winchester', 'ON', 'CA'),
(1176, 'Windsor', 'ON', 'CA'),
(1177, 'Wingham', 'ON', 'CA'),
(1178, 'Woodbridge', 'ON', 'CA'),
(1179, 'Wyebridge', 'ON', 'CA'),
(1180, 'Wyoming', 'ON', 'CA'),
(1181, 'Yarker', 'ON', 'CA'),
(1182, 'York', 'ON', 'CA'),
(1183, 'Borden-Carleton', 'PE', 'CA'),
(1184, 'Carleton', 'PE', 'CA'),
(1185, 'Charlottetown', 'PE', 'CA'),
(1186, 'Hunter River', 'PE', 'CA'),
(1187, 'Kensington', 'PE', 'CA'),
(1188, 'Montague', 'PE', 'CA'),
(1189, 'Portage', 'PE', 'CA'),
(1190, 'Rustico', 'PE', 'CA'),
(1191, 'Souris', 'PE', 'CA'),
(1192, 'Summerside', 'PE', 'CA'),
(1193, 'Vernon River', 'PE', 'CA'),
(1194, 'Abord a Plouffe', 'QC', 'CA'),
(1195, 'Acton Vale', 'QC', 'CA'),
(1196, 'Albanel', 'QC', 'CA'),
(1197, 'Alma', 'QC', 'CA'),
(1198, 'Amos', 'QC', 'CA'),
(1199, 'Amqui', 'QC', 'CA'),
(1200, 'Ancienne Lorette', 'QC', 'CA'),
(1201, 'Anjou', 'QC', 'CA'),
(1202, 'Anteuil', 'QC', 'CA'),
(1203, 'Arthabaska', 'QC', 'CA'),
(1204, 'Arvida', 'QC', 'CA'),
(1205, 'Asbestos', 'QC', 'CA'),
(1206, 'Aston Junction', 'QC', 'CA'),
(1207, 'Auteuil', 'QC', 'CA'),
(1208, 'Authier', 'QC', 'CA'),
(1209, 'Ayers Cliff', 'QC', 'CA'),
(1210, 'Aylmer', 'QC', 'CA'),
(1211, 'Bagotville', 'QC', 'CA'),
(1212, 'Baie-Comeau', 'QC', 'CA'),
(1213, 'Baie-d\'Urfe', 'QC', 'CA'),
(1214, 'Baie-Saint-Paul', 'QC', 'CA'),
(1215, 'Barachois', 'QC', 'CA'),
(1216, 'Barraute', 'QC', 'CA'),
(1217, 'Batiscan', 'QC', 'CA'),
(1218, 'Beaconsfield', 'QC', 'CA'),
(1219, 'Beauceville', 'QC', 'CA'),
(1220, 'Beauharnois', 'QC', 'CA'),
(1221, 'Beauport', 'QC', 'CA'),
(1222, 'Beaupre', 'QC', 'CA'),
(1223, 'Beaver', 'QC', 'CA'),
(1224, 'Becancour', 'QC', 'CA'),
(1225, 'Beebe', 'QC', 'CA'),
(1226, 'Beloeil', 'QC', 'CA'),
(1227, 'Berthier', 'QC', 'CA'),
(1228, 'Berthier-sur-Mer', 'QC', 'CA'),
(1229, 'Berthierville', 'QC', 'CA'),
(1230, 'Betsiamites', 'QC', 'CA'),
(1231, 'Bois-des-Filion', 'QC', 'CA'),
(1232, 'Boischatel', 'QC', 'CA'),
(1233, 'Bonaventure', 'QC', 'CA'),
(1234, 'Bromptonville', 'QC', 'CA'),
(1235, 'Brossard', 'QC', 'CA'),
(1236, 'Bryson', 'QC', 'CA'),
(1237, 'Buckingham', 'QC', 'CA'),
(1238, 'Cabano', 'QC', 'CA'),
(1239, 'Cacouna', 'QC', 'CA'),
(1240, 'Candiac', 'QC', 'CA'),
(1241, 'Cap-aux-Meules', 'QC', 'CA'),
(1242, 'Cap-Chat', 'QC', 'CA'),
(1243, 'Cap-de-la-Madeleine', 'QC', 'CA'),
(1244, 'Cap-Rouge', 'QC', 'CA'),
(1245, 'Caughnawaga', 'QC', 'CA'),
(1246, 'Chambly', 'QC', 'CA'),
(1247, 'Chambord', 'QC', 'CA'),
(1248, 'Champlain', 'QC', 'CA'),
(1249, 'Chandler', 'QC', 'CA'),
(1250, 'Chapais', 'QC', 'CA'),
(1251, 'Charlemagne', 'QC', 'CA'),
(1252, 'Charlesbourg', 'QC', 'CA'),
(1253, 'Charny', 'QC', 'CA'),
(1254, 'Chateauguay', 'QC', 'CA'),
(1255, 'Chibougamau', 'QC', 'CA'),
(1256, 'Chicoutimi', 'QC', 'CA'),
(1257, 'Chicoutimi-Nord', 'QC', 'CA'),
(1258, 'Chomedey', 'QC', 'CA'),
(1259, 'Chute-aux-Outardes', 'QC', 'CA'),
(1260, 'Chute-Shipshaw', 'QC', 'CA'),
(1261, 'Clericy', 'QC', 'CA'),
(1262, 'Clermont', 'QC', 'CA'),
(1263, 'Coaticook', 'QC', 'CA'),
(1264, 'Contrecoeur', 'QC', 'CA'),
(1265, 'Cookshire', 'QC', 'CA'),
(1266, 'Cote-Saint-Luc', 'QC', 'CA'),
(1267, 'Cowansville', 'QC', 'CA'),
(1268, 'Crabtree', 'QC', 'CA'),
(1269, 'Danville', 'QC', 'CA'),
(1270, 'De Lery', 'QC', 'CA'),
(1271, 'Delson', 'QC', 'CA'),
(1272, 'Derval', 'QC', 'CA'),
(1273, 'Desbiens', 'QC', 'CA'),
(1274, 'Deschambault', 'QC', 'CA'),
(1275, 'Deux-Montagnes', 'QC', 'CA'),
(1276, 'Disraeli', 'QC', 'CA'),
(1277, 'Dolbeau', 'QC', 'CA'),
(1278, 'Dollard-des-Ormeaux', 'QC', 'CA'),
(1279, 'Donnacona', 'QC', 'CA'),
(1280, 'Dorion', 'QC', 'CA'),
(1281, 'Dorion-Vaudreuil', 'QC', 'CA'),
(1282, 'Dorval', 'QC', 'CA'),
(1283, 'Drummondville', 'QC', 'CA'),
(1284, 'Dubuisson', 'QC', 'CA'),
(1285, 'Duvernay', 'QC', 'CA'),
(1286, 'East Angus', 'QC', 'CA'),
(1287, 'Eastmain', 'QC', 'CA'),
(1288, 'Eastman', 'QC', 'CA'),
(1289, 'Etang-du-Nord', 'QC', 'CA'),
(1290, 'Fabreville', 'QC', 'CA'),
(1291, 'Farnham', 'QC', 'CA'),
(1292, 'Ferme-Neuve', 'QC', 'CA'),
(1293, 'Forestville', 'QC', 'CA'),
(1294, 'Gaspe', 'QC', 'CA'),
(1295, 'Gatineau', 'QC', 'CA'),
(1296, 'Godbout', 'QC', 'CA'),
(1297, 'Granby', 'QC', 'CA'),
(1298, 'Grande-Riviere', 'QC', 'CA'),
(1299, 'Greenfield Park', 'QC', 'CA'),
(1300, 'Grosses-Roches', 'QC', 'CA'),
(1301, 'Guigues', 'QC', 'CA'),
(1302, 'Hebertville', 'QC', 'CA'),
(1303, 'Hemmingford', 'QC', 'CA'),
(1304, 'Hudson', 'QC', 'CA'),
(1305, 'Hudson Heights', 'QC', 'CA'),
(1306, 'Hull', 'QC', 'CA'),
(1307, 'Huntingdon', 'QC', 'CA'),
(1308, 'Iberville', 'QC', 'CA'),
(1309, 'Ile-Perrot', 'QC', 'CA'),
(1310, 'Jacques-Cartier', 'QC', 'CA'),
(1311, 'Joliette', 'QC', 'CA'),
(1312, 'Jonquiere', 'QC', 'CA'),
(1313, 'Knowlton', 'QC', 'CA'),
(1314, 'Kuujjuaq', 'QC', 'CA'),
(1315, 'L\'Assomption', 'QC', 'CA'),
(1316, 'L\'Epiphanie', 'QC', 'CA'),
(1317, 'La Baie', 'QC', 'CA'),
(1318, 'La Guadeloupe', 'QC', 'CA'),
(1319, 'La Macaza', 'QC', 'CA'),
(1320, 'La Malbaie', 'QC', 'CA'),
(1321, 'La Salle', 'QC', 'CA'),
(1322, 'La Sarre', 'QC', 'CA'),
(1323, 'La Tuque', 'QC', 'CA'),
(1324, 'Labelle', 'QC', 'CA'),
(1325, 'Lac-Megantic', 'QC', 'CA'),
(1326, 'Lachine', 'QC', 'CA'),
(1327, 'Lachute', 'QC', 'CA'),
(1328, 'Lacolle', 'QC', 'CA'),
(1329, 'Lafontaine', 'QC', 'CA'),
(1330, 'Lanoraie', 'QC', 'CA'),
(1331, 'Laprairie', 'QC', 'CA'),
(1332, 'Laurentides', 'QC', 'CA'),
(1333, 'Lauzon', 'QC', 'CA'),
(1334, 'Laval', 'QC', 'CA'),
(1335, 'Laval-des-Rapides', 'QC', 'CA'),
(1336, 'Laval-Ouest', 'QC', 'CA'),
(1337, 'Lavaltrie', 'QC', 'CA'),
(1338, 'Lennoxville', 'QC', 'CA'),
(1339, 'Lery', 'QC', 'CA'),
(1340, 'Les Escoumins', 'QC', 'CA'),
(1341, 'Levis', 'QC', 'CA'),
(1342, 'Liniere', 'QC', 'CA'),
(1343, 'Longueuil', 'QC', 'CA'),
(1344, 'Loretteville', 'QC', 'CA'),
(1345, 'Louiseville', 'QC', 'CA'),
(1346, 'Luceville', 'QC', 'CA'),
(1347, 'Luskville', 'QC', 'CA'),
(1348, 'Lyster', 'QC', 'CA'),
(1349, 'Macamic', 'QC', 'CA'),
(1350, 'Magog', 'QC', 'CA'),
(1351, 'Magpie', 'QC', 'CA'),
(1352, 'Malartic', 'QC', 'CA'),
(1353, 'Maniwaki', 'QC', 'CA'),
(1354, 'Manseau', 'QC', 'CA'),
(1355, 'Maple Grove', 'QC', 'CA'),
(1356, 'Marieville', 'QC', 'CA'),
(1357, 'Masson', 'QC', 'CA'),
(1358, 'Matagami', 'QC', 'CA'),
(1359, 'Matane', 'QC', 'CA'),
(1360, 'Mauricie', 'QC', 'CA'),
(1361, 'McMasterville', 'QC', 'CA'),
(1362, 'McWatters', 'QC', 'CA'),
(1363, 'Melocheville', 'QC', 'CA'),
(1364, 'Metabetchouan', 'QC', 'CA'),
(1365, 'Millstream', 'QC', 'CA'),
(1366, 'Mirabel', 'QC', 'CA'),
(1367, 'Mont-Apica', 'QC', 'CA'),
(1368, 'Mont-Joli', 'QC', 'CA'),
(1369, 'Mont-Laurier', 'QC', 'CA'),
(1370, 'Mont-Royal', 'QC', 'CA'),
(1371, 'Mont-Saint-Hilaire', 'QC', 'CA'),
(1372, 'Mont-Tremblant', 'QC', 'CA'),
(1373, 'Montebello', 'QC', 'CA'),
(1374, 'Montmagny', 'QC', 'CA'),
(1375, 'Montreal', 'QC', 'CA'),
(1376, 'Montreal-Est', 'QC', 'CA'),
(1377, 'Montreal-Nord', 'QC', 'CA'),
(1378, 'Mount-Royal', 'QC', 'CA'),
(1379, 'Murdochville', 'QC', 'CA'),
(1380, 'Napierville', 'QC', 'CA'),
(1381, 'Natashquan', 'QC', 'CA'),
(1382, 'Neuville', 'QC', 'CA'),
(1383, 'New Richmond', 'QC', 'CA'),
(1384, 'Nicolet', 'QC', 'CA'),
(1385, 'Noranda', 'QC', 'CA'),
(1386, 'Normandin', 'QC', 'CA'),
(1387, 'Notre-Dame-des-Monts', 'QC', 'CA'),
(1388, 'Notre-Dame-du-Lac', 'QC', 'CA'),
(1389, 'Notre-Dame-du-Laus', 'QC', 'CA'),
(1390, 'Notre-Dame-du-Nord', 'QC', 'CA'),
(1391, 'Omerville', 'QC', 'CA'),
(1392, 'Ormstown', 'QC', 'CA'),
(1393, 'Otterburn Park', 'QC', 'CA'),
(1394, 'Outremont', 'QC', 'CA'),
(1395, 'Papineauville', 'QC', 'CA'),
(1396, 'Parent', 'QC', 'CA'),
(1397, 'Pierrefonds', 'QC', 'CA'),
(1398, 'Pierreville', 'QC', 'CA'),
(1399, 'Pincourt', 'QC', 'CA'),
(1400, 'Plessisville', 'QC', 'CA'),
(1401, 'Point Claire', 'QC', 'CA'),
(1402, 'Pointe-aux-Trembles', 'QC', 'CA'),
(1403, 'Pointe-Calumet', 'QC', 'CA'),
(1404, 'Pointe-Claire', 'QC', 'CA'),
(1405, 'Pointe-Lebel', 'QC', 'CA'),
(1406, 'Pont-Rouge', 'QC', 'CA'),
(1407, 'Port-Cartier', 'QC', 'CA'),
(1408, 'Portneuf', 'QC', 'CA'),
(1409, 'Price', 'QC', 'CA'),
(1410, 'Princeville', 'QC', 'CA'),
(1411, 'Puvirnituq', 'QC', 'CA'),
(1412, 'Rawdon', 'QC', 'CA'),
(1413, 'Repentigny', 'QC', 'CA'),
(1414, 'Richelieu', 'QC', 'CA'),
(1415, 'Rigaud', 'QC', 'CA'),
(1416, 'Rimouski', 'QC', 'CA'),
(1417, 'Ripon', 'QC', 'CA'),
(1418, 'Riviere-des-Prairies', 'QC', 'CA'),
(1419, 'Riviere-du-Loup', 'QC', 'CA'),
(1420, 'Riviere-Pigou', 'QC', 'CA'),
(1421, 'Roberval', 'QC', 'CA'),
(1422, 'Rosemere', 'QC', 'CA'),
(1423, 'Rouyn', 'QC', 'CA'),
(1424, 'Roxboro', 'QC', 'CA'),
(1425, 'Sacre-Coeur', 'QC', 'CA'),
(1426, 'Saint Antoine', 'QC', 'CA'),
(1427, 'Saint Bruno', 'QC', 'CA'),
(1428, 'Saint Georges De Beauce', 'QC', 'CA'),
(1429, 'Saint Guillaume', 'QC', 'CA'),
(1430, 'Saint Isidore', 'QC', 'CA'),
(1431, 'Saint Leonard', 'QC', 'CA'),
(1432, 'Saint-Agapit', 'QC', 'CA'),
(1433, 'Saint-Ambroise', 'QC', 'CA'),
(1434, 'Saint-Anselme', 'QC', 'CA'),
(1435, 'Saint-Augustin', 'QC', 'CA'),
(1436, 'Saint-Basile', 'QC', 'CA'),
(1437, 'Saint-Bruno-de-Montarville', 'QC', 'CA'),
(1438, 'Saint-Cesaire', 'QC', 'CA'),
(1439, 'Saint-Denis', 'QC', 'CA'),
(1440, 'Saint-Eustache', 'QC', 'CA'),
(1441, 'Saint-Fabien', 'QC', 'CA'),
(1442, 'Saint-Felicien', 'QC', 'CA'),
(1443, 'Saint-Felix-de-Valois', 'QC', 'CA'),
(1444, 'Saint-Francois', 'QC', 'CA'),
(1445, 'Saint-Gabriel', 'QC', 'CA'),
(1446, 'Saint-Gedeon', 'QC', 'CA'),
(1447, 'Saint-Georges', 'QC', 'CA'),
(1448, 'Saint-Germain-de-Grantham', 'QC', 'CA'),
(1449, 'Saint-Henri-de-Levis', 'QC', 'CA'),
(1450, 'Saint-Henri-de-Taillon', 'QC', 'CA'),
(1451, 'Saint-Hilaire', 'QC', 'CA'),
(1452, 'Saint-Honore', 'QC', 'CA'),
(1453, 'Saint-Hubert', 'QC', 'CA'),
(1454, 'Saint-Hyacinthe', 'QC', 'CA'),
(1455, 'Saint-Jacques', 'QC', 'CA'),
(1456, 'Saint-Jean', 'QC', 'CA'),
(1457, 'Saint-Jean-Eudes', 'QC', 'CA'),
(1458, 'Saint-Jerome', 'QC', 'CA'),
(1459, 'Saint-Joseph-de-Beauce', 'QC', 'CA'),
(1460, 'Saint-Joseph-de-Kamouraska', 'QC', 'CA'),
(1461, 'Saint-Jovite', 'QC', 'CA'),
(1462, 'Saint-Lambert', 'QC', 'CA'),
(1463, 'Saint-Lambert-Chambly', 'QC', 'CA'),
(1464, 'Saint-Laurent', 'QC', 'CA'),
(1465, 'Saint-Lazare', 'QC', 'CA'),
(1466, 'Saint-Leonard', 'QC', 'CA'),
(1467, 'Saint-Malo', 'QC', 'CA'),
(1468, 'Saint-Marc-des-Carrieres', 'QC', 'CA'),
(1469, 'Saint-Michel-des-Saints', 'QC', 'CA'),
(1470, 'Saint-Nicolas', 'QC', 'CA'),
(1471, 'Saint-Pascal', 'QC', 'CA'),
(1472, 'Saint-Pie', 'QC', 'CA'),
(1473, 'Saint-Prosper', 'QC', 'CA'),
(1474, 'Saint-Raphael', 'QC', 'CA'),
(1475, 'Saint-Raymond', 'QC', 'CA'),
(1476, 'Saint-Remi', 'QC', 'CA'),
(1477, 'Saint-Roch-de-Richelieu', 'QC', 'CA'),
(1478, 'Saint-Romuald', 'QC', 'CA'),
(1479, 'Saint-Sauveur', 'QC', 'CA'),
(1480, 'Saint-Sauveur-des-Monts', 'QC', 'CA'),
(1481, 'Saint-Stanislas-de-Kostka', 'QC', 'CA'),
(1482, 'Saint-Tite', 'QC', 'CA'),
(1483, 'Saint-Tite-des-Caps', 'QC', 'CA'),
(1484, 'Saint-Vallier', 'QC', 'CA'),
(1485, 'Saint-Vincent-de-Paul', 'QC', 'CA'),
(1486, 'Saint-Zotique', 'QC', 'CA'),
(1487, 'Sainte-Adele', 'QC', 'CA'),
(1488, 'Sainte-Agathe', 'QC', 'CA'),
(1489, 'Sainte-Agathe-des-Monts', 'QC', 'CA'),
(1490, 'Sainte-Anne-de-Beaupre', 'QC', 'CA'),
(1491, 'Sainte-Anne-de-Bellevue', 'QC', 'CA'),
(1492, 'Sainte-Anne-des-Monts', 'QC', 'CA'),
(1493, 'Sainte-Catherine', 'QC', 'CA'),
(1494, 'Sainte-Cecile-de-Masham', 'QC', 'CA'),
(1495, 'Sainte-Claire', 'QC', 'CA'),
(1496, 'Sainte-Dorothee', 'QC', 'CA'),
(1497, 'Sainte-Foy', 'QC', 'CA'),
(1498, 'Sainte-Genevieve-de-Batiscan', 'QC', 'CA'),
(1499, 'Sainte-Julienne', 'QC', 'CA'),
(1500, 'Sainte-Marie', 'QC', 'CA'),
(1501, 'Sainte-Martine', 'QC', 'CA'),
(1502, 'Sainte-Rose', 'QC', 'CA'),
(1503, 'Sainte-Therese', 'QC', 'CA'),
(1504, 'Sainte-Therese-de-Blainville', 'QC', 'CA'),
(1505, 'Salaberry-de-Valleyfield', 'QC', 'CA'),
(1506, 'Sayabec', 'QC', 'CA'),
(1507, 'Senneterre', 'QC', 'CA'),
(1508, 'Senneville', 'QC', 'CA'),
(1509, 'Sept-Iles', 'QC', 'CA'),
(1510, 'Shawinigan', 'QC', 'CA'),
(1511, 'Shawinigan-Sud', 'QC', 'CA'),
(1512, 'Shawville', 'QC', 'CA'),
(1513, 'Shefford', 'QC', 'CA'),
(1514, 'Sheldrake', 'QC', 'CA'),
(1515, 'Sherbrook', 'QC', 'CA'),
(1516, 'Sherbrooke', 'QC', 'CA'),
(1517, 'Shipshaw', 'QC', 'CA'),
(1518, 'Sillery', 'QC', 'CA'),
(1519, 'Sorel', 'QC', 'CA'),
(1520, 'Stanstead', 'QC', 'CA'),
(1521, 'Stoneham', 'QC', 'CA'),
(1522, 'Sutton', 'QC', 'CA'),
(1523, 'Tadoussac', 'QC', 'CA'),
(1524, 'Taschereau', 'QC', 'CA'),
(1525, 'Temiscaming', 'QC', 'CA'),
(1526, 'Templeton', 'QC', 'CA'),
(1527, 'Terrebonne', 'QC', 'CA'),
(1528, 'Thetford Mines', 'QC', 'CA'),
(1529, 'Thurso', 'QC', 'CA'),
(1530, 'Tracy', 'QC', 'CA'),
(1531, 'Trois-Pistoles', 'QC', 'CA'),
(1532, 'Trois-Rivieres', 'QC', 'CA'),
(1533, 'Val-Barrette', 'QC', 'CA'),
(1534, 'Val-d\'Or', 'QC', 'CA'),
(1535, 'Val-David', 'QC', 'CA'),
(1536, 'Valcourt', 'QC', 'CA'),
(1537, 'Vallee-Jonction', 'QC', 'CA'),
(1538, 'Valleyfield', 'QC', 'CA'),
(1539, 'Varennes', 'QC', 'CA'),
(1540, 'Vaudreuil', 'QC', 'CA'),
(1541, 'Vercheres', 'QC', 'CA'),
(1542, 'Verdun', 'QC', 'CA'),
(1543, 'Victoriaville', 'QC', 'CA'),
(1544, 'Ville-Marie', 'QC', 'CA'),
(1545, 'Wakefield', 'QC', 'CA'),
(1546, 'Warwick', 'QC', 'CA'),
(1547, 'Waswanipi', 'QC', 'CA'),
(1548, 'Waterville', 'QC', 'CA'),
(1549, 'Weedon', 'QC', 'CA'),
(1550, 'Westmount', 'QC', 'CA'),
(1551, 'Yamachiche', 'QC', 'CA'),
(1552, 'Yamaska', 'QC', 'CA'),
(1553, 'Aberdeen', 'SK', 'CA'),
(1554, 'Allan', 'SK', 'CA'),
(1555, 'Arborfield', 'SK', 'CA'),
(1556, 'Arcola', 'SK', 'CA'),
(1557, 'Asquith', 'SK', 'CA'),
(1558, 'Assiniboia', 'SK', 'CA'),
(1559, 'Avonlea', 'SK', 'CA'),
(1560, 'Big River', 'SK', 'CA'),
(1561, 'Biggar', 'SK', 'CA'),
(1562, 'Birsay', 'SK', 'CA'),
(1563, 'Blaine Lake', 'SK', 'CA'),
(1564, 'Brancepeth', 'SK', 'CA'),
(1565, 'Broderick', 'SK', 'CA'),
(1566, 'Bruno', 'SK', 'CA'),
(1567, 'Buffalo Narrows', 'SK', 'CA'),
(1568, 'Cabri', 'SK', 'CA'),
(1569, 'Canoe Narrows', 'SK', 'CA'),
(1570, 'Canora', 'SK', 'CA'),
(1571, 'Carlyle', 'SK', 'CA'),
(1572, 'Carnduff', 'SK', 'CA'),
(1573, 'Caronport', 'SK', 'CA'),
(1574, 'Carrot River', 'SK', 'CA'),
(1575, 'Chamberlain', 'SK', 'CA'),
(1576, 'Chaplin', 'SK', 'CA'),
(1577, 'Clair', 'SK', 'CA'),
(1578, 'Coderre', 'SK', 'CA'),
(1579, 'Colonsay', 'SK', 'CA'),
(1580, 'Cote', 'SK', 'CA'),
(1581, 'Crooked River', 'SK', 'CA'),
(1582, 'Cumberland House', 'SK', 'CA'),
(1583, 'Cut Knife', 'SK', 'CA'),
(1584, 'Dalmeny', 'SK', 'CA'),
(1585, 'Denare Beach', 'SK', 'CA'),
(1586, 'Dillon', 'SK', 'CA'),
(1587, 'Dinsmore', 'SK', 'CA'),
(1588, 'Dodsland', 'SK', 'CA'),
(1589, 'Domremy', 'SK', 'CA'),
(1590, 'Dorintosh', 'SK', 'CA'),
(1591, 'Duck Lake', 'SK', 'CA'),
(1592, 'Dundurn', 'SK', 'CA'),
(1593, 'Dunfermline', 'SK', 'CA'),
(1594, 'Edam', 'SK', 'CA'),
(1595, 'Elbow', 'SK', 'CA'),
(1596, 'Esterhazy', 'SK', 'CA'),
(1597, 'Estevan', 'SK', 'CA'),
(1598, 'Eston', 'SK', 'CA'),
(1599, 'Fielding', 'SK', 'CA'),
(1600, 'Foam Lake', 'SK', 'CA'),
(1601, 'Fort Qu\'Appelle', 'SK', 'CA'),
(1602, 'Fox Valley', 'SK', 'CA'),
(1603, 'Govan', 'SK', 'CA'),
(1604, 'Gravelbourg', 'SK', 'CA'),
(1605, 'Grenfell', 'SK', 'CA'),
(1606, 'Griffin', 'SK', 'CA'),
(1607, 'Gull Lake', 'SK', 'CA'),
(1608, 'Hafford', 'SK', 'CA'),
(1609, 'Hague', 'SK', 'CA'),
(1610, 'Hanley', 'SK', 'CA'),
(1611, 'Herschel', 'SK', 'CA'),
(1612, 'Hudson Bay', 'SK', 'CA'),
(1613, 'Humboldt', 'SK', 'CA'),
(1614, 'Ile-a-la-Crosse', 'SK', 'CA'),
(1615, 'Indian Head', 'SK', 'CA'),
(1616, 'Kamsack', 'SK', 'CA'),
(1617, 'Kelvington', 'SK', 'CA'),
(1618, 'Kennedy', 'SK', 'CA'),
(1619, 'Kerrobert', 'SK', 'CA'),
(1620, 'Kindersley', 'SK', 'CA'),
(1621, 'Kinistino', 'SK', 'CA'),
(1622, 'La Ronge', 'SK', 'CA'),
(1623, 'Lampman', 'SK', 'CA'),
(1624, 'Lang', 'SK', 'CA');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(111) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` int(11) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon_customer`
--

CREATE TABLE `coupon_customer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `redemption_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_delivery_address`
--

CREATE TABLE `customer_delivery_address` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `address` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `postal` varchar(111) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_location`
--

CREATE TABLE `customer_location` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_orders`
--

CREATE TABLE `customer_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `is_ready` int(11) NOT NULL,
  `is_delivered` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  `tax` float NOT NULL,
  `total` float NOT NULL,
  `delivery_img` mediumtext NOT NULL,
  `delivered_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customer_orders`
--

INSERT INTO `customer_orders` (`id`, `user_id`, `vendor_id`, `package_id`, `created_date`, `is_ready`, `is_delivered`, `subtotal`, `tax`, `total`, `delivery_img`, `delivered_time`) VALUES
(1, 1, 1, 14, '2023-10-25 14:52:56', 1, 1, 23, 1.2, 25, 'http://delivery.com/image.jpg', '2023-10-26 10:52:55'),
(2, 0, 0, 0, '2023-10-25 14:52:56', 0, 0, 0, 0, 0, '', '2023-10-25 14:52:56'),
(3, 1, 1, 0, '2023-12-14 00:00:00', 0, 0, 0, 0, 10, '', '0000-00-00 00:00:00'),
(4, 1, 1, 0, '2023-12-14 00:00:00', 0, 0, 0, 0, 10, '', '0000-00-00 00:00:00'),
(5, 1, 1, 0, '2023-12-14 00:00:00', 0, 0, 0, 0, 10, '', '0000-00-00 00:00:00'),
(6, 1, 1, 0, '2023-12-14 00:00:00', 0, 0, 0, 0, 10, '', '0000-00-00 00:00:00'),
(9, 1, 1, 14, '2023-12-14 14:14:45', 0, 0, 0, 0, 10, '', '2023-12-16 01:45:00'),
(10, 1, 1, 14, '2023-12-15 13:40:53', 0, 0, 0, 0, 10, '', '2023-12-16 01:45:00'),
(11, 1, 1, 14, '2023-12-15 13:40:53', 0, 0, 0, 0, 110, '', '2023-12-17 01:45:00'),
(12, 1, 1, 14, '2023-12-15 13:40:53', 0, 0, 0, 0, 110, '', '2023-12-20 01:45:00'),
(13, 1, 1, 14, '2023-12-15 13:40:53', 0, 0, 0, 0, 110, '', '2023-12-18 01:45:00'),
(14, 1, 1, 14, '2023-12-15 13:40:53', 0, 0, 0, 0, 110, '', '2023-12-16 01:45:00'),
(15, 1, 1, 14, '2023-12-15 13:40:53', 0, 0, 0, 0, 110, '', '2023-12-19 01:45:00'),
(16, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 10, '', '2023-12-16 01:45:00'),
(17, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 110, '', '2023-12-17 01:45:00'),
(18, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 110, '', '2023-12-19 01:45:00'),
(19, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 110, '', '2023-12-20 01:45:00'),
(20, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 110, '', '2023-12-16 01:45:00'),
(21, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 110, '', '2023-12-17 01:45:00'),
(22, 4, 1, 14, '2023-12-15 13:56:20', 0, 0, 0, 0, 110, '', '2023-12-18 01:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_items`
--

CREATE TABLE `customer_order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customer_order_items`
--

INSERT INTO `customer_order_items` (`id`, `order_id`, `item_id`) VALUES
(1, 9, 36),
(2, 9, 4),
(3, 9, 31),
(4, 9, 29),
(5, 10, 36),
(6, 10, 4),
(7, 10, 31),
(8, 10, 29),
(9, 11, 36),
(10, 11, 31),
(11, 11, 29),
(12, 12, 36),
(13, 11, 4),
(14, 12, 4),
(15, 12, 31),
(16, 12, 29),
(17, 13, 36),
(18, 13, 4),
(19, 13, 31),
(20, 13, 29),
(21, 14, 36),
(22, 14, 4),
(23, 14, 31),
(24, 14, 29),
(25, 15, 36),
(26, 15, 4),
(27, 15, 31),
(28, 15, 29),
(29, 16, 36),
(30, 16, 4),
(31, 16, 31),
(32, 16, 29),
(33, 17, 4),
(34, 17, 31),
(35, 17, 36),
(36, 17, 29),
(37, 18, 36),
(38, 18, 4),
(39, 18, 31),
(40, 18, 29),
(41, 19, 36),
(42, 19, 4),
(43, 19, 31),
(44, 19, 29),
(45, 20, 36),
(46, 20, 4),
(47, 20, 31),
(48, 20, 29),
(49, 21, 36),
(50, 21, 4),
(51, 21, 31),
(52, 21, 29),
(53, 22, 36),
(54, 22, 4),
(55, 22, 31),
(56, 22, 29),
(57, 23, 36),
(58, 23, 4),
(59, 23, 31),
(60, 23, 29),
(61, 24, 36),
(62, 24, 4),
(63, 24, 31),
(64, 24, 29),
(65, 25, 36),
(66, 25, 4),
(67, 25, 31),
(68, 25, 29),
(69, 26, 36),
(70, 26, 4),
(71, 26, 31),
(72, 26, 29);

-- --------------------------------------------------------

--
-- Table structure for table `customer_package`
--

CREATE TABLE `customer_package` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `payment_status` int(11) NOT NULL COMMENT '0=unpaid,1=paid',
  `frequency` varchar(255) NOT NULL,
  `user_package_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customer_package`
--

INSERT INTO `customer_package` (`id`, `user_id`, `package_id`, `payment_status`, `frequency`, `user_package_name`, `quantity`, `created_date`, `start_date`, `end_date`) VALUES
(29, 1, 14, 0, 'daily', 'hbhbhbh', 1, '2023-12-14 00:00:00', '2023-12-14 14:10:09', '2023-12-14 14:10:09'),
(30, 1, 14, 0, 'weekly', 'test package', 3, '2023-12-17 00:00:00', '2023-12-15 13:40:50', '2023-12-15 13:40:50'),
(31, 4, 14, 0, 'weekly', 'test package 2', 2, '2023-12-17 00:00:00', '2023-12-15 13:56:18', '2023-12-15 13:56:18'),
(32, 27, 22, 1, 'daily', '', 1, '2024-01-01 19:00:00', '2023-12-29 16:03:23', '2023-12-29 16:03:23'),
(33, 28, 21, 0, 'daily', '', 1, '2024-01-04 19:00:00', '2023-12-29 17:07:46', '2023-12-29 17:07:46'),
(34, 29, 14, 0, 'daily', '', 1, '2023-12-11 19:00:00', '2023-12-29 20:15:10', '2023-12-29 20:15:10');

-- --------------------------------------------------------

--
-- Table structure for table `customer_package_delivery_address`
--

CREATE TABLE `customer_package_delivery_address` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `delivery_address_id` int(11) NOT NULL COMMENT 'customer_delivery_address table',
  `delivery_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customer_package_delivery_address`
--

INSERT INTO `customer_package_delivery_address` (`id`, `customer_id`, `package_id`, `delivery_address_id`, `delivery_address`) VALUES
(1, 1, 1, 1, '240 Main Street, Toronto, Onta'),
(2, 1, 2, 2, '123 King Street, Toronto, Ontari');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `method_name` varchar(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `method_name`) VALUES
(1, 'Interac'),
(2, 'Credit Card');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `package_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `package_name`, `package_cost`) VALUES
(1, 'Red Plan', 150),
(2, 'Blue Plan', 180),
(3, 'Bronze Plan', 200),
(4, 'Silver Plan', 230),
(5, 'Gold Plan', 250);

-- --------------------------------------------------------

--
-- Table structure for table `review_factors`
--

CREATE TABLE `review_factors` (
  `id` int(11) NOT NULL,
  `review_factor` text NOT NULL,
  `review_factor_description` text NOT NULL,
  `rating_max` int(11) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `review_factors`
--

INSERT INTO `review_factors` (`id`, `review_factor`, `review_factor_description`, `rating_max`) VALUES
(1, 'Timeliness', 'Does the food delivered within the time window?', 5),
(2, 'Food Quality', 'Was the food of good quality?', 5);

-- --------------------------------------------------------

--
-- Table structure for table `review_factor_user`
--

CREATE TABLE `review_factor_user` (
  `id` int(11) NOT NULL,
  `review_user_id` int(11) NOT NULL COMMENT 'Connects to ''id'' column of review_user table',
  `review_factor_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `rating_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `review_factor_user`
--

INSERT INTO `review_factor_user` (`id`, `review_user_id`, `review_factor_id`, `rating`, `rating_max`) VALUES
(1, 1, 1, 4, 5),
(2, 2, 2, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `review_user`
--

CREATE TABLE `review_user` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` text NOT NULL,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `review_user`
--

INSERT INTO `review_user` (`id`, `user_id`, `review`, `created_date`) VALUES
(1, 1, 'Food King has amazing food. Would definitely order again when possible.', '2023-10-24 08:20:21'),
(2, 2, 'Good food. I would definitely order again when I need but we enjoyed it.', '2023-10-24 10:49:31');

-- --------------------------------------------------------

--
-- Table structure for table `user_customer`
--

CREATE TABLE `user_customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(111) NOT NULL,
  `last_name` varchar(111) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `address_1` text NOT NULL,
  `address_2` text DEFAULT NULL,
  `delivery_instruction` text NOT NULL,
  `postal_code` varchar(256) NOT NULL,
  `created_date` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `city_id` int(11) NOT NULL COMMENT 'post ''id'' from cities_active table',
  `verification_code` int(11) NOT NULL,
  `verification_pin` int(11) NOT NULL,
  `last_login` datetime NOT NULL,
  `last_order` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_customer`
--

INSERT INTO `user_customer` (`id`, `first_name`, `last_name`, `password`, `email`, `phone`, `address_1`, `address_2`, `delivery_instruction`, `postal_code`, `created_date`, `status`, `city_id`, `verification_code`, `verification_pin`, `last_login`, `last_order`, `vendor_id`) VALUES
(1, 'customer', 'user', 'c06db68e819be6ec3d26c6038d8e8d1f', 'user@mail.com', '1231231234', 'test', 'test', '', '021', '2023-11-24 14:51:57', 1, 1, 0, 0, '0000-00-00 00:00:00', 1, 1),
(2, 'nknknknj', 'nkjnkjn', NULL, 'njnnjnjnjkn', '1222333333', 'nnkjnjn', NULL, '', 'kjnkjnknn', '2023-11-28 17:35:58', 1, 1, 0, 0, '2023-11-28 17:35:58', 1, 2),
(3, 'njnnnj', 'jnjnjj', 'cc03e747a6afbbcbf8be7668acfebee5', 'admin@mail.com', '555666777', 'nnkjnjknkjnkjnkj', NULL, 'nnkjnkjnkjn', 'njjnjn', '2023-12-09 12:40:31', 1, 1, 0, 0, '2023-12-09 12:40:31', 1, 1),
(4, 'njnjnj', 'njnjnj', 'c06db68e819be6ec3d26c6038d8e8d1f', 'testuser@mail.com', '12121212', 'nnjnjnjnjn', NULL, '', '4re44', '2023-12-12 14:30:21', 0, 1, 0, 0, '2023-12-12 14:30:21', 1, 1),
(5, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 19:56:59', 0, 1, 0, 0, '2023-12-23 19:56:59', 1, 1),
(6, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 19:58:55', 0, 1, 0, 0, '2023-12-23 19:58:55', 1, 1),
(7, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 19:59:50', 0, 1, 0, 0, '2023-12-23 19:59:50', 1, 1),
(8, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:05:47', 0, 1, 0, 0, '2023-12-23 20:05:47', 1, 1),
(9, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:07:07', 0, 1, 0, 0, '2023-12-23 20:07:07', 1, 1),
(10, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:11:02', 0, 1, 0, 0, '2023-12-23 20:11:02', 1, 1),
(11, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:12:19', 0, 1, 0, 0, '2023-12-23 20:12:19', 1, 1),
(12, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:26:14', 0, 1, 0, 0, '2023-12-23 20:26:14', 1, 1),
(13, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:28:37', 0, 1, 0, 0, '2023-12-23 20:28:37', 1, 1),
(14, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:51:28', 0, 1, 0, 0, '2023-12-23 20:51:28', 1, 1),
(15, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 20:59:01', 0, 1, 0, 0, '2023-12-23 20:59:01', 1, 1),
(16, 'test', 'test ueser', NULL, 'saad@mail.com', '923459637337', 'njnjnjn', NULL, '', 'ter45', '2023-12-23 21:00:23', 0, 1, 0, 0, '2023-12-23 21:00:23', 1, 1),
(17, 'hbhbhbh', 'hbhbhbh', NULL, 'user2@mail.com', '232322333', 'jnnkjn', NULL, '', 'nknkjn', '2023-12-24 14:45:56', 0, 1, 0, 0, '2023-12-24 14:45:56', 1, 1),
(18, 'Darryl', 'Wolf', NULL, 'ahmad.saad.khn@gmail.com', '1212121112', 'Provident eaque omn', NULL, '', 'Dolor velit minus et', '2023-12-24 15:29:35', 0, 1, 0, 0, '2023-12-24 15:29:35', 1, 1),
(21, 'Hamish', 'Downs', 'c06db68e819be6ec3d26c6038d8e8d1f', 'ahmad.saad.khn@gmail.com', '76767676', 'Laboris eu corrupti', NULL, '', 'Qui est deleniti tem', '2023-12-24 15:49:26', 2, 1, 39902117, 8270, '2023-12-24 15:49:26', 1, 1),
(22, 'Guy', 'Harding', NULL, 'horawiwuda@mailinator.com', '5556667', 'Quo nulla eveniet i', NULL, '', 'Quod nemo cum eaque ', '2023-12-29 15:20:02', 0, 1, 30423073, 0, '2023-12-29 15:20:02', 1, 1),
(23, 'Maggy', 'Burton', NULL, 'coqazegy@mailinator.com', '1231231234567', 'Labore ea deleniti a', NULL, '', 'Aut fugiat dolores a', '2023-12-29 15:55:22', 0, 1, 0, 0, '2023-12-29 15:55:22', 1, 1),
(24, 'Maggy', 'Burton', NULL, 'coqazegy@mailinator.com', '1231231234567', 'Labore ea deleniti a', NULL, '', 'Aut fugiat dolores a', '2023-12-29 15:57:52', 0, 1, 0, 0, '2023-12-29 15:57:52', 1, 1),
(25, 'Dane', 'Leon', NULL, 'hycozy@mailinator.com', '545456655', 'Voluptatum laboriosa', NULL, '', 'Adipisci sint optio', '2023-12-29 15:59:01', 0, 1, 0, 0, '2023-12-29 15:59:01', 1, 1),
(26, 'Ralph', 'Hebert', NULL, 'ryza@mailinator.com', '5555555', 'Quisquam minima comm', NULL, '', 'A amet ipsa elit ', '2023-12-29 16:00:15', 0, 1, 0, 0, '2023-12-29 16:00:15', 1, 1),
(27, 'Ralph', 'Hebert', NULL, 'ryza@mailinator.com', '5555555', 'Quisquam minima comm', NULL, '', 'A amet ipsa elit ', '2023-12-29 16:03:23', 0, 1, 25086473, 0, '2023-12-29 16:03:23', 1, 1),
(28, 'Rana', 'Woodard', NULL, 'mifyru@mailinator.com', '1123123123', 'Impedit rem tempore', NULL, '', 'Omnis exercitation q', '2023-12-29 17:07:46', 0, 1, 36085606, 0, '2023-12-29 17:07:46', 1, 1),
(29, 'Rana', 'Woodard', NULL, 'mifyrqu@mailinator.com', '1112312312', 'njknkjn njjnkj jnnj', NULL, '', 'Omnis exercitation q', '2023-12-29 20:15:09', 0, 1, 0, 0, '2023-12-29 20:15:09', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_vendor`
--

CREATE TABLE `user_vendor` (
  `id` int(11) NOT NULL COMMENT 'This table is for employees who work for the vendor',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(30) NOT NULL,
  `vendor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_vendor`
--

INSERT INTO `user_vendor` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `vendor_id`) VALUES
(1, 'test', 'user', 'admin@mail.com', 'c06db68e819be6ec3d26c6038d8e8d1f', 234234234, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `vendor_name` varchar(111) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city_id` int(11) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `latitude` int(11) NOT NULL,
  `longitude` int(11) NOT NULL,
  `address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `vendor_name`, `email`, `password`, `city_id`, `postal_code`, `phone`, `latitude`, `longitude`, `address`) VALUES
(1, 'test admin', 'admin@mail.com', 'c06db68e819be6ec3d26c6038d8e8d1f', 1, 21300, '234234234', 11111, 1111, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_cities`
--

CREATE TABLE `vendor_cities` (
  `id` int(11) NOT NULL COMMENT 'this table determines what cities a vendor''s location serves. Pull/post cities from cities_all table',
  `vendor_id` int(11) NOT NULL COMMENT 'vendor table',
  `vendor_location_id` int(11) NOT NULL COMMENT 'vendor_locations table',
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_customer`
--

CREATE TABLE `vendor_customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(111) NOT NULL,
  `last_name` varchar(111) NOT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `address_1` int(11) NOT NULL,
  `address_2` int(11) NOT NULL,
  `postal_code` varchar(256) NOT NULL,
  `created_date` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_customer`
--

INSERT INTO `vendor_customer` (`id`, `first_name`, `last_name`, `email`, `phone`, `address_1`, `address_2`, `postal_code`, `created_date`, `status`, `city_id`, `role_id`) VALUES
(1, 'Mike', 'Jones', 'mike.jones@hotmail.com', '4168319160', 0, 0, 'L5S4W2', '2023-10-24 09:17:00', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_customer_link`
--

CREATE TABLE `vendor_customer_link` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `delivery_instructions` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_customer_link`
--

INSERT INTO `vendor_customer_link` (`id`, `vendor_id`, `customer_id`, `package_id`, `delivery_instructions`, `status`, `created_at`) VALUES
(1, 1, 28, 21, 'this', 1, '2023-12-29 17:07:46'),
(2, 1, 28, 21, 'this', 1, '2023-12-29 21:14:54');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_locations`
--

CREATE TABLE `vendor_locations` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `location_name` int(11) NOT NULL,
  `address` int(11) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_menu_items`
--

CREATE TABLE `vendor_menu_items` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `units` varchar(44) NOT NULL,
  `item_category` int(11) NOT NULL,
  `veg` tinyint(1) NOT NULL,
  `image` longblob NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `table_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_menu_items`
--

INSERT INTO `vendor_menu_items` (`id`, `vendor_id`, `item_name`, `quantity`, `units`, `item_category`, `veg`, `image`, `created_date`, `table_description`) VALUES
(1, 1, 'Roti', 8, 'pieces', 1, 0, '', NULL, 'When a vendor creates a menu item through \"Create Item\" section, it gets added here. They can then pull it into their menu at any time. '),
(2, 1, 'Naan', 8, 'pieces', 1, 0, '', NULL, ''),
(3, 1, 'Rice', 8, 'pieces', 1, 0, '', NULL, ''),
(4, 2, 'Paneer Makhni', 1, 'ounce', 2, 0, '', NULL, ''),
(5, 1, 'Daal Makhni', 1, 'ounce', 2, 0, '', NULL, ''),
(6, 1, 'Paneer Kadai', 1, 'grams', 2, 0, '', NULL, ''),
(7, 1, 'Bhindi Masala', 1, 'grams', 2, 0, '', NULL, ''),
(8, 2, 'Mushroom Masala', 1, 'grams', 2, 0, '', NULL, ''),
(9, 2, 'Kadhi Pakoda', 1, 'ounce', 2, 0, '', NULL, ''),
(10, 1, 'Gulab Jamun', 1, 'piece', 3, 0, '', NULL, ''),
(11, 1, 'Gajar Halwa', 1, 'cup', 3, 0, '', NULL, ''),
(29, 1, 'Fish', 3, 'piece', 1, 0, 0x89504e470d0a1a0a0000000d49484452000003840000020004030000002836bf720000001b504c5445656e78ffc200ffe9bee6e6e7ffffff895b42fadda3dcc393bb903a818a377e00001b5e4944415478daecddcf73e2461607702797cd318f1fc2c7958cc157bc2e7baf30194fae50d1c0156c33d7052f3339ae5d45e23f7b113f04b601abbbbfaf25b5deab4aa55e2a19137dfcba5fab5be2e4b7557cfad72a5c493b8d6f13da86e78dc7674efd0f6ed313f7fe971a433a18b5b110663cbd9ed087e18d8430ab699312c748083338f90d49296a774298a9d4278df82e845949550b70a714cf843003e9e5840cc2ab0b61daa911608c2884a9a5430284278479584538bcc6c831618780712784f6d32141c31342cbe92dc1e34e086da63e31849753c2f5dfafd6ff3c17e92531453d8f57238f84b7c4168f426823f589313c21e44f87c41a3521644e3bc41e7742c899de9285781442beb44d56a22c845ca94f96a224843ce990ac8527841ca945c18da11042d3099175432144a69605578642084cad0b2e0d851097a62018190a212c1d522ae1e583300f5b622909c6eb43d9f2354d012bfad39797791876350d85d0306d99f22df09631d0f88f2b42689e1a0a6efc16a1f5df5784d034bd4601864f7a7fc4bd109aa59728408d897073a046088d529339307c15fa7f90109aa41350091a14e162792884fa691b5582264548541642dd545fb0fa56b06bd4153d0aa15eda410da28645183f352384aa2950b06b484842a8936adf570bdfc79329a12784ea691b283820e3280ba16ada010a9a8fa38b3893279b1453a4604888902d5fb5b405eb6430e36834940aa14a7a8314848ca3d10d6f215448512b7a503fbabbb210c244a90f150cf76de26fc6d89717e5b33442f871aab99e383d2038d8bf89bff32f3c29ac2c8430498a6c465f4f85879493763c42982cf591adcc2ee1c17f2331a2278449d22fd889309e0a8f0226457c14c2042978185d137e0898b07515c28fd31678185d1657354c1683241d8d101e4f559ea67f4a328c2ea6c2d3307924d83a14c2e3a9caec97a0d38c08e7a14a7c3498d684f078aab0243ced261946d5e323c3b2101e4d55fa97a724c32883a13cd9742cf555161149ba51ade8267b664db67cf7a4b72a77d3062cc368923abc13c283a9d222a29ba497e13114c243a94a2fb3d3fec38b304cb0381442d353873bd7b91ada9d0ab37626314b846da51ba203a65e26d1419bb210ee4dd58ab0cb53840abb4e42f8366d2915614c687d10cddab1d2ec107694dad1b869b4bbaacfe2b1d2ec10fa6a45187214a1c239294f08dfa6b78a45183214a1d249b73b217c930e158f390df045a87656d113c2d7a94a1156b784d5d404891e85f0553a545b516c5ac71405a92684bbe98d6a11ae08abf65713afdf48234f36c5e950b599595d72eb2bfa37fbf7b2e51ba74a5f3fb1ad9aaaddbb6a07dea22084aa4558dd12a63811eeecfd0aa15e114684a7694e84db321442c5223cdd5e75f03ea1ca334e593a9f9f0542a5c7eaab5aa7431377358a23ea9d102e535f631c5d1056439650522c0961947ed27a86b04b215b28200a6194b675c6d1b05be52354a8c4b2105e293ec934d73c66cfb6d417c22bc5a7b2436bf194b40c8510f41c686a8642d8d61b476d44b2057fb9f08494d17134b161ade8846adf61701a66d0f0bee04f36f9999d0a131ba6fda053da8494dda930714f536cc27696a7c2a41b89e5421352a6a7c2a46bfc22132a16613505c224d361a5c084c31c1026980ebde2127ea2cc4f85c9a6c3e212b6f341d84dd6d0149290b2dfcd2894611109555f7998ce5498f805894524547defe83cb382cb86a68884948ba930f1018c0212b673419878e7b7888494876e26e921e15a110995bf94a99add6134d5877ed3db2f6c510eba99e427f52b05dcf2a53c102a7cbce211aa7f2b53a68b30c56f744a8dd0cf4337a3f2f94a8523a41c74336a8ffe168db09d0742b5c70e2b0523f4f340a8f3cc6f7108290f0da9e2272c16a1fa384a591f4737c7a08a42e8bb48e8158a505d30853585f26b308a44a8318e66be9bd98ca40521f4dd242c158890f240a8f14eafe210ea7c4fa8e69a62307879f9f3e5656ea19ba194be633495fdc216d96848fffe310aea519c2dfe0a82c68f1776c24a61b67c899db0ff3de85c066fa2d369fc98b312525108af9909ff9ed683437119fcc949785f10429d7134f1b270f0fd2c381e9de69c6759b81a490b41487c8483e94780cb526cce98aa908a4178495c6b8afea81e248c0495a85385542f04618b8970300d14a2d36421ac148270482ccbc2693d508c19c340ea1582903808fb814634f184540442ad71f4a335c534d08b399cb022843a848391a660d0791042f594e084fdb3403f2ec084e43e61074ef83530897a13b85311c599f3846d02afec9f03c368c2f60b775f24e430e1104cd80b022e433d42ebaf64b3be5fa8775daa8c82070df53e2ab9bee57b8d25ec07019fe193de67bd779cb00525040906c139b025ad384e38811206b098e1083dc709094938c511063842729bf046f3aaccd95a994d7c812d0cd793a1ab842d20e12080c639ac25ad384d3801123e63090318a1e734a1e64521ce6e7413bfa308c965c21b20e1144df8be2b7d32990c1d256ce108e145b86781ff6432193a4a38c4113ee309df9561d7643274949070849d80bf0cbb2693a19b84d738c25ec011731061dd5942eda9f094f1d6da6e7c0611569c7db2c98755e1808730c0dc9eb1fb9260ab8404abc21e13e10c434842f821e19489f077ccdade59c2368e3008ac8ca4da1fb82c841f100ed8086742782cd55ed8bfdb2eecb1119e63086b8e1212ac0af9089b903b6cd164e82261876055f81cd8990cf509ef9c246ce308a77c84730c6159088f13f209beee67ba42f82a1de682f01c435873929070849dcc13928b84b7948b2abc0011de3948d8ce076113445816c2b406d21c125adbd69ae4a30a03cc5645fc8c9a4b5bbe542c42728fb05334c233e708db48c2690e08cb4298126143080fa53e92b067893024e37ec621424212fe6169516152852484c7f60bfb96084321dca6b7d02ae43b7881dab65f6e19ba45d8865621e3aae2338cb02c84691c420c8207213c900eb1847c2de90c46e839464858c2af5656f666842484479f6c1242db841d701586232b6b0a33c23ba79e6c6aa1abb067a5213523ac38b5e50b27ec5be96684709bfa68c2d0ca54684658728a700227e439d0dd003d23ba5a5538454870c2be85db6b86554842b813734b23e903b20a9d22bc6620e41849eb2194f0de21c21603618f7f2a3425ac08e1e1dd26a6c9f01cf5ee20f7087d06c230fb84258708271c840c47bae75842cf2142ca491586584212c263f7b939089b427828bdcc09e167d40b4937517786f0c69890ac109ea309ef9d79b2a99d13c287107a7f6d797cc6912d5f164286838833213c94fae684730b4bfbb3399ab0e40ce1901856153dfe65e1c0f453d79c21240e42fc51d23a7a4d119d8012c2c3ab8a20f3376784f0783fc37092f4dd5cf82484ebf4968390e348fe0cdccd44e710dd20fc82209c5b387781277c7484b04df87e86e5b9987370431a2d0c85f0403fc3737eed1cddcd08e1e1c9d0c673f6806ec619c221a14752ae67edd153217942786024b5f29436602aa49a238444e09194ed6d094df054b85818baf16413887066e119df39761c257264cb17722dbc9d51cecacb12064218a79710c1c6f8c2c22b4b761a9a5e03f1b9eb4e10de202e45633c6e58787dd7ce0d9ac6b809f8dcf74e10b6005762341e8f47730b84f148fa75f10301ad744508e361741133e6e7ec5ff5a4d3e89746086184e3659c5b78a1ec6632ec2f7f697c210411ae8a70d3cf0c6c10f656bf3542b84ccd7f95a7abeb39e69f0ae37e66f503cd67c392138443443bbabca0360857a3f560fd237d218c52e3c79abc7511ae5bd2670b845f373fd2f8b33b41685c84a5cdf59cb1bf5b3d08febd3b15027a5221dcf6a3714bca2ab85e556c66dff1500811848dcdf5bce0feb69f9830feadf185104af88d7f4db15e5534f244c8bf5f88231c33bf5a3d261c6c7fa4e9877761cbf712d590ae5715bc6b8ad5a9fcfe184678ef00e1359070cefb1d157115f6b63f5208b18433fe2a5c6edc0309ffeb00611b47b8dcab98320fa411e1338eb0e200610b4878ce4fb8bc49fa5d083909030b84635c3b2384d159ccedf5bcb044d8104228e1cebaf01bfbcd99b784df84104b38b650850faf087d21c4128ef8efaf455538104230e1789790fbfe5ab461b8737346081761be695fdabd3dd3b730907edd121aef579784f035e18cf10bb7b65508bc3923846f17860fecf7d7a22acc1921fb7e21e0487463676d6f97d0fc4cbee7c0962f94f0827da322227cc67533d13bbc8490687bcbb269a50ae39f8778aac20142c04331a59ddb333d0beb42e0542855f876241df10fa4b39d9b3388c7d3a40adf10ce9ff909fbc0a95008df8da4330b8471433a9a08218ad08bcbf0dc02216ea74908f71d25e527ec3790e3a810be1d4947dce72e82ed61fcf144087184db91945b30f82bfe5190575e08e1bb0d2776c206b41f15c23d23a935c211092192306e68ec11fa4288252cd92644dc1fb543c8be5f0822ac352c11421785b4fa5aed9c6ff982ae44fcda0b4b84a82214c2f76568ab0a4908d1849bd9d0ce54082b42217cdf948eac1036490819084bf6084724841c84cb575a721382875121dcd7d158206c9010f210aeee76f3130624845c84346d5820440ea342b8cf90bb9bc10a0ae11ec3112f618015f41c209c800d3de6b53df8e34a15da361cc23fad54e19eb8e4133ca31c12e6e234f7ebe09c0ae11f560ee4efbd49c347d8c257a110ee89321fa12f847b52fc5529e5a89b1142cb2d29be9ba19203846dca514b8affac6521b4da923684d01261293f0da9105a6e497d21b444e8e5a79b1142cbfd8c105a2364126cfe2284b6089926c37f9efc04ffa88f0e107ec913e1c913faa3de3940784bb9e9674e16914342f6fdc24bca4d3f1311a287d2ba035bbe571c842cfb4dcd138632bc12c2fdf1cc3415e2cb5008f7c7af3f7310fe674908ee6884706f9c9efc836b2a5cc42f42c84ff8bf931346426c19fee602217c27fcd7c5659e724d85e0d9b07625847b22bacc3f3312229b52cf09429fa1083926c358105986252708dbff6fef5c9e1a4792302e1e6a71248c0738d2db0ebc47dca5802ba01a7cd59efa8a4d877d551b8f7585888dd87f7bfdb6b1f5a8caac94e452fa4436508ceb37df979995659b408414c97083d0a00c2f18618a080992e18d43214346982a42f3c9701ba1c30809112e45683e196e1334d757bc5b81f0854284e693e11784c69cf4cd0a84cf1422349e0cbff8a839272d0221f9bc30102422349d0c77109a9221e9c61635f2358af07ab3c91ea18f9a3b28658409a7a344c97007a1c308b7c33f143e6a3819deec2234e3a4979620ec111433a693e1ab43e2a4b620ec9088d0ac933a0e89933619616a316318617b1fe11123244078fe75938f0953a12127b505e1038d8f9a6c2b1c87c649c79620bca7f151934e9a84d0c439e96f4b100a1a1f35d856dc242134910c2523ccf25183c9304a42e83242d308aff77799d2478d24436b10fea1f151634e7a938c10efa497d620347301eac3a172d2572a848d4210d2cf0ba57ca24985c69cd471889cf48278638b1af91a42789eb4c923421f65845be10b19c263b27ad48893be5b83d0c8d58bd0a17252870ce19b350825552a34e2a4a93e8a3f26158c30bb2b34e4a4a93e8a4f861621ec11a542234e9a4e107b4c7a651142038de18743e4a4b7192a4426c38645089fa852a101271dd221bc60842a08d14e1a67203c6384abf085aa9ac1cbb09d85d041f714d6209464d50c7a761f1322148c500921aea0696723fc6484abb0475590629d74988df008db53d883f03b5935832b686e6342848d821016312f14f87b8859088f513e9a89105592360bd8d8a246be7884d759083d4c31938dd06184abf09eae9ac114346d52842dab100a5284c71811d221948c5019a187116136c24f46b80a7b643dc5f4f16d84106136424449dab00c618714618c102119c2262354ed29a6088723605bcf08d5c37b5a84315c84d908118de16fcb100a6284236826a4432819a106c2411c8345988dd06184eb1055925ee7231c41454885b0611dc20e29c2a1b60cdbd4089b8c5017e104284246a81afe24453875d2b80f13211542bf3084c5cc0b9183fb73158413cd39a11a42f0095b611b5b1cc23fa408676dfa0862a354082f2d44d821453893610cb1512a844d4608413801d82823540fef6911ce0f3c47fa364a85b06521425100c258df46a9104a1b11fe214538885519ee109c3814082fad44d8a145b890e144331152216c32422d84de6023c3915e2264843ae17d2108f30e69e26210b6ac4488a867fe524138546118ef3f48104a3b11c2eb999c335267b02dc32c86b1364268356327c20e19c2db2f324c679844f09502619311e210a6d434b73123c486c408075b354afa85b5dd474481501689b0a879a140cd9b9472e1601b525f498253d82408a977b29491af40bdca3007e164b02bc31d886900737b0ad80db686b5089fa811ee78e5644171308ce362115e588bf0990ae1f1204986b98f617e4f01bbcdfd662d42498e7018eb3e86140885bd08c197493f14ceb9f5643851eb2940082f2d46084e864a87a4002bcd45f8094d85b6227c2142b86a0c01564ad153bc5b8c5052211c40659853903ae054682dc21e11c2c940478613da9ee2ca6a84d06478ad5a926acb90a09ab9b01ae10b7557a1cb30a79af90f38155a8b501221f4b6110ecd21445cc5b716618f06e156499ac7f0cb37271fe6115e598ef089a6b7df2e49b51a7cb2545820c222e78588b74dd02849b5181220fc5dcc4e9633f245bce6fe5ca79e4965382c22154adb11f6489a8aaff58cb20e07afe6bbc286f5083b141adcad67f2cbd279773fe813f868d37a84cf04b5cc7e3d93a4c33da89341cea409c4b0653d429f86e05e32ccf7d2e94fdc38e619faf6237c2221b83532546438fb81287759ede3990b460824b89f0c7312e2ecdb7d85653f19e17e68bc9249ec0cb385b8f8e1a1639ea1a803c21e09c1a4649826c415ed57a58535ef5cd401a18e93fea54c70bf334c55e2eadffb6a0b6b758717b540f86cb0a3cf6e2b36525c6b71b23d1c76cc33fc510b841ac95087609a93a63f5e5557d6284b453d102a3b69a885d0d324d8575ffa53dd47eb81f0c5703ba1e0a489eeaab1b4c635eee211163c2f9c87a68b519893461a4bab9ed214bd93658c7ce761c77829037152adb5d5acb4591b840fc64b198093dee8adad84705c1b84822011ea3a695f73ed23451fad0bc2ef04369a764e9af268ebaead60a58d1a21ec50d868ea3929ba9851b5d2668d100a0a1bd52a68dafa8b9f29f9686d10f648083a4e9f4e84f9e9b0512b841db31d61e6e0d79008f3d361b3560885f95246abaf88408b9fa9dc3eac0b42bf4761a33319ded28930c74a1bf54298e5a4e78e432dc308babac2edc3da2014a6fb099df6be0d5efd28ff16776d10fa1d0a1b5593611fb1fa67ee2deefaa8f085a0965194e10d62f5f48ae6bd348425cc0b1721898daac8f016b57aaa0c65593b591ec20e412da3549446a8d5cf528b99fa21bc2712619e0c87c8d53fd35e4a513f848248843927a5b7d8d5cfd2ead11a22ec1089d0714619d5688e8d864019366b8930201261e669f7bff18b9fa5348535449830ae50ec0973a5f20d7a61c6051ed1346a8af0c1784f9867a5fdc8c4e247c99766ea8850400f6614b4720b23a876f938f970ad96083bd062269f616273786386e0be0c9bb54528688a99342b6d9b5afb2cf184bb9e087bd08e220458697e4718aabe8863f745853546d8a12966160dfeadb9f9448e93366b8c50407d54452fc7bac568e8029d54d61961c7f8c94c4a3a34d34e243b69b36484654db99621d0475da5e2717348d37f5551760873d292b6aef491ef32fc0eac4743ad74a842105c93366a8ef005eaa34a89eb9b0641f54cb8e3a46f354718d0a5c27587df1f9a5f78e3a45741dd1176807d7da8a69a916a4baf9309bf3869b3f60885a18b6ba90cd53418826b52c9083b401f5594a13334985b1306bf4d46b86cefaf9d521f61084d8692112edbfb73874c8606bb94fd64d86484d3f0273c158686f8b98095d66f20cb0817afbc07020c4b51e026193624239c85f7d054b893c13ca1f87bef0ff85cb848862d46b8087be069eff6d69f042250faa571e07731c5e826195e4a46b8081f8008a700b7767f76787fa772723afd9bfe8e8d42ac74f5c1308c702ec30f7016db309c2dd555f89d93d95fbc831fcc6c105eca4a202c775eb80c5fc004c3b58066e2120f0abf743afbbb8f9834b8aa67de2bb075a58f7c57618467e82dfe97d445e882211e5d0946b809bb0efa3147a8ad42d7019f0f9cbd31c2ed10980cdd6953eeba0815860e98a11730c2edb05b8e0a43c705ab702c18e176e883b361b89421448521e278c7938cf06b889361085261e8c06dd41933c29d102e437771580a52217cd8e14946b81b4265e82e7b3bedbed0451d92b718e15ee8df38e0aa74ee8981a60a43e8e9e8ec712c196142881af7b9ba2ac48daa7c469814dee1ea193d158633f705333c958c3031c45c7d090167a470154a469818fa8fa8be628630505721e6e6cd29234c097d840c43e8a402723a2a2b85b012f3c255d8c5aa50b8ea2a84ffa97115f6aa6223df75f80a27b854a14bafc2d5f936234c0c912aece69e98b9ee1ce1df0884be608419e11d4e1b0fb33edfcd3ecbc1aaf034608459a18f43d89d1fd6b859f7a55c2c42c908b3437045b39c54cc55e8264f0143132a1c33c29cd0bfc320ecae25b803d19d530d5db40a4f2423cc0db1537b773e065e5073173733963c430315a96484f9e12302a1588bcfdd3b099fdf559b7e1f85f094112a84c0e1ef5a85e1e24a94bbf862fe75e86e5d1cc620f42423540903840ad34eaf5d773d5dc220f419a15af88852e1e23e45b8d6e0fa9e6288ce85a79211aa85202bfd7277264c980a87e803364f3242f5ff2cec3dd24d31ba4a8906ce482523540fbb48156e2e64387b3764c008ff5b5184559a17a26e06a7dd23754d4d2a4e6435f7aaa208015529f0954d3a36ca0869af95c25ed9a47336ca0835af95de554b85a79211ea86bae99056859e6484fa615025154a460809bbd551e19811c2ee24de554585a79211c2422d86842a3c918c101c465550e1f2689411c2c22aa8d0f71921227c2e5f8563c1085161b76c158e052344868fe5aaf0246084e8f0ae4c151e07a2f208ab3903db0e15dfa08d4485c755df9cea8e7c01f7302854e84946682654d221810a3dc9088d8551192af4024668308c8a57a1e70b4668328c8a56e1942023341b46c5aa704690111a0ea32255b878ab4a4668388c8a53e1f21d1118a1e9f0b5281556ec3d2d2c42286f8a51e1f141ecc641220cfc87225438968c902ef4bbf42a1c4b46481a3e13abd06b494658d2e0c28c0a7f1dd86e88cabeb229337ca053e12838b8dd90878830f932860915b602c1088b0993cc14af42ef509ebe0d084542778156e15832c242c32032ab42efb09ebe0d08c56e46c4a9702c196109a16c878654184bc908cb09b7dd14aec25fadc06784a585cfff6055e8cd3e028d11961976ffc1a8f0d7e233ec1861c99d7e0455a1d79287fff46d4028e47304f8fc42376e1de8f3b510e1eccbb6a60a7f8d0ef9f95a8870d6eb4f01aaaa70225a07ff7c2d44380b0311857904dd93871fb63cdf05c2839b176687befc398cd23fa7e27f71cbaee77b90235fa530f8d77b1c451f9be6cf8be3c98f79e963ddf3fd3f23414afd1fc320470000000049454e44ae426082, '2023-11-30 12:52:54', 'njj njn njnj'),
(30, 1, 'mkmkmkmk', 9, 'pieces', 2, 0, 0x66696c655f313730313334393031313733322e6a7067, '2023-11-30 12:56:51', 'jjnjnj'),
(31, 1, 'paneer butter', 14, 'pieces', 2, 0, '', '2023-11-30 19:41:53', 'delicision paneer butter with naan and yougart'),
(32, 1, 'paneer butter', 14, 'pieces', 2, 0, '', '2023-11-30 19:42:40', 'delicision paneer butter with naan and yougart'),
(33, 1, 'paneer butter new', 14, 'pieces', 2, 0, '', '2023-11-30 19:43:57', 'delicision paneer butter with naan and yougart'),
(34, 1, 'paneer butter new', 14, 'pieces', 2, 0, '', '2023-11-30 19:44:13', 'delicision paneer butter with naan and yougart'),
(35, 1, 'paneer chicken', 9, 'grams', 2, 0, 0x66696c655f313730313337353933383731332e706e67, '2023-11-30 19:53:18', 'delicision paneer butter with naan and yougart new'),
(36, 1, 'daal', 12, 'pieces', 1, 0, '', '2023-12-12 16:11:10', 'daal for new'),
(37, 1, 'paneer butter new', 2, 'piece', 1, 0, 0x66696c655f313730323635333934333533342e706e67, '2023-12-15 15:25:43', 'nknkjnkjnk'),
(38, 1, 'mutton karahi', 2, 'piece', 1, 0, 0x89504e470d0a1a0a0000000d49484452000003840000020004030000002836bf720000001b504c5445656e78ffc200ffe9bee6e6e7ffffff895b42fadda3dcc393bb903a818a377e00001b5e4944415478daecddcf73e2461607702797cd318f1fc2c7958cc157bc2e7baf30194fae50d1c0156c33d7052f3339ae5d45e23f7b113f04b601abbbbfaf25b5deab4aa55e2a19137dfcba5fab5be2e4b7557cfad72a5c493b8d6f13da86e78dc7674efd0f6ed313f7fe971a433a18b5b110663cbd9ed087e18d8430ab699312c748083338f90d49296a774298a9d4278df82e845949550b70a714cf843003e9e5840cc2ab0b61daa911608c2884a9a5430284278479584538bcc6c831618780712784f6d32141c31342cbe92dc1e34e086da63e31849753c2f5dfafd6ff3c17e92531453d8f57238f84b7c4168f426823f589313c21e44f87c41a3521644e3bc41e7742c899de9285781442beb44d56a22c845ca94f96a224843ce990ac8527841ca945c18da11042d3099175432144a69605578642084cad0b2e0d851097a62018190a212c1d522ae1e583300f5b622909c6eb43d9f2354d012bfad39797791876350d85d0306d99f22df09631d0f88f2b42689e1a0a6efc16a1f5df5784d034bd4601864f7a7fc4bd109aa59728408d897073a046088d529339307c15fa7f90109aa41350091a14e162792884fa691b5582264548541642dd545fb0fa56b06bd4153d0aa15eda410da28645183f352384aa2950b06b484842a8936adf570bdfc79329a12784ea691b283820e3280ba16ada010a9a8fa38b3893279b1453a4604888902d5fb5b405eb6430e36834940aa14a7a8314848ca3d10d6f215448512b7a503fbabbb210c244a90f150cf76de26fc6d89717e5b33442f871aab99e383d2038d8bf89bff32f3c29ac2c8430498a6c465f4f85879493763c42982cf591adcc2ee1c17f2331a2278449d22fd889309e0a8f0226457c14c2042978185d137e0898b07515c28fd31678185d1657354c1683241d8d101e4f559ea67f4a328c2ea6c2d3307924d83a14c2e3a9caec97a0d38c08e7a14a7c3498d684f078aab0243ced261946d5e323c3b2101e4d55fa97a724c32883a13cd9742cf555161149ba51ade8267b664db67cf7a4b72a77d3062cc368923abc13c283a9d222a29ba497e13114c243a94a2fb3d3fec38b304cb0381442d353873bd7b91ada9d0ab37626314b846da51ba203a65e26d1419bb210ee4dd58ab0cb53840abb4e42f8366d2915614c687d10cddab1d2ec107694dad1b869b4bbaacfe2b1d2ec10fa6a45187214a1c239294f08dfa6b78a45183214a1d249b73b217c930e158f390df045a87656d113c2d7a94a1156b784d5d404891e85f0553a545b516c5ac71405a92684bbe98d6a11ae08abf65713afdf48234f36c5e950b599595d72eb2bfa37fbf7b2e51ba74a5f3fb1ad9aaaddbb6a07dea22084aa4558dd12a63811eeecfd0aa15e114684a7694e84db321442c5223cdd5e75f03ea1ca334e593a9f9f0542a5c7eaab5aa7431377358a23ea9d102e535f631c5d1056439650522c0961947ed27a86b04b215b28200a6194b675c6d1b05be52354a8c4b2105e293ec934d73c66cfb6d417c22bc5a7b2436bf194b40c8510f41c686a8642d8d61b476d44b2057fb9f08494d17134b161ade8846adf61701a66d0f0bee04f36f9999d0a131ba6fda053da8494dda930714f536cc27696a7c2a41b89e5421352a6a7c2a46bfc22132a16613505c224d361a5c084c31c1026980ebde2127ea2cc4f85c9a6c3e212b6f341d84dd6d0149290b2dfcd2894611109555f7998ce5498f805894524547defe83cb382cb86a68884948ba930f1018c0212b673419878e7b7888494876e26e921e15a110995bf94a99add6134d5877ed3db2f6c510eba99e427f52b05dcf2a53c102a7cbce211aa7f2b53a68b30c56f744a8dd0cf4337a3f2f94a8523a41c74336a8ffe168db09d0742b5c70e2b0523f4f340a8f3cc6f7108290f0da9e2272c16a1fa384a591f4737c7a08a42e8bb48e8158a505d30853585f26b308a44a8318e66be9bd98ca40521f4dd242c158890f240a8f14eafe210ea7c4fa8e69a62307879f9f3e5656ea19ba194be633495fdc216d96848fffe310aea519c2dfe0a82c68f1776c24a61b67c899db0ff3de85c066fa2d369fc98b312525108af9909ff9ed683437119fcc949785f10429d7134f1b270f0fd2c381e9de69c6759b81a490b41487c8483e94780cb526cce98aa908a4178495c6b8afea81e248c0495a85385542f04618b8970300d14a2d36421ac148270482ccbc2693d508c19c340ea1582903808fb814634f184540442ad71f4a335c534d08b399cb022843a848391a660d0791042f594e084fdb3403f2ec084e43e61074ef83530897a13b85311c599f3846d02afec9f03c368c2f60b775f24e430e1104cd80b022e433d42ebaf64b3be5fa8775daa8c82070df53e2ab9bee57b8d25ec07019fe193de67bd779cb00525040906c139b025ad384e38811206b098e1083dc709094938c511063842729bf046f3aaccd95a994d7c812d0cd793a1ab842d20e12080c639ac25ad384d3801123e63090318a1e734a1e64521ce6e7413bfa308c965c21b20e1144df8be2b7d32990c1d256ce108e145b86781ff6432193a4a38c4113ee309df9561d7643274949070849d80bf0cbb2693a19b84d738c25ec011731061dd5942eda9f094f1d6da6e7c0611569c7db2c98755e1808730c0dc9eb1fb9260ab8404abc21e13e10c434842f821e19489f077ccdade59c2368e3008ac8ca4da1fb82c841f100ed8086742782cd55ed8bfdb2eecb1119e63086b8e1212ac0af9089b903b6cd164e82261876055f81cd8990cf509ef9c246ce308a77c84730c6159088f13f209beee67ba42f82a1de682f01c435873929070849dcc13928b84b7948b2abc0011de3948d8ce076113445816c2b406d21c125adbd69ae4a30a03cc5645fc8c9a4b5bbe542c42728fb05334c233e708db48c2690e08cb4298126143080fa53e92b067893024e37ec621424212fe6169516152852484c7f60bfb96084321dca6b7d02ae43b7881dab65f6e19ba45d8865621e3aae2338cb02c84691c420c8207213c900eb1847c2de90c46e839464858c2af5656f666842484479f6c1242db841d701586232b6b0a33c23ba79e6c6aa1abb067a5213523ac38b5e50b27ec5be96684709bfa68c2d0ca54684658728a700227e439d0dd003d23ba5a5538454870c2be85db6b86554842b813734b23e903b20a9d22bc6620e41849eb2194f0de21c21603618f7f2a3425ac08e1e1dd26a6c9f01cf5ee20f7087d06c230fb84258708271c840c47bae75842cf2142ca491586584212c263f7b939089b427828bdcc09e167d40b4937517786f0c69890ac109ea309ef9d79b2a99d13c287107a7f6d797cc6912d5f164286838833213c94fae684730b4bfbb3399ab0e40ce1901856153dfe65e1c0f453d79c21240e42fc51d23a7a4d119d8012c2c3ab8a20f3376784f0783fc37092f4dd5cf82484ebf4968390e348fe0cdccd44e710dd20fc82209c5b387781277c7484b04df87e86e5b9987370431a2d0c85f0403fc3737eed1cddcd08e1e1c9d0c673f6806ec619c221a14752ae67edd153217942786024b5f29436602aa49a238444e09194ed6d094df054b85818baf16413887066e119df39761c257264cb17722dbc9d51cecacb12064218a79710c1c6f8c2c22b4b761a9a5e03f1b9eb4e10de202e45633c6e58787dd7ce0d9ac6b809f8dcf74e10b6005762341e8f47730b84f148fa75f10301ad744508e361741133e6e7ec5ff5a4d3e89746086184e3659c5b78a1ec6632ec2f7f697c210411ae8a70d3cf0c6c10f656bf3542b84ccd7f95a7abeb39e69f0ae37e66f503cd67c392138443443bbabca0360857a3f560fd237d218c52e3c79abc7511ae5bd2670b845f373fd2f8b33b41685c84a5cdf59cb1bf5b3d08febd3b15027a5221dcf6a3714bca2ab85e556c66dff1500811848dcdf5bce0feb69f9830feadf185104af88d7f4db15e5534f244c8bf5f88231c33bf5a3d261c6c7fa4e9877761cbf712d590ae5715bc6b8ad5a9fcfe184678ef00e1359070cefb1d157115f6b63f5208b18433fe2a5c6edc0309ffeb00611b47b8dcab98320fa411e1338eb0e200610b4878ce4fb8bc49fa5d083909030b84635c3b2384d159ccedf5bcb044d8104228e1cebaf01bfbcd99b784df84104b38b650850faf087d21c4128ef8efaf455538104230e1789790fbfe5ab461b8737346081761be695fdabd3dd3b730907edd121aef579784f035e18cf10bb7b65508bc3923846f17860fecf7d7a22acc1921fb7e21e0487463676d6f97d0fc4cbee7c0962f94f0827da322227cc67533d13bbc8490687bcbb269a50ae39f8778aac20142c04331a59ddb333d0beb42e0542855f876241df10fa4b39d9b3388c7d3a40adf10ce9ff909fbc0a95008df8da4330b8471433a9a08218ad08bcbf0dc02216ea74908f71d25e527ec3790e3a810be1d4947dce72e82ed61fcf144087184db91945b30f82bfe5190575e08e1bb0d2776c206b41f15c23d23a935c211092192306e68ec11fa4288252cd92644dc1fb543c8be5f0822ac352c11421785b4fa5aed9c6ff982ae44fcda0b4b84a82214c2f76568ab0a4908d1849bd9d0ce54082b42217cdf948eac1036490819084bf6084724841c84cb575a721382875121dcd7d158206c9010f210aeee76f3130624845c84346d5820440ea342b8cf90bb9bc10a0ae11ec3112f618015f41c209c800d3de6b53df8e34a15da361cc23fad54e19eb8e4133ca31c12e6e234f7ebe09c0ae11f560ee4efbd49c347d8c257a110ee89321fa12f847b52fc5529e5a89b1142cb2d29be9ba19203846dca514b8affac6521b4da923684d01261293f0da9105a6e497d21b444e8e5a79b1142cbfd8c105a2364126cfe2284b6089926c37f9efc04ffa88f0e107ec913e1c913faa3de3940784bb9e9674e16914342f6fdc24bca4d3f1311a287d2ba035bbe571c842cfb4dcd138632bc12c2fdf1cc3415e2cb5008f7c7af3f7310fe674908ee6884706f9c9efc836b2a5cc42f42c84ff8bf931346426c19fee602217c27fcd7c5659e724d85e0d9b07625847b22bacc3f3312229b52cf09429fa1083926c358105986252708dbff6fef5c9e1a4792302e1e6a71248c0738d2db0ebc47dca5802ba01a7cd59efa8a4d877d551b8f7585888dd87f7bfdb6b1f5a8caac94e452fa4436508ceb37df979995659b408414c97083d0a00c2f18618a080992e18d43214346982a42f3c9701ba1c30809112e45683e196e1334d757bc5b81f0854284e693e11784c69cf4cd0a84cf1422349e0cbff8a839272d0221f9bc30102422349d0c77109a9221e9c61635f2358af07ab3c91ea18f9a3b28658409a7a344c97007a1c308b7c33f143e6a3819deec2234e3a4979620ec111433a693e1ab43e2a4b620ec9088d0ac933a0e89933619616a316318617b1fe11123244078fe75938f0953a12127b505e1038d8f9a6c2b1c87c649c79620bca7f151934e9a84d0c439e96f4b100a1a1f35d856dc242134910c2523ccf25183c9304a42e83242d308aff77799d2478d24436b10fea1f151634e7a938c10efa497d620347301eac3a172d2572a848d4210d2cf0ba57ca24985c69cd471889cf48278638b1af91a42789eb4c923421f65845be10b19c263b27ad48893be5b83d0c8d58bd0a17252870ce19b350825552a34e2a4a93e8a3f26158c30bb2b34e4a4a93e8a4f861621ec11a542234e9a4e107b4c7a651142038de18743e4a4b7192a4426c38645089fa852a101271dd221bc60842a08d14e1a67203c6384abf085aa9ac1cbb09d85d041f714d6209464d50c7a761f1322148c500921aea0696723fc6484abb0475590629d74988df008db53d883f03b5935832b686e6342848d821016312f14f87b8859088f513e9a89105592360bd8d8a246be7884d759083d4c31938dd06184abf09eae9ac114346d52842dab100a5284c71811d221948c5019a187116136c24f46b80a7b643dc5f4f16d84106136424449dab00c618714618c102119c2262354ed29a6088723605bcf08d5c37b5a84315c84d908118de16fcb100a6284236826a4432819a106c2411c8345988dd06184eb1055925ee7231c41454885b0611dc20e29c2a1b60cdbd4089b8c5017e104284246a81afe24453875d2b80f13211542bf3084c5cc0b9183fb73158413cd39a11a42f0095b611b5b1cc23fa408676dfa0862a354082f2d44d821453893610cb1512a844d4608413801d82823540fef6911ce0f3c47fa364a85b06521425100c258df46a9104a1b11fe214538885519ee109c3814082fad44d8a145b890e144331152216c32422d84de6023c3915e2264843ae17d2108f30e69e26210b6ac4488a867fe524138546118ef3f48104a3b11c2eb999c335267b02dc32c86b1364268356327c20e19c2db2f324c679844f09502619311e210a6d434b73123c486c408075b354afa85b5dd474481501689b0a879a140cd9b9472e1601b525f498253d82408a977b29491af40bdca3007e164b02bc31d886900737b0ad80db686b5089fa811ee78e5644171308ce362115e588bf0990ae1f1204986b98f617e4f01bbcdfd662d42498e7018eb3e86140885bd08c197493f14ceb9f5643851eb2940082f2d46084e864a87a4002bcd45f8094d85b6227c2142b86a0c01564ad153bc5b8c5052211c40659853903ae054682dc21e11c2c940478613da9ee2ca6a84d06478ad5a926acb90a09ab9b01ae10b7557a1cb30a79af90f38155a8b501221f4b6110ecd21445cc5b716618f06e156499ac7f0cb37271fe6115e598ef089a6b7df2e49b51a7cb2545820c222e78588b74dd02849b5181220fc5dcc4e9633f245bce6fe5ca79e4965382c22154adb11f6489a8aaff58cb20e07afe6bbc286f5083b141adcad67f2cbd279773fe813f868d37a84cf04b5cc7e3d93a4c33da89341cea409c4b0653d429f86e05e32ccf7d2e94fdc38e619faf6237c2221b83532546438fb81287759ede3990b460824b89f0c7312e2ecdb7d85653f19e17e68bc9249ec0cb385b8f8e1a1639ea1a803c21e09c1a4649826c415ed57a58535ef5cd401a18e93fea54c70bf334c55e2eadffb6a0b6b758717b540f86cb0a3cf6e2b36525c6b71b23d1c76cc33fc510b841ac95087609a93a63f5e5557d6284b453d102a3b69a885d0d324d8575ffa53dd47eb81f0c5703ba1e0a489eeaab1b4c635eee211163c2f9c87a68b519893461a4bab9ed214bd93658c7ce761c77829037152adb5d5acb4591b840fc64b198093dee8adad84705c1b84822011ea3a695f73ed23451fad0bc2ef04369a764e9af268ebaead60a58d1a21ec50d868ea3929ba9851b5d2668d100a0a1bd52a68dafa8b9f29f9686d10f648083a4e9f4e84f9e9b0512b841db31d61e6e0d79008f3d361b3560885f95246abaf88408b9fa9dc3eac0b42bf4761a33319ded28930c74a1bf54298e5a4e78e432dc308babac2edc3da2014a6fb099df6be0d5efd28ff16776d10fa1d0a1b5593611fb1fa67ee2deefaa8f085a0965194e10d62f5f48ae6bd348425cc0b1721898daac8f016b57aaa0c65593b591ec20e412da3549446a8d5cf528b99fa21bc2712619e0c87c8d53fd35e4a513f848248843927a5b7d8d5cfd2ead11a22ec1089d0714619d5688e8d864019366b8930201261e669f7bff18b9fa5348535449830ae50ec0973a5f20d7a61c6051ed1346a8af0c1784f9867a5fdc8c4e247c99766ea8850400f6614b4720b23a876f938f970ad96083bd062269f616273786386e0be0c9bb54528688a99342b6d9b5afb2cf184bb9e087bd08e220458697e4718aabe8863f745853546d8a12966160dfeadb9f9448e93366b8c50407d54452fc7bac568e8029d54d61961c7f8c94c4a3a34d34e243b69b36484654db99621d0475da5e2717348d37f5551760873d292b6aef491ef32fc0eac4743ad74a842105c93366a8ef005eaa34a89eb9b0641f54cb8e3a46f354718d0a5c27587df1f9a5f78e3a45741dd1176807d7da8a69a916a4baf9309bf3869b3f60885a18b6ba90cd53418826b52c9083b401f5594a13334985b1306bf4d46b86cefaf9d521f61084d8692112edbfb73874c8606bb94fd64d86484d3f0273c158686f8b98095d66f20cb0817afbc07020c4b51e026193624239c85f7d054b893c13ca1f87bef0ff85cb848862d46b8087be069eff6d69f042250faa571e07731c5e826195e4a46b8081f8008a700b7767f76787fa772723afd9bfe8e8d42ac74f5c1308c702ec30f7016db309c2dd555f89d93d95fbc831fcc6c105eca4a202c775eb80c5fc004c3b58066e2120f0abf743afbbb8f9834b8aa67de2bb075a58f7c57618467e82dfe97d445e882211e5d0946b809bb0efa3147a8ad42d7019f0f9cbd31c2ed10980cdd6953eeba0815860e98a11730c2edb05b8e0a43c705ab702c18e176e883b361b89421448521e278c7938cf06b889361085261e8c06dd41933c29d102e437771580a52217cd8e14946b81b4265e82e7b3bedbed0451d92b718e15ee8df38e0aa74ee8981a60a43e8e9e8ec712c196142881af7b9ba2ac48daa7c469814dee1ea193d158633f705333c958c3031c45c7d090167a470154a469818fa8fa8be628630505721e6e6cd29234c097d840c43e8a402723a2a2b85b012f3c255d8c5aa50b8ea2a84ffa97115f6aa6223df75f80a27b854a14bafc2d5f936234c0c912aece69e98b9ee1ce1df0884be608419e11d4e1b0fb33edfcd3ecbc1aaf034608459a18f43d89d1fd6b859f7a55c2c42c908b3437045b39c54cc55e8264f0143132a1c33c29cd0bfc320ecae25b803d19d530d5db40a4f2423cc0db1537b773e065e5073173733963c430315a96484f9e12302a1588bcfdd3b099fdf559b7e1f85f094112a84c0e1ef5a85e1e24a94bbf862fe75e86e5d1cc620f42423540903840ad34eaf5d773d5dc220f419a15af88852e1e23e45b8d6e0fa9e6288ce85a79211aa85202bfd7277264c980a87e803364f3242f5ff2cec3dd24d31ba4a8906ce482523540fbb48156e2e64387b3764c008ff5b5184559a17a26e06a7dd23754d4d2a4e6435f7aaa208015529f0954d3a36ca0869af95c25ed9a47336ca0835af95de554b85a79211ea86bae99056859e6484fa615025154a460809bbd551e19811c2ee24de554585a79211c2422d86842a3c918c101c465550e1f2689411c2c22aa8d0f71921227c2e5f8563c1085161b76c158e052344868fe5aaf0246084e8f0ae4c151e07a2f208ab3903db0e15dfa08d4485c755df9cea8e7c01f7302854e84946682654d221810a3dc9088d8551192af4024668308c8a57a1e70b4668328c8a56e1942023341b46c5aa704690111a0ea32255b878ab4a4668388c8a53e1f21d1118a1e9f0b5281556ec3d2d2c42286f8a51e1f141ecc641220cfc87225438968c902ef4bbf42a1c4b46481a3e13abd06b494658d2e0c28c0a7f1dd86e88cabeb229337ca053e12838b8dd90878830f932860915b602c1088b0993cc14af42ef509ebe0d084542778156e15832c242c32032ab42efb09ebe0d08c56e46c4a9702c196109a16c878654184bc908cb09b7dd14aec25fadc06784a585cfff6055e8cd3e028d11961976ffc1a8f0d7e233ec1861c99d7e0455a1d79287fff46d4028e47304f8fc42376e1de8f3b510e1eccbb6a60a7f8d0ef9f95a8870d6eb4f01aaaa70225a07ff7c2d44380b0311857904dd93871fb63cdf05c2839b176687befc398cd23fa7e27f71cbaee77b90235fa530f8d77b1c451f9be6cf8be3c98f79e963ddf3fd3f23414afd1fc320470000000049454e44ae426082, '2023-12-15 15:36:38', 'nknkjnkjnk'),
(39, 1, 'paneer chicken', 12, 'piece', 1, 0, '', '2023-12-26 14:00:34', 'this '),
(40, 1, 'paneer butter new', 12, 'pieces', 1, 0, '', '2023-12-26 14:16:09', 'tet'),
(41, 1, 'paneer butter new', 12, 'pieces', 1, 0, '', '2023-12-26 14:19:09', 'tet'),
(42, 1, 'paneer butter', 12, 'piece', 2, 0, '', '2023-12-26 14:20:30', 'this is it');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_menu_quantity`
--

CREATE TABLE `vendor_menu_quantity` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `measure` enum('piece','pieces','grams','oz','mL','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_menu_quantity`
--

INSERT INTO `vendor_menu_quantity` (`id`, `item_id`, `quantity`, `measure`) VALUES
(1, 24, 2, 'piece'),
(2, 25, 2, 'piece'),
(3, 26, 2, 'piece'),
(4, 27, 2, 'piece'),
(5, 27, 3, 'piece'),
(6, 27, 3, 'piece'),
(7, 27, 3, 'piece'),
(11, 30, 2, 'pieces'),
(12, 30, 3, 'pieces'),
(13, 30, 4, 'pieces'),
(14, 31, 2, 'piece'),
(15, 31, 3, 'piece'),
(16, 31, 4, 'piece'),
(17, 31, 5, 'piece'),
(22, 33, 2, 'piece'),
(23, 33, 3, 'piece'),
(24, 33, 4, 'piece'),
(25, 33, 5, 'piece'),
(26, 34, 2, 'piece'),
(27, 34, 3, 'piece'),
(28, 34, 4, 'piece'),
(29, 34, 5, 'piece'),
(44, 35, 2, 'piece'),
(45, 35, 3, 'piece'),
(46, 35, 3, 'piece'),
(47, 36, 12, 'piece'),
(48, 37, 2, 'piece'),
(49, 38, 2, 'piece'),
(59, 39, 12, 'piece'),
(60, 40, 12, 'piece'),
(61, 41, 12, 'piece'),
(64, 42, 12, 'piece'),
(69, 32, 2, 'piece'),
(70, 32, 3, 'piece'),
(71, 32, 4, 'piece'),
(72, 32, 5, 'piece'),
(76, 29, 1, 'piece'),
(77, 29, 2, 'piece'),
(78, 29, 3, 'piece');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package`
--

CREATE TABLE `vendor_package` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `vendor_location_id` int(11) NOT NULL COMMENT 'from vendor_locations table. This column determines which cities this package is delivered to.',
  `plan_id` int(11) NOT NULL,
  `package_name` varchar(256) NOT NULL,
  `package_description` text DEFAULT NULL,
  `price_daily` float DEFAULT NULL,
  `price_weekly` float NOT NULL,
  `price_monthly` float NOT NULL,
  `tax_percent` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `pause` int(11) NOT NULL,
  `delivery` int(11) NOT NULL,
  `delivery_price` float NOT NULL,
  `delivery_schedule_start` time NOT NULL,
  `delivery_schedule_end` time NOT NULL,
  `pickup` int(11) NOT NULL,
  `pickup_price` int(11) NOT NULL,
  `pickup_schedule_start` time NOT NULL,
  `pickup_schedule_end` time NOT NULL,
  `mon` int(11) NOT NULL,
  `tue` int(11) NOT NULL,
  `wed` int(11) NOT NULL,
  `thu` int(11) NOT NULL,
  `fri` int(11) NOT NULL,
  `sat` int(11) NOT NULL,
  `sun` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package`
--

INSERT INTO `vendor_package` (`id`, `vendor_id`, `vendor_location_id`, `plan_id`, `package_name`, `package_description`, `price_daily`, `price_weekly`, `price_monthly`, `tax_percent`, `created_date`, `pause`, `delivery`, `delivery_price`, `delivery_schedule_start`, `delivery_schedule_end`, `pickup`, `pickup_price`, `pickup_schedule_start`, `pickup_schedule_end`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`) VALUES
(1, 1, 0, 0, 'Package 1', NULL, 250, 0, 0, 11, '2023-10-14 21:34:54', 0, 1, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 1, 1, 1, 1, 1, 0, 0),
(2, 2, 0, 0, 'Package 4', NULL, 240, 0, 0, 13, '2023-10-14 21:34:54', 0, 1, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 1, 1, 1, 1, 1, 0, 0),
(3, 1, 0, 0, 'Package 3', NULL, 230, 0, 0, 13, '2023-10-14 21:34:54', 0, 1, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 1, 1, 1, 1, 1, 0, 0),
(4, 1, 1, 1, 'nknkjnkjn', 'knkjnkjnjknjk', 0, 0, 0, 0, '2023-12-04 16:11:30', 0, 0, 0, '09:15:00', '09:00:00', 0, 0, '09:15:00', '09:30:00', 0, 0, 0, 0, 0, 0, 0),
(5, 1, 1, 1, 'nknkjnkjn', 'knkjnkjnjknjk', 0, 0, 0, 0, '2023-12-04 16:12:33', 0, 0, 0, '09:15:00', '09:00:00', 0, 0, '09:15:00', '09:30:00', 0, 0, 0, 0, 0, 0, 0),
(6, 1, 1, 1, 'jnjjnj', 'njnjnjnjnjn', 0, 0, 0, 0, '2023-12-04 17:03:58', 0, 0, 0, '10:45:00', '10:00:00', 0, 0, '09:45:00', '09:45:00', 0, 1, 0, 1, 0, 1, 0),
(7, 1, 1, 1, 'nnjnkjnknk', 'nkjnkjnknnkj', 0, 0, 0, 0, '2023-12-04 17:46:19', 0, 0, 0, '10:30:00', '11:30:00', 0, 0, '11:00:00', '11:30:00', 0, 1, 0, 0, 1, 0, 0),
(8, 1, 1, 1, 'nkjnkj', 'njkjnkjnjk', 0, 0, 0, 0, '2023-12-04 17:50:17', 0, 0, 0, '10:45:00', '11:15:00', 0, 0, '10:00:00', '10:45:00', 0, 1, 0, 1, 0, 1, 1),
(9, 1, 1, 1, 'nkjnkj', 'njkjnkjnjk', 0, 0, 0, 0, '2023-12-04 18:11:44', 0, 0, 0, '10:45:00', '11:15:00', 0, 0, '10:00:00', '10:45:00', 0, 1, 0, 1, 0, 1, 1),
(10, 1, 1, 1, 'nkjnkj', 'njkjnkjnjk', 0, 0, 0, 0, '2023-12-04 18:14:17', 0, 0, 0, '10:45:00', '11:15:00', 0, 0, '10:00:00', '10:45:00', 0, 1, 0, 1, 0, 1, 1),
(11, 1, 1, 1, 'nkjnkj', 'njkjnkjnjk', 0, 0, 0, 0, '2023-12-04 18:26:17', 0, 0, 0, '10:45:00', '11:15:00', 0, 0, '10:00:00', '10:45:00', 0, 1, 0, 1, 0, 1, 1),
(12, 1, 1, 1, 'nkjnkj', 'njkjnkjnjk', 0, 0, 0, 0, '2023-12-04 18:30:53', 0, 0, 0, '10:45:00', '11:15:00', 0, 0, '10:00:00', '10:45:00', 0, 1, 0, 1, 0, 1, 1),
(13, 1, 1, 1, 'nknknkjn knkjnjn', 'njnkjnknkj nkjnkjnkj', 0, 0, 0, 0, '2023-12-05 13:18:06', 0, 0, 0, '06:45:00', '06:15:00', 0, 0, '06:00:00', '06:30:00', 0, 1, 0, 1, 0, 0, 1),
(14, 1, 1, 1, 'Package new', 'we deliver special food on every day', 10, 110, 210, 0, '2023-12-05 13:21:25', 0, 0, 0, '00:00:00', '00:00:00', 1, 0, '12:30:00', '12:45:00', 1, 1, 0, 1, 0, 1, 0),
(15, 1, 1, 1, 'nknknkjn knkjnjn', 'njnkjnknkj nkjnkjnkj', 0, 0, 0, 0, '2023-12-05 14:56:42', 0, 0, 0, '06:15:00', '06:45:00', 0, 0, '06:00:00', '06:30:00', 0, 1, 0, 1, 0, 0, 0),
(17, 1, 1, 1, 'njnjnjnj', 'njkjnjnjnj2222', NULL, 0, 0, 0, '2023-12-10 17:30:08', 0, 0, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 0, 0, 0, 0, 0, 0, 0),
(18, 1, 1, 1, 'njnjnjnj', 'njkjnjnjnj2222', NULL, 0, 0, 0, '2023-12-10 17:31:44', 0, 0, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 0, 0, 0, 0, 0, 0, 0),
(19, 1, 1, 1, 'njnjnj1', 'jjnjqnjqn2', NULL, 0, 0, 0, '2023-12-10 17:32:10', 0, 0, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 0, 0, 0, 0, 0, 0, 0),
(20, 1, 1, 1, 'njnjnj1', 'jjnjqnjqn2', NULL, 0, 0, 0, '2023-12-10 17:32:28', 0, 0, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 0, 0, 0, 0, 0, 0, 0),
(21, 1, 1, 1, 'njnjn55', 'jnjn7777', NULL, 0, 0, 0, '2023-12-10 17:32:46', 1, 0, 0, '00:00:00', '00:00:00', 0, 0, '00:00:00', '00:00:00', 0, 1, 0, 1, 0, 1, 0),
(22, 1, 1, 1, 'package 19', 'free of cost', NULL, 0, 0, 0, '2023-12-12 14:37:18', 0, 1, 0, '08:15:00', '08:00:00', 1, 0, '07:15:00', '07:00:00', 1, 0, 1, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package_category_settings`
--

CREATE TABLE `vendor_package_category_settings` (
  `id` int(11) NOT NULL COMMENT 'This table provides settings for each package. Eg How many curries can a user choose from the curries category. How many sides can the user choose etc.',
  `package_id` int(11) NOT NULL,
  `package_name` varchar(111) NOT NULL,
  `category_id` int(11) NOT NULL,
  `category_name` varchar(111) NOT NULL,
  `max_selections` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package_category_settings`
--

INSERT INTO `vendor_package_category_settings` (`id`, `package_id`, `package_name`, `category_id`, `category_name`, `max_selections`, `vendor_id`) VALUES
(1, 1, 'Package 1', 1, 'Curries', 3, 1),
(2, 1, 'Package 1', 2, 'Breads', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package_cities`
--

CREATE TABLE `vendor_package_cities` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL COMMENT 'vendor_package table',
  `city_id` int(11) NOT NULL COMMENT 'Which cities the package is offered in'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package_cities`
--

INSERT INTO `vendor_package_cities` (`id`, `package_id`, `city_id`) VALUES
(1, 1, 2),
(2, 2, 4),
(3, 1, 7),
(5, 14, 9),
(6, 14, 11),
(9, 14, 14),
(10, 14, 8),
(11, 1, 0),
(12, 1, 16),
(15, 0, 6),
(16, 22, 3),
(17, 22, 8),
(19, 14, 4);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package_default_items`
--

CREATE TABLE `vendor_package_default_items` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `item_name` varchar(256) NOT NULL,
  `item_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package_default_items`
--

INSERT INTO `vendor_package_default_items` (`id`, `package_id`, `item_name`, `item_id`, `status`) VALUES
(1, 14, 'Daal - 8oz', 36, 1),
(2, 14, 'Vegetable - 8oz', 4, 1),
(3, 14, 'Fish - 8oz', 29, 1),
(14, 22, 'jnjnjn', 33, 1),
(15, 21, 'njnjnjnj', 35, 1),
(16, 14, 'test', 37, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package_frequency`
--

CREATE TABLE `vendor_package_frequency` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `frequency_name` varchar(255) NOT NULL,
  `meals_total` int(11) NOT NULL,
  `days_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package_frequency`
--

INSERT INTO `vendor_package_frequency` (`id`, `package_id`, `vendor_id`, `frequency_name`, `meals_total`, `days_total`) VALUES
(1, 1, 1, 'Trial', 1, 1),
(2, 1, 1, 'Weekly', 6, 6),
(3, 1, 1, 'Monthly', 22, 22);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package_menu_items`
--

CREATE TABLE `vendor_package_menu_items` (
  `id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `menu_item_name` varchar(111) NOT NULL COMMENT 'temporary column for reference only	',
  `menu_default_group_id` int(11) DEFAULT NULL,
  `package_id` int(11) NOT NULL,
  `package_name` varchar(111) NOT NULL COMMENT 'temporary column for reference only',
  `quantity` int(11) NOT NULL,
  `menu_date` date NOT NULL,
  `sort_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package_menu_items`
--

INSERT INTO `vendor_package_menu_items` (`id`, `menu_item_id`, `menu_item_name`, `menu_default_group_id`, `package_id`, `package_name`, `quantity`, `menu_date`, `sort_id`) VALUES
(1, 6, 'Paneer Kadai (pulled from vendor_menu_items table)', 0, 6, 'Silver Package', 0, '2023-10-20', 1),
(2, 7, 'Bhindi Masala', 0, 6, 'Silver Package', 0, '2023-10-20', 2),
(8, 5, 'Daal Makhni', 1, 14, 'Package new', 1, '2023-12-10', 0),
(9, 7, 'Bhindi Masala', 2, 14, 'Package new', 1, '2023-12-12', 1),
(10, 1, 'Roti', 1, 14, 'Package new', 8, '2023-12-11', 0),
(11, 10, 'Gulab Jamun', 8, 14, 'Package new', 1, '2023-12-14', 4),
(12, 31, 'paneer butter', 3, 14, 'Package new', 14, '2023-12-12', 4),
(13, 1, 'Roti', 0, 14, 'Package new', 8, '2023-12-14', 0),
(14, 7, 'Bhindi Masala', 3, 14, 'Package new', 1, '2023-12-17', 4),
(15, 3, 'Rice', 3, 14, 'Package new', 8, '2024-01-01', 4),
(16, 5, 'Daal Makhni', 3, 14, 'Package new', 1, '2024-01-06', 3),
(17, 39, 'paneer chicken', 2, 14, 'Package new', 12, '2024-01-01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_package_price`
--

CREATE TABLE `vendor_package_price` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `frequency` enum('single','weekly','monthly') NOT NULL,
  `method` enum('pickup','delivery') NOT NULL,
  `cost` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_package_price`
--

INSERT INTO `vendor_package_price` (`id`, `package_id`, `frequency`, `method`, `cost`) VALUES
(19, 14, 'weekly', 'delivery', 23),
(20, 14, 'monthly', 'delivery', 24),
(21, 14, 'weekly', 'pickup', 34),
(22, 14, 'monthly', 'pickup', 16),
(23, 1, 'weekly', 'delivery', 76),
(24, 1, 'monthly', 'delivery', 87),
(25, 1, 'weekly', 'pickup', 45),
(26, 1, 'monthly', 'pickup', 45),
(27, 21, '', 'delivery', 12),
(28, 21, 'weekly', 'delivery', 122),
(29, 21, 'monthly', 'delivery', 123),
(56, 22, 'single', 'delivery', 98),
(57, 22, 'weekly', 'delivery', 89),
(58, 22, 'monthly', 'delivery', 88),
(59, 22, 'single', 'pickup', 67),
(60, 22, 'weekly', 'pickup', 67),
(61, 22, 'monthly', 'pickup', 66);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_payment_methods`
--

CREATE TABLE `vendor_payment_methods` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `instructions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_payment_methods`
--

INSERT INTO `vendor_payment_methods` (`id`, `vendor_id`, `payment_method_id`, `instructions`) VALUES
(1, 1, 1, 'Please send e-Transfer to pay@tiffinbox.com\r\nOrder marked as Paid once the payment is made.'),
(2, 1, 2, 'Please make credit card payment. \r\nOrder marked as Paid once the payment is made.');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_settings`
--

CREATE TABLE `vendor_settings` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `vendor_name` varchar(111) NOT NULL,
  `stripe_key` text NOT NULL,
  `pause_option` int(11) NOT NULL,
  `menu_option` int(11) NOT NULL,
  `delivery_option` int(11) NOT NULL,
  `pickup_option` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_settings`
--

INSERT INTO `vendor_settings` (`id`, `vendor_id`, `vendor_name`, `stripe_key`, `pause_option`, `menu_option`, `delivery_option`, `pickup_option`) VALUES
(1, 1, '0', 'str392839281029', 0, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities_active`
--
ALTER TABLE `cities_active`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities_all`
--
ALTER TABLE `cities_all`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_customer`
--
ALTER TABLE `coupon_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_delivery_address`
--
ALTER TABLE `customer_delivery_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_location`
--
ALTER TABLE `customer_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_orders`
--
ALTER TABLE `customer_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_order_items`
--
ALTER TABLE `customer_order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_package`
--
ALTER TABLE `customer_package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_package_delivery_address`
--
ALTER TABLE `customer_package_delivery_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_factors`
--
ALTER TABLE `review_factors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_factor_user`
--
ALTER TABLE `review_factor_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_user`
--
ALTER TABLE `review_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_customer`
--
ALTER TABLE `user_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_vendor`
--
ALTER TABLE `user_vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_cities`
--
ALTER TABLE `vendor_cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_customer`
--
ALTER TABLE `vendor_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_customer_link`
--
ALTER TABLE `vendor_customer_link`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_locations`
--
ALTER TABLE `vendor_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_menu_items`
--
ALTER TABLE `vendor_menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_menu_quantity`
--
ALTER TABLE `vendor_menu_quantity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package`
--
ALTER TABLE `vendor_package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package_category_settings`
--
ALTER TABLE `vendor_package_category_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package_cities`
--
ALTER TABLE `vendor_package_cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package_default_items`
--
ALTER TABLE `vendor_package_default_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package_frequency`
--
ALTER TABLE `vendor_package_frequency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package_menu_items`
--
ALTER TABLE `vendor_package_menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_package_price`
--
ALTER TABLE `vendor_package_price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_payment_methods`
--
ALTER TABLE `vendor_payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_settings`
--
ALTER TABLE `vendor_settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cities_active`
--
ALTER TABLE `cities_active`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `cities_all`
--
ALTER TABLE `cities_all`
  MODIFY `id` smallint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1625;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupon_customer`
--
ALTER TABLE `coupon_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_delivery_address`
--
ALTER TABLE `customer_delivery_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_location`
--
ALTER TABLE `customer_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_orders`
--
ALTER TABLE `customer_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `customer_order_items`
--
ALTER TABLE `customer_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `customer_package`
--
ALTER TABLE `customer_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `customer_package_delivery_address`
--
ALTER TABLE `customer_package_delivery_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `review_factors`
--
ALTER TABLE `review_factors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `review_factor_user`
--
ALTER TABLE `review_factor_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `review_user`
--
ALTER TABLE `review_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_customer`
--
ALTER TABLE `user_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_vendor`
--
ALTER TABLE `user_vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'This table is for employees who work for the vendor', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendor_cities`
--
ALTER TABLE `vendor_cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'this table determines what cities a vendor''s location serves. Pull/post cities from cities_all table';

--
-- AUTO_INCREMENT for table `vendor_customer`
--
ALTER TABLE `vendor_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendor_customer_link`
--
ALTER TABLE `vendor_customer_link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendor_locations`
--
ALTER TABLE `vendor_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_menu_items`
--
ALTER TABLE `vendor_menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `vendor_menu_quantity`
--
ALTER TABLE `vendor_menu_quantity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `vendor_package`
--
ALTER TABLE `vendor_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `vendor_package_category_settings`
--
ALTER TABLE `vendor_package_category_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'This table provides settings for each package. Eg How many curries can a user choose from the curries category. How many sides can the user choose etc.', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendor_package_cities`
--
ALTER TABLE `vendor_package_cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vendor_package_default_items`
--
ALTER TABLE `vendor_package_default_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vendor_package_frequency`
--
ALTER TABLE `vendor_package_frequency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vendor_package_menu_items`
--
ALTER TABLE `vendor_package_menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vendor_package_price`
--
ALTER TABLE `vendor_package_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `vendor_payment_methods`
--
ALTER TABLE `vendor_payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendor_settings`
--
ALTER TABLE `vendor_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
