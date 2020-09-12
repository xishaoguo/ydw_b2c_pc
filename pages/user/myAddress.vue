<!-- 我的收货地址 -->
<template>
  <div class="contact-address">
    <div class="title-info">
      我的收货地址
    </div>
    <div v-if="!noProductInfo" class="my-address">
      <ul class="address-list">
        <li v-for="(item,index) of contactList" :key="index">
          <div>
            <div class="address-details">
              <span class="address-name">收货人</span>
              <span>{{ item.toName }}</span>
              <span v-if="item.statusId" class="color-FF7900 font-px12 item-default-mark">默认地址</span>
            </div>
            <div class="address-details">
              <span class="address-name">地区</span>
              <span>{{ item.provinceName }} {{ item.cityName }} {{ item.areaName }}</span>
            </div>
            <div class="address-details">
              <span class="address-name">地址</span>
              <span>{{ item.addressDetail }} </span>
            </div>
            <div class="address-details" style="margin:0px">
              <span class="address-name">手机</span>
              <span>{{ item.phone }} </span>
            </div>
          </div>
          <div class="address-edit">
            <div class="btn-no-border" @click="editeAddress(item)">
              编辑
            </div>
            <div class="btn-no-border" @click="deleteAddress(item.id)">
              删除
            </div>
            <div v-if="!item.statusId" class="btn-no-border" @click="editeAddressDefault(item)">
              设为默认地址
            </div>
          </div>
        </li>
      </ul>
      <div v-if="contactList&&contactList.length>0" class="address-btn">
        <button class="btn-00A47C" @click="addAddress()">
          新增收货地址
        </button>
      </div>
    </div>
    <!-- 无数据 -->
    <div v-else class="no-order">
      <img src="../../assets/img/common/no-order.png" alt="购物车无数据">
      <p>
        <span class="font-px14 color-666">暂无记录，</span>
        <span class="font-px14 color-00A47C" @click="addAddress()">新增收货地址</span>
      </p>
    </div>
    <!-- 新建/编辑地址弹窗 -->
    <el-dialog :title="dialogTitle" width="800px" :visible.sync="dialogFormVisible">
      <el-form :model="contact">
        <el-form-item label="收货人" :label-width="formLabelWidth" required>
          <el-input v-model="contact.toName" type="text" autocomplete="off" maxlength="25" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="所在城市" :label-width="formLabelWidth" required>
          <el-cascader v-model="contact.address" :props="props" placeholder="请选择省/市/区(县)" @change="handleChange" />
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" required>
          <el-input v-model="contact.addressDetail" type="textarea" maxlength="120" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" required>
          <el-input v-model="contact.phoneNum" type="tel" maxlength="11" placeholder="请输入手机号" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div style="display: flex;align-items: center;">
            <img v-if="contact.statusId" src="../../assets/img/common/checkbox.png" alt="选中" @click="changeStatus()">
            <img v-else src="../../assets/img/common/no-checkbox.png" alt="未选中" @click="changeStatus()">
            <span style="margin-left: 8px;">设为默认地址</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="dialog-btn" @click="submit()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findProvCode, getContactList, contactEdit, contactDele } from '~/api/shopping';
export default {
  layout: 'secondPageUser',
  name: 'ContactAddress',
  async asyncData() {
    return {};
  },
  data() {
    return {
      dialogFormVisible: false, // 新建/编辑地址弹框
      formLabelWidth: '80px', // 编辑地址表单标签宽度
      contact: { // 地址表单
        toName: '',
        address: [],
        addressDetail: '',
        phoneNum: '',
        statusId: false,
      },
      dialogTitle: '新增收货地址',
      noProductInfo: false,
      contactList: [],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node;
          setTimeout(() => {
            // 获取地址码
            findProvCode({
              provCode: value
            }).then((res) => {
              const nodes = res.data.map(item => ({
                value: item.provCode,
                label: item.name,
                leaf: level >= 2
              }));
              resolve(nodes);
            });
          }, 100);
        }
      }
    };
  },

  created() {},

  activated() {},

  mounted() {
    this.getContactList();
  },

  methods: {
    // 获取收货地址列表
    getContactList() {
      getContactList({
        index: 1,
        page: 1000
      }).then((res) => {
        if (res.code=='0000') {
          this.contactList = res.data;
        }
        if (this.contactList.length==0) {
          this.noProductInfo = true;
        } else {
          this.noProductInfo = false;
        }
      });
    },
    // 切换是否默认地址状态
    changeStatus() {
      this.contact.statusId =  !this.contact.statusId;
    },
    // 改变地址信息
    handleChange() {
      console.log(this.contact.address);
    },
    // 删除地址
    deleteAddress(id) {
      this.$confirm('确认删除地址？', '删除地址', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButtonClass',
        confirmButtonClass: 'confirmButtonClass',
      }).then(() => {
        contactDele({ id }).then(res => {
          if (res.code=='0000') {
            this.getContactList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 设为默认地址
    editeAddressDefault(item) {
      let { toName, phone, province, city, area, addressDetail } = item;
      this.id = item.id;
      this.contact.toName = toName;
      this.contact.phoneNum = phone;
      this.contact.addressDetail = addressDetail;
      this.contact.statusId = true;
      this.contact.address[0]=province;
      this.contact.address[1]=city;
      this.contact.address[2]=area;
      this.submit();
    },
    // 新建地址
    addAddress() {
      this.dialogTitle='新增收货地址';
      this.id = '';
      this.contact.toName = '';
      this.contact.phoneNum = '';
      this.contact.addressDetail = '';
      this.contact.statusId = false;
      this.contact.address=[];
      this.dialogFormVisible = true;
    },
    // 编辑地址
    editeAddress(item) {
      this.dialogTitle='编辑收货地址';
      let { toName, phone, province, city, area, addressDetail, statusId } = item;
      this.id = item.id;
      this.contact.toName = toName;
      this.contact.phoneNum = phone;
      this.contact.addressDetail = addressDetail;
      this.contact.statusId = statusId;
      this.contact.address[0]=province;
      this.contact.address[1]=city;
      this.contact.address[2]=area;
      this.dialogFormVisible = true;
    },
    // 添加/编辑联系人
    submit() {
      let { toName, phoneNum, addressDetail, statusId } = this.contact, province='', city='', area='';
      const regPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!toName) {
        this.$message({
          message: '请输入收货人',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!this.contact.address || this.contact.address.length==0) {
        this.$message({
          message: '请选择所在城市',
          type: 'error',
          duration: 1500
        });
        return;
      } else {
        province=this.contact.address[0];
        city=this.contact.address[1];
        area=this.contact.address[2];
      }
      if (!addressDetail) {
        this.$message({
          message: '请输入详细地址',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!phoneNum) {
        this.$message({
          message: '请输入手机号码',
          type: 'error',
          duration: 1500
        });
        return;
      } else if (!regPhone.test(phoneNum)) {
        this.$message({
          message: '请输入正确手机号码',
          type: 'error',
          duration: 1500
        });
        return;
      }
      let url, params;

      if (this.id) { // 编辑
        url = '/user/contact/edit';
        params = { id: Number(this.id), toName, phoneNum, province, city, area, addressDetail, statusId };
      } else { // 添加
        url = '/user/contact/save',
        params = { toName, phoneNum, province, city, area, addressDetail, statusId: this.contact.statusId?'1':'0' };
      }
      contactEdit(url, params).then(res => {
        if (res.code == '0000') {
          let msg = '';
          if (this.id) {
            msg = '地址编辑成功';
          } else {
            msg = '地址添加成功';
          }
          this.dialogFormVisible = false;
          this.getContactList();
          this.$message({
            message: msg,
            type: 'success',
            duration: 1500
          });
        }
      });
    },
  }
};

</script>
<style>
/* 覆盖 dialog 样式 */
.contact-address .el-dialog__title{
  font-size:16px !important;
  color:rgba(0,0,0,0.85) !important;
  line-height:24px !important;
}
.contact-address .el-dialog__body{
  width: 500px;
  margin: 0 auto;
}
.contact-address .el-form-item__label{
  color: #333333;
}
.contact-address .el-textarea__inner{
  height: 80px;
}
.contact-address .el-cascader{
  width: 100%;
}
.contact-address .dialog-footer{
  text-align: center;
}
.contact-address .dialog-btn{
  width:160px;
  height:40px;
  background:#00A47C;
  font-size:16px;
  font-weight:500;
  border: 1px solid #00A47C;
}
</style>
<style  scoped lang="scss">
.contact-address{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.title-info{
    font-size: 20px;
    line-height: 28px;
    color: #666666;
    padding-bottom: 20px;
}
.my-address{
  width: 100%;
  padding: 20px;
  background: #FFFFFF;
  ul{
    li{
      border:1px dashed #D9D9D9;
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .address-details{
        display: flex;
        font-size: 14px;
        margin-bottom: 10px;
        word-break: break-all;
        padding-right: 50px;
      }
      .address-name{
        width: 42px;
        margin-right: 40px;
        color: #999999;
        flex-shrink: 0;
        text-align-last: justify;
        text-align: justify;
        text-justify: distribute-all-lines;
      }
      .address-edit{
        display: flex;
        flex-shrink: 0;
        div{
          padding: 0px 8px;
          border-left: 1px solid #E9E9E9;
          line-height: 14px;
          &:first-child{
            border: 0;
          }
        }
      }
    }
  }
  .address-btn{
    text-align: right;
    padding: 10px 0px;
  }
}
//默认地址
.item-default-mark{
    padding: 0px 5px;
    line-height: 18px;
    background: rgba(255, 121, 0, 0.2);
    border-radius: 2px;
    text-align: center;
    text-shadow: 0px 6px 12px rgba(74, 35, 0, 0.1);
    font-size: 12px;
    margin-left: 8px;
}
// 无数据
.no-order{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  flex: 1;
  img{
    width: 145px;
    height: 190px;
    margin-right: 30px;
  }
}
</style>