import mysql from "mysql2"
import { config } from "../../../config"
import { Logger } from "tslog"
import util from 'util'


class RdsHelper {
    logger: Logger = new Logger(); 
    connection;
    
    constructor(){
        this.connection = mysql.createConnection({
            host: config.rds_host_url,
            user: config.rds_username,
            password: config.rds_password,
            database: config.rds_database_name
        })

        this.connection.connect((err) => {
            if(err) throw err;
            this.logger.info('Connected to MySQL Server');
        });
    }

    async checkUser(userId:string) {
        this.logger.info("Checking if user: " + userId + " exists")
        var query_str =
            "SELECT id " +
            "FROM users " +   
            "WHERE (id = " + userId +" ) " +
            "LIMIT 1";
        
        this.logger.info('Query string is'+ query_str);
        const rows: any = await this.connection.promise().query(query_str)

        if (rows.length > 0) {
            this.logger.info("User exists")
            return true
        } else {
            this.logger.info("User does not exist")
            return false
        }
    }
}

const rdsdbhelper = new RdsHelper();
export default rdsdbhelper