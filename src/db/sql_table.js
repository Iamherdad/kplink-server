const app = `CREATE TABLE IF NOT EXISTS app (
    id CHAR(32) PRIMARY KEY ,
    name VARCHAR(255)  NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(255) NOT NULL,
    app_resource VARCHAR(255) NOT NULL,
    start_path VARCHAR(255) NOT NULL,
    start_type VARCHAR(255) NOT NULL,
    version DECIMAL(10, 2) NOT NULL,
    update_desc VARCHAR(255) NOT NULL,
    is_delete TINYINT(1) DEFAULT 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX unique_name_version_is_delete (name, version, is_delete)
);`;

const app_priview = `CREATE TABLE IF NOT EXISTS app_preview(
	app_id CHAR(32) NOT NULL,
	url VARCHAR(255) NOT NULL,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const core = `CREATE TABLE IF NOT EXISTS core (
    id INT PRIMARY KEY AUTO_INCREMENT,
    app_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(255) NOT NULL,
    app_resource VARCHAR(255) NOT NULL,
    start_path VARCHAR(255) NOT NULL,
    start_type VARCHAR(255) NOT NULL,
    version DECIMAL(10, 2) NOT NULL,
    tag_id INT NOT NULL,
    update_desc VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

const tag = `CREATE TABLE IF NOT EXISTS tag (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
 is_delete TINYINT(1) DEFAULT 0,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

const store = `CREATE TABLE IF NOT EXISTS store (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tag_id INT NOT NULL,
   name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  resource_id int NOT NULL,
  version VARCHAR(5) NOT NULL,
  is_delete TINYINT(1) DEFAULT 0,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX unique_tag_version (tag_id, version)
);`;

const banner = `CREATE TABLE IF NOT EXISTS banner(
id int PRIMARY KEY AUTO_INCREMENT,
url VARCHAR(255) NOT NULL,
link VARCHAR(255) NOT NULL


)`;
const tables = [app, app_priview, core, tag, store, banner];

module.exports = {
  tables,
};
