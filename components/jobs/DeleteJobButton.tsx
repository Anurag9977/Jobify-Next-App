"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "@/utils/actions";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function DeleteJobButton({ jobID }: { jobID: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ jobID }: { jobID: string }) => deleteJob({ jobID }),
    onSuccess: (data) => {
      if (!data) {
        toast({ variant: "destructive", description: "Something went wrong." });
        return;
      }
      toast({ description: "Job removed successfully." });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          disabled={isPending}
          onClick={() => mutate({ jobID })}
        >
          {isPending ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="capitalize tracking-wide">delete job</p>
      </TooltipContent>
    </Tooltip>
  );
}
export default DeleteJobButton;
