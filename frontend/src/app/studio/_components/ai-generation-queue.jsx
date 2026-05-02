import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles } from 'lucide-react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';

export function AiGenerationQueue({ questions }) {
  const header = (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
          <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <CardTitle>AI Solution Generator</CardTitle>
          <CardDescription>
            Questions requiring automated AI solutions
          </CardDescription>
        </div>
      </div>
      {questions && questions.length > 0 && (
        <Button variant="outline" size="sm" className="gap-2">
          <Bot className="h-4 w-4" />
          Auto Generate All
        </Button>
      )}
    </CardHeader>
  );

  if (!questions || questions.length === 0) {
    return (
      <Card className="shadow-none">
        {header}
        <CardContent className="pt-6">
          <div className="flex h-[200px] items-center justify-center">
            <Empty className="border-none shadow-none">
              <EmptyMedia
                variant="icon"
                className="rounded-full bg-slate-50 dark:bg-slate-900/50"
              >
                <Bot className="text-muted-foreground/50 h-6 w-6" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle className="text-base">
                  No questions in queue
                </EmptyTitle>
                <EmptyDescription>
                  Questions requiring AI solutions will appear here
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-none">
      {header}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question ID</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question._id}>
                <TableCell className="text-muted-foreground font-mono text-xs font-medium">
                  {question._id.substring(0, 8)}...
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(question.tags || []).slice(0, 2).map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {(question.tags || []).length > 2 && (
                      <span className="text-muted-foreground text-xs">
                        +{(question.tags || []).length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{question.marks || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900/30"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
