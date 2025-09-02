import RitualsSection from '@/components/RitualsSection';

interface RitualsPageSectionProps {
  showMoreRituals: boolean;
  setShowMoreRituals: (show: boolean) => void;
}

export default function RitualsPageSection({ showMoreRituals, setShowMoreRituals }: RitualsPageSectionProps) {
  return (
    <div className="bg-background">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-2 sm:py-4 space-y-12 sm:space-y-16">
        <RitualsSection 
          showMoreRituals={showMoreRituals} 
          setShowMoreRituals={setShowMoreRituals} 
        />
      </div>
    </div>
  );
}