import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: number;
  label: string;
}

interface TabsComponentProps {
  tabs: Tab[];
  getIdTab: (id: number) => void; 
  className?: string
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs, getIdTab ,className}) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0]?.id || 1);
  const [borderPosition, setBorderPosition] = useState<number>(0);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const leftOffset = activeTabElement.offsetLeft;
      const width = activeTabElement.offsetWidth;
      setBorderPosition(leftOffset);
      setBorderWidth(width);
    }
  }, [activeTab]);

  return (
    <div className={ cn(`relative `,className)}>
      <ul className="flex flex-row items-center ">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            onClick={() => {
              setActiveTab(tab.id);
              getIdTab(tab.id);
            }}
            className="cursor-pointer px-[12px] py-[12px] relative"
          >
            <span
              className={`text-[16px] font-[400] transition-all duration-500 ${
                activeTab === tab.id ? ' text-primaryColor ' : ' text-textColor '
              }`}
            >
              {tab.label}
            </span>
          </li>
        ))}
      </ul>
      <span
        className="absolute bottom-0 h-[4px] bg-primaryColor transition-all duration-500"
        style={{
          width: `${borderWidth}px`,
          transform: `translateX(${borderPosition}px)`,
        }}
      />
    </div>
  );
};

export default TabsComponent;
