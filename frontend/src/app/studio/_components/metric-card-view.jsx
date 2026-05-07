import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardView({
  title,
  value,
  subLabel,
  icon: Icon,
  colorClass,
  bgClass,
  loading = false,
}) {
  return (
    <Card shadow="none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-9 w-9 rounded-lg" />
          ) : (
            <div className={`rounded-lg p-2 ${bgClass}`}>
              <Icon className={`h-5 w-5 ${colorClass}`} />
            </div>
          )}
          <CardTitle className="text-muted-foreground text-sm font-medium">
            {loading ? <Skeleton className="h-4 w-24" /> : title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            <p className="text-muted-foreground mt-1 text-xs">{subLabel}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
