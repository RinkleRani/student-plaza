export const config = {
    'aws_region': process.env.AWS_REGION,
    'aws_profile': process.env.AWS_PROFILE,
    'table_name': process.env.TABLE_NAME,
    'rds_host_url': process.env.RDS_HOSTURL,
    'rds_username': process.env.RDS_USERNAME,
    'rds_password': process.env.RDS_PASSWORD,
    'rds_port': process.env.RDS_PORT,
    'rds_database_name': process.env.RDS_DATABASE_NAME,
    'aws_key_id' : process.env.ACCESS_KEY_ID,
    'secret_access_key': process.env.SECRET_ACCESS_KEY
}