/**
 * 背诵测试管理模块
 * 负责测试流程控制、答案核对、成绩统计
 */

class QuizManager {
    constructor() {
        // 测试状态
        this.currentIndex = 0;           // 当前单词索引
        this.correctCount = 0;           // 正确计数
        this.incorrectCount = 0;         // 错误计数
        this.correctWords = [];          // 正确的单词数组
        this.incorrectWords = [];        // 错误的单词数组

        // 测试设置
        this.quizMode = 'en-to-zh';      // 测试模式，默认英翻中
        this.currentWords = [];          // 当前测试的单词数组
        this.shuffledWords = [];         // 打乱顺序后的单词数组

        // 当前状态
        this.isAnswerChecked = false;    // 是否已检查答案
        this.currentQuestion = null;     // 当前问题对象
    }

    /**
     * 初始化测试管理器 - 重置所有状态
     */
    init() {
        this.resetStats();
        console.log('测试管理器初始化完成');
    }

    /**
     * 开始新的测试 - 设置测试参数并开始第一个问题
     * @param {object[]} words - 测试用的单词数组
     * @param {string} mode - 测试模式
     */
    startQuiz(words, mode) {
        if (!words || words.length === 0) {
            console.error('开始测试失败：单词数组为空');
            return false;
        }

        this.currentWords = words;
        this.quizMode = mode;
        this.resetStats();

        // 打乱单词顺序，避免每次测试顺序相同
        this.shuffledWords = Utils.shuffleArray([...words]);
        this.currentIndex = 0;

        // 设置第一个问题
        this.setCurrentQuestion();
        
        console.log(`测试开始：模式=${mode}, 单词数=${words.length}`);
        return true;
    }

    /**
     * 重置统计信息 - 开始新测试时调用
     */
    resetStats() {
        this.currentIndex = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.correctWords = [];
        this.incorrectWords = [];
        this.isAnswerChecked = false;
        this.currentQuestion = null;
        
        console.log('测试统计信息已重置');
    }

    /**
     * 设置当前问题 - 根据当前索引创建问题对象
     */
    setCurrentQuestion() {
        if (this.currentIndex < this.shuffledWords.length) {
            const word = this.shuffledWords[this.currentIndex];
            this.currentQuestion = this.createQuestion(word, this.quizMode);
            this.isAnswerChecked = false;
            
            console.log(`设置第 ${this.currentIndex + 1} 个问题: ${word.word}`);
        } else {
            console.warn('无法设置问题：已超过单词数组范围');
            this.currentQuestion = null;
        }
    }

    /**
     * 根据模式创建问题 - 生成不同类型的问题内容
     * @param {object} word - 单词数据
     * @param {string} mode - 测试模式
     * @returns {object} 问题对象
     */
    createQuestion(word, mode) {
        // 验证单词数据完整性
        if (!word || !word.word || !word.chinese || !word.english) {
            console.error('创建问题失败：单词数据不完整', word);
            return null;
        }

        let question;
        
        switch(mode) {
            case 'en-to-zh':
                question = {
                    type: 'translation',
                    question: `${word.word} (${word.partOfSpeech})`,
                    hint: '请输入中文释义',
                    correctAnswer: word.chinese,
                    displayAnswer: word.chinese,
                    fullWord: word
                };
                break;

            case 'zh-to-en':
                question = {
                    type: 'translation',
                    question: word.chinese,
                    hint: '请输入英文单词',
                    correctAnswer: word.word,
                    displayAnswer: word.word,
                    fullWord: word
                };
                break;

            case 'en-to-en':
                question = {
                    type: 'definition',
                    question: word.english,
                    hint: '请输入对应的英文单词',
                    correctAnswer: word.word,
                    displayAnswer: word.word,
                    fullWord: word
                };
                break;

            default:
                console.warn(`未知的测试模式: ${mode}，使用默认模式 en-to-zh`);
                question = this.createQuestion(word, 'en-to-zh');
                break;
        }

        return question;
    }

    /**
     * 检查用户答案 - 验证用户输入是否正确
     * @param {string} userAnswer - 用户输入的答案
     * @returns {object} 检查结果
     */
    checkAnswer(userAnswer) {
        console.log(`checkAnswer called with: "${userAnswer}"`);
        
        // 验证输入参数
        if (!userAnswer || typeof userAnswer !== 'string') {
            return { 
                success: false, 
                error: '答案不能为空',
                alreadyChecked: false 
            };
        }

        if (this.isAnswerChecked) {
            return { 
                success: false, 
                error: '答案已检查过',
                alreadyChecked: true 
            };
        }

        if (!this.currentQuestion) {
            return { 
                success: false, 
                error: '没有当前问题',
                alreadyChecked: false 
            };
        }

        const trimmedAnswer = userAnswer.trim();
        const isCorrect = this.validateAnswer(trimmedAnswer, this.currentQuestion.correctAnswer);
        this.isAnswerChecked = true;

        console.log(`Answer validation result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);

        // 记录结果
        if (isCorrect) {
            this.correctCount++;
            // 避免重复添加正确单词
            if (!this.correctWords.some(w => w.word === this.currentQuestion.fullWord.word)) {
                this.correctWords.push(this.currentQuestion.fullWord);
            }
        } else {
            this.incorrectCount++;
            // 避免重复添加错误单词
            if (!this.incorrectWords.some(w => w.word === this.currentQuestion.fullWord.word)) {
                this.incorrectWords.push(this.currentQuestion.fullWord);
            }
        }

        return {
            success: true,
            isCorrect: isCorrect,
            userAnswer: trimmedAnswer,
            correctAnswer: this.currentQuestion.displayAnswer,
            explanation: this.getExplanation(this.currentQuestion.fullWord),
            word: this.currentQuestion.fullWord
        };
    }

    /**
     * 验证答案 - 比较用户答案和正确答案
     * @param {string} userAnswer - 用户答案
     * @param {string} correctAnswer - 正确答案
     * @returns {boolean} 是否正确
     */
    validateAnswer(userAnswer, correctAnswer) {
        if (!userAnswer || !correctAnswer) {
            return false;
        }

        // 转换为小写进行比较，忽略大小写差异
        const userAnswerLower = userAnswer.toLowerCase().trim();
        const correctAnswerLower = correctAnswer.toLowerCase().trim();

        // 基础比较
        if (userAnswerLower === correctAnswerLower) {
            return true;
        }

        // 处理中文标点符号差异
        const normalizedUser = userAnswerLower
            .replace(/，/g, ',')
            .replace(/；/g, ';')
            .replace(/！/g, '!')
            .replace(/？/g, '?')
            .replace(/：/g, ':')
            .replace(/"/g, "'")
            .replace(/\s+/g, ' ')
            .trim();

        const normalizedCorrect = correctAnswerLower
            .replace(/，/g, ',')
            .replace(/；/g, ';')
            .replace(/！/g, '!')
            .replace(/？/g, '?')
            .replace(/：/g, ':')
            .replace(/"/g, "'")
            .replace(/\s+/g, ' ')
            .trim();

        return normalizedUser === normalizedCorrect;
    }

    /**
     * 手动标记答案正误 - 允许在检查答案后重新标记
     * @param {boolean} isCorrect - 是否标记为正确
     * @returns {object} 标记结果
     */
    markAnswer(isCorrect) {
        console.log(`markAnswer called with isCorrect=${isCorrect}, currentQuestion exists=${!!this.currentQuestion}`);
        
        if (!this.currentQuestion) {
            console.error('Cannot mark answer: no current question');
            return { success: false, error: '没有当前问题' };
        }

        const currentWord = this.currentQuestion.fullWord;
        console.log(`Marking word "${currentWord.word}" as ${isCorrect ? 'correct' : 'incorrect'}`);

        // 记录当前统计状态以便调试
        const beforeStats = {
            correct: this.correctCount,
            incorrect: this.incorrectCount,
            correctWords: this.correctWords.length,
            incorrectWords: this.incorrectWords.length
        };

        if (isCorrect) {
            // 标记为正确
            
            
            // 如果之前在错误列表中，移除
            const wrongIndex = this.incorrectWords.findIndex(
                w => w.word === currentWord.word
            );
            if (wrongIndex !== -1) {
                this.incorrectWords.splice(wrongIndex, 1);
                this.incorrectCount--;
                console.log(`Removed from incorrect words list`);
            }
            
            // 添加到正确列表（如果不存在）
            if (!this.correctWords.some(w => w.word === currentWord.word)) {
                this.correctWords.push(currentWord);
                console.log(`Added to correct words list`);
                this.correctCount++;
            } else {
                console.log(`Already in correct words list`);
                
            }
            
        } else {
            // 标记为错误
            
            
            // 如果之前在正确列表中，移除
            const correctIndex = this.correctWords.findIndex(
                w => w.word === currentWord.word
            );
            if (correctIndex !== -1) {
                this.correctWords.splice(correctIndex, 1);
                this.correctCount--;
                console.log(`Removed from correct words list`);
            }
            
            // 添加到错误列表（如果不存在）
            if (!this.incorrectWords.some(w => w.word === currentWord.word)) {
                this.incorrectWords.push(currentWord);
                console.log(`Added to incorrect words list`);
                this.incorrectCount++;
            } else {
                console.log(`Already in incorrect words list`);
            }
        }

        // 标记答案后，保持 isAnswerChecked 为 true
        this.isAnswerChecked = true;

        // 记录统计变化
        const afterStats = {
            correct: this.correctCount,
            incorrect: this.incorrectCount,
            correctWords: this.correctWords.length,
            incorrectWords: this.incorrectWords.length
        };

        console.log(`Marking completed. Stats changed:`, { before: beforeStats, after: afterStats });

        return {
            success: true,
            isCorrect: isCorrect,
            word: currentWord
        };
    }

   
    /**
     * 获取题目解释 - 生成详细的反馈信息
     * @param {object} word - 单词数据
     * @returns {string} 解释文本
     */
    getExplanation(word) {
        if (!word) {
            return '无法获取单词信息';
        }

        switch(this.quizMode) {
            case 'en-to-zh':
                return `英文: ${word.word} (${word.partOfSpeech}) - 中文: ${word.chinese}`;
            case 'zh-to-en':
                return `中文: ${word.chinese} - 英文: ${word.word} (${word.partOfSpeech})`;
            case 'en-to-en':
                return `英文释义: ${word.english} - 单词: ${word.word} (${word.partOfSpeech})`;
            default:
                return `单词: ${word.word} - 中文: ${word.chinese}`;
        }
    }

    /**
     * 切换到下一题 - 移动到下一个单词或结束测试
     * @returns {boolean} 是否还有下一题
     */
    nextQuestion() {
        if (!this.isAnswerChecked) {
            console.warn('无法切换到下一题：当前答案未检查');
            return false;
        }

        this.currentIndex++;
        
        if (this.currentIndex < this.shuffledWords.length) {
            this.setCurrentQuestion();
            console.log(`切换到第 ${this.currentIndex + 1} 题`);
            return true;
        } else {
            console.log('测试结束');
            return false;
        }
    }

    /**
     * 检查是否还有下一题
     * @returns {boolean}
     */
    hasNext() {
        return this.currentIndex < this.shuffledWords.length - 1;
    }

    /**
     * 获取当前问题
     * @returns {object} 当前问题对象
     */
    getCurrentQuestion() {
        return this.currentQuestion;
    }

    /**
     * 获取测试统计信息
     * @returns {object} 统计信息
     */
    getStats() {
        const total = this.shuffledWords.length;
        const current = Math.min(this.currentIndex + 1, total);
        const progress = total > 0 ? (current / total) * 100 : 0;
        
        return {
            current: current,
            total: total,
            correct: this.correctCount,
            incorrect: this.incorrectCount,
            progress: progress
        };
    }

    /**
     * 获取测试结果 - 测试结束时调用
     * @returns {object} 完整结果
     */
    getResults() {
        const total = this.shuffledWords.length;
        const accuracy = total > 0 ? (this.correctCount / total) * 100 : 0;
        
        return {
            totalWords: total,
            correctCount: this.correctCount,
            incorrectCount: this.incorrectCount,
            accuracy: Math.round(accuracy * 100) / 100, // 保留两位小数
            correctWords: this.correctWords,
            incorrectWords: this.incorrectWords,
            mode: this.quizMode,
            completedAt: new Date().toISOString()
        };
    }

    /**
     * 获取错题列表
     * @returns {object[]} 错题数组
     */
    getWrongWords() {
        return [...this.incorrectWords]; // 返回副本，避免外部修改
    }

    /**
     * 用错题重新开始测试 - 只测试之前答错的单词
     * @returns {boolean} 是否成功重新开始
     */
    restartWithWrongWords() {
        if (this.incorrectWords.length === 0) {
            console.warn('无法重新开始：没有错题');
            return false;
        }

        console.log(`用 ${this.incorrectWords.length} 个错题重新开始测试`);
        
        // 完全重置状态
        this.resetStats();
        
        // 使用错题开始新测试
        return this.startQuiz(this.incorrectWords, this.quizMode);
    }

    /**
     * 重置统计信息 - 开始新测试时调用
     */
    resetStats() {
        this.currentIndex = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.correctWords = [];
        this.incorrectWords = [];
        this.isAnswerChecked = false;
        this.currentQuestion = null;
        this.shuffledWords = [];
        
        console.log('测试统计信息已完全重置');
    }

    /**
     * 跳过当前题目 - 将当前题目标记为错误
     * @returns {boolean} 是否跳过成功
     */
    skipQuestion() {
        if (!this.currentQuestion) {
            return false;
        }

        if (this.isAnswerChecked) {
            console.warn('无法跳过：答案已检查');
            return false;
        }

        console.log(`跳过题目: ${this.currentQuestion.fullWord.word}`);
        
        this.incorrectCount++;
        this.incorrectWords.push(this.currentQuestion.fullWord);
        this.isAnswerChecked = true;
        
        return true;
    }

    /**
     * 获取当前进度百分比
     * @returns {number} 进度百分比
     */
    getProgress() {
        if (this.shuffledWords.length === 0) {
            return 0;
        }
        return ((this.currentIndex + 1) / this.shuffledWords.length) * 100;
    }

    /**
     * 检查测试是否结束
     * @returns {boolean} 是否结束
     */
    isFinished() {
        return this.currentIndex >= this.shuffledWords.length;
    }

    /**
     * 获取剩余题目数量
     * @returns {number} 剩余题目数
     */
    getRemainingCount() {
        return Math.max(0, this.shuffledWords.length - this.currentIndex - 1);
    }

    /**
     * 获取测试配置信息
     * @returns {object} 测试配置
     */
    getQuizConfig() {
        return {
            mode: this.quizMode,
            totalWords: this.shuffledWords.length,
            started: this.currentIndex > 0
        };
    }

    /**
     * 验证测试状态 - 检查测试是否处于有效状态
     * @returns {boolean} 是否有效
     */
    validateState() {
        if (!this.shuffledWords || this.shuffledWords.length === 0) {
            console.error('测试状态无效：单词数组为空');
            return false;
        }

        if (this.currentIndex < 0 || this.currentIndex >= this.shuffledWords.length) {
            console.error('测试状态无效：当前索引越界');
            return false;
        }

        return true;
    }
}
