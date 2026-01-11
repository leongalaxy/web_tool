// 语言包：key是文本标识，value是不同语言的文本
const i18n = {
  // 中文
  'zh-CN': {
    'title': '在线网址导航 - Web Tool',
    'search_placeholder': '输入关键字搜索',
    'common_tools': '常用工具',
    'research_office': '科研办公',
    'bio_info': '生物信息',
    'cloud_server': '云服务器',
    'submit_url': '提交网址',
    'night_mode': '夜间模式',
    'day_mode': '日间模式',
    'about': '关于我们',
    'online_preview': '在线预览',
    'feature_1': '纯静态 HTML 页面，无需后端支持',
    'feature_2': '响应式设计，支持移动端访问',
    'feature_3': '支持日间/夜间模式切换',
    'feature_4': '分类清晰，支持快速搜索',
    'feature_5': '网址提交功能，方便收录管理',
    'feature_6': '部署简单，支持多种部署方式'
  },
  // 英文
  'en-US': {
    'title': 'Online URL Navigation - Web Tool',
    'search_placeholder': 'Enter keywords to search',
    'common_tools': 'Common Tools',
    'research_office': 'Research & Office',
    'bio_info': 'Bioinformatics',
    'cloud_server': 'Cloud Server',
    'submit_url': 'Submit URL',
    'night_mode': 'Night Mode',
    'day_mode': 'Day Mode',
    'about': 'About Us',
    'online_preview': 'Online Preview',
    'feature_1': 'Pure static HTML pages, no backend required',
    'feature_2': 'Responsive design, supports mobile access',
    'feature_3': 'Supports day/night mode switching',
    'feature_4': 'Clear classification, supports quick search',
    'feature_5': 'URL submission function for easy collection management',
    'feature_6': 'Simple deployment, supports multiple deployment methods'
  }
};

// 检测用户浏览器语言（核心逻辑）
function detectUserLang() {
  // 获取浏览器语言（如zh-CN、en-US、en-GB等）
  const userLang = navigator.language || navigator.userLanguage;
  // 简化判断：以en开头则用英文，否则用中文
  return userLang.startsWith('en') ? 'en-US' : 'zh-CN';
}

// 替换页面文本的核心函数
function renderI18n(lang) {
  // 1. 更新HTML的lang属性（辅助浏览器识别）
  document.documentElement.lang = lang;
  // 2. 替换所有带data-i18n属性的元素文本
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
    // 特殊处理：placeholder属性
    if (el.tagName === 'INPUT' && el.type === 'text' && i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });
  // 3. 替换页面标题
  document.title = i18n[lang]['title'];
}

// 手动切换语言的函数（可选，提升体验）
function switchLang(targetLang) {
  renderI18n(targetLang);
  // 可选：把语言偏好存到本地存储，下次打开保留
  localStorage.setItem('preferredLang', targetLang);
}

// 初始化：优先读取本地存储的语言，否则检测浏览器语言
function initI18n() {
  const preferredLang = localStorage.getItem('preferredLang') || detectUserLang();
  renderI18n(preferredLang);
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', initI18n);
