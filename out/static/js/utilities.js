breakSymbol = '_';

var orderedHeisigDict = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10, "口": 11, "日": 12, "月": 13, "田": 14, "目": 15, "古": 16, "吾": 17, "冒": 18, "朋": 19, "明": 20, "唱": 21, "晶": 22, "品": 23, "呂": 24, "昌": 25, "早": 26, "旭": 27, "世": 28, "胃": 29, "旦": 30, "胆": 31, "亘": 32, "凹": 33, "凸": 34, "旧": 35, "自": 36, "白": 37, "百": 38, "中": 39, "千": 40, "舌": 41, "升": 42, "昇": 43, "丸": 44, "寸": 45, "専": 46, "博": 47, "占": 48, "上": 49, "下": 50, "卓": 51, "朝": 52, "只": 53, "貝": 54, "貞": 55, "員": 56, "見": 57, "児": 58, "元": 59, "頁": 60, "頑": 61, "凡": 62, "負": 63, "万": 64, "句": 65, "肌": 66, "旬": 67, "勺": 68, "的": 69, "首": 70, "乙": 71, "乱": 72, "直": 73, "具": 74, "真": 75, "工": 76, "左": 77, "右": 78, "有": 79, "賄": 80, "貢": 81, "項": 82, "刀": 83, "刃": 84, "切": 85, "召": 86, "昭": 87, "則": 88, "副": 89, "別": 90, "丁": 91, "町": 92, "可": 93, "頂": 94, "子": 95, "孔": 96, "了": 97, "女": 98, "好": 99, "如": 100, "母": 101, "貫": 102, "兄": 103, "克": 104, "小": 105, "少": 106, "大": 107, "多": 108, "夕": 109, "汐": 110, "外": 111, "名": 112, "石": 113, "肖": 114, "硝": 115, "砕": 116, "砂": 117, "削": 118, "光": 119, "太": 120, "器": 121, "臭": 122, "妙": 123, "省": 124, "厚": 125, "奇": 126, "川": 127, "州": 128, "順": 129, "水": 130, "氷": 131, "永": 132, "泉": 133, "原": 134, "願": 135, "泳": 136, "沼": 137, "沖": 138, "江": 139, "汁": 140, "潮": 141, "源": 142, "活": 143, "消": 144, "況": 145, "河": 146, "泊": 147, "湖": 148, "測": 149, "土": 150, "吐": 151, "圧": 152, "埼": 153, "垣": 154, "圭": 155, "封": 156, "涯": 157, "寺": 158, "時": 159, "均": 160, "火": 161, "炎": 162, "煩": 163, "淡": 164, "灯": 165, "畑": 166, "災": 167, "灰": 168, "点": 169, "照": 170, "魚": 171, "漁": 172, "里": 173, "黒": 174, "墨": 175, "鯉": 176, "量": 177, "厘": 178, "埋": 179, "同": 180, "洞": 181, "胴": 182, "向": 183, "尚": 184, "字": 185, "守": 186, "完": 187, "宣": 188, "宵": 189, "安": 190, "宴": 191, "寄": 192, "富": 193, "貯": 194, "木": 195, "林": 196, "森": 197, "桂": 198, "柏": 199, "枠": 200, "梢": 201, "棚": 202, "杏": 203, "桐": 204, "植": 205, "枯": 206, "朴": 207, "村": 208, "相": 209, "机": 210, "本": 211, "札": 212, "暦": 213, "案": 214, "燥": 215, "未": 216, "末": 217, "沫": 218, "味": 219, "妹": 220, "朱": 221, "株": 222, "若": 223, "草": 224, "苦": 225, "寛": 226, "薄": 227, "葉": 228, "模": 229, "漠": 230, "墓": 231, "暮": 232, "膜": 233, "苗": 234, "兆": 235, "桃": 236, "眺": 237, "犬": 238, "状": 239, "黙": 240, "然": 241, "荻": 242, "狩": 243, "猫": 244, "牛": 245, "特": 246, "告": 247, "先": 248, "洗": 249, "介": 250, "界": 251, "茶": 252, "合": 253, "塔": 254, "王": 255, "玉": 256, "宝": 257, "珠": 258, "現": 259, "狂": 260, "皇": 261, "呈": 262, "全": 263, "栓": 264, "理": 265, "主": 266, "注": 267, "柱": 268, "金": 269, "銑": 270, "鉢": 271, "銅": 272, "釣": 273, "針": 274, "銘": 275, "鎮": 276, "道": 277, "導": 278, "辻": 279, "迅": 280, "造": 281, "迫": 282, "逃": 283, "辺": 284, "巡": 285, "車": 286, "連": 287, "軌": 288, "輸": 289, "前": 290, "各": 291, "格": 292, "略": 293, "客": 294, "額": 295, "夏": 296, "処": 297, "条": 298, "落": 299, "冗": 300, "軍": 301, "輝": 302, "運": 303, "冠": 304, "夢": 305, "坑": 306, "高": 307, "享": 308, "塾": 309, "熟": 310, "亭": 311, "京": 312, "涼": 313, "景": 314, "鯨": 315, "舎": 316, "周": 317, "週": 318, "士": 319, "吉": 320, "壮": 321, "荘": 322, "売": 323, "学": 324, "覚": 325, "栄": 326, "書": 327, "津": 328, "牧": 329, "攻": 330, "敗": 331, "枚": 332, "故": 333, "敬": 334, "言": 335, "警": 336, "計": 337, "獄": 338, "訂": 339, "討": 340, "訓": 341, "詔": 342, "詰": 343, "話": 344, "詠": 345, "詩": 346, "語": 347, "読": 348, "調": 349, "談": 350, "諾": 351, "諭": 352, "式": 353, "試": 354, "弐": 355, "域": 356, "賊": 357, "栽": 358, "載": 359, "茂": 360, "成": 361, "城": 362, "誠": 363, "威": 364, "滅": 365, "減": 366, "桟": 367, "銭": 368, "浅": 369, "止": 370, "歩": 371, "渉": 372, "頻": 373, "肯": 374, "企": 375, "歴": 376, "武": 377, "賦": 378, "正": 379, "証": 380, "政": 381, "定": 382, "錠": 383, "走": 384, "超": 385, "赴": 386, "越": 387, "是": 388, "題": 389, "堤": 390, "建": 391, "延": 392, "誕": 393, "礎": 394, "婿": 395, "衣": 396, "裁": 397, "装": 398, "裏": 399, "壊": 400, "哀": 401, "遠": 402, "猿": 403, "初": 404, "布": 405, "帆": 406, "幅": 407, "帽": 408, "幕": 409, "幌": 410, "錦": 411, "市": 412, "姉": 413, "肺": 414, "帯": 415, "滞": 416, "刺": 417, "制": 418, "製": 419, "転": 420, "芸": 421, "雨": 422, "雲": 423, "曇": 424, "雷": 425, "霜": 426, "冬": 427, "天": 428, "橋": 429, "嬌": 430, "立": 431, "泣": 432, "章": 433, "競": 434, "帝": 435, "童": 436, "瞳": 437, "鐘": 438, "商": 439, "嫡": 440, "適": 441, "滴": 442, "敵": 443, "匕": 444, "北": 445, "背": 446, "比": 447, "昆": 448, "皆": 449, "混": 450, "渇": 451, "謁": 452, "褐": 453, "喝": 454, "旨": 455, "脂": 456, "壱": 457, "毎": 458, "敏": 459, "梅": 460, "海": 461, "乞": 462, "乾": 463, "腹": 464, "複": 465, "欠": 466, "吹": 467, "炊": 468, "歌": 469, "軟": 470, "次": 471, "茨": 472, "資": 473, "姿": 474, "諮": 475, "賠": 476, "培": 477, "剖": 478, "音": 479, "暗": 480, "韻": 481, "識": 482, "鏡": 483, "境": 484, "亡": 485, "盲": 486, "妄": 487, "荒": 488, "望": 489, "方": 490, "妨": 491, "坊": 492, "芳": 493, "肪": 494, "訪": 495, "放": 496, "激": 497, "脱": 498, "説": 499, "鋭": 500, "曽": 501, "増": 502, "贈": 503, "東": 504, "棟": 505, "凍": 506, "妊": 507, "廷": 508, "染": 509, "燃": 510, "賓": 511, "歳": 512, "県": 513, "栃": 514, "地": 515, "池": 516, "虫": 517, "蛍": 518, "蛇": 519, "虹": 520, "蝶": 521, "独": 522, "蚕": 523, "風": 524, "己": 525, "起": 526, "妃": 527, "改": 528, "記": 529, "包": 530, "胞": 531, "砲": 532, "泡": 533, "亀": 534, "電": 535, "竜": 536, "滝": 537, "豚": 538, "逐": 539, "遂": 540, "家": 541, "嫁": 542, "豪": 543, "腸": 544, "場": 545, "湯": 546, "羊": 547, "美": 548, "洋": 549, "詳": 550, "鮮": 551, "達": 552, "羨": 553, "差": 554, "着": 555, "唯": 556, "焦": 557, "礁": 558, "集": 559, "准": 560, "進": 561, "雑": 562, "雌": 563, "準": 564, "奮": 565, "奪": 566, "確": 567, "午": 568, "許": 569, "歓": 570, "権": 571, "観": 572, "羽": 573, "習": 574, "翌": 575, "曜": 576, "濯": 577, "曰": 578, "困": 579, "固": 580, "国": 581, "団": 582, "因": 583, "姻": 584, "園": 585, "回": 586, "壇": 587, "店": 588, "庫": 589, "庭": 590, "庁": 591, "床": 592, "麻": 593, "磨": 594, "心": 595, "忘": 596, "忍": 597, "認": 598, "忌": 599, "志": 600, "誌": 601, "忠": 602, "串": 603, "患": 604, "思": 605, "恩": 606, "応": 607, "意": 608, "想": 609, "息": 610, "憩": 611, "恵": 612, "恐": 613, "惑": 614, "感": 615, "憂": 616, "寡": 617, "忙": 618, "悦": 619, "恒": 620, "悼": 621, "悟": 622, "怖": 623, "慌": 624, "悔": 625, "憎": 626, "慣": 627, "愉": 628, "惰": 629, "慎": 630, "憾": 631, "憶": 632, "慕": 633, "添": 634, "必": 635, "泌": 636, "手": 637, "看": 638, "摩": 639, "我": 640, "義": 641, "議": 642, "犠": 643, "抹": 644, "抱": 645, "搭": 646, "抄": 647, "抗": 648, "批": 649, "招": 650, "拓": 651, "拍": 652, "打": 653, "拘": 654, "捨": 655, "拐": 656, "摘": 657, "挑": 658, "指": 659, "持": 660, "括": 661, "揮": 662, "推": 663, "揚": 664, "提": 665, "損": 666, "拾": 667, "担": 668, "拠": 669, "描": 670, "操": 671, "接": 672, "掲": 673, "掛": 674, "研": 675, "戒": 676, "械": 677, "鼻": 678, "刑": 679, "型": 680, "才": 681, "財": 682, "材": 683, "存": 684, "在": 685, "乃": 686, "携": 687, "及": 688, "吸": 689, "扱": 690, "丈": 691, "史": 692, "吏": 693, "更": 694, "硬": 695, "又": 696, "双": 697, "桑": 698, "隻": 699, "護": 700, "獲": 701, "奴": 702, "怒": 703, "友": 704, "抜": 705, "投": 706, "没": 707, "設": 708, "撃": 709, "殻": 710, "支": 711, "技": 712, "枝": 713, "肢": 714, "茎": 715, "怪": 716, "軽": 717, "叔": 718, "督": 719, "寂": 720, "淑": 721, "反": 722, "坂": 723, "板": 724, "返": 725, "販": 726, "爪": 727, "妥": 728, "乳": 729, "浮": 730, "将": 731, "奨": 732, "採": 733, "菜": 734, "受": 735, "授": 736, "愛": 737, "払": 738, "広": 739, "拡": 740, "鉱": 741, "弁": 742, "雄": 743, "台": 744, "怠": 745, "治": 746, "始": 747, "胎": 748, "窓": 749, "去": 750, "法": 751, "会": 752, "至": 753, "室": 754, "到": 755, "致": 756, "互": 757, "棄": 758, "育": 759, "撤": 760, "充": 761, "銃": 762, "硫": 763, "流": 764, "允": 765, "唆": 766, "出": 767, "山": 768, "拙": 769, "岩": 770, "炭": 771, "岐": 772, "峠": 773, "崩": 774, "密": 775, "蜜": 776, "嵐": 777, "崎": 778, "入": 779, "込": 780, "分": 781, "貧": 782, "頒": 783, "公": 784, "松": 785, "翁": 786, "訟": 787, "谷": 788, "浴": 789, "容": 790, "溶": 791, "欲": 792, "裕": 793, "鉛": 794, "沿": 795, "賞": 796, "党": 797, "堂": 798, "常": 799, "裳": 800, "掌": 801, "皮": 802, "波": 803, "婆": 804, "披": 805, "破": 806, "被": 807, "残": 808, "殉": 809, "殊": 810, "殖": 811, "列": 812, "裂": 813, "烈": 814, "死": 815, "葬": 816, "瞬": 817, "耳": 818, "取": 819, "趣": 820, "最": 821, "撮": 822, "恥": 823, "職": 824, "聖": 825, "敢": 826, "聴": 827, "懐": 828, "慢": 829, "漫": 830, "買": 831, "置": 832, "罰": 833, "寧": 834, "濁": 835, "環": 836, "還": 837, "夫": 838, "扶": 839, "渓": 840, "規": 841, "替": 842, "賛": 843, "潜": 844, "失": 845, "鉄": 846, "迭": 847, "臣": 848, "姫": 849, "蔵": 850, "臓": 851, "賢": 852, "堅": 853, "臨": 854, "覧": 855, "巨": 856, "拒": 857, "力": 858, "男": 859, "労": 860, "募": 861, "劣": 862, "功": 863, "勧": 864, "努": 865, "励": 866, "加": 867, "賀": 868, "架": 869, "脇": 870, "脅": 871, "協": 872, "行": 873, "律": 874, "復": 875, "得": 876, "従": 877, "徒": 878, "待": 879, "往": 880, "征": 881, "径": 882, "彼": 883, "役": 884, "徳": 885, "徹": 886, "徴": 887, "懲": 888, "微": 889, "街": 890, "衡": 891, "稿": 892, "稼": 893, "程": 894, "税": 895, "稚": 896, "和": 897, "移": 898, "秒": 899, "秋": 900, "愁": 901, "私": 902, "秩": 903, "秘": 904, "称": 905, "利": 906, "梨": 907, "穫": 908, "穂": 909, "稲": 910, "香": 911, "季": 912, "委": 913, "秀": 914, "透": 915, "誘": 916, "穀": 917, "菌": 918, "米": 919, "粉": 920, "粘": 921, "粒": 922, "粧": 923, "迷": 924, "粋": 925, "糧": 926, "菊": 927, "奥": 928, "数": 929, "楼": 930, "類": 931, "漆": 932, "様": 933, "求": 934, "球": 935, "救": 936, "竹": 937, "笑": 938, "笠": 939, "笹": 940, "筋": 941, "箱": 942, "筆": 943, "筒": 944, "等": 945, "算": 946, "答": 947, "策": 948, "簿": 949, "築": 950, "人": 951, "佐": 952, "但": 953, "住": 954, "位": 955, "仲": 956, "体": 957, "悠": 958, "件": 959, "仕": 960, "他": 961, "伏": 962, "伝": 963, "仏": 964, "休": 965, "仮": 966, "伯": 967, "俗": 968, "信": 969, "佳": 970, "依": 971, "例": 972, "個": 973, "健": 974, "側": 975, "侍": 976, "停": 977, "値": 978, "倣": 979, "倒": 980, "偵": 981, "僧": 982, "億": 983, "儀": 984, "償": 985, "仙": 986, "催": 987, "仁": 988, "侮": 989, "使": 990, "便": 991, "倍": 992, "優": 993, "伐": 994, "宿": 995, "傷": 996, "保": 997, "褒": 998, "傑": 999, "付": 1000, "符": 1001, "府": 1002, "任": 1003, "賃": 1004, "代": 1005, "袋": 1006, "貸": 1007, "化": 1008, "花": 1009, "貨": 1010, "傾": 1011, "何": 1012, "荷": 1013, "俊": 1014, "傍": 1015, "久": 1016, "畝": 1017, "囚": 1018, "内": 1019, "丙": 1020, "柄": 1021, "肉": 1022, "腐": 1023, "座": 1024, "卒": 1025, "傘": 1026, "匁": 1027, "以": 1028, "似": 1029, "併": 1030, "瓦": 1031, "瓶": 1032, "宮": 1033, "営": 1034, "善": 1035, "年": 1036, "夜": 1037, "液": 1038, "塚": 1039, "幣": 1040, "弊": 1041, "喚": 1042, "換": 1043, "融": 1044, "施": 1045, "旋": 1046, "遊": 1047, "旅": 1048, "勿": 1049, "物": 1050, "易": 1051, "賜": 1052, "尿": 1053, "尼": 1054, "泥": 1055, "塀": 1056, "履": 1057, "屋": 1058, "握": 1059, "屈": 1060, "掘": 1061, "堀": 1062, "居": 1063, "据": 1064, "層": 1065, "局": 1066, "遅": 1067, "漏": 1068, "刷": 1069, "尺": 1070, "尽": 1071, "沢": 1072, "訳": 1073, "択": 1074, "昼": 1075, "戸": 1076, "肩": 1077, "房": 1078, "扇": 1079, "炉": 1080, "戻": 1081, "涙": 1082, "雇": 1083, "顧": 1084, "啓": 1085, "示": 1086, "礼": 1087, "祥": 1088, "祝": 1089, "福": 1090, "祉": 1091, "社": 1092, "視": 1093, "奈": 1094, "尉": 1095, "慰": 1096, "款": 1097, "禁": 1098, "襟": 1099, "宗": 1100, "崇": 1101, "祭": 1102, "察": 1103, "擦": 1104, "由": 1105, "抽": 1106, "油": 1107, "袖": 1108, "宙": 1109, "届": 1110, "笛": 1111, "軸": 1112, "甲": 1113, "押": 1114, "岬": 1115, "挿": 1116, "申": 1117, "伸": 1118, "神": 1119, "捜": 1120, "果": 1121, "菓": 1122, "課": 1123, "裸": 1124, "斤": 1125, "析": 1126, "所": 1127, "祈": 1128, "近": 1129, "折": 1130, "哲": 1131, "逝": 1132, "誓": 1133, "暫": 1134, "漸": 1135, "断": 1136, "質": 1137, "斥": 1138, "訴": 1139, "昨": 1140, "詐": 1141, "作": 1142, "雪": 1143, "録": 1144, "尋": 1145, "急": 1146, "穏": 1147, "侵": 1148, "浸": 1149, "寝": 1150, "婦": 1151, "掃": 1152, "当": 1153, "争": 1154, "浄": 1155, "事": 1156, "唐": 1157, "糖": 1158, "康": 1159, "逮": 1160, "伊": 1161, "君": 1162, "群": 1163, "耐": 1164, "需": 1165, "儒": 1166, "端": 1167, "両": 1168, "満": 1169, "画": 1170, "歯": 1171, "曲": 1172, "曹": 1173, "遭": 1174, "漕": 1175, "槽": 1176, "斗": 1177, "料": 1178, "科": 1179, "図": 1180, "用": 1181, "庸": 1182, "備": 1183, "昔": 1184, "錯": 1185, "借": 1186, "惜": 1187, "措": 1188, "散": 1189, "廿": 1190, "庶": 1191, "遮": 1192, "席": 1193, "度": 1194, "渡": 1195, "奔": 1196, "噴": 1197, "墳": 1198, "憤": 1199, "焼": 1200, "暁": 1201, "半": 1202, "伴": 1203, "畔": 1204, "判": 1205, "券": 1206, "巻": 1207, "圏": 1208, "勝": 1209, "藤": 1210, "謄": 1211, "片": 1212, "版": 1213, "之": 1214, "乏": 1215, "芝": 1216, "不": 1217, "否": 1218, "杯": 1219, "矢": 1220, "矯": 1221, "族": 1222, "知": 1223, "智": 1224, "矛": 1225, "柔": 1226, "務": 1227, "霧": 1228, "班": 1229, "帰": 1230, "弓": 1231, "引": 1232, "弔": 1233, "弘": 1234, "強": 1235, "弱": 1236, "沸": 1237, "費": 1238, "第": 1239, "弟": 1240, "巧": 1241, "号": 1242, "朽": 1243, "誇": 1244, "汚": 1245, "与": 1246, "写": 1247, "身": 1248, "射": 1249, "謝": 1250, "老": 1251, "考": 1252, "孝": 1253, "教": 1254, "拷": 1255, "者": 1256, "煮": 1257, "著": 1258, "署": 1259, "暑": 1260, "諸": 1261, "猪": 1262, "渚": 1263, "賭": 1264, "峡": 1265, "狭": 1266, "挟": 1267, "追": 1268, "師": 1269, "帥": 1270, "官": 1271, "棺": 1272, "管": 1273, "父": 1274, "交": 1275, "効": 1276, "較": 1277, "校": 1278, "足": 1279, "促": 1280, "距": 1281, "路": 1282, "露": 1283, "跳": 1284, "躍": 1285, "践": 1286, "踏": 1287, "骨": 1288, "滑": 1289, "髄": 1290, "禍": 1291, "渦": 1292, "過": 1293, "阪": 1294, "阿": 1295, "際": 1296, "障": 1297, "随": 1298, "陪": 1299, "陽": 1300, "陳": 1301, "防": 1302, "附": 1303, "院": 1304, "陣": 1305, "隊": 1306, "墜": 1307, "降": 1308, "階": 1309, "陛": 1310, "隣": 1311, "隔": 1312, "隠": 1313, "堕": 1314, "陥": 1315, "穴": 1316, "空": 1317, "控": 1318, "突": 1319, "究": 1320, "窒": 1321, "窃": 1322, "窪": 1323, "搾": 1324, "窯": 1325, "窮": 1326, "探": 1327, "深": 1328, "丘": 1329, "岳": 1330, "兵": 1331, "浜": 1332, "糸": 1333, "織": 1334, "繕": 1335, "縮": 1336, "繁": 1337, "縦": 1338, "線": 1339, "締": 1340, "維": 1341, "羅": 1342, "練": 1343, "緒": 1344, "続": 1345, "絵": 1346, "統": 1347, "絞": 1348, "給": 1349, "絡": 1350, "結": 1351, "終": 1352, "級": 1353, "紀": 1354, "紅": 1355, "納": 1356, "紡": 1357, "紛": 1358, "紹": 1359, "経": 1360, "紳": 1361, "約": 1362, "細": 1363, "累": 1364, "索": 1365, "総": 1366, "綿": 1367, "絹": 1368, "繰": 1369, "継": 1370, "緑": 1371, "縁": 1372, "網": 1373, "緊": 1374, "紫": 1375, "縛": 1376, "縄": 1377, "幼": 1378, "後": 1379, "幽": 1380, "幾": 1381, "機": 1382, "玄": 1383, "畜": 1384, "蓄": 1385, "弦": 1386, "擁": 1387, "滋": 1388, "慈": 1389, "磁": 1390, "系": 1391, "係": 1392, "孫": 1393, "懸": 1394, "却": 1395, "脚": 1396, "卸": 1397, "御": 1398, "服": 1399, "命": 1400, "令": 1401, "零": 1402, "齢": 1403, "冷": 1404, "領": 1405, "鈴": 1406, "勇": 1407, "通": 1408, "踊": 1409, "疑": 1410, "擬": 1411, "凝": 1412, "範": 1413, "犯": 1414, "厄": 1415, "危": 1416, "宛": 1417, "腕": 1418, "苑": 1419, "怨": 1420, "柳": 1421, "卵": 1422, "留": 1423, "貿": 1424, "印": 1425, "興": 1426, "酉": 1427, "酒": 1428, "酌": 1429, "酵": 1430, "酷": 1431, "酬": 1432, "酪": 1433, "酢": 1434, "酔": 1435, "配": 1436, "酸": 1437, "猶": 1438, "尊": 1439, "豆": 1440, "頭": 1441, "短": 1442, "豊": 1443, "鼓": 1444, "喜": 1445, "樹": 1446, "皿": 1447, "血": 1448, "盆": 1449, "盟": 1450, "盗": 1451, "温": 1452, "監": 1453, "濫": 1454, "鑑": 1455, "猛": 1456, "盛": 1457, "塩": 1458, "銀": 1459, "恨": 1460, "根": 1461, "即": 1462, "爵": 1463, "節": 1464, "退": 1465, "限": 1466, "眼": 1467, "良": 1468, "朗": 1469, "浪": 1470, "娘": 1471, "食": 1472, "飯": 1473, "飲": 1474, "飢": 1475, "餓": 1476, "飾": 1477, "館": 1478, "養": 1479, "飽": 1480, "既": 1481, "概": 1482, "慨": 1483, "平": 1484, "呼": 1485, "坪": 1486, "評": 1487, "刈": 1488, "希": 1489, "凶": 1490, "胸": 1491, "離": 1492, "殺": 1493, "純": 1494, "鈍": 1495, "辛": 1496, "辞": 1497, "梓": 1498, "宰": 1499, "壁": 1500, "避": 1501, "新": 1502, "薪": 1503, "親": 1504, "幸": 1505, "執": 1506, "報": 1507, "叫": 1508, "糾": 1509, "収": 1510, "卑": 1511, "碑": 1512, "陸": 1513, "睦": 1514, "勢": 1515, "熱": 1516, "菱": 1517, "陵": 1518, "亥": 1519, "核": 1520, "刻": 1521, "該": 1522, "劾": 1523, "述": 1524, "術": 1525, "寒": 1526, "醸": 1527, "譲": 1528, "壌": 1529, "嬢": 1530, "毒": 1531, "素": 1532, "麦": 1533, "青": 1534, "精": 1535, "請": 1536, "情": 1537, "晴": 1538, "清": 1539, "静": 1540, "責": 1541, "績": 1542, "積": 1543, "債": 1544, "漬": 1545, "表": 1546, "俵": 1547, "潔": 1548, "契": 1549, "喫": 1550, "害": 1551, "轄": 1552, "割": 1553, "憲": 1554, "生": 1555, "星": 1556, "姓": 1557, "性": 1558, "牲": 1559, "産": 1560, "隆": 1561, "峰": 1562, "縫": 1563, "拝": 1564, "寿": 1565, "鋳": 1566, "籍": 1567, "春": 1568, "椿": 1569, "泰": 1570, "奏": 1571, "実": 1572, "奉": 1573, "俸": 1574, "棒": 1575, "謹": 1576, "勤": 1577, "漢": 1578, "嘆": 1579, "難": 1580, "華": 1581, "垂": 1582, "睡": 1583, "錘": 1584, "乗": 1585, "剰": 1586, "今": 1587, "含": 1588, "吟": 1589, "念": 1590, "琴": 1591, "陰": 1592, "予": 1593, "序": 1594, "預": 1595, "野": 1596, "兼": 1597, "嫌": 1598, "鎌": 1599, "謙": 1600, "廉": 1601, "西": 1602, "価": 1603, "要": 1604, "腰": 1605, "票": 1606, "漂": 1607, "標": 1608, "栗": 1609, "遷": 1610, "覆": 1611, "煙": 1612, "南": 1613, "楠": 1614, "献": 1615, "門": 1616, "問": 1617, "閲": 1618, "閥": 1619, "間": 1620, "簡": 1621, "開": 1622, "閉": 1623, "閣": 1624, "閑": 1625, "聞": 1626, "潤": 1627, "欄": 1628, "闘": 1629, "倉": 1630, "創": 1631, "非": 1632, "俳": 1633, "排": 1634, "悲": 1635, "罪": 1636, "輩": 1637, "扉": 1638, "侯": 1639, "候": 1640, "決": 1641, "快": 1642, "偉": 1643, "違": 1644, "緯": 1645, "衛": 1646, "韓": 1647, "干": 1648, "肝": 1649, "刊": 1650, "汗": 1651, "軒": 1652, "岸": 1653, "幹": 1654, "芋": 1655, "宇": 1656, "余": 1657, "除": 1658, "徐": 1659, "叙": 1660, "途": 1661, "斜": 1662, "塗": 1663, "束": 1664, "頼": 1665, "瀬": 1666, "勅": 1667, "疎": 1668, "速": 1669, "整": 1670, "剣": 1671, "険": 1672, "検": 1673, "倹": 1674, "重": 1675, "動": 1676, "勲": 1677, "働": 1678, "種": 1679, "衝": 1680, "薫": 1681, "病": 1682, "痴": 1683, "痘": 1684, "症": 1685, "疾": 1686, "痢": 1687, "疲": 1688, "疫": 1689, "痛": 1690, "癖": 1691, "匿": 1692, "匠": 1693, "医": 1694, "匹": 1695, "区": 1696, "枢": 1697, "殴": 1698, "欧": 1699, "抑": 1700, "仰": 1701, "迎": 1702, "登": 1703, "澄": 1704, "発": 1705, "廃": 1706, "僚": 1707, "寮": 1708, "療": 1709, "彫": 1710, "形": 1711, "影": 1712, "杉": 1713, "彩": 1714, "彰": 1715, "彦": 1716, "顔": 1717, "須": 1718, "膨": 1719, "参": 1720, "惨": 1721, "修": 1722, "珍": 1723, "診": 1724, "文": 1725, "対": 1726, "紋": 1727, "蚊": 1728, "斉": 1729, "剤": 1730, "済": 1731, "斎": 1732, "粛": 1733, "塁": 1734, "楽": 1735, "薬": 1736, "率": 1737, "渋": 1738, "摂": 1739, "央": 1740, "英": 1741, "映": 1742, "赤": 1743, "赦": 1744, "変": 1745, "跡": 1746, "蛮": 1747, "恋": 1748, "湾": 1749, "黄": 1750, "横": 1751, "把": 1752, "色": 1753, "絶": 1754, "艶": 1755, "肥": 1756, "甘": 1757, "紺": 1758, "某": 1759, "謀": 1760, "媒": 1761, "欺": 1762, "棋": 1763, "旗": 1764, "期": 1765, "碁": 1766, "基": 1767, "甚": 1768, "勘": 1769, "堪": 1770, "貴": 1771, "遺": 1772, "遣": 1773, "舞": 1774, "無": 1775, "組": 1776, "粗": 1777, "租": 1778, "祖": 1779, "阻": 1780, "査": 1781, "助": 1782, "宜": 1783, "畳": 1784, "並": 1785, "普": 1786, "譜": 1787, "湿": 1788, "顕": 1789, "繊": 1790, "霊": 1791, "業": 1792, "撲": 1793, "僕": 1794, "共": 1795, "供": 1796, "異": 1797, "翼": 1798, "洪": 1799, "港": 1800, "暴": 1801, "爆": 1802, "恭": 1803, "選": 1804, "殿": 1805, "井": 1806, "囲": 1807, "耕": 1808, "\ufeff\u4e9c": 1809, "悪": 1810, "円": 1811, "角": 1812, "触": 1813, "解": 1814, "再": 1815, "講": 1816, "購": 1817, "構": 1818, "溝": 1819, "論": 1820, "倫": 1821, "輪": 1822, "偏": 1823, "遍": 1824, "編": 1825, "冊": 1826, "典": 1827, "氏": 1828, "紙": 1829, "婚": 1830, "低": 1831, "抵": 1832, "底": 1833, "民": 1834, "眠": 1835, "捕": 1836, "浦": 1837, "蒲": 1838, "舗": 1839, "補": 1840, "邸": 1841, "郭": 1842, "郡": 1843, "郊": 1844, "部": 1845, "都": 1846, "郵": 1847, "邦": 1848, "郷": 1849, "響": 1850, "郎": 1851, "廊": 1852, "盾": 1853, "循": 1854, "派": 1855, "脈": 1856, "衆": 1857, "逓": 1858, "段": 1859, "鍛": 1860, "后": 1861, "幻": 1862, "司": 1863, "伺": 1864, "詞": 1865, "飼": 1866, "嗣": 1867, "舟": 1868, "舶": 1869, "航": 1870, "般": 1871, "盤": 1872, "搬": 1873, "船": 1874, "艦": 1875, "艇": 1876, "瓜": 1877, "弧": 1878, "孤": 1879, "繭": 1880, "益": 1881, "暇": 1882, "敷": 1883, "来": 1884, "気": 1885, "汽": 1886, "飛": 1887, "沈": 1888, "妻": 1889, "衰": 1890, "衷": 1891, "面": 1892, "革": 1893, "靴": 1894, "覇": 1895, "声": 1896, "呉": 1897, "娯": 1898, "誤": 1899, "蒸": 1900, "承": 1901, "函": 1902, "極": 1903, "牙": 1904, "芽": 1905, "邪": 1906, "雅": 1907, "釈": 1908, "番": 1909, "審": 1910, "翻": 1911, "藩": 1912, "毛": 1913, "耗": 1914, "尾": 1915, "宅": 1916, "託": 1917, "為": 1918, "偽": 1919, "長": 1920, "張": 1921, "帳": 1922, "脹": 1923, "髪": 1924, "展": 1925, "喪": 1926, "巣": 1927, "単": 1928, "戦": 1929, "禅": 1930, "弾": 1931, "桜": 1932, "獣": 1933, "脳": 1934, "悩": 1935, "厳": 1936, "鎖": 1937, "挙": 1938, "誉": 1939, "猟": 1940, "鳥": 1941, "鳴": 1942, "鶴": 1943, "烏": 1944, "蔦": 1945, "鳩": 1946, "鶏": 1947, "島": 1948, "暖": 1949, "媛": 1950, "援": 1951, "緩": 1952, "属": 1953, "嘱": 1954, "偶": 1955, "遇": 1956, "愚": 1957, "隅": 1958, "逆": 1959, "塑": 1960, "岡": 1961, "鋼": 1962, "綱": 1963, "剛": 1964, "缶": 1965, "陶": 1966, "揺": 1967, "謡": 1968, "就": 1969, "懇": 1970, "墾": 1971, "免": 1972, "逸": 1973, "晩": 1974, "勉": 1975, "象": 1976, "像": 1977, "馬": 1978, "駒": 1979, "験": 1980, "騎": 1981, "駐": 1982, "駆": 1983, "駅": 1984, "騒": 1985, "駄": 1986, "驚": 1987, "篤": 1988, "騰": 1989, "虎": 1990, "虜": 1991, "膚": 1992, "虚": 1993, "戯": 1994, "虞": 1995, "慮": 1996, "劇": 1997, "虐": 1998, "鹿": 1999, "薦": 2000, "慶": 2001, "麗": 2002, "熊": 2003, "能": 2004, "態": 2005, "寅": 2006, "演": 2007, "辰": 2008, "辱": 2009, "震": 2010, "振": 2011, "娠": 2012, "唇": 2013, "農": 2014, "濃": 2015, "送": 2016, "関": 2017, "咲": 2018, "鬼": 2019, "醜": 2020, "魂": 2021, "魔": 2022, "魅": 2023, "塊": 2024, "襲": 2025, "嚇": 2026, "朕": 2027, "雰": 2028, "箇": 2029, "錬": 2030, "遵": 2031, "罷": 2032, "屯": 2033, "且": 2034, "藻": 2035, "隷": 2036, "癒": 2037, "丹": 2038, "潟": 2039, "丑": 2040, "卯": 2041, "巳": 2042, "此": 2043, "柴": 2044, "砦": 2045, "些": 2046, "髭": 2047, "璃": 2048, "禽": 2049, "檎": 2050, "憐": 2051, "燐": 2052, "麟": 2053, "鱗": 2054, "奄": 2055, "庵": 2056, "掩": 2057, "俺": 2058, "悛": 2059, "駿": 2060, "峻": 2061, "竣": 2062, "臼": 2063, "舅": 2064, "鼠": 2065, "鑿": 2066, "毀": 2067, "艘": 2068, "犀": 2069, "皐": 2070, "脊": 2071, "畷": 2072, "綴": 2073, "爾": 2074, "璽": 2075, "鎧": 2076, "凱": 2077, "妖": 2078, "沃": 2079, "呑": 2080, "韮": 2081, "籤": 2082, "懺": 2083, "芻": 2084, "雛": 2085, "趨": 2086, "尤": 2087, "稽": 2088, "厖": 2089, "采": 2090, "或": 2091, "斬": 2092, "兎": 2093, "也": 2094, "尭": 2095, "巴": 2096, "甫": 2097, "疋": 2098, "菫": 2099, "曼": 2100, "巾": 2101, "云": 2102, "卜": 2103, "喬": 2104, "莫": 2105, "倭": 2106, "侠": 2107, "倦": 2108, "佼": 2109, "俄": 2110, "佃": 2111, "伶": 2112, "仔": 2113, "仇": 2114, "伽": 2115, "僅": 2116, "僻": 2117, "儲": 2118, "倖": 2119, "僑": 2120, "侶": 2121, "伎": 2122, "侃": 2123, "倶": 2124, "侭": 2125, "佑": 2126, "俣": 2127, "傭": 2128, "偲": 2129, "脩": 2130, "倅": 2131, "做": 2132, "凄": 2133, "冴": 2134, "凋": 2135, "凌": 2136, "冶": 2137, "凛": 2138, "凧": 2139, "凪": 2140, "夙": 2141, "鳳": 2142, "劉": 2143, "刹": 2144, "剥": 2145, "剃": 2146, "匂": 2147, "勾": 2148, "厭": 2149, "雁": 2150, "贋": 2151, "厨": 2152, "仄": 2153, "哨": 2154, "嘲": 2155, "咎": 2156, "囁": 2157, "喋": 2158, "咽": 2159, "嘩": 2160, "噂": 2161, "咳": 2162, "喧": 2163, "喉": 2164, "唾": 2165, "叩": 2166, "嘘": 2167, "啄": 2168, "呪": 2169, "吠": 2170, "吊": 2171, "噛": 2172, "叶": 2173, "吻": 2174, "吃": 2175, "噺": 2176, "噌": 2177, "唄": 2178, "叱": 2179, "邑": 2180, "呆": 2181, "喰": 2182, "埴": 2183, "坤": 2184, "堆": 2185, "壕": 2186, "垢": 2187, "坦": 2188, "埠": 2189, "填": 2190, "堰": 2191, "堵": 2192, "嬰": 2193, "姦": 2194, "妬": 2195, "婢": 2196, "婉": 2197, "娼": 2198, "妓": 2199, "娃": 2200, "姪": 2201, "嫉": 2202, "嬬": 2203, "姥": 2204, "姑": 2205, "姐": 2206, "嬉": 2207, "孕": 2208, "孜": 2209, "宥": 2210, "寓": 2211, "宏": 2212, "牢": 2213, "塞": 2214, "宋": 2215, "宍": 2216, "屠": 2217, "屁": 2218, "屑": 2219, "尻": 2220, "屡": 2221, "屍": 2222, "屏": 2223, "嵩": 2224, "崚": 2225, "峨": 2226, "崖": 2227, "嶺": 2228, "嵌": 2229, "嵯": 2230, "帖": 2231, "幡": 2232, "幟": 2233, "庖": 2234, "廓": 2235, "庇": 2236, "鷹": 2237, "庄": 2238, "廟": 2239, "彊": 2240, "弥": 2241, "弛": 2242, "粥": 2243, "挽": 2244, "撞": 2245, "扮": 2246, "掠": 2247, "挨": 2248, "掴": 2249, "捺": 2250, "捻": 2251, "掻": 2252, "撰": 2253, "拭": 2254, "揃": 2255, "捌": 2256, "撹": 2257, "摺": 2258, "按": 2259, "捉": 2260, "拶": 2261, "播": 2262, "揖": 2263, "托": 2264, "捧": 2265, "撚": 2266, "挺": 2267, "擾": 2268, "捗": 2269, "撫": 2270, "撒": 2271, "擢": 2272, "捷": 2273, "抉": 2274, "怯": 2275, "惟": 2276, "惚": 2277, "怜": 2278, "惇": 2279, "憧": 2280, "恰": 2281, "恢": 2282, "悌": 2283, "湧": 2284, "澪": 2285, "洸": 2286, "滉": 2287, "漱": 2288, "洲": 2289, "洵": 2290, "滲": 2291, "洒": 2292, "沐": 2293, "泪": 2294, "渾": 2295, "沙": 2296, "涜": 2297, "淫": 2298, "梁": 2299, "澱": 2300, "氾": 2301, "洛": 2302, "汝": 2303, "漉": 2304, "瀕": 2305, "濠": 2306, "溌": 2307, "溺": 2308, "湊": 2309, "淋": 2310, "浩": 2311, "汀": 2312, "鴻": 2313, "潅": 2314, "溢": 2315, "汰": 2316, "湛": 2317, "淳": 2318, "潰": 2319, "渥": 2320, "灘": 2321, "汲": 2322, "瀞": 2323, "溜": 2324, "渕": 2325, "沌": 2326, "汎": 2327, "濾": 2328, "濡": 2329, "淀": 2330, "涅": 2331, "釜": 2332, "斧": 2333, "爺": 2334, "猾": 2335, "猥": 2336, "狡": 2337, "狸": 2338, "狼": 2339, "狽": 2340, "狗": 2341, "狐": 2342, "狛": 2343, "狙": 2344, "獅": 2345, "狒": 2346, "莨": 2347, "茉": 2348, "莉": 2349, "苺": 2350, "萩": 2351, "藝": 2352, "薙": 2353, "蓑": 2354, "萎": 2355, "苔": 2356, "蕩": 2357, "蔽": 2358, "蔓": 2359, "蓮": 2360, "芙": 2361, "蓉": 2362, "蘭": 2363, "芦": 2364, "薯": 2365, "菖": 2366, "蕉": 2367, "芯": 2368, "蕎": 2369, "蕗": 2370, "藍": 2371, "茄": 2372, "苛": 2373, "蔭": 2374, "蓬": 2375, "芥": 2376, "萌": 2377, "葡": 2378, "萄": 2379, "蘇": 2380, "蕃": 2381, "苓": 2382, "菰": 2383, "蒙": 2384, "茅": 2385, "芭": 2386, "苅": 2387, "蓋": 2388, "葱": 2389, "蔑": 2390, "葵": 2391, "葺": 2392, "蕊": 2393, "茸": 2394, "蒔": 2395, "芹": 2396, "苫": 2397, "葛": 2398, "蒼": 2399, "藁": 2400, "蕪": 2401, "藷": 2402, "薮": 2403, "蒜": 2404, "蕨": 2405, "蔚": 2406, "茜": 2407, "莞": 2408, "蒐": 2409, "菅": 2410, "葦": 2411, "迪": 2412, "辿": 2413, "這": 2414, "迂": 2415, "遁": 2416, "逢": 2417, "遥": 2418, "遼": 2419, "逼": 2420, "迄": 2421, "遜": 2422, "逗": 2423, "郁": 2424, "鄭": 2425, "隙": 2426, "隈": 2427, "憑": 2428, "惹": 2429, "悉": 2430, "忽": 2431, "惣": 2432, "愈": 2433, "恕": 2434, "昴": 2435, "晋": 2436, "曖": 2437, "晟": 2438, "暈": 2439, "暉": 2440, "旱": 2441, "晏": 2442, "晨": 2443, "晒": 2444, "昧": 2445, "晃": 2446, "曝": 2447, "曙": 2448, "昂": 2449, "旺": 2450, "昏": 2451, "晦": 2452, "腎": 2453, "股": 2454, "膿": 2455, "腑": 2456, "胱": 2457, "胚": 2458, "肛": 2459, "臆": 2460, "膝": 2461, "脆": 2462, "肋": 2463, "肘": 2464, "腔": 2465, "腺": 2466, "腫": 2467, "膳": 2468, "肱": 2469, "胡": 2470, "楓": 2471, "枕": 2472, "楊": 2473, "椋": 2474, "榛": 2475, "櫛": 2476, "槌": 2477, "樵": 2478, "梯": 2479, "椅": 2480, "柿": 2481, "柑": 2482, "桁": 2483, "杭": 2484, "柊": 2485, "柚": 2486, "椀": 2487, "栂": 2488, "柾": 2489, "榊": 2490, "樫": 2491, "槙": 2492, "楢": 2493, "橘": 2494, "桧": 2495, "棲": 2496, "栖": 2497, "梗": 2498, "桔": 2499, "杜": 2500, "杷": 2501, "梶": 2502, "杵": 2503, "杖": 2504, "椎": 2505, "樽": 2506, "柵": 2507, "櫓": 2508, "橿": 2509, "杓": 2510, "李": 2511, "棉": 2512, "楯": 2513, "榎": 2514, "樺": 2515, "槍": 2516, "柘": 2517, "梱": 2518, "枇": 2519, "樋": 2520, "橇": 2521, "槃": 2522, "栞": 2523, "椰": 2524, "檀": 2525, "樗": 2526, "槻": 2527, "椙": 2528, "彬": 2529, "桶": 2530, "楕": 2531, "樒": 2532, "毬": 2533, "燿": 2534, "燎": 2535, "炬": 2536, "焚": 2537, "灸": 2538, "燭": 2539, "煽": 2540, "煤": 2541, "煉": 2542, "燦": 2543, "灼": 2544, "烙": 2545, "焔": 2546, "熔": 2547, "煎": 2548, "烹": 2549, "牽": 2550, "牝": 2551, "牡": 2552, "瑶": 2553, "琳": 2554, "瑠": 2555, "斑": 2556, "琉": 2557, "弄": 2558, "瑳": 2559, "琢": 2560, "珊": 2561, "瑚": 2562, "瑞": 2563, "珪": 2564, "玖": 2565, "瑛": 2566, "玩": 2567, "玲": 2568, "畏": 2569, "畢": 2570, "畦": 2571, "痒": 2572, "痰": 2573, "疹": 2574, "痔": 2575, "癌": 2576, "痩": 2577, "痕": 2578, "痺": 2579, "眸": 2580, "眩": 2581, "瞭": 2582, "眉": 2583, "雉": 2584, "矩": 2585, "磐": 2586, "碇": 2587, "碧": 2588, "硯": 2589, "砥": 2590, "碗": 2591, "碍": 2592, "碩": 2593, "磯": 2594, "砺": 2595, "碓": 2596, "禦": 2597, "祷": 2598, "祐": 2599, "祇": 2600, "祢": 2601, "禄": 2602, "禎": 2603, "秤": 2604, "黍": 2605, "禿": 2606, "稔": 2607, "稗": 2608, "穣": 2609, "稜": 2610, "稀": 2611, "穆": 2612, "窺": 2613, "窄": 2614, "窟": 2615, "穿": 2616, "竃": 2617, "竪": 2618, "颯": 2619, "站": 2620, "靖": 2621, "妾": 2622, "衿": 2623, "裾": 2624, "袷": 2625, "袴": 2626, "襖": 2627, "笙": 2628, "筏": 2629, "簾": 2630, "箪": 2631, "竿": 2632, "箆": 2633, "箔": 2634, "笥": 2635, "箭": 2636, "筑": 2637, "篭": 2638, "篠": 2639, "箸": 2640, "纂": 2641, "竺": 2642, "箕": 2643, "笈": 2644, "篇": 2645, "筈": 2646, "簸": 2647, "粕": 2648, "糟": 2649, "糊": 2650, "籾": 2651, "糠": 2652, "糞": 2653, "粟": 2654, "繋": 2655, "綸": 2656, "絨": 2657, "絆": 2658, "緋": 2659, "綜": 2660, "紐": 2661, "紘": 2662, "纏": 2663, "絢": 2664, "繍": 2665, "紬": 2666, "綺": 2667, "綾": 2668, "絃": 2669, "綻": 2670, "縞": 2671, "綬": 2672, "紗": 2673, "舵": 2674, "舷": 2675, "聯": 2676, "聡": 2677, "聘": 2678, "耽": 2679, "耶": 2680, "蚤": 2681, "蟹": 2682, "蛋": 2683, "蟄": 2684, "蝿": 2685, "蟻": 2686, "蜂": 2687, "蝋": 2688, "蝦": 2689, "蛸": 2690, "螺": 2691, "蝉": 2692, "蛙": 2693, "蛾": 2694, "蛤": 2695, "蛭": 2696, "蛎": 2697, "罫": 2698, "罵": 2699, "袈": 2700, "裟": 2701, "戴": 2702, "截": 2703, "哉": 2704, "詢": 2705, "諄": 2706, "讐": 2707, "諌": 2708, "謎": 2709, "諒": 2710, "讃": 2711, "誰": 2712, "訊": 2713, "訣": 2714, "詣": 2715, "諦": 2716, "詮": 2717, "詑": 2718, "誼": 2719, "謬": 2720, "詫": 2721, "諏": 2722, "諺": 2723, "誹": 2724, "謂": 2725, "諜": 2726, "註": 2727, "譬": 2728, "轟": 2729, "輔": 2730, "輻": 2731, "輯": 2732, "貌": 2733, "豹": 2734, "賎": 2735, "貼": 2736, "貰": 2737, "賂": 2738, "賑": 2739, "躓": 2740, "蹄": 2741, "蹴": 2742, "蹟": 2743, "跨": 2744, "跪": 2745, "醤": 2746, "醍": 2747, "酎": 2748, "醐": 2749, "醒": 2750, "醇": 2751, "麺": 2752, "麹": 2753, "釦": 2754, "銚": 2755, "鋤": 2756, "鍋": 2757, "鏑": 2758, "鋸": 2759, "錐": 2760, "鍵": 2761, "鍬": 2762, "鋲": 2763, "錫": 2764, "錨": 2765, "釘": 2766, "鑓": 2767, "鋒": 2768, "鎚": 2769, "鉦": 2770, "錆": 2771, "鍾": 2772, "鋏": 2773, "閃": 2774, "悶": 2775, "閤": 2776, "闇": 2777, "雫": 2778, "霞": 2779, "翰": 2780, "斡": 2781, "鞍": 2782, "鞭": 2783, "鞘": 2784, "鞄": 2785, "靭": 2786, "鞠": 2787, "頓": 2788, "顛": 2789, "穎": 2790, "頃": 2791, "頬": 2792, "頗": 2793, "頌": 2794, "顎": 2795, "頚": 2796, "餌": 2797, "餐": 2798, "饗": 2799, "蝕": 2800, "飴": 2801, "餅": 2802, "駕": 2803, "騨": 2804, "馳": 2805, "騙": 2806, "馴": 2807, "駁": 2808, "駈": 2809, "驢": 2810, "鰻": 2811, "鯛": 2812, "鰯": 2813, "鱒": 2814, "鮭": 2815, "鮪": 2816, "鮎": 2817, "鯵": 2818, "鱈": 2819, "鯖": 2820, "鮫": 2821, "鰹": 2822, "鰍": 2823, "鰐": 2824, "鮒": 2825, "鮨": 2826, "鰭": 2827, "鴎": 2828, "鵬": 2829, "鸚": 2830, "鵡": 2831, "鵜": 2832, "鷺": 2833, "鷲": 2834, "鴨": 2835, "鳶": 2836, "梟": 2837, "塵": 2838, "麓": 2839, "麒": 2840, "冥": 2841, "瞑": 2842, "暝": 2843, "坐": 2844, "挫": 2845, "朔": 2846, "遡": 2847, "曳": 2848, "洩": 2849, "彗": 2850, "慧": 2851, "嘉": 2852, "兇": 2853, "兜": 2854, "爽": 2855, "欝": 2856, "劫": 2857, "勃": 2858, "歎": 2859, "輿": 2860, "巽": 2861, "歪": 2862, "翠": 2863, "黛": 2864, "鼎": 2865, "鹵": 2866, "鹸": 2867, "虔": 2868, "燕": 2869, "嘗": 2870, "殆": 2871, "孟": 2872, "牌": 2873, "骸": 2874, "覗": 2875, "彪": 2876, "秦": 2877, "雀": 2878, "隼": 2879, "耀": 2880, "夷": 2881, "戚": 2882, "嚢": 2883, "丼": 2884, "暢": 2885, "廻": 2886, "畿": 2887, "欣": 2888, "毅": 2889, "斯": 2890, "匙": 2891, "匡": 2892, "肇": 2893, "麿": 2894, "叢": 2895, "肴": 2896, "斐": 2897, "卿": 2898, "翫": 2899, "於": 2900, "套": 2901, "叛": 2902, "尖": 2903, "壷": 2904, "叡": 2905, "酋": 2906, "鴬": 2907, "赫": 2908, "臥": 2909, "甥": 2910, "瓢": 2911, "琵": 2912, "琶": 2913, "叉": 2914, "舜": 2915, "畠": 2916, "拳": 2917, "圃": 2918, "丞": 2919, "亮": 2920, "胤": 2921, "疏": 2922, "膏": 2923, "魁": 2924, "馨": 2925, "牒": 2926, "瞥": 2927, "阜": 2928, "睾": 2929, "巫": 2930, "敦": 2931, "奎": 2932, "翔": 2933, "皓": 2934, "黎": 2935, "赳": 2936, "已": 2937, "棘": 2938, "聚": 2939, "甦": 2940, "剪": 2941, "躾": 2942, "夥": 2943, "鼾": 2944, "祟": 2945, "粁": 2946, "糎": 2947, "粍": 2948, "噸": 2949, "哩": 2950, "浬": 2951, "吋": 2952, "呎": 2953, "梵": 2954, "陀": 2955, "薩": 2956, "菩": 2957, "唖": 2958, "迦": 2959, "那": 2960, "牟": 2961, "珈": 2962, "琲": 2963, "檜": 2964, "轡": 2965, "淵": 2966, "伍": 2967, "什": 2968, "萬": 2969, "邁": 2970, "逞": 2971, "燈": 2972, "裡": 2973, "薗": 2974, "鋪": 2975, "嶋": 2976, "峯": 2977, "巌": 2978, "埜": 2979, "舘": 2980, "龍": 2981, "寵": 2982, "聾": 2983, "慾": 2984, "亙": 2985, "躯": 2986, "嶽": 2987, "國": 2988, "脛": 2989, "勁": 2990, "箋": 2991, "祀": 2992, "祓": 2993, "躇": 2994, "壽": 2995, "躊": 2996, "彙": 2997, "饅": 2998, "嘔": 2999, "鼈": 3000, "亨": 3001, "侑": 3002, "梧": 3003, "欽": 3004, "煕": 3005, "而": 3006, "掟": 3007};

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

function makeForceDicts(data) {
	var result = {};
	var idToNode = {};
	var idToLinks = {};
	for (i in data.nodes) {
		var node = data.nodes[i];
		var kanji = node.id;
		idToNode[kanji] = node;
		idToLinks[kanji] = [];
	}
	for (i in data.links) {
		var link = data.links[i];
		var source = link.source;
		var target = link.target;
		idToLinks[source].push(link);
		idToLinks[target].push(link);
	}
	result['idToNode'] = idToNode;
	result['idToLinks'] = idToLinks;
	return result;
}

function degreesToRadians(degrees) {
	return degrees * (Math.PI / 180);
}

function arrayRotate(arr){
	arr = 
	arr.push(arr.shift());
	return arr;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function angleToGradient(angle) {
	return ;
}

function describeArc(x, y, radius, startAngle, endAngle, largeArcOverride=false){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    if (largeArcOverride == true) {largeArcFlag = "1"}

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function rotate(x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        cx = 0,
        cy = 0,
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x: nx, y: ny};
}

function translate(x, y, x1, y1) {
	return {x: x+x1, y: y+y1};
}