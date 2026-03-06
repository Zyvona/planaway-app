import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";

export interface ActivityOption {
  id: string;
  title: string;
  description?: string;
  desc?: string;
  duration?: string;
  cost?: string;
  time?: string;
  location?: string;
  map_link?: string;
  vibe_chips?: string[];
  intensity_score?: number;
}

interface ActivityOptionsProps {
  options: ActivityOption[];
  selectedOptionId: string;
  onSelect: (optionId: string) => void;
  dayNumber: number;
}

const ActivityOptions = ({ options, selectedOptionId, onSelect, dayNumber }: ActivityOptionsProps) => {
  if (options.length < 2) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Choose Your Path
      </p>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <motion.button
              key={option.id}
              onClick={() => onSelect(option.id)}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full text-left p-3 rounded-lg border-2 transition-all
                ${
                  isSelected
                    ? "bg-secondary/10 border-secondary shadow-sm"
                    : "bg-card border-border hover:border-secondary/30"
                }
              `}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`
                    mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0
                    ${
                      isSelected
                        ? "bg-secondary border-secondary"
                        : "border-muted-foreground/30"
                    }
                  `}
                >
                  {isSelected && <Check className="h-3 w-3 text-secondary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-heading font-semibold text-foreground">
                    {option.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {option.description || option.desc}
                  </p>
                  {(option.duration || option.cost || option.location) && (
                    <div className="flex items-center gap-2 mt-1.5">
                      {option.duration && (
                        <span className="text-xs text-muted-foreground/80">
                          ⏱️ {option.duration}
                        </span>
                      )}
                      {option.cost && (
                        <span className="text-xs text-muted-foreground/80">
                          💰 {option.cost}
                        </span>
                      )}
                      {option.location && (
                        <span className="text-xs text-muted-foreground/80 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {option.location}
                        </span>
                      )}
                    </div>
                  )}
                  {option.map_link && (
                    <a
                      href={option.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 text-xs font-heading font-semibold rounded-md transition-colors"
                      style={{
                        backgroundColor: '#1A3A5C',
                        color: 'white',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0f2844';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1A3A5C';
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      View on Maps
                    </a>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityOptions;
