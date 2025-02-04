import { GetFormStats } from "@/actions/form";
import { Suspense } from "react";
import { LuView } from "react-icons/lu";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback = {<StatsCards loading={true}/>}>
          <CardStatsWrapper />
      </Suspense>
    </div>
  );
}

async function CardStatsWrapper () {
  const stats = await GetFormStats();
  return <StatsCards loading = {false} data = {stats} />
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const {data, loading} = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCards
        title = "Total visits"
        icon = {<LuView className="text-blue-600" />}
        helperText = "All time form visits"
        value = {data?.visits.toLocaleString() || ""}
        loading = {loading}
        className = "shadow-md shadow-blue-600"
      />
    </div>
  )
}

function StatsCard({title, value, icon, helperText, loading, className}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  helperText: string;
  loading: boolean;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
              <Skeleton>
                <span className="opacity-0">0</span>
              </Skeleton>
            )
          }
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>"
      </CardContent>
    </Card>
  );
}