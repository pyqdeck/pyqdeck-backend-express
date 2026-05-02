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
import { ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';

export function PendingPapers({ papers }) {
  const header = (
    <CardHeader className="flex flex-row items-center gap-3 pb-2">
      <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
        <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
      </div>
      <div>
        <CardTitle>Moderation Queue</CardTitle>
        <CardDescription>
          Recent paper uploads awaiting approval
        </CardDescription>
      </div>
    </CardHeader>
  );

  if (!papers || papers.length === 0) {
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
                <Clock className="text-muted-foreground/50 h-6 w-6" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle className="text-base">
                  Moderation Queue Clear
                </EmptyTitle>
                <EmptyDescription>
                  You&apos;re all caught up! No papers awaiting review. 🎉
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
              <TableHead>Title</TableHead>
              <TableHead>Offering</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papers.map((paper) => (
              <TableRow key={paper._id}>
                <TableCell className="max-w-[200px] truncate font-medium">
                  {paper.title || 'Untitled Paper'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {paper.subjectOfferingId?.slug || 'Unknown'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(paper.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="warning"
                    className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500"
                  >
                    Pending
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild title="Review">
                      <Link href={`/studio/papers/${paper._id}`}>
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Review</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30"
                      title="Quick Approve"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30"
                      title="Quick Reject"
                    >
                      <XCircle className="h-4 w-4" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
