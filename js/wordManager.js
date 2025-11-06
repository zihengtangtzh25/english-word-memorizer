/**
 * 单词数据管理模块
 * 负责单词的存储、分类、导入导出操作
 */

class WordManager {
    constructor() {
        // 单词库数据结构 - 存储所有分类的单词
        this.wordLibrary = {
            'default': [],      // 默认词源
            'wrongWords': [],   // 错题词源
            'custom': []        // 自定义词源
        };
        
        // 当前选中的分类
        this.currentCategory = 'default';
    }

    /**
     * 初始化单词管理器 - 加载本地存储数据或初始化默认数据
     */
    init() {
        console.log('开始初始化单词管理器...');
        
        // 先尝试从本地存储加载
        this.loadFromLocalStorage();
        
        // 检查是否需要初始化默认数据
        const needsInitialization = !this.wordLibrary.default || 
                                  this.wordLibrary.default.length === 0 ||
                                  this.isOnlySystemCategories();
        
        if (needsInitialization) {
            console.log('需要初始化默认词源数据');
            this.loadDefaultWordsFromJS();
        } else {
            console.log('使用本地存储的单词数据');
        }
        
        console.log('单词管理器初始化完成');
    }

    /**
     * 检查是否只有系统默认分类（没有用户数据）
     * @returns {boolean} 是否只有系统分类
     */
    isOnlySystemCategories() {
        const systemCategories = ['default', 'wrongWords', 'custom'];
        const currentCategories = Object.keys(this.wordLibrary);
        
        // 如果只有系统分类，或者系统分类之外的其他分类都为空
        return currentCategories.every(cat => 
            systemCategories.includes(cat) || 
            (this.wordLibrary[cat] && this.wordLibrary[cat].length === 0)
        );
    }

    /**
     * 从JS文件加载默认词源
     */
    loadDefaultWordsFromJS() {
        try {
            console.log('开始从JS文件加载词源数据...');
            
            // 检查全局变量是否存在
            if (typeof window.INIT_WORDS_DATA === 'undefined') {
                throw new Error('INIT_WORDS_DATA 未定义，请确保 initWordsData.js 已正确加载');
            }
            
            const initData = window.INIT_WORDS_DATA;
            console.log('成功加载初始化数据，分类:', Object.keys(initData));
            
            // 验证数据结构
            if (!initData || typeof initData !== 'object') {
                throw new Error('初始化数据格式不正确: 应为对象');
            }
            
            // 清空现有系统分类，用初始化数据填充
            // 但保留 wrongWords 和 custom 分类的用户数据
            const userWrongWords = this.wordLibrary.wrongWords || [];
            const userCustomWords = this.wordLibrary.custom || [];
            
            this.wordLibrary = {
                'wrongWords': userWrongWords,
                'custom': userCustomWords
            };
            
            // 合并初始化数据中的分类
            Object.keys(initData).forEach(category => {
                if (Array.isArray(initData[category])) {
                    this.wordLibrary[category] = initData[category];
                    console.log(`加载分类 "${category}": ${initData[category].length} 个单词`);
                } else {
                    console.warn(`分类 "${category}" 的数据不是数组格式，已跳过`);
                }
            });
            
            // 确保系统必需分类存在
            if (!this.wordLibrary.default) {
                this.wordLibrary.default = [];
                console.warn('初始化数据中缺少default分类');
            }
            
            this.saveToLocalStorage();
            console.log('从JS文件初始化词源完成');
            
        } catch (error) {
            console.error('从JS文件加载词源失败:', error);
            
            // 使用最小备用词源
            if (!this.wordLibrary.default || this.wordLibrary.default.length === 0) {
                this.wordLibrary.default = [{
                    word: "example",
                    partOfSpeech: "n.",
                    chinese: "例子",
                    english: "a typical example or instance"
                }];
                this.saveToLocalStorage();
                console.log('使用备用默认词源');
            }
            
            Utils.showNotification('加载默认词源失败，使用备用数据', 'warning');
        }
    }

    /**
     * 从本地存储加载数据 - 恢复用户之前保存的数据
     */
    loadFromLocalStorage() {
        try {
            const saved = Utils.getLocalStorage('wordLibrary');
            if (saved && typeof saved === 'object') {
                this.wordLibrary = saved;
                console.log('从本地存储加载单词数据成功');
            } else {
                console.log('未找到有效的本地存储数据，将使用初始化数据');
            }
        } catch (error) {
            console.error('加载本地存储数据失败:', error);
        }
    }

    /**
     * 保存数据到本地存储 - 持久化用户数据
     */
    saveToLocalStorage() {
        try {
            const success = Utils.setLocalStorage('wordLibrary', this.wordLibrary);
            if (success) {
                console.log('单词数据保存到本地存储成功');
            } else {
                console.error('单词数据保存到本地存储失败');
            }
            return success;
        } catch (error) {
            console.error('保存到本地存储时发生错误:', error);
            return false;
        }
    }
    /**
     * 获取所有分类 - 返回所有可用的词源分类
     * @returns {string[]} 分类名称数组
     */
    getCategories() {
        return Object.keys(this.wordLibrary).filter(category => 
            category !== 'wrongWords' || this.wordLibrary[category].length > 0
        );
    }

    /**
     * 获取指定分类的单词 - 根据分类名获取单词列表
     * @param {string} category - 分类名称
     * @returns {object[]} 单词数组
     */
    getWordsByCategory(category) {
        if (!this.wordLibrary[category]) {
            console.warn(`分类 "${category}" 不存在`);
            return [];
        }
        return this.wordLibrary[category];
    }

    /**
     * 获取所有单词 - 返回所有分类的所有单词
     * @returns {object[]} 所有单词数组
     */
    getAllWords() {
        const allWords = [];
        Object.values(this.wordLibrary).forEach(words => {
            allWords.push(...words);
        });
        return allWords;
    }

    /**
     * 添加单词到指定分类 - 支持单个单词添加
     * @param {string} category - 分类名称
     * @param {object} wordData - 单词数据
     * @returns {object} 操作结果
     */
    addWordToCategory(category, wordData) {
        // 验证分类是否存在
        if (!this.wordLibrary[category]) {
            // 如果分类不存在，自动创建
            this.wordLibrary[category] = [];
        }
        
        // 验证单词数据格式
        if (!Utils.validateWordData(wordData)) {
            return { 
                success: false, 
                error: '单词数据格式不正确，必须包含word、partOfSpeech、chinese、english字段' 
            };
        }
        
        // 检查是否已存在（不区分大小写）
        const exists = this.wordLibrary[category].some(
            word => word.word.toLowerCase() === wordData.word.toLowerCase()
        );
        
        if (exists) {
            return { 
                success: false, 
                error: `单词 "${wordData.word}" 已存在于分类 "${category}" 中` 
            };
        }
        
        // 添加单词
        this.wordLibrary[category].push(wordData);
        const saveSuccess = this.saveToLocalStorage();
        
        if (saveSuccess) {
            console.log(`成功添加单词 "${wordData.word}" 到分类 "${category}"`);
            return { success: true, word: wordData };
        } else {
            return { success: false, error: '保存到本地存储失败' };
        }
    }

    /**
     * 批量添加单词到分类 - 支持多个单词同时添加
     * @param {string} category - 分类名称
     * @param {object[]} words - 单词数组
     * @returns {object} 批量操作结果
     */
    addWordsToCategory(category, words) {
        if (!Array.isArray(words)) {
            return { success: false, error: 'words参数必须是数组' };
        }
        
        // 验证分类是否存在
        if (!this.wordLibrary[category]) {
            this.wordLibrary[category] = [];
        }
        
        const results = {
            success: true,
            added: 0,
            skipped: 0,
            errors: []
        };
        
        words.forEach((word, index) => {
            const result = this.addWordToCategory(category, word);
            if (result.success) {
                results.added++;
            } else {
                results.skipped++;
                results.errors.push({
                    index: index,
                    word: word,
                    error: result.error
                });
            }
        });
        
        // 如果有任何单词添加成功，保存到本地存储
        if (results.added > 0) {
            this.saveToLocalStorage();
        }
        
        console.log(`批量添加完成: 成功 ${results.added} 个，跳过 ${results.skipped} 个`);
        return results;
    }

    /**
     * 从分类中移除单词 - 根据单词名移除指定单词
     * @param {string} category - 分类名称
     * @param {string} wordToRemove - 要移除的单词
     * @returns {boolean} 是否移除成功
     */
    removeWordFromCategory(category, wordToRemove) {
        if (!this.wordLibrary[category]) {
            console.warn(`分类 "${category}" 不存在`);
            return false;
        }
        
        const initialLength = this.wordLibrary[category].length;
        this.wordLibrary[category] = this.wordLibrary[category].filter(
            word => word.word.toLowerCase() !== wordToRemove.toLowerCase()
        );
        
        const removed = initialLength !== this.wordLibrary[category].length;
        if (removed) {
            this.saveToLocalStorage();
            console.log(`从分类 "${category}" 中移除单词 "${wordToRemove}"`);
        }
        
        return removed;
    }

    /**
     * 更新单词信息 - 修改指定单词的属性
     * @param {string} category - 分类名称
     * @param {string} oldWord - 原单词
     * @param {object} newWordData - 新单词数据
     * @returns {object} 更新结果
     */
    updateWordInCategory(category, oldWord, newWordData) {
        if (!this.wordLibrary[category]) {
            return { success: false, error: `分类 "${category}" 不存在` };
        }
        
        if (!Utils.validateWordData(newWordData)) {
            return { success: false, error: '新单词数据格式不正确' };
        }
        
        const wordIndex = this.wordLibrary[category].findIndex(
            word => word.word.toLowerCase() === oldWord.toLowerCase()
        );
        
        if (wordIndex === -1) {
            return { success: false, error: `单词 "${oldWord}" 在分类 "${category}" 中不存在` };
        }
        
        // 检查新单词名是否与其他单词冲突（除非是同一个单词）
        const conflict = this.wordLibrary[category].some(
            (word, index) => index !== wordIndex && 
            word.word.toLowerCase() === newWordData.word.toLowerCase()
        );
        
        if (conflict) {
            return { success: false, error: `单词 "${newWordData.word}" 已存在于分类 "${category}" 中` };
        }
        
        // 更新单词
        this.wordLibrary[category][wordIndex] = newWordData;
        this.saveToLocalStorage();
        
        console.log(`成功更新分类 "${category}" 中的单词 "${oldWord}" 为 "${newWordData.word}"`);
        return { success: true, word: newWordData };
    }

    /**
     * 创建新分类 - 添加新的词源分类
     * @param {string} categoryName - 新分类名称
     * @returns {object} 创建结果
     */
    createCategory(categoryName) {
        if (!categoryName || categoryName.trim() === '') {
            return { success: false, error: '分类名称不能为空' };
        }
        
        const trimmedName = categoryName.trim();
        
        // 检查分类是否已存在
        if (this.wordLibrary[trimmedName]) {
            return { success: false, error: `分类 "${trimmedName}" 已存在` };
        }
        
        // 创建新分类
        this.wordLibrary[trimmedName] = [];
        this.saveToLocalStorage();
        
        console.log(`成功创建新分类: "${trimmedName}"`);
        return { success: true, category: trimmedName };
    }

    /**
     * 删除分类 - 移除指定的词源分类
     * @param {string} categoryName - 要删除的分类名称
     * @returns {object} 删除结果
     */
    deleteCategory(categoryName) {
        // 防止删除系统必需分类
        if (categoryName === 'default' || categoryName === 'wrongWords') {
            return { success: false, error: `不能删除系统分类 "${categoryName}"` };
        }
        
        if (!this.wordLibrary[categoryName]) {
            return { success: false, error: `分类 "${categoryName}" 不存在` };
        }
        
        // 确认删除（在实际UI中应该有确认对话框）
        const wordCount = this.wordLibrary[categoryName].length;
        delete this.wordLibrary[categoryName];
        this.saveToLocalStorage();
        
        console.log(`成功删除分类 "${categoryName}"，包含 ${wordCount} 个单词`);
        return { 
            success: true, 
            category: categoryName, 
            deletedWords: wordCount 
        };
    }

    /**
     * 导入单词数据 - 从外部数据源批量导入单词
     * @param {string} data - 导入的数据字符串
     * @param {string} format - 数据格式 (json/csv)
     * @param {string} category - 目标分类
     * @returns {object} 导入结果
     */
    importWords(data, format, category) {
        try {
            let words = [];
            
            switch(format) {
                case 'json':
                    words = JSON.parse(data);
                    if (!Array.isArray(words)) {
                        throw new Error('JSON数据必须是数组格式');
                    }
                    break;
                    
                case 'csv':
                    words = Utils.parseCSV(data);
                    break;
                    
                default:
                    throw new Error(`不支持的格式: ${format}`);
            }
            
            // 验证数据
            const validation = Utils.validateWordsData(words);
            if (!validation.valid && validation.validCount === 0) {
                throw new Error('没有有效的单词数据');
            }
            
            // 添加有效单词到分类
            const result = this.addWordsToCategory(category, validation.validWords);
            
            return {
                success: true,
                total: words.length,
                imported: result.added,
                skipped: result.skipped,
                errors: validation.invalidWords.concat(result.errors),
                validWords: validation.validWords
            };
            
        } catch (error) {
            console.error('导入单词数据失败:', error);
            return {
                success: false,
                error: error.message,
                total: 0,
                imported: 0,
                skipped: 0,
                errors: []
            };
        }
    }

    /**
     * 导出单词数据 - 将指定分类的单词导出为指定格式
     * @param {string} category - 要导出的分类
     * @param {string} format - 导出格式
     * @returns {object} 导出结果
     */
    exportWords(category, format = 'json') {
        if (!this.wordLibrary[category]) {
            return { success: false, error: `分类 "${category}" 不存在` };
        }
        
        const words = this.getWordsByCategory(category);
        if (words.length === 0) {
            return { success: false, error: `分类 "${category}" 为空` };
        }
        
        let data;
        let filename;
        let contentType;
        
        switch(format) {
            case 'json':
                data = JSON.stringify(words, null, 2);
                filename = `${category}_words.json`;
                contentType = 'application/json';
                break;
                
            case 'csv':
                data = Utils.toCSV(words);
                filename = `${category}_words.csv`;
                contentType = 'text/csv';
                break;
                
            default:
                return { success: false, error: `不支持的导出格式: ${format}` };
        }
        
        return {
            success: true,
            data: data,
            filename: filename,
            contentType: contentType,
            wordCount: words.length
        };
    }

    /**
     * 搜索单词 - 在所有分类或指定分类中搜索单词
     * @param {string} query - 搜索关键词
     * @param {string} category - 搜索的分类（可选，为null时搜索所有分类）
     * @returns {object[]} 匹配的单词数组
     */
    searchWords(query, category = null) {
        if (!query || query.trim() === '') {
            return [];
        }
        
        const searchTerm = query.toLowerCase().trim();
        const categories = category ? [category] : Object.keys(this.wordLibrary);
        const results = [];
        
        categories.forEach(cat => {
            if (this.wordLibrary[cat]) {
                const matches = this.wordLibrary[cat].filter(word => 
                    word.word.toLowerCase().includes(searchTerm) ||
                    word.chinese.toLowerCase().includes(searchTerm) ||
                    word.english.toLowerCase().includes(searchTerm) ||
                    word.partOfSpeech.toLowerCase().includes(searchTerm)
                );
                
                // 添加分类信息到结果中
                matches.forEach(match => {
                    results.push({
                        ...match,
                        category: cat
                    });
                });
            }
        });
        
        return results;
    }

    /**
     * 获取分类统计信息 - 返回各分类的单词数量统计
     * @returns {object} 分类统计信息
     */
    getCategoryStats() {
        const stats = {};
        let totalWords = 0;
        
        Object.keys(this.wordLibrary).forEach(category => {
            const count = this.wordLibrary[category].length;
            stats[category] = count;
            totalWords += count;
        });
        
        return {
            categories: stats,
            totalCategories: Object.keys(stats).length,
            totalWords: totalWords
        };
    }

    /**
     * 清空分类 - 移除指定分类中的所有单词
     * @param {string} category - 要清空的分类
     * @returns {object} 清空结果
     */
    clearCategory(category) {
        if (!this.wordLibrary[category]) {
            return { success: false, error: `分类 "${category}" 不存在` };
        }
        
        if (category === 'default') {
            return { success: false, error: '不能清空默认分类' };
        }
        
        const wordCount = this.wordLibrary[category].length;
        this.wordLibrary[category] = [];
        this.saveToLocalStorage();
        
        console.log(`成功清空分类 "${category}"，移除了 ${wordCount} 个单词`);
        return { 
            success: true, 
            category: category, 
            clearedWords: wordCount 
        };
    }

    /**
     * 移动单词到其他分类 - 将单词从一个分类移动到另一个分类
     * @param {string} fromCategory - 源分类
     * @param {string} toCategory - 目标分类
     * @param {string} word - 要移动的单词
     * @returns {object} 移动结果
     */
    moveWordToCategory(fromCategory, toCategory, word) {
        if (!this.wordLibrary[fromCategory]) {
            return { success: false, error: `源分类 "${fromCategory}" 不存在` };
        }
        
        if (!this.wordLibrary[toCategory]) {
            return { success: false, error: `目标分类 "${toCategory}" 不存在` };
        }
        
        // 查找单词在源分类中的位置
        const wordIndex = this.wordLibrary[fromCategory].findIndex(
            w => w.word.toLowerCase() === word.toLowerCase()
        );
        
        if (wordIndex === -1) {
            return { success: false, error: `单词 "${word}" 在分类 "${fromCategory}" 中不存在` };
        }
        
        const wordData = this.wordLibrary[fromCategory][wordIndex];
        
        // 检查单词是否已在目标分类中存在
        const existsInTarget = this.wordLibrary[toCategory].some(
            w => w.word.toLowerCase() === word.toLowerCase()
        );
        
        if (existsInTarget) {
            return { success: false, error: `单词 "${word}" 已在目标分类 "${toCategory}" 中存在` };
        }
        
        // 从源分类移除，添加到目标分类
        this.wordLibrary[fromCategory].splice(wordIndex, 1);
        this.wordLibrary[toCategory].push(wordData);
        this.saveToLocalStorage();
        
        console.log(`成功将单词 "${word}" 从分类 "${fromCategory}" 移动到 "${toCategory}"`);
        return { 
            success: true, 
            word: wordData,
            fromCategory: fromCategory,
            toCategory: toCategory
        };
    }

    /**
     * 复制单词到其他分类 - 将单词复制到另一个分类（不删除原单词）
     * @param {string} fromCategory - 源分类
     * @param {string} toCategory - 目标分类
     * @param {string} word - 要复制的单词
     * @returns {object} 复制结果
     */
    copyWordToCategory(fromCategory, toCategory, word) {
        if (!this.wordLibrary[fromCategory]) {
            return { success: false, error: `源分类 "${fromCategory}" 不存在` };
        }
        
        if (!this.wordLibrary[toCategory]) {
            return { success: false, error: `目标分类 "${toCategory}" 不存在` };
        }
        
        // 查找单词数据
        const wordData = this.wordLibrary[fromCategory].find(
            w => w.word.toLowerCase() === word.toLowerCase()
        );
        
        if (!wordData) {
            return { success: false, error: `单词 "${word}" 在分类 "${fromCategory}" 中不存在` };
        }
        
        // 检查单词是否已在目标分类中存在
        const existsInTarget = this.wordLibrary[toCategory].some(
            w => w.word.toLowerCase() === word.toLowerCase()
        );
        
        if (existsInTarget) {
            return { success: false, error: `单词 "${word}" 已在目标分类 "${toCategory}" 中存在` };
        }
        
        // 复制单词到目标分类
        const result = this.addWordToCategory(toCategory, wordData);
        
        if (result.success) {
            console.log(`成功将单词 "${word}" 从分类 "${fromCategory}" 复制到 "${toCategory}"`);
        }
        
        return result;
    }
}
