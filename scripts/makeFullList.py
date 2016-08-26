# This Python file uses the following encoding: utf-8

# Makes the full dict of kanji and readings (fullList.txt)
# Run this, then makeKanjiList.py, then makeReadingsList.py, then makeForceData.py
import json
import codecs

kana = 'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟ゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ'

input = open('data/test2.txt', 'r')
contents = input.read()
input.close()

blockList = contents.split('\r\n\r\n')
blockSplitList = [ block.split('\r\n') for block in blockList ]

fullList = [ {'kanji': block[0],
			  'meaning': block[1],
			  'readings': [ reading.split('\t')[0] for reading in block[2:] ]
			  } for block in blockSplitList ]
for item in fullList:
	for reading in item['readings']:
		if not set(reading) <= set(kana):
			item['readings'].remove(reading)
			#There is currently some kind of bug here that
			#causes some readings to get through anyway
fullListOutput = open('fullList.txt', 'w')
fullListOutput.write(json.dumps(fullList))
fullListOutput.close()