/**
 * 界面管理模块
 * 负责页面显示、用户交互、数据渲染
 */

class UIManager {
    constructor() {
        // 页面元素引用
        this.elements = {};
        // 当前页面状态
        this.currentPage = 'quiz-settings';
        // 当前选中的词源分类
        this.currentCategory = 'default';
        // 编辑模式状态
        this.editMode = {
            isEditing: false,
            editingWord: null
        };
    }

    /**
     * 初始化界面管理器 - 获取DOM元素引用，设置初始状态
     */
    init() {
        this.cacheDOMElements();
        this.setupUIEventListeners();
        this.showPage(this.currentPage);
        this.updateCategorySelectors();
        
        console.log('界面管理器初始化完成');
    }

    /**
     * 缓存常用的DOM元素 - 提高后续访问性能
     */
    cacheDOMElements() {
        try {
            // 页面容器
            this.elements.pages = {
                'quiz-settings': document.getElementById('quiz-settings-card'),
                'quiz': document.getElementById('quiz-card'),
                'vocabulary': document.getElementById('vocabulary-card'),
                'results': document.getElementById('results-card')
            };

            // 导航元素
            this.elements.navLinks = document.querySelectorAll('.nav-link');
            
            // 测试设置元素
            this.elements.quizMode = document.getElementById('quiz-mode');
            this.elements.wordSource = document.getElementById('word-source');
            this.elements.startQuizBtn = document.getElementById('start-quiz-btn');
            
            // 测试界面元素
            this.elements.questionTitle = document.getElementById('question-title');
            this.elements.questionContent = document.getElementById('question-content');
            this.elements.answerInput = document.getElementById('answer-input');
            this.elements.checkBtn = document.getElementById('check-btn');
            this.elements.markCorrectBtn = document.getElementById('mark-correct-btn');
            this.elements.markIncorrectBtn = document.getElementById('mark-incorrect-btn');
            this.elements.nextBtn = document.getElementById('next-btn');
            this.elements.feedback = document.getElementById('feedback');
            this.elements.shortcutHint = document.getElementById('shortcut-hint');
            
            // 统计元素
            this.elements.currentWord = document.getElementById('current-word');
            this.elements.totalWords = document.getElementById('total-words');
            this.elements.correctCount = document.getElementById('correct-count');
            this.elements.incorrectCount = document.getElementById('incorrect-count');
            
            // 结果页面元素
            this.elements.finalCorrect = document.getElementById('final-correct');
            this.elements.finalIncorrect = document.getElementById('final-incorrect');
            this.elements.correctWordsList = document.getElementById('correct-words-list');
            this.elements.incorrectWordsList = document.getElementById('incorrect-words-list');
            this.elements.restartAllBtn = document.getElementById('restart-all-btn');
            this.elements.restartWrongBtn = document.getElementById('restart-wrong-btn');
            this.elements.addToWrongSourceBtn = document.getElementById('add-to-wrong-source-btn');
            
            // 词源管理元素
            this.elements.vocabularyTableBody = document.getElementById('vocabulary-table-body');
            this.elements.searchVocabInput = document.getElementById('search-vocab-input');
            this.elements.importWordsBtn = document.getElementById('import-words-btn');
            this.elements.addWordBtn = document.getElementById('add-word-btn');
            this.elements.exportWordsBtn = document.getElementById('export-words-btn');
            this.elements.createCategoryBtn = document.getElementById('create-category-btn');
            this.elements.categoryTabs = document.getElementById('category-tabs');
            
            // 模态框元素
            this.elements.importModal = document.getElementById('import-modal');
            this.elements.importCategory = document.getElementById('import-category');
            this.elements.importFormat = document.getElementById('import-format');
            this.elements.importData = document.getElementById('import-data');
            this.elements.cancelImportBtn = document.getElementById('cancel-import-btn');
            this.elements.confirmImportBtn = document.getElementById('confirm-import-btn');
            
            this.elements.wordModal = document.getElementById('word-modal');
            this.elements.wordModalTitle = document.getElementById('word-modal-title');
            this.elements.wordInput = document.getElementById('word-input');
            this.elements.partOfSpeechInput = document.getElementById('part-of-speech-input');
            this.elements.chineseInput = document.getElementById('chinese-input');
            this.elements.englishInput = document.getElementById('english-input');
            this.elements.wordCategory = document.getElementById('word-category');
            this.elements.cancelWordBtn = document.getElementById('cancel-word-btn');
            this.elements.confirmWordBtn = document.getElementById('confirm-word-btn');
            
            this.elements.categoryModal = document.getElementById('category-modal');
            this.elements.newCategoryName = document.getElementById('new-category-name');
            this.elements.cancelCategoryBtn = document.getElementById('cancel-category-btn');
            this.elements.confirmCategoryBtn = document.getElementById('confirm-category-btn');
            
            this.elements.exportModal = document.getElementById('export-modal');
            this.elements.exportCategory = document.getElementById('export-category');
            this.elements.exportFormat = document.getElementById('export-format');
            this.elements.exportData = document.getElementById('export-data');
            this.elements.copyExportBtn = document.getElementById('copy-export-btn');
            this.elements.closeExportBtn = document.getElementById('close-export-btn');

            console.log('DOM元素缓存完成');
        } catch (error) {
            console.error('缓存DOM元素失败:', error);
        }
    }

    /**
     * 设置UI事件监听器 - 处理用户交互
     */
    setupUIEventListeners() {
        console.log('设置全局事件监听器...');
        
        // 导航事件
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link.dataset.page);
            });
        });

        // 开始测试按钮
        this.elements.startQuizBtn.addEventListener('click', () => {
            this.handleStartQuiz();
        });

        // 检查答案按钮
        this.elements.checkBtn.addEventListener('click', () => {
            this.handleCheckAnswer();
        });

        // 标记答案按钮
        this.elements.markCorrectBtn.addEventListener('click', () => {
            this.handleMarkAnswer(true);
        });
        this.elements.markIncorrectBtn.addEventListener('click', () => {
            this.handleMarkAnswer(false);
        });

        // 下一个按钮
        this.elements.nextBtn.addEventListener('click', () => {
            this.handleNextQuestion();
        });

        // 结果页面按钮
        this.elements.restartAllBtn.addEventListener('click', () => {
            this.handleRestartQuiz(false);
        });
        this.elements.restartWrongBtn.addEventListener('click', () => {
            this.handleRestartQuiz(true);
        });
        this.elements.addToWrongSourceBtn.addEventListener('click', () => {
            this.handleAddToWrongSource();
        });

        // 词源管理按钮
        this.elements.importWordsBtn.addEventListener('click', () => {
            this.showImportModal();
        });
        this.elements.addWordBtn.addEventListener('click', () => {
            this.showAddWordModal();
        });
        this.elements.exportWordsBtn.addEventListener('click', () => {
            this.showExportModal();
        });
        this.elements.createCategoryBtn.addEventListener('click', () => {
            this.showCreateCategoryModal();
        });

        // 搜索功能 - 使用防抖避免频繁搜索
        this.elements.searchVocabInput.addEventListener('input', 
            Utils.debounce((e) => {
                this.handleSearchVocabulary(e.target.value);
            }, 300)
        );

        // 输入框回车事件 - 只处理检查答案，不处理切换到下一题
        this.elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Input Enter pressed, answer checked:', window.quizManager.isAnswerChecked);
                
                // 只在答案未检查时处理Enter键
                if (!window.quizManager.isAnswerChecked) {
                    console.log('Checking answer from input');
                    this.handleCheckAnswer();
                } else {
                    console.log('Answer already checked, ignoring input Enter');
                }
                // 如果答案已检查，忽略Enter键，让全局处理程序处理
            }
        });

        // 模态框按钮
        this.setupModalEventListeners();
        
        // 键盘事件 - 由app.js统一处理
        // 注意：这里不再添加全局键盘事件监听，由app.js处理

        console.log('UI事件监听器设置完成');
    }

    /**
     * 处理答案输入框回车事件 - 已简化，只用于检查答案
     */
    handleAnswerInputEnter() {
        // 这个方法现在只由输入框的keypress事件调用
        // 确保只在答案未检查时检查答案
        if (!window.quizManager.isAnswerChecked) {
            this.handleCheckAnswer();
        }
    }

    /**
     * 更新答案按钮状态
     * @param {boolean} answerChecked - 答案是否已检查
     */
    updateAnswerButtonsState(answerChecked) {
        if (!this.elements.checkBtn || !this.elements.markCorrectBtn || 
            !this.elements.markIncorrectBtn || !this.elements.nextBtn) {
            return;
        }

        if (answerChecked) {
            // 答案已检查状态：显示标记按钮和下一题按钮
            this.elements.checkBtn.style.display = 'none';
            this.elements.markCorrectBtn.style.display = 'block';
            this.elements.markIncorrectBtn.style.display = 'block';
            this.elements.nextBtn.style.display = 'block';
            if (this.elements.answerInput) {
                this.elements.answerInput.disabled = true;
            }
            
            // 更新快捷键提示
            if (this.elements.shortcutHint) {
                this.elements.shortcutHint.style.display = 'block';
                this.elements.shortcutHint.innerHTML = `
                    <p>提示：按 <kbd>Enter</kbd> 切换到下一个单词 | 按 <kbd>9</kbd> 标记为正确 | 按 <kbd>0</kbd> 标记为错误</p>
                `;
            }
        } else {
            // 答案未检查状态：只显示检查答案按钮
            this.elements.checkBtn.style.display = 'block';
            this.elements.markCorrectBtn.style.display = 'none';
            this.elements.markIncorrectBtn.style.display = 'none';
            this.elements.nextBtn.style.display = 'none';
            if (this.elements.answerInput) {
                this.elements.answerInput.disabled = false;
            }
            
            // 隐藏或更新快捷键提示
            if (this.elements.shortcutHint) {
                this.elements.shortcutHint.style.display = 'block';
                this.elements.shortcutHint.innerHTML = `
                    <p>提示：输入答案后按 <kbd>Enter</kbd> 检查答案</p>
                `;
            }
        }
        
        console.log('Button state updated, answer checked:', answerChecked);
    }

    /**
     * 设置模态框事件监听器
     */
    setupModalEventListeners() {
        // 导入模态框
        this.elements.cancelImportBtn.addEventListener('click', () => {
            this.hideImportModal();
        });
        this.elements.confirmImportBtn.addEventListener('click', () => {
            this.handleConfirmImport();
        });

        // 单词模态框
        this.elements.cancelWordBtn.addEventListener('click', () => {
            this.hideWordModal();
        });
        this.elements.confirmWordBtn.addEventListener('click', () => {
            this.handleConfirmWord();
        });

        // 分类模态框
        this.elements.cancelCategoryBtn.addEventListener('click', () => {
            this.hideCategoryModal();
        });
        this.elements.confirmCategoryBtn.addEventListener('click', () => {
            this.handleConfirmCategory();
        });

        // 导出模态框
        this.elements.copyExportBtn.addEventListener('click', () => {
            this.handleCopyExport();
        });
        this.elements.closeExportBtn.addEventListener('click', () => {
            this.hideExportModal();
        });

        // 点击模态框外部关闭
        const modals = [
            this.elements.importModal, 
            this.elements.wordModal, 
            this.elements.categoryModal, 
            this.elements.exportModal
        ];
        
        modals.forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.hideModal(modal);
                    }
                });
            }
        });

        console.log('模态框事件监听器设置完成');
    }

    /**
     * 处理页面导航
     * @param {string} page - 目标页面
     */
    handleNavigation(page) {
        console.log(`导航到页面: ${page}`);
        
        // 触发自定义事件，通知应用程序
        const event = new CustomEvent('navChange', { 
            detail: { page: page } 
        });
        document.dispatchEvent(event);
    }

    /**
     * 显示指定页面，隐藏其他页面
     * @param {string} pageName - 要显示的页面名称
     */
    showPage(pageName) {
        // 验证页面名称
        if (!this.elements.pages[pageName]) {
            console.error(`未知的页面: ${pageName}`);
            return;
        }

        // 隐藏所有页面
        Object.values(this.elements.pages).forEach(page => {
            if (page) {
                page.style.display = 'none';
            }
        });

        // 显示目标页面
        this.elements.pages[pageName].style.display = 'block';

        // 更新导航激活状态
        this.updateNavActiveState(pageName);
        
        this.currentPage = pageName;
        
        // 页面特定初始化
        switch(pageName) {
            case 'vocabulary':
                this.refreshVocabularyList();
                break;
            case 'quiz-settings':
                this.updateCategorySelectors();
                break;
            case 'quiz':
                // 确保输入框获得焦点
                setTimeout(() => {
                    if (this.elements.answerInput) {
                        this.elements.answerInput.focus();
                    }
                }, 100);
                break;
        }

        console.log(`显示页面: ${pageName}`);
    }

    /**
     * 更新导航激活状态
     * @param {string} activePage - 当前活动页面
     */
    updateNavActiveState(activePage) {
        this.elements.navLinks.forEach(link => {
            if (link.dataset.page === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * 更新分类选择器（用于设置和模态框）
     */
    updateCategorySelectors() {
        const categories = window.wordManager.getCategories();
        const selectors = [
            this.elements.wordSource,
            this.elements.importCategory,
            this.elements.wordCategory,
            this.elements.exportCategory
        ];
        
        selectors.forEach(select => {
            if (!select) return;
            
            const currentValue = select.value;
            select.innerHTML = '';
            
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                // 为错题词源添加特殊标记
                if (category === 'wrongWords') {
                    option.textContent += ' (错题)';
                }
                select.appendChild(option);
            });
            
            // 尝试恢复之前的选择，否则选择第一个
            if (categories.includes(currentValue)) {
                select.value = currentValue;
            } else if (categories.length > 0) {
                select.value = categories[0];
            }
        });
        
        // 更新分类标签
        this.updateCategoryTabs();
        
        console.log('分类选择器更新完成');
    }

    /**
     * 更新分类标签
     */
    updateCategoryTabs() {
        const categories = window.wordManager.getCategories();
        this.elements.categoryTabs.innerHTML = '';
        
        categories.forEach(category => {
            const tab = document.createElement('div');
            tab.className = 'category-tab';
            if (category === this.currentCategory) {
                tab.classList.add('active');
            }
            tab.textContent = category;
            if (category === 'wrongWords') {
                tab.textContent += ' (错题)';
            }
            tab.dataset.category = category;
            tab.addEventListener('click', () => {
                this.handleCategoryTabClick(category);
            });
            this.elements.categoryTabs.appendChild(tab);
        });
    }

    /**
     * 处理分类标签点击
     * @param {string} category - 分类名称
     */
    handleCategoryTabClick(category) {
        this.currentCategory = category;
        this.updateCategoryTabs();
        this.refreshVocabularyList();
        console.log(`切换到分类: ${category}`);
    }

    /**
     * 处理开始测试
     */
    handleStartQuiz() {
        const settings = {
            mode: this.elements.quizMode.value,
            category: this.elements.wordSource.value
        };
        
        console.log('开始测试设置:', settings);
        
        const event = new CustomEvent('startQuiz', { 
            detail: { settings: settings } 
        });
        document.dispatchEvent(event);
    }

    /**
     * 显示第一个问题
     */
    showFirstQuestion() {
        // 重置测试界面状态
        this.resetQuizUI();
        
        // 获取第一个问题并显示
        const question = window.quizManager.getCurrentQuestion();
        this.showQuestion(question);
        this.updateStats();
        
        console.log('显示第一个问题');
    }

    /**
     * 显示问题内容
     * @param {object} question - 问题对象
     */
    showQuestion(question) {
        if (!question) {
            console.error('无法显示问题：问题对象为空');
            return;
        }

        // 根据问题类型设置标题和内容
        switch(question.type) {
            case 'translation':
                if (window.quizManager.quizMode === 'en-to-zh') {
                    this.elements.questionTitle.textContent = '英文单词';
                    this.elements.answerInput.placeholder = '请输入中文释义...';
                } else {
                    this.elements.questionTitle.textContent = '中文释义';
                    this.elements.answerInput.placeholder = '请输入英文单词...';
                }
                break;
            case 'definition':
                this.elements.questionTitle.textContent = '英文释义';
                this.elements.answerInput.placeholder = '请输入对应的英文单词...';
                break;
        }

        this.elements.questionContent.textContent = question.question;
        this.elements.answerInput.value = '';
        
        // 确保输入框获得焦点
        setTimeout(() => {
            this.elements.answerInput.focus();
        }, 100);
    }

    /**
     * 处理检查答案
     */
    handleCheckAnswer() {
        const userAnswer = this.elements.answerInput.value.trim();
        if (!userAnswer) {
            Utils.showNotification('请输入答案', 'warning');
            return;
        }

        console.log('检查答案:', userAnswer);
        
        const event = new CustomEvent('checkAnswer', { 
            detail: { answer: userAnswer } 
        });
        document.dispatchEvent(event);
    }

    /**
     * 显示答案反馈
     * @param {object} result - 检查结果
     */
    showAnswerFeedback(result) {
        console.log('showAnswerFeedback called with:', result);
        
        if (!result || result.alreadyChecked) {
            console.log('No feedback to show or already checked');
            return;
        }

        if (!result.success) {
            Utils.showNotification(result.error || '检查答案失败', 'error');
            return;
        }

        // 显示反馈信息
        this.elements.feedback.textContent = result.isCorrect ? 
            `正确！${result.explanation}` : 
            `错误！正确答案：${result.correctAnswer}\n${result.explanation}`;
        
        this.elements.feedback.className = `feedback ${result.isCorrect ? 'correct' : 'incorrect'}`;
        this.elements.feedback.style.display = 'block';

        // 更新按钮状态
        this.updateAnswerButtonsState(true);
        
        console.log('Feedback displayed, buttons updated');

        // 确保输入框失去焦点，避免重复Enter键问题
        if (this.elements.answerInput) {
            this.elements.answerInput.blur();
        }
    }

    /**
     * 显示手动标记反馈
     * @param {boolean} isCorrect - 是否标记为正确
     * @param {object} result - 标记结果（可选）
     */
    showManualMarkFeedback(isCorrect, result = null) {
        console.log('showManualMarkFeedback called with:', { isCorrect, result });
        
        let feedbackText = isCorrect ? '已标记为正确' : '已标记为错误';
        
        // 如果有详细结果，显示更具体的信息
        if (result && result.word) {
            feedbackText += ` - ${result.word.word}: ${result.word.chinese}`;
        }
        
        this.elements.feedback.textContent = feedbackText;
        this.elements.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        this.elements.feedback.style.display = 'block';
        
        // 更新按钮状态，保持为答案已检查状态
        this.updateAnswerButtonsState(true);
        
        // 更新统计信息
        this.updateStats();
        
        console.log('Manual mark feedback displayed');
    }

    /**
     * 处理标记答案
     * @param {boolean} isCorrect - 是否标记为正确
     */
    handleMarkAnswer(isCorrect) {
        console.log(`手动标记答案: ${isCorrect ? '正确' : '错误'}`);
        
        const event = new CustomEvent('markAnswer', { 
            detail: { isCorrect: isCorrect } 
        });
        document.dispatchEvent(event);
    }

    /**
     * 处理下一题
     */
    handleNextQuestion() {
        console.log('切换到下一题');
        
        const event = new CustomEvent('nextQuestion');
        document.dispatchEvent(event);
    }

    /**
     * 显示下一题
     */
    showNextQuestion() {
        this.resetQuizUI();
        const question = window.quizManager.getCurrentQuestion();
        this.showQuestion(question);
        this.updateStats();
        
        console.log('显示下一题');
    }

    /**
     * 重置测试界面状态
     */
    resetQuizUI() {
        if (this.elements.feedback) {
            this.elements.feedback.style.display = 'none';
        }
        if (this.elements.answerInput) {
            this.elements.answerInput.disabled = false;
        }
        if (this.elements.shortcutHint) {
            this.elements.shortcutHint.style.display = 'none';
        }
        this.updateAnswerButtonsState(false);
        
        console.log('测试界面状态已重置');
    }

    /**
     * 更新答案按钮状态
     * @param {boolean} answerChecked - 答案是否已检查
     */
    updateAnswerButtonsState(answerChecked) {
        if (!this.elements.checkBtn || !this.elements.markCorrectBtn || 
            !this.elements.markIncorrectBtn || !this.elements.nextBtn) {
            return;
        }

        if (answerChecked) {
            this.elements.checkBtn.style.display = 'none';
            this.elements.markCorrectBtn.style.display = 'block';
            this.elements.markIncorrectBtn.style.display = 'block';
            this.elements.nextBtn.style.display = 'block';
            if (this.elements.answerInput) {
                this.elements.answerInput.disabled = true;
            }
        } else {
            this.elements.checkBtn.style.display = 'block';
            this.elements.markCorrectBtn.style.display = 'none';
            this.elements.markIncorrectBtn.style.display = 'none';
            this.elements.nextBtn.style.display = 'none';
            if (this.elements.answerInput) {
                this.elements.answerInput.disabled = false;
            }
        }
    }

    /**
     * 更新统计信息显示
     * @param {object} stats - 统计信息
     */
    updateStats(stats = null) {
        if (!stats) {
            stats = window.quizManager.getStats();
        }
        
        if (this.elements.currentWord) {
            this.elements.currentWord.textContent = stats.current;
        }
        if (this.elements.totalWords) {
            this.elements.totalWords.textContent = stats.total;
        }
        if (this.elements.correctCount) {
            this.elements.correctCount.textContent = stats.correct;
        }
        if (this.elements.incorrectCount) {
            this.elements.incorrectCount.textContent = stats.incorrect;
        }
    }

    /**
     * 显示测试结果
     * @param {object} results - 测试结果
     */
    showResults(results) {
        if (!results) {
            console.error('无法显示结果：结果数据为空');
            return;
        }

        if (this.elements.finalCorrect) {
            this.elements.finalCorrect.textContent = results.correctCount;
        }
        if (this.elements.finalIncorrect) {
            this.elements.finalIncorrect.textContent = results.incorrectCount;
        }

        // 显示正确单词列表
        this.renderWordList(this.elements.correctWordsList, results.correctWords, 'correct');
        
        // 显示错误单词列表
        this.renderWordList(this.elements.incorrectWordsList, results.incorrectWords, 'incorrect');
        
        console.log('测试结果显示完成');
    }

    /**
     * 渲染单词列表
     * @param {HTMLElement} container - 容器元素
     * @param {object[]} words - 单词数组
     * @param {string} type - 列表类型
     */
    renderWordList(container, words, type) {
        if (!container) return;
        
        container.innerHTML = '';
        
        if (words.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'word-item';
            emptyMsg.textContent = type === 'correct' ? '没有正确单词' : '没有错误单词';
            container.appendChild(emptyMsg);
            return;
        }
        
        words.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = `word-item ${type}-word`;
            wordElement.innerHTML = `
                <div class="word-text">${Utils.escapeHTML(word.word)} 
                    <span class="part-of-speech">${Utils.escapeHTML(word.partOfSpeech)}</span>
                </div>
                <div class="word-definition">${Utils.escapeHTML(word.chinese)}</div>
                <div class="word-english-def">${Utils.escapeHTML(word.english)}</div>
            `;
            container.appendChild(wordElement);
        });
    }

    /**
     * 处理重新开始测试
     * @param {boolean} wrongOnly - 是否只测试错题
     */
    handleRestartQuiz(wrongOnly) {
        console.log(`重新开始测试: ${wrongOnly ? '只测错题' : '全部重测'}`);
        
        // 重置UI状态
        this.resetQuizUI();
        
        const event = new CustomEvent('restartQuiz', { 
            detail: { wrongOnly: wrongOnly } 
        });
        document.dispatchEvent(event);
    }

    /**
     * 重置测试界面状态
     */
    resetQuizUI() {
        console.log('重置测试界面状态');
        
        // 清空输入框并启用
        if (this.elements.answerInput) {
            this.elements.answerInput.value = '';
            this.elements.answerInput.disabled = false;
            this.elements.answerInput.focus(); // 确保输入框获得焦点
        }
        
        // 隐藏反馈信息
        if (this.elements.feedback) {
            this.elements.feedback.style.display = 'none';
            this.elements.feedback.textContent = '';
            this.elements.feedback.className = 'feedback';
        }
        
        // 重置按钮状态
        this.updateAnswerButtonsState(false);
        
        // 隐藏快捷键提示
        if (this.elements.shortcutHint) {
            this.elements.shortcutHint.style.display = 'none';
        }
        
        // 清空问题内容
        if (this.elements.questionContent) {
            this.elements.questionContent.textContent = '';
        }
        
        console.log('测试界面状态重置完成');
    }

    /**
     * 更新答案按钮状态
     * @param {boolean} answerChecked - 答案是否已检查
     */
    updateAnswerButtonsState(answerChecked) {
        if (!this.elements.checkBtn || !this.elements.markCorrectBtn || 
            !this.elements.markIncorrectBtn || !this.elements.nextBtn) {
            console.warn('按钮元素未找到，无法更新状态');
            return;
        }

        console.log(`更新按钮状态: 答案已检查 = ${answerChecked}`);

        if (answerChecked) {
            // 答案已检查状态：显示标记按钮和下一题按钮
            this.elements.checkBtn.style.display = 'none';
            this.elements.markCorrectBtn.style.display = 'block';
            this.elements.markIncorrectBtn.style.display = 'block';
            this.elements.nextBtn.style.display = 'block';
            if (this.elements.answerInput) {
                this.elements.answerInput.disabled = true;
            }
            
            // 更新快捷键提示
            if (this.elements.shortcutHint) {
                this.elements.shortcutHint.style.display = 'block';
                this.elements.shortcutHint.innerHTML = `
                    <p>提示：按 <kbd>Enter</kbd> 切换到下一个单词 | 按 <kbd>9</kbd> 标记为正确 | 按 <kbd>0</kbd> 标记为错误</p>
                `;
            }
        } else {
            // 答案未检查状态：只显示检查答案按钮
            this.elements.checkBtn.style.display = 'block';
            this.elements.markCorrectBtn.style.display = 'none';
            this.elements.markIncorrectBtn.style.display = 'none';
            this.elements.nextBtn.style.display = 'none';
            if (this.elements.answerInput) {
                this.elements.answerInput.disabled = false;
            }
            
            // 隐藏或更新快捷键提示
            if (this.elements.shortcutHint) {
                this.elements.shortcutHint.style.display = 'block';
                this.elements.shortcutHint.innerHTML = `
                    <p>提示：输入答案后按 <kbd>Enter</kbd> 检查答案</p>
                `;
            }
        }
    }

    /**
     * 处理添加到错题词源
     */
    handleAddToWrongSource() {
        console.log('添加错题到词源');
        
        const event = new CustomEvent('addToWrongSource');
        document.dispatchEvent(event);
    }

    /**
     * 刷新词源列表
     */
    refreshVocabularyList() {
        const words = window.wordManager.getWordsByCategory(this.currentCategory);
        this.renderVocabularyTable(words);
        console.log(`刷新词源列表: ${this.currentCategory}, 单词数: ${words.length}`);
    }

    /**
     * 渲染词源表格
     * @param {object[]} words - 单词数组
     */
    renderVocabularyTable(words) {
        if (!this.elements.vocabularyTableBody) return;
        
        this.elements.vocabularyTableBody.innerHTML = '';
        
        if (words.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5" style="text-align: center; padding: 20px; color: #666;">该分类暂无单词</td>`;
            this.elements.vocabularyTableBody.appendChild(row);
            return;
        }
        
        words.forEach((word, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${Utils.escapeHTML(word.word)}</td>
                <td>${Utils.escapeHTML(word.partOfSpeech)}</td>
                <td>${Utils.escapeHTML(word.chinese)}</td>
                <td>${Utils.escapeHTML(word.english)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-word="${Utils.escapeHTML(word.word)}" data-index="${index}">编辑</button>
                        <button class="action-btn delete-btn" data-word="${Utils.escapeHTML(word.word)}">删除</button>
                    </div>
                </td>
            `;
            this.elements.vocabularyTableBody.appendChild(row);
        });
        
        // 添加编辑和删除事件
        this.addVocabularyTableEventListeners();
    }

    /**
     * 为词源表格添加事件监听器
     */
    addVocabularyTableEventListeners() {
        const editButtons = this.elements.vocabularyTableBody.querySelectorAll('.edit-btn');
        const deleteButtons = this.elements.vocabularyTableBody.querySelectorAll('.delete-btn');
        
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const word = btn.dataset.word;
                this.showEditWordModal(word);
            });
        });
        
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const word = btn.dataset.word;
                this.handleDeleteWord(word);
            });
        });
    }

    /**
     * 处理词源搜索
     * @param {string} query - 搜索关键词
     */
    handleSearchVocabulary(query) {
        const results = window.wordManager.searchWords(query, this.currentCategory);
        this.renderVocabularyTable(results);
        console.log(`搜索词源: "${query}", 结果: ${results.length} 个`);
    }

    /**
     * 显示导入模态框
     */
    showImportModal() {
        if (this.elements.importModal) {
            this.elements.importData.value = '';
            this.elements.importModal.style.display = 'flex';
            console.log('显示导入模态框');
        }
    }

    /**
     * 隐藏导入模态框
     */
    hideImportModal() {
        if (this.elements.importModal) {
            this.elements.importModal.style.display = 'none';
            console.log('隐藏导入模态框');
        }
    }

    /**
     * 处理确认导入
     */
    handleConfirmImport() {
        const data = this.elements.importData.value.trim();
        const format = this.elements.importFormat.value;
        const category = this.elements.importCategory.value;
        
        if (!data) {
            Utils.showNotification('请输入要导入的数据', 'warning');
            return;
        }
        
        console.log(`确认导入: 格式=${format}, 分类=${category}`);
        
        const result = window.wordManager.importWords(data, format, category);
        
        if (result.success) {
            Utils.showNotification(`成功导入 ${result.imported} 个单词，跳过 ${result.skipped} 个`, 'success');
            this.hideImportModal();
            this.refreshVocabularyList();
            this.updateCategorySelectors();
        } else {
            Utils.showNotification(`导入失败: ${result.error}`, 'error');
        }
    }

    /**
     * 显示添加单词模态框
     */
    showAddWordModal() {
        this.editMode.isEditing = false;
        this.editMode.editingWord = null;
        
        if (this.elements.wordModal) {
            this.elements.wordModalTitle.textContent = '添加单词';
            this.elements.wordInput.value = '';
            this.elements.partOfSpeechInput.value = 'n.';
            this.elements.chineseInput.value = '';
            this.elements.englishInput.value = '';
            this.elements.wordModal.style.display = 'flex';
            console.log('显示添加单词模态框');
        }
    }

    /**
     * 显示编辑单词模态框
     * @param {string} word - 要编辑的单词
     */
    showEditWordModal(word) {
        const wordData = window.wordManager.getWordsByCategory(this.currentCategory)
            .find(w => w.word === word);
        
        if (!wordData) {
            Utils.showNotification('找不到要编辑的单词', 'error');
            return;
        }
        
        this.editMode.isEditing = true;
        this.editMode.editingWord = word;
        
        if (this.elements.wordModal) {
            this.elements.wordModalTitle.textContent = '编辑单词';
            this.elements.wordInput.value = wordData.word;
            this.elements.partOfSpeechInput.value = wordData.partOfSpeech;
            this.elements.chineseInput.value = wordData.chinese;
            this.elements.englishInput.value = wordData.english;
            this.elements.wordModal.style.display = 'flex';
            console.log(`显示编辑单词模态框: ${word}`);
        }
    }

    /**
     * 隐藏单词模态框
     */
    hideWordModal() {
        if (this.elements.wordModal) {
            this.elements.wordModal.style.display = 'none';
            this.editMode.isEditing = false;
            this.editMode.editingWord = null;
            console.log('隐藏单词模态框');
        }
    }

    /**
     * 处理确认单词（添加或编辑）
     */
    handleConfirmWord() {
        const wordData = {
            word: this.elements.wordInput.value.trim(),
            partOfSpeech: this.elements.partOfSpeechInput.value,
            chinese: this.elements.chineseInput.value.trim(),
            english: this.elements.englishInput.value.trim()
        };
        
        // 验证输入
        if (!wordData.word || !wordData.chinese || !wordData.english) {
            Utils.showNotification('请填写所有字段', 'warning');
            return;
        }
        
        const category = this.elements.wordCategory.value;
        let result;
        
        if (this.editMode.isEditing) {
            // 编辑模式
            console.log(`编辑单词: ${this.editMode.editingWord} -> ${wordData.word}`);
            result = window.wordManager.updateWordInCategory(
                this.currentCategory, 
                this.editMode.editingWord, 
                wordData
            );
        } else {
            // 添加模式
            console.log(`添加单词: ${wordData.word}`);
            result = window.wordManager.addWordToCategory(category, wordData);
        }
        
        if (result.success) {
            Utils.showNotification('单词保存成功', 'success');
            this.hideWordModal();
            this.refreshVocabularyList();
            this.updateCategorySelectors();
        } else {
            Utils.showNotification(`保存失败: ${result.error}`, 'error');
        }
    }

    /**
     * 显示创建分类模态框
     */
    showCreateCategoryModal() {
        if (this.elements.categoryModal) {
            this.elements.newCategoryName.value = '';
            this.elements.categoryModal.style.display = 'flex';
            console.log('显示创建分类模态框');
        }
    }

    /**
     * 隐藏创建分类模态框
     */
    hideCategoryModal() {
        if (this.elements.categoryModal) {
            this.elements.categoryModal.style.display = 'none';
            console.log('隐藏创建分类模态框');
        }
    }

    /**
     * 处理确认创建分类
     */
    handleConfirmCategory() {
        const categoryName = this.elements.newCategoryName.value.trim();
        
        if (!categoryName) {
            Utils.showNotification('请输入分类名称', 'warning');
            return;
        }
        
        console.log(`创建分类: ${categoryName}`);
        
        const result = window.wordManager.createCategory(categoryName);
        
        if (result.success) {
            Utils.showNotification('分类创建成功', 'success');
            this.hideCategoryModal();
            this.updateCategorySelectors();
        } else {
            Utils.showNotification(`创建失败: ${result.error}`, 'error');
        }
    }

    /**
     * 显示导出模态框
     */
    showExportModal() {
        const category = this.elements.exportCategory.value;
        const format = this.elements.exportFormat.value;
        
        console.log(`显示导出模态框: 分类=${category}, 格式=${format}`);
        
        const result = window.wordManager.exportWords(category, format);
        
        if (result.success) {
            this.elements.exportData.value = result.data;
            this.elements.exportModal.style.display = 'flex';
        } else {
            Utils.showNotification(`导出失败: ${result.error}`, 'error');
        }
    }

    /**
     * 隐藏导出模态框
     */
    hideExportModal() {
        if (this.elements.exportModal) {
            this.elements.exportModal.style.display = 'none';
            console.log('隐藏导出模态框');
        }
    }

    /**
     * 处理复制导出数据
     */
    async handleCopyExport() {
        const success = await Utils.copyToClipboard(this.elements.exportData.value);
        if (success) {
            Utils.showNotification('已复制到剪贴板', 'success');
            console.log('导出数据已复制到剪贴板');
        } else {
            Utils.showNotification('复制失败', 'error');
        }
    }

    /**
     * 处理删除单词
     * @param {string} word - 要删除的单词
     */
    handleDeleteWord(word) {
        if (confirm(`确定要删除单词 "${word}" 吗？`)) {
            console.log(`删除单词: ${word}`);
            
            const success = window.wordManager.removeWordFromCategory(this.currentCategory, word);
            if (success) {
                Utils.showNotification('单词删除成功', 'success');
                this.refreshVocabularyList();
                this.updateCategorySelectors();
            } else {
                Utils.showNotification('删除失败', 'error');
            }
        }
    }

    /**
     * 隐藏模态框
     * @param {HTMLElement} modal - 模态框元素
     */
    hideModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * 处理键盘事件
     * @param {KeyboardEvent} event - 键盘事件
     */
    handleKeyboard(event) {
        // 只在测试页面处理快捷键
        if (this.currentPage !== 'quiz') return;

        const isAnswerChecked = window.quizManager.isAnswerChecked;

        switch(event.key) {
            case 'Enter':
                event.preventDefault();
                if (isAnswerChecked) {
                    this.handleNextQuestion();
                } else {
                    this.handleCheckAnswer();
                }
                break;
            case '9':
                if (isAnswerChecked) {
                    event.preventDefault();
                    this.handleMarkAnswer(true);
                }
                break;
            case '0':
                if (isAnswerChecked) {
                    event.preventDefault();
                    this.handleMarkAnswer(false);
                }
                break;
        }
    }

    /**
     * 处理答案输入框回车事件
     */
    handleAnswerInputEnter() {
        if (this.currentPage === 'quiz') {
            const isAnswerChecked = window.quizManager.isAnswerChecked;
            if (!isAnswerChecked) {
                this.handleCheckAnswer();
            }
        }
    }

    /**
     * 获取用户输入的答案
     * @returns {string} 用户答案
     */
    getUserAnswer() {
        return this.elements.answerInput ? this.elements.answerInput.value.trim() : '';
    }

    /**
     * 显示通知消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型
     */
    showNotification(message, type = 'info') {
        Utils.showNotification(message, type);
    }

    /**
     * 显示加载状态
     * @param {boolean} show - 是否显示加载状态
     * @param {string} message - 加载消息
     */
    showLoading(show, message = '加载中...') {
        // 可以实现加载指示器
        if (show) {
            // 显示加载指示器
            console.log(`显示加载状态: ${message}`);
        } else {
            // 隐藏加载指示器
            console.log('隐藏加载状态');
        }
    }

    /**
     * 显示错误信息
     * @param {string} message - 错误信息
     * @param {Error} error - 错误对象
     */
    showError(message, error = null) {
        console.error(message, error);
        Utils.showNotification(message, 'error');
    }

    /**
     * 更新页面标题
     * @param {string} title - 新标题
     */
    updatePageTitle(title) {
        if (title) {
            document.title = title + ' - 英语单词背诵程序';
        }
    }
}
