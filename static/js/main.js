//object to record filters currently applied - you must apply manually
//on user inputs of filters or when calling a filter manually in the code
filters = {
	on: false,
	kun: false,
	kanji: ''
};

var romajiToggle = document.getElementById('romajiToggle');
var meaningsToggle = document.getElementById('meaningsToggle');

var kanjiInput = document.getElementById('kanjiInput');

var grade1 = '日一人年大十二本中出三見月生五上四金九入学円子八六下気小七山女百先名川千水男校土木車白天火右左休立手力目田正文口町空雨足早字音花赤青村夕石竹森林王犬玉草耳虫糸貝';
var grade2 = '国長時行分後前間東今高外来話北午書半西電語聞食何南万毎母読友会同自社父地方新場明京通言理体作用強公野思家多心教元近考画海売知道計朝台広少工止切楽店親答夜帰古歌買図週室歩風紙黒春色走秋夏合市内回米当首数記点活原交組引直曜番算肉線声形鳥頭門冬昼茶谷光科弟細丸太戸牛魚兄園馬顔船羽岩角妹池星姉寺遠絵弱晴雪毛黄雲鳴才麦里矢刀弓汽';
var grade3 = '事発者業員開問代動主題意度持世安院界重集物使品死始運終住真有急送転研究起着病待族銀医仕去味写注悪館屋対部相定実決全表習調化駅期取都和平受区洋県進指旅予向勝面委反所次係感投打島両服式談流局放球役身由飲消神配育乗想農州助追商葉落勉負守美命福横深申様港階路他橋岸客登速央号根苦具鉄返短油植宿薬倍波第幸練軽等曲庭血温庫漢坂息板列遊君章宮酒悲秒暗陽皮整歯柱祭筆童畑緑礼昔泳荷炭昭湖湯箱級氷寒拾鼻皿詩丁豆暑帳羊笛';
var grade4 = '不以別特料建試験英議民連選関戦最約法的要治成協機加続改初産府共得告軍参利信側求昨官変各果必争無位置借費付説夫害副席残堂念象労例然伝働景飯好賞辺低失差課末極種量望観察型達良候史満敗管兵積録省周材飛殺単完競給歴辞愛未航冷類児印輪熱清氏覚億芸便停陸帯努固散静喜囲卒順結老令徒貨案季欠底挙願希笑束仲栄札包折焼照漁松貯票訓浴塩器士兆祝健衣隊臣浅標勇械菜刷司康孫紀毒博救功粉養街節郡灯胃典倉唱旗梅牧泣径脈鏡巣芽腸';
var grade5 = '質政経現性制務総領設支報解資際査判在件団任増情示確勢減容演能再格過税常状営職可構比防断境規術導備貸輸述武限額退準造技復移個非財識程接効旧師易券破編責採因富貿講河適婦寄余禁逆久妻暴険均圧許留罪統精則測豊厚保略承絶版損仏績築混居雑招永刊像基賛犯価布提応検複似証迷夢燃護態預条幹独率群衛張義快評製授慣液貧祖修織故弁素益興鉱枝志綿銅属耕災銭謝仮賀徳序舎敵酸桜句墓飼恩往肥俵眼潔舌';
var grade6 = '私映党権済認論革疑供割難補優収宅警訪域担若脳蔵段呼針専値処否存座除降並危将装諸亡劇背署延乱派庁城層裏勤策困著誌刻宇欲痛枚郵裁探骨届巻閉展暮簡視臓律純吸株姿閣翌衆片敬泉忘推宝胸砂誤討洗憲尊激窓系批盟従幼拡就異厳捨遺腹乳模紅冊宣盛卵皇臨干頂源創障筋善晩密拝我棒幕染傷秘縮蒸射揮賃貴納樹至宗宙詞操誕孝机訳看奏郷灰己忠沿誠俳聖潮鋼縦仁穴暖朗肺熟陛糖覧奮后班寸磁垂穀絹尺蚕';
var grade7 = '歳与違欧被渡含況突湾捜超療捕介迎販幅彼般舞込換占頼途抜伸爆普婚齢浮押倒了患絡募払昇遅香更抱恐戻巨震越企触依籍汚互沢逃援傾施緒跡駐紹井雇替鮮贈薄奥詰掛双刺到監環寝審盗訴悩御影撃荒佐核硬融埋渉袋響吹封娘請攻崎賢督催腕及床離柔摘郎殿濃肩零怒泊杯振甘掃掘献疲皆維軟浜沈塁邦凍遣煙抗雄恋緊郊腰踊眠廃怖江珍僚吉喫踏壊債儀溶継闘葬避涙匹逮鋭迫惑崩聴脱塗軒締執叫房撤削措載乾陣為抑祈択秀髪徴忙弾償拠拒刑塚致繰尾描汗鈴盤項喪伴懸湿契掲躍棄瓶邸咲還召慮缶隻枠脂恵露沖緩肌需靴購充鈍恥貢却端獲泥併徹衝焦奪隅浦偶析辛磨譲称挑誘紛促慎控握姓筒俊粒渋銃偉携診託撮侵括駆透津壁稲畳裂敏是排裕堅芝綱膚扱顧訟戒祉誉歓勧騒閥甲濯縄猫揺免既薦塔隣沸華範隠哲菓杉釈幾妥威豪滞微隆症暫帽肝喚妙枯索襲懇柄驚麻剤瀬趣陥斎貫仙慰涼舟旬兼旨即柳偽較覇符詳抵脅憎肯茂犠距雅飾燥網竜繁畜翼潟魅嫌坊斉敷擁圏罰滅礎腐脚尽僕滑孤炎賠挟寿頑鎖彩摩励輝蓄軸巡稼瞬砲噴誇祥牲曇秩帝唆阻泰賄撲堀菊絞縁唯膨耐塾漏慶猛芳懲剣彰棋恒揚冒倫陳憶潜克岳概拘黙偏雰遇諮狭卓糧簿炉殊殖艦輩奇慢謀拍丈寛覆胞隔浄没暇貞鑑陰滴銘随烈尋稿丹啓丘棟壌漫玄粘悟舗妊騰遂狂岐緯培衰艇屈淡抽披廷准奨浸剰胆繊虚霊悔諭惨虐翻墜沼据徐搭盾滝軌妨擦鯨荘諾雷漂懐勘栽拐駄添冠斜浪亜詐壇勲魔酬紫紋卸欄逸涯拓獄尚彫穏顕巧矛垣欺釣粧粛愚遭架鬼庶稚滋幻煮姫誓把践呈疎仰剛疾征砕謡嫁謙伺嘆菌頻琴棚酷宰廊寂伏碁俗漠邪晶墨鎮洞履劣殴娠奉憂朴亭怪酔惜穫佳潤悼乏該赴桑髄盆穂壮堤飢傍疫累痴搬癒郭尿凶吐宴賓虜陶鐘憾昆粗訂傘騎寧循忍怠如寮鉛珠凝苗獣哀跳匠蛇澄縫僧眺唐呉凡憩溝恭刈睡錯伯陵霧魂弊妃舶餓窮掌麗臭悦刃縛暦宜盲粋辱轄猿弦窒炊洪摂飽冗桃狩朱渦紳枢碑鍛鼓裸猶塊旋幣膜扇槽慈伐漬糾墳坪紺慌娯羅峡俸厘峰醸弔乙汁尼遍衡薫猟款閲偵喝敢胎酵憤豚遮扉硫赦窃泡又慨紡恨肪扶戯忌濁奔斗迅肖鉢朽殻享藩媒鶏禅嘱胴迭挿陪剖譜悠淑帆暁傑奴錠遷拙侍峠篤渇叔雌堪叙酢吟逓甚崇漆岬癖愉礁屯姻擬塀唇閑幽曹詠卑侮鋳抹尉隷禍酪茎帥逝匿襟蛍寡痢庸坑賊搾畔孔拷嬢渓翁廉謹窯褒醜升殉煩劾堕租桟婿慕罷矯某囚泌漸蚊厄藻嫡嚇凸韻霜硝勅棺儒愁楼薪褐賜繕栓凹錬衷逐斥詔宵妄酌頒肢謄嗣畝抄惰蛮壱侯弧附但芋婆倣倹繭謁箇且斤虞墾璽勺爵遵錘銑塑脹朕痘弐賦丙耗匁濫吏';

var tree = '木本札末未禾朮休机朴朽朱朸朿凩朷朶耒杁村来体材束条困床杉杜杏杖李宋杣杙杤杓杞杢杆呆杠沐林東妹味板果松枝述枚刹刺析枠枕杯枢采抹杵杭枇茉沫杷枌杳杲枅枦枋枡侏杼杰來枉牀杪枩茶相柱栄保査染栃架昧某柔柵柿柳枯柄勅柏柚柾柑柊柘栂柎柮柁柆柯枷柢洙柬柝柞枳茱柤剌枹枸柩枴校根速梅殺案格桜耕株桃途耗核凍栽珠殊栓桁桑桟栖桐栗桧桂桔柴栞悃莱桎栴栲秣桍栩框栫柧档恷眛栢悚烋耙桙耘桓深械菜巣術採探彩菓梨麻梗陳徠梓梢桶梯梧彬梶梛椛梁淋笨梟桾埜耜桿桀梺紮梏梭梔梠梼菘桝菻梱敕梵條梦桴梳淅梹婪桷淞梃梍森集植葉検棒策棟椎疎棋椅閑棺棚媒湘棲煉焚琳喋椀椋棠棯棹棘椨椪躰椚椥蛛椣喇葆棣椡棆椙晰棗棊椄椢椁椦棡椒廂弑椏椈渠棕椌竦棧棉渣渫揀揉溂棍棔堡新楽想業極禁裸慄傑楷鉢棄彙塗楼煤楊楓牒楢椰楯楕楚槌椿楠榊耡楳椴椶痲痳皙罧誅楪榁楝躱楞楡楙椽楴勦剿楸楮榔楾楔楹誄楜貅楫椹様練歴雑構模辣概暦漆槇榛槙樋漱槍榎樺榠麼綵滌榲褓榱槞蜥榴榮榕嫩榜裹銖夥靺榑槐榧槃榻槝槊寨槎踈榾嗽嘛槓槁榿樮箱横課標権膝槽摩魅蝶槻樟樌賚緤醂踝諌樢潸嫻蕀糅樣槨樂樛槿樓槹槲槧樅樗樞槭樔槫樊樒麾親橋薬整機築樹操頼薪謀錬磨橙樽樫橘諫檠諜橄樶耨橲篥磔樸橡憖懆橈澡噤橢噺霖噪橇蹂樵橸橦燥霜檀櫛檜篠檎藁檄闌懋檪檍隸襍檐糜襃檗縻顆檣簗藉檬鮴橿檢礎襟麿櫂櫃藕櫁檳檸檮釐雜鞣鬆藥擽繰瀬藻麓櫓蘭櫚攀懶櫑蘂爍瀝櫞藾檻獺櫟鶇靡嬾欄籍蘗櫪礬譟鶫蘖櫨蠑礫躁孀瀾鰈鰊魔囃癩癧櫺權櫻欅爛襯襴轢籟髞欒鑠轣靂欖欝欟鬱爨';
var things = '品區嵒傴嶇嫗奩嘔歐樞毆操噪澡甌懆蕚燥癌臨謳藻繰躁譟驅髞';
var eat = '食飢飲飯喰飼飾飽飴飫飩飭飮餌餅蝕養餓餉餃館餐餘餔餝餒餤餠餞餡餬瀁餮餾饂餽癢饉饅饐饑饋饌饒饗饕鱶';

var circleRadius = {
				'kanji': 21,
				'on': 0,
				'kun': 0
				};
