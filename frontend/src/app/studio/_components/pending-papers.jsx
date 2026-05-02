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
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export function PendingPapers({ papers }) {
  if (!papers || papers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Moderation Queue</CardTitle>
          <CardDescription>
            Recent paper uploads awaiting approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            No pending papers. You're all caught up! 🎉
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Queue</CardTitle>
        <CardDescription>
          Recent paper uploads awaiting approval
        </CardDescription>
      </CardHeader>
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
                <TableCell className="font-medium max-w-[200px] truncate">
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
                  <Badge variant="warning" className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500">
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
                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/30" title="Quick Approve">
                      <CheckCircle className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30" title="Quick Reject">
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
