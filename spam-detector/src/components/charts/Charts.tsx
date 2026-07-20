import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TrendPoint, MonthlyReport } from '@/types';

const tooltipStyle = {
  borderRadius: 14,
  border: '1px solid rgba(91,99,232,0.15)',
  background: 'rgba(255,255,255,0.95)',
  fontSize: 13,
  boxShadow: '0 8px 24px rgba(20,20,50,0.12)',
};

export function SpamTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="safeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b63e8" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#5b63e8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="spamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,160,0.15)" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#8890b5' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8890b5' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="safe" name="Safe" stroke="#5b63e8" strokeWidth={2.5} fill="url(#safeGrad)" />
        <Area type="monotone" dataKey="spam" name="Spam" stroke="#ef4444" strokeWidth={2.5} fill="url(#spamGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBarChart({ data }: { data: MonthlyReport[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,160,0.15)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8890b5' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8890b5' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(91,99,232,0.06)' }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="scanned" name="Scanned" fill="#8b5cf6" radius={[8, 8, 0, 0]} maxBarSize={28} />
        <Bar dataKey="spam" name="Spam" fill="#ef4444" radius={[8, 8, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SpamPieChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={4}
          cornerRadius={8}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
