import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type KPICardProps = {
  title: string;
  icon: React.ReactNode;
  count: number;
};

function KPICard({ title, icon, count }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="capitalize tracking-wide text-lg">
            {title}
          </CardTitle>
          <CardTitle>{icon}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <h1 className="text-4xl font-bold tracking-wider">{count}</h1>
      </CardContent>
    </Card>
  );
}
export default KPICard;
