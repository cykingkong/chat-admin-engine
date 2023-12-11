/* eslint-disable no-shadow */
export enum useStatus {
  '空闲中' = 1,
  '使用中' = 2,
}
export enum bindStatus {
  '已绑定' = 1,
  '已解绑' = 2,
}
export enum memberLevel {
  '月卡' = 1,
  '年卡' = 2,
  '体验卡' = 3,
  '超级用户' = 4,
}

export enum rOrderTYpe {
  REFUND = '退款',
  RETURN = '退货退款',
}
export enum merchantOrderStatus {
  '待付款' = 10,
  '待发货' = 20,
  '部分发货' = 21,
  '待收货' = 30,
  '完成' = 100,
  '订单取消' = 200,
  '自动取消' = 250,
}
export enum refundStatus {
  USER_CANCELD = '用户取消申请',
  MERCHANT_PROCESSING = '商家受理中',
  MERCHANT_REJECT_REFUND = '商家拒绝退款',
  MERCHANT_REJECT_RETURN = '商家拒绝退款退款',
  USER_WAIT_RETURN = '待买家退货',
  RETURN_CLOSED = '退货退款关闭',
  MERCHANT_WAIT_RECEIPT = '待商家收货',
  MERCHANT_OVERDUE_REFUND = '商家逾期未退款',
  MERCHANT_REFUND_SUCCESS = '退款完成',
  MERCHANT_RETURN_SUCCESS = '退货退款完成',
  PLATFORM_REFUNDING = '平台退款中',
  PLATFORM_REFUND_FAIL = '平台退款失败',
  USER_WAIT_CONFIRM = '待用户确认',
  MERCHANT_REFUND_RETRY_FAIL = '客服关闭售后',
  MERCHANT_FAIL = '售后关闭',
}
export enum refundReason {
  NO_REASON_7_DAYS = '7天无理由',
  INCORRECT_SELECTION = '拍错/多拍',
  NO_LONGER_WANT = '不想要了',
  NO_EXPRESS_INFO = '无快递信息',
  EMPTY_PACKAGE = '包裹为空',
  REJECT_RECEIVE_PACKAGE = '已拒签包裹',
  NOT_DELIVERED_TOO_LONG = '快递长时间未送达',
  NOT_MATCH_PRODUCT_DESC = '与商品描述不符',
  QUALITY_ISSUE = '	质量问题',
  SEND_WRONG_GOODS = '卖家发错货',
  THREE_NO_PRODUCT = '三无产品',
  FAKE_PRODUCT = '	假冒产品',
  OTHERS = '其它',
}
export enum sphType {
  '投放号' = 1,
  '被投号' = 2,
  '同个号' = 3,
}
export enum userStatus {
  '禁用' = 0,
  '启用' = 1,
}
export enum paymentMethod {
  '微信支付' = 1,
  '先用后付' = 2,
  '抽奖商品0元订单' = 3,
}
export enum sphStatus {
  '正常' = 1,
  '离线' = 2,
}

export enum taskStatus {
  '全部' = -1,
  '等待调度' = 0,
  '调度中' = 1,
  '调度完成' = 2,
}
export enum publishType {
  '立即发布' = 1,
  '定时发布' = 2,
}
export enum descriptionType {
  '循环使用描述' = 1,
  '随机使用描述' = 2,
  '使用视频名称作为描述' = 3,
}
export enum auditStatus {
  '正在审核' = 0,
  '审核成功' = 1,
  '审核失败' = 2,
}
export enum taskInfoStatus {
  '上传成功' = 1,
  '上传失败' = 2,
}
export enum exportStatus {
  '生成中' = 1,
  '已生成' = 2,
  '生成失败' = 3,
}
export enum exportType {
  '计划列表数据' = 1,
  '分组计划数据' = 2,
  '商品计划数据' = 3,
  '视频计划数据' = 4,
  '投放号计划数据' = 5,
  '被投号计划数据' = 6,
  '关停策略数据' = 7,
  '计划包数据' = 8,
  '直播计划数据' = 9,
}

export enum plantStatus {
  '全部' = -1,
  '待支付' = 1,
  '加热中' = 2,
  '已完成' = 3,
  '已结束' = 4,
  '审核中' = 5,
  '审核未通过' = 6,
  '已删除' = 7,
  '退款中.' = 8,
  '退款中' = 9,
  '关停进行中' = 100,
  '关停失败' = 101,
  '关停成功' = 102,
}
export enum afterSaleReason {
  '	拍错/多拍' = 1,
  '	不想要了' = 2,
  '无快递信息' = 3,
  '	包裹为空' = 4,
  '		已拒签包裹' = 5,
  '快递长时间未送达' = 6,
  '与商品描述不符' = 7,
  '质量问题' = 8,
  '卖家发错货' = 9,
  '三无产品' = 10,
  '假冒产品' = 11,
  '其他' = 12,
}
export enum itemType {
  '	申请平台介入' = 1,
  '用户留言' = 2,
  '	商家留言' = 3,
  '	提交投诉成功' = 4,
  '	投诉已取消' = 5,
  '商家已超时' = 6,
  '用户补充凭证' = 7,
  '商家补充凭证' = 8,
  '' = 9,
  '待商家处理纠纷' = 10,
  '待平台处理' = 11,
  '取消平台介入' = 12,
  '平台处理中' = 13,
  '待用户补充凭证' = 14,
  '待商家补充凭证' = 16,
  '待双方补充凭证' = 18,
  '待商家确认' = 20,
  '商家申诉中' = 21,
  '调解完成' = 22,
  '待平台核实' = 23,
  '重新退款中' = 24,
  '调解关闭' = 26,
  '平台判定用户责任' = 30,
  '平台判定商家责任' = 31,
  '平台判定双方责任' = 32,
  '平台判定无责任' = 33,
  '平台判定申诉无效' = 34,
  '平台判定申诉生效' = 35,
  '平台判定退款有效' = 36,
  '平台判定退款无效' = 37,
  '用户发起退款' = 50,
  '商家拒绝退款' = 51,
  '用户取消申请' = 52,
  '待买家退货' = 56,
  '退货退款关闭' = 57,
  '待商家收货' = 58,
  '商家逾期未退款' = 59,
  '退款完成' = 60,
  '退货退款完成' = 61,
  '平台退款中' = 62,
  '平台退款失败' = 63,
  '待用户确认' = 64,
  '用户补充材料超时' = 111,
  '商家补充材料超时' = 112,
  '双方补充材料超时' = 113,
}
export enum plantLiveStatus {
  '全部' = -1,
  '加热中' = 1,
  '已完成' = 3,
  '审核中' = 4,
  '审核未通过' = 5,
  '已取消' = 6,
  '直播已结束' = 7,
  '已预约' = 8,
  '预约已过期' = 9,
  '待支付' = 10,
  '订单已关闭' = 11,
  '订单取消' = 12,
  '预约失效' = 13,
  '结算中' = 14,
  '关停进行中' = 100,
  '关停失败' = 101,
  '关停成功' = 102,
}
export enum materialFlag {
  '直播间' = 1,
  '短视频' = 2,
  '直播间+短视频' = 3,
}
export enum targetLiveType {
  '直播间观众' = 1,
  '直播间互动' = 2,
  '直播间涨粉' = 3,
  '直播间商品点击' = 4,
  '直播间商品成交' = 8,
}
export enum targetType {
  '点赞数' = 6,
  '关注数' = 5,
  '完播数' = 1,
  '商品点击' = 7,
  '商品成交' = 8,
  '商品ROI' = 11,
}
export enum ruleType {
  '空耗值高于' = 1,
  '点击成本高于' = 2,
  '消耗金额高于' = 3,
  '未消耗时长高于' = 4,
  '成交ROI低于' = 5,
  '成交订单数高于' = 6,
  '加热未消耗时长高于' = 7,
}

export enum ruleFlagType {
  '并且' = 1,
  '或者' = 2,
}

export enum shutdownStatus {
  '未开启' = 0,
  '监听中' = 1,
  '已触发' = 2,
}
export enum indemnifyVoucherStatus {
  '待补贴' = 1,
  '已补贴' = 2,
  '未补贴' = 3,
}
export enum createStatus {
  '创建成功' = 1,
  '等待创建' = 2,
  '创建失败' = 3,
}

export enum logType {
  '计划关停' = 1,
  '删除计划' = 2,
  '修改计划包名称' = 3,
  '删除计划包' = 4,
  '账号登录' = 5,
  '子账号删除' = 6,
}
export enum hotStatus {
  '全部' = -1,
  '未加热' = 0,
  '加热中' = 1,
  '已结束' = 2,
}
export enum sysConfigMemberLevelCount {
  'experienceMemberCount' = 3,
  'monthMemberCount' = 1,
  'yearMemberCount' = 2,
  'superMemberCount' = 4,
}
export enum sysConfigMemberLevelSphCount {
  'experienceSphCount' = 3,
  'monthSphCount' = 1,
  'superSphCount' = 2,
  'yearSphCount' = 4,
}
export enum isWindows {
  '默认' = 0,
  '已开通' = 1,
  '未缴纳保证金' = 2,
  '未认证联盟达人' = 3,
}
export function enumToObject(enumData: any): any {
  const data: { label: any; value: any }[] = [];
  const regPos = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
  Object.keys(enumData).forEach((key) => {
    if (!regPos.test(key)) {
      data.push({ value: enumData[key], label: key });
    }
  });
  return data;
}
