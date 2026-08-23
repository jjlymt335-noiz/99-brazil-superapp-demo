export const services = [
  {
    id: 'rides',
    label: 'Corridas',
    title: 'Pra onde vamos?',
    description: 'Escolha o destino e compare as opções de carro.',
    action: 'Informar destino',
    icon: 'car',
    tone: 'yellow',
  },
  {
    id: 'food',
    label: 'Comida',
    title: 'Comida do seu jeito',
    description: 'Encontre restaurantes que entregam no seu endereço.',
    action: 'Ver restaurantes',
    icon: 'food',
    tone: 'coral',
  },
  {
    id: 'delivery',
    label: 'Entrega',
    title: 'O que você quer enviar?',
    description: 'Envie documentos e pequenos pacotes pela cidade.',
    action: 'Escolher entrega',
    icon: 'package',
    tone: 'blue',
  },
  {
    id: 'pay',
    label: '99Pay',
    title: 'Seu dinheiro, em um só lugar',
    description: 'Use Pix, consulte o saldo ou pague uma conta.',
    action: 'Abrir 99Pay',
    icon: 'wallet',
    tone: 'green',
  },
  {
    id: 'moto',
    label: 'Moto',
    title: 'Vá de moto',
    description: 'Uma opção ágil para atravessar a cidade.',
    action: 'Escolher destino',
    icon: 'moto',
    tone: 'yellow',
  },
  {
    id: 'freight',
    label: 'Frete',
    title: 'Leve itens maiores',
    description: 'Escolha o volume da carga e o veículo adequado.',
    action: 'Calcular frete',
    icon: 'truck',
    tone: 'blue',
  },
  {
    id: 'pix',
    label: 'Pix',
    title: 'Pix rápido e seguro',
    description: 'Pague, receba ou leia um QR Code.',
    action: 'Usar Pix',
    icon: 'pix',
    tone: 'green',
  },
  {
    id: 'all',
    label: 'Todos',
    title: 'Todos os serviços',
    description: 'Explore serviços organizados por ir, comer, enviar e pagar.',
    action: 'Explorar serviços',
    icon: 'grid',
    tone: 'ink',
  },
];

export const tabs = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'activity', label: 'Atividades', icon: 'receipt' },
  { id: 'paytab', label: 'Pay', icon: 'wallet' },
  { id: 'profile', label: 'Perfil', icon: 'user' },
];

export const tabScreens = {
  activity: {
    eyebrow: 'Tudo em andamento',
    title: 'Suas atividades',
    description: 'Corridas, pedidos e entregas reunidos em uma única linha do tempo.',
  },
  paytab: {
    eyebrow: '99Pay',
    title: 'Pague do seu jeito',
    description: 'Pix, saldo e contas com o mesmo acesso usado nos outros serviços.',
  },
  profile: {
    eyebrow: 'Sua conta',
    title: 'Preferências e segurança',
    description: 'Endereços, privacidade, ajuda e controles de personalização.',
  },
};

const zhServices = [
  ['rides', '出行', '想去哪里？', '输入目的地并比较不同车型。', '输入目的地'],
  ['food', '外卖', '想吃点什么？', '查看可以送达当前地址的餐厅。', '查看餐厅'],
  ['delivery', '闪送', '需要送什么？', '在城市内配送文件和小件包裹。', '选择配送'],
  ['pay', '99钱包', '资金服务，一处完成', '使用 Pix、查询余额或缴纳账单。', '打开99钱包'],
  ['moto', '摩托', '骑摩托更快出发', '在城市拥堵路段提供更灵活的选择。', '选择目的地'],
  ['freight', '货运', '运送更大的物品', '根据货物体积匹配合适车辆。', '估算运费'],
  ['pix', 'Pix', '快捷、安全的 Pix', '付款、收款或扫描二维码。', '使用 Pix'],
  ['all', '全部', '全部服务', '按照出行、吃饭、配送和支付浏览服务。', '浏览全部服务'],
].map(([id, label, title, description, action]) => ({
  ...services.find((service) => service.id === id), id, label, title, description, action,
}));

const zhTabs = [
  { id: 'home', label: '首页', icon: 'home' },
  { id: 'activity', label: '订单', icon: 'receipt' },
  { id: 'paytab', label: '支付', icon: 'wallet' },
  { id: 'profile', label: '我的', icon: 'user' },
];

const zhTabScreens = {
  activity: { eyebrow: '统一任务状态', title: '我的订单', description: '出行、外卖和配送任务集中在同一条时间线上。' },
  paytab: { eyebrow: '99钱包', title: '选择你的支付方式', description: 'Pix、余额和账单与其他业务共享同一账户。' },
  profile: { eyebrow: '账户设置', title: '偏好与安全', description: '管理地址、隐私、客服和个性化设置。' },
};

export const copy = {
  pt: {
    services,
    tabs,
    tabScreens,
    ui: {
      htmlLang: 'pt-BR', homeTitle: 'O que você precisa agora?', serviceKicker: 'SERVIÇOS',
      currentLocation: 'Local atual', address: 'Av. Paulista, 1578', safety: 'Central de segurança',
      activeKicker: 'EM ANDAMENTO', activeTitle: 'Seu motorista está chegando', minutes: '2 min',
      driver: 'João · Chevrolet Onix', driverNote: 'ABC 1D23 · encontre no portão B',
      benefitKicker: 'SEU BENEFÍCIO', benefit: 'R$ 12 de economia hoje', club: 'Clube99',
      suggestionKicker: 'ATALHO OPCIONAL · PORQUE VOCÊ SALVOU', suggestion: 'Casa fica a 18 min daqui', suggestionAction: 'Usar rota salva →',
      locationAria: 'Alterar endereço atual', dismissAria: 'Dispensar sugestão', demoLabel: 'Português', otherLabel: '中文版本',
    },
  },
  zh: {
    services: zhServices,
    tabs: zhTabs,
    tabScreens: zhTabScreens,
    ui: {
      htmlLang: 'zh-CN', homeTitle: '你现在需要什么？', serviceKicker: '常用服务',
      currentLocation: '当前位置', address: '圣保罗保利斯塔大道 1578号', safety: '安全中心',
      activeKicker: '进行中的任务', activeTitle: '司机即将到达', minutes: '2分钟',
      driver: 'João · 雪佛兰 Onix', driverNote: 'ABC 1D23 · B门见',
      benefitKicker: '你的权益', benefit: '今天已节省 R$ 12', club: 'Clube99',
      suggestionKicker: '辅助建议 · 因为你保存过该地址', suggestion: '预计18分钟到家', suggestionAction: '使用已保存路线 →',
      locationAria: '修改当前地址', dismissAria: '关闭建议', demoLabel: '中文', otherLabel: 'Versão em português',
    },
  },
};

export function getCopy(locale) {
  return copy[locale] ?? copy.pt;
}
