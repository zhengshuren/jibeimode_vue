import axios from 'axios'

import MockAdapter from 'axios-mock-adapter';
import { UsersData } from './data/userInfo'

let mock = new MockAdapter(axios);

mock.onGet('/login').reply(config => {
//   console.log(config)
//   console.log(Users)
  // 获取用户输入的登录信息
  let loginInfo = config.params;
  // 做一个数据效验
  let result = {
    code: 200,
    msg: '',
    info: {}
  };
  
  result.msg = UsersData.name;
  result.code = 200;
  return [200,result];
  
});

export default axios;	//注意暴露axios
