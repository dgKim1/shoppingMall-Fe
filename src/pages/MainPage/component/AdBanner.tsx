import { Button } from '../../../common'
import bannerImage from '../../../assets/banner.jpg'

export default function AdBanner() {
  return (
    <article className="sm:col-span-2 lg:col-span-3">
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-200">
          <img
            src={bannerImage}
            alt="lookbook banner"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center space-y-3 rounded-2xl bg-slate-900 px-6 py-10 text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">
            Lookbook
          </p>
          <h3 className="text-2xl font-semibold">astrogabber 이야기</h3>
          <p className="text-sm text-white/70">
            레트로 그린 컬러로 완성한 시즌 무드.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="border-white/40 text-white hover:bg-white/10"
          >
            스토리 보기
          </Button>
        </div>
      </div>
    </article>
  )
}
