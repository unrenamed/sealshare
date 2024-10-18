declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UNKEY_ROOT_KEY: string;
      UNKEY_API_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
