<template>
	<div class="container">
		<Breadcrumb :items="['选品库', '商品列表']" />

		<!-- 搜索栏开始 -->
		<div class="box_bcw" style="width: 100%">
			<a-form :model="formModel" auto-label-width label-align="left">
				<!-- 搜索输入框 -->
				<a-row :gutter="24">
					<a-col :span="10" class="mg-b-20">
						<a-input v-model="formModel.productId" placeholder="请输入商品名称或商品链接" allow-clear />
					</a-col>
					<a-col :span="4" class="mg-b-20">
						<a-button type="primary" @click="search">搜索</a-button>
					</a-col>
				</a-row>
				<!-- 商品类目 -->
				<a-row :gutter="24" class="mg-b-20">
					<a-col :span="1.8">
						<span class="rowText">商品类目:</span>
					</a-col>
					<a-col :span="22">
						<div class="tagOverflow">
							<div class="list" :class="tagShow ? '' : 'on'">
								<a-tag class="li" :color="formModel.catId ? 'gray' : 'arcoblue'"
									@click="tagClick('', '')">
									全部
								</a-tag>
								<a-tag v-for="(item, index) in goodsClassList"
									:color="formModel.catId == item.catId ? 'arcoblue' : 'gray'" class="li"
									@click="tagClick(item.catId, item.level)">
									{{ item.name }}
								</a-tag>
							</div>
							<a-button class="mg-t-10" type="primary"
								@click="tagShow = tagShow ? false : true">{{ tagShow ? '展开' : '收起' }}</a-button>
						</div>
					</a-col>
				</a-row>
				<!-- 筛选 -->
				<a-row :gutter="24" class="mg-b-20">
					<!-- 价格 -->
					<a-col :span="1.8">
						<span class="rowText">筛选:</span>
					</a-col>
					<a-col :span="1.5">价格: </a-col>
					<a-col :span="4">
						<a-input-number v-model="formModel.minPrice" min="0" class="input-r-text" placeholder="起始价格"
							@change="inputNumber(0,$event)" />
						<span class="fl-right">元</span>
					</a-col>
					<a-col :span="1">
						<span class="line"></span>
					</a-col>
					<a-col :span="4">
						<a-input-number v-model="formModel.maxPrice" :min="formModel.minPrice" class="input-r-text"
							@change="inputNumber(1,$event)" allow-clear placeholder="截止价格" />
						<span class="fl-right">元</span>
					</a-col>

					<!-- 佣金 -->
					<a-col :span="1.7">佣金比例: </a-col>
					<a-col :span="4">
						<a-input-number v-model="formModel.minRatio" min="0" class="input-r-text" allow-clear
							@change="inputNumber(2,$event)" placeholder="起始佣金" />
						<span class="fl-right">%</span>
					</a-col>
					<a-col :span="1">
						<span class="line"></span>
					</a-col>
					<a-col :span="4">
						<a-input-number v-model="formModel.maxRatio" :min="formModel.minRatio" class="input-r-text"
							@change="inputNumber(3,$event)" allow-clear placeholder="截止佣金" />
						<span class="fl-right">%</span>
					</a-col>
				</a-row>
				<!-- 排序 -->
				<a-row :gutter="24">
					<a-col :span="1.8">
						<span class="rowText">排序:</span>
					</a-col>
					<!-- <a-col :span="2.5">
						<a-button @click="sortClick(0)" 
						:type="sortList.salesSort ? 'primary':'outline'">
							销量<icon-caret-down v-if="sortList.salesSort" />
							<icon-caret-up v-else />
						</a-button>
					</a-col> -->
					<a-col :span="2.5">
						<a-button :type="sortList.moneySort == 0 ? 'outline' : 'primary'" @click="sortClick(1)">
							价格
							<span class="sortIcon">
								<icon-caret-up v-if="sortList.moneySort == 2 || !sortList.moneySort"
									:class="sortList.moneySort ? '' : 'mg'" />
								<icon-caret-down v-if="sortList.moneySort == 1 || !sortList.moneySort" />
							</span>
						</a-button>
					</a-col>
					<a-col :span="2.5">
						<a-button :type="sortList.startSort == 0 ? 'outline' : 'primary'" @click="sortClick(2)">
							佣金比例
							<span class="sortIcon">
								<icon-caret-up v-if="sortList.startSort == 2 || !sortList.startSort"
									:class="sortList.startSort ? '' : 'mg'" />
								<icon-caret-down v-if="sortList.startSort == 1 || !sortList.startSort" />
							</span>
						</a-button>
					</a-col>
				</a-row>
				<!-- 清空 -->
				<a-row justify="end">
					<a-col :span="2.5">
						<a-button type="primary" @click="resettingClick">重置筛选条件</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<!-- 搜索栏结束 -->

		<!-- 列表组件 -->
		<goodsList ref="goodsListRef" :form-model="formModel"></goodsList>
	</div>
</template>

<script lang="ts" setup>
	//* ************js与组件引用**************
	import { ref, reactive, onMounted } from 'vue';
	import { getClassGrid } from '@/api/merchantApi';
	import { Message } from '@arco-design/web-vue';
	// 商品列表组件
	import goodsList from './components/list.vue';

	//* ************变量/数据**************
	// 提交数据
	const formModel = ref({
		// 商品id
		productId: '',
		// 商品名称 暂时废弃  id和名称都传 商品id字段
		productName: '',
		// 类目id
		catId: '',
		// 类目等级
		catLevel: '',
		// 最小金额
		minPrice: '',
		// 最大金额
		maxPrice: '',
		// 最小佣金
		minRatio: '',
		// 最大佣金
		maxRatio: '',
		// 排序字段
		orderKey: '',
		// 排序方式
		orderSort: '',
	});
	// 获取商品类目列表
	const goodsClassList = ref([]);
	// tag显示与隐藏
	const tagShow = ref(true);
	// 排序显示 （提交的不是它)
	const sortList = ref({
		salesSort: 0,
		moneySort: 0,
		startSort: 0,
	});

	const goodsListRef = ref<any>();
	//* ************监听、钩子、定向**************

	//* ************生命周期**************
	onMounted(() => {
		// 获取商品类目
		getClassGridList();
	});

	//* ************js方法**************
	
	//修复筛选 点击+时木有反应的bug 
	const inputNumber = (i,e) => {
		if(e === '0'){
			//起始价格
			if(i == 0){
				formModel.value.minPrice = 1
			}else if(i == 1){//截止价格
				formModel.value.maxPrice = 1
			}else if(i == 2){//起始佣金
				formModel.value.minRatio = 1
			}else if(i == 3){//截止佣金
				formModel.value.maxRatio = 1
			}
		}
	}
	
	// 选择类目
	const tagClick = (catId, level) => {
		formModel.value.catId = catId;
		formModel.value.catLevel = level;
	};

	// 修改排序
	const sortClick = (i) => {
		// 销量
		if (i === 0) {
			if (sortList.value.salesSort == 2) {
				sortList.value.salesSort = 0;
			} else {
				sortList.value.salesSort++;
			}
		} else if (i === 1) {
			// 价格
			if (sortList.value.moneySort == 2) {
				sortList.value.moneySort = 0;
				formModel.value.orderSort = '';
				formModel.value.orderKey = '';
			} else {
				sortList.value.moneySort++;
				// 升序 asc 倒序 desc
				if (sortList.value.moneySort == 1) {
					formModel.value.orderSort = 'desc';
				} else {
					formModel.value.orderSort = 'asc';
				}
				formModel.value.orderKey = 'productPrice';
			}
		} else if (i === 2) {
			// 佣金
			if (sortList.value.startSort == 2) {
				sortList.value.startSort = 0;
				formModel.value.orderSort = '';
				formModel.value.orderKey = '';
			} else {
				sortList.value.startSort++;
				// 升序 asc 倒序 desc
				if (sortList.value.startSort == 1) {
					formModel.value.orderSort = 'desc';
				} else {
					formModel.value.orderSort = 'asc';
				}
				formModel.value.orderKey = 'ratio';
			}
		}
		// 清空其他的
		if (i !== 0) {
			sortList.value.salesSort = 0;
		}
		if (i !== 1) {
			sortList.value.moneySort = 0;
		}
		if (i !== 2) {
			sortList.value.startSort = 0;
		}
		console.log(
			'修改排序',
			formModel.value.orderKey,
			formModel.value.orderSort
		);
	};

	// 获取商品类目
	const getClassGridList = async () => {
		try {
			const { data } = await getClassGrid({
				fCatId: '',
				level: 1,
				pageIndex: 1,
				pageSize: 200,
			});
			// console.log('获取店铺数据',data)
			goodsClassList.value = data.grid;
		} catch (err) {
			console.log('获取店铺数据错误', err);
		}
	};

	// 清空筛选
	const resettingClick = () => {
		formModel.value.productId = '';
		formModel.value.catId = '';
		formModel.value.catLevel = '';
		formModel.value.minPrice = '';
		formModel.value.maxPrice = '';
		formModel.value.minRatio = '';
		formModel.value.maxRatio = '';
		formModel.value.orderKey = '';
		formModel.value.orderSort = '';
		// 排序展示
		sortList.value.salesSort = 0;
		sortList.value.moneySort = 0;
		sortList.value.startSort = 0;
	};

	const search = () => {
		goodsListRef.value.getGoodsGridList();
	};
</script>

<style scoped lang="less">
	.mg-r-20 {
		margin-right: 20px;
	}

	.mg-b-20 {
		margin-bottom: 20px;
	}

	.mg-t-10 {
		margin-top: 10px;
	}

	.sortIcon {
		display: flex;
		flex-wrap: wrap-reverse;
		flex-direction: column;
		padding-left: 5px;

		.mg {
			margin-bottom: -6px;
		}
	}

	.tagOverflow {
		overflow: hidden;

		.list {
			float: left;
			width: calc(100% - 70px);
			height: 44px;
			overflow: hidden;

			.li {
				margin: 10px 20px 10px 0;
				cursor: pointer;
			}

			&.on {
				height: auto;
				overflow: auto;
			}
		}

		button {
			float: right;
		}
	}

	.rowText {
		display: inline-block;
		color: #535353;
	}

	.input-r-text {
		width: calc(100% - 25px);
	}

	.fl-right {
		display: inline-block;
		width: 25px;
		text-align: right;
	}

	.line {
		width: 100%;
		height: 2px;
		background: #ccc;
		display: block;
	}

	.container {
		height: 100%;
		padding: 0 17px 17px 17px;
		background: #f7f9ff;
	}

	.title {
		font-size: 20px;
		color: #2d2d2d;
		font-weight: 500;
		display: flex;
		align-items: center;

		// margin-bottom: 32px;
		.tips {
			font-size: 16px;
			color: #535353;
			font-weight: 400;
			margin-left: 22px;
		}
	}

	.general-card-upai {
		// border-radius: 20px;
		border: none;
		margin-bottom: 16px;

		.arco-card-body {
			padding: 20px 17px !important;
		}
	}

	:deep.arco-input-wrapper {
		background: #f2f5ff;
		border-radius: 4px;
		height: 32px;
	}

	:deep .arco-picker {
		height: 32px;
		background: #f2f5ff;
		border-radius: 4px;
	}

	:deep.arco-input-number {
		height: 32px;
	}

	.arco-row-align-start {
		align-items: center;
	}

	.labelText {
		// width: 80px;
		// height: 22px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #3f3f3f;
		white-space: nowrap;
		line-height: 15.4px;
	}

	:deep .arco-select-view-single {
		background: #f2f5ff;
		border-radius: 4px;
		height: 32px;
	}

	.mark {
		position: absolute;
		top: 0%;
		left: 0;

		width: 200px;
		height: 200px;
		background: rgba(255, 255, 255, 0.7);

		.iconBox {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 32px;
		}
	}

	// /deep/ .arco-statistic-value {
	//   font-size: 16px !important;
	//   color: #535353 !important;
	// }
	.box_bcw {
		padding: 20px 17px;
		border-radius: 12px;
		background: #fff;
		margin-bottom: 12px;
	}

	.shopInfo {
		text-align: left;
	}
</style>