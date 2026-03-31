import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GearSix, ArrowCounterClockwise, X } from '@phosphor-icons/react'
import { useOnboarding } from '@/hooks/use-onboarding'
import { toast } from 'sonner'
import { InteractiveHotspot } from '@/components/InteractiveHotspot'

export function SettingsMenu() {
  const { restartOnboarding, skipOnboarding, hasCompletedOnboarding, isActive } = useOnboarding()

  const handleRestartTour = () => {
    restartOnboarding()
    toast.success('Tour restarted ✦', {
      description: 'The onboarding tour will begin again',
    })
  }

  const handleSkipTour = () => {
    skipOnboarding()
    toast.success('Tour completed ✦', {
      description: 'You can restart it anytime from settings',
    })
  }

  return (
    <InteractiveHotspot
      id="settings-menu"
      title="Settings & Help"
      description="Access app settings, restart the onboarding tour, or get help anytime. All your preferences are here ✦"
      position="left"
      autoShow={false}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-card/80 backdrop-blur-md border border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
          >
            <GearSix size={20} weight="duotone" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-md border-border/50">
          <DropdownMenuLabel className="text-foreground">Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={handleRestartTour}
            className="gap-2 cursor-pointer"
          >
            <ArrowCounterClockwise size={18} weight="duotone" />
            <span>Restart tour</span>
          </DropdownMenuItem>

          {isActive && (
            <DropdownMenuItem
              onClick={handleSkipTour}
              className="gap-2 cursor-pointer"
            >
              <X size={18} weight="duotone" />
              <span>Skip tour</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          
          <div className="px-2 py-1.5 text-xs text-muted-foreground">
            {hasCompletedOnboarding 
              ? 'Tour completed ✦' 
              : isActive 
              ? 'Tour in progress ◌' 
              : 'Tour ready'}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </InteractiveHotspot>
  )
}
