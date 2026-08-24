// HappyBangDream10th-game から生成された sns シェア URL に対して OGP 画像を返すサーバーコード
// ゲームごとの設定・パースロジックは ./games/ 以下に分離されている

const GAME_CONFIGS = require('./games');

exports.handler = async (event) => {
  const query = event.queryStringParameters ?? {};

  // クエリパラメータの取得（デフォルト値の設定）
  const game = query.game ?? 'mygo';
  const language = query.lang ?? 'ja';

  // 指定されたゲームの設定を取得（存在しない場合は mygo にフォールバック）
  const activeConfig = GAME_CONFIGS[game] ?? GAME_CONFIGS.mygo;

  // 言語設定のフォールバック処理（指定言語がない場合は ja をデフォルトに）
  const title = activeConfig.titleMap[language] ?? activeConfig.titleMap.ja;
  const description = activeConfig.descriptionMap[language] ?? activeConfig.descriptionMap.ja;

  // 画像パスの組み立て（ゲームごとのロジックに委譲）
  const imagePath = activeConfig.getImagePath(query, language);

  // ベースURL等の組み立て
  const host = event.headers?.host || 'ogp.bangdreamdoujin10thgame.com';
  const protocol = event.headers?.['x-forwarded-proto'] || event.headers?.['x-forwarded-protocol'] || 'https';
  const baseUrl = `${protocol}://${host}`;

  const imageUrl = `${baseUrl}${imagePath}?timestamp=${Date.now()}`;
  const shareUrl = `${baseUrl}/api/share?${new URLSearchParams(query).toString()}`;

  // HTMLの生成
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta property="og:type"         content="website">
  <meta property="og:url"          content="${shareUrl}">
  <meta property="og:title"        content="${title}">
  <meta property="og:description"  content="${description}">
  <meta property="og:image"        content="${imageUrl}">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image"       content="${imageUrl}">

  <meta http-equiv="refresh" content="0;url=https://www.bangdreamdoujin10thgame.com">
</head>
<body>
  <p>リダイレクト中...</p>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
    body: html,
  };
};
