$(function(){
    let $span=$.Callbacks();//用来实现发布订阅
    $span.add((_,baseInfo)=>{
        //console.log("渲染用户信息和实现退出登录：",baseInfo)
      $(".baseBox>span").html(`你好，${baseInfo.name||""}`)
      //实现退出登陆
      $(".baseBox>a").click(async function(){
          let result=await axios.get("/user/signout")
          if(result.code==0){
              confirm("你确定要退出登陆吗")
              if(confirm){
                window.location.href="login.html"
              }
              return;
          }
          alert("网络不给力，稍后再试")
      })
    })
    $span.add((power)=>{
        console.log("渲染菜单：",power)
    })//订阅
    init();
   async function init(){
    let result=await axios.get("/user/login");
    console.log(result)
    if(result.code!=0){
        alert("请先登录。。。")
        window.location.href="login.html"
        return ;
    }
    let [power,baseInfo]=await axios.all([
        axios.get("/user/power"),
        axios.get("/user/info")
    ])
    // console.log(power)
    // console.log(baseInfo)
    baseInfo.code===0?baseInfo=baseInfo.data:null;
    $span.fire(power,baseInfo)//发布
    }
})