/**
 * 初始化词源数据
 * 存储所有默认分类的单词数据
 */

const INIT_WORDS_DATA = {
  "default": [
    {
      "word": "abandon",
      "partOfSpeech": "v.",
      "chinese": "抛弃，放弃",
      "english": "to leave somebody or something that you are responsible for, usually permanently"
    },
    {
      "word": "accompany",
      "partOfSpeech": "v.",
      "chinese": "陪伴，伴随",
      "english": "to travel or go somewhere with somebody"
    }
  ],
  "必修unit3unit4":[
        {
        "word": "sum up",
        "partOfSpeech": "phr.v.",
        "chinese": "总结；概括",
        "english": "to summarize"
        },
        {
        "word": "fade away",
        "partOfSpeech": "phr.v.",
        "chinese": "（人）衰弱；病重死亡",
        "english": "(of a person) to become very weak or ill and die"
        },
        {
        "word": "climate",
        "partOfSpeech": "n.",
        "chinese": "气候",
        "english": "the regular pattern of weather conditions of a particular place"
        },
        {
        "word": "billion",
        "partOfSpeech": "n.",
        "chinese": "十亿",
        "english": "one thousand million"
        },
        {
        "word": "alarming",
        "partOfSpeech": "adj.",
        "chinese": "使人惊恐的；令人惊慌的",
        "english": "causing worry and fear"
        },
        {
        "word": "rate",
        "partOfSpeech": "n.",
        "chinese": "速度；进度",
        "english": "a measurement of the speed"
        },
        {
        "word": "predict",
        "partOfSpeech": "v.",
        "chinese": "预言；预告；预报",
        "english": "to say that something will happen in the future"
        },
        {
        "word": "chain",
        "partOfSpeech": "n.",
        "chinese": "一系列，一连串（人或事）；链子；锁链",
        "english": "a series of connected things or people; a series of connected metal rings, used for pulling or fastening things"
        },
        {
        "word": "hunt",
        "partOfSpeech": "v.",
        "chinese": "打猎；猎杀",
        "english": "to chase wild animals or birds in order to catch or kill them for food, sport or to make money"
        },
        {
        "word": "agriculture",
        "partOfSpeech": "n.",
        "chinese": "农业；农学",
        "english": "the science or practice of farming"
        },
        {
        "word": "figure",
        "partOfSpeech": "n.",
        "chinese": "（代表数量，尤指官方资料中的）数字",
        "english": "a number representing a particular amount, especially one given in official information"
        },
        {
        "word": "significantly",
        "partOfSpeech": "adv.",
        "chinese": "有重大意义地；显著地；明显地",
        "english": "being important enough to have an effect on something or to be noticed"
        },
        {
        "word": "unfamiliar",
        "partOfSpeech": "adj.",
        "chinese": "陌生的；不熟悉的",
        "english": "strange"
        },
        {
        "word": "youth",
        "partOfSpeech": "n.",
        "chinese": "（统称）青年，年轻人；青年时期（尤指成年以前）",
        "english": "young people considered as a group; the time of life when a person is young, especially the time before a child becomes an adult"
        },
        {
        "word": "threaten",
        "partOfSpeech": "v.",
        "chinese": "危及；对……构成威胁",
        "english": "to be a danger to something"
        },
        {
        "word": "extinction",
        "partOfSpeech": "n.",
        "chinese": "灭绝，绝种",
        "english": "a situation where a plant, an animal, a way of life, etc. no longer exists"
        },
        {
        "word": "admit",
        "partOfSpeech": "v.",
        "chinese": "（常指勉强）承认",
        "english": "to agree, often unwillingly, that something is true"
        },
        {
        "word": "somehow",
        "partOfSpeech": "adv.",
        "chinese": "不知为什么；以某种方式",
        "english": "for a reason that you don't know or understand; in a way that is not known or certain"
        },
        {
        "word": "measure",
        "partOfSpeech": "n.",
        "chinese": "措施；方法",
        "english": "an official action that is done in order to achieve a particular aim"
        },
        {
        "word": "absolutely",
        "partOfSpeech": "adv.",
        "chinese": "（强调真实无误）绝对地，完全地",
        "english": "used to emphasize that something is completely true"
        },
        {
        "word": "contrast",
        "partOfSpeech": "v.",
        "chinese": "对比；对照",
        "english": "to compare two things in order to show the differences between them"
        },
        {
        "word": "imply",
        "partOfSpeech": "v.",
        "chinese": "暗示；暗指",
        "english": "to suggest that something is true or that you feel or think something, without saying so directly"
        },
        {
        "word": "major",
        "partOfSpeech": "adj.",
        "chinese": "主要的；重要的",
        "english": "very large or important"
        },
        {
        "word": "available",
        "partOfSpeech": "adj.",
        "chinese": "可获得的；可购得的；可找到的",
        "english": "that you can get, buy or find easily"
        },
        {
        "word": "option",
        "partOfSpeech": "n.",
        "chinese": "选择；可选择的事物",
        "english": "choice"
        },
        {
        "word": "desire",
        "partOfSpeech": "n.",
        "chinese": "愿望；欲望；渴望",
        "english": "a strong wish to have or do something"
        },
        {
        "word": "reduce",
        "partOfSpeech": "v.",
        "chinese": "减少，缩小（尺寸、数量、价格等）",
        "english": "to make something less or smaller in size, quantity, price, etc."
        },
        {
        "word": "design",
        "partOfSpeech": "v.",
        "chinese": "设计；制图；构思",
        "english": "to decide how something will look, work, etc., especially by drawing plans or making models"
        },
        {
        "word": "balance",
        "partOfSpeech": "v.",
        "chinese": "同等重视（相对的两个事物或方面）",
        "english": "to give equal importance to two contrasting things or parts of something"
        },
        {
        "word": "graduate",
        "partOfSpeech": "v./n.",
        "chinese": "大学毕业；大学毕业生",
        "english": "to get a degree from a university or college; a person who has a university degree"
        },
        {
        "word": "plus",
        "partOfSpeech": "conj.",
        "chinese": "而且；此外；况且",
        "english": "used to add more information"
        },
        {
        "word": "eventually",
        "partOfSpeech": "adv.",
        "chinese": "最后；终于",
        "english": "at the end of a period of time"
        },
        {
        "word": "concerned",
        "partOfSpeech": "adj.",
        "chinese": "感兴趣的；关切的；关注的",
        "english": "interested in something"
        },
        {
        "word": "fund",
        "partOfSpeech": "v.",
        "chinese": "为……提供资金；拨款给",
        "english": "to provide money for something, usually something official"
        },
        {
        "word": "mirror",
        "partOfSpeech": "n.",
        "chinese": "镜子",
        "english": "a piece of special flat glass that reflects images"
        },
        {
        "word": "tear",
        "partOfSpeech": "n.",
        "chinese": "眼泪；泪珠；泪水",
        "english": "a drop of liquid that comes out of your eye when you cry"
        },
        {
        "word": "net",
        "partOfSpeech": "n.",
        "chinese": "网；网状物",
        "english": "a type of material that is made of string, thread or wire tied together, with small spaces in between"
        },
        {
        "word": "string",
        "partOfSpeech": "n.",
        "chinese": "细绳；线；带子",
        "english": "material made of several threads twisted together, used for tying things together"
        },
        {
        "word": "mud",
        "partOfSpeech": "n.",
        "chinese": "泥；淤泥",
        "english": "wet earth that is soft and sticky"
        },
        {
        "word": "cloth",
        "partOfSpeech": "n.",
        "chinese": "织物；布料",
        "english": "material made by weaving or knitting cotton, wool, silk, etc."
        },
        {
        "word": "process",
        "partOfSpeech": "n.",
        "chinese": "（为达到某一目标的）过程；进程",
        "english": "a series of things that are done in order to achieve a particular result"
        },
        {
        "word": "contact",
        "partOfSpeech": "v.",
        "chinese": "联系，联络（如用电话或信件）",
        "english": "to communicate with somebody, for example by telephone or letter"
        },
        {
        "word": "madam",
        "partOfSpeech": "n.",
        "chinese": "夫人；女士",
        "english": "a formal way of speaking or writing to a woman"
        },
        {
        "word": "advertise",
        "partOfSpeech": "v.",
        "chinese": "做广告；登广告",
        "english": "to make something known to the public in order to encourage people to buy or to use it"
        },
        {
        "word": "therefore",
        "partOfSpeech": "adv.",
        "chinese": "因此；所以；因而",
        "english": "used to introduce the logical result of something that has just been mentioned"
        },
        {
        "word": "advertisement",
        "partOfSpeech": "n.",
        "chinese": "广告；启事",
        "english": "a notice, picture or film telling people about a product, job or service"
        },
        {
        "word": "flight",
        "partOfSpeech": "n.",
        "chinese": "航班飞机；班机；空中航行，航程",
        "english": "a plane making a particular journey; a journey made by air, especially in a plane"
        },
        {
        "word": "grateful",
        "partOfSpeech": "adj.",
        "chinese": "感激的；表示感谢的",
        "english": "feeling or showing thanks because somebody has done something kind for you"
        },
        {
        "word": "faithfully",
        "partOfSpeech": "adv.",
        "chinese": "忠实地；忠诚地；准确地；如实地",
        "english": "in a loyal way; accurately; carefully"
        },
        {
        "word": "official",
        "partOfSpeech": "adj.",
        "chinese": "正式的；官方的；官方授权的",
        "english": "agreed to, said, done, etc. by somebody who is in a position of authority"
        },
        {
        "word": "fluent",
        "partOfSpeech": "adj.",
        "chinese": "（尤指外语）流利的，流畅的；熟练的",
        "english": "able to speak, read or write a language, especially a foreign language, easily and well"
        },
        {
        "word": "exchange",
        "partOfSpeech": "v.",
        "chinese": "交换；交流",
        "english": "to give something to somebody and at the same time receive the same type of thing from them"
        },
        {
        "word": "range",
        "partOfSpeech": "n.",
        "chinese": "一系列",
        "english": "a variety of things of a particular type"
        },
        {
        "word": "brick",
        "partOfSpeech": "n.",
        "chinese": "砖；砖块",
        "english": "something used for building walls, houses and other buildings"
        },
        {
        "word": "gain",
        "partOfSpeech": "n.",
        "chinese": "好处；利益；改进",
        "english": "an advantage or improvement"
        },
        {
        "word": "attract",
        "partOfSpeech": "v.",
        "chinese": "吸引；使喜爱",
        "english": "to interest you and make you want it"
        },
        {
        "word": "shark",
        "partOfSpeech": "n.",
        "chinese": "鲨鱼",
        "english": "a large sea fish with very sharp teeth and a pointed fin on its back"
        },
        {
        "word": "target",
        "partOfSpeech": "n.",
        "chinese": "（攻击的）目标，对象；目标；指标",
        "english": "an object, a person or a place that people aim at when attacking; a result that you try to achieve"
        },
        {
        "word": "approach",
        "partOfSpeech": "v.",
        "chinese": "（在距离或时间上）靠近，接近",
        "english": "to come near to somebody /something in distance or time"
        },
        {
        "word": "attack",
        "partOfSpeech": "n./v.",
        "chinese": "袭击；攻击",
        "english": "an act of using violence to try to hurt or kill somebody; to use violence to try to hurt or kill somebody"
        },
        {
        "word": "sharp",
        "partOfSpeech": "adj.",
        "chinese": "锋利的；尖的",
        "english": "having a fine edge or point, especially of something that can cut or make a hole in something"
        },
        {
        "word": "skin",
        "partOfSpeech": "n.",
        "chinese": "皮；皮肤",
        "english": "the layer of tissue that covers the body"
        },
        {
        "word": "strength",
        "partOfSpeech": "n.",
        "chinese": "体力；力气；力量",
        "english": "the quality of being physically strong"
        },
        {
        "word": "wrap",
        "partOfSpeech": "v.",
        "chinese": "用……缠绕（或圈紧）；包，裹（礼物等）",
        "english": "to put something firmly around something /somebody; to cover something completely in paper or other material"
        },
        {
        "word": "bleed",
        "partOfSpeech": "v.",
        "chinese": "流血；失血",
        "english": "(bled, bled) to lose blood, especially from a wound or an injury"
        },
        {
        "word": "bite",
        "partOfSpeech": "v.",
        "chinese": "咬",
        "english": "(bit, bitten) to use your teeth to cut into or through something"
        },
        {
        "word": "defeat",
        "partOfSpeech": "n./v.",
        "chinese": "失败；击败，战胜",
        "english": "failure to win or to be successful; to win against somebody in a war, competition, sports game, etc."
        },
        {
        "word": "destroy",
        "partOfSpeech": "v.",
        "chinese": "摧毁",
        "english": "to damage something so badly that it no longer exists, works, etc."
        },
        {
        "word": "intelligent",
        "partOfSpeech": "adj.",
        "chinese": "（动物、生物等）有智力的；有理解和学习能力的；有才智的；聪明的",
        "english": "(of an animal, a being, etc.) able to understand and learn things; good at learning, understanding"
        },
        {
        "word": "struggle",
        "partOfSpeech": "v.",
        "chinese": "搏斗；扭打；挣扎脱身；奋斗；努力",
        "english": "to fight somebody or try to get away from them; to try very hard to do something when it is difficult"
        },
        {
        "word": "sink",
        "partOfSpeech": "v.",
        "chinese": "下沉",
        "english": "(sank, sunk) to go down below the surface or towards the bottom of a liquid or soft substance"
        },
        {
        "word": "ahead",
        "partOfSpeech": "adv.",
        "chinese": "（时间、空间）向前面，在前面",
        "english": "further forward in space or time; in front"
        },
        {
        "word": "maintain",
        "partOfSpeech": "v.",
        "chinese": "维持；保持；坚持（意见），固执己见",
        "english": "to make something continue at the same level, standard, etc.; to keep stating that something is true, even though other people do not agree"
        },
        {
        "word": "dramatically",
        "partOfSpeech": "adv.",
        "chinese": "巨大地",
        "english": "by a strikingly large amount or to a strikingly large extent; greatly"
        },
        {
        "word": "curious",
        "partOfSpeech": "adj.",
        "chinese": "求知欲强的；好奇的",
        "english": "having a strong desire to know about something"
        },
        {
        "word": "shortage",
        "partOfSpeech": "n.",
        "chinese": "不足；缺少；短缺",
        "english": "a situation when there is not enough of the people or things that are needed"
        },
        {
        "word": "grain",
        "partOfSpeech": "n.",
        "chinese": "谷物；谷粒",
        "english": "the small hard seeds of food plants such as wheat, rice, etc.; a single seed of such a plant"
        },
        {
        "word": "decade",
        "partOfSpeech": "n.",
        "chinese": "十年，十年期（尤指一个年代）",
        "english": "a period of ten years"
        },
        {
        "word": "self-sufficient",
        "partOfSpeech": "adj.",
        "chinese": "自给自足；自立的",
        "english": "able to do or produce everything that you need without the help of other people"
        },
        {
        "word": "medal",
        "partOfSpeech": "n.",
        "chinese": "奖章；勋章",
        "english": "a flat piece of metal, usually shaped like a coin, that is given to the winner of a competition"
        },
        {
        "word": "outstanding",
        "partOfSpeech": "adj.",
        "chinese": "优秀的；杰出的；出色的",
        "english": "extremely good; excellent"
        },
        {
        "word": "institute",
        "partOfSpeech": "n.",
        "chinese": "（教育、专业等）机构",
        "english": "an organization that has a particular purpose, especially one that is connected with education or a particular profession"
        },
        {
        "word": "request",
        "partOfSpeech": "n.",
        "chinese": "（正式或礼貌的）要求，请求",
        "english": "the action of asking for something formally and politely"
        },
        {
        "word": "atmosphere",
        "partOfSpeech": "n.",
        "chinese": "（围绕地球的）大气，大气层",
        "english": "the mixture of gases that surrounds the Earth"
        },
        {
        "word": "lack",
        "partOfSpeech": "n.",
        "chinese": "缺乏；匮乏；短缺",
        "english": "the state of not having something or not having enough of something"
        },
        {
        "word": "clue",
        "partOfSpeech": "n.",
        "chinese": "提示词语，解答提示",
        "english": "some words or a piece of information that helps you find the answers to a game or a question"
        },
        {
        "word": "literature",
        "partOfSpeech": "n.",
        "chinese": "文学；文学作品",
        "english": "pieces of writing that are valued as works of art"
        },
        {
        "word": "failure",
        "partOfSpeech": "n.",
        "chinese": "失败的人（或事物）；失败",
        "english": "a person or thing that is not successful; lack of success in doing or achieving something"
        },
        {
        "word": "realistic",
        "partOfSpeech": "adj.",
        "chinese": "现实的；实际的；实事求是的",
        "english": "accepting in a sensible way what it is actually possible to do or achieve in a particular situation"
        },
        {
        "word": "professional",
        "partOfSpeech": "adj.",
        "chinese": "专业的；职业的",
        "english": "doing something as a paid job rather than as a hobby"
        },
        {
        "word": "false",
        "partOfSpeech": "adj.",
        "chinese": "错误的；不正确的",
        "english": "wrong; not correct or true"
        },
        {
        "word": "permanently",
        "partOfSpeech": "adv.",
        "chinese": "永久地；永恒地",
        "english": "lasting for a long time or for all time in the future"
        },
        {
        "word": "setback",
        "partOfSpeech": "n.",
        "chinese": "挫折；阻碍",
        "english": "a difficulty or problem that delays or prevents something or makes a situation worse"
        },
        {
        "word": "title",
        "partOfSpeech": "n.",
        "chinese": "（书、诗歌、图画、乐曲等的）名称，标题，题目",
        "english": "the name of a book, poem, painting, piece of music, etc."
        },
        {
        "word": "spring roll",
        "partOfSpeech": "n.",
        "chinese": "春卷",
        "english": "a type of Chinese fried food consisting of a tube of thin pastry, filled with vegetables or meat"
        },
        {
        "word": "silicon chip",
        "partOfSpeech": "n.",
        "chinese": "硅片",
        "english": "a very small piece of silicon used to carry a complicated electronic circuit"
        },
        {
        "word": "solar-power battery",
        "partOfSpeech": "n.",
        "chinese": "太阳能电池",
        "english": "a kind of battery using the sun's energy"
        },
        {
        "word": "look forward to",
        "partOfSpeech": "phr.v.",
        "chinese": "期待；盼望",
        "english": "to be thinking with pleasure about something that is going to happen"
        },
        {
        "word": "mother tongue",
        "partOfSpeech": "n.",
        "chinese": "母语",
        "english": "one's first language"
        },
        {
        "word": "cell phone",
        "partOfSpeech": "n.",
        "chinese": "移动电话；手机",
        "english": "(American English) a mobile phone"
        },
        {
        "word": "in addition",
        "partOfSpeech": "phr.",
        "chinese": "除……以外（还）",
        "english": "used when you want to mention another person or thing after something else"
        },
        {
        "word": "formal",
        "partOfSpeech": "adj.",
        "chinese": "（穿着、言语、行为等）适合正式场合的；正规的；庄重的",
        "english": "(of a style of dress, speech, writing, behaviour, etc.) very correct and suitable for official or important occasions"
        }
  ],
  "必修34":[
     {
      "word": "abandon",
      "partOfSpeech": "v.",
      "chinese": "抛弃，放弃",
      "english": "to leave somebody or something that you are responsible for, usually permanently"
    },
    {
      "word": "accompany",
      "partOfSpeech": "v.",
      "chinese": "陪伴，伴随",
      "english": "to travel or go somewhere with somebody"
    },
        {
        "word": "sum up",
        "partOfSpeech": "phr.v.",
        "chinese": "总结；概括",
        "english": "to summarize"
        },
        {
        "word": "fade away",
        "partOfSpeech": "phr.v.",
        "chinese": "（人）衰弱；病重死亡",
        "english": "(of a person) to become very weak or ill and die"
        },
        {
        "word": "climate",
        "partOfSpeech": "n.",
        "chinese": "气候",
        "english": "the regular pattern of weather conditions of a particular place"
        },
        {
        "word": "billion",
        "partOfSpeech": "n.",
        "chinese": "十亿",
        "english": "one thousand million"
        },
        {
        "word": "alarming",
        "partOfSpeech": "adj.",
        "chinese": "使人惊恐的；令人惊慌的",
        "english": "causing worry and fear"
        },
        {
        "word": "rate",
        "partOfSpeech": "n.",
        "chinese": "速度；进度",
        "english": "a measurement of the speed"
        },
        {
        "word": "predict",
        "partOfSpeech": "v.",
        "chinese": "预言；预告；预报",
        "english": "to say that something will happen in the future"
        },
        {
        "word": "chain",
        "partOfSpeech": "n.",
        "chinese": "一系列，一连串（人或事）；链子；锁链",
        "english": "a series of connected things or people; a series of connected metal rings, used for pulling or fastening things"
        },
        {
        "word": "hunt",
        "partOfSpeech": "v.",
        "chinese": "打猎；猎杀",
        "english": "to chase wild animals or birds in order to catch or kill them for food, sport or to make money"
        },
        {
        "word": "agriculture",
        "partOfSpeech": "n.",
        "chinese": "农业；农学",
        "english": "the science or practice of farming"
        },
        {
        "word": "figure",
        "partOfSpeech": "n.",
        "chinese": "（代表数量，尤指官方资料中的）数字",
        "english": "a number representing a particular amount, especially one given in official information"
        },
        {
        "word": "significantly",
        "partOfSpeech": "adv.",
        "chinese": "有重大意义地；显著地；明显地",
        "english": "being important enough to have an effect on something or to be noticed"
        },
        {
        "word": "unfamiliar",
        "partOfSpeech": "adj.",
        "chinese": "陌生的；不熟悉的",
        "english": "strange"
        },
        {
        "word": "youth",
        "partOfSpeech": "n.",
        "chinese": "（统称）青年，年轻人；青年时期（尤指成年以前）",
        "english": "young people considered as a group; the time of life when a person is young, especially the time before a child becomes an adult"
        },
        {
        "word": "threaten",
        "partOfSpeech": "v.",
        "chinese": "危及；对……构成威胁",
        "english": "to be a danger to something"
        },
        {
        "word": "extinction",
        "partOfSpeech": "n.",
        "chinese": "灭绝，绝种",
        "english": "a situation where a plant, an animal, a way of life, etc. no longer exists"
        },
        {
        "word": "admit",
        "partOfSpeech": "v.",
        "chinese": "（常指勉强）承认",
        "english": "to agree, often unwillingly, that something is true"
        },
        {
        "word": "somehow",
        "partOfSpeech": "adv.",
        "chinese": "不知为什么；以某种方式",
        "english": "for a reason that you don't know or understand; in a way that is not known or certain"
        },
        {
        "word": "measure",
        "partOfSpeech": "n.",
        "chinese": "措施；方法",
        "english": "an official action that is done in order to achieve a particular aim"
        },
        {
        "word": "absolutely",
        "partOfSpeech": "adv.",
        "chinese": "（强调真实无误）绝对地，完全地",
        "english": "used to emphasize that something is completely true"
        },
        {
        "word": "contrast",
        "partOfSpeech": "v.",
        "chinese": "对比；对照",
        "english": "to compare two things in order to show the differences between them"
        },
        {
        "word": "imply",
        "partOfSpeech": "v.",
        "chinese": "暗示；暗指",
        "english": "to suggest that something is true or that you feel or think something, without saying so directly"
        },
        {
        "word": "major",
        "partOfSpeech": "adj.",
        "chinese": "主要的；重要的",
        "english": "very large or important"
        },
        {
        "word": "available",
        "partOfSpeech": "adj.",
        "chinese": "可获得的；可购得的；可找到的",
        "english": "that you can get, buy or find easily"
        },
        {
        "word": "option",
        "partOfSpeech": "n.",
        "chinese": "选择；可选择的事物",
        "english": "choice"
        },
        {
        "word": "desire",
        "partOfSpeech": "n.",
        "chinese": "愿望；欲望；渴望",
        "english": "a strong wish to have or do something"
        },
        {
        "word": "reduce",
        "partOfSpeech": "v.",
        "chinese": "减少，缩小（尺寸、数量、价格等）",
        "english": "to make something less or smaller in size, quantity, price, etc."
        },
        {
        "word": "design",
        "partOfSpeech": "v.",
        "chinese": "设计；制图；构思",
        "english": "to decide how something will look, work, etc., especially by drawing plans or making models"
        },
        {
        "word": "balance",
        "partOfSpeech": "v.",
        "chinese": "同等重视（相对的两个事物或方面）",
        "english": "to give equal importance to two contrasting things or parts of something"
        },
        {
        "word": "graduate",
        "partOfSpeech": "v./n.",
        "chinese": "大学毕业；大学毕业生",
        "english": "to get a degree from a university or college; a person who has a university degree"
        },
        {
        "word": "plus",
        "partOfSpeech": "conj.",
        "chinese": "而且；此外；况且",
        "english": "used to add more information"
        }
    ]
};

// 导出到全局作用域
if (typeof window !== 'undefined') {
  window.INIT_WORDS_DATA = INIT_WORDS_DATA;
}

// 用于模块化环境
if (typeof module !== 'undefined' && module.exports) {
  module.exports = INIT_WORDS_DATA;
}
