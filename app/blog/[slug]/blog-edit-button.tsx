"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { Pencil } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function BlogEditButton({ slug }: { slug: string }) {
  const approvalStatus = useQuery(api.admins.getMyApprovalStatus);
  const isSuperAdmin = approvalStatus?.isSuperAdmin ?? false;

  if (!isSuperAdmin) return null;

  return (
    <Button asChild variant="outline" size="sm">
      <Link href={`/blog/${slug}/edit`}>
        <Pencil className="mr-2 h-3.5 w-3.5" />
        Edit
      </Link>
    </Button>
  );
}
