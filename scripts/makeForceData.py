#Requires first makeFullList.py, then makeKanjiList.py, then makeReadingsList.py to be run

import json

hiragana = u'\u3041\u3042\u3043\u3044\u3045\u3046\u3047\u3048\u3049\u304A\u304B\u304C\u304D\u304E\u304F\u3050\u3051\u3052\u3053\u3054\u3055\u3056\u3057\u3058\u3059\u305A\u305B\u305C\u305D\u305E\u305F\u3060\u3061\u3062\u3063\u3064\u3065\u3066\u3067\u3068\u3069\u306A\u306B\u306C\u306D\u306E\u306F\u3070\u3071\u3072\u3073\u3074\u3075\u3076\u3077\u3078\u3079\u307A\u307B\u307C\u307D\u307E\u307F\u3080\u3081\u3082\u3083\u3084\u3085\u3086\u3087\u3088\u3089\u308A\u308B\u308C\u308D\u308E\u308F\u3090\u3091\u3092\u3093\u3094\u3095\u3096'
katakana = u'\u30A1\u30A2\u30A3\u30A4\u30A5\u30A6\u30A7\u30A8\u30A9\u30AA\u30AB\u30AC\u30AD\u30AE\u30AF\u30B0\u30B1\u30B2\u30B3\u30B4\u30B5\u30B6\u30B7\u30B8\u30B9\u30BA\u30BB\u30BC\u30BD\u30BE\u30BF\u30C0\u30C1\u30C2\u30C3\u30C4\u30C5\u30C6\u30C7\u30C8\u30C9\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D0\u30D1\u30D2\u30D3\u30D4\u30D5\u30D6\u30D7\u30D8\u30D9\u30DA\u30DB\u30DC\u30DD\u30DE\u30DF\u30E0\u30E1\u30E2\u30E3\u30E4\u30E5\u30E6\u30E7\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EE\u30EF\u30F0\u30F1\u30F2\u30F3\u30F4\u30F5\u30F6\u30F7\u30F8\u30F9\u30FA'

kanji = open('kanji.txt', 'r')
contents = kanji.read()
kanji.close()
kanjiList = json.loads(contents)

readings = open('readings.txt', 'r')
contents = readings.read()
readings.close()
readingsList = json.loads(contents)

full = open('fullList.txt', 'r')
contents = full.read()
full.close()
fullList = json.loads(contents)

forceData = {'nodes': [], 'links': []}
nodes = forceData['nodes']
links = forceData['links']

for item in kanjiList:
	nodes.append({
		'id': item['kanji'],
		'meaning': item['meaning'],
		'type': 'kanji'
		})

for item in readingsList:
	nodes.append({
		'id': item['reading'],
		'type': item['type']
		})

for item in fullList:
	for reading in item['readings']:
		source = item['kanji']
		target = reading
		if set(reading) <= set(hiragana):
			type = 'kun'
		elif set(reading) <= set(katakana):
			type = 'on'
		else:
			type = 'unknown'
		links.append({
			'source': source,
			'target': target,
			'type': type
			})


output = open('forceData.txt', 'w')
output.write(json.dumps(forceData))
output.close()
