import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CataloguePage, type CatalogueSection } from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import {
  physicalCardSubcategories,
  physicalCardSubcategoryDesigns,
  type BaseProduct,
} from "@/data/products";

const title = "Physical Cards — SHUBHPATRA";
const description =
  "Printed invitation cards — velvet boxes, laser-cut jaali, hot foil and scrolls — browse every design by occasion.";

export const Route = createFileRoute("/physical-cards")({
  validateSearch: (search: Record<string, unknown>) => ({
    sub: typeof search["sub"] === "string" ? search["sub"] : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PhysicalCardsPage,
});

const sections: CatalogueSection[] = physicalCardSubcategories.map((subcategory) => ({
  subcategory,
}));

function PhysicalCardsPage() {
  const search = Route.useSearch();
  const sub = search["sub"];
  const [product, setProduct] = useState<BaseProduct | null>(null);

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <CataloguePage
          basePath="/physical-cards"
          categoryLabel="Physical Cards"
          eyebrow="Physical Cards"
          title={
            <>
              The printed <span className="font-display italic">heirloom catalogue</span>
            </>
          }
          lead="Velvet boxes, laser-cut jaali, hot foil and handmade paper — pick an occasion to see every card."
          sections={sections}
          getDesigns={(section) => physicalCardSubcategoryDesigns(section.subcategory)}
          activeKey={sub}
          onOpen={setProduct}
        />
        <Contact />
      </main>
      <SiteFooter />
      <ProductModal product={product} onClose={() => setProduct(null)} />
    </div>
  );
}
