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

export function AiGenerationQueue({ questions }) {
  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Solution Generator</CardTitle>
          <CardDescription>
            Questions requiring automated AI solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-[150px] items-center justify-center rounded-lg border border-dashed text-sm">
            No questions in queue.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Solution Generator</CardTitle>
            <CardDescription>
              Questions requiring automated AI solutions
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Bot className="h-4 w-4" />
            Auto Generate All
          </Button>
        </div>
      </CardHeader>
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
