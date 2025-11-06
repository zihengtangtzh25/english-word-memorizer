/**
 * 主应用程序入口文件
 * 负责初始化各模块并协调它们之间的通信
 */

class VocabularyApp {
    constructor() {
        // 初始化各管理模块
        this.wordManager = null;
        this.quizManager = null;
        this.uiManager = null;
        
        
        // 应用程序状态
        this.currentPage = 'quiz-settings';
        this.isInitialized = false;
        this.isQuizActive = false;

        // 绑定方法上下文
        this.handleNavigation = this.handleNavigation.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
        this.handleMarkAnswer = this.handleMarkAnswer.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleRestartQuiz = this.handleRestartQuiz.bind(this);
        this.handleAddToWrongSource = this.handleAddToWrongSource.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
    }

    init() {
        console.log('开始初始化应用程序...');
        
        try {
            // 初始化各模块
            this.wordManager = new WordManager();
            this.quizManager = new QuizManager();
            this.uiManager = new UIManager();
            
            // 将实例挂载到window对象，便于调试
            window.wordManager = this.wordManager;
            window.quizManager = this.quizManager;
            window.uiManager = this.uiManager;
            window.vocabularyApp = this;
            
            // 显示加载状态
            Utils.showNotification('正在初始化应用程序...', 'info');
            
            // 同步初始化各模块
            this.wordManager.init();
            this.quizManager.init();
            this.uiManager.init();
            
            
            
            // 设置事件监听器
            this.setupEventListeners();
            
            // 加载初始数据
            this.loadInitialData();
            
            this.isInitialized = true;
            console.log('应用程序初始化完成');
            
            // 显示成功通知
            Utils.showNotification('应用程序初始化完成', 'success');
            
        } catch (error) {
            console.error('应用程序初始化失败:', error);
            Utils.showNotification('应用程序初始化失败，请刷新页面重试', 'error');
        }
    }


    /**
     * 设置全局事件监听器 - 处理导航、按钮点击等通用事件
     */
    setupEventListeners() {
        console.log('设置全局事件监听器...');
        
        // 导航切换事件
        document.addEventListener('navChange', (event) => {
            this.handleNavigation(event.detail.page);
        });

        // 开始测试事件
        document.addEventListener('startQuiz', (event) => {
            this.handleStartQuiz(event.detail.settings);
        });

        // 检查答案事件
        document.addEventListener('checkAnswer', (event) => {
            this.handleCheckAnswer(event.detail.answer);
        });

        // 标记答案事件
        document.addEventListener('markAnswer', (event) => {
            this.handleMarkAnswer(event.detail.isCorrect);
        });

        // 下一个问题事件
        document.addEventListener('nextQuestion', () => {
            this.handleNextQuestion();
        });

        // 重新开始测试事件
        document.addEventListener('restartQuiz', (event) => {
            this.handleRestartQuiz(event.detail.wrongOnly);
        });

        // 添加到错题词源事件
        document.addEventListener('addToWrongSource', () => {
            this.handleAddToWrongSource();
        });

        // 键盘快捷键事件
        document.addEventListener('keydown', this.handleKeyboard);

        // 页面卸载前保存数据
        window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });

        // 处理在线/离线状态
        window.addEventListener('online', () => {
            Utils.showNotification('网络连接已恢复', 'success');
        });

        window.addEventListener('offline', () => {
            Utils.showNotification('网络连接已断开', 'warning');
        });

        console.log('全局事件监听器设置完成');
    }

    /**
     * 加载初始数据 - 包括默认词源、用户设置等
     */
    loadInitialData() {
        console.log('加载初始数据...');
        
        try {
            // 加载词源数据并更新UI
            const categories = this.wordManager.getCategories();
            this.uiManager.updateCategorySelectors();
            
            // 加载用户设置
            this.loadUserSettings();
            
            // 显示应用信息
            this.showAppInfo();
            
            console.log('初始数据加载完成');
        } catch (error) {
            console.error('加载初始数据失败:', error);
        }
    }

    /**
     * 加载用户设置 - 从本地存储恢复用户偏好
     */
    loadUserSettings() {
        try {
            const settings = Utils.getLocalStorage('userSettings');
            if (settings) {
                // 恢复测试模式设置
                if (settings.quizMode && this.uiManager.elements.quizMode) {
                    this.uiManager.elements.quizMode.value = settings.quizMode;
                }
                
                // 恢复词源选择设置
                if (settings.wordSource && this.uiManager.elements.wordSource) {
                    this.uiManager.elements.wordSource.value = settings.wordSource;
                }
                
                console.log('用户设置加载完成');
            }
        } catch (error) {
            console.error('加载用户设置失败:', error);
        }
    }

    /**
     * 保存用户设置 - 将用户偏好保存到本地存储
     */
    saveUserSettings() {
        try {
            const settings = {
                quizMode: this.uiManager.elements.quizMode ? this.uiManager.elements.quizMode.value : 'en-to-zh',
                wordSource: this.uiManager.elements.wordSource ? this.uiManager.elements.wordSource.value : 'default',
                lastPage: this.currentPage,
                timestamp: new Date().toISOString()
            };
            
            Utils.setLocalStorage('userSettings', settings);
        } catch (error) {
            console.error('保存用户设置失败:', error);
        }
    }

    /**
     * 显示应用信息 - 在控制台显示应用状态信息
     */
    showAppInfo() {
        const stats = this.wordManager.getCategoryStats();
        console.log(`
╔═══════════════════════════════════╗
║       英语单词背诵程序           ║
║      English Vocabulary App      ║
╠═══════════════════════════════════╣
║ 分类数量: ${stats.totalCategories.toString().padEnd(20)} ║
║ 单词总数: ${stats.totalWords.toString().padEnd(20)} ║
║ 当前页面: ${this.currentPage.padEnd(20)} ║
║ 测试状态: ${this.isQuizActive ? '进行中' : '未开始'.padEnd(16)} ║
╚═══════════════════════════════════╝
        `.trim());
    }

    /**
     * 处理页面导航
     * @param {string} page - 目标页面标识
     */
    handleNavigation(page) {
        console.log(`处理页面导航: ${page}`);
        
        if (!this.isInitialized) {
            console.warn('应用程序未初始化，无法导航');
            return;
        }

        // 验证页面名称
        const validPages = ['quiz-settings', 'quiz', 'vocabulary', 'results'];
        if (!validPages.includes(page)) {
            console.error(`无效的页面: ${page}`);
            return;
        }

        // 保存当前页面状态
        this.currentPage = page;
        this.saveUserSettings();

        // 执行页面切换
        this.uiManager.showPage(page);
        
        // 根据页面执行特定操作
        switch(page) {
            case 'vocabulary':
                this.handleVocabularyPage();
                break;
            case 'results':
                this.handleResultsPage();
                break;
            case 'quiz-settings':
                this.handleQuizSettingsPage();
                break;
            case 'quiz':
                this.handleQuizPage();
                break;
        }

        console.log(`成功导航到页面: ${page}`);
    }

    /**
     * 处理词源管理页面 - 刷新词源列表
     */
    handleVocabularyPage() {
        console.log('进入词源管理页面');
        this.uiManager.refreshVocabularyList();
    }

    /**
     * 处理测试结果页面 - 显示测试结果
     */
    handleResultsPage() {
        console.log('进入测试结果页面');
        const results = this.quizManager.getResults();
        this.uiManager.showResults(results);
    }

    /**
     * 处理测试设置页面 - 更新分类选择器
     */
    handleQuizSettingsPage() {
        console.log('进入测试设置页面');
        this.uiManager.updateCategorySelectors();
    }

    /**
     * 处理测试页面 - 确保测试状态正确
     */
    handleQuizPage() {
        console.log('进入测试页面');
        // 如果测试未开始，导航回设置页面
        if (!this.isQuizActive || !this.quizManager.currentQuestion) {
            console.warn('测试未开始，跳转到设置页面');
            this.handleNavigation('quiz-settings');
            Utils.showNotification('请先设置测试参数并开始测试', 'warning');
            return;
        }
        
        // 显示当前问题
        const question = this.quizManager.getCurrentQuestion();
        this.uiManager.showQuestion(question);
        this.uiManager.updateStats();
    }

    /**
     * 开始背诵测试
     * @param {object} settings - 测试设置
     */
    handleStartQuiz(settings) {
        console.log('开始背诵测试:', settings);
        
        if (!settings || !settings.category) {
            Utils.showNotification('请选择测试词源', 'warning');
            return;
        }

        try {
            // 获取选定词源的单词
            const words = this.wordManager.getWordsByCategory(settings.category);
            
            if (words.length === 0) {
                Utils.showNotification('所选词源为空，请先添加单词', 'warning');
                return;
            }

            // 开始测试
            const success = this.quizManager.startQuiz(words, settings.mode);
            
            if (success) {
                this.isQuizActive = true;
                this.handleNavigation('quiz');
                Utils.showNotification(`测试开始！共 ${words.length} 个单词`, 'success');
            } else {
                Utils.showNotification('开始测试失败', 'error');
            }
            
        } catch (error) {
            console.error('开始测试失败:', error);
            Utils.showNotification('开始测试失败，请重试', 'error');
        }
    }

    /**
     * 检查用户答案
     * @param {string} userAnswer - 用户输入的答案
     * @returns {boolean} 是否成功检查答案
     */
    handleCheckAnswer(userAnswer) {
        console.log('检查用户答案:', userAnswer);
        
        if (!this.isQuizActive) {
            Utils.showNotification('测试未开始', 'warning');
            return false;
        }

        if (!userAnswer || userAnswer.trim() === '') {
            Utils.showNotification('请输入答案', 'warning');
            return false;
        }

        try {
            const result = this.quizManager.checkAnswer(userAnswer);
            
            if (result.success) {
                // 显示反馈
                this.uiManager.showAnswerFeedback(result);
                
                // 更新统计信息
                this.uiManager.updateStats();
                
                return true;
            } else {
                Utils.showNotification(result.error || '检查答案失败', 'error');
                return false;
            }
            
        } catch (error) {
            console.error('检查答案失败:', error);
            Utils.showNotification('检查答案失败，请重试', 'error');
            return false;
        }
    }

    /**
     * 手动标记答案正误
     * @param {boolean} isCorrect - 是否标记为正确
     */
    handleMarkAnswer(isCorrect) {
        console.log(`手动标记答案: ${isCorrect ? '正确' : '错误'}`);
        
        try {
            const result = this.quizManager.markAnswer(isCorrect);
            
            if (result.success) {
                // 显示反馈
                this.uiManager.showManualMarkFeedback(isCorrect, result);
                
                // 更新统计信息
                this.uiManager.updateStats();
                
                // 播放反馈音效
                this.playFeedbackSound(isCorrect);
                
            } else {
                Utils.showNotification(result.error || '标记答案失败', 'error');
            }
            
        } catch (error) {
            console.error('标记答案失败:', error);
            Utils.showNotification('标记答案失败，请重试', 'error');
        }
    }

    /**
     * 播放反馈音效 - 根据答案正误播放不同音效
     * @param {boolean} isCorrect - 是否正确
     */
    playFeedbackSound(isCorrect) {
        // 这里可以添加音效播放逻辑
        // 由于浏览器自动播放策略，可能需要用户交互后才能播放
        console.log(`播放反馈音效: ${isCorrect ? '正确' : '错误'}`);
        
        // 示例：使用Web Audio API播放简单音效
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // 设置音调
            oscillator.frequency.value = isCorrect ? 800 : 400;
            oscillator.type = 'sine';
            
            // 设置音量
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            // 播放
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            
        } catch (error) {
            // 音效播放失败不影响主要功能
            console.log('音效播放失败:', error);
        }
    }

    /**
     * 切换到下一题或结束测试
     */
    handleNextQuestion() {
        console.log('切换到下一题');
        
        if (!this.isQuizActive) {
            Utils.showNotification('测试未开始', 'warning');
            return;
        }

        try {
            const hasNext = this.quizManager.nextQuestion();
            
            if (hasNext) {
                // 显示下一题
                this.uiManager.showNextQuestion();
            } else {
                // 测试结束
                this.finishQuiz();
            }
            
        } catch (error) {
            console.error('切换题目失败:', error);
            Utils.showNotification('切换题目失败，请重试', 'error');
        }
    }

    /**
     * 完成测试，显示结果
     */
    finishQuiz() {
        console.log('测试完成');
        
        try {
            // 获取测试结果
            const results = this.quizManager.getResults();
            
            // 更新测试状态
            this.isQuizActive = false;
            
            // 显示结果页面
            this.handleNavigation('results');
            
            // 显示完成通知
            const accuracyMsg = `测试完成！正确率: ${results.accuracy}%`;
            Utils.showNotification(accuracyMsg, 'success');
            
            // 保存测试记录
            this.saveQuizRecord(results);
            
        } catch (error) {
            console.error('完成测试失败:', error);
            Utils.showNotification('完成测试失败', 'error');
        }
    }

    /**
     * 保存测试记录 - 将测试结果保存到本地存储
     * @param {object} results - 测试结果
     */
    saveQuizRecord(results) {
        try {
            const records = Utils.getLocalStorage('quizRecords') || [];
            
            // 创建新记录
            const newRecord = {
                id: Utils.generateId(),
                date: new Date().toISOString(),
                mode: results.mode,
                totalWords: results.totalWords,
                correctCount: results.correctCount,
                incorrectCount: results.incorrectCount,
                accuracy: results.accuracy,
                duration: this.calculateQuizDuration() // 可以添加计时功能
            };
            
            // 添加到记录列表（最多保存50条）
            records.unshift(newRecord);
            if (records.length > 50) {
                records.pop();
            }
            
            Utils.setLocalStorage('quizRecords', records);
            console.log('测试记录已保存');
            
        } catch (error) {
            console.error('保存测试记录失败:', error);
        }
    }

    /**
     * 计算测试时长 - 模拟计算测试持续时间
     * @returns {number} 测试时长（秒）
     */
    calculateQuizDuration() {
        // 这里可以添加实际的计时逻辑
        // 目前返回一个模拟值
        return Math.floor(Math.random() * 300) + 60; // 1-5分钟
    }

    /**
     * 重新开始测试
     * @param {boolean} wrongOnly - 是否只测试错题
     */
    handleRestartQuiz(wrongOnly) {
        console.log(`重新开始测试: ${wrongOnly ? '只测错题' : '全部重测'}`);
        
        try {
            let success;
            
            if (wrongOnly) {
                // 只测试错题
                success = this.quizManager.restartWithWrongWords();
                if (success) {
                    this.isQuizActive = true;
                    // 重置UI状态
                    this.uiManager.resetQuizUI();
                    // 显示第一个问题
                    const question = this.quizManager.getCurrentQuestion();
                    this.uiManager.showQuestion(question);
                    this.uiManager.updateStats();
                    
                    Utils.showNotification('错题重测开始', 'success');
                } else {
                    Utils.showNotification('没有错题可以重测', 'warning');
                    return;
                }
            } else {
                // 全部重测，返回设置页面
                this.isQuizActive = false;
                this.quizManager.resetStats(); // 重置测试统计
                this.handleNavigation('quiz-settings');
                Utils.showNotification('请重新设置测试参数', 'info');
            }
            
        } catch (error) {
            console.error('重新开始测试失败:', error);
            Utils.showNotification('重新开始测试失败', 'error');
        }
    }

    /**
     * 将错题加入错题词源
     */
    handleAddToWrongSource() {
        console.log('将错题加入错题词源');
        
        try {
            const wrongWords = this.quizManager.getWrongWords();
            
            if (wrongWords.length === 0) {
                Utils.showNotification('没有错题可以添加', 'warning');
                return;
            }
            
            // 添加到错题词源
            const result = this.wordManager.addWordsToCategory('wrongWords', wrongWords);
            
            if (result.added > 0) {
                Utils.showNotification(`成功添加 ${result.added} 个错题到错题词源`, 'success');
                
                // 如果有跳过的单词，显示警告
                if (result.skipped > 0) {
                    Utils.showNotification(`${result.skipped} 个单词已存在，未重复添加`, 'info');
                }
                
                // 刷新词源列表
                this.uiManager.updateCategorySelectors();
                
            } else {
                Utils.showNotification('添加错题失败', 'error');
            }
            
        } catch (error) {
            console.error('添加错题到词源失败:', error);
            Utils.showNotification('添加错题失败', 'error');
        }
    }

    /**
     * 处理键盘事件
     * @param {Event} event - 键盘事件
     */
    handleKeyboard(event) {
        // 只在测试页面处理快捷键
        if (this.currentPage !== 'quiz') return;

        console.log(`键盘事件: ${event.key}, 当前状态: isAnswerChecked=${this.quizManager.isAnswerChecked}`);

        // 对于数字键和Enter键，阻止默认行为
        if (['9', '0', 'Enter'].includes(event.key)) {
            event.preventDefault();
        }

        const isAnswerChecked = this.quizManager.isAnswerChecked;

        switch(event.key) {
            case 'Enter':
                this.handleEnterKey();
                break;
            case '9':
                this.handleNumberKey(9);
                break;
            case '0':
                this.handleNumberKey(0);
                break;
        }
    }

    /**
     * 处理Enter键按下 - 根据当前状态执行不同操作
     */
    handleEnterKey() {
        console.log('Enter pressed, answer checked:', this.quizManager.isAnswerChecked);
        
        if (this.quizManager.isAnswerChecked) {
            // 答案已检查，切换到下一题
            console.log('Moving to next question');
            this.handleNextQuestion();
        } else {
            // 答案未检查，检查当前答案
            console.log('Checking answer');
            const answer = this.uiManager.getUserAnswer();
            if (answer && answer.trim() !== '') {
                this.handleCheckAnswer(answer);
            } else {
                Utils.showNotification('请输入答案', 'warning');
            }
        }
    }

    /**
     * 处理数字键按下 - 标记答案正误
     * @param {number} key - 按下的数字键
     */
    handleNumberKey(key) {
        console.log(`Number key ${key} pressed, answer checked: ${this.quizManager.isAnswerChecked}`);
        
        if (this.quizManager.isAnswerChecked) {
            // 答案已检查，直接标记
            const isCorrect = (key === 9);
            console.log(`Directly marking as ${isCorrect ? 'correct' : 'incorrect'}`);
            this.handleMarkAnswer(isCorrect);
        } else {
            // 答案未检查，先检查答案再标记
            console.log('Answer not checked, checking first then marking');
            const answer = this.uiManager.getUserAnswer();
            if (answer && answer.trim() !== '') {
                const checkResult = this.handleCheckAnswer(answer);
                if (checkResult) {
                    // 等待UI更新后再标记
                    setTimeout(() => {
                        const isCorrect = (key === 9);
                        console.log(`Now marking as ${isCorrect ? 'correct' : 'incorrect'}`);
                        this.handleMarkAnswer(isCorrect);
                    }, 150); // 稍微延长等待时间确保UI更新完成
                }
            } else {
                Utils.showNotification('请输入答案后再标记', 'warning');
            }
        }
    }


    //  /**
    //  * 处理Enter键按下 - 根据当前状态执行不同操作
    //  */
    // handleEnterKey() {
    //     // 这个方法现在可能不需要了，因为逻辑已经在handleKeyboard中处理
    //     // 保留它以防其他地方调用
    //     console.log('handleEnterKey called, answer checked:', this.quizManager.isAnswerChecked);
        
    //     if (this.quizManager.isAnswerChecked) {
    //         this.handleNextQuestion();
    //     } else {
    //         const answer = this.uiManager.getUserAnswer();
    //         this.handleCheckAnswer(answer);
    //     }
    // }

    /**
     * 处理页面卸载前的事件 - 保存应用状态
     */
    handleBeforeUnload() {
        console.log('页面即将卸载，保存应用状态...');
        
        try {
            // 保存用户设置
            this.saveUserSettings();
            
            // 保存单词数据
            this.wordManager.saveToLocalStorage();
            
            console.log('应用状态保存完成');
        } catch (error) {
            console.error('保存应用状态失败:', error);
        }
    }

    /**
     * 导出应用数据 - 备份所有数据
     */
    exportAppData() {
        try {
            const appData = {
                wordLibrary: this.wordManager.wordLibrary,
                userSettings: Utils.getLocalStorage('userSettings'),
                quizRecords: Utils.getLocalStorage('quizRecords'),
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };
            
            const dataStr = JSON.stringify(appData, null, 2);
            const filename = `vocabulary_app_backup_${Utils.formatDate(new Date()).replace(/\//g, '-')}.json`;
            
            Utils.downloadFile(dataStr, filename, 'application/json');
            Utils.showNotification('应用数据导出成功', 'success');
            
        } catch (error) {
            console.error('导出应用数据失败:', error);
            Utils.showNotification('导出应用数据失败', 'error');
        }
    }

    /**
     * 导入应用数据 - 恢复备份数据
     * @param {string} data - 备份数据字符串
     */
    importAppData(data) {
        try {
            const appData = JSON.parse(data);
            
            // 验证数据格式
            if (!appData.wordLibrary || !appData.version) {
                throw new Error('无效的备份文件格式');
            }
            
            // 确认导入（在实际使用中应该显示确认对话框）
            if (confirm('导入备份数据将覆盖当前数据，是否继续？')) {
                // 恢复数据
                this.wordManager.wordLibrary = appData.wordLibrary;
                this.wordManager.saveToLocalStorage();
                
                if (appData.userSettings) {
                    Utils.setLocalStorage('userSettings', appData.userSettings);
                }
                
                if (appData.quizRecords) {
                    Utils.setLocalStorage('quizRecords', appData.quizRecords);
                }
                
                // 刷新UI
                this.uiManager.updateCategorySelectors();
                if (this.currentPage === 'vocabulary') {
                    this.uiManager.refreshVocabularyList();
                }
                
                Utils.showNotification('应用数据导入成功', 'success');
            }
            
        } catch (error) {
            console.error('导入应用数据失败:', error);
            Utils.showNotification('导入应用数据失败: ' + error.message, 'error');
        }
    }

    /**
     * 重置应用数据 - 清除所有用户数据
     */
    resetAppData() {
        if (confirm('确定要重置所有数据吗？此操作不可撤销！')) {
            try {
                // 清除本地存储
                localStorage.clear();
                
                // 重新初始化应用
                this.isInitialized = false;
                this.isQuizActive = false;
                this.currentPage = 'quiz-settings';
                
                // 重新初始化模块
                this.wordManager.init();
                this.uiManager.updateCategorySelectors();
                this.handleNavigation('quiz-settings');
                
                Utils.showNotification('应用数据已重置', 'success');
                
            } catch (error) {
                console.error('重置应用数据失败:', error);
                Utils.showNotification('重置应用数据失败', 'error');
            }
        }
    }

    /**
     * 获取应用状态信息 - 用于调试和监控
     * @returns {object} 应用状态信息
     */
    getAppStatus() {
        const wordStats = this.wordManager.getCategoryStats();
        const quizStats = this.quizManager.getStats();
        const quizConfig = this.quizManager.getQuizConfig();
        
        return {
            initialized: this.isInitialized,
            currentPage: this.currentPage,
            quizActive: this.isQuizActive,
            wordStats: wordStats,
            quizStats: quizStats,
            quizConfig: quizConfig,
            uiManagerReady: !!this.uiManager,
            wordManagerReady: !!this.wordManager,
            quizManagerReady: !!this.quizManager
        };
    }
}

// 创建应用程序实例并初始化
const app = new VocabularyApp();

// DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM内容加载完成，开始初始化应用...');
    
    // 显示加载状态
    Utils.showNotification('正在初始化应用程序...', 'info');
    
    // 延迟初始化以确保所有DOM元素都已加载
    setTimeout(() => {
        app.init();
    }, 100);
});

// 导出应用程序实例（用于调试）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VocabularyApp;
}
