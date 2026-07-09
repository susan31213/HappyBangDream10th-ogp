// 1. ゲームごとの設定データをオブジェクトに集約（別ファイルに切り出してもOK）
const GAME_CONFIGS = {
  mygo: {
    imagePathSegment: 'mygo',
    titleMap: {
      ja: 'あなたは何級？ともりんの石検定に挑戦してみてね！',
      en: "What is your level? Try Tomorin's Stone Test!",
      cht: '你是幾級?快來挑戰看看小燈的石頭檢定吧!',
    },
    descriptionMap: {
      ja: 'あなたの石検定レベルをチェック！',
      en: 'Check your level in the Stone Test!',
      cht: '快來確認你的等級吧!',
    },
  },
};

// 2. 共通のランク画像名マッピング
const RANK_IMAGE_MAP = {
  CLEAR_0: 'clear_00.png',
  CLEAR_1: 'clear_01.png',
  CLEAR_2: 'clear_02.png',
  CLEAR_3: 'clear_03.png',
  CLEAR_SP: 'clear_sp.png',
};

exports.handler = async (event) => {
  // クエリパラメータの取得（デフォルト値の設定）
  const game = event.queryStringParameters?.game ?? 'mygo';
  const rank = event.queryStringParameters?.rank ?? 'CLEAR_0';
  const language = event.queryStringParameters?.lang ?? 'ja';

  // 指定されたゲームの設定を取得（存在しない場合は mygo にフォールバック）
  const activeConfig = GAME_CONFIGS[game] ?? GAME_CONFIGS.mygo;

  // 言語設定のフォールバック処理（指定言語がない場合は ja をデフォルトに）
  const title = activeConfig.titleMap[language] ?? activeConfig.titleMap.ja;
  const description = activeConfig.descriptionMap[language] ?? activeConfig.descriptionMap.ja;

  // 画像パスの組み立て
  const imageName = RANK_IMAGE_MAP[rank] ?? RANK_IMAGE_MAP.CLEAR_0;
  const imagePath = `/ogp/${activeConfig.imagePathSegment}/${language}/${imageName}`;

  // ベースURL等の組み立て
  const host = event.headers?.host || 'ogp.bangdreamdoujin10thgame.com';
  const protocol = event.headers?.['x-forwarded-proto'] || event.headers?.['x-forwarded-protocol'] || 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const imageUrl = `${baseUrl}${imagePath}?timestamp=${Date.now()}`;
  const shareUrl = `${baseUrl}/api/share?game=${encodeURIComponent(game)}&rank=${encodeURIComponent(rank)}&lang=${encodeURIComponent(language)}`;

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