import request from "./http"
import params from "./params"
import  mock from "@/mock/mock" //我拿的是 mock.js里面的axios模块

class Apls{
  // 我是mock虚拟数据
  // mokeLogin(data){
  //   return mock.get("/login",{params:data})
  // }
  
	GetInfoList(data){
		return request({
      method: 'get',
			url: '/powerPath/getAll',
			params: data
		})
	}
  
  GetInfoByCondition(data){
    return request({
      method: 'get',
      url: '/powerPath/getAllByCondition',
      params: data
    })
  }
  
  GetInfoAdd(data){
    // console.log(data)
    return request({
      method: 'post',
      url: '/powerPath/add',
      headers: {
        'Content-Type':'application/json;charset=UTF-8'
      },
      // params: data
      // data: Qs.stringify(data),
      data: JSON.stringify(data),
    })
  }
  
  /* 请求参数放在body里面 */
  GetInfoUpadte(data){
    return request({
      method: 'post',
      url: '/powerPath/update',
      headers: {
        'Content-Type':'application/json;charset=UTF-8'
      },
      data: JSON.stringify(data),
    })
  }
  
  GetInfoDelect(data){
    return request({
      method: 'post',
      url: '/powerPath/delete',
      params: data
    })
  }
	
}


export default new Apls();
