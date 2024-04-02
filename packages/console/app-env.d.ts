type PublicEnv = {
  LANG: string;
  DEBUG: boolean;
};

declare namespace NodeJS {
  interface ProcessEnv {
    readonly APP_RELEASE: string;
    readonly FEATURES_ENABLED: boolean;
    readonly public: PublicEnv;
    readonly STOCK_DATA_FRESHNESS_BASIS: string;
  }
}
