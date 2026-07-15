import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <p className="text-[#0F5132] text-xs uppercase tracking-[0.25em] mb-4">Updated: May 31, 2024</p>
        <h1 className="text-[#0F5132] mb-10" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "0.02em" }}>
          THE MRG GROUP PRIVACY STATEMENT
        </h1>

        <div className="prose prose-green max-w-none text-[#0F5132]/80 text-sm leading-relaxed flex flex-col gap-6">
          <p>
            M. Gibbons Holdings Ltd ("MRG", "we" or "us") is committed to protecting your privacy and safeguarding your personal information. The purpose of this privacy statement is to inform you about our privacy practices, including how we collect, use and disclose your personal information.
          </p>
          <p>
            This privacy statement relates to all of our activities, unless we have provided you with a separate privacy statement for a particular product, service or activity.
          </p>
          <p>
            Please review this privacy statement carefully. By submitting your personal information to us, by registering for or using any of the services we offer, by using our website, or by voluntarily interacting with us, you consent to our collecting, using and disclosing your personal information as set out in this privacy statement, as revised from time to time.
          </p>

          <div>
            <h2 className="text-[#0F5132] mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em" }}>
              WHAT&apos;S IN THIS PRIVACY POLICY?
            </h2>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-[#0F5132]">
              {[
                "Meaning of Personal Information",
                "Your Consent to Collection, Use and Disclosure",
                "Personal Information We Collect",
                "How We Use Your Personal Information",
                "How We Share Your Personal Information",
                "Opting Out of Communications",
                "Retention of Personal Information",
                "Information Security",
                "Accessing and Updating Your Personal Information",
                "International Transfer and Storage of Information",
                "Third Party Websites and Services",
                "Children's Information",
                "Privacy Statement Updates",
                "Contact Us",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Section title="Meaning of Personal Information">
            <p>
              "Personal information" means information about an identifiable individual. This information may include, but is not limited to, your name, date of birth, gender, mailing address, e-mail address and telephone number.
            </p>
            <p>
              Personal information does not include any business contact information that is solely used to communicate with you in relation to your employment, business or profession, such as your name, position name or title, work address, work telephone number, work fax number or work electronic address.
            </p>
            <p>
              Personal information also does not include information that has been anonymized or aggregated in such a way that there is no serious possibility it can be used to identify an individual, whether on its own or in combination with other information.
            </p>
          </Section>

          <Section title="Your Consent to Collection, Use and Disclosure">
            <p>
              We collect, use and disclose your personal information with your consent or as permitted or required by law. How we obtain your consent (i.e. the form we use) will depend on the circumstances, as well as the sensitivity of the information collected. Subject to applicable laws, your consent may be express or implied, depending on the circumstances and the sensitivity of the personal information in question. If you choose to provide personal information to us, we assume that you consent to the collection, use and disclosure of your personal information as outlined in this privacy statement.
            </p>
            <p>
              Typically, we will seek your consent at the time your personal information is collected. Where we want to use your personal information for a purpose not previously identified to you at the time of collection, we will seek your consent prior to our use of such information for this new purpose.
            </p>
            <p>
              You may withdraw your consent to our collection, use or disclosure of your personal information at any time by contacting us using the contact information in the "Contact Us" section below. However, before we implement the withdrawal of consent, we may require proof of your identity. In some cases, withdrawal of your consent may mean that we will no longer be able to provide certain products or services.
            </p>
            <p>
              If you provide personal information about another individual to us, it is your responsibility to obtain the consent of that individual to enable us to collect, use and disclose his or her information as described in this privacy statement.
            </p>
          </Section>

          <Section title="Personal Information We Collect">
            <p>The personal information we collect is generally in one or more of the following categories.</p>
            <p>
              <strong>Products and Services.</strong> For individuals who use our products and services, we may collect information from you or from your use of our products or services.
            </p>
            <p>
              Information you submit to us: we collect information that you submit through your use of our products or services, including information you provide in connection with the creation and management of your account for our products or services, such as your name, e-mail address and other contact information and password.
            </p>
            <p>
              Information we automatically collect: we collect log data and usage information relating to your use of our products and services.
            </p>
            <p>
              <strong>Website.</strong> For individuals who visit our website located at www.themrggroup.com or any of our related websites (collectively, "our website"), we may collect information from you or from your activities on the site.
            </p>
            <p>
              Like most websites and other Internet services, we may collect certain technical and device information about your use of our website. Such information may include your Internet protocol address, information about your device, browser and operating system, and the date and time of your visit.
            </p>
            <p>
              We may also use "cookies" or enlist third party services which use cookies to track your preferences and activities on our website. Cookies are small data files transferred to your computer's hard-drive by a website. They keep a record of your preferences, making your subsequent visits to the site more efficient. Cookies may store a variety of information, including the number of times that you access a site, your registration information and the number of times that you view a particular page or other item on the site. The use of cookies is a common practice adopted by most major sites to better serve their users. Most browsers are designed to accept cookies, but they can be modified to block cookies. See your browser's help files for more information. You should note, however, that without cookies some of our website's functions may not be available.
            </p>
            <p>
              We may also use "web beacons" to better understand how our website is being used and to enhance your online experience. Web beacons are Internet tools that help us determine, for example, whether a page of our website has been viewed.
            </p>
            <p>
              Additionally, our website may include certain social media features (for example, the Facebook like button) and other widgets (for example, the ShareThis share button). These features and widgets may collect your Internet protocol address, which page you are visiting on our website, and set cookies to enable the feature and/or widget to function properly. Such features and widgets are hosted by third parties or directly on our website. Your interactions with these features and widgets are governed by the privacy statement of the applicable third party service provider.
            </p>
            <p>
              <strong>Other Interactions.</strong> For individuals who otherwise interact with us, whether in person, by phone or email, through social media or otherwise, including individuals who might be interested in acquiring our products or services, who sign-up to receive newsletters or other communications, or who respond to surveys and questionnaires, we may collect information that you provide to us during these interactions. This information may include your name, e-mail address and other contact information.
            </p>
            <p>
              We do not collect payment card information. If you make an online payment using a payment card, such as a credit card or debit card, you are connected directly to our online payment processing service provider and your payment card information is collected and processed by that service provider.
            </p>
          </Section>

          <Section title="How We Use Your Personal Information">
            <p>We may use your personal information and other information for purposes such as:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-[#0F5132]">
              <li>to provide you with our products and services and to support your use of our products and services;</li>
              <li>to contact you relating to our products and services;</li>
              <li>to monitor and improve our products and services, and to develop new products and services;</li>
              <li>to analyze the needs and activities of our customers to help us better serve them;</li>
              <li>to conduct research and analysis related to our business, products and services;</li>
              <li>to respond to inquiries and other requests;</li>
              <li>to collect opinions and comments in regard to our products and services;</li>
              <li>to provide you with information that we think may interest you, including in regards to our products and services; and</li>
              <li>to investigate legal claims.</li>
            </ul>
            <p>
              We may use your personal information and other information for purposes for which we have obtained your consent, and for such other purposes as may be permitted or required by applicable law.
            </p>
            <p>
              We do not use the information we collect to provide advertising of third party products and services or targeted advertising of Company products and services across third party websites or service offerings.
            </p>
            <p>
              You have a variety of tools to control the data collected by cookies, web beacons, and similar technologies. For example, you can use controls in your internet browser to limit how the websites you visit are able to use cookies and to withdraw your consent by clearing or blocking cookies.
            </p>
          </Section>

          <Section title="How We Share Your Personal Information">
            <p>
              We rely on third party services providers to perform a variety of services on our behalf, such as payment card processers, telephone and technical support providers, hosting, data storage and processing service providers, and research and analytics providers.
            </p>
            <p>
              If we provide your information to service providers, then we require that the service providers maintain the confidentiality of your personal information and keep your personal information secure. We also require that they only use your personal information for the limited purposes for which it is provided. When our service providers no longer need your personal information for those limited purposes, we require that they dispose of the personal information. In some circumstances, we may permit our service providers to retain aggregated, anonymized or statistical information that does not identify you. We do not authorize the service providers to disclose your personal information to unauthorized parties or to use your personal information for their direct marketing purposes. If you would like more information about our service providers, please contact us using the contact information in the "Contact Us" section below.
            </p>
            <p>
              Additionally, we may use and disclose your information when we believe such use or disclosure is permitted, necessary or appropriate: (a) under applicable law, including laws outside your country of residence; (b) to comply with legal process; (c) to respond to requests from public and government authorities, including public and government authorities outside your country of residence; (d) to enforce the terms of the agreements for our products and services; (e) to protect our operations or those of any of our affiliates or subsidiaries; (f) to protect our rights, privacy, safety or property, and/or those of our affiliates, you or others; and (g) to allow us to pursue available remedies or limit the damages that we may sustain. In addition, we may transfer your personal information and other information to a third party in the event of any reorganization, merger, sale, joint venture, assignment, transfer or other disposition of all or any portion of our business, brands, affiliates, subsidiaries or other assets, or other business transaction.
            </p>
            <p>
              If we otherwise intend to disclose your personal information to a third party, we will identify that third party and the purpose for the disclosure, and obtain your consent.
            </p>
          </Section>

          <Section title="Opting Out of Communications">
            <p>
              If you no longer want to receive marketing-related emails from us, you may opt-out of receiving marketing-related emails by clicking the "unsubscribe" link at the bottom of any email you receive from us, or, if you created an online account when you registered to receive our emails, you may log-in to your account and make changes to your communication preferences. You may also opt-out by contacting us directly using the contact information in the "Contact Us" section below.
            </p>
            <p>
              We will endeavour to respond to your opt-out request promptly, but we ask that you please allow us a reasonable time to process your request. Please note that if you opt-out from receiving marketing-related emails, we may still need to send you communications about your use of our products or services, or other matters.
            </p>
          </Section>

          <Section title="Retention of Personal Information">
            <p>
              We will use, disclose or retain your personal information only for as long as necessary to fulfill the purposes for which that personal information was collected and as permitted or required by law.
            </p>
          </Section>

          <Section title="Information Security">
            <p>
              We have implemented physical, organizational, contractual and technological security measures with a view to protecting your personal information from loss or theft, unauthorized access, disclosure, copying, use or modification. We have taken steps to ensure that the only personnel who are granted access to your personal information are those with a business &apos;need-to-know&apos; or whose duties reasonably require such information.
            </p>
            <p>
              Despite the measure outlined above, no method of information transmission or information storage is 100% secure or error-free, so we unfortunately cannot guarantee absolute security. If you have reason to believe that your interaction with us is no longer secure (for example, if you feel that the security of any information that you provided to us has been compromised), please contact us immediately using the contact information in the "Contact Us" section below.
            </p>
          </Section>

          <Section title="Accessing and Updating Your Personal Information">
            <p>
              We will take steps to ensure that your personal information is kept as accurate, complete and up-to-date as reasonably necessary. We will not routinely update your personal information, unless such a process is necessary. We expect you, from time to time, to supply us with updates to your personal information, when required.
            </p>
            <p>
              You may make a written request to review any personal information about you that we have collected, used or disclosed, and we will provide you with any such personal information to the extent required by law. You may also challenge the accuracy or completeness of your personal information in our records. If you successfully demonstrate that your personal information in our records is inaccurate or incomplete, we will amend the personal information as required.
            </p>
            <p>
              We may require that you provide sufficient identification to fulfill your request to access or correct your personal information. Any such identifying information will be used only for this purpose.
            </p>
          </Section>

          <Section title="International Transfer and Storage of Information">
            <p>
              Your personal information may be stored and processed at our offices in Canada, the United States, Barbados, or at the offices of our third party service providers, or at data centers managed by us or third party service providers, in Canada, the United States or Barbados. As a result, your personal information may be transferred to countries outside your country of residence, which may have different data protection rules than in your country. While such information is outside of your country, it is subject to the laws of the country in which it is located, and may be subject to disclosure to the governments, courts or law enforcement or regulatory agencies of such other country, pursuant to the laws of such country.
            </p>
          </Section>

          <Section title="Third Party Websites and Services">
            <p>
              This privacy statement applies only to our products and services. This privacy statement does not extend to any websites or products or services provided by third parties. We do not assume responsibility for the privacy practices of such third parties, and we encourage you to review all third party privacy policies prior to using third party websites or products or services.
            </p>
          </Section>

          <Section title="Children's Information">
            <p>
              Our products and services are not intended for children under the age of 16, and we do not knowingly collect personal information from children under the age of 16. Children under the age of 16 should not use our products and services and should not provide us with their personal information.
            </p>
          </Section>

          <Section title="Privacy Statement Updates">
            <p>
              This privacy statement is current as of the "updated" date which appears at the top of this page. We may modify this privacy statement from time to time. When changes are made to this privacy statement they will become immediately effective when published in a revised privacy statement posted on our website unless otherwise noted. We may also communicate the changes through our services or by other means. By submitting your personal information to us, by registering for or using any of the services we offer, by using our website, or by voluntarily interacting with us after we publish or communicate a notice about the changes to this privacy statement, you consent to our collecting, using and disclosing your personal information as set out in the revised privacy statement.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              All comments, questions, concerns or complaints regarding your personal information or our privacy practices should be sent to our Privacy Officer as follows:
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <p className="font-semibold">Address:</p>
              <p>Attention: Privacy Officer</p>
              <p>26 Duncan Street, 5th Floor</p>
              <p>Toronto, ON</p>
              <p>M5V 2B8</p>
              <p className="mt-3 font-semibold">By e-mail:</p>
              <a href="mailto:privacy@themrggroup.com" className="text-[#0F5132] underline hover:opacity-70 transition-opacity">
                privacy@themrggroup.com
              </a>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#0F5132]/10 pt-6">
      <h2 className="text-[#0F5132]" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
