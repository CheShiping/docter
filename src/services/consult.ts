import { request } from '@/utils/request'
import type {
  KnowledgeParams,
  KnowledgePage,
  PageParams,
  DoctorPage,
  FollowType,
} from '@/types/consult'

/**
 * 获取知识分页数据
 * @param {KnowledgeParams} params - 查询参数
 * @returns {Promise<KnowledgePage>} 返回知识分页数据
 */
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

/**
 * 获取医生分页数据
 * @param {PageParams} params - 查询参数
 * @returns {Promise<DoctorPage>} 返回医生分页数据
 */
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

/**
 * 关注或取消关注医生/文章等
 * @param id - 医生/文章等的标识ID
 * @param type - 关注类型，可选值：'doc'(医生) | 'knowledge'(文章) | 'topic'(话题) | 'disease'(疾病)，默认为'doc'
 * @returns 返回关注或取消关注的结果
 */
export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
