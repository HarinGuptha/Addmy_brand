import { 
  DashboardData, 
  MetricCard, 
  LineChartData, 
  BarChartData, 
  PieChartData, 
  TableRow 
} from '@/types/analytics';

// Generate realistic mock data
export function generateMockData(): DashboardData {
  const metrics: MetricCard[] = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '$847,392',
      change: 12.5,
      changeType: 'increase',
      icon: 'DollarSign',
      description: 'Total revenue this month'
    },
    {
      id: '2',
      title: 'Active Users',
      value: '24,847',
      change: 8.2,
      changeType: 'increase',
      icon: 'Users',
      description: 'Monthly active users'
    },
    {
      id: '3',
      title: 'Conversions',
      value: '3,247',
      change: -2.1,
      changeType: 'decrease',
      icon: 'Target',
      description: 'Total conversions this month'
    },
    {
      id: '4',
      title: 'Growth Rate',
      value: '15.3%',
      change: 4.7,
      changeType: 'increase',
      icon: 'TrendingUp',
      description: 'Month-over-month growth'
    }
  ];

  // Generate line chart data for the last 30 days
  const lineChartData: LineChartData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.floor(Math.random() * 50000) + 20000,
      users: Math.floor(Math.random() * 2000) + 800,
      conversions: Math.floor(Math.random() * 200) + 50,
      date: date.toISOString().split('T')[0]
    };
  });

  const barChartData: BarChartData[] = [
    { name: 'Jan', desktop: 186, mobile: 80, tablet: 45 },
    { name: 'Feb', desktop: 305, mobile: 200, tablet: 67 },
    { name: 'Mar', desktop: 237, mobile: 120, tablet: 89 },
    { name: 'Apr', desktop: 273, mobile: 190, tablet: 102 },
    { name: 'May', desktop: 209, mobile: 130, tablet: 78 },
    { name: 'Jun', desktop: 214, mobile: 140, tablet: 95 }
  ];

  const pieChartData: PieChartData[] = [
    { name: 'Organic Search', value: 35, fill: 'hsl(var(--chart-1))' },
    { name: 'Social Media', value: 25, fill: 'hsl(var(--chart-2))' },
    { name: 'Direct Traffic', value: 20, fill: 'hsl(var(--chart-3))' },
    { name: 'Email Marketing', value: 12, fill: 'hsl(var(--chart-4))' },
    { name: 'Paid Ads', value: 8, fill: 'hsl(var(--chart-5))' }
  ];

  // Generate table data
  const campaigns = [
    'Summer Sale 2024', 'Black Friday Campaign', 'New Product Launch', 
    'Brand Awareness', 'Retargeting Campaign', 'Holiday Special',
    'Back to School', 'Spring Collection', 'Customer Acquisition'
  ];
  
  const statuses: ('active' | 'paused' | 'completed')[] = ['active', 'paused', 'completed'];

  const tableData: TableRow[] = Array.from({ length: 50 }, (_, i) => {
    const impressions = Math.floor(Math.random() * 100000) + 10000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01)); // 1-6% CTR
    const conversions = Math.floor(clicks * (Math.random() * 0.1 + 0.02)); // 2-12% conversion rate
    const cost = Math.floor(Math.random() * 5000) + 500;
    const revenue = conversions * (Math.floor(Math.random() * 100) + 50); // $50-150 per conversion
    const roas = revenue > 0 ? Number((revenue / cost).toFixed(2)) : 0;
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    return {
      id: `campaign-${i + 1}`,
      campaign: campaigns[Math.floor(Math.random() * campaigns.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      impressions,
      clicks,
      conversions,
      cost,
      revenue,
      roas,
      date: date.toISOString().split('T')[0]
    };
  });

  return {
    metrics,
    lineChartData,
    barChartData,
    pieChartData,
    tableData,
    lastUpdated: new Date().toISOString()
  };
}

// Function to simulate real-time updates
export function updateMetrics(currentData: DashboardData): DashboardData {
  const updatedMetrics = currentData.metrics.map(metric => {
    const randomChange = (Math.random() - 0.5) * 2; // -1 to 1
    const newChange = Number((metric.change + randomChange).toFixed(1));
    
    return {
      ...metric,
      change: newChange,
      changeType: newChange >= 0 ? 'increase' as const : 'decrease' as const
    };
  });

  return {
    ...currentData,
    metrics: updatedMetrics,
    lastUpdated: new Date().toISOString()
  };
}
