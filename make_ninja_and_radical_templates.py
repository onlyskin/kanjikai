#!/usr/bin/env python
# -*- coding: utf-8 -*-
import codecs

radicals = {
    'tree': ('green', u'木', u'木本札末未休机朴朽朱村来体材束条困床杉林東妹味板果松枝述枚刺析枠杯枢抹茶相柱栄保査染架某柔柳枯柄勅校根速梅殺案格桜耕株桃途耗核凍栽珠殊栓桑桟深械菜巣術採探彩菓麻陳森集植葉検棒策棟疎棋閑棺棚媒新楽想業極禁裸傑鉢棄塗楼様練歴雑構模概暦漆箱横課標権槽摩魅親橋薬整機築樹操頼薪謀錬磨燥霜礎襟繰瀬藻欄籍魔'),
    'thing': ('red', u'品', u'品區嵒傴嶇嫗奩嘔歐樞毆操噪澡甌懆蕚燥癌臨謳藻繰躁譟驅髞'),
    'eat': ('yellow', u'食', u'食飢飲飯喰飼飾飽飴飫飩飭飮餌餅蝕養餓餉餃館餐餘餔餝餒餤餠餞餡餬瀁餮餾饂餽癢饉饅饐饑饋饌饒饗饕鱶'),
    'person': ('purple', u'人', u'化仏仁什仇仆仂仍他代仕付仙仔仟仗仭仞休仲伝仮任件伎伐伏仰伊伍伉价伜花何体作住位低似伴伸伺但伯佐伽伶佑佃佚佝囮佛估佇佞佗夜使府例価供佳侍附侮併依侑侃苻佶侠凭侫佯咐侭佰佩岱拊坿垈侘侏侈佼佻係信便保侶侵俊侯俗促俄俣俐柎俘荏俛茯俚姙俟俔俑玳俤俥倍荷借候修俵個俳値倒俸俺倫倹倣倭倖俯們俾倚倬倨莅恷倆倔倪倶倡倥倏倅埖恁烋俶倩宿貨停側健液偽偏悠袋偶偵符脩倦偲椛偖袵偬袱偸做偈偃假偐偕訛掖條備貸偉僅喉傍雁椨堡猴腑腋葆硴傅傀傚筏働傷賃傾傑僧債催靴傲傭絛筰筱貅糀傴僊蓚僂傳像閥腐僕僚僞僑僥僖僭滌儁褓僣蓿僮億儀褒輦鴈僻價儚儉篌儂錵僵儒黛儘儕儔鮒憊優縮償儲篠鮴縱濮儖應膺儡鞭贋鵺軅鏥儺儷儼儻鷹軈'),
    'sword': ('gray', u'⺉', u'刈刊刋列刑刔刎別利判苅刪刷例制刻刹刺到冽刳刮前型則削俐剄洌剃剋剌荊帰剣剥烈剖倒剛剤莉捌悧剞剔側副梨剰剳渕剪厠偸犁測創割痢喩愉裂揃渝惻掣剴剩揄溂廁喇椡煎楡逾剿剽愈瑜蜊製罰劃瘉箚劇劉翦劍蝓箭輸諭踰覦薊劑鍮癒嚠瀏擶鯏'),
    'road': ('gray', u'⻌', u'辺込辻辷迅巡迂迄辿近返迎述迫迭迪迦迩迚追送迷逆退逃迢迯迥通速連造途逝逐逓透逢這逗迹迺迸逅迴週進逸逮逞逧逖逋逡逑逎逕逍道運遊達過遅遂随遍遇遥遁遏逶逼逵逹遠違遣遡遜蓬槌蓮漣逾遖腿遑遐遉遒適遮遭樋遙嗹遘遞慥選導遺遵遷遼遯隧縋褪遨還謎縫避遲隨遶撻暹遽燵邂鎚邀邁篷縺燧膸邇邉邃鎹髄鏈邊譴闥鑓韃邏髓韆靆'),
    'hand': ('orange', u'扌', u'扎打払扱托扨扠扛扞扣投折技批把抑抄抜扶択抗抉找抂抒抖扼抃抛抓扮抔招担拝拡拉抽押拐抵拓拘拠披拙拒拍抱抹拊拂拆抻拇拈拑拗抬拔拌拾持指拭拷拶挑括挟按挂拵拮拯拱挧拜挌挫捉哲捕逝振捜挿捗挨挺挽浙捐捩捌捍捏挾授接採探捨推排描控措据掲捻掘掃掛掬掠捧捺捷掵捫掴掫掀掟掖掉捶晢掩掏掎掻提揮揺援握揚換搭捲揃揣揀揆湃揖掾揄揶插揩揉損搾携摂搬搗搖搨搆摸搶搏搦搜搓誓摘摺摎箝箍摧摶撤撲撮撰撞撒撫播撥撈撚撩撓撕撹操擁據撼擔擒擅擇擂撻擦擬擢擠擣擯擱擡擴擲擺擽擾擶攅籀攘攜攝攤攪攫攬'),
    'water': ('blue', u'氵', u'氾汁汀池汗汎汚江汝汐汕汢汽決沖汰没沙沃沈沢汲沌泛汾汨沁汪沂沍汳沐沚沒油波泳注治泣法河沿況泌泊泥沼沸泡沫沾沽泓泱泝沮泄泅泪沺沛泯沱泗泙范海活洋浅染洗派洞津浄洪洛洲洸洵洫洩洳洶洌洙洟衍洽洒茫流消酒浴浜浪浸涙浦浮浬浩莎涌浙涎浹娑涕涛涓涅涜浤浣浚深清液混済添涼渋婆淑淡渉渓淫涯渇渚淳梁淀淋淅淒淨菠淌淺萢淞笵淬淙淆涸淦淤淇涵渊渕渮淹淮淘淪萍淕落湖港温湯満測減湾湿滋渦湧渡湊淵湘湛渥湟湲湫溌琺渫湶湍渟湃渺湎盜渭湮渤渠渝游溂渙渣渾漢準源滑滞漠滝溝羨滅溺溶塗蒲溜溢漣滉裟溟滂碆溥溪溏滔愆粱塰溲滄溯匯溘滓溷溽漁演漆漏滴漫漸漬漂漕窪箔漱滸慂滲滾滯滿漲漉蔆滷潅漾漓滌滬潔潮潰潜澄潤潟潯漑潸潴潭蕩澗澂潘澎澑潦潼濆澆潺澁激濁濃薄澪澤霑濛澹澱薀澡霈澳澣濂濯鴻濡濤濟濕濬濔濘濱濮澀濠簗瀞闊潛濶盪濫藩濺瀑濾瀁瀦瀋瀉懣瀏鯊藻瀬簿瀛霪瀚瀝瀧濳瀟瀘瀕瀰瀾灌蘯瀲灘灑灣'),
    'heart': ('pink', u'忄', u'忙忖快忸忰忻忤忱性怖怪怜怩怙怐怯怺怛怏怦怕怡怫恨悔恒恢恰恆恊恠恫恟恬恂恪恤恃恍悦悟悩悌悃悋悁悧悍悒悄悖悗悛悚情惧惜悼惨惟惚惇惆惘悵悽悴悸愉慌惰惺愀惴惻愃惓惶愕惱愎愡慎慨慄愾慊慍愴愼愧愽慣慢憎慚慵慟慓慱慥慯慷慘慴憬憤憧慳憫憚憔憮懐憶憾憐懌懊罹懈懆憺懍懦懴懷懶懺懽懼懾'),
    'word': ('yellow', u'言', u'言計信訃訂記訓討託這訊訖訌訐設許訳訪訟訣訥訛証評詞訴詐詠診詔註詛詆訶詑詒訝詁詈話詩試誠誇詳該詮詰誉詣詢詫詭誄詬誅詼誂読語説認誤誌獄罰誘誓滸誨誡誑誥誣誦誚談調課誕論諸請諾謁誰諄諏諒誼諌諂誹諍罸諚諦謀諭謎諧諮謡諺謂諢諠謔諳諷諞諛諡澹諫諜憺擔諤謝講謙謄謹儲謚燮譁謨檐謠謗謐謖謌嶽諱膽謇謬謫謦藷謾謳鞫瞻識警譜譚譏譎譌蟾藹譛簷證議護譲譟譯譱贍譽譫譬譖譴辯讃彎讀巒讐戀攣變讎欒讌靄讒讓讖讙蠻臠灣讚鑾鸞'),
    'thread': ('purple', u'糸', u'糸系糺級係約紀紅糾紂紆紙孫素納純索紛紡紋紐紗紘紕紊紜組細終経累紳紺紹紬絃絆紮紲絅紵紿絋絵結給統絶衆絞絡紫絢絎絖葯絨絣絏絮絲続絹継遜絛綏絽絳綛綟經綉緑練総綿綻維緒網綱綜綴綾綺緋綸綬緕綯緇綵綣綮綰綢綽綫線潔編縁締緩縄緊緤緝緘緜緞緲緡緬縋縅縦縛緯縫緻繁縞瘰縣縢縉縡縟縊縒績縮繊螺徽縷繍縵縺縲縱繆繦繋繃縹總縻織繕繭彝繚繙羂繞鯀繖繧繝繰羅繪繩蘊櫞繹懸纂蘰繽纃繼繻辮纏纉纐纎騾繿纈續轡纒巒蘿彎籘纖纔邏戀纓欒變攣臠蠻灣纛鑼鑾纜鸞'),
    'grass': ('green', u'艹', u'艾芝芋芒艸芍花芸芳芯芹芭芦芙芥苅芫芬芟苦芽英若茂苗茎苛茉茄苺苔苑茅苒苜苟苓苣苡苴苳范苻苙苫苞苧茆苹草茶茨荘荒茜茸荀茵荅茯茫荊茗荐荏茘茱茴茲茖莽茹荷華匿莫荻莞莉茣莖莚荼莨莅莇莎莠荵荳莢莟莱莵莊莪埖莓芻菜著葛萎菓描菊猫菌萄椛萠菫菩萌菅菱菖萃菘萋菁菽菷萇菠菎菲萍萢萓菻菴剳菟渮落葉満備敬勤募慌僅搭塔葬董惹萱葺萩瑛葡葵葭韮萪萼萸蒄葷菰葫葮蒂葩葆暎葯葹葱萵葢賁硴葎萬漢夢墓幕蒸蓋寛嘆漠蓄蒐蓑蒼蒔蓮蓉蒙葦蓬蒲嘩蓁獏蒟蓊摸糀蒋蒹蒡蓖蓆蓙蒿蓐蓚蒻蓍蒭寞蒜鄒模暮蔑慕膜蔭樺蔓歎蔦蔔蔟蔕蔘蔆蓼蔀蔚蓴蓿慝蔡曄鋩蔗蔵憤蔽噴墳諾蕨蕪蕃蕎蕉蔬甍瑾膵墸蕀蕘蕩蕈蕁蕋蟒冪儚蕊錵槿錺濆蕕薬薪薫薦獲薄蕗燕薙蕾蕭蕷薜臈薇薛薔蕚蟇薐錨蟆薨薊薯檠薮薗霙薑薈薤薀蕣嚆濛憊糒餝糢謹藁薩謨朦貘艱譁薺曚癘藉舊藐懃蠎邁薹檬難繭藩藤穫藍藝羃藥藜鞳藏藪矇藷覲藕警臓藻蘭蘇蘂蘊躇鞴礪藹瀟蘓蘋藾藺蘆蘢襪蠖勸艨護糲蠣灌蘰蘚饉驀蘯蘗懽蘖灘權囈歡儺驚攤臟蘿韈罐觀讙鑵躪顴驩欟鸛'),
    'metal': ('gray', u'金', u'金針釜釘釛釟釡釖釣釧釶淦崟釼釵釦鈍欽鈞釿鈕鈑鈔鈩鈬鈎鉄鉱鉛鈴鉢鉗鉅鉦鉉鉤鈿鉋鈷鉐鉚鉈鉞銀銭銅銃銘銑銚銜銖銓銛銕鋩鉾鋭鋳鋒劉鋪錺銷銹鋏錵鋤鋲録鋼錠錯錮錬錦錫錆鋸錘錐錻錏錢錙鍄錨錣錚鋺鍵鍛鍋鍬鍼鍮鍠鍍鍾鍖鍜鍔鎚鎮鎖鎌鎧瀏鎹鎭鎗鎬嚠鎰鎔鏡鏖鏃鏤鏑鏈鏘鏝鏨鏥鏐鐘鐫鏗鐙鐡鐐鐔鐓鐃鐇鐚鐶鑓鐵鐸鐺鑁鑄鑑鑒鑠鑢鑛鑚鑞鑪鑰鑵鑷鑽鑾鑼钁鑿'),
}

ninja_file_output = '''src_dir = .
build_dir = out

rule cp
  command = cp $in $out

rule sass
  command = sass $in $out

rule jinja
  command = python jinja.py $in $out

build $build_dir/favicon.ico: cp favicon.ico

build $build_dir/static/js/d3.min.js: cp static/js/d3.min.js
build $build_dir/static/js/main.js: cp static/js/main.js
build $build_dir/static/js/radicals.js: cp static/js/radicals.js
build $build_dir/static/js/utilities.js: cp static/js/utilities.js
build $build_dir/static/js/kanjikai.js: cp static/js/kanjikai.js
build $build_dir/static/js/toggles.js: cp static/js/toggles.js
build $build_dir/static/data/large.json: cp static/data/large.json

build $build_dir/static/css/type/Vollkorn-Regular.ttf: cp static/css/type/Vollkorn-Regular.ttf
build $build_dir/static/css/type/Vollkorn-Bold.ttf: cp static/css/type/Vollkorn-Bold.ttf
build $build_dir/static/css/main.css: sass static/css/main.scss | static/css/_reset.scss static/css/_rangeslider.scss static/css/_switch.scss

build $build_dir/index.html: jinja html_files/templates/index.html | html_files/templates/base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/radical_links.html

build $build_dir/about.html: jinja html_files/templates/about.html | html_files/templates/base.html html_files/templates/header.html html_files/templates/footer.html

build $build_dir/sandbox.html: jinja html_files/templates/sandbox.html | html_files/templates/base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/grade_select.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/sandbox_controls.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_1.html: jinja html_files/templates/grade_1.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_2.html: jinja html_files/templates/grade_2.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_3.html: jinja html_files/templates/grade_3.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_4.html: jinja html_files/templates/grade_4.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_5.html: jinja html_files/templates/grade_5.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_6.html: jinja html_files/templates/grade_6.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js

build $build_dir/grade_7.html: jinja html_files/templates/grade_7.html | html_files/templates/base.html html_files/templates/grade_base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html html_files/templates/grade_select.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js
'''

for radical in radicals.keys():
    ninja_file_output += '\nbuild $build_dir/{}.html: jinja html_files/templates/{}.html | html_files/templates/base.html html_files/templates/header.html html_files/templates/footer.html html_files/templates/grade_select.html html_files/templates/optional_controls.html html_files/templates/non_optional_controls.html html_files/templates/standard_controls.html static/js/main.js static/js/utilities.js static/js/kanjikai.js static/js/toggles.js static/js/radicals.js\n'.format(radical, radical)

radical_links_output = u'<div class="radicalLinkContainer">\n'
for radical in radicals.keys():
    radical_links_output += u'    <a href="{}.html" class="indexLink {} radical">{}</a>\n'.format(radical, radicals[radical][0], radicals[radical][1])
radical_links_output += u'</div>\n'

radicals_js_output = u''
for radical in radicals.keys():
    radicals_js_output += u'''var {} = '{}';\n'''.format(radical, radicals[radical][2])

radical_html_output = u'''{% extends 'grade_base.html' %}
{% block script %}
<script>make_force_layout(******)</script>
{% endblock %}'''

def write_file(filename, contents):
    with codecs.open(filename, 'w', 'utf-8') as f:
        f.write(contents)

if __name__ == '__main__':
    write_file('build.ninja', ninja_file_output)
    write_file('html_files/templates/radical_links.html', radical_links_output)
    write_file('static/js/radicals.js', radicals_js_output)
    for radical in radicals:
        html_file_name = 'html_files/templates/' + radical + '.html'
        html_file_content = radical_html_output.replace(u'******', radical)
        write_file(html_file_name, html_file_content)

