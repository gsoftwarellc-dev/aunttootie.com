-- Aunt Tootie Database Schema
-- Run this once on your MySQL database to set everything up

CREATE DATABASE IF NOT EXISTS aunttootie;
USE aunttootie;

-- Admin users
CREATE TABLE IF NOT EXISTS admins (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  first_name    VARCHAR(100),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Premium members
CREATE TABLE IF NOT EXISTS premium_members (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  first_name   VARCHAR(100),
  last_name    VARCHAR(100),
  email        VARCHAR(255) UNIQUE NOT NULL,
  status       ENUM('active', 'cancelled') DEFAULT 'active',
  joined_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes (mirrors the JS data file — editable via admin)
CREATE TABLE IF NOT EXISTS recipes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(255) UNIQUE NOT NULL,
  title       VARCHAR(255) NOT NULL,
  category    VARCHAR(100),
  subcategory VARCHAR(100),
  image       VARCHAR(500),
  time        VARCHAR(50),
  serves      VARCHAR(50),
  difficulty  VARCHAR(50),
  premium     BOOLEAN DEFAULT FALSE,
  featured    BOOLEAN DEFAULT FALSE,
  teaser      TEXT,
  description TEXT,
  ingredients JSON,
  instructions JSON,
  tags        JSON,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
