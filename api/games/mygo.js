// mygo(ともりんの石検定)のゲーム設定・パースロジック

const RANK_IMAGE_MAP = {
  CLEAR_0: 'clear_00.png',
  CLEAR_1: 'clear_01.png',
  CLEAR_2: 'clear_02.png',
  CLEAR_3: 'clear_03.png',
  CLEAR_SP: 'clear_sp.png',
};

module.exports = {
  id: 'mygo',
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

  // クエリパラメータから画像パスを組み立てる
  // query: event.queryStringParameters, language: フォールバック済みの言語コード
  getImagePath(query, language) {
    const rank = query?.rank ?? 'CLEAR_0';
    const imageName = RANK_IMAGE_MAP[rank] ?? RANK_IMAGE_MAP.CLEAR_0;
    return `/ogp/${this.imagePathSegment}/${language}/${imageName}`;
  },
};
