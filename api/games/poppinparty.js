// poppinparty のゲーム設定・パースロジック

const VALID_RESULTS = ['success', 'fail', 'hanazono'];
const DEFAULT_RESULT = 'fail';

module.exports = {
  id: 'poppinparty',
  imagePathSegment: 'poppinparty',
  titleMap: {
    ja: 'Poppin\'Partyナイトドライブしに行こう！あなたの結果は？',
    en: "Let's go on a night drive with Poppin'Party! What's your result?",
    cht: '和Poppin\'Party一起去夜間兜風吧!你的結果是?',
  },
  descriptionMap: {
    ja: 'Poppin\'Partyナイトドライブに挑戦！',
    en: "Take on the Poppin'Party night drive!",
    cht: '來挑戰Poppin\'Party的夜間兜風吧!',
  },

  // クエリパラメータから画像パスを組み立てる
  // query: event.queryStringParameters, language: フォールバック済みの言語コード
  // 画像パス: /ogp/poppinparty/<result>.png (result: success | fail | hanazono、言語別の画像はなし)
  getImagePath(query) {
    const result = VALID_RESULTS.includes(query?.result) ? query.result : DEFAULT_RESULT;
    return `/ogp/${this.imagePathSegment}/${result}.png`;
  },
};
