// roselia のゲーム設定・パースロジック

const VALID_RANKS = ['b', 'a', 's', 'sss'];
const VALID_CHARAS = ['lisayuki', 'sayo', 'akorin'];

const DEFAULT_RANK = 'b';
const DEFAULT_CHARA = 'lisayuki';

module.exports = {
  id: 'roselia',
  imagePathSegment: 'roselia',
  titleMap: {
    ja: 'Roseliaにすべてを賭ける覚悟はある？あなたの覚悟を見せなさい！',
    en: 'Do you all have the resolve to bet everything on Roselia? Show me!',
    cht: '為了Roselia﹐你有賭上一切的覺悟嗎?展現你的覺悟吧!',
  },
  descriptionMap: {
    ja: 'Roseliaにすべてを賭ける覚悟はある？',
    en: 'Do you all have the resolve to bet everything on Roselia?',
    cht: '為了Roselia﹐你有賭上一切的覺悟嗎?',
  },

  // クエリパラメータから画像パスを組み立てる
  // query: event.queryStringParameters, language: フォールバック済みの言語コード
  // 画像パス: /ogp/roselia/<language>/<chara>_<rank>.png
  getImagePath(query, language) {
    const rank = VALID_RANKS.includes(query?.rank) ? query.rank : DEFAULT_RANK;
    const chara = VALID_CHARAS.includes(query?.chara) ? query.chara : DEFAULT_CHARA;
    return `/ogp/${this.imagePathSegment}/${language}/${chara}_${rank}.png`;
  },
};
