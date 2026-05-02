import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  FileText,
  Database,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';
import { Api } from '@/lib/api-generated';
import { auth } from '@clerk/nextjs/server';

import { VelocityChart } from './_components/velocity-chart';
import { PopularityChart } from './_components/popularity-chart';
import { PendingPapers } from './_components/pending-papers';
import { AiGenerationQueue } from './_components/ai-generation-queue';

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
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Studio Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the PyqDeck Admin Studio. Manage content, users, and
          academics from here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.users.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Papers & Questions
            </CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.papers.total.toLocaleString()}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Contains {metrics.questions.toLocaleString()} questions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academics</CardTitle>
            <GraduationCap className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.academics.universities.toLocaleString()}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Supporting {metrics.academics.branches.toLocaleString()} branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {metrics.papers.pending.toLocaleString()}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Papers require your attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <VelocityChart data={charts.contentVelocity} />
        <PopularityChart data={charts.subjectPopularity} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <PendingPapers papers={queues.pendingPapers} />
        <AiGenerationQueue questions={queues.aiGeneration} />
      </div>
    </div>
  );
}
