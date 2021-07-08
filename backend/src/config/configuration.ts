
export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});

export interface IConfiguration {
  port: number;
  database: {
    host: string;
    port: number;
  };
}
