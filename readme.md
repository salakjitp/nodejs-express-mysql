
## 1.Create a DB
CREATE DATABASE simpleapi;

## 2.Create table:
-- Table structure for users
CREATE TABLE IF NOT EXISTS `users` (
    `id` int(11) NOT NULL,
    `firstname` varchar(200) NOT NULL,
    `lastname` varchar(200) NOT NULL,
    `nickname` varchar(200) NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
<!-- ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `user` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; -->