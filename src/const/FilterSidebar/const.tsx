export const FILTER_GROUPS = [
  { title: '성별', items: ['남성', '여성', '남녀공용'] },
  { title: '스포츠', items: ['라이프스타일'] },
  {
    title: '가격대',
    items: ['100,000 - 150,000 원', '150,000 - 200,000 원'],
  },
  {
    title: '브랜드',
    items: ['나이키 스포츠웨어', 'NikeLab'],
  },
  {
    title: '색상',
    colors: [
      'bg-black',
      'bg-white',
      'bg-red-500',
      'bg-emerald-500',
      'bg-sky-500',
      'bg-amber-500',
      'bg-slate-400',
      'bg-lime-500',
    ],
  },
] as const