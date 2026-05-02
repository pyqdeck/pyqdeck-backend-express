export default function StudioPage() {
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
        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <h3 className="text-sm font-medium tracking-tight">Total Users</h3>
          <div className="mt-2 text-2xl font-bold">1,234</div>
        </div>
        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <h3 className="text-sm font-medium tracking-tight">
            Papers Uploaded
          </h3>
          <div className="mt-2 text-2xl font-bold">432</div>
        </div>
        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <h3 className="text-sm font-medium tracking-tight">Questions</h3>
          <div className="mt-2 text-2xl font-bold">8,523</div>
        </div>
        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <h3 className="text-sm font-medium tracking-tight">
            Pending Approvals
          </h3>
          <div className="mt-2 text-2xl font-bold text-amber-500">12</div>
        </div>
      </div>
    </div>
  );
}
