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

/*Table structure for table `admin_login` */

DROP TABLE IF EXISTS `admin_login`;

CREATE TABLE `admin_login` (
  `manager_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `manager_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin_login` */

insert  into `admin_login`(`manager_id`,`email`,`password`,`manager_name`,`created_at`,`updated_at`) values 
(1,'joao@ribeiro.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8','João Ribeiro','2024-05-10 23:07:40','2024-05-12 02:33:14'),
(2,'sofia@ribeiro.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8','Sofia Ribeiro','2024-05-10 23:08:28','2024-05-12 02:33:29'),
(50,'joaquim@ribeiro.pt','$argon2id$v=19$m=65536,t=3,p=4$sse9RjYz6IC3w6BHfeWPJQ$1Nn7pmWb4kjuigFnVcLuD5tXN9sKCxGzuDVYT6xtvAs','Joaquim Ribeiro','2024-05-28 14:10:19','2024-05-28 14:10:19');

/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `people` int(3) NOT NULL,
  `final_price` decimal(10,2) NOT NULL,
  `booking_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`booking_id`),
  KEY `Guide_id` (`guide_id`),
  KEY `Client_id` (`client_id`),
  KEY `bookings_ibfk_3` (`tour_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`Guide_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`Client_id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`Tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bookings` */

/*Table structure for table `clients` */

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tin` decimal(15,0) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `city` varchar(75) NOT NULL,
  `country` varchar(75) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `clients` */

insert  into `clients`(`client_id`,`email`,`password`,`tin`,`client_name`,`city`,`country`,`created_at`,`updated_at`) values 
(18,'helder@alfaiates.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',77777777,'Helder Alfaiate','Portus Calus','Portucalense','2024-05-12 01:41:02','2024-05-28 13:57:47'),
(19,'helder@morais.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',335698745,'Helder Morais','Mafamude','Portugal','2024-05-12 01:45:07','2024-05-12 03:21:50'),
(20,'diogo@pinheiro.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',365978456,'Diogo Pinheiro','Aveiro','Portugal','2024-05-12 01:46:22','2024-05-12 03:21:51'),
(21,'bruno@carvalho.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',246785757,'Bruno de Carvalho','Paris','Portugal de França','2024-05-12 01:46:52','2024-05-12 03:21:52'),
(22,'rui@carvalho.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',568435678,'Rui Carvalho','Vila Real','Portugal','2024-05-12 01:47:30','2024-05-12 18:06:19'),
(23,'daniel@oliveira.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',228888888,'Daniel Oliveira','London','UK','2024-05-12 01:47:52','2024-05-12 03:21:55'),
(25,'tiago@moreira.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',987456325,'Tiago Moreira','Torres Vedras','Portugal','2024-05-12 01:49:46','2024-05-12 03:21:57'),
(26,'joao@files.pt','$argon2id$v=19$m=65536,t=3,p=4$Deaac3I9YqOTct8811ALiw$/yksEejoG2cQMU++Z2X4KD6qKRBadynM7WtOIieU7Bs',555555555,'João Files','Amaranthus','Portucalense','2024-05-12 01:50:08','2024-05-16 00:35:14'),
(27,'wander@maravilhas.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',678904537,'Wander Maravilhas','Amadora','Portugal','2024-05-12 01:50:32','2024-05-12 03:21:58'),
(28,'pedro@farinhas.pt','$argon2id$v=19$m=65536,t=3,p=4$jwIO87Op/I7OgsBZEDHNvw$qhu1nsRJX+3lVYB9vZ4tfeYgmUd2SU0hGEnUuzxTsp8',132467890,'Pedro Farinhas','Beja','Portugal','2024-05-12 01:50:58','2024-05-12 03:22:00'),
(33,'alberto@malheiro.pt','$argon2id$v=19$m=65536,t=3,p=4$AXV+tfab44hClcs6VWkYLQ$uMkIFfrB91cr9N8SzrzrjKikjjxlk5zfIoM3i6ivtv4',225879658,'Alberto Malheiro','Porto','Espanha','2024-05-20 20:41:51',NULL),
(36,'tiago@pingado.pt','$argon2id$v=19$m=65536,t=3,p=4$bKJr+MHNGFRg/Up9u4w4kA$Y/25/S7TmUJ01L4pQa/8N6bn4Oo7uZNQvGvxUq5V370',888888888,'Tiago Pingado','Braga','Portugalia','2024-05-21 13:18:16',NULL),
(43,'super@homem.com','$argon2id$v=19$m=65536,t=3,p=4$7i+s+fuZhmne4tEhMJMN4Q$PuAFZiInBiR3B43IIip17grNWBU715dWJMRxJ6znv+8',888888888,'Super homem','Las Vegas','USA','2024-05-24 22:37:51',NULL),
(44,'bat@man.com','$argon2id$v=19$m=65536,t=3,p=4$SqOWOvqUiVA5lnAFDXRUxg$nQbOOhLAjngiRAdwpwpnAKbnBhx2nOJqW4Ao9R+yyyY',999999999,'Batman','Panama','Panama','2024-05-24 22:39:33',NULL),
(46,'alberto@martim.pt','$argon2id$v=19$m=65536,t=3,p=4$Fw0VQQJkr1OQ4iSnf65Vpg$q6uBsA9EKr6leKnvb9GwK3HzctPJ5akMpwsNAE7efH8',225544789,'Alberto Ribeiro','Lisvboa','Portucalex','2024-05-27 19:20:45',NULL);

/*Table structure for table `favourite_tours` */

DROP TABLE IF EXISTS `favourite_tours`;

CREATE TABLE `favourite_tours` (
  `client_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  PRIMARY KEY (`client_id`,`tour_id`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `favourite_tours_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `favourite_tours_ibfk_2` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`tour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `favourite_tours` */

insert  into `favourite_tours`(`client_id`,`tour_id`) values 
(18,1),
(18,2),
(19,3),
(20,3),
(21,3),
(23,1),
(23,2),
(26,1),
(27,4),
(28,4);

/*Table structure for table `guides` */

DROP TABLE IF EXISTS `guides`;

CREATE TABLE `guides` (
  `guide_id` int(11) NOT NULL AUTO_INCREMENT,
  `guide_name` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`guide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `guides` */

insert  into `guides`(`guide_id`,`guide_name`,`description`,`picture`,`created_at`,`updated_at`) values 
(4,'João Pedro','Leads groups through city landmarks, sharing historical facts, anecdotes, and local tips to enhance the urban exploration experience.','/img/guides/joao.png','2024-04-25 17:41:01','2024-05-21 18:14:16'),
(5,'Files Marao','Specializes in outdoor adventures like hiking, rafting, and climbing. Ensures safety while providing thrilling experiences and insights into nature.','/img/guides/files.png','2024-04-25 17:41:31','2024-05-21 18:14:17'),
(6,'Liliana Maria','Expert in local customs, traditions, and heritage. Offers unique insights into art, music, and cultural practices, connecting visitors with the community\'s soul.','/img/guides/lili.png','2024-04-28 00:13:05','2024-05-21 18:14:17'),
(7,'Sofia Ribeiro','Brings history to life with detailed stories and context. Takes visitors through ancient sites, explaining the significance and impact of past events.','/img/guides/sofy.png','2024-04-28 00:13:41','2024-05-21 18:25:07'),
(8,'Gabriel Malandro','Leads culinary tours, introducing visitors to local cuisine, markets, and food history. Shares unique flavors and culinary techniques.','/img/guides/gaby.png','2024-04-28 00:14:01','2024-05-21 18:25:08'),
(10,'Joao Velhote','Provides detailed tours through museum exhibits, explaining the context and significance of the artifacts. Engages visitors with interactive discussions and storytelling.','/img/guides/jony.png','2024-04-28 00:14:36','2024-05-21 18:25:09'),
(11,'Maria Velho','Focuses on wildlife and conservation. Guides visitors through natural habitats, pointing out animal behavior and explaining ecological balance.','/img/guides/mary.png','2024-04-28 00:15:57','2024-05-21 18:25:11'),
(12,'Adao Silva','Specializes in photography tours, helping visitors capture stunning images while exploring scenic locations. Offers tips on angles, lighting, and composition.','/img/guides/adao.png','2024-04-28 00:16:37','2024-05-21 18:25:22'),
(13,'Fanhoso Silva','Leads culinary tours, introducing visitors to local cuisine, markets, and food history. Shares unique flavors and culinary techniques.','/img/guides/gaby.png','2024-04-28 00:17:15','2024-05-21 18:25:24'),
(25,'Americo Ribeiro','Leads tours through vineyards and wineries. Explains the wine-making process, organizes tastings, and shares insights into local wine culture.','/img/guides/bano.png','2024-05-21 15:49:27','2024-05-21 18:25:30');

/*Table structure for table `reviews` */

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `review` int(2) NOT NULL,
  PRIMARY KEY (`id`,`tour_id`,`client_id`,`review`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `reviews` */

/*Table structure for table `tours` */

DROP TABLE IF EXISTS `tours`;

CREATE TABLE `tours` (
  `tour_id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_name` varchar(150) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `duration` int(8) NOT NULL,
  `price_person` decimal(10,2) NOT NULL,
  `images` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tours` */

insert  into `tours`(`tour_id`,`tour_name`,`location`,`description`,`duration`,`price_person`,`images`,`created_at`,`updated_at`) values 
(1,'Inside Amarante','Amaranthus','Immerse yourself in the rich history the emblematic and romantic city of Amarante, where you can breathe history and discover a unique heritage with monuments and distinct personalities. These city tours include the tasting of conventual sweets.',2,22.00,'/img/tours/city_2.png','2024-04-25 17:42:11','2024-05-29 14:47:11'),
(2,'Inside Marão','Marão','Inside Marão will deflower a heritage made up of beautiful forest spots, we will explore the highest places with breathtaking landscapes and passing by the Nossa Senhora de Moreira viewpoint, where we feel insignificant such is the beauty and the vastness of everything that we surrounds.',5,75.00,'/img/tours/marao_1.png','2024-04-25 17:44:28','2024-05-09 01:48:48'),
(3,'Inside Kayak','Amarante','In this Kayak Tour in Tâmega River you will enjoy all the nature, fresh air, quiet and relax places and a beautiful landscape in a very easy track in quiet and calm waters.This tour is perfect for families and groups of friends! We are waiting for you!',1,22.00,'/img/tours/kayak_2.png','2024-04-26 00:02:28','2024-05-09 01:49:02'),
(4,'Inside Hiking','Amarante','Explore the nature in a tailor-made hike with distance and difficulty adjusted to your needs. Hike along the trails that make their way through secret places in the mountain and be dazzled by the landscape and traditions that  we will found.',3,28.00,'/img/tours/hike_1.png','2024-04-26 00:10:12','2024-05-08 19:11:46'),
(5,'Inside Verde Wine','Amarante','In this Kayak Tour in Tâmega River you will enjoy all the nature, fresh air, quiet and relax places and a beautiful landscape in a very easy track in quiet and calm waters.This tour is perfect for families and groups of friends! We are waiting for you!',1,20.00,'/img/tours/verde_2.png','2024-04-27 17:27:52','2024-05-10 00:10:52'),
(6,'Inside Amadeo','Amarante','Presentation of the life and work of Amadeo de Souza Cardoso, ... \"the father of Portuguese modernism\".',3,45.00,'/img/tours/amadeo_2.png','2024-04-27 17:28:54','2024-05-29 14:47:44'),
(7,'Inside Romanesque','Lousada','The tour through the flavors and stories of the Romanesque will take you to visit the center of the Route of the Romanesque and to visit some of the most importante monuments and you cannot miss the workshop of the conventual pastry in the city of Amarante.',3,45.00,'/img/tours/romanesque_3.png','2024-04-27 17:32:04','2024-05-08 19:12:51');

/*Table structure for table `tours_guides` */

DROP TABLE IF EXISTS `tours_guides`;

CREATE TABLE `tours_guides` (
  `tour_id` int(11) NOT NULL,
  `guide_id` int(11) NOT NULL,
  PRIMARY KEY (`tour_id`,`guide_id`),
  KEY `guide_id` (`guide_id`),
  CONSTRAINT `tours_guides_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`tour_id`),
  CONSTRAINT `tours_guides_ibfk_2` FOREIGN KEY (`guide_id`) REFERENCES `guides` (`guide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tours_guides` */

insert  into `tours_guides`(`tour_id`,`guide_id`) values 
(1,4),
(1,5),
(1,6),
(1,25),
(2,4),
(2,5),
(2,7),
(3,5),
(3,6),
(3,7),
(3,25),
(4,5),
(4,6),
(4,7),
(4,13),
(4,25),
(5,4),
(5,8),
(5,10),
(5,11),
(5,12),
(6,4),
(6,5),
(6,6),
(6,8),
(6,10),
(6,13),
(7,4),
(7,11),
(7,12);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
