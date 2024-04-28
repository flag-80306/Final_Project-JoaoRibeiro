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
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `final_price` decimal(10,2) NOT NULL,
  `booking_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`booking_id`),
  KEY `Guide_id` (`guide_id`),
  KEY `Client_id` (`client_id`),
  KEY `bookings_ibfk_3` (`tour_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`Guide_id`) REFERENCES `guides` (`Guide_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`Client_id`) REFERENCES `clients` (`Client_id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`Tour_id`) REFERENCES `tours` (`Tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bookings` */

insert  into `bookings`(`booking_id`,`tour_id`,`guide_id`,`client_id`,`final_price`,`booking_date`,`created_at`,`updated_at`) values 
(2,1,5,5,66.00,'2024-05-03','2024-04-28 22:45:06','2024-04-28 22:45:06'),
(3,4,12,8,56.00,'2024-08-01','2024-04-28 23:27:04',NULL),
(4,6,10,6,100.00,'2024-06-10','2024-04-28 23:32:23','2024-04-28 23:36:57'),
(5,7,6,4,180.00,'2024-06-01','2024-04-28 23:34:30',NULL);

/*Table structure for table `clients` */

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `tin` decimal(15,0) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `city` varchar(75) NOT NULL,
  `country` varchar(75) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `clients` */

insert  into `clients`(`client_id`,`client_username`,`password`,`tin`,`client_name`,`email`,`city`,`country`,`created_at`,`updated_at`) values 
(1,'helder_1','12345',335698745,'helder morais','helder@morais.pt','mafamude','portugal','2024-04-28 14:25:30','2024-04-28 14:50:55'),
(2,'diogo_2','18956',365978456,'diogo pinheiro','diogo@pinheiro.pt','aveiro','portugal','2024-04-28 14:25:33','2024-04-28 14:52:25'),
(3,'client_3','78965',0,'bruno','','','','2024-04-28 14:25:36','2024-04-28 14:26:26'),
(4,'client_4','13698',0,'rui','','','','2024-04-28 14:25:38','2024-04-28 14:26:36'),
(5,'daniel_5','58963',228888888,'daniel oliveira','daniel@oliveira.pt','london','uk','2024-04-28 14:25:41','2024-04-28 16:05:58'),
(6,'client_6','36987',0,'rodrigo','','','','2024-04-28 14:25:47','2024-04-28 14:26:49'),
(7,'tiago_7','58963',987456325,'tiago moreira','tiago@moreira.pt','torres vedras','portugal','2024-04-28 14:26:54','2024-04-28 14:53:48'),
(8,'joao_8','58963',225897878,'joao files','joao@files.pt','amaranthus','portucalense','2024-04-28 14:27:09','2024-04-28 14:55:04'),
(9,'client_9','36987',0,'wander','','','','2024-04-28 14:27:13','2024-04-28 14:28:15');

/*Table structure for table `guides` */

DROP TABLE IF EXISTS `guides`;

CREATE TABLE `guides` (
  `guide_id` int(11) NOT NULL AUTO_INCREMENT,
  `guide_username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `guide_name` varchar(25) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`guide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `guides` */

insert  into `guides`(`guide_id`,`guide_username`,`password`,`guide_name`,`picture`,`created_at`,`updated_at`) values 
(4,'joao','12345','joao pedro','none','2024-04-25 17:41:01','2024-04-28 00:22:55'),
(5,'files','12345','files marao','one more','2024-04-25 17:41:31','2024-04-28 15:49:52'),
(6,'lili','12345','liliana','none','2024-04-28 00:13:05','2024-04-28 00:21:00'),
(7,'sofy','12345','sofia ribeiro','none','2024-04-28 00:13:41','2024-04-28 00:22:09'),
(8,'gaby','12345','gabriel malandro','none','2024-04-28 00:14:01','2024-04-28 00:21:49'),
(10,'jony','12345','joao velho','none','2024-04-28 00:14:36',NULL),
(11,'mary','12345','maria velho','none','2024-04-28 00:15:57','2024-04-28 00:21:26'),
(12,'adao','12345','adao silva','none','2024-04-28 00:16:37',NULL),
(13,'bano','12345','americo ribeiro','none','2024-04-28 00:17:15',NULL);

/*Table structure for table `reviews` */

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `stars` decimal(1,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `reviews` */

/*Table structure for table `shopping_cart` */

DROP TABLE IF EXISTS `shopping_cart`;

CREATE TABLE `shopping_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `group_size` int(2) NOT NULL,
  `final_price` decimal(7,0) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Client_id` (`client_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`Client_id`) REFERENCES `clients` (`Client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `shopping_cart` */

/*Table structure for table `tours` */

DROP TABLE IF EXISTS `tours`;

CREATE TABLE `tours` (
  `tour_id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_name` varchar(150) NOT NULL,
  `location` varchar(100) NOT NULL,
  `latitude` varchar(20) NOT NULL,
  `longitude` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `duration` int(8) NOT NULL,
  `price_person` decimal(10,2) NOT NULL,
  `review_id` varchar(255) DEFAULT NULL,
  `images` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tours` */

insert  into `tours`(`tour_id`,`tour_name`,`location`,`latitude`,`longitude`,`description`,`duration`,`price_person`,`review_id`,`images`,`created_at`,`updated_at`) values 
(1,'Inside Amarante','Amarante','41.268846','-8.078793','Immerse yourself in the rich history the emblematic and romantic city of Amarante, where you can breathe history and discover a unique heritage with monuments and distinct personalities. These city tours include the tasting of conventual sweets.\",\r\n			\"cardImage\": {',2,22.00,NULL,'none','2024-04-25 17:42:11','2024-04-26 00:06:50'),
(2,'Inside Marão','Marão','41.24824451','-7.88720328','Inside Marão will deflower a heritage made up of beautiful forest spots, we will explore the highest places with breathtaking landscapes and passing by the Nossa Senhora de Moreira viewpoint, where we feel insignificant such is the beauty and the vastness of everything that we surrounds.',5,75.00,NULL,'sim','2024-04-25 17:44:28','2024-04-26 00:06:54'),
(3,'Inside Kayak','Amarante','41.273863','-8.07298','In this Kayak Tour in Tâmega River you will enjoy all the nature, fresh air, quiet and relax places and a beautiful landscape in a very easy track in quiet and calm waters.This tour is perfect for families and groups of friends! We are waiting for you!',1,22.00,NULL,'TOTO','2024-04-26 00:02:28','2024-04-26 00:08:04'),
(4,'Inside Hiking','Amarante','41.248655','-7.954069','Explore the nature in a tailor-made hike with distance and difficulty adjusted to your needs. Hike along the trails that make their way through secret places in the mountain and be dazzled by the landscape and traditions that  we will found.',3,28.00,NULL,'fuuuu','2024-04-26 00:10:12',NULL),
(5,'Inside Kayak','Amarante','41.273863','-8.07298','In this Kayak Tour in Tâmega River you will enjoy all the nature, fresh air, quiet and relax places and a beautiful landscape in a very easy track in quiet and calm waters.This tour is perfect for families and groups of friends! We are waiting for you!',1,20.00,NULL,'for me','2024-04-27 17:27:52',NULL),
(6,'Inside Kayak','Amarante','41.273863','-8.07298','In this Kayak Tour in Tâmega River you will enjoy all the nature, fresh air, quiet and relax places and a beautiful landscape in a very easy track in quiet and calm waters.This tour is perfect for families and groups of friends! We are waiting for you!',1,20.00,NULL,'for me','2024-04-27 17:28:54',NULL),
(7,'Inside Romanesque','Lousada','41.278601','-8.28327','The tour through the flavors and stories of the Romanesque will take you to visit the center of the Route of the Romanesque and to visit some of the most importante monuments and you cannot miss the workshop of the conventual pastry in the city of Amarante.',3,45.00,NULL,'for you','2024-04-27 17:32:04','2024-04-27 18:30:35'),
(8,'Inside Douro Valley','Douro Valley','41.189610','-7.545911','Private tour to Douro Valley with vinho do Porto, landscape and lots of Fun',8,120.00,NULL,'for all','2024-04-27 17:32:52','2024-04-27 18:21:56');

/*Table structure for table `tours_guides` */

DROP TABLE IF EXISTS `tours_guides`;

CREATE TABLE `tours_guides` (
  `tour_id` int(11) NOT NULL,
  `guides_id` int(11) NOT NULL,
  PRIMARY KEY (`tour_id`,`guides_id`),
  KEY `guides_id` (`guides_id`),
  CONSTRAINT `tours_guides_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`tour_id`),
  CONSTRAINT `tours_guides_ibfk_2` FOREIGN KEY (`guides_id`) REFERENCES `guides` (`guide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tours_guides` */

insert  into `tours_guides`(`tour_id`,`guides_id`) values 
(1,4),
(1,5),
(2,6),
(2,8),
(3,11),
(4,8),
(5,8),
(5,13),
(6,10),
(7,6),
(8,7);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
