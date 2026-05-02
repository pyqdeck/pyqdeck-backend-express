import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MetricCard({
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
