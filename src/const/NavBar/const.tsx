export const linkBase =
  'px-3 py-2 text-sm uppercase tracking-wide transition-colors'

export const MEGA_MENU = {
  New: [],
  Men: [
    { title: '의류', items: ['전체', '아우터', '상의', '하의', '트레이닝'] },
    { title: '신발', items: ['전체', '스니커즈', '러닝', '농구', '슬리퍼'] },
    { title: '액세서리', items: ['전체', '모자', '가방', '양말', '장갑'] },
  ],
  Women: [
    { title: '의류', items: ['전체', '아우터', '브라탑', '레깅스', '원피스'] },
    { title: '신발', items: ['전체', '스니커즈', '러닝', '트레이닝', '슬리퍼'] },
    { title: '액세서리', items: ['전체', '모자', '가방', '양말', '장갑'] },
  ],
  Kids: [
    { title: '의류', items: ['전체', '아우터', '스웻셋업', '티셔츠', '팬츠'] },
    { title: '신발', items: ['전체', '스니커즈', '러닝', '샌들', '슬리퍼'] },
    { title: '액세서리', items: ['전체', '모자', '가방', '양말', '장갑'] },
  ],
} as const

