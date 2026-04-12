-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 12, 2026 at 11:11 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `disney`
--

-- --------------------------------------------------------

--
-- Table structure for table `alerte`
--

DROP TABLE IF EXISTS `alerte`;
CREATE TABLE IF NOT EXISTS `alerte` (
  `idAlerte` int NOT NULL AUTO_INCREMENT,
  `titreAlerte` varchar(100) NOT NULL,
  `descriptionAlerte` text,
  `dateAlerte` datetime DEFAULT CURRENT_TIMESTAMP,
  `idAttractionAlerte` int NOT NULL,
  `idNiveauAlerte` int NOT NULL,
  PRIMARY KEY (`idAlerte`),
  KEY `fk_alerte_attraction` (`idAttractionAlerte`),
  KEY `fk_alerte_niveau` (`idNiveauAlerte`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `alerte`
--

INSERT INTO `alerte` (`idAlerte`, `titreAlerte`, `descriptionAlerte`, `dateAlerte`, `idAttractionAlerte`, `idNiveauAlerte`) VALUES
(1, 'Test', 'Test alerte basse', '2026-04-02 17:09:20', 1, 1),
(2, 'Test', 'Test alerte moyenne', '2026-04-02 17:09:20', 1, 2),
(3, 'Test', 'test alerte haute', '2026-04-02 17:09:20', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
CREATE TABLE IF NOT EXISTS `attraction` (
  `idAttraction` int NOT NULL AUTO_INCREMENT,
  `libelleAttraction` varchar(100) NOT NULL,
  `dureeAttraction` int DEFAULT NULL,
  `nbPlaceAttraction` int DEFAULT NULL,
  `imageAttraction` varchar(100) NOT NULL,
  `tailleminimum` int DEFAULT NULL,
  `attractionOuvert` tinyint(1) DEFAULT '1',
  `idZoneAttraction` int NOT NULL,
  PRIMARY KEY (`idAttraction`),
  KEY `fk_attraction_zone` (`idZoneAttraction`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attraction`
--

INSERT INTO `attraction` (`idAttraction`, `libelleAttraction`, `dureeAttraction`, `nbPlaceAttraction`, `imageAttraction`, `tailleminimum`, `attractionOuvert`, `idZoneAttraction`) VALUES
(1, 'Big Thunder Mountain', 4, 30, '/image/disneyBigThunderMountain.jpg', 102, 1, 5),
(2, 'Star Wars Hyperspace Mountain', 3, 24, '/image/disneyStarWars.jpg', 120, 1, 4),
(3, 'Pirates of the Caribbean', 10, 22, '/image/disneyPirate.jpg', 0, 1, 3),
(4, 'Disneyland Railroad', 20, 250, '/image/disneyRailRoad.jpg', 0, 1, 1),
(5, 'Spider-Man W.E.B. Adventure', 5, 8, '/image/studioSpiderMan.jpg', 0, 1, 6),
(6, 'Avengers Assemble: Flight Force', 3, 24, '/image/studioFlightForce.jpg', 120, 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
CREATE TABLE IF NOT EXISTS `equipe` (
  `idEquipe` int NOT NULL AUTO_INCREMENT,
  `libelleEquipe` varchar(100) NOT NULL,
  `idParcEquipe` int NOT NULL,
  PRIMARY KEY (`idEquipe`),
  KEY `fk_equipe_parc` (`idParcEquipe`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipe`
--

INSERT INTO `equipe` (`idEquipe`, `libelleEquipe`, `idParcEquipe`) VALUES
(1, 'Maintenance Disney', 1),
(2, 'Maintenance Studio', 2),
(3, 'Vente Disney', 1),
(4, 'Vente Studio', 2),
(5, 'Administrateur', 1);

-- --------------------------------------------------------

--
-- Table structure for table `faire`
--

DROP TABLE IF EXISTS `faire`;
CREATE TABLE IF NOT EXISTS `faire` (
  `idMissionFaire` int NOT NULL,
  `idUtilisateurFaire` int NOT NULL,
  PRIMARY KEY (`idMissionFaire`,`idUtilisateurFaire`),
  KEY `fk_faire_utilisateur` (`idUtilisateurFaire`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faire`
--

INSERT INTO `faire` (`idMissionFaire`, `idUtilisateurFaire`) VALUES
(1, 1),
(1, 2),
(2, 2),
(23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `idMission` int NOT NULL AUTO_INCREMENT,
  `titreMission` varchar(100) NOT NULL,
  `DescriptionMission` text,
  `dateDebut` datetime DEFAULT NULL,
  `dateDebutReel` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  `Commentaire` text,
  `idAttractionMission` int NOT NULL,
  PRIMARY KEY (`idMission`),
  KEY `fk_mission_attraction` (`idAttractionMission`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`idMission`, `titreMission`, `DescriptionMission`, `dateDebut`, `dateDebutReel`, `dateFin`, `Commentaire`, `idAttractionMission`) VALUES
(1, 'Maintenance préventive rails', 'Vérification annuelle des soudures sur le circuit principal.', '2026-04-10 08:00:00', NULL, '2026-04-10 12:00:00', 'Prévoir harnais de sécurité', 1),
(2, 'Nettoyage audio-animatronics', 'Dépoussiérage des personnages de la scène du bal.', '2026-04-12 21:00:00', NULL, '2026-04-12 23:30:00', 'Attention aux mécanismes fragiles', 2),
(3, 'Test des harnais', 'Vérification de la fermeture hydraulique de tous les trains.', '2026-04-08 07:00:00', '2026-04-08 07:15:00', '2026-04-08 09:00:00', 'R.A.S sur le train n°3', 3),
(4, 'Mise à jour logiciel 3D', 'Installation du nouveau firmware pour les lunettes 3D.', '2026-04-15 06:00:00', NULL, '2026-04-15 08:30:00', NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `niveaux`
--

DROP TABLE IF EXISTS `niveaux`;
CREATE TABLE IF NOT EXISTS `niveaux` (
  `idNiveau` int NOT NULL AUTO_INCREMENT,
  `libelleNiveau` varchar(100) NOT NULL,
  PRIMARY KEY (`idNiveau`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `niveaux`
--

INSERT INTO `niveaux` (`idNiveau`, `libelleNiveau`) VALUES
(1, 'Information'),
(2, 'Avertissement'),
(3, 'Critique'),
(4, 'Urgence');

-- --------------------------------------------------------

--
-- Table structure for table `parc`
--

DROP TABLE IF EXISTS `parc`;
CREATE TABLE IF NOT EXISTS `parc` (
  `idParc` int NOT NULL AUTO_INCREMENT,
  `libelleParc` varchar(100) NOT NULL,
  PRIMARY KEY (`idParc`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `parc`
--

INSERT INTO `parc` (`idParc`, `libelleParc`) VALUES
(1, 'Disneyland Park'),
(2, 'Walt Disney Studios');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `idUtilisateur` int NOT NULL AUTO_INCREMENT,
  `nomUtilisateur` varchar(100) NOT NULL,
  `prenomUtilisateur` varchar(100) NOT NULL,
  `identifiantUtilisateur` varchar(50) NOT NULL,
  `mdpUtilisateur` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idEquipeUtilisateur` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`),
  UNIQUE KEY `identifiantUtilisateur` (`identifiantUtilisateur`),
  KEY `fk_utilisateur_equipe` (`idEquipeUtilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nomUtilisateur`, `prenomUtilisateur`, `identifiantUtilisateur`, `mdpUtilisateur`, `idEquipeUtilisateur`) VALUES
(25, 'Gaulier', 'Séb', 'SGaulier123', 'Sgaulier123', 5),
(24, 'Chevalier', 'Theo', 'Tchev2006', '$2b$10$m9gQ6zidoDjyB2Ki.0o1Z.f7JVfl0J8NaSUazs3XagMR6mWVF8kC6', 3),
(21, 'Admin', 'Admin', 'Admin', '$2b$10$EKoCq4NVjcXa.CAl/fjKx.pSqnzPsL8wYo3k/1bDVCr3qnGeFp5Hy', 5),
(22, 'Munier', 'Gerald', 'GMun123', '$2b$10$B2wCvPXBeuJSJvg16nUD9uE/0zDmy.q3T.7.fUH1Qj7SkKMr1IZ5W', 5),
(23, 'Chevalier', 'Arthur', 'Achev2006', '$2b$10$xVohilAv8BMXJqCI4okSneKAyin5FS3LK70OxXtGTiqNtkJH0EkT6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `voir`
--

DROP TABLE IF EXISTS `voir`;
CREATE TABLE IF NOT EXISTS `voir` (
  `idAlerteVoir` int NOT NULL,
  `idUtilisateurVoir` int NOT NULL,
  `vu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idAlerteVoir`,`idUtilisateurVoir`),
  KEY `fk_voir_utilisateur` (`idUtilisateurVoir`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `voir`
--

INSERT INTO `voir` (`idAlerteVoir`, `idUtilisateurVoir`, `vu`) VALUES
(1, 1, 1),
(1, 2, 0),
(2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

DROP TABLE IF EXISTS `zone`;
CREATE TABLE IF NOT EXISTS `zone` (
  `idZone` int NOT NULL AUTO_INCREMENT,
  `LibelleZone` varchar(100) NOT NULL,
  `idParcZone` int NOT NULL,
  PRIMARY KEY (`idZone`),
  KEY `fk_zone_parc` (`idParcZone`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`idZone`, `LibelleZone`, `idParcZone`) VALUES
(1, 'Main Street, U.S.A.', 1),
(2, 'Fantasyland', 1),
(3, 'Adventureland', 1),
(4, 'Discoveryland', 1),
(5, 'Frontierland', 1),
(6, 'Avengers Campus', 2),
(7, 'Worlds of Pixar', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
