declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: DotenvConfigOptions;
      FRONTEND_URL: string;
    }
  }
}
export {};
