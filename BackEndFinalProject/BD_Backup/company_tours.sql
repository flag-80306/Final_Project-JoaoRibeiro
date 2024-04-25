/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - company_tours
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`company_tours` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `company_tours`;

/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `Booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `Tour_id` int(11) NOT NULL,
  `Booking_date` date NOT NULL,
  `Guide_id` int(11) NOT NULL,
  `Client_id` int(11) NOT NULL,
  `final_price` decimal(7,0) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Booking_id`),
  KEY `Guide_id` (`Guide_id`),
  KEY `Client_id` (`Client_id`),
  KEY `bookings_ibfk_3` (`Tour_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`Guide_id`) REFERENCES `guides` (`Guide_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`Client_id`) REFERENCES `clients` (`Client_id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`Tour_id`) REFERENCES `tours` (`Tour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bookings` */

/*Table structure for table `clients` */

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `Client_id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`Client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `clients` */

/*Table structure for table `guides` */

DROP TABLE IF EXISTS `guides`;

CREATE TABLE `guides` (
  `Guide_id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Tour_id` int(11) NOT NULL,
  `Picture` varchar(255) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Guide_id`),
  KEY `Tour_id` (`Tour_id`),
  CONSTRAINT `guides_ibfk_1` FOREIGN KEY (`Tour_id`) REFERENCES `tours` (`Tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `guides` */

insert  into `guides`(`Guide_id`,`Username`,`Password`,`Tour_id`,`Picture`,`Created_at`,`Updated_at`) values 
(4,'joao','12345',1,'none','2024-04-25 17:41:01','2024-04-25 17:46:36'),
(5,'pedro','12345',2,'none','2024-04-25 17:41:31','2024-04-25 17:46:38');

/*Table structure for table `reviews` */

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `Review_id` int(11) NOT NULL AUTO_INCREMENT,
  `Booking_id` int(11) NOT NULL,
  `Client_id` int(11) NOT NULL,
  `Tour_id` int(11) NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `Stars` decimal(1,0) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `reviews` */

/*Table structure for table `shopping_cart` */

DROP TABLE IF EXISTS `shopping_cart`;

CREATE TABLE `shopping_cart` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Tour_id` int(11) NOT NULL,
  `Group_size` int(2) NOT NULL,
  `Final_price` decimal(7,0) NOT NULL,
  `Client_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Client_id` (`Client_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`Client_id`) REFERENCES `clients` (`Client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `shopping_cart` */

/*Table structure for table `tours` */

DROP TABLE IF EXISTS `tours`;

CREATE TABLE `tours` (
  `Tour_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) NOT NULL,
  `Location` enum('Amarante','Porto','Marão''s Mountain','Douro Valley','Tâmega River') NOT NULL,
  `Latitude` varchar(11) NOT NULL,
  `Longitude` varchar(11) NOT NULL,
  `Description` text NOT NULL,
  `price_person` decimal(7,0) NOT NULL,
  `review_id` varchar(255) DEFAULT NULL,
  `Guide_id` int(11) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Tour_id`),
  KEY `Guide_id` (`Guide_id`),
  CONSTRAINT `tours_ibfk_1` FOREIGN KEY (`Guide_id`) REFERENCES `guides` (`Guide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tours` */

insert  into `tours`(`Tour_id`,`Name`,`Location`,`Latitude`,`Longitude`,`Description`,`price_person`,`review_id`,`Guide_id`,`images`,`Created_at`,`Updated_at`) values 
(1,'Inside Amarante','Amarante','41.268846','-8.078793','Immerse yourself in the rich history the emblematic and romantic city of Amarante, where you can breathe history and discover a unique heritage with monuments and distinct personalities. These city tours include the tasting of conventual sweets.\",\r\n			\"cardImage\": {',22,NULL,4,'none','2024-04-25 17:42:11','2024-04-25 17:43:22'),
(2,'Inside Marão','Marão\'s Mountain','41.24824451','-7.88720328','Inside Marão will deflower a heritage made up of beautiful forest spots, we will explore the highest places with breathtaking landscapes and passing by the Nossa Senhora de Moreira viewpoint, where we feel insignificant such is the beauty and the vastness of everything that we surrounds.',75,NULL,5,NULL,'2024-04-25 17:44:28','2024-04-25 17:44:28');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
