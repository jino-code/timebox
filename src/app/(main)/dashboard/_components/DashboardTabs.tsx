'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabsProps = {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
};

function DashboardTabs({ tabs }: TabsProps) {
  return (
    <Tabs defaultValue={tabs[0].label}>
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default DashboardTabs;
