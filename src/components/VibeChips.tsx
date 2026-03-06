import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Vibe {
  id: string;
  label: string;
  emoji: string;
}

const VIBES: Vibe[] = [
  { id: "history", label: "History", emoji: "🏛️" },
  { id: "foodie", label: "Foodie", emoji: "🍜" },
  { id: "adventure", label: "Adventure", emoji: "🏔️" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "nightlife", label: "Nightlife", emoji: "🌃" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "relaxation", label: "Relaxation", emoji: "🧘" },
];

interface VibeChipsProps {
  selectedVibes: string[];
  onVibeToggle: (vibeId: string) => void;
  isRefining?: boolean;
}

const VibeChips = ({ selectedVibes, onVibeToggle, isRefining = false }: VibeChipsProps) => {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground mb-3">
        Refine Your Vibe
      </h4>
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {VIBES.map((vibe) => {
            const isSelected = selectedVibes.includes(vibe.id);
            return (
              <motion.button
                key={vibe.id}
                onClick={() => !isRefining && onVibeToggle(vibe.id)}
                disabled={isRefining}
                whileTap={!isRefining ? { scale: 0.95 } : {}}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-heading font-semibold
                  border-2 transition-all whitespace-nowrap
                  ${
                    isSelected
                      ? "bg-secondary border-secondary text-secondary-foreground shadow-md"
                      : "bg-card border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                  }
                  ${isRefining ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <span className="text-base">{vibe.emoji}</span>
                <span>{vibe.label}</span>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default VibeChips;
