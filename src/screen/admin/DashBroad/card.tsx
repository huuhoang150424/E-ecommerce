import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query';
import { getTargetForTheMonth } from './api';
import { useMemo } from 'react';



type CardData = {
  id: number;
  title: string;
  specific: number | string | null;
  nameIcon: string;
};


export default function ListCards() {
  const { isLoading, data } = useQuery({
    queryKey: ['cardAnalysis'],
    queryFn: getTargetForTheMonth,
  });

  const ListCard: CardData[] = useMemo(() => {
    const result = data?.result?.data;
    return [
      {
        id: 1,
        title: 'Người tham gia',
        specific: result?.user_count ?? 'N/A',
        nameIcon: 'fa-solid fa-users',
      },
      {
        id: 2,
        title: 'Số đơn',
        specific: result?.order_count ?? 'N/A',
        nameIcon: 'fa-solid fa-cart-shopping',
      },
      {
        id: 3,
        title: 'Số bình luận (+ sao)',
        specific: result?.comment_count ?? 'N/A',
        nameIcon: 'fa-solid fa-comment',
      },
      {
        id: 4,
        title: 'Doanh thu tháng này',
        specific: `${result?.total_revenue?.toLocaleString()} vnđ` ,
        nameIcon: 'fa-solid fa-money-bill',
      },
    ];
  }, [data]);

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ListCard.map((item) => (
        <Card
          key={item.id}
          className="rounded-[6px] border border-gray-200 shadow-sm cursor-pointer dark:bg-colorDarkMode dark:border-borderDarkMode transition-all duration-500 ease-linear"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <i className={`${item.nameIcon}`}></i>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.specific}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}