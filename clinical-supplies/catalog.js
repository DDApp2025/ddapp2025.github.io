// ATG Clinical Supply catalog — single source of truth.
//
// Loaded as a classic script by:
//   - /clinical-supplies/index.html                  (landing page)
//   - /clinical-supplies/{slug}/index.html           (per-SKU detail pages, 10 of them)
//
// Also loadable via CommonJS for offline build tooling (see the dual export
// at the bottom of this file).
//
// Pricing note: injectorPrice and publicPrice values are sourcing-research
// placeholders from docs/SKU_CATALOG.md. Confirm at pro-account setup with
// each source, then update in this file — NOT in any page's markup.
//
// Stripe links are "TODO_STRIPE_LINK" placeholders. Replace with real
// Stripe Payment Link URLs once Payment Links are created.

const CATALOG = {
  skus: [
    // ===================================================================
    // Category 1 — Exosome Serums (topical, post-procedure)
    // ===================================================================
    {
      id: "benev-erc",
      category: "exosomes",
      categoryLabel: "Exosome Serum",
      name: "BENEV Exosome Regenerative Complex (ERC)",
      shortName: "BENEV ERC",
      manufacturer: "BENEV Company, Inc.",
      packSize: "1 box · 5 treatment sets",
      packDetail: "Each box contains 5 treatment sets. Each set pairs one vial of 20mg lyophilized exosome complex with a 5mL hyaluronic acid diluent vial for in-clinic reconstitution.",
      rationale: "Market-leading topical exosome serum. Post-microneedling, post-laser, post-RF, post-PRP adjunct.",
      clinicalUse: "Topical adjunct applied immediately after microneedling, fractional laser, RF microneedling, PRP, or chemical peel procedures. Supports the skin's native recovery response during the critical post-procedure window and pairs naturally with every device-based aesthetic protocol.",
      sourcing: "Drop-shipped direct from BENEV or an authorized professional distributor. Cold-chain: ships overnight on cold pack Monday through Wednesday. Refrigerate on arrival; 2-year shelf life refrigerated.",
      licensing: "Purchase requires a verified aesthetic or medical professional credential (MD, NP, RN, PA, licensed aesthetician) and a business ship-to address on file.",
      coldChain: true,
      injectorPrice: 560,
      publicPrice: 799,
      slug: "benev-erc",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "anteage-mdx",
      category: "exosomes",
      categoryLabel: "Exosome Serum",
      name: "AnteAGE MDX Exosome Solution",
      shortName: "AnteAGE MDX",
      manufacturer: "AnteAGE (Cellese)",
      packSize: "Single treatment set · lyophilized + HA diluent",
      packDetail: "One lyophilized exosome vial paired with a hyaluronic acid diluent vial, reconstituted at point of use.",
      rationale: "Hybrid bone marrow + umbilical cord MSC exosomes. Second-line exosome option alongside BENEV.",
      clinicalUse: "Topical post-procedure adjunct. Hybrid bone-marrow + umbilical-cord MSC exosome profile positioned as a second-line exosome option for practices that already stock BENEV ERC and want a second lane.",
      sourcing: "Drop-shipped direct from AnteAGE. Refrigerated storage; reconstituted in-clinic at point of use.",
      licensing: "Professional account required. AnteAGE verifies aesthetic or medical licensure during account setup.",
      coldChain: true,
      injectorPrice: 375,
      publicPrice: 699,
      slug: "anteage-mdx",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "exo-skin-serum",
      category: "exosomes",
      categoryLabel: "Exosome Serum",
      name: "Dp Dermaceuticals EXO-SKIN Serum 30mL",
      shortName: "EXO-SKIN Serum",
      manufacturer: "Dp Dermaceuticals (Dermapenworld)",
      packSize: "30mL bottle · room-temp stable",
      packDetail: "Single 30mL bottle formulated with ethically-sourced MSC exosomes, HLA-G immune-tolerant complex, hyaluronic acid, and copper peptides.",
      rationale: "Take-home exosome serum for patients between in-clinic treatments. Room-temp stable.",
      clinicalUse: "Daily-use take-home serum for patients to apply between in-clinic exosome treatments. Opens a patient-retail revenue line without the cold-chain handling burden of injectable-grade exosome products.",
      sourcing: "Drop-shipped from the Dp Dermaceuticals pro channel. Room-temperature stable — no cold-chain required.",
      licensing: "Aesthetic professional account required for wholesale pricing.",
      coldChain: false,
      injectorPrice: 220,
      publicPrice: 329,
      slug: "exo-skin-serum",
      stripeLink: "TODO_STRIPE_LINK"
    },

    // ===================================================================
    // Category 2 — Post-Procedure Devices
    // ===================================================================
    {
      id: "drpen-a20",
      category: "devices",
      categoryLabel: "Post-Procedure Device",
      name: "Dr. Pen A20 Advanced Microneedling Pen",
      shortName: "Dr. Pen A20",
      manufacturer: "Dr. Pen (US authorized distributors)",
      packSize: "Pen + cartridges + charging stand",
      packDetail: "A20 microneedling pen unit, standard cartridge starter pack, charging stand, power adapter, and carry case.",
      rationale: "FDA-cleared pro microneedling pen. Workhorse for exosome and serum-infusion protocols.",
      clinicalUse: "FDA-cleared professional microneedling pen. AVOS (Advanced Vertical Oscillation System) drive. Workhorse device for every exosome or serum-driven recovery protocol — natural attach for BENEV ERC, AnteAGE MDX, or any growth-factor topical.",
      sourcing: "Drop-shipped from an authorized US distributor (us.drpen.co or drpen.net). Room-temperature shipping; no cold-chain required.",
      licensing: "Not strictly credentialed for the device itself. Authorized US distributors prefer verified professional accounts for pro-tier pricing.",
      coldChain: false,
      injectorPrice: 330,
      publicPrice: 449,
      slug: "drpen-a20",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "drpen-h6",
      category: "devices",
      categoryLabel: "Post-Procedure Device",
      name: "Dr. Pen Hydra Pen H6",
      shortName: "Hydra Pen H6",
      manufacturer: "Dr. Pen (US authorized distributors)",
      packSize: "Pen + 3mL reservoir + LED + cartridges",
      packDetail: "Hydra Pen H6 unit with a built-in 3mL serum reservoir, red and blue LED modes, and a standard cartridge set.",
      rationale: "Three-in-one pen: microneedling + serum infusion + red/blue LED for single-device workflows.",
      clinicalUse: "Three-in-one pen for practices consolidating microneedling, serum infusion, and LED therapy into a single device and workflow. Strong upsell path from a basic microneedling pen.",
      sourcing: "Drop-shipped from an authorized US distributor. Room-temperature shipping.",
      licensing: "Professional account preferred, not strictly required.",
      coldChain: false,
      injectorPrice: 280,
      publicPrice: 399,
      slug: "drpen-h6",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "celluma-pro",
      category: "devices",
      categoryLabel: "Post-Procedure Device",
      name: "Celluma PRO LED Light Therapy",
      shortName: "Celluma PRO",
      manufacturer: "BioPhotas / Celluma",
      packSize: "Flexible LED panel + controller + stand",
      packDetail: "Celluma PRO flexible LED panel, controller unit, floor-to-treatment stand, and protective goggles.",
      rationale: "FDA-cleared pro LED. Pairs with exosome facials, microneedling recovery, calming post-injection protocols.",
      clinicalUse: "FDA-cleared for acne, anti-aging, pain management, and hair restoration. Pairs with exosome facials, microneedling recovery, and post-toxin or post-filler calming protocols. Industry-standard professional LED device.",
      sourcing: "Drop-shipped from the Celluma professional channel. Room-temperature shipping.",
      licensing: "Licensed medical or aesthetic professional credentials required. Celluma verifies qualifications during professional-account setup.",
      coldChain: false,
      injectorPrice: 1845,
      publicPrice: 2195,
      slug: "celluma-pro",
      stripeLink: "TODO_STRIPE_LINK"
    },

    // ===================================================================
    // Category 3 — Skincare Actives
    // ===================================================================
    {
      id: "skinceuticals-ce-ferulic",
      category: "skincare",
      categoryLabel: "Skincare Active",
      name: "SkinCeuticals C E Ferulic",
      shortName: "SkinCeuticals CE Ferulic",
      manufacturer: "SkinCeuticals (L'Oréal Active Cosmetics)",
      packSize: "30mL / 1 fl oz",
      packDetail: "Single 30mL bottle of 15% L-ascorbic acid + 1% vitamin E + 0.5% ferulic acid daytime antioxidant serum.",
      rationale: "Gold-standard daytime vitamin C + ferulic + vitamin E. Highest patient name recognition in the category.",
      clinicalUse: "Gold-standard daytime antioxidant for every practice shelf. Clinically foundational for post-procedure patients. Highest patient name-recognition in the medical-skincare category — patients frequently request it by name.",
      sourcing: "Drop-shipped from the SkinCeuticals professional channel or an authorized distributor. Room-temperature shipping.",
      licensing: "SkinCeuticals Professional accounts require a verified licensed aesthetic practice (MD, PA, NP, dermatology, plastic surgery, or aesthetic-specialty clinic).",
      coldChain: false,
      injectorPrice: 115,
      publicPrice: 182,
      slug: "skinceuticals-ce-ferulic",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "skinmedica-tns-advanced",
      category: "skincare",
      categoryLabel: "Skincare Active",
      name: "SkinMedica TNS Advanced+",
      shortName: "TNS Advanced+",
      manufacturer: "SkinMedica (Allergan Aesthetics / AbbVie)",
      packSize: "28.4g / 1 fl oz",
      packDetail: "Single 28.4g bottle of TNS Advanced+ growth-factor serum.",
      rationale: "Growth-factor serum in the Allergan family. Only growth-factor product clinically proven for sagging skin.",
      clinicalUse: "The only growth-factor topical with clinical data supporting improvement in sagging skin. Natural fit for any practice already operating under an Allergan Aesthetics account with Botox and Juvederm.",
      sourcing: "Drop-shipped via the Allergan Aesthetics SkinMedica practice program. Typically rolled up under an existing Allergan Botox/Juvederm account.",
      licensing: "SkinMedica practice accounts require verified medical or aesthetic license, usually bundled under an existing Allergan Aesthetics account.",
      coldChain: false,
      injectorPrice: 205,
      publicPrice: 295,
      slug: "skinmedica-tns-advanced",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "zo-daily-power-defense",
      category: "skincare",
      categoryLabel: "Skincare Active",
      name: "ZO Skin Health Daily Power Defense",
      shortName: "ZO Daily Power Defense",
      manufacturer: "ZO Skin Health",
      packSize: "30mL airless pump",
      packDetail: "Single 30mL airless pump bottle with retinol, antioxidants, and DNA-repair enzymes.",
      rationale: "Retinol + antioxidants + DNA-repair enzymes. Evening workhorse for anti-aging regimens.",
      clinicalUse: "Evening workhorse for anti-aging regimens. Retinol, antioxidants, and DNA-repair enzymes in one nightly application. One of the top three practice-skincare brands by revenue — patients recognize it and come back for refills.",
      sourcing: "Drop-shipped from the ZO Skin Health Professional channel or an authorized distributor. Room-temperature shipping.",
      licensing: "ZO Professional accounts require verified licensed aesthetic practice.",
      coldChain: false,
      injectorPrice: 115,
      publicPrice: 159,
      slug: "zo-daily-power-defense",
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "obagi-professional-c-20",
      category: "skincare",
      categoryLabel: "Skincare Active",
      name: "Obagi Professional-C Serum 20%",
      shortName: "Obagi Pro-C 20%",
      manufacturer: "Obagi Medical",
      packSize: "30mL / 1 fl oz",
      packDetail: "Single 30mL bottle of Professional-C 20% L-ascorbic acid vitamin C serum.",
      rationale: "20% L-ascorbic acid vitamin C for oily complexions. Complements CE Ferulic at a different price point.",
      clinicalUse: "Higher-concentration (20%) L-ascorbic acid vitamin C serum tuned for oily and resilient complexions. Complements SkinCeuticals CE Ferulic on the same practice shelf at a different price point and skin-type target.",
      sourcing: "Drop-shipped from the Obagi Professional channel. Room-temperature shipping.",
      licensing: "Obagi Professional registration requires licensed practitioner verification (physician, dermatologist, or aesthetic practice).",
      coldChain: false,
      injectorPrice: 95,
      publicPrice: 126,
      slug: "obagi-professional-c-20",
      stripeLink: "TODO_STRIPE_LINK"
    }
  ],

  // =====================================================================
  // Bundles
  // =====================================================================
  bundles: [
    {
      id: "post-microneedling-exosome-kit",
      name: "Post-Microneedling Exosome Kit",
      pitch: "The complete post-microneedling exosome workflow in one SKU. Pro-grade pen + professional exosome serum, ready to deliver the flagship recovery protocol from day one.",
      includedSkuIds: ["drpen-a20","benev-erc"],
      listPrice: 890,
      bundlePrice: 649,
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "recovery-retail-bundle",
      name: "Recovery + Retail Bundle",
      pitch: "In-clinic exosome treatment + take-home exosome serum + gold-standard daytime antioxidant. Complete post-procedure protocol patients start in your chair and continue at home.",
      includedSkuIds: ["benev-erc","exo-skin-serum","skinceuticals-ce-ferulic"],
      listPrice: 895,
      bundlePrice: 675,
      stripeLink: "TODO_STRIPE_LINK"
    },
    {
      id: "full-regimen-starter",
      name: "Full Regimen Starter",
      pitch: "The three medical-grade skincare regimens injectors recommend most — morning antioxidant, evening growth factor, daily DNA-repair defense. Stock it, recommend it, refill it.",
      includedSkuIds: ["skinceuticals-ce-ferulic","skinmedica-tns-advanced","zo-daily-power-defense"],
      listPrice: 435,
      bundlePrice: 349,
      stripeLink: "TODO_STRIPE_LINK"
    }
  ]
};

// Dual export: classic global in browsers, CommonJS module in Node build tooling.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CATALOG };
}
