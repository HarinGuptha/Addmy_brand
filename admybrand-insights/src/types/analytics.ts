export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  description: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  category?: string;
}

export interface LineChartData {
  name: string;
  revenue: number;
  users: number;
  conversions: number;
  date: string;
}

export interface BarChartData {
  name: string;
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface PieChartData {
  name: string;
  value: number;
  fill: string;
}

export interface TableRow {
  id: string;
  campaign: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  roas: number;
  date: string;
}

export interface DashboardData {
  metrics: MetricCard[];
  lineChartData: LineChartData[];
  barChartData: BarChartData[];
  pieChartData: PieChartData[];
  tableData: TableRow[];
  lastUpdated: string;
}

export interface FilterOptions {
  dateRange: {
    from: Date;
    to: Date;
  };
  campaigns: string[];
  status: string[];
}
