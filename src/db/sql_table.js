const app = `CREATE TABLE IF NOT EXISTS app (
    id INT PRIMARY KEY AUTO_INCREMENT,
    app_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(255) NOT NULL,
    app_resource VARCHAR(255) NOT NULL,
    start_path VARCHAR(255) NOT NULL,
    start_type VARCHAR(255) NOT NULL,
    version DECIMAL(10, 2) NOT NULL,
    update_desc VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

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
    update_desc VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

const tables = [app, core];

module.exports = {
  tables,
};
