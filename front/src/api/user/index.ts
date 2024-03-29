// import request from 'utils/http'
import request from '@/utils/http/index'
// api枚举
enum Api {
    Login = '/login'
  }

  // 用户信息
interface UserInfo {
    userName: string
  }

/**
 * 登录
 */
 export const accountLogin = () => {
    return request<UserInfo>({
      url: Api.Login,
      method: 'get'
    })
  }