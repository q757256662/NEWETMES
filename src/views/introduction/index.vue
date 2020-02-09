<template>
  <div class="app-container">
    <div class="wrapper">
      <p>ETMES 调度系统 功能分析文档</p>
      <p>布易科技</p>
      <p>2018年8月15日</p>
      <p>以下为主管身份用户的配置</p>
      <p style=" font-size: 33px;">一、个人信息</p>
      <p>个人信息编辑是否正常（注：只能编辑姓名、用户密码以及手机号） 调度页面右上角的提醒只会提醒延期订单。</p>
      <img src="static/img/helpImg/01.png" alt="暂无图片" srcset="">
      <p style=" font-size: 33px;">二、员工管理</p>
      <p>①添加员工（注：添加的员工如果没有编辑自己的信息，主管可删除，且如果此员工在其它流水线，会调入到本流水线）。工号必填且必须纯数字。工序也必选（注：只有选择特体工序后才能够选择品类且一人最多三道工序）。分组可选可不选（注：同一组员工只能申请同一组员工所做任务，特体检查除外）。</p>
      <img src="static/img/helpImg/02.png" alt="暂无图片" srcset="">
      <p>②点击员工工号，编辑员工里的功能是否正常。重置密码是否正常（注：重置成功会有密码提示）。</p>
      <p style=" font-size: 33px;">三、数据导入</p>
      <p>数据导入是否正常（注：如果已有样式，也可重新导入，重新导入的样式≥已存在样式，且包括已存在样式。能修改后重新导入且替换掉之前样式）</p>
      <p style=" font-size: 33px;">四、流水线管理</p>
      <p>点击流水线名称可更改流水线名称，以及编辑里的设置是否正常。</p>
      <p style=" font-size: 33px;">五、款式查询</p>
      <p>①搜索框输入搜索条件，搜索是否正常。</p>
      <img src="static/img/helpImg/03.png" alt="暂无图片" srcset="">
      <p>②点击款名，编辑款式信息功能是否正常。点击样板名查看样板信息是否有误以及上传图片功能是否正常。</p>
      <img src="static/img/helpImg/04.png" alt="暂无图片" srcset="">
      <img src="static/img/helpImg/05.png" alt="暂无图片" srcset="">
      <p>③下载功能是否正常</p>
      <p style=" font-size: 33px;">六、生产单查询</p>
      <p>①搜索框输入条件，搜索是否正常。</p>
      <img src="static/img/helpImg/06.png" alt="暂无图片" srcset="">
      <p>②查看生产单的各个信息是否正常</p>
      <img src="static/img/helpImg/07.png" alt="暂无图片" srcset="">
      <p>③下载功能是否正常</p>
      <p style=" font-size: 33px;">七、统计</p>
      <p>查看各个统计是否正常（注：当年统计与往年统计的“平均”＝“总数÷(总周数÷2)”。样板统计为样板使用次数前十）</p>
      <img src="static/img/helpImg/08.png" alt="暂无图片" srcset="">
      <p style=" font-size: 33px;">八、查询</p>
      <p>查看日志以及流水号查询是否正常</p>
      <img src="static/img/helpImg/09.png" alt="暂无图片" srcset="">
      <img src="static/img/helpImg/10.png" alt="暂无图片" srcset="">
      <p style=" font-size: 33px;">九、流程</p>
      <p>整个流程是否能正常走通，包括重新下载，重新上传。</p>
      <p>以下为管理员身份用户的配置</p>
      <p>
        一、 个人信息 测试：与主管一致。
        <br> 二、 员工管理 测试：更改员工状态以及重置密码是否正常。
        <br> 三、 品类管理 测试：添加品类是否正常以及删除品类是否正常（注：只能删除未使用的品类）
      </p>
      <img src="static/img/helpImg/11.png" alt="暂无图片" srcset="">
      <p >四、 流水线管理</p>
      <p>添加流水线是否正常（注：如果添加的工号已经是其它流水线的主管，会调到本流水线）。点击流水线名称是否能正常修改流水线名，以及点击主管名，是否能够正常在该流水线增加主管。以及编辑里的功能是否正常。</p>
      <img src="static/img/helpImg/12.png" alt="暂无图片" srcset="">
      <img src="static/img/helpImg/13.png" alt="暂无图片" srcset="">
      <img src="static/img/helpImg/14.png" alt="暂无图片" srcset="">
      <img src="static/img/helpImg/15.png" alt="暂无图片" srcset="">
      <p>
        以下为普通员工身份用户的配置<br> 一、 个人信息<br> 二、 生产单查询<br> 三、 计件统计<br> 四、 查询<br> 测试：与主管一致
      </p>
    </div>
  </div>
</template>

<style lang="scss">
p{
   font-size: 23px;
}
  .wrapper {
    /* width: 800px; */
    margin: 30px auto;
    p:nth-child(1){
      color:#5B9BD5;
      font-size: 30px;
    }
     p:nth-child(2) {
      color:rgb(12, 4, 4);
      font-size: 23px;
    }
     p:nth-child(3) {
      color:rgb(12, 4, 4);
      font-size: 23px;
    }
      p:nth-child(4) {
      color:red;
      font-size: 30px;
    }
      p:nth-child(5) {
    color:rgb(12, 4, 4);
      font-size: 23px;
    }
  }
</style>
