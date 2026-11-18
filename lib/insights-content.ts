// The firm's supplied sample insights. Used to seed/replace the Content table
// (INSIGHT kind). The admin can edit everything afterwards.
//
// Sources: the four "sample insights" PDFs supplied by the firm. Two had a text
// layer (AMVCA fashion + Misuse of Personal Data) and two were image-only, so
// their text was OCR'd and lightly proofed — treat those as drafts to review.

export type InsightSeed = {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string;
  coverImage: string;
  publishedAt: string; // ISO date
  authorName: string;
  bodyHtml: string;
};

export const INSIGHTS: InsightSeed[] = [
  {
    slug: "amvca-who-owns-the-legal-rights-to-fashion-designs",
    title: "AMVCA: Who Owns the Legal Rights to the Fashion Designs?",
    category: null,
    excerpt:
      "Every year the AMVCA turns into Nigeria's most-watched fashion theatre. Behind the red carpet, a legal conversation about who owns a design is quietly building.",
    coverImage: "/photos/insight-fashion.jpg",
    publishedAt: "2026-08-17",
    authorName: "Pius Owhoavwodua, CIPP/E",
    bodyHtml: `
<p>Every year, the Africa Magic Viewers' Choice Awards (AMVCA) transforms into Nigeria's most-watched fashion theatre. Before the nominations are announced, before any award is lifted, the red carpet has already declared its own winners. Hashtags trend, stylists and designers are celebrated, but behind the flashing cameras and viral moments, a legal conversation is quietly building — one that the Nigerian fashion industry can no longer afford to avoid.</p>
<p>Immediately after the event, there were multiple reports of designers calling out celebrities on Instagram for taking their original sketches to cheaper tailors. The nature of the disputes ranges from celebrities threatening lawsuits over credit disputes, fast-fashion copycats listing replicas of custom gowns before the award ceremony even concludes, and beaders demanding recognition they were contractually denied. These are not mere social media tantrums. Each of these disputes demonstrates the legal and regulatory gaps in Nigeria's fashion industry.</p>
<p>This article examines the intellectual property dimensions of custom fashion creation in Nigeria, from the standpoint of the designer who conceives the work, the celebrity who commissions it, the team who builds it, and the copycat who steals it.</p>
<h2>I. The Industry Behind the Outfit: Nigeria's Fashion Economy</h2>
<p>Nigeria's fashion market generates an estimated $2.5 billion to $6 billion annually, making it one of the most economically viable creative sectors in the country. The broader figures place the industry's total contribution to Nigeria's GDP at roughly $6.1 billion. The apparel market alone is projected to reach $10 billion in revenue by 2025, with expected annual growth of 7.25% through 2029. Nigeria's fashion eCommerce market, valued at over $423 million in 2024, is forecast to grow to $579.9 million by 2028.</p>
<p>Nigerian fashion designers and a new wave of fashion innovators are increasingly showing up on international runways, landing cross-border retail partnerships, and exporting finished garments to buyers all over the world. Yet for all this hard work, the fashion industry remains structurally fragile. Despite billions in annual consumption and fashion contributing a modest share to GDP, the sector is heavily reliant on imported textiles and finished garments, and a significant portion of its activity remains informal and unregistered.</p>
<p>Intellectual property theft from local copycats and international fashion giants alike continues to cost Nigerian designers revenue they are entitled to and creative credit they have earned. This is the industry the law must protect.</p>
<h2>II. Buying the Dress Is Not Buying the Idea</h2>
<p>One of the most persistent misconceptions in Nigeria's fashion industry is the belief that commissioning and paying for a custom piece transfers all associated rights to the commissioner. It does not. Under the Copyright Act 2022, the "author" of a work — in this context, the designer — is the first owner of copyright in that work. Monetary consideration for a bespoke gown purchases the physical garment. It does not purchase the right to reproduce the design, authorize others to copy it, or launch a clothing line modelled on it.</p>
<h3>The AMVCA 2024 Dispute: A Live Illustration</h3>
<p>Few recent events illustrate the complexity of fashion intellectual property in the AMVCA context more vividly than the 2024 dispute involving Ghanaian actress Nana Akua Addo and Nigerian fashion designer Ezinne Olivia. Following the awards, Ezinne made social media posts asserting that she had made Nana's AMVCA outfit. Nana's lawyers responded with a letter demanding an apology, the removal of all posts crediting Ezinne with the outfit, a published apology in two Nigerian newspapers within 48 hours, and threatened ₦50 million in damages for falsehood and reputational injury.</p>
<p>The public reaction ranged from amusement to bewilderment — "for ordinary dress?" was a common refrain online. But the legal questions raised were anything but ordinary. Who made the dress? Was Ezinne a lead designer, a stylist, a beader, or an assembler of pieces sourced elsewhere? If she contributed creative skill to a garment, does she have a right to claim joint-authorship? Can a celebrity obtain a court order to suppress a designer's promotion of their own work? These are live questions under Nigerian law, and they arise directly from the absence of clear contractual documentation before the commission begins.</p>
<p>The Nana Addo dress saga has now extended into a second edition: at the 2026 AMVCA, the actress's new architectural gown by Nigerian designer AbbasWoman attracted a claim from Paris-based Almée Couture, which alleged the design was lifted from a cancelled commission — an original sketch and concept that was refunded to the client — only for the design to be reproduced without authorization. The same actress. Two editions. Two separate intellectual property controversies. The pattern is not coincidence; it is the direct consequence of an industry that creates without contracts.</p>
<h2>III. Ownership by Creation: Why the Designer Holds the Rights the Celebrity Cannot Buy</h2>
<p>The starting point of any fashion intellectual property analysis in Nigeria is the Copyright Act 2022. Under this legislation, an original custom dress, fixed in a tangible medium, qualifies for copyright protection as an artistic work. Copyright vests automatically upon creation; no registration is required. The designer who conceives and executes the work is therefore the first owner of the copyright in it. The celebrity who commissions the piece acquires the garment, not the copyright. Any claim to ownership beyond the physical item must rest on a written assignment or a contract to that effect.</p>
<p>Where a garment is the product of several creatives — a lead designer, a beader, a tailor, a stylist — the question of joint authorship arises. Under the Copyright Act 2022, a work of joint authorship is one created by two or more authors whose contributions are not distinct from one another. The designer who conceived the embellishment pattern, or who substantially modified the designer's original idea in ways that shaped the final work, has a stronger claim to joint authorship. The line is not always obvious, and the absence of contracts makes it even harder to draw.</p>
<h2>IV. Design Registration: The Registration Gap</h2>
<p>Where a designer creates a piece intended for multiple reproductions — broadly, more than 50 copies — the appropriate protection vehicle shifts. The Patents and Designs Act provides for the registration of industrial designs: the visual features of a product (shape, configuration, pattern, or ornamentation) that make it appealing to the eye. Registration under this framework confers a monopoly right to use the design commercially for a fixed period.</p>
<p>For fashion pieces, inherently one-of-a-kind, copyright remains the stronger and more natural shield. For a designer who intends to retail versions of a signature silhouette, industrial design registration should be pursued alongside copyright.</p>
<h2>V. The Legal Consequences of Copying Designs Under the Copyright Act 2022</h2>
<p>Under the Copyright Act 2022, reproducing a protected artistic work, or a substantial part of it, without the copyright owner's consent constitutes infringement. The test for substantiality is qualitative, not merely quantitative. A copycat who reproduces the distinctive architectural shape, the signature embellishment pattern, or the characteristic silhouette of a designer's work may infringe even if they alter the colorway or change minor details.</p>
<h2>Conclusion</h2>
<p>The AMVCA red carpet is more than a fashion showcase. It is a live demonstration of the economic, cultural, and legal stakes of creative work in Nigeria. Behind every custom gown that trends on social media, there is a designer whose livelihood depends on whether their creation will be respected, credited, and protected. Behind every celebrity look, there is a question of who made what, who owns what, and what was agreed. Behind every morning-after copycat post, there is a violation that the law can address — but only if the industry is organized enough to use it.</p>
<p>The outfit on that red carpet is not just fabric; it is intellectual property, economic value, cultural expression, and legal territory. It is time Nigerian law treated it as all four.</p>
<p><em>Disclaimer: This article is for informational purposes only and does not constitute legal advice. References to public figures, events, and disputes are strictly illustrative and should not be construed as statements of liability, wrongdoing, or fact.</em></p>
`,
  },
  {
    slug: "beyond-the-consent-paradigm-lawful-basis-under-the-ndpa-2023",
    title:
      "Beyond the Consent Paradigm: A Review of the Legal Basis for Processing Personal Data under the Nigeria Data Protection Act 2023",
    category: null,
    excerpt:
      "The NDPA 2023 does not require consent for every processing activity. This article examines the five independent lawful bases under Section 25(1)(b).",
    coverImage: "/photos/insight-consent.jpg",
    publishedAt: "2026-10-08",
    authorName: "Bridget Aisien, Esq.",
    bodyHtml: `
<h2>Introduction</h2>
<p>The increasing growth of the modern digital economy has made data processing a vital core of our daily life. Personal data of individuals is collected for the purpose of processing relevant and lawful information relating to those individuals. While the collection and processing of data relating to individuals for relevant and lawful purpose(s) is permitted, such processing could risk the fundamental right to privacy of those individuals; uncontrolled use of personal data can create a breach of the fundamental right to privacy of the data subject.</p>
<p>A prevailing perception within contemporary data protection discourse is that the processing of data is fundamentally predicated on the necessary consent of the data subject. However, this perception does not accurately reflect the position of law. This article examines the legal basis for processing personal data aside from obtaining the consent of the data subject, the circumstances in which these bases may be relied upon, the limitations that apply to them, and their practical implications for data controllers and data processors. It also examines the relationship between lawful basis and the broader principles of data protection, particularly lawfulness, fairness, transparency, purpose limitation, data minimisation, accountability and the rights of data subjects.</p>
<h2>Constitutional Background</h2>
<p>In Nigeria, the constitutional foundation of the right to privacy can be found in Section 37 of the 1999 Constitution of the Federal Republic of Nigeria (as amended). This section provides for the privacy of citizens, their homes, correspondence, telephone conversations, and telegraphic communications. Nigerian jurisprudence recognises that the right to privacy guaranteed under Section 37 of the Constitution extends to telephone conversations and telegraphic communications. The broad scope of this constitutional protection necessitated the development of a more comprehensive regulatory framework for the protection and processing of personal data, culminating in the enactment of the Nigeria Data Protection Act 2023.</p>
<h2>The Multiple Pathways to Lawful Data Processing Beyond Consent</h2>
<p>The enactment of the Nigeria Data Protection Act 2023 significantly strengthened the data privacy network in Nigeria. The Act also established the Nigeria Data Protection Commission (NDPC) as the statutory regulatory body responsible for regulating the processing of personal data and promoting the protection of data privacy in Nigeria. A fundamental feature of the Nigeria Data Protection Act, 2023 (NDPA) is its recognition that the lawful processing of personal data is not invariably dependent on the consent of the data subject alone. Rather, Section 25 of the Act provides for several distinct and independent lawful bases upon which personal data may be processed, provided that the requirements applicable to the relevant basis are satisfied.</p>
<p>This distinction is important because a common misconception in data protection practice is that an organisation must obtain consent before every instance of personal data processing. That is not the position under the NDPA. Consent is only one of several lawful bases.</p>
<h2>The Statutory Exceptions</h2>
<h3>1. Compliance with a legal obligation</h3>
<p>This basis applies where processing is necessary for compliance with a legal obligation to which the controller is subject. Where a law requires a controller to collect, retain, or disclose certain information — for example, financial institutions retaining records under anti-money-laundering rules, or employers reporting to a regulator — the controller may process the data without consent, provided the processing is limited to what the law requires.</p>
<h3>2. Court order and garnishee proceedings</h3>
<p>Where a court orders a bank to disclose a debtor's account information during a garnishee proceeding, the bank may provide the information without obtaining the debtor's consent. Most importantly, the controller must ensure that data being processed is limited to what the legal obligation requires.</p>
<h3>3. Safeguarding vital interests</h3>
<p>The rationale behind this basis is that certain circumstances may arise in which obtaining the consent of the data subject is impracticable and would defeat the purpose for which the data needs to be processed. This basis applies where the processing of personal data is necessary to protect an interest of fundamental importance. For instance, when a person is reported missing, some of the personal data — such as name, picture, age, emergency contact — may be shared to help locate and ensure the safety of such a person. Nevertheless, to remain within the scope of protecting vital interests without consent, the controller must limit processing to information reasonably necessary to address the situation.</p>
<h3>4. Performance of functions advancing the public interest</h3>
<p>This primarily applies where personal data is processed in furtherance of a function that serves a recognised public purpose or an act that falls under an official function conferred by law. This basis is particularly applicable to public institutions where the performance of their statutory duties requires the processing, disclosure or collection of personal data. For instance, tax authorities receive salary and employment information of employees directly from their employers in order to access their tax records and ensure accurate tax collection and prevention of fraud.</p>
<h3>5. Protection of legitimate interests</h3>
<p>This basis allows for processing without consent where the controller can demonstrate that processing is necessary to advance a legitimate interest, provided that it does not unfairly undermine the rights and interests of the data subject. This is particularly relevant to ordinary business, where legitimate interest is essential for routine operations and obtaining consent for every instance of processing may be impracticable. For instance, a customer may contact a retailer about a purchased faulty item, and the retailer may use the customer's data to arrange delivery of a replacement without seeking fresh consent. The controller needs to identify the specific legitimate interest being pursued and demonstrate that the processing is appropriate in such circumstances.</p>
<h2>Conclusion</h2>
<p>The provisions of Section 25(1)(b)(i–v) of the NDPA 2023 recognise that lawful data processing transcends the traditional reliance on consent. As examined in this article, this provision establishes a broader framework for processing data lawfully beyond the consent of the data subject. The significance of these lawful bases lies in their recognition that personal data may legitimately be processed in circumstances where consent is neither necessary nor appropriate. Each lawful basis operates within its distinct legal parameters and must be invoked in accordance with the nature and purpose of the processing.</p>
<p>Section 25(1)(b)(i–v) of the NDPA 2023 therefore does not seek to prevent the legitimate use of personal data; rather, it establishes the legal boundaries within which such processing may occur. A proper understanding and application of these lawful bases is essential to striking an appropriate balance between the legitimate processing of personal data and the protection of the fundamental privacy rights of data subjects in Nigeria.</p>
<h2>References</h2>
<ol>
<li>Section 37 of the 1999 Constitution of the Federal Republic of Nigeria (as amended).</li>
<li>Nigeria Data Protection Act 2023, Sections 24 and 25(1)(b)(i–v).</li>
<li>Articles 16, 21, 22, 24, 25 and 26 of the General Application and Implementation Directive ("GAID").</li>
</ol>
`,
  },
  {
    slug: "the-new-nimc-act-impact-on-individuals-and-businesses",
    title: "The New NIMC Act: Impact on Individuals and Businesses",
    category: null,
    excerpt:
      "The NIMC Act 2026 moves Nigeria from a paper-era identity registry to digital trust infrastructure. Here is what it means for individuals and businesses.",
    coverImage: "/photos/insight-identity.jpg",
    publishedAt: "2026-07-30",
    authorName: "Kosisochukwu Yvonne Okonkwo",
    bodyHtml: `
<h2>Introduction</h2>
<p>On June 26, 2026, President Bola Ahmed Tinubu signed the National Identity Management Commission (NIMC) Act 2026 into law, repealing the outdated 2007 framework and closing a nearly two-decade legislative gap. This shift transitions Nigeria from a basic, paper-era enrolment registry into a modern digital trust infrastructure.</p>
<p>The new Act elevates the NIMC from a simple record-keeper to the definitive anchor for transaction authentication, data protection, and electronic signatures across the country, fundamentally reshaping corporate compliance for businesses and everyday life for citizens.</p>
<h2>Core Features of the Act</h2>
<p>A few features stand out as the defining pillars of the reform:</p>
<h3>1. The NIN is the foundational credential for identification</h3>
<p>The Act entrenches the "One Person, One Identity" principle. It gives statutory backing to the NIN as the primary identifier for accessing an expanding range of services, including passport issuance, voter registration, bank account opening, insurance, tax filing, and consumer credit.</p>
<h3>2. NIMC as Root Certification Authority</h3>
<p>By designating the Commission as the country's Root Certification Authority (CA) for Public Key Infrastructure (PKI) and Digital Public Infrastructure (DPI), the Act positions NIMC at the centre of digital trust in Nigeria, comparable in function to the role a central bank plays for currency, but applied to identity and electronic authentication.</p>
<h3>3. Compliance with data protection law</h3>
<p>The Act brings NIMC's handling of personal data under the framework of the Nigeria Data Protection Act (NDPA) 2023, introducing a consent-first approach to third-party access to identity data, with only narrow exceptions such as High Court orders or defined criminal investigations. NIMC is also required to disclose to citizens, at the point of enrolment, how their data will be used and shared.</p>
<h3>4. Stronger enforcement and investigative powers</h3>
<p>Unlike the 2007 Act, which was largely administrative, the new law grants NIMC court-authorised powers of search, seizure, data decryption, and arrest against illegal enrolment centres, identity fraud syndicates, and data racketeers.</p>
<h3>5. More severe penalties for defaulters</h3>
<p>Offences such as impersonation, multiple registration, and unauthorised access to the identity database now attract a minimum of five years' imprisonment or fines starting at ₦10 million for individuals and ₦20 million for corporate entities, with the possibility of personal criminal liability for responsible executives.</p>
<h2>Enhancing Digital Identity and Regulatory Compliance</h2>
<p>The NIMC Act 2026 transforms Nigeria's identity ecosystem by establishing the National Identification Number (NIN) as the foundation for accessing essential public and private services, while strengthening trust in the country's digital economy.</p>
<p>For individuals, the Act makes the NIN central to activities such as banking, telecommunications, taxation, voting, pensions, consumer credit, and land transactions. In return, it introduces stronger safeguards for personal data through alignment with the Nigeria Data Protection Act, promotes inclusion by providing tailored enrolment mechanisms for vulnerable populations, and deters identity fraud through stricter penalties for impersonation, duplicate registration, and unauthorized access to identity data.</p>
<p>For businesses, the Act establishes a unified and secure identity infrastructure by designating NIMC as Nigeria's Root Certification Authority for the National Public Key Infrastructure (PKI) and Digital Public Infrastructure (DPI). This supports faster and more reliable customer verification, strengthens Know Your Customer (KYC) processes, reduces identity fraud, and enhances confidence in digital transactions. At the same time, businesses face heightened compliance obligations, with significant penalties for unlawful access, misuse of identity data, or other breaches of the Act.</p>
<p>Ultimately, the legislation strengthens both individual trust and corporate confidence, laying the legal foundation for a more secure, inclusive, and digitally driven Nigerian economy. A key feature of the NIMC Act 2026 is its alignment with Nigeria's data protection framework. As the Act expands the collection, storage, processing, and verification of personal identity data, it also reinforces the need for such data to be handled securely, lawfully, and transparently. These objectives complement the Nigeria Data Protection Act (NDPA) 2023, which establishes principles for the lawful processing of personal data.</p>
<h2>Conclusion</h2>
<p>The NIMC Act 2026 represents a fundamental shift in how Nigeria treats identity — from a paper-era registry to digital trust infrastructure. For individuals and businesses alike, the Act expands access and efficiency while raising the compliance bar. Organisations that handle identity data should review their KYC, data-retention and consent processes now, rather than after the first enforcement action.</p>
<p><em>Disclaimer: This article is intended for general information purposes and does not constitute legal advice. For advice specific to your circumstances, consult a qualified legal practitioner or specialist.</em></p>
`,
  },
  {
    slug: "misuse-of-personal-data-in-public-institutions",
    title:
      "Misuse of Personal Data in Public Institutions: A Review of the Landmark Judgment in JB Daudu SAN v. National Insurance Commission",
    category: null,
    excerpt:
      "The Federal High Court's judgment in JB Daudu SAN v. NIC strikes down the BVN mandate for insurance and affirms the principle of data minimisation.",
    coverImage: "/photos/insight-justice.jpg",
    publishedAt: "2026-07-15",
    authorName: "Pius & Noble LP",
    bodyHtml: `
<h2>Introduction</h2>
<p>In recent years, public institutions in Nigeria have increasingly collected and processed substantial amounts of personal information, ranging from National Identity Numbers (NIN) and Bank Verification Numbers (BVN) to biometric voters' records. However, the misuse and mishandling of these sensitive personal data pose severe risks to public trust and individual privacy. Reports emanating from the media frequently highlight unauthorized access, data leaks, and third-party commercial exploitation, where personal information held by government agencies ends up on illegitimate online platforms for nominal fees. Public accountability with regard to the handling of personal data is almost non-existent.</p>
<h2>The Constitutional Right to Privacy</h2>
<p>Section 37 of the Constitution guarantees the privacy of citizens, their homes, correspondence, telephone conversations, and telegraphic communications, and Nigerian courts have interpreted this to include the protection of personal data (including a BVN). For instance, in <em>Incorporated Trustees of Digital Rights Lawyers Initiative &amp; Ors v. National Identity Management Commission</em> (2021) LPELR-55623(CA), the Court of Appeal confirmed that Section 37 encompasses personal information and that data protection laws give effect to this right.</p>
<h2>The Landmark Judgment: JB Daudu SAN v. National Insurance Commission</h2>
<p>On July 1, 2026, Justice J.K. Omotosho of the Federal High Court, Abuja, delivered a landmark judgment in <em>Joseph Bodunrin Daudu SAN v. National Insurance Commission, Attorney General of the Federation, Central Bank of Nigeria &amp; Multi-Trade Insurance Brokers Ltd</em>, Suit No. FHC/ABJ/CS/2672/2025.</p>
<p>The case concerned the mandatory requirement for a Bank Verification Number (BVN) in insurance contracts. The Court held that the requirement was unnecessary and extraneous, and that the National Identification Number (NIN) is sufficient to identify insurance holders. Insurance companies, the Court explained, have no legal right or framework to demand or hold people's BVN, which is sensitive banking information. Compelling people to provide their BVN simply to obtain or renew insurance was therefore unjustifiable.</p>
<h2>What is Data Minimization?</h2>
<p>Data minimization is a core principle of the Nigeria Data Protection Act 2023, which provides that organizations can only collect and use the minimum personal data that is adequate, relevant, and strictly necessary for the stated purpose. Organizations cannot therefore collect or hoard any extra or unnecessary personal data "just in case."</p>
<p>In JB Daudu's case, the Federal High Court upheld the principle of data minimization when it held that the mandatory requirement for a Bank Verification Number in insurance contracts under Section 64(4) of the Nigeria Insurance Industry Reform Act 2025 was unnecessary and extraneous.</p>
<h2>Conclusion</h2>
<p>The JB Daudu judgment is a landmark decision in Nigeria's data privacy jurisprudence. It demonstrates judicial readiness to enforce the principle of data protection against public institutions that arbitrarily collect the personal data of data subjects without adherence to the provisions of the Nigeria Data Protection Act. By striking down the BVN mandate and implementing NDPA principles, the Court laudably set a clear standard that identification requirements must be justified, proportionate, and privacy compliant. This decision strengthens Nigeria's evolving framework for balancing regulatory goals with fundamental privacy rights.</p>
<h2>References</h2>
<ol>
<li><em>Joseph Bodunrin Daudu SAN v. National Insurance Commission, Attorney General of the Federation, Central Bank of Nigeria &amp; Multi-Trade Insurance Brokers Ltd</em> (2025) Suit No. FHC/ABJ/CS/2672/2025 (Federal High Court, Abuja, 1 July 2026).</li>
<li><em>Incorporated Trustees of Digital Rights Lawyers Initiative &amp; Ors v. National Identity Management Commission</em> (2021) LPELR-55623(CA).</li>
<li>Constitution of the Federal Republic of Nigeria 1999 (as amended), s 37.</li>
<li>Nigeria Insurance Industry Reform Act 2025, s 64(4).</li>
<li>Nigeria Data Protection Act 2023, s 24(1).</li>
<li>Banks and Other Financial Institutions Act 2020, ss 67 and 131.</li>
</ol>
`,
  },
];
