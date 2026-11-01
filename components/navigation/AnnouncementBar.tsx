import { SITE } from '@/lib/config/site';

export function AnnouncementBar() {
  return (
    <section aria-label="Announcement" className="bg-chestnut text-butter" data-tone="dark">
      <div className="page-x flex flex-wrap items-center justify-center gap-x-8 gap-y-0.5 py-2 text-center text-[0.78rem]">
        <p>Made in {SITE.location}</p>
        <p>
          Bulk purchases: <a href={`tel:${SITE.bulkPhone}`} className="font-semibold underline underline-offset-4">{SITE.bulkPhoneDisplay}</a>
        </p>
      </div>
    </section>
  );
}
