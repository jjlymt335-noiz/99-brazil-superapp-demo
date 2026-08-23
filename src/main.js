import './styles.css';
import './i18n.css';
import { getCopy } from './content.js';
import { createInitialState, reduce } from './model.js';

const locale = new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'pt';
const { services, tabs, tabScreens, ui } = getCopy(locale);
const zh = locale === 'zh';
let state = createInitialState();
const icons = { rides:'car', food:'food', delivery:'package', pay:'wallet', moto:'moto', freight:'truck', pix:'pix', all:'grid' };
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const grid = document.querySelector('#service-grid');
const nav = document.querySelector('#bottom-nav');
const sheet = document.querySelector('#sheet');
const sheetContent = document.querySelector('#sheet-content');

document.documentElement.lang = ui.htmlLang;
document.title = zh ? '99巴西超级APP首页概念' : '99 — Tudo o que você precisa';
document.querySelector('.location').ariaLabel = ui.locationAria;
document.querySelector('.location small').textContent = ui.currentLocation;
document.querySelector('.location b').textContent = ui.address;
document.querySelector('.safety').innerHTML = `<span>✦</span> ${ui.safety} <b>24h</b>`;
document.querySelector('.services-section .section-kicker').textContent = ui.serviceKicker;
document.querySelector('.services-section h2').textContent = ui.homeTitle;
document.querySelector('.active-block .section-kicker').textContent = ui.activeKicker;
document.querySelector('.active-block h3').textContent = ui.activeTitle;
document.querySelector('.section-heading > b').textContent = ui.minutes;
document.querySelector('.trip-copy b').textContent = ui.driver;
document.querySelector('.trip-copy small').textContent = ui.driverNote;
document.querySelector('.benefit small').textContent = ui.benefitKicker;
document.querySelector('.benefit b').textContent = ui.benefit;
document.querySelector('.suggestion small').textContent = ui.suggestionKicker;
document.querySelector('.suggestion b').textContent = ui.suggestion;
document.querySelector('.suggestion span').textContent = ui.suggestionAction;
document.querySelector('[data-dismiss]').ariaLabel = ui.dismissAria;
document.querySelectorAll('[data-language-link]').forEach((link) => {
  link.href = zh ? '?lang=pt' : '?lang=zh';
  link.textContent = link.classList.contains('mobile-lang') ? (zh ? 'PT' : '中') : `${ui.otherLabel} →`;
});
if (zh) {
  document.querySelector('.brief .eyebrow').textContent = '超级 APP，不替用户做决定';
  document.querySelector('.brief h1').innerHTML = '所有服务，<br><em>一处完成。</em>';
  document.querySelector('.brief .lead').textContent = '固定业务入口承担用户主动选择，进行中任务优先承接状态，场景建议只在末端提供辅助。';
}

grid.innerHTML = services.map((service) => `<button class="service" data-service="${service.id}" aria-label="${zh ? '打开' : 'Abrir '}${service.label}"><span class="service-icon tone-${service.tone}">${icon(icons[service.id])}</span><span class="service-label">${service.label}</span></button>`).join('');
nav.innerHTML = tabs.map((tab) => `<button data-tab="${tab.id}" aria-label="${tab.label}">${icon(tab.icon)}<span>${tab.label}</span></button>`).join('');

function panelMarkup(id) {
  if (id === 'location') return zh ? `<p class="sheet-kicker">地址</p><h2>你现在在哪里？</h2><button class="sheet-option"><b>⌖ 使用当前位置</b><small>通过 GPS 更新</small></button><button class="sheet-option"><b>家 · Pinheiros</b><small>Rua dos Pinheiros, 980</small></button><button class="sheet-option"><b>公司 · Bela Vista</b><small>可补充入口、照片或地标</small></button>` : `<p class="sheet-kicker">ENDEREÇO</p><h2>Onde você está?</h2><button class="sheet-option"><b>⌖ Usar minha localização</b><small>Atualizar pelo GPS</small></button><button class="sheet-option"><b>Casa · Pinheiros</b><small>Rua dos Pinheiros, 980</small></button><button class="sheet-option"><b>Trabalho · Bela Vista</b><small>Adicionar entrada, foto ou referência</small></button>`;
  if (id === 'trip') return zh ? `<p class="sheet-kicker">进行中的行程</p><h2>João 将在2分钟后到达</h2><div class="driver-detail"><span>JM</span><div><b>白色雪佛兰 Onix</b><small>ABC 1D23 · 评分4.96</small></div></div><button class="primary-action">分享行程</button><button class="secondary-action">联系 João</button>` : `<p class="sheet-kicker">CORRIDA EM ANDAMENTO</p><h2>João chega em 2 min</h2><div class="driver-detail"><span>JM</span><div><b>Chevrolet Onix branco</b><small>ABC 1D23 · nota 4,96</small></div></div><button class="primary-action">Compartilhar viagem</button><button class="secondary-action">Falar com João</button>`;
  if (id === 'benefit') return zh ? `<p class="sheet-kicker">CLUBE99</p><h2>跨业务通用权益</h2><p class="sheet-text">你今天已节省 R$ 12，符合条件的出行、配送和外卖订单均可使用权益。</p><button class="primary-action">查看我的权益</button>` : `<p class="sheet-kicker">CLUBE99</p><h2>Economia que vale em mais serviços</h2><p class="sheet-text">Você economizou R$ 12 hoje. Os benefícios podem ser usados em corridas, entregas e pedidos elegíveis.</p><button class="primary-action">Ver meus benefícios</button>`;
  if (id === 'safety') return zh ? `<p class="sheet-kicker">全天候安全</p><h2>行程由你掌控</h2><button class="sheet-option"><b>分享行程</b><small>将实时路线发送给信任的人</small></button><button class="sheet-option"><b>上车安全码</b><small>上车前确认车辆</small></button><button class="sheet-option"><b>紧急帮助</b><small>行程中快速获得支持</small></button>` : `<p class="sheet-kicker">SEGURANÇA 24H</p><h2>Você no controle da viagem</h2><button class="sheet-option"><b>Compartilhar viagem</b><small>Envie o trajeto a alguém de confiança</small></button><button class="sheet-option"><b>Código de embarque</b><small>Confirme o carro antes de entrar</small></button><button class="sheet-option"><b>Ajuda de emergência</b><small>Acesso rápido durante a corrida</small></button>`;
  const service = services.find((item) => item.id === id) ?? services.at(-1);
  return `<p class="sheet-kicker">${service.label.toUpperCase()}</p><h2>${service.title}</h2><p class="sheet-text">${service.description}</p><button class="primary-action" data-demo-action>${service.action}</button><p class="sheet-note">${zh ? '演示原型不会创建真实订单或交易。' : 'Demonstração: nenhuma solicitação ou transação real será criada.'}</p>`;
}

function openPanel(id) { state = reduce(state, { type:'open-panel', panel:id }); sheetContent.innerHTML = panelMarkup(id); sheet.showModal(); }
function closePanel() { state = reduce(state, { type:'close-panel' }); sheet.close(); }
function setTab(tab) {
  state = reduce(state, { type:'set-tab', tab });
  document.querySelector('[data-screen="home"]').hidden = tab !== 'home';
  const secondary = document.querySelector('[data-screen="secondary"]');
  secondary.hidden = tab === 'home';
  if (tab !== 'home') { const screen = tabScreens[tab]; secondary.innerHTML = `<p class="section-kicker">${screen.eyebrow}</p><h2>${screen.title}</h2><p>${screen.description}</p><div class="empty-visual">${icon(tab === 'activity' ? 'receipt' : tab === 'paytab' ? 'wallet' : 'user')}<b>${zh ? '统一导航交互原型' : 'Protótipo de navegação unificada'}</b><small>${zh ? '返回首页继续体验主要流程。' : 'Volte ao Início para continuar a experiência principal.'}</small></div>`; }
  nav.querySelectorAll('button').forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
}
function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 1800); }
document.addEventListener('click', (event) => {
  const service = event.target.closest('[data-service]'); if (service) return openPanel(service.dataset.service);
  const opener = event.target.closest('[data-open]'); if (opener) return openPanel(opener.dataset.open);
  const tab = event.target.closest('[data-tab]'); if (tab) return setTab(tab.dataset.tab);
  if (event.target.closest('[data-close]')) return closePanel();
  if (event.target.closest('[data-dismiss]')) { state = reduce(state, { type:'dismiss-suggestion' }); document.querySelector('[data-testid="suggestion"]').hidden = true; return toast(zh ? '建议已关闭' : 'Sugestão dispensada'); }
  if (event.target.closest('[data-demo-action]')) { closePanel(); return toast(zh ? '已进入演示流程' : 'Fluxo demonstrativo iniciado'); }
});
sheet.addEventListener('click', (event) => { if (event.target === sheet) closePanel(); });
setTab('home');
