import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function BtnCreationCard() {
  return (
    <Card className="w-[280px] h-[280px] rounded-3xl overflow-visible bg-transparent hover:bg-card/10 border border-dashed border-muted-foreground/30 ">
      <CardContent className="p-4 h-full flex flex-col items-center justify-center relative">
        <Plus className="w-12 h-12 text-muted-foreground/50" />
      </CardContent>
    </Card>
  );
}
