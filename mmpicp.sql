/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : mmpicp

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2020-02-16 23:30:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `data` longblob,
  `extra` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `android_id` varchar(255) DEFAULT NULL,
  `api_level` varchar(255) DEFAULT NULL,
  `application_name` varchar(255) DEFAULT NULL,
  `avaliable_location_providers` varchar(255) DEFAULT NULL,
  `base_os` varchar(255) DEFAULT NULL,
  `build_id` int(11) DEFAULT NULL,
  `battery_level` varchar(255) DEFAULT NULL,
  `bootloader` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `build_number` int(11) DEFAULT NULL,
  `bundle_id` int(11) DEFAULT NULL,
  `camera_present` varchar(255) DEFAULT NULL,
  `carrier` varchar(255) DEFAULT NULL,
  `code_name` varchar(255) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `devide_id` varchar(255) DEFAULT NULL,
  `devide_type` varchar(255) DEFAULT NULL,
  `display` varchar(255) DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `device_token` varchar(255) DEFAULT NULL,
  `first_intall_time` datetime DEFAULT NULL,
  `fingerprint` varchar(255) DEFAULT NULL,
  `font_scale` varchar(255) DEFAULT NULL,
  `free_disk_storage` varchar(255) DEFAULT NULL,
  `hardware` varchar(255) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `incremental` varchar(255) DEFAULT NULL,
  `installer_package_name` varchar(255) DEFAULT NULL,
  `install_referrer` varchar(255) DEFAULT NULL,
  `instance_id` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `mac_address` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `max_memory` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `power_state` varchar(255) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `preview_sdk_int` varchar(255) DEFAULT NULL,
  `readable_version` varchar(255) DEFAULT NULL,
  `serial_number` int(11) DEFAULT NULL,
  `security_patch` varchar(255) DEFAULT NULL,
  `system_available_features` varchar(255) DEFAULT NULL,
  `system_name` varchar(255) DEFAULT NULL,
  `system_version` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `total_disk_capacity` varchar(255) DEFAULT NULL,
  `total_memory` varchar(255) DEFAULT NULL,
  `unique_id` int(11) DEFAULT NULL,
  `used_memory` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `has_notch` varchar(255) DEFAULT NULL,
  `has_system_feature` varchar(255) DEFAULT NULL,
  `is_airplane_mode` varchar(255) DEFAULT NULL,
  `is_battery_charging` varchar(255) DEFAULT NULL,
  `is_emulator` varchar(255) DEFAULT NULL,
  `is_landscape` varchar(255) DEFAULT NULL,
  `is_location_enabled` varchar(255) DEFAULT NULL,
  `is_headphones_connected` varchar(255) DEFAULT NULL,
  `is_pin_or_fingerprint_set` varchar(255) NOT NULL,
  `is_tablet` varchar(255) DEFAULT NULL,
  `supported32_bit_abis` varchar(255) DEFAULT NULL,
  `supported64_bit_abis` varchar(255) DEFAULT NULL,
  `supported_abis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account` varchar(30) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `extra` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
