// 用户信息
export type User = {
  /** token令牌 */
  token: string
  /** 用户ID */
  id: string
  /** 用户名称 */
  account: string
  /** 手机号 */
  mobile: string
  /** 头像 */
  avatar: string
}

// 短信验证码类型，登录、注册、修改手机号、忘记密码、绑定手机号
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

/**
 * Omit Pick TS的内置类型
  type Person = {
    name: string
    age: number
    gender: 0 | 1
  }
  // Omit 是从对象中排出一些属性，得到对象类型
  type OmitPerson = Omit<Person, 'age' | 'gender'>
  // Pick 是从对象中摘取一些属性，得到对象类型
  type PickPerson = Pick<Person, 'gender' | 'age'>
*/

// 个人信息 Pick和Omit TS内置类型
type OmitUser = Omit<User, 'token'> // 不要token 代表
export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  /** 订单信息 */
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    toShipNumber: number
    /** 待收货 */
    receiveNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}

// 家庭档案-患者信息
export type Patient = {
  /**患者ID */
  id?: string
  /**患者名称 */
  name: string
  /**身份证号 */
  idCard: string
  /**0不默认，1默认 */
  defaultFlag: 0 | 1
  /**0 女 1 男 */
  gender: 0 | 1
  /**性别文字 */
  genderValue?: string
  /**年龄 */
  age?: number
}

// 家庭档案信息列表
export type PatientList = Patient[]
