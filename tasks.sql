SELECT * FROM demo.tasks;CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(45) NOT NULL DEFAULT NULL,
  `description` varchar(250) NOT NULL DEFAULT NULL,
  `due_date` datetime NOT NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
