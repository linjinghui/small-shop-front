// 加密显示手机号
const encodeMobile = (mobile) => {
	return (mobile + '').replace(/(\d{3})\d*(\d{4})/, '$1****$2');
}
export {encodeMobile};