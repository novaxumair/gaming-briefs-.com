import Image from "next/image";
import Link from "next/link";
import AccessCta from "@/components/gyc/AccessCta";
import ArticleGuideHero from "@/components/gyc/ArticleGuideHero";
import FeaturedGuideArticleSection from "@/components/gyc/FeaturedGuideArticle";
import GuideAccessBar from "@/components/gyc/GuideAccessBar";
import SatanoImage from "@/components/gyc/SatanoImage";
import ReviewSection from "@/components/reviews/ReviewSection";
import {
  articleBlogIntro,
  articleBlogSectionTitle,
  articleCommunityPicks,
  articleCommunitySummary,
  articleFaqs,
  articleFaqCategories,
  articleFaqIntro,
  articleFeatureImages,
  articleFeatures,
  articleFeatureSectionTitle,
  articleMarketCriteria,
  articleMarketCta,
  articleMarketSites,
  articleMarketSummary,
} from "@/lib/article-guide";
import type { Guide } from "@/lib/data";
import { getGameUrl, getGuideUrl } from "@/lib/data";
import { getFeaturedGuide } from "@/lib/featured-guides";
import { isBuyAvailable } from "@/lib/buy-links";
import { isSatanoRemoteImage } from "@/lib/gameplay-images";

function MarketMark({ value }: { value: boolean | "partial" }) {
  if (value === true) {
    return (
      <span className="article-market-mark article-market-mark-yes" aria-label="Yes">
        ✓
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="article-market-mark article-market-mark-partial" aria-label="Partial">
        ~
      </span>
    );
  }
  return (
    <span className="article-market-mark article-market-mark-no" aria-label="No">
      —
    </span>
  );
}

function FeatureImage({ src, alt }: { src: string; alt: string }) {
  if (isSatanoRemoteImage(src)) {
    return (
      <SatanoImage
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 440px"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 440px"
      unoptimized={src.endsWith(".gif")}
    />
  );
}

export default function ArticleGuide({
  guide,
  related,
  variant = "cheats",
}: {
  guide: Guide;
  related: Guide[];
  variant?: "full" | "cheats";
}) {
  const isFull = variant === "full";
  const buyAvailable = isBuyAvailable(guide.slug);
  const pagePath = isFull ? getGameUrl(guide.slug) : getGuideUrl(guide.slug);
  const relatedHref = (slug: string) => (isFull ? getGameUrl(slug) : getGuideUrl(slug));
  const images = articleFeatureImages(guide);
  const features = articleFeatures(guide);
  const blogIntro = articleBlogIntro(guide);
  const communityPicks = articleCommunityPicks(guide);
  const marketSites = articleMarketSites(guide);
  const marketCriteria = articleMarketCriteria(guide);
  const faqs = articleFaqs(guide);
  const faqCategories = articleFaqCategories(guide);
  const gameName = guide.gameName;
  const featuredGuide = getFeaturedGuide(guide.slug);

  return (
    <article className={`article-guide${buyAvailable ? " guide-page-has-access-bar" : ""}`}>
      <nav className="guide-crumb">
        {isFull ? (
          <>
            <Link href="/">Catalog home</Link>
            <span>/</span>
            <span>{gameName}</span>
          </>
        ) : (
          <>
            <Link href="/">Catalog home</Link>
            <span>/</span>
            <Link href="/articles">Cheat guides</Link>
            <span>/</span>
            <span>{gameName}</span>
          </>
        )}
      </nav>

      <ArticleGuideHero guide={guide} variant={variant} />

      {featuredGuide && isFull ? (
        <section className="article-guide-body site-container">
          <FeaturedGuideArticleSection guide={featuredGuide} />
        </section>
      ) : (
        <>
      <section className="article-guide-blog" aria-label={`${gameName} cheat guide overview`}>
        <header className="article-guide-section-head article-guide-blog-head">
          <p className="article-guide-section-kicker">Deep dive</p>
          <h2>{articleBlogSectionTitle(guide)}</h2>
          <p className="article-guide-section-lead">
            Patch notes, buyer habits, and the features that show up most every season.
          </p>
        </header>

        <div className="article-guide-blog-sections">
          {blogIntro.map((block) => (
            <article key={block.id} id={block.id} className="article-guide-blog-block">
              <div className="article-guide-blog-block-head">
                <h3>{block.title}</h3>
                {block.tag ? <span className="article-guide-blog-tag">{block.tag}</span> : null}
              </div>
              <p>{block.body}</p>
              {block.bullets?.length ? (
                <ul>
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <div className="article-guide-body">
        <header className="article-guide-section-head">
          <p className="article-guide-section-kicker">Feature breakdown</p>
          <h2 id="article-features">{articleFeatureSectionTitle(guide)}</h2>
          <p className="article-guide-section-lead">
            Gameplay screenshots for every major feature — so you know exactly what you are
            buying before checkout.
          </p>
        </header>

        {features.map((feature, index) => {
          const image = images[index] ?? images[0]!;
          const reverse = index % 2 === 1;

          return (
            <section
              key={feature.id}
              id={feature.id}
              className={`article-guide-feature${reverse ? " article-guide-feature-reverse" : ""}`}
            >
              <div className="article-guide-feature-copy">
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
                <ul>
                  {feature.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <figure className="article-guide-feature-media">
                <div className="article-guide-feature-frame">
                  <FeatureImage
                    src={image}
                    alt={`${gameName} ${feature.title} — gameplay preview`}
                  />
                </div>
              </figure>
            </section>
          );
        })}

        <section className="article-guide-picks" aria-labelledby="article-picks">
          <div className="article-guide-picks-intro">
            <p className="article-guide-section-kicker">Community snapshot</p>
            <h2 id="article-picks">What {gameName} players think are best</h2>
            <p className="article-guide-section-lead">{articleCommunitySummary(guide)}</p>
          </div>

          <ol className="article-guide-picks-list">
            {communityPicks.map((pick) => (
              <li key={pick.feature} className="article-guide-pick">
                <div className="article-guide-pick-head">
                  <span className="article-guide-pick-rank">#{pick.rank}</span>
                  <div className="article-guide-pick-title">
                    <span className="article-guide-pick-name">{pick.feature}</span>
                    <span className="article-guide-pick-share">{pick.share}% of buyers</span>
                  </div>
                </div>
                <div className="article-guide-pick-track" aria-hidden>
                  <span className="article-guide-pick-fill" style={{ width: `${pick.share}%` }} />
                </div>
                <p className="article-guide-pick-note">{pick.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="article-guide-market" aria-labelledby="article-market">
          {(() => {
            const winner = marketSites.find((site) => site.recommended);
            const rivals = marketSites.filter((site) => !site.recommended);
            if (!winner) return null;

            return (
              <>
                <div className="article-market-intro">
                  <p className="article-market-kicker">Where {gameName} buyers shop</p>
                  <h2 id="article-market">Zadeyo vs other {gameName} sellers</h2>
                  <p className="article-guide-market-lead">{articleMarketSummary(guide)}</p>
                </div>

                <div className="article-market-podium">
                  <article className="article-market-winner" aria-label={`${winner.name} rated ${winner.score} out of 10`}>
                    <div className="article-market-winner-glow" aria-hidden />
                    <div className="article-market-winner-top">
                      <span className="article-market-winner-badge">Recommended</span>
                      <div className="article-market-winner-score">
                        <span className="article-market-winner-score-num">{winner.score}</span>
                        <span className="article-market-winner-score-max">/10</span>
                      </div>
                    </div>
                    <h3 className="article-market-winner-name">{winner.name}</h3>
                    <p className="article-market-winner-tagline">
                      Clear listings, instant delivery, updated builds — no Discord lottery.
                    </p>
                    <div className="article-market-score-track article-market-score-track-winner">
                      <span className="article-market-score-fill" style={{ width: "100%" }} />
                    </div>
                    <ul className="article-market-winner-points">
                      <li>Features listed before checkout</li>
                      <li>Patch status + spoofer docs</li>
                      <li>Support that is not a random DM</li>
                    </ul>
                  </article>

                  <div className="article-market-rivals">
                    <p className="article-market-rivals-label">Other channels scored</p>
                    <ul className="article-market-rivals-list">
                      {rivals.map((site) => (
                        <li key={site.id} className="article-market-rival">
                          <div className="article-market-rival-head">
                            <span className="article-market-rival-name">{site.name}</span>
                            <span className="article-market-rival-score">
                              {site.score}
                              <span className="article-market-rival-score-max">/10</span>
                            </span>
                          </div>
                          <div className="article-market-score-track">
                            <span
                              className="article-market-score-fill article-market-score-fill-muted"
                              style={{ width: `${site.score * 10}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="article-market-table-panel">
                  <div className="article-market-table-head">
                    <h3>Side-by-side checklist</h3>
                    <div className="article-market-legend" aria-hidden>
                      <span className="article-market-legend-item">
                        <span className="article-market-yes">✓</span> Yes
                      </span>
                      <span className="article-market-legend-item">
                        <span className="article-market-partial">~</span> Partial
                      </span>
                      <span className="article-market-legend-item">
                        <span className="article-market-no">—</span> No
                      </span>
                    </div>
                  </div>
                  <div className="guide-table-wrap article-guide-market-table-wrap">
                    <table className="guide-table article-guide-market-table">
                      <thead>
                        <tr>
                          <th scope="col">What buyers check</th>
                          {marketSites.map((site) => (
                            <th
                              key={site.id}
                              scope="col"
                              className={site.recommended ? "article-market-col-zadeyo" : undefined}
                            >
                              <span className="article-market-th-inner">
                                <span className="article-market-th-name">{site.name}</span>
                                {site.recommended ? (
                                  <span className="article-market-th-badge">Best</span>
                                ) : (
                                  <span className="article-market-th-score">{site.score}/10</span>
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {marketCriteria.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            {marketSites.map((site) => (
                              <td
                                key={site.id}
                                className={site.recommended ? "article-market-col-zadeyo" : undefined}
                              >
                                <MarketMark value={row.values[site.id] ?? false} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {buyAvailable ? (
                  <div className="article-market-foot-wrap">
                    <div className="article-guide-market-foot">
                      <p>{articleMarketCta(guide)}</p>
                      <AccessCta slug={guide.slug} gameName={gameName} label="Get access via Zadeyo" />
                    </div>
                  </div>
                ) : null}
              </>
            );
          })()}
        </section>
      </div>
        </>
      )}

      <div className="article-guide-body">
        <section className="article-guide-faq" aria-labelledby="article-faq">
          <div className="article-guide-faq-intro">
            <p className="article-guide-section-kicker">What people search most</p>
            <h2 id="article-faq">{gameName} cheat FAQs buyers ask first</h2>
            <p className="article-guide-section-lead">{articleFaqIntro(guide)}</p>

            <div className="article-guide-faq-quick" aria-label="Most searched questions">
              {faqs
                .filter((item) => item.popular)
                .map((item) => (
                  <a key={item.id} href={`#faq-${item.id}`} className="article-guide-faq-quick-link">
                    {item.question}
                  </a>
                ))}
            </div>

            <div className="article-guide-faq-categories" aria-hidden>
              {faqCategories.map((category) => (
                <span key={category} className="article-guide-faq-category-pill">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="article-guide-faq-panel">
            {faqs.map((item, index) => (
              <details
                key={item.id}
                id={`faq-${item.id}`}
                className={`article-guide-faq-item${item.popular ? " is-popular" : ""}`}
                open={index === 0}
              >
                <summary>
                  <span className="article-guide-faq-summary-main">
                    <span className="article-guide-faq-badges">
                      {item.popular ? (
                        <span className="article-guide-faq-popular">Top search</span>
                      ) : null}
                      <span className="article-guide-faq-category">{item.category}</span>
                    </span>
                    <span className="article-guide-faq-question">{item.question}</span>
                  </span>
                  <span className="article-guide-faq-chevron" aria-hidden />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {buyAvailable ? (
          <section className="article-guide-cta">
            <h2>Get {gameName} access</h2>
            <p>Checkout → loader → play. Same flow as the builds shown above.</p>
            <AccessCta slug={guide.slug} gameName={gameName} size="lg" />
          </section>
        ) : null}

        <footer className="article-guide-more">
          <p className="article-guide-more-label">More guides</p>
          <ul>
            {related.slice(0, 4).map((item) => (
              <li key={item.slug}>
                <Link href={relatedHref(item.slug)}>{item.gameName} cheats</Link>
              </li>
            ))}
          </ul>
          <p className="guide-footer-links">
            <Link href="/articles">All cheat guides</Link>
            <span>·</span>
            <Link href="/">Catalog home</Link>
          </p>
        </footer>
      </div>

      <ReviewSection pageSlug={guide.slug} pageTitle={gameName} pagePath={pagePath} />

      {buyAvailable ? <GuideAccessBar slug={guide.slug} gameName={gameName} /> : null}
    </article>
  );
}
