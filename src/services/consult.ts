import { request } from '@/utils/request'
import type { KnowledgeParams, KnowledgePage } from '@/types/consult'

/**
 * 获取知识分页数据
 * @param {KnowledgeParams} params - 查询参数
 * @returns {Promise<KnowledgePage>} 返回知识分页数据
 */
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
