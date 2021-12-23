import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
  database: string | Uint8Array;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = "localhost";
  newOptions.database =
    process.env.NODE_ENV === "test" ? "database_test" : options.database;
  createConnection({
    ...options,
  });
});
