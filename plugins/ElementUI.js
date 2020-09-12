import Vue from 'vue';

import { Button, Input, Carousel, CarouselItem, Message, MessageBox, Dialog, Form, FormItem, Cascader, Pagination, InputNumber } from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Cascader);
Vue.use(Pagination);
Vue.use(InputNumber);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;