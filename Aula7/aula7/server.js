const express = require("express");
const cors = require("cors");
const os = require("os");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
const PORT = Number(process.env.PORT) || 3000;
const startedAt = Date.now();

function gb(value) { return (value / 1024 ** 3).toFixed(2); }
function mb(value) { return (value / 1024 ** 2).toFixed(2); }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, value)); }
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}
function esc(value) {
  return String(value ?? "N/A").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function cpuSnapshot() {
  return os.cpus().map(cpu => ({ ...cpu.times }));
}
function cpuUsageBetween(before, after) {
  return after.map((cpu, index) => {
    const previous = before[index] || cpu;
    const totalDelta = Object.values(cpu).reduce((sum, value) => sum + value, 0)
      - Object.values(previous).reduce((sum, value) => sum + value, 0);
    const idleDelta = cpu.idle - previous.idle;
    return totalDelta > 0 ? clamp(((totalDelta - idleDelta) / totalDelta) * 100) : 0;
  });
}

function getIPs() {
  return Object.entries(os.networkInterfaces()).flatMap(([name, interfaces]) =>
    interfaces.map(net => ({
      interface: name,
      address: net.address,
      family: net.family,
      mac: net.mac,
      internal: net.internal
    }))
  );
}
function getMainIP(ips) {
  return ips.find(ip => !ip.internal && ip.family === "IPv4")?.address || "N/A";
}
function getFilesDetailed() {
  try {
    return fs.readdirSync(process.cwd(), { withFileTypes: true }).slice(0, 30).map(entry => {
      const fullPath = path.join(process.cwd(), entry.name);
      const stat = fs.statSync(fullPath);
      return {
        name: entry.name,
        type: entry.isDirectory() ? "Diretório" : "Arquivo",
        size: entry.isDirectory() ? "—" : `${(stat.size / 1024).toFixed(2)} KB`,
        modified: stat.mtime.toLocaleString("pt-BR")
      };
    });
  } catch { return []; }
}
function getProjectFileCount() {
  const ignored = new Set([".git", "node_modules"]);
  function countFiles(directory) {
    try {
      return fs.readdirSync(directory, { withFileTypes: true }).reduce((total, entry) => {
        if (ignored.has(entry.name)) return total;
        const fullPath = path.join(directory, entry.name);
        return total + (entry.isDirectory() ? countFiles(fullPath) : 1);
      }, 0);
    } catch { return 0; }
  }
  return countFiles(process.cwd());
}
function healthStatus(ram, cpu, load, cores) {
  if (ram > 85 || cpu > 85 || load > cores) return { label: "ALTO USO", color: "#dc2626" };
  if (ram > 65 || cpu > 65 || load > cores * 0.7) return { label: "ATENÇÃO", color: "#d97706" };
  return { label: "NORMAL", color: "#16a34a" };
}

let lastCpu = cpuSnapshot();
function collectMetrics() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const cpuTimes = cpuSnapshot();
  const usages = cpuUsageBetween(lastCpu, cpuTimes);
  lastCpu = cpuTimes;
  const cpuAverage = usages.length ? usages.reduce((sum, value) => sum + value, 0) / usages.length : 0;
  const load = os.loadavg();
  const ips = getIPs();
  const cores = os.cpus().length;
  const ramPercent = (usedMemory / totalMemory) * 100;

  return {
    updatedAt: new Date().toISOString(),
    kpis: {
      ramPercent: Number(ramPercent.toFixed(0)),
      cpuPercent: Number(cpuAverage.toFixed(0)),
      uptime: formatUptime(os.uptime()),
      fileCount: getProjectFileCount(),
      mainIP: getMainIP(ips),
      health: healthStatus(ramPercent, cpuAverage, load[0], cores)
    },
    system: {
      hostname: os.hostname(), type: os.type(), release: os.release(),
      platform: os.platform(), architecture: os.arch(), endianness: os.endianness(),
      node: process.version
    },
    user: {
      username: os.userInfo().username, home: os.homedir(), temp: os.tmpdir(),
      shell: os.userInfo().shell || "N/A",
      uid: process.getuid ? process.getuid() : "N/A",
      gid: process.getgid ? process.getgid() : "N/A"
    },
    memory: { total: gb(totalMemory), used: gb(usedMemory), free: gb(freeMemory), perCpu: gb(totalMemory / cores) },
    cpu: { cores, model: os.cpus()[0]?.model || "N/A", average: Number(cpuAverage.toFixed(0)), load: load.map(value => value.toFixed(2)), usages: usages.map(value => Number(value.toFixed(0))) },
    network: { mainIP: getMainIP(ips), interfaces: ips },
    files: getFilesDetailed(),
    process: { pid: process.pid, cwd: process.cwd(), nodeMemory: mb(process.memoryUsage().rss), execPath: process.execPath, uptime: formatUptime((Date.now() - startedAt) / 1000) },
    environment: {
      provider: process.env.RENDER ? "Render" : process.env.RAILWAY_ENVIRONMENT ? "Railway" : "Local",
      port: PORT,
      nodeEnv: process.env.NODE_ENV || "development",
      render: Boolean(process.env.RENDER),
      railway: Boolean(process.env.RAILWAY_ENVIRONMENT)
    },
    time: { uptime: formatUptime(os.uptime()), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, iso: new Date().toISOString() }
  };
}

function metricBar(value) {
  const safe = clamp(Number(value) || 0).toFixed(0);
  return `<div class="bar"><div class="fill" style="width:${safe}%">${safe}%</div></div>`;
}
function tableRows(items, columns) {
  return items.map(item => `<tr>${columns.map(column => `<td>${esc(item[column])}</td>`).join("")}</tr>`).join("");
}

app.get("/api/metrics", (_req, res) => res.json(collectMetrics()));
app.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));
app.get("/", (_req, res) => {
  const data = collectMetrics();
  const { kpis, system, user, memory, cpu, network, files, process, environment, time } = data;
  res.send(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="15"><title>SO Dashboard</title><style>
:root{font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#172033;background:#f3f6fb}*{box-sizing:border-box}body{margin:0;padding:24px}main{max-width:1400px;margin:auto}h1{margin:0;font-size:clamp(1.8rem,4vw,2.7rem)}h2{font-size:1.1rem;margin:0 0 14px}.subtitle{color:#687386;margin:6px 0 24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:18px}.card{background:white;border:1px solid #e6eaf0;border-radius:16px;padding:18px;box-shadow:0 5px 18px #1828480c}.kpi{text-align:center}.kpi h3{font-size:.76rem;text-transform:uppercase;letter-spacing:.06em;color:#687386;margin:0}.value{font-size:1.65rem;font-weight:800;margin-top:8px;word-break:break-word}.badge{display:inline-block;border-radius:999px;padding:7px 12px;color:white;font-size:.78rem}.row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px solid #edf0f4;font-size:.9rem}.row:last-child{border:0}.row b{color:#536176}.bar{height:22px;background:#e8edf5;border-radius:7px;overflow:hidden;margin:7px 0 12px}.fill{height:100%;background:linear-gradient(90deg,#2563eb,#38bdf8);color:white;text-align:center;line-height:22px;font-size:.75rem;min-width:28px}table{width:100%;border-collapse:collapse;font-size:.78rem;display:block;max-height:280px;overflow:auto}th,td{text-align:left;padding:7px;border-bottom:1px solid #edf0f4;white-space:nowrap}th{position:sticky;top:0;background:#fff;color:#536176}.muted{font-size:.78rem;color:#687386}.footer{text-align:center;color:#8791a1;font-size:.75rem;margin:24px}.core{margin:8px 0}.status-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:${esc(kpis.health.color)};margin-right:5px}</style></head><body><main><h1>SO Dashboard</h1><div class="subtitle">Monitoramento do sistema operacional • atualizado em ${esc(new Date(data.updatedAt).toLocaleString("pt-BR"))}</div><section class="kpis">
<div class="card kpi"><h3>RAM usada</h3><div class="value">${kpis.ramPercent}%</div>${metricBar(kpis.ramPercent)}</div><div class="card kpi"><h3>CPU média</h3><div class="value">${kpis.cpuPercent}%</div>${metricBar(kpis.cpuPercent)}</div><div class="card kpi"><h3>Uptime</h3><div class="value">${esc(kpis.uptime)}</div></div><div class="card kpi"><h3>Arquivos</h3><div class="value">${kpis.fileCount}</div></div><div class="card kpi"><h3>IP principal</h3><div class="value">${esc(kpis.mainIP)}</div></div><div class="card kpi"><h3>Status</h3><div class="value"><span class="badge" style="background:${esc(kpis.health.color)}"><span class="status-dot"></span>${esc(kpis.health.label)}</span></div></div></section><section class="grid">
<div class="card"><h2>Informações do sistema</h2>${Object.entries(system).map(([key,value]) => `<div class="row"><b>${esc(key)}</b><span>${esc(value)}</span></div>`).join("")}</div>
<div class="card"><h2>Usuário e processo</h2>${Object.entries({...user,...process}).map(([key,value]) => `<div class="row"><b>${esc(key)}</b><span>${esc(value)}</span></div>`).join("")}</div>
<div class="card"><h2>Memória RAM</h2>${Object.entries(memory).map(([key,value]) => `<div class="row"><b>${esc(key)}</b><span>${esc(value)}${key !== "perCpu" ? " GB" : " GB"}</span></div>`).join("")}${metricBar(kpis.ramPercent)}<p class="muted">A RAM é a memória principal utilizada pelos processos em execução.</p></div>
<div class="card"><h2>CPU e carga</h2><div class="row"><b>Núcleos</b><span>${cpu.cores}</span></div><div class="row"><b>Modelo</b><span>${esc(cpu.model)}</span></div><div class="row"><b>Load average</b><span>${cpu.load.join(" | ")}</span></div>${cpu.usages.map((value,index) => `<div class="core">Core ${index} — ${value}%${metricBar(value)}</div>`).join("")}</div>
<div class="card"><h2>Rede</h2><div class="row"><b>IP principal</b><span>${esc(network.mainIP)}</span></div><table><thead><tr><th>Interface</th><th>IP</th><th>Família</th></tr></thead><tbody>${tableRows(network.interfaces,["interface","address","family"])}</tbody></table></div>
<div class="card"><h2>Arquivos do projeto</h2><table><thead><tr><th>Nome</th><th>Tipo</th><th>Tamanho</th><th>Modificado</th></tr></thead><tbody>${tableRows(files,["name","type","size","modified"])}</tbody></table></div>
<div class="card"><h2>Ambiente de execução</h2>${Object.entries(environment).map(([key,value]) => `<div class="row"><b>${esc(key)}</b><span>${esc(value)}</span></div>`).join("")}<p class="muted">O provedor é identificado pelas variáveis de ambiente disponíveis no processo.</p></div>
<div class="card"><h2>Tempo</h2>${Object.entries(time).map(([key,value]) => `<div class="row"><b>${esc(key)}</b><span>${esc(value)}</span></div>`).join("")}</div>
</section><div class="footer">SO Dashboard • Node.js + Express • atualização automática a cada 15 segundos</div></main></body></html>`);
});

app.listen(PORT, "0.0.0.0", () => console.log(`SO Dashboard executando na porta ${PORT}`));
