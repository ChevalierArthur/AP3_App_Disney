-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 24, 2026 at 01:23 PM
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
CREATE TABLE IF NOT EXISTS `attraction` (
  `idAttraction` int NOT NULL AUTO_INCREMENT,
  `libelleAttraction` varchar(100) NOT NULL,
  `dureeAttraction` int DEFAULT NULL,
  `nbAttraction` int DEFAULT NULL,
  `tailleminimum` int DEFAULT NULL,
  `attractionOuvert` tinyint(1) DEFAULT '1',
  `idZoneAttraction` int NOT NULL,
  PRIMARY KEY (`idAttraction`),
  KEY `fk_attraction_zone` (`idZoneAttraction`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `niveaux`
--

DROP TABLE IF EXISTS `niveaux`;
CREATE TABLE IF NOT EXISTS `niveaux` (
  `idNiveau` int NOT NULL AUTO_INCREMENT,
  `libelleNiveau` varchar(100) NOT NULL,
  PRIMARY KEY (`idNiveau`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parc`
--

DROP TABLE IF EXISTS `parc`;
CREATE TABLE IF NOT EXISTS `parc` (
  `idParc` int NOT NULL AUTO_INCREMENT,
  `libelleParc` varchar(100) NOT NULL,
  PRIMARY KEY (`idParc`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `mdpUtilisateur` varchar(255) NOT NULL,
  `idEquipeUtilisateur` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`),
  UNIQUE KEY `identifiantUtilisateur` (`identifiantUtilisateur`),
  KEY `fk_utilisateur_equipe` (`idEquipeUtilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
