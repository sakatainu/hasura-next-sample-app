/**
 * changeable environment variables
 * @type { PublicEnv }
 */
const publicEnv = {
  LANG: process.env.NEXT_PUBLIC_LANG || 'ja',
  DEBUG: String(
    process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG
  ),
};

/**
 * readonly environment variables
 * @type { NodeJS.ProcessEnv }
 */
const appEnv = {
  APP_RELEASE: process.env.NEXT_PUBLIC_APP_RELEASE || new Date().toISOString(),
  FEATURES_ENABLED: process.env.NEXT_PUBLIC_FEATURES_ENABLED === 'true',
  public: publicEnv,
  // TODO: データ鮮度を取得できるようになったら廃止予定
  STOCK_DATA_FRESHNESS_BASIS:
    process.env.NEXT_PUBLIC_STOCK_DATA_FRESHNESS_BASIS || '8697', //日本取引所グループ
};

module.exports = appEnv;
