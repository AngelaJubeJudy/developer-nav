import { ResourceDetail } from '../../types';

export const exampleTool: ResourceDetail = {
  id: 'chatgpt',
  title: 'ChatGPT',
  description: 'OpenAI 开发的大型语言模型，能够进行自然语言对话和创作',
  url: 'https://chat.openai.com',
  category: 'tool',
  tags: ['AI', '聊天机器人', '自然语言处理'],
  publishDate: '2022-11-30',
  publishLocation: 'San Francisco, USA',
  officialName: 'ChatGPT',
  officialDescription: 'ChatGPT is an AI-powered chatbot developed by OpenAI, capable of understanding and generating human-like text based on context and past conversations.',
  features: [
    '自然语言对话',
    '代码编写和调试',
    '文章创作和编辑',
    '多语言支持',
    '上下文理解',
  ],
  content: `
ChatGPT 是由 OpenAI 开发的一个强大的语言模型，它能够理解和生成人类语言。
该工具可以用于多种场景，包括但不限于：
- 回答问题
- 编写代码
- 创作文章
- 翻译文本
- 数学计算
- 创意写作

ChatGPT 通过深度学习技术，能够理解上下文并生成连贯的回答。
它不断学习和更新，以提供更准确和有用的信息。
  `,
  screenshots: [
    '/screenshots/chatgpt-1.png',
    '/screenshots/chatgpt-2.png',
  ],
  version: '4.0',
  author: 'OpenAI',
  license: 'Proprietary',
  createdAt: '2024-04-04',
  updatedAt: '2024-04-04',
}; 