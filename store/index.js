import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({  
    state: {  
		num: 123,
        user: {
			openId: '',
			nickName: '',
			avatarUrl: require('../static/img/avater.png')
		}
    },  
    mutations: {  
        setUser (state, data) {
			state.user = data;
        }
    }  
}) 