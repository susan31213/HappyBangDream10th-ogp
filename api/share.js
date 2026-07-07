exports.handler = async (event) => {
  const rank = event.queryStringParameters?.rank ?? 'CLEAR_0';
  const language = event.queryStringParameters?.lang ?? 'ja';

  const rankConfig = {
    CLEAR_0: { image: `/ogp/mygo/${language}/clear_00.png` },
    CLEAR_1: { image: `/ogp/mygo/${language}/clear_01.png` },
    CLEAR_2: { image: `/ogp/mygo/${language}/clear_02.png` },
    CLEAR_3: { image: `/ogp/mygo/${language}/clear_03.png` },
    CLEAR_SP: { image: `/ogp/mygo/${language}/clear_sp.png` },
  };

  const titleMap = {
    ja: 'あなたは何級？ともりんの石検定に挑戦してみてね！',
    en: 'What is your level? Try Tomorin\'s Stone Test!',
    cht: '你是幾級?快來挑戰看看小燈的石頭檢定吧!',
  }
  const descriptionMap = {
    ja: 'あなたの石検定レベルをチェック！',
    en: 'Check your level in the Stone Test!',
    cht: '快來確認你的等級吧!',
  }

  const config = rankConfig[rank] ?? rankConfig.CLEAR_0;
  const host = event.headers?.host || 'ogp.bangdreamdoujin10thgame.com';
  const protocol = event.headers?.['x-forwarded-proto'] || event.headers?.['x-forwarded-protocol'] || 'https';
  const baseUrl = `${protocol}://${host}`;
  const imageUrl = `${baseUrl}${config.image}?timestamp=${Date.now()}`;
  const shareUrl = `${baseUrl}/api/share?rank=${encodeURIComponent(rank)}&lang=${encodeURIComponent(language)}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta property="og:type"         content="website">
  <meta property="og:url"          content="${shareUrl}">
  <meta property="og:title"        content="${titleMap[language]}">
  <meta property="og:description"  content="${descriptionMap[language]}">
  <meta property="og:image"        content="${imageUrl}">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${titleMap[language]}">
  <meta name="twitter:description" content="${descriptionMap[language]}">
  <meta name="twitter:image"       content="${imageUrl}">

  <!-- ゲーム本体にリダイレクト（任意） -->
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
