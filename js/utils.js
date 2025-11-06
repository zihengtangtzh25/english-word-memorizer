/**
 * 工具函数模块
 * 提供通用的工具方法和辅助函数
 */

class Utils {
    /**
     * 防抖函数 - 防止函数在短时间内被频繁调用
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间(毫秒)
     * @returns {Function} 防抖后的函数
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 生成唯一ID - 用于创建唯一标识符
     * @returns {string} 唯一标识符
     */
    static generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 格式化日期 - 将日期对象格式化为易读字符串
     * @param {Date} date - 日期对象
     * @returns {string} 格式化后的日期字符串
     */
    static formatDate(date) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * 深度克隆对象 - 创建对象的完全独立副本
     * @param {object} obj - 要克隆的对象
     * @returns {object} 克隆后的对象
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => Utils.deepClone(item));
        
        const cloned = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = Utils.deepClone(obj[key]);
            }
        }
        return cloned;
    }

    /**
     * 验证邮箱格式 - 检查邮箱地址是否有效
     * @param {string} email - 邮箱地址
     * @returns {boolean} 是否有效
     */
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * 下载文件 - 创建并触发文件下载
     * @param {string} content - 文件内容
     * @param {string} filename - 文件名
     * @param {string} contentType - 文件类型
     */
    static downloadFile(content, filename, contentType = 'text/plain') {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * 读取文件内容 - 异步读取用户选择的文件
     * @param {File} file - 文件对象
     * @returns {Promise<string>} 文件内容
     */
    static readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    /**
     * 数组随机排序 - 打乱数组元素的顺序
     * @param {array} array - 要排序的数组
     * @returns {array} 随机排序后的数组
     */
    static shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    /**
     * 计算百分比 - 计算部分在整体中的百分比
     * @param {number} part - 部分值
     * @param {number} total - 总值
     * @returns {number} 百分比
     */
    static calculatePercentage(part, total) {
        return total > 0 ? Math.round((part / total) * 100) : 0;
    }

    /**
     * 存储到本地存储 - 将数据保存到浏览器本地存储
     * @param {string} key - 存储键名
     * @param {any} value - 存储值
     */
    static setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('本地存储失败:', error);
            return false;
        }
    }

    /**
     * 从本地存储读取 - 从浏览器本地存储获取数据
     * @param {string} key - 存储键名
     * @returns {any} 存储的值
     */
    static getLocalStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('读取本地存储失败:', error);
            return null;
        }
    }

    /**
     * 移除本地存储项 - 从浏览器本地存储删除数据
     * @param {string} key - 要移除的键名
     */
    static removeLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('移除本地存储失败:', error);
            return false;
        }
    }

    /**
     * 验证单词数据格式 - 确保单词数据包含所有必需字段
     * @param {object} wordData - 单词数据
     * @returns {boolean} 是否有效
     */
    static validateWordData(wordData) {
        return wordData && 
               typeof wordData.word === 'string' &&
               typeof wordData.partOfSpeech === 'string' &&
               typeof wordData.chinese === 'string' &&
               typeof wordData.english === 'string' &&
               wordData.word.trim() !== '' &&
               wordData.chinese.trim() !== '' &&
               wordData.english.trim() !== '';
    }

    /**
     * 批量验证单词数据 - 验证单词数组的格式
     * @param {array} words - 单词数组
     * @returns {object} 验证结果
     */
    static validateWordsData(words) {
        if (!Array.isArray(words)) {
            return { valid: false, error: '数据必须是数组格式' };
        }
        
        const invalidWords = [];
        const validWords = [];
        
        words.forEach((word, index) => {
            if (Utils.validateWordData(word)) {
                validWords.push(word);
            } else {
                invalidWords.push({ index, word });
            }
        });
        
        return {
            valid: invalidWords.length === 0,
            validCount: validWords.length,
            invalidCount: invalidWords.length,
            invalidWords: invalidWords,
            validWords: validWords
        };
    }

    /**
     * 解析CSV数据 - 将CSV文本转换为对象数组
     * @param {string} csvText - CSV文本
     * @returns {array} 解析后的数据数组
     */
    static parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) return [];

        // 处理带引号的CSV字段
        const parseCSVLine = (line) => {
            const result = [];
            let inQuotes = false;
            let currentField = '';
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(currentField.trim());
                    currentField = '';
                } else {
                    currentField += char;
                }
            }
            
            result.push(currentField.trim());
            return result;
        };

        const headers = parseCSVLine(lines[0]).map(h => h.trim());
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const obj = {};
                headers.forEach((header, index) => {
                    // 移除字段值的引号
                    let value = values[index];
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
                    obj[header] = value;
                });
                
                // 标准化字段名
                const standardized = {
                    word: obj.word || obj.Word || '',
                    partOfSpeech: obj.partOfSpeech || obj['part of speech'] || obj['词性'] || 'n.',
                    chinese: obj.chinese || obj.Chinese || obj['中文释义'] || '',
                    english: obj.english || obj.English || obj['英文释义'] || ''
                };
                
                if (Utils.validateWordData(standardized)) {
                    result.push(standardized);
                }
            }
        }

        return result;
    }

    /**
     * 转换为CSV格式 - 将对象数组转换为CSV文本
     * @param {array} data - 数据数组
     * @param {array} headers - 表头数组
     * @returns {string} CSV格式的字符串
     */
    static toCSV(data, headers = ['word', 'partOfSpeech', 'chinese', 'english']) {
        const headerLine = headers.join(',');
        const dataLines = data.map(item => {
            return headers.map(header => {
                let value = item[header] || '';
                // 如果值包含逗号或引号，用引号包围
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            }).join(',');
        });
        return [headerLine, ...dataLines].join('\n');
    }

    /**
     * 显示通知消息 - 在页面上显示临时通知
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success, error, warning, info)
     * @param {number} duration - 显示时长(毫秒)
     */
    static showNotification(message, type = 'info', duration = 3000) {
        // 移除已存在的通知
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });

        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `custom-notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        
        // 设置背景色基于类型
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, duration);
    }

    /**
     * 安全HTML转义 - 防止XSS攻击
     * @param {string} str - 要转义的字符串
     * @returns {string} 转义后的字符串
     */
    static escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * 复制文本到剪贴板 - 使用现代Clipboard API
     * @param {string} text - 要复制的文本
     * @returns {Promise<boolean>} 是否复制成功
     */
    static async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // 回退方案
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            }
        } catch (err) {
            console.error('复制失败:', err);
            return false;
        }
    }

    /**
     * 格式化文件大小 - 将字节数转换为易读格式
     * @param {number} bytes - 字节数
     * @returns {string} 格式化后的文件大小
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 检查是否为空 - 检查值是否为null、undefined、空字符串或空数组
     * @param {any} value - 要检查的值
     * @returns {boolean} 是否为空
     */
    static isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim() === '';
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }

    /**
     * 生成随机颜色 - 用于标签或分类的视觉区分
     * @returns {string} 十六进制颜色代码
     */
    static generateRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    /**
     * 节流函数 - 确保函数在指定时间间隔内只执行一次
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 时间间隔(毫秒)
     * @returns {Function} 节流后的函数
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * 数组去重 - 基于指定键名去除重复对象
     * @param {array} array - 要去重的数组
     * @param {string} key - 用于比较的键名
     * @returns {array} 去重后的数组
     */
    static uniqueBy(array, key) {
        const seen = new Set();
        return array.filter(item => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    }

    /**
     * 延迟执行 - 返回一个延迟执行的Promise
     * @param {number} ms - 延迟时间(毫秒)
     * @returns {Promise} 延迟Promise
     */
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 导出工具类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
