import Mock from '@/static/mock/mock.js';
const Random = Mock.Random;
const dure = 300;

export function ajaxGetGoods (pms, callback) {
	let data = Mock.mock({
		'msg': '',
		'code': 200,
		'result|1-10': [{
			'id': '@id()',
			// 图片地址
			'pic': "@image(80x80)",
			// 商品名称
			'name|1': '@ctitle(3, 8)',
			// 商品描述
			'desc': '@ctitle(10, 50)',
			// 购买单位
			'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
			// 单价
			'price|1': [3.5, 5, 11, 12.5, 22.3],
			// 折扣
			'rebate|1': [9.5, 8.5, 10, 5, 4.5],
			// 库存
			'stock|1': [10, 5, '', 50],
			// 标签
			'label|1': [
				'',
				{ text: '特惠', color: '#e55e5e', bcolor: '#fce7e7' }
			]
			// 购买数量
			// 'count': 1
			// 实际发货数量
			// 'realCount': 1
		}]
	});
	callback && callback(data);
}