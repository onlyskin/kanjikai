d3.json('static/data/large.json', function(response) {

	originalData = JSON.parse(JSON.stringify(response));

	var data = response;

	currentFilters = [];

	//sets up kanji to reading and reading to kanji dictionaries from the data
	var kToR = {};
	var rToK = {};
	for (i in data.nodes) {
		var node = data.nodes[i];
		if (node.type === 'kanji') {
			kToR[node.id] = [];
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

	//Creates a custom filter function for changing the nodes/links object
	//excludeReading specifies either 'on' or 'kun' to be excluded
	//excludeKanji specifies a string of any number of kanji to be removed
	//includeKanji specifies a string of any number of kanji which are
	//  included to the exclusion of all others
	function Filter(settings) {
		this.excludeReading = settings.excludeReading;
		this.excludeKanji = settings.excludeKanji;
		this.includeKanji = settings.includeKanji;
		this.process = function(data) {
			currentFilters.push(this);
			var that = this;

			//Remove either 'on' or 'kun' (nodes)
			data.nodes = data.nodes.filter(function(obj) {
				return obj.type !== that.excludeReading && obj.type !== "unknown";
			});
			//Remove any kanji in the exclude list (nodes)
			data.nodes = data.nodes.filter(function(obj) {
				return that.excludeKanji.indexOf(obj.id) === -1;
			});

			//Removes any kanji not in the include list (nodes)
			if (that.includeKanji !== '') {
				var includeReadings = [];
				for (i in that.includeKanji) {
					var kanji = that.includeKanji[i];
					includeReadings.push.apply(includeReadings, kToR[kanji]);
				}
				data.nodes = data.nodes.filter(function(obj) {
					return (that.includeKanji.indexOf(obj.id) !== -1
							||
							includeReadings.indexOf(obj.id) !== -1);
				});
			}

			//builds list of kanji and reading nodes for filtering links at end
			kanjiNodes = data.nodes.filter(function(obj) {
				return obj.type === 'kanji';
			})
			.map(function(obj) { return obj.id; });

			readingNodes = data.nodes.filter(function(obj) {
				return obj.type === 'kun' || obj.type === 'on';
			})
			.map(function(obj) { return obj.id; });

			//removes any links whose source and target nodes are no
			//longer present (must be run at end of function)
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
	}

	var grade1 = '日一人年大十二本中出三見月生五上四金九入学円子八六下気小七山女百先名川千水男校土木車白天火右左休立手力目田正文口町空雨足早字音花赤青村夕石竹森林王犬玉草耳虫糸貝';
	var grade2 = '国長時行分後前間東今高外来話北午書半西電語聞食何南万毎母読友会同自社父地方新場明京通言理体作用強公野思家多心教元近考画海売知道計朝台広少工止切楽店親答夜帰古歌買図週室歩風紙黒春色走秋夏合市内回米当首数記点活原交組引直曜番算肉線声形鳥頭門冬昼茶谷光科弟細丸太戸牛魚兄園馬顔船羽岩角妹池星姉寺遠絵弱晴雪毛黄雲鳴才麦里矢刀弓汽';
	var grade3 = '事発者業員開問代動主題意度持世安院界重集物使品死始運終住真有急送転研究起着病待族銀医仕去味写注悪館屋対部相定実決全表習調化駅期取都和平受区洋県進指旅予向勝面委反所次係感投打島両服式談流局放球役身由飲消神配育乗想農州助追商葉落勉負守美命福横深申様港階路他橋岸客登速央号根苦具鉄返短油植宿薬倍波第幸練軽等曲庭血温庫漢坂息板列遊君章宮酒悲秒暗陽皮整歯柱祭筆童畑緑礼昔泳荷炭昭湖湯箱級氷寒拾鼻皿詩丁豆暑帳羊笛';
	var grade4 = '不以別特料建試験英議民連選関戦最約法的要治成協機加続改初産府共得告軍参利信側求昨官変各果必争無位置借費付説夫害副席残堂念象労例然伝働景飯好賞辺低失差課末極種量望観察型達良候史満敗管兵積録省周材飛殺単完競給歴辞愛未航冷類児印輪熱清氏覚億芸便停陸帯努固散静喜囲卒順結老令徒貨案季欠底挙願希笑束仲栄札包折焼照漁松貯票訓浴塩器士兆祝健衣隊臣浅標勇械菜刷司康孫紀毒博救功粉養街節郡灯胃典倉唱旗梅牧泣径脈鏡巣芽腸';
	var grade5 = '質政経現性制務総領設支報解資際査判在件団任増情示確勢減容演能再格過税常状営職可構比防断境規術導備貸輸述武限額退準造技復移個非財識程接効旧師易券破編責採因富貿講河適婦寄余禁逆久妻暴険均圧許留罪統精則測豊厚保略承絶版損仏績築混居雑招永刊像基賛犯価布提応検複似証迷夢燃護態預条幹独率群衛張義快評製授慣液貧祖修織故弁素益興鉱枝志綿銅属耕災銭謝仮賀徳序舎敵酸桜句墓飼恩往肥俵眼潔舌';
	var grade6 = '私映党権済認論革疑供割難補優収宅警訪域担若脳蔵段呼針専値処否存座除降並危将装諸亡劇背署延乱派庁城層裏勤策困著誌刻宇欲痛枚郵裁探骨届巻閉展暮簡視臓律純吸株姿閣翌衆片敬泉忘推宝胸砂誤討洗憲尊激窓系批盟従幼拡就異厳捨遺腹乳模紅冊宣盛卵皇臨干頂源創障筋善晩密拝我棒幕染傷秘縮蒸射揮賃貴納樹至宗宙詞操誕孝机訳看奏郷灰己忠沿誠俳聖潮鋼縦仁穴暖朗肺熟陛糖覧奮后班寸磁垂穀絹尺蚕';
	var grade7 = '歳与違欧被渡含況突湾捜超療捕介迎販幅彼般舞込換占頼途抜伸爆普婚齢浮押倒了患絡募払昇遅香更抱恐戻巨震越企触依籍汚互沢逃援傾施緒跡駐紹井雇替鮮贈薄奥詰掛双刺到監環寝審盗訴悩御影撃荒佐核硬融埋渉袋響吹封娘請攻崎賢督催腕及床離柔摘郎殿濃肩零怒泊杯振甘掃掘献疲皆維軟浜沈塁邦凍遣煙抗雄恋緊郊腰踊眠廃怖江珍僚吉喫踏壊債儀溶継闘葬避涙匹逮鋭迫惑崩聴脱塗軒締執叫房撤削措載乾陣為抑祈択秀髪徴忙弾償拠拒刑塚致繰尾描汗鈴盤項喪伴懸湿契掲躍棄瓶邸咲還召慮缶隻枠脂恵露沖緩肌需靴購充鈍恥貢却端獲泥併徹衝焦奪隅浦偶析辛磨譲称挑誘紛促慎控握姓筒俊粒渋銃偉携診託撮侵括駆透津壁稲畳裂敏是排裕堅芝綱膚扱顧訟戒祉誉歓勧騒閥甲濯縄猫揺免既薦塔隣沸華範隠哲菓杉釈幾妥威豪滞微隆症暫帽肝喚妙枯索襲懇柄驚麻剤瀬趣陥斎貫仙慰涼舟旬兼旨即柳偽較覇符詳抵脅憎肯茂犠距雅飾燥網竜繁畜翼潟魅嫌坊斉敷擁圏罰滅礎腐脚尽僕滑孤炎賠挟寿頑鎖彩摩励輝蓄軸巡稼瞬砲噴誇祥牲曇秩帝唆阻泰賄撲堀菊絞縁唯膨耐塾漏慶猛芳懲剣彰棋恒揚冒倫陳憶潜克岳概拘黙偏雰遇諮狭卓糧簿炉殊殖艦輩奇慢謀拍丈寛覆胞隔浄没暇貞鑑陰滴銘随烈尋稿丹啓丘棟壌漫玄粘悟舗妊騰遂狂岐緯培衰艇屈淡抽披廷准奨浸剰胆繊虚霊悔諭惨虐翻墜沼据徐搭盾滝軌妨擦鯨荘諾雷漂懐勘栽拐駄添冠斜浪亜詐壇勲魔酬紫紋卸欄逸涯拓獄尚彫穏顕巧矛垣欺釣粧粛愚遭架鬼庶稚滋幻煮姫誓把践呈疎仰剛疾征砕謡嫁謙伺嘆菌頻琴棚酷宰廊寂伏碁俗漠邪晶墨鎮洞履劣殴娠奉憂朴亭怪酔惜穫佳潤悼乏該赴桑髄盆穂壮堤飢傍疫累痴搬癒郭尿凶吐宴賓虜陶鐘憾昆粗訂傘騎寧循忍怠如寮鉛珠凝苗獣哀跳匠蛇澄縫僧眺唐呉凡憩溝恭刈睡錯伯陵霧魂弊妃舶餓窮掌麗臭悦刃縛暦宜盲粋辱轄猿弦窒炊洪摂飽冗桃狩朱渦紳枢碑鍛鼓裸猶塊旋幣膜扇槽慈伐漬糾墳坪紺慌娯羅峡俸厘峰醸弔乙汁尼遍衡薫猟款閲偵喝敢胎酵憤豚遮扉硫赦窃泡又慨紡恨肪扶戯忌濁奔斗迅肖鉢朽殻享藩媒鶏禅嘱胴迭挿陪剖譜悠淑帆暁傑奴錠遷拙侍峠篤渇叔雌堪叙酢吟逓甚崇漆岬癖愉礁屯姻擬塀唇閑幽曹詠卑侮鋳抹尉隷禍酪茎帥逝匿襟蛍寡痢庸坑賊搾畔孔拷嬢渓翁廉謹窯褒醜升殉煩劾堕租桟婿慕罷矯某囚泌漸蚊厄藻嫡嚇凸韻霜硝勅棺儒愁楼薪褐賜繕栓凹錬衷逐斥詔宵妄酌頒肢謄嗣畝抄惰蛮壱侯弧附但芋婆倣倹繭謁箇且斤虞墾璽勺爵遵錘銑塑脹朕痘弐賦丙耗匁濫吏';

	var kunFilter = new Filter({excludeReading: 'on',
								excludeKanji: '',
								includeKanji: ''});
	var onFilter = new Filter({excludeReading: 'kun',
								excludeKanji: '',
								includeKanji: ''});

	var grade1 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade1});
	var grade2 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade2});
	var grade3 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade3});
	var grade4 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade4});
	var grade5 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade5});
	var grade6 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade6});
	var grade7 = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: grade7});

	var data = grade1.process(data);
//	var data = onFilter.process(data);

	var svg = d3.select('#content').append('svg');

	var width = 1000;
	var height = window.innerHeight * 0.8;

	var circleRadius = {
					'kanji': 8,
					'on': 4,
					'kun': 4
					};

	svg.attr('height', height)
	   .attr('width', '100%');

	svg.append("rect")
	    .attr("width", '100%')
	    .attr("height", height)
	//    .attr('stroke', 1)
	//    .attr('stroke', 'black')
	    .style("fill", "none")
	    .style("pointer-events", "all")
	    .call(d3.zoom()
	        .scaleExtent([1 / 20, 10])
	        .on("zoom", zoomed));

	function zoomed() {
	  g.attr("transform", d3.event.transform);
	}

	//resize svg when window size changes
	window.onresize = function() {
		svg.attr('height', window.innerHeight * 0.8);
	};

	var g = svg.append('g')
		.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

	var linkGroup = g.append('g')
		  .attr('class', 'links');

	var nodeGroup = g.append('g')
		  .attr('class', 'nodes');

	var simulation = d3.forceSimulation();

	simulation.nodes();
	simulation.force('charge', d3.forceManyBody().strength(-100))
	simulation.force('collide', d3.forceCollide(35))
	simulation.on('tick', ticked);

	function ticked() {
	    linkGroup.selectAll('line')
	        .attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	    nodeGroup.selectAll('circle')
	        .attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });

	    nodeGroup.selectAll('text')
	        .attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y; });
	}

	function update() {

		simulation
			.nodes(data.nodes);

		simulation.force('link', d3.forceLink(data.links)
				.id(function(d) { return d.id; })
				.distance(30)
				);

		simulation.alpha(1).restart();

		//UPDATE SELECTION
		var nodes = nodeGroup
			.selectAll('g .node')
			.data(data.nodes, function(d) { return d.id; });

		//EXIT SELECTION
		nodes.exit()
			.remove();

		//ENTER SELECTION
		var nodesEnterSelection = nodes.enter()
			  .append('g')
			.attr('class', 'node');

		newTextElements = nodesEnterSelection.append('text')
			  .text(function(d) { return d.id; })
			  .attr('class', function(d) { return d.type; });

		newCircleElements = nodesEnterSelection.append('circle')
			  .attr('r', function(d) { return circleRadius[d.type] });

		nodesEnterSelection.on('click', function(d, i) {
			var fade = 0.1;
		  	var currentNodeId = d.id;
		  	function getLinkedNodes(node) {
		  		return d.type === 'kanji' ? kToR[node.id] : rToK[node.id];
		  	};
		  	var linkedNodeIds = getLinkedNodes(d);
		  	var noFadeNodes = linkedNodeIds;
		  	noFadeNodes.push(currentNodeId);

		  	nodeGroup.selectAll('circle')
		  		.filter( function (d, i) {
		  			return noFadeNodes.indexOf(d.id) === -1;
		  		})
	  			.transition()
	  			.style('opacity', fade);

		  	nodeGroup.selectAll('text')
		  		.filter( function (d, i) {
		  			return noFadeNodes.indexOf(d.id) === -1;
		  		})
	  			.transition()
	  			.style('opacity', fade);

		  	linkGroup.selectAll('line')
		  		.filter( function (d, i) {
		  			return (noFadeNodes.indexOf(d.source.id) === -1
		  					||
		  					noFadeNodes.indexOf(d.target.id) === -1);
		  		})
	  			.transition()
	  			.style('opacity', fade);

		  })

		nodesEnterSelection.on('blur', function() {
		  	nodeGroup.selectAll('circle').transition().style('opacity', 1);
		  	nodeGroup.selectAll('text').transition().style('opacity', 1);
		  	linkGroup.selectAll('line').transition().style('opacity', 1);
		  });

		//UPDATE SELECTION
		var links = linkGroup
			.selectAll('line')
			.data(data.links, function(d) { return d.source.id+'-'+d.target.id; });

		//EXIT SELECTION
		links.exit()
			.remove();

		//ENTER SELECTION
		links.enter()
			  .append('line')
			.attr('class', 'link');

	};

	update();
	console.log(currentFilters);

	removeKun = document.getElementById('removeKun');
	removeKun.onchange = function() {

		if (this.checked) {
		data = onFilter.process(data);
		}
		else {
			data = originalData;
			currentFilters.pop();
			for (i in currentFilters) {
				filter = currentFilters[i];
				data = filter.process(data);
			}
		}
		update();

	};

	manyBodyStrenghtInput = document.getElementById('manyBodyStrenghtInput');
	manyBodyStrenghtInput.onchange = function() {

		simulation.force('charge').strength(this.value);

		simulation.alpha(1).restart();

	};
});