
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Activity, TrendingUp, BrainCircuit, ShieldCheck, BookOpen,
  BarChart3, PieChart, AlertTriangle, BriefcaseBusiness, Settings, Search,
  Bell, Moon, Maximize, CalendarDays, Filter, FileText, Clock3, Users,
  Cpu, User, ChevronDown, Download, FileDown, Presentation, FileSpreadsheet,
  Database, WandSparkles, SlidersHorizontal, RefreshCw, Play, Bot, Zap,
  CheckCircle2, Layers, GitBranch, Sparkles, Upload, Share2, Eye,
  Plus, FolderOpen, Pencil, Save, MoreVertical, ArrowLeft, ArrowRight,
  PanelRightOpen, Copy, Trash2, Globe2, Shield, Link as LinkIcon, Table2,
  Server, Lock, KeyRound, UserCog, Mail, Archive, Target, Gauge, Radar,
  Flame, Route, Map, ListChecks, Workflow, Briefcase, Building2, Network,
  Bug, Wrench, ClipboardCheck, ClipboardList, MonitorCheck, Boxes, Timer,
  CircleDollarSign, HardDrive, Cloud, Code2, BookMarked, Megaphone, Send,
  Power, RotateCcw, Webhook, Plug, ScanSearch, BadgeCheck
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  AreaChart, Area, BarChart, Bar, PieChart as RPieChart, Pie, Cell,
  ComposedChart, ReferenceLine, RadialBarChart, RadialBar
} from 'recharts';
import './styles/global.css';

type Page =
  | 'dashboard' | 'operacao' | 'forecast' | 'books' | 'sai' | 'governanca'
  | 'analytics' | 'executive' | 'alertas' | 'projetos' | 'administracao' | 'configuracoes';

type ForecastTab = 'visao' | 'volume' | 'backlog' | 'sla' | 'recursos' | 'projetos' | 'cenarios' | 'simulacoes';
type OperationTab = 'visao' | 'chamados' | 'incidentes' | 'problemas' | 'mudancas' | 'requisicoes' | 'base';
type GenericTab = 'visao' | 'indicadores' | 'automacoes' | 'riscos' | 'relatorios';

const colors = ['#11a8ff','#16e0bd','#f6c84c','#ff9f1c','#8957ff','#ff4d5e','#20e074','#82aaff'];

const forecastData = [
  { mes:'Mai/25', realizado:18500, previsto:18500, minimo:18500, maximo:18500, backlog:2870, capacidade:4000, sla:92.8, recursos:88, risco:28, resolvidos:15100, incidentes:780, problemas:120, mudancas:240 },
  { mes:'Jun/25', realizado:22000, previsto:24500, minimo:23000, maximo:26300, backlog:3420, capacidade:4050, sla:91.4, recursos:89, risco:45, resolvidos:17800, incidentes:930, problemas:148, mudancas:310 },
  { mes:'Jul/25', realizado:26000, previsto:28540, minimo:25200, maximo:31700, backlog:4870, capacidade:4100, sla:89.2, recursos:91, risco:65, resolvidos:19400, incidentes:1120, problemas:190, mudancas:390 },
  { mes:'Ago/25', realizado:null, previsto:32600, minimo:28500, maximo:37100, backlog:5680, capacidade:4150, sla:86.5, recursos:92, risco:72, resolvidos:22100, incidentes:1320, problemas:240, mudancas:430 },
  { mes:'Set/25', realizado:null, previsto:35100, minimo:30900, maximo:40300, backlog:5240, capacidade:4200, sla:87.8, recursos:94, risco:48, resolvidos:24600, incidentes:1180, problemas:205, mudancas:460 },
  { mes:'Out/25', realizado:null, previsto:38200, minimo:33100, maximo:43100, backlog:4910, capacidade:4300, sla:89.5, recursos:96, risco:33, resolvidos:27100, incidentes:1050, problemas:170, mudancas:510 },
];

const categories = [
  { categoria:'Infraestrutura', volume:12450, perc:43.7, tendencia:18.2, risco:'Alto' },
  { categoria:'Sistemas', volume:7260, perc:25.5, tendencia:12.4, risco:'Médio' },
  { categoria:'Aplicações', volume:4980, perc:17.5, tendencia:8.7, risco:'Médio' },
  { categoria:'Acessos', volume:2350, perc:8.2, tendencia:-3.1, risco:'Baixo' },
  { categoria:'Serviços', volume:1500, perc:5.3, tendencia:-5.6, risco:'Baixo' },
];

const tickets = [
  ['INC-84231','Serviço indisponível para usuários','Infraestrutura','Alta','23/05/2025 08:42','SLA 90%','Em andamento'],
  ['CHM-56021','Falha ao salvar documento','Sistemas','Alta','23/05/2025 08:30','SLA 85%','Em andamento'],
  ['CHM-88765','Lentidão no sistema de relatórios','Aplicações','Média','23/05/2025 09:15','SLA 72%','Em andamento'],
  ['CHM-33120','Erro ao gerar relatório','Aplicações','Média','23/05/2025 07:50','SLA 65%','Aguardando'],
  ['CHM-77891','Solicitação de novo acesso','Acessos','Baixa','23/05/2025 07:30','SLA 85%','Novo'],
];

const drivers = [
  { nome:'Projetos Estratégicos', impacto:32.8 },
  { nome:'Mudanças Programadas', impacto:18.4 },
  { nome:'Sazonalidade', impacto:15.6 },
  { nome:'Campanhas / Promoções', impacto:9.7 },
  { nome:'Mudanças Tecnológicas', impacto:7.2 },
  { nome:'Fatores Externos', impacto:3.1 },
];

const scenarios = [
  { nome:'Atual (Sem Ação)', backlog:4870, sla:89.2, custo:'R$ 0', risco:'Alto', tag:'Base' },
  { nome:'Reforço de Equipe +15%', backlog:2980, sla:93.1, custo:'R$ 42k', risco:'Médio', tag:'Impacto alto' },
  { nome:'Otimização de Processos', backlog:3420, sla:91.0, custo:'R$ 18k', risco:'Médio', tag:'Custo baixo' },
  { nome:'Reforço + Otimização', backlog:2150, sla:95.2, custo:'R$ 55k', risco:'Baixo', tag:'Recomendado' },
];

const heatRows = ['Mai/25','Jun/25','Jul/25','Ago/25','Set/25','Out/25'];
const heatCols = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
const heat = [
  [22,34,46,43,36,18,12],
  [35,48,58,62,54,29,17],
  [56,63,72,76,69,38,22],
  [70,78,86,82,75,42,25],
  [50,58,67,63,55,30,19],
  [28,35,42,39,34,20,14],
];

const bookPages = [
  { title:'Capa Executiva', subtitle:'Resumo Executivo Maio/2025', type:'cover', content:'Visão executiva automatizada da operação CyberOne.' },
  { title:'Mensagem Executiva', subtitle:'Síntese para diretoria', type:'text', content:'A operação apresentou evolução consistente, com aumento no volume previsto, melhoria no SLA global e pontos de atenção relacionados ao backlog e capacidade de infraestrutura.' },
  { title:'Indicadores Principais', subtitle:'KPIs essenciais', type:'kpis', content:'Total de chamados, SLA, MTTR, backlog e forecast.' },
  { title:'Forecast & Tendências', subtitle:'Próximos 6 meses', type:'chart', content:'Previsão de crescimento operacional.' },
  { title:'Riscos e Alertas', subtitle:'Pontos críticos', type:'risks', content:'SLA em risco, backlog acima do esperado e necessidade de redistribuição de equipe.' },
  { title:'Recomendações IA', subtitle:'Ações sugeridas', type:'recommendations', content:'Reforçar equipe, otimizar processos e automatizar análise de chamados.' },
];

const books = [
  { name:'Resumo Executivo', pages:12, status:'Concluído', owner:'Sistema IA', color:'#11a8ff', icon:FileText },
  { name:'Indicadores Operacionais', pages:24, status:'Atualizado', owner:'Operação', color:'#20e074', icon:BarChart3 },
  { name:'Forecast & Tendências', pages:18, status:'Em revisão', owner:'Forecast IA', color:'#16e0bd', icon:TrendingUp },
  { name:'Projetos & Demandas', pages:20, status:'Rascunho', owner:'PMO', color:'#f6c84c', icon:BriefcaseBusiness },
  { name:'Governança & Compliance', pages:16, status:'Concluído', owner:'Governança', color:'#8957ff', icon:ShieldCheck },
];

function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const items: [Page,string,React.ReactNode,string[]?][] = [
    ['dashboard','Dashboard',<LayoutDashboard size={18}/>],
    ['operacao','Operação',<Activity size={18}/>,['Visão Geral','Chamados','Incidentes','Problemas','Mudanças','Requisições','Base de Conhecimento']],
    ['forecast','Forecast',<TrendingUp size={18}/>,['Visão Geral','Volume','Backlog','SLA','Recursos','Projetos','Cenários','Simulações']],
    ['books','Books',<BookOpen size={18}/>,['Meus Books','Biblioteca','Modelos','Automações']],
    ['sai','SAI - Agentes IA',<BrainCircuit size={18}/>,['Agentes','Anomalias','Recomendações','Treinamento']],
    ['governanca','Governança',<ShieldCheck size={18}/>,['Compliance','Políticas','Auditoria','Riscos']],
    ['analytics','Analytics',<BarChart3 size={18}/>,['Performance','Drilldown','Cruzamentos','Relatórios']],
    ['executive','Executive',<PieChart size={18}/>,['Resumo','Diretoria','Decisões','OKRs']],
    ['alertas','Alertas',<AlertTriangle size={18}/>,['Críticos','SLA','Backlog','Capacidade']],
    ['projetos','Projetos',<BriefcaseBusiness size={18}/>,['Portfólio','Roadmap','Demandas','Impacto']],
    ['administracao','Administração',<UserCog size={18}/>,['Usuários','Permissões','Integrações','Ambientes']],
    ['configuracoes','Configurações',<Settings size={18}/>,['Tema','Segurança','Notificações','Preferências']],
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="orb"><Cpu size={29}/></div>
        <div><h1>CYBERONE</h1><p>INTELIGÊNCIA OPERACIONAL</p></div>
      </div>
      <nav>
        {items.map(([key,label,icon,subs]) => (
          <div key={key}>
            <button onClick={() => setPage(key)} className={page === key ? 'active' : ''}>
              {icon}<span>{label}</span>{key === 'alertas' && <em>12</em>}<ChevronDown size={14}/>
            </button>
            {page === key && subs && <div className="subnav">{subs.map((s,i) => <button key={s} className={i===0 ? 'sub-on' : ''}>{s}</button>)}</div>}
          </div>
        ))}
      </nav>
      <div className="profile"><div className="avatar"><User size={22}/></div><div><strong>Olá, Gestor</strong><p>Administrador</p></div></div>
    </aside>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="header">
      <div><h2>{title}</h2><p>{subtitle}</p></div>
      <div className="header-actions">
        <div className="search"><Search size={17}/><span>Buscar módulos, indicadores, relatórios...</span><kbd>Ctrl + K</kbd></div>
        <Bell size={20}/><Moon size={20}/><Maximize size={20}/>
        <button><CalendarDays size={16}/>Maio/2025</button>
        <button><Filter size={16}/>Filtros</button>
      </div>
    </header>
  );
}

function Kpi({ icon, label, value, trend, color = '#11a8ff', bad = false }: any) {
  return (
    <motion.div className="kpi" whileHover={{ y: -4 }} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}>
      <div className="kpi-head">
        <div className="kpi-icon" style={{ color, boxShadow:`0 0 28px ${color}55` }}>{icon}</div>
        <div><p>{label}</p><h3>{value}</h3><span className={bad ? 'bad' : 'good'}>{trend}</span></div>
      </div>
      <ResponsiveContainer width="100%" height={48}><LineChart data={forecastData}><Line dataKey="previsto" stroke={color} strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
    </motion.div>
  );
}

function Panel({ title, subtitle, children, className = '', action }: any) {
  return <section className={`panel ${className}`}><div className="panel-head"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>;
}

function Tag({ children, tone='blue' }: any) {
  return <span className={`tag ${tone}`}>{children}</span>
}

function MiniPie() {
  const data = categories.map(c => ({ name: c.categoria, value: c.perc }));
  return (
    <div className="pie-wrap">
      <ResponsiveContainer width="52%" height={220}><RPieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={2}>{data.map((_,i) => <Cell key={i} fill={colors[i]}/>)}</Pie><Tooltip/></RPieChart></ResponsiveContainer>
      <div className="legend">{data.map((d,i) => <div key={d.name}><span style={{background:colors[i]}}></span><b>{d.name}</b><em>{d.value}%</em></div>)}</div>
    </div>
  );
}

function ForecastLine({ mode = 'volume' }: { mode?: string }) {
  const key = mode === 'backlog' ? 'backlog' : mode === 'sla' ? 'sla' : 'previsto';
  const stroke = mode === 'backlog' ? '#f6c84c' : mode === 'sla' ? '#20e074' : '#11a8ff';
  return (
    <ResponsiveContainer width="100%" height={310}>
      <ComposedChart data={forecastData}>
        <defs><linearGradient id={`area-${mode}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={stroke} stopOpacity={0.38}/><stop offset="95%" stopColor={stroke} stopOpacity={0}/></linearGradient></defs>
        <CartesianGrid stroke="#19304a"/><XAxis dataKey="mes" stroke="#8ba5c0"/><YAxis stroke="#8ba5c0"/><Tooltip/>
        <ReferenceLine x="Jul/25" stroke="#ffffff55" label={{ value:'Hoje', fill:'#cde5ff', position:'top' }}/>
        {mode === 'volume' && <Area dataKey="maximo" stroke="none" fill="#11a8ff12"/>}
        {mode === 'volume' && <Line dataKey="realizado" stroke="#20e074" strokeWidth={3} dot={{ r:4 }}/>}
        <Area dataKey={key} stroke={stroke} fill={`url(#area-${mode})`} strokeWidth={3}/>
        {mode === 'volume' && <Line dataKey="minimo" stroke="#11a8ff" strokeDasharray="4 4" dot={false}/>}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

function Insights({ title='Insights Inteligentes' }: { title?: string }) {
  const insights = [
    ['Aumento de 15,3%', 'no volume previsto para os próximos 30 dias.', '#11a8ff'],
    ['Risco alto de sobrecarga', 'em Ago/25, principalmente na Infraestrutura.', '#ff4d5e'],
    ['SLA abaixo da meta', 'previsto a partir de Jul/25.', '#f6c84c'],
    ['Reforço recomendado', 'equipe +15% reduz backlog em 38,8%.', '#20e074'],
  ];
  return (
    <Panel title={title} subtitle="Gerados por IA">
      <div className="insights">{insights.map(([t,d,c]) => <div key={t}><Sparkles style={{ color:c }}/><div><strong>{t}</strong><p>{d}</p></div></div>)}</div>
      <button className="full-btn"><Bot size={16}/> Ver todos os insights</button>
    </Panel>
  );
}

function CategoryTable() {
  return (
    <table className="data-table">
      <thead><tr><th>Categoria</th><th>Volume</th><th>% Total</th><th>Tendência</th><th>Risco</th></tr></thead>
      <tbody>{categories.map(c => <tr key={c.categoria}><td>{c.categoria}</td><td>{c.volume.toLocaleString('pt-BR')}</td><td>{c.perc}%</td><td className={c.tendencia > 0 ? 'bad' : 'good'}>{c.tendencia > 0 ? '↑' : '↓'} {Math.abs(c.tendencia)}%</td><td><Tag tone={c.risco === 'Alto' ? 'red' : c.risco === 'Médio' ? 'yellow' : 'green'}>{c.risco}</Tag></td></tr>)}</tbody>
    </table>
  );
}

function TicketTable() {
  return (
    <table className="data-table">
      <thead><tr><th>ID</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Abertura</th><th>SLA</th><th>Status</th></tr></thead>
      <tbody>{tickets.map(t => <tr key={t[0]}>{t.map((x,i) => <td key={i}>{i===3?<Tag tone={x==='Alta'?'red':x==='Média'?'yellow':'green'}>{x}</Tag>:i===6?<Tag>{x}</Tag>:x}</td>)}</tr>)}</tbody>
    </table>
  );
}

function Drivers() {
  return <div className="drivers">{drivers.map((d,i) => <div key={d.nome}><span>{d.nome}</span><div><em style={{ width:`${d.impacto * 2.2}%`, background:colors[i] }}></em></div><b>+{d.impacto}%</b></div>)}</div>;
}

function ScenarioCards() {
  return (
    <div className="scenario-grid">{scenarios.map((s,i) => (
      <motion.div key={s.nome} whileHover={{ y:-6 }} className={s.tag === 'Recomendado' ? 'scenario recommended' : 'scenario'}>
        <div className="scenario-top"><span style={{ background: colors[i] }}></span><strong>{s.nome}</strong><em>{s.tag}</em></div>
        <div className="scenario-metrics"><div><b>{s.backlog.toLocaleString('pt-BR')}</b><small>Backlog</small></div><div><b>{s.sla}%</b><small>SLA</small></div><div><b>{s.custo}</b><small>Custo</small></div></div>
        <div className="scenario-footer"><Tag tone={s.risco === 'Alto' ? 'red' : s.risco === 'Médio' ? 'yellow' : 'green'}>Risco {s.risco}</Tag><button><Play size={14}/> Simular</button></div>
      </motion.div>
    ))}</div>
  );
}

function Heatmap() {
  return <div className="heatmap"><div></div>{heatCols.map(c => <b key={c}>{c}</b>)}{heatRows.map((r,i) => <React.Fragment key={r}><b>{r}</b>{heat[i].map((v,j) => <span key={j} className={v > 75 ? 'hot' : v > 55 ? 'warm' : v > 35 ? 'med' : 'cold'}></span>)}</React.Fragment>)}</div>;
}

function RiskRings() {
  return <div className="rings">{forecastData.map((d,i) => <div key={d.mes} className="ring-card"><div className={`ring r${i}`}>{d.risco}%</div><strong>{d.mes}</strong><Tag tone={d.risco > 65 ? 'red' : d.risco > 40 ? 'yellow' : 'green'}>{d.risco > 65 ? 'Alto' : d.risco > 40 ? 'Médio' : 'Baixo'}</Tag></div>)}</div>;
}

function ExportActions() {
  const actions = [['Relatório PDF',FileDown,'#ff4d5e'],['Apresentação PPT',Presentation,'#ff9f1c'],['Planilha Excel',FileSpreadsheet,'#20e074'],['Dados CSV',Database,'#8957ff'],['Enviar Book',Share2,'#16e0bd'],['Atualizar Dados',RefreshCw,'#11a8ff']];
  return <div className="export-grid">{actions.map(([label,Icon,color]: any) => <motion.button key={label} whileHover={{ y:-4 }} style={{ '--accent':color } as React.CSSProperties}><Icon size={25}/><span>{label}</span></motion.button>)}</div>;
}

function SimulationPanel() {
  const [team,setTeam] = useState(15), [automation,setAutomation] = useState(30), [demand,setDemand] = useState(12);
  const backlog = Math.max(1200, Math.round(4870 - team * 85 - automation * 28 + demand * 70));
  const sla = Math.min(98, Math.round((89.2 + team * 0.12 + automation * 0.06 - demand * 0.08) * 10) / 10);
  return (
    <Panel title="Simulador Inteligente" subtitle="Altere variáveis e veja o impacto previsto" className="span-2">
      <div className="simulator"><div className="sliders"><label>Reforço de equipe: <b>{team}%</b><input type="range" min="0" max="40" value={team} onChange={e => setTeam(Number(e.target.value))}/></label><label>Automação de processos: <b>{automation}%</b><input type="range" min="0" max="60" value={automation} onChange={e => setAutomation(Number(e.target.value))}/></label><label>Aumento de demanda: <b>{demand}%</b><input type="range" min="0" max="30" value={demand} onChange={e => setDemand(Number(e.target.value))}/></label></div><div className="sim-results"><div><strong>{backlog.toLocaleString('pt-BR')}</strong><span>Backlog projetado</span></div><div><strong>{sla}%</strong><span>SLA projetado</span></div><div><strong>{backlog < 2500 ? 'Baixo' : backlog < 4000 ? 'Médio' : 'Alto'}</strong><span>Risco operacional</span></div></div></div>
    </Panel>
  );
}

function ForecastPage() {
  const [tab,setTab] = useState<ForecastTab>('visao');
  const tabs: [ForecastTab,string,any][] = [['visao','Visão Geral',Eye],['volume','Volume',TrendingUp],['backlog','Backlog',Layers],['sla','SLA',ShieldCheck],['recursos','Recursos',Users],['projetos','Projetos',BriefcaseBusiness],['cenarios','Cenários',GitBranch],['simulacoes','Simulações',SlidersHorizontal]];
  return (
    <>
      <Header title="Forecast" subtitle="Previsões, tendências e simulações para tomada de decisão estratégica"/>
      <main className="content">
        <div className="tabs">{tabs.map(([key,label,Icon]) => <button key={key} onClick={() => setTab(key)} className={tab===key?'selected':''}><Icon size={16}/>{label}</button>)}</div>
        {tab === 'visao' && <ForecastOverview/>}
        {tab === 'volume' && <div className="grid"><Panel className="span-2" title="Volume Previsto"><ForecastLine mode="volume"/></Panel><Panel title="Previsão por Categoria" className="span-2"><CategoryTable/></Panel><Panel title="Calendário de Picos"><Heatmap/></Panel></div>}
        {tab === 'backlog' && <div className="grid"><Panel className="span-2" title="Forecast de Backlog"><ForecastLine mode="backlog"/></Panel><Panel title="Backlog por Cenário" className="span-2"><ScenarioCards/></Panel><Panel title="Drivers"><Drivers/></Panel></div>}
        {tab === 'sla' && <div className="grid"><Panel className="span-2" title="Projeção de SLA"><ForecastLine mode="sla"/></Panel><Insights title="Riscos de SLA"/><Panel title="Probabilidade de Violação" className="span-2"><RiskRings/></Panel></div>}
        {tab === 'recursos' && <ResourcePanels/>}
        {tab === 'projetos' && <ProjectPanels/>}
        {tab === 'cenarios' && <div className="grid"><Panel className="span-2" title="Cenários comparativos"><ScenarioCards/></Panel><SimulationPanel/><Insights title="Recomendação IA"/></div>}
        {tab === 'simulacoes' && <div className="grid"><SimulationPanel/><Panel title="Cenários salvos" className="span-2"><ScenarioCards/></Panel><Panel title="Exportações"><ExportActions/></Panel></div>}
      </main>
    </>
  );
}

function ForecastOverview() {
  return (
    <>
      <div className="kpi-grid five">
        <Kpi icon={<FileText/>} label="Volume Previsto" value="28.540" trend="+15,3% vs período atual"/>
        <Kpi icon={<Layers/>} label="Backlog Previsto" value="4.870" trend="+22,8% vs período atual" color="#8957ff" bad/>
        <Kpi icon={<ShieldCheck/>} label="SLA Previsto" value="89,2%" trend="-3,6 p.p. vs período atual" color="#20e074" bad/>
        <Kpi icon={<Clock3/>} label="MTTR Previsto" value="5h 48m" trend="+8,7% vs período atual" color="#f6c84c" bad/>
        <Kpi icon={<Users/>} label="Aderência de Recursos" value="91,4%" trend="+4,2 p.p. vs período atual" color="#16e0bd"/>
      </div>
      <div className="grid">
        <Panel title="Previsão de Volume de Chamados" subtitle="Próximos 6 meses com intervalo de confiança" className="span-2"><ForecastLine mode="volume"/></Panel>
        <Panel title="Previsão de Backlog"><ForecastLine mode="backlog"/></Panel>
        <Panel title="Projeção de SLA"><ForecastLine mode="sla"/></Panel>
        <Insights title="Insights do Forecast"/>
        <Panel title="Previsão por Categoria" className="span-2"><CategoryTable/></Panel>
        <Panel title="Cenários de Simulação" className="span-2"><ScenarioCards/></Panel>
        <Panel title="Drivers de Influência"><Drivers/></Panel>
        <Panel title="Tendência de Sobrecarga" className="span-2"><RiskRings/></Panel>
        <Panel title="Calendário de Picos"><Heatmap/></Panel>
        <Panel title="Exportar Forecast"><ExportActions/></Panel>
      </div>
    </>
  );
}

function OperationPage() {
  const [tab,setTab] = useState<OperationTab>('visao');
  const tabs: [OperationTab,string,any][] = [['visao','Visão Geral',Eye],['chamados','Chamados',FileText],['incidentes','Incidentes',AlertTriangle],['problemas','Problemas',Bug],['mudancas','Mudanças',GitBranch],['requisicoes','Requisições',ClipboardList],['base','Base de Conhecimento',BookMarked]];
  return (
    <>
      <Header title="Operação" subtitle="Gestão operacional em tempo real: chamados, incidentes, problemas, mudanças e requisições"/>
      <main className="content">
        <div className="tabs">{tabs.map(([key,label,Icon]) => <button key={key} onClick={() => setTab(key)} className={tab===key?'selected':''}><Icon size={16}/>{label}</button>)}</div>
        <div className="kpi-grid five">
          <Kpi icon={<FileText/>} label="Total de Chamados" value="24.752" trend="+12,5%"/>
          <Kpi icon={<AlertTriangle/>} label="Incidentes" value="1.120" trend="+8,2%" color="#ff4d5e" bad/>
          <Kpi icon={<Bug/>} label="Problemas" value="190" trend="+4,8%" color="#f6c84c" bad/>
          <Kpi icon={<GitBranch/>} label="Mudanças" value="390" trend="+10,4%" color="#8957ff"/>
          <Kpi icon={<ShieldCheck/>} label="SLA Operação" value="92,8%" trend="+4,3 p.p." color="#16e0bd"/>
        </div>
        {tab === 'visao' && <div className="grid"><Panel className="span-2" title="Evolução Operacional"><ResponsiveContainer width="100%" height={310}><LineChart data={forecastData}><CartesianGrid stroke="#19304a"/><XAxis dataKey="mes" stroke="#8ba5c0"/><YAxis stroke="#8ba5c0"/><Tooltip/><Line dataKey="previsto" stroke="#11a8ff" strokeWidth={3}/><Line dataKey="resolvidos" stroke="#20e074" strokeWidth={3}/><Line dataKey="incidentes" stroke="#ff4d5e" strokeWidth={3}/></LineChart></ResponsiveContainer></Panel><Panel title="Chamados por Categoria"><MiniPie/></Panel><Insights/><Panel title="Chamados Abertos" className="span-2"><TicketTable/></Panel><Panel title="Backlog por Faixa"><BacklogBars/></Panel><Panel title="Atalhos Operacionais"><ActionGrid type="operation"/></Panel></div>}
        {tab !== 'visao' && <OperationDetail tab={tab}/>}
      </main>
    </>
  );
}

function OperationDetail({ tab }: { tab: OperationTab }) {
  const title: any = { chamados:'Chamados', incidentes:'Incidentes', problemas:'Problemas', mudancas:'Mudanças', requisicoes:'Requisições', base:'Base de Conhecimento' };
  return <div className="grid"><Panel className="span-2" title={`Evolução de ${title[tab]}`}><ForecastLine mode="volume"/></Panel><Panel title={`Lista de ${title[tab]}`} className="span-2"><TicketTable/></Panel><Panel title="Distribuição"><MiniPie/></Panel><Panel title="Ações rápidas"><ActionGrid type="operation"/></Panel></div>;
}

function BacklogBars() {
  const data = [{f:'0 - 7 dias',v:1245},{f:'8 - 15 dias',v:986},{f:'16 - 30 dias',v:673},{f:'31 - 60 dias',v:312},{f:'+ 60 dias',v:156}];
  return <ResponsiveContainer width="100%" height={250}><BarChart layout="vertical" data={data}><XAxis type="number" stroke="#8ba5c0"/><YAxis dataKey="f" type="category" stroke="#8ba5c0" width={90}/><Tooltip/><Bar dataKey="v" fill="#11a8ff" radius={[0,8,8,0]}/></BarChart></ResponsiveContainer>;
}

function ResourcePanels() {
  return <div className="grid"><Panel className="span-2" title="Capacidade de Recursos"><ResponsiveContainer width="100%" height={320}><BarChart data={forecastData}><CartesianGrid stroke="#19304a"/><XAxis dataKey="mes" stroke="#8ba5c0"/><YAxis stroke="#8ba5c0"/><Tooltip/><Bar dataKey="recursos" fill="#16e0bd" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></Panel><Panel title="Aderência"><Drivers/></Panel><Insights title="Recomendação"/><Panel title="Times críticos" className="span-2"><TeamCards/></Panel></div>
}

function ProjectPanels() {
  return <div className="grid"><Panel className="span-2" title="Impacto de Projetos Estratégicos"><Drivers/></Panel><Panel title="Volume por Projeto" className="span-2"><CategoryTable/></Panel><Panel title="Risco por Mês"><RiskRings/></Panel><Panel title="Roadmap"><Roadmap/></Panel></div>
}

function TeamCards() {
  return <div className="card-grid">{['N1 Service Desk','N2 Infraestrutura','Sistemas ERP','Cloud & Network'].map((t,i)=><div className="mini-card" key={t}><Users style={{color:colors[i]}}/><strong>{t}</strong><p>Capacidade: {92-i*4}%</p><Tag tone={i<2?'yellow':'green'}>{i<2?'Atenção':'Estável'}</Tag></div>)}</div>
}

function Roadmap() {
  return <div className="timeline">{['Integração de Dados','Motor Forecast','Book Automático','Agentes IA','Governança Final'].map((t,i)=><div key={t}><span>{i+1}</span><strong>{t}</strong><p>{['Mai','Jun','Jul','Ago','Set'][i]}/2025</p></div>)}</div>
}

function ActionGrid({ type='default' }: { type?: string }) {
  const actions = type === 'operation'
    ? [['Novo Chamado',Plus],['Registrar Incidente',AlertTriangle],['Solicitar Mudança',GitBranch],['Base de Conhecimento',BookMarked],['Relatório Operacional',FileDown],['Atualizar Dados',RefreshCw]]
    : [['Gerar Book',WandSparkles],['Exportar PDF',FileDown],['Enviar',Send],['Automatizar',Bot],['Configurar',SlidersHorizontal],['Atualizar',RefreshCw]];
  return <div className="action-grid">{actions.map(([label,Icon]: any,i)=><motion.button key={label} whileHover={{y:-4}}><Icon style={{color:colors[i%colors.length]}}/><span>{label}</span></motion.button>)}</div>
}

function BookShelf() {
  return <div className="book-shelf">{books.map((book) => { const Icon = book.icon; return <motion.div key={book.name} whileHover={{ y:-8, rotateY:-8 }} className="book-item" style={{ borderColor: book.color }}><div className="spine" style={{ background: book.color }}></div><Icon size={26} style={{ color: book.color }}/><strong>{book.name}</strong><p>{book.owner}</p><span>{book.pages} páginas</span><em>{book.status}</em></motion.div> })}</div>;
}

function BooksPage() {
  const [tab,setTab] = useState<'meus'|'biblioteca'|'modelos'|'automacoes'>('meus');
  const [bookPage,setBookPage] = useState(0);
  const [mode,setMode] = useState<'leitura'|'edicao'>('leitura');
  const [openRight,setOpenRight] = useState(true);
  const current = bookPages[bookPage];
  const next = () => setBookPage(p => Math.min(p+1, bookPages.length-1));
  const prev = () => setBookPage(p => Math.max(p-1, 0));

  return (
    <>
      <Header title="Books Inteligentes" subtitle="Relatórios executivos automatizados, interativos e gerados com IA"/>
      <main className="content books-page">
        <div className="books-top"><div className="tabs mini">{[['meus','Meus Books',BookOpen],['biblioteca','Biblioteca',FolderOpen],['modelos','Modelos',Layers],['automacoes','Automações',Bot]].map(([key,label,Icon]: any)=><button key={key} onClick={()=>setTab(key)} className={tab===key?'selected':''}><Icon size={17}/>{label}</button>)}</div><div className="book-actions"><button><Plus size={17}/>Novo Book</button><button><WandSparkles size={17}/>Gerar com IA</button><button><Upload size={17}/>Importar Dados</button></div></div>
        {tab === 'meus' && <>
          <Panel title="Estante de Books" subtitle="Relatórios principais da operação"><BookShelf/></Panel>
          <div className="book-workspace">
            <section className="book-reader">
              <div className="reader-head"><div><strong>Resumo Executivo - Maio/2025</strong><span>Concluído · Atualizado agora · 12 páginas</span></div><div className="reader-tools"><button onClick={()=>setMode('leitura')} className={mode==='leitura'?'on':''}><Eye size={16}/>Leitura</button><button onClick={()=>setMode('edicao')} className={mode==='edicao'?'on':''}><Pencil size={16}/>Edição</button><button><Save size={16}/>Salvar</button><button><Download size={16}/>Baixar</button><button onClick={()=>setOpenRight(!openRight)}><PanelRightOpen size={16}/></button><button><MoreVertical size={16}/></button></div></div>
              <div className="reader-body"><button className="page-nav left" onClick={prev}><ArrowLeft/></button><AnimatePresence mode="wait"><motion.div key={bookPage+mode} initial={{opacity:0, rotateY:22, x:40}} animate={{opacity:1, rotateY:0, x:0}} exit={{opacity:0, rotateY:-22, x:-40}} transition={{duration:.35}} className="book-spread"><div className="book-page cover"><div className="cover-logo"><Cpu size={44}/><span>CYBERONE</span></div><h1>BOOK<br/>EXECUTIVO</h1><h2>MAIO/2025</h2><ResponsiveContainer width="100%" height={150}><LineChart data={forecastData}><Line dataKey="previsto" stroke="#11a8ff" strokeWidth={4} dot={false}/><Line dataKey="backlog" stroke="#20e074" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></div><div className="book-page content-page"><span className="page-number">{String(bookPage+1).padStart(2,'0')}</span><h2>{current.title}</h2><h4>{current.subtitle}</h4>{renderBookContent(current, mode)}<div className="page-curl"></div></div></motion.div></AnimatePresence><button className="page-nav right" onClick={next}><ArrowRight/></button></div>
              <div className="reader-footer"><input type="range" min="0" max={bookPages.length-1} value={bookPage} onChange={e=>setBookPage(Number(e.target.value))}/><span>{bookPage+1} / {bookPages.length}</span></div>
            </section>
            {openRight && <aside className="book-sidebar"><div className="side-title"><h3>Páginas do Book</h3><span>{bookPages.length} páginas</span></div><div className="page-list">{bookPages.map((p,i)=><button key={p.title} onClick={()=>setBookPage(i)} className={bookPage===i?'current':''}><div className="thumb"></div><strong>{String(i+1).padStart(2,'0')}</strong><span>{p.title}</span></button>)}</div><div className="export-panel"><h4>Exportações</h4><button><FileDown size={17}/>PDF Executivo</button><button><Presentation size={17}/>PowerPoint</button><button><FileSpreadsheet size={17}/>Excel Analítico</button><button><LinkIcon size={17}/>Link Seguro</button></div></aside>}
          </div>
        </>}
        {tab === 'biblioteca' && <div className="library-grid">{books.concat(books).map((b,i)=>{const Icon=b.icon;return <Panel key={i} title={b.name} subtitle={`${b.pages} páginas · ${b.owner}`}><div className="library-card"><Icon size={42} style={{color:b.color}}/><p>Status: {b.status}</p><div><button><Eye size={15}/>Abrir</button><button><Copy size={15}/>Duplicar</button><button><Trash2 size={15}/>Excluir</button></div></div></Panel>})}</div>}
        {tab === 'modelos' && <div className="library-grid">{['Book Executivo Mensal','Book Operacional Semanal','Book Forecast Trimestral','Book Governança','Book Projetos','Book SLA e Riscos'].map((t,i)=><div className="template-card" key={t}><BookOpen size={36} style={{color:colors[i%colors.length]}}/><h3>{t}</h3><p>Modelo pronto com capa, índice, KPIs, gráficos, riscos e recomendações IA.</p><button><Plus size={16}/>Usar modelo</button></div>)}</div>}
        {tab === 'automacoes' && <div className="library-grid">{['Book Executivo Mensal','Forecast Semanal','SLA Crítico','Relatório Diretoria'].map((t,i)=><Panel key={t} title={t} subtitle={['Todo dia 01 às 08h','Toda segunda às 09h','Quando risco > 80%','Último dia útil do mês'][i]}><div className="library-card"><Bot size={42} style={{color:colors[i]}}/><p>Geração automática, envio por e-mail, armazenamento em biblioteca e atualização dos indicadores.</p><div><button><Play size={15}/>Executar</button><button><SlidersHorizontal size={15}/>Configurar</button></div></div></Panel>)}</div>}
      </main>
    </>
  );
}

function renderBookContent(current: any, mode: string) {
  return <>
    {current.type === 'text' && <p className="executive-text">{current.content}</p>}
    {current.type === 'cover' && <div className="page-hero"><Sparkles size={44}/><p>{current.content}</p></div>}
    {current.type === 'kpis' && <div className="book-kpis"><div><strong>24.752</strong><span>Chamados</span></div><div><strong>92,8%</strong><span>SLA Global</span></div><div><strong>5h32m</strong><span>MTTR</span></div><div><strong>3.247</strong><span>Backlog</span></div></div>}
    {current.type === 'chart' && <ForecastLine mode="volume"/>}
    {current.type === 'risks' && <div className="risk-cards">{['SLA em risco','Backlog crítico','Capacidade limitada'].map((r,i)=><div key={r}><AlertTriangle style={{color:colors[i+3]}}/><strong>{r}</strong><p>{['312 chamados impactados','Crescimento previsto de 22%','Infraestrutura em 91%'][i]}</p></div>)}</div>}
    {current.type === 'recommendations' && <div className="recommendation-cards">{['Redistribuir equipe N2','Automatizar triagem','Gerar plano de mitigação','Revisar SLA de infraestrutura'].map(r=><div key={r}><CheckCircle2/><span>{r}</span></div>)}</div>}
    {mode === 'edicao' && <div className="edit-box"><Pencil size={16}/><span>Modo edição ativo: esta área pode virar editor de texto, cards e gráficos depois.</span></div>}
  </>
}

function DashboardPage() {
  return <><Header title="Dashboard Executivo" subtitle="Visão geral estratégica e indicadores de performance"/><main className="content"><div className="kpi-grid"><Kpi icon={<FileText/>} label="Total de Chamados" value="24.752" trend="+12,5%"/><Kpi icon={<CheckCircle2/>} label="Resolvidos" value="18.794" trend="+14,7%" color="#20e074"/><Kpi icon={<Clock3/>} label="MTTR Médio" value="5h 32m" trend="-6,2%" color="#8957ff"/><Kpi icon={<ShieldCheck/>} label="SLA Global" value="92,8%" trend="+4,3 p.p." color="#16e0bd"/></div><div className="grid"><Panel title="Evolução de Chamados" className="span-2"><ForecastLine mode="volume"/></Panel><Panel title="Chamados por Categoria"><MiniPie/></Panel><Insights/><Panel title="Forecast Inteligente" className="span-2"><ForecastLine mode="sla"/></Panel><Panel title="Books Recentes" className="span-2"><BookShelf/></Panel></div></main></>
}

function SaiPage() {
  const agents = [['Agente Forecast',TrendingUp,'Prevê volume, backlog e SLA'],['Agente SLA',ShieldCheck,'Detecta violação e risco'],['Agente Anomalia',Radar,'Identifica padrões incomuns'],['Agente Governança',ClipboardCheck,'Valida processos e políticas'],['Agente Executivo',PieChart,'Gera resumos para diretoria'],['Agente Automação',Workflow,'Aciona fluxos e recomendações']];
  return <ModulePage title="SAI - Agentes IA" subtitle="Agentes autônomos para análise, decisão e automação" icon={BrainCircuit} custom={<><Panel className="span-2" title="Agentes Ativos"><div className="agent-grid">{agents.map(([name,Icon,desc]: any,i)=><motion.div whileHover={{y:-5}} className="agent-card" key={name}><Icon style={{color:colors[i]}}/><strong>{name}</strong><Tag tone="green">Ativo</Tag><p>{desc}</p></motion.div>)}</div></Panel><Panel title="Anomalias Detectadas"><Insights title="Alertas IA"/></Panel><Panel title="Fluxo de Decisão"><Roadmap/></Panel></>}/>
}

function GovernancePage(){return <ModulePage title="Governança" subtitle="Compliance, políticas, riscos, auditoria e LGPD" icon={ShieldCheck} custom={<><Panel title="Compliance Geral" className="span-2"><ComplianceGrid/></Panel><Panel title="Auditorias Recentes"><AuditList/></Panel><Panel title="Riscos de Governança"><RiskRings/></Panel></>}/>}
function AnalyticsPage(){return <ModulePage title="Analytics" subtitle="Análises avançadas, drilldowns, cruzamentos e indicadores estratégicos" icon={BarChart3} custom={<><Panel title="Análise Multivariável" className="span-2"><ResponsiveContainer width="100%" height={320}><ComposedChart data={forecastData}><CartesianGrid stroke="#19304a"/><XAxis dataKey="mes" stroke="#8ba5c0"/><YAxis stroke="#8ba5c0"/><Tooltip/><Bar dataKey="incidentes" fill="#ff4d5e"/><Line dataKey="sla" stroke="#20e074" strokeWidth={3}/><Line dataKey="risco" stroke="#f6c84c" strokeWidth={3}/></ComposedChart></ResponsiveContainer></Panel><Panel title="Cruzamentos"><Drivers/></Panel><Panel title="Insights"><Insights/></Panel></>}/>}
function ExecutivePage(){return <ModulePage title="Executive" subtitle="Resumo para diretoria, decisões estratégicas e visão C-level" icon={PieChart} custom={<><Panel title="Resumo Executivo" className="span-2"><ExecutiveSummary/></Panel><Panel title="Decisões Sugeridas"><DecisionList/></Panel><Panel title="OKRs e Metas"><OKRList/></Panel></>}/>}
function AlertsPage(){return <ModulePage title="Alertas" subtitle="Central de riscos, notificações e ocorrências críticas" icon={AlertTriangle} custom={<><Panel title="Alertas Críticos" className="span-2"><AlertList/></Panel><Panel title="Risco por Mês"><RiskRings/></Panel><Panel title="Ações de Mitigação"><ActionGrid/></Panel></>}/>}
function ProjectsPage(){return <ModulePage title="Projetos" subtitle="Status de iniciativas, roadmap, demandas estratégicas e impacto" icon={BriefcaseBusiness} custom={<><Panel title="Portfólio de Projetos" className="span-2"><ProjectGrid/></Panel><Panel title="Roadmap Estratégico"><Roadmap/></Panel><Panel title="Impacto no Forecast"><Drivers/></Panel></>}/>}
function AdminPage(){return <ModulePage title="Administração" subtitle="Usuários, permissões, integrações, ambientes e logs" icon={UserCog} custom={<><Panel title="Usuários e Permissões" className="span-2"><UserGrid/></Panel><Panel title="Integrações"><IntegrationList/></Panel><Panel title="Logs do Sistema"><AuditList/></Panel></>}/>}
function ConfigPage(){return <ModulePage title="Configurações" subtitle="Personalização, segurança, tema, notificações e preferências" icon={Settings} custom={<><Panel title="Preferências do Sistema" className="span-2"><SettingsGrid/></Panel><Panel title="Segurança"><SecurityGrid/></Panel><Panel title="Notificações"><NotificationList/></Panel></>}/>}

function ModulePage({ title, subtitle, icon: Icon, custom }: any) {
  const [tab,setTab] = useState<GenericTab>('visao');
  const tabs: [GenericTab,string,any][] = [['visao','Visão Geral',Eye],['indicadores','Indicadores',BarChart3],['automacoes','Automações',Bot],['riscos','Riscos',AlertTriangle],['relatorios','Relatórios',FileDown]];
  return (
    <>
      <Header title={title} subtitle={subtitle}/>
      <main className="content">
        <div className="tabs">{tabs.map(([key,label,TIcon])=><button key={key} onClick={()=>setTab(key)} className={tab===key?'selected':''}><TIcon size={16}/>{label}</button>)}</div>
        <div className="kpi-grid"><Kpi icon={<Icon/>} label="Status" value="Ativo" trend="Monitorado em tempo real"/><Kpi icon={<Shield/>} label="Confiabilidade" value="98,2%" trend="+2,1%" color="#20e074"/><Kpi icon={<Zap/>} label="Automações" value="16" trend="+4 este mês" color="#f6c84c"/><Kpi icon={<Bot/>} label="IA Aplicada" value="Alta" trend="Insights ativos" color="#8957ff"/></div>
        {tab === 'visao' && <div className="grid"><Panel title={`${title} - Performance`} className="span-2"><ForecastLine mode="volume"/></Panel><Panel title="Distribuição"><MiniPie/></Panel>{custom}</div>}
        {tab === 'indicadores' && <div className="grid"><Panel title="Indicadores Principais" className="span-2"><CategoryTable/></Panel><Panel title="Tendência"><ForecastLine mode="sla"/></Panel><Panel title="Distribuição"><MiniPie/></Panel></div>}
        {tab === 'automacoes' && <div className="grid"><Panel title="Automações Ativas" className="span-2"><AutomationCards/></Panel><Panel title="Fluxos"><Roadmap/></Panel><Panel title="Ações"><ActionGrid/></Panel></div>}
        {tab === 'riscos' && <div className="grid"><Panel title="Mapa de Riscos" className="span-2"><RiskRings/></Panel><Insights title="Riscos Detectados"/><Panel title="Plano de Ação"><DecisionList/></Panel></div>}
        {tab === 'relatorios' && <div className="grid"><Panel title="Relatórios Disponíveis" className="span-2"><BookShelf/></Panel><Panel title="Exportações"><ExportActions/></Panel><Panel title="Agendamentos"><AutomationCards/></Panel></div>}
      </main>
    </>
  );
}

function ComplianceGrid(){return <div className="card-grid">{['LGPD','Políticas Internas','Auditoria','Acessos','Mudanças','SLA'].map((x,i)=><div className="mini-card" key={x}><BadgeCheck style={{color:colors[i]}}/><strong>{x}</strong><p>{92+i}% conformidade</p><Tag tone={i<4?'green':'yellow'}>{i<4?'OK':'Atenção'}</Tag></div>)}</div>}
function AuditList(){return <div className="list">{['Revisão de acessos finalizada','Política de mudança atualizada','Log de integração validado','Auditoria de SLA concluída'].map((x,i)=><div key={x}><ClipboardCheck style={{color:colors[i]}}/><span>{x}</span><Tag tone="green">Concluído</Tag></div>)}</div>}
function ExecutiveSummary(){return <div className="executive-box"><h2>Operação em evolução, com atenção ao backlog</h2><p>O ambiente mantém performance positiva, mas o forecast indica aumento de volume e risco de pressão operacional em agosto. A recomendação é combinar reforço de equipe com otimização de processos.</p><div><Tag tone="green">SLA 92,8%</Tag><Tag tone="yellow">Backlog +22,8%</Tag><Tag tone="red">Risco Ago/25</Tag></div></div>}
function DecisionList(){return <div className="list">{['Reforçar equipe N2 em 15%','Automatizar triagem de chamados','Priorizar infraestrutura crítica','Criar book executivo mensal'].map((x,i)=><div key={x}><CheckCircle2 style={{color:colors[i]}}/><span>{x}</span><Tag tone={i<2?'red':'yellow'}>{i<2?'Alta':'Média'}</Tag></div>)}</div>}
function OKRList(){return <div className="list">{['SLA acima de 92%','Reduzir backlog em 20%','Diminuir MTTR para 5h','Automatizar 30% dos reports'].map((x,i)=><div key={x}><Target style={{color:colors[i]}}/><span>{x}</span><b>{[92,68,75,54][i]}%</b></div>)}</div>}
function AlertList(){return <div className="list">{['Risco de estouro de SLA','Backlog acima do esperado','Capacidade próxima do limite','Anomalia no volume de chamados','Projeto crítico atrasado'].map((x,i)=><div key={x}><AlertTriangle style={{color:i<2?'#ff4d5e':'#f6c84c'}}/><span>{x}</span><Tag tone={i<2?'red':'yellow'}>{i<2?'Alta':'Média'}</Tag></div>)}</div>}
function ProjectGrid(){return <div className="card-grid">{['Modernização ERP','Automação SAI','Migração Cloud','Portal Executivo','Data Lake','Governança Dados'].map((x,i)=><div className="mini-card" key={x}><BriefcaseBusiness style={{color:colors[i]}}/><strong>{x}</strong><p>Progresso: {[72,64,48,85,39,58][i]}%</p><Tag tone={i===2||i===4?'yellow':'green'}>{i===2||i===4?'Atenção':'No prazo'}</Tag></div>)}</div>}
function UserGrid(){return <div className="card-grid">{['Admin','Gestor','Analista N1','Analista N2','Diretoria','Auditoria'].map((x,i)=><div className="mini-card" key={x}><UserCog style={{color:colors[i]}}/><strong>{x}</strong><p>{[3,12,48,21,7,4][i]} usuários</p><Tag tone="green">Ativo</Tag></div>)}</div>}
function IntegrationList(){return <div className="list">{['PostgreSQL conectado','AWS Bedrock ativo','API FastAPI online','Exportador PDF disponível','Microsoft 365 integrado'].map((x,i)=><div key={x}><Plug style={{color:colors[i]}}/><span>{x}</span><Tag tone="green">Online</Tag></div>)}</div>}
function SettingsGrid(){return <div className="card-grid">{['Tema Dark Premium','Idioma Português','Modo Executivo','Animações','Densidade Compacta','Auto Refresh'].map((x,i)=><div className="mini-card" key={x}><Settings style={{color:colors[i]}}/><strong>{x}</strong><p>Configuração ativa</p><Tag tone="green">Ativo</Tag></div>)}</div>}
function SecurityGrid(){return <div className="card-grid">{['SSO','MFA','Logs','Perfis','Criptografia','Sessões'].map((x,i)=><div className="mini-card" key={x}><Lock style={{color:colors[i]}}/><strong>{x}</strong><p>Segurança habilitada</p><Tag tone="green">Seguro</Tag></div>)}</div>}
function NotificationList(){return <div className="list">{['Alertas críticos por e-mail','Resumo diário no Teams','Notificação de SLA','Book mensal automático'].map((x,i)=><div key={x}><Bell style={{color:colors[i]}}/><span>{x}</span><Tag tone="green">Ativo</Tag></div>)}</div>}
function AutomationCards(){return <div className="card-grid">{['Atualizar Forecast','Gerar Book Mensal','Enviar Alertas','Sincronizar Base','Recalcular SLA','Criar Snapshot'].map((x,i)=><div className="mini-card" key={x}><Bot style={{color:colors[i]}}/><strong>{x}</strong><p>Execução automática</p><Tag tone={i<4?'green':'yellow'}>{i<4?'Ativo':'Pendente'}</Tag></div>)}</div>}

function App() {
  const [page,setPage] = useState<Page>('dashboard');
  const screens: Record<Page, React.ReactNode> = {
    dashboard:<DashboardPage/>,
    operacao:<OperationPage/>,
    forecast:<ForecastPage/>,
    books:<BooksPage/>,
    sai:<SaiPage/>,
    governanca:<GovernancePage/>,
    analytics:<AnalyticsPage/>,
    executive:<ExecutivePage/>,
    alertas:<AlertsPage/>,
    projetos:<ProjectsPage/>,
    administracao:<AdminPage/>,
    configuracoes:<ConfigPage/>,
  };
  return <div className="app"><Sidebar page={page} setPage={setPage}/><div className="main">{screens[page]}</div></div>;
}

createRoot(document.getElementById('root')!).render(<App/>);
