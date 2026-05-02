import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, GraduationCap, Clock } from 'lucide-react';
import { Api } from '@/lib/api-generated';
import { auth } from '@clerk/nextjs/server';

import { VelocityChart } from './_components/velocity-chart';
import { PopularityChart } from './_components/popularity-chart';
import { PendingPapers } from './_components/pending-papers';
import { AiGenerationQueue } from './_components/ai-generation-queue';

function MetricCard({
  title,
  value,
  subLabel,
  icon: Icon,
  colorClass,
  bgClass,
}) {
  return (
    <Card shadow="none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${bgClass}`}>
            <Icon className={`h-5 w-5 ${colorClass}`} />
          </div>
          <CardTitle className="text-muted-foreground text-sm font-medium">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <p className="text-muted-foreground mt-1 text-xs">{subLabel}</p>
      </CardContent>
    </Card>
  );
}

export default async function StudioPage() {
  const { getToken } = await auth();

  const api = new Api({
    baseURL: (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'
    ).replace(/\/+$/, ''),
    securityWorker: async () => {
      const token = await getToken();
      return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    },
  });

  let dashboardData = null;
  try {
    const token = await getToken();
    const res = await api.analytics.studioOverviewList({
      headers: { Authorization: `Bearer ${token}` },
    });
    dashboardData = res.data.data;
  } catch (error) {
    console.error(
      'Failed to fetch studio overview data:',
      error?.message || error
    );
  }

  // Fallback values if API fails
  const metrics = dashboardData?.metrics || {
    users: 0,
    papers: { total: 0, pending: 0 },
    questions: 0,
    solutions: 0,
    academics: { universities: 0, branches: 0 },
  };

  const charts = dashboardData?.charts || {
    contentVelocity: [],
    subjectPopularity: [],
  };

  const queues = dashboardData?.queues || {
    pendingPapers: [],
    aiGeneration: [],
  };

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="space-y-2">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          Studio Overview
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Welcome to the PyqDeck Admin Studio. Manage content, users, and
          academics from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={metrics.users.toLocaleString()}
          subLabel="Registered users on the platform"
          icon={Users}
          colorClass="text-purple-600 dark:text-purple-400"
          bgClass="bg-purple-100 dark:bg-purple-900/30"
        />
        <MetricCard
          title="Papers & Questions"
          value={metrics.papers.total.toLocaleString()}
          subLabel={`Contains ${metrics.questions.toLocaleString()} questions`}
          icon={FileText}
          colorClass="text-blue-600 dark:text-blue-400"
          bgClass="bg-blue-100 dark:bg-blue-900/30"
        />
        <MetricCard
          title="Academics"
          value={metrics.academics.universities.toLocaleString()}
          subLabel={`Supporting ${metrics.academics.branches.toLocaleString()} branches`}
          icon={GraduationCap}
          colorClass="text-green-600 dark:text-green-400"
          bgClass="bg-green-100 dark:bg-green-900/30"
        />
        <MetricCard
          title="Pending Reviews"
          value={metrics.papers.pending.toLocaleString()}
          subLabel="Papers require your attention"
          icon={Clock}
          colorClass="text-orange-600 dark:text-orange-400"
          bgClass="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <VelocityChart data={charts.contentVelocity} />
        <PopularityChart data={charts.subjectPopularity} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PendingPapers papers={queues.pendingPapers} />
        <AiGenerationQueue questions={queues.aiGeneration} />
      </div>
    </div>
  );
}
