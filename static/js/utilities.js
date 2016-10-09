breakSymbol = '_';

var kanaMain = {あ: 'a',
い: 'i',
う: 'u',
え: 'e',
お: 'o',
か: 'ka',
き: 'ki',
く: 'ku',
け: 'ke',
こ: 'ko',
さ: 'sa',
し: 'shi',
す: 'su',
せ: 'se',
そ: 'so',
た: 'ta',
ち: 'chi',
つ: 'tsu',
て: 'te',
と: 'to',
な: 'na',
に: 'ni',
ぬ: 'nu',
ね: 'ne',
の: 'no',
は: 'ha',
ひ: 'hi',
ふ: 'hu',
へ: 'he',
ほ: 'ho',
ま: 'ma',
み: 'mi',
む: 'mu',
め: 'me',
も: 'mo',
ら: 'ra',
り: 'ri',
る: 'ru',
れ: 're',
ろ: 'ro',
や: 'ya',
ゆ: 'yu',
よ: 'yo',
わ: 'wa',
ん: 'n',
が: 'ga',
ぎ: 'gi',
ぐ: 'gu',
げ: 'ge',
ご: 'go',
だ: 'da',
ぢ: 'ji',
づ: 'dzu',
で: 'de',
ど: 'do',
ざ: 'za',
じ: 'ji',
ず: 'zu',
ぜ: 'ze',
ぞ: 'zo',
ば: 'ba',
び: 'bi',
ぶ: 'bu',
べ: 'be',
ぼ: 'bo',
ぱ: 'pa',
ぴ: 'pi',
ぷ: 'pu',
ぺ: 'pe',
ぽ: 'po',
ア: 'A',
イ: 'I',
ウ: 'U',
エ: 'E',
オ: 'O',
カ: 'KA',
キ: 'KI',
ク: 'KU',
ケ: 'KE',
コ: 'KO',
サ: 'SA',
シ: 'SHI',
ス: 'SU',
セ: 'SE',
ソ: 'SO',
タ: 'TA',
チ: 'CHI',
ツ: 'TSU',
テ: 'TE',
ト: 'TO',
ナ: 'NA',
ニ: 'NI',
ヌ: 'NU',
ネ: 'NE',
ノ: 'NO',
ハ: 'HA',
ヒ: 'HI',
フ: 'HU',
ヘ: 'HE',
ホ: 'HO',
マ: 'MA',
ミ: 'MI',
ム: 'MU',
メ: 'ME',
モ: 'MO',
ラ: 'RA',
リ: 'RI',
ル: 'RU',
レ: 'RE',
ロ: 'RO',
ヤ: 'YA',
ユ: 'YU',
ヨ: 'YO',
ワ: 'WA',
ン: 'N',
ガ: 'GA',
ギ: 'GI',
グ: 'GU',
ゲ: 'GE',
ゴ: 'GO',
ダ: 'DA',
ヂ: 'JI',
ヅ: 'DZU',
デ: 'DE',
ド: 'DO',
ザ: 'ZA',
ジ: 'JI',
ズ: 'ZU',
ゼ: 'ZE',
ゾ: 'ZO',
バ: 'BA',
ビ: 'BI',
ブ: 'BU',
ベ: 'BE',
ボ: 'BO',
パ: 'PA',
ピ: 'PI',
プ: 'PU',
ペ: 'PE',
ポ: 'PO'}

var kanaYouon = {きゃ: 'kya',
きゅ: 'kyu',
きょ: 'kyo',
しゃ: 'sha',
しゅ: 'shu',
しょ: 'sho',
ちゃ: 'cha',
ちゅ: 'chu',
ちょ: 'cho',
にゃ: 'nya',
にゅ: 'nyu',
にょ: 'nyo',
ひゃ: 'hya',
ひゅ: 'hyu',
ひょ: 'hyo',
みゃ: 'mya',
みゅ: 'myu',
みょ: 'myo',
りゃ: 'rya',
りゅ: 'ryu',
りょ: 'ryo',
ぎゃ: 'gya',
ぎゅ: 'gyu',
ぎょ: 'gyo',
じゃ: 'ja',
じゅ: 'ju',
じょ: 'jo',
ぢゃ: 'ja',
ぢゅ: 'ju',
ぢょ: 'jo',
びゃ: 'bya',
びゅ: 'byu',
びょ: 'byo',
ぴゃ: 'pya',
ぴゅ: 'pyu',
ぴょ: 'pyo',
キャ: 'KYA',
キュ: 'KYU',
キョ: 'KYO',
シャ: 'SHA',
シュ: 'SHU',
ショ: 'SHO',
チャ: 'CHA',
チュ: 'CHU',
チョ: 'CHO',
ニャ: 'NYA',
ニュ: 'NYU',
ニョ: 'NYO',
ヒャ: 'HYA',
ヒュ: 'HYU',
ヒョ: 'HYO',
ミャ: 'MYA',
ミュ: 'MYU',
ミョ: 'MYO',
リャ: 'RYA',
リュ: 'RYU',
リョ: 'RYO',
ギャ: 'GYA',
ギュ: 'GYU',
ギョ: 'GYO',
ジャ: 'JA',
ジュ: 'JU',
ジョ: 'JO',
ヂャ: 'JA',
ヂュ: 'JU',
ヂョ: 'JO',
ビャ: 'BYA',
ビュ: 'BYU',
ビョ: 'BYO',
ピャ: 'PYA',
ピュ: 'PYU',
ピョ: 'PYO'};

var geminates = 'っッ';

function kanaToRomaji(input) {

	output = input;
	for (i in kanaYouon) {
		var re = new RegExp(i, 'g');
		output = output.replace(re, kanaYouon[i]);
	}

	for (i in kanaMain) {
		var re = new RegExp(i, 'g');
		output = output.replace(re, kanaMain[i]);
	}

	function checkGem(geminate) {
		gemIndex = output.indexOf(geminate);
		if (gemIndex === output.length-1) {
			output = output.replace(geminate, breakSymbol);
			gemIndex = output.indexOf(geminate);
		};
		while (gemIndex !== -1) {
			output = output.replace(geminate, output[gemIndex+1]);
			gemIndex = output.indexOf(geminate);
		}
	}

	checkGem('ッ');
	checkGem('っ');

	return output;

}

function preProcessData(data) {

	data.nodes = data.nodes.filter(function(obj) {
		return obj.type !== 'unknown';
	});

	kanjiNodes = data.nodes.filter(function(obj) {
		return obj.type === 'kanji';
	})
	.map(function(obj) { return obj.id; });

	readingNodes = data.nodes.filter(function(obj) {
		return obj.type === 'kun' || obj.type === 'on';
	})
	.map(function(obj) { return obj.id; });

	data.links = data.links.filter(function(obj) {
		if (typeof obj.source === 'string') {
			return (kanjiNodes.indexOf(obj.source) !== -1
					&&
					readingNodes.indexOf(obj.target) !== -1);
		}
		else {
			return (kanjiNodes.indexOf(obj.source.id) !== -1
					&&
					readingNodes.indexOf(obj.target.id) !== -1);					
		}
	});

	return data;
}

//this function sets up the KanjiToReading and ReadingToKanji
//dictionaries for optimised processing
function makeDicts(data) {
	var result = {};
	var kToR = {};
	var rToK = {};
	var kToM = {};
	for (i in data.nodes) {
		var node = data.nodes[i];
		if (node.type === 'kanji') {
			kToR[node.id] = [];
			kToM[node.id] = node.meaning;
		}
		if (node.type !== 'kanji') {
			rToK[node.id] = [];
		}
	}
	for (i in data.links) {
		var link = data.links[i];
		kToR[link.source].push(link.target);
		rToK[link.target].push(link.source);
	}
	result['kToR'] = kToR;
	result['rToK'] = rToK;
	result['kToM'] = kToM;
	return result;
}