import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { formatINR } from '@/lib/format';
import type { Workspace } from '@/backend';

interface WorkspaceCardProps {
  workspace: Workspace;
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const primaryPhoto = workspace.photos[0] || '/assets/generated/worknest-photo-01.dim_1200x800.png';

  return (
    <Link to="/workspace/$workspaceId" params={{ workspaceId: workspace.id.toString() }}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={primaryPhoto}
            alt={workspace.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{workspace.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{workspace.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="font-semibold">
              {formatINR(workspace.hourlyRate)}/hr
            </Badge>
            {workspace.amenities.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {workspace.amenities.length} amenities
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
